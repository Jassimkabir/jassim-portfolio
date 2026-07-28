'use client';

import { useLayoutEffect, useEffect, useRef, type DependencyList } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ──────────────────────────────────────────────────────────────────
   Motion system — three reusable helpers (reveal / revealLines /
   revealWords) plus a pointer-driven hoverSpring. Every reveal plays
   once, every helper degrades to a plain fade under reduced motion.
─────────────────────────────────────────────────────────────────── */

let registered = false;

export function registerGsap() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function canHover() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
}

/* Reference spring configs mapped to GSAP durations/eases. */
export const SPRING = {
  soft: { duration: 0.7, ease: 'expo.out' }, //  210/26
  softer: { duration: 0.8, ease: 'expo.out' }, //  200/24, 180/26
  snappy: { duration: 0.35, ease: 'power3.out' }, //  320/18, 300/18, 280/18
  fill: { duration: 0.45, ease: 'power2.out' }, //  240/26
  quick: { duration: 0.4, ease: 'power3.out' }, //  300/28, 260/30, 280/32
} as const;

const DEFAULT_START = 'top 85%';

type RevealOpts = {
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  ease?: string;
  delay?: number;
  start?: string;
  /** Skip ScrollTrigger and play straight away (above-the-fold reveals). */
  immediate?: boolean;
};

function trigger(el: Element, start: string, immediate: boolean) {
  return immediate
    ? {}
    : { scrollTrigger: { trigger: el, start, once: true } };
}

/** Plain fade used everywhere when the user asks for reduced motion. */
function fadeIn(el: Element | Element[], start: string, immediate: boolean) {
  const first = Array.isArray(el) ? el[0] : el;
  if (!first) return;
  return gsap.fromTo(
    el,
    { opacity: 0 },
    { opacity: 1, duration: 0.2, ...trigger(first, start, immediate) }
  );
}

/* ── reveal ────────────────────────────────────────────────────── */

export function reveal(el: Element | null | undefined, opts: RevealOpts = {}) {
  if (!el) return;
  const {
    y = 24,
    x,
    scale,
    duration = 0.9,
    ease = 'power3.out',
    delay = 0,
    start = DEFAULT_START,
    immediate = false,
  } = opts;

  if (prefersReducedMotion()) return fadeIn(el, start, immediate);

  const from: gsap.TweenVars = { opacity: 0, y };
  if (x !== undefined) from.x = x;
  if (scale !== undefined) from.scale = scale;

  return gsap.from(el, {
    ...from,
    duration,
    ease,
    delay,
    ...trigger(el, start, immediate),
  });
}

/* ── line splitting ────────────────────────────────────────────── */

function maskify(el: HTMLElement) {
  const inner = document.createElement('span');
  inner.className = 'line-inner';
  while (el.firstChild) inner.appendChild(el.firstChild);
  el.appendChild(inner);
  el.classList.add('line-mask');
  return inner;
}

/**
 * Split a heading into per-line masks.
 *
 * Two modes:
 *  - explicit — the element already contains `[data-line]` children
 *    (used where the design specifies exactly where lines break);
 *  - measured — plain text is wrapped word by word, grouped by the
 *    wrap positions the browser actually produced, then re-wrapped.
 *
 * Returns the inner elements to animate, plus a `restore()` that puts
 * the original markup back once the reveal has finished so the text
 * reflows naturally on resize.
 */
export function splitLines(el: HTMLElement): {
  inners: HTMLElement[];
  restore: () => void;
} {
  const explicit = Array.from(
    el.querySelectorAll<HTMLElement>(':scope > [data-line]')
  );

  if (explicit.length) {
    const inners = explicit.map(maskify);
    return {
      inners,
      restore: () => {
        for (const line of explicit) {
          const inner = line.firstElementChild;
          if (!inner) continue;
          while (inner.firstChild) line.insertBefore(inner.firstChild, inner);
          inner.remove();
          line.classList.remove('line-mask');
        }
      },
    };
  }

  const original = el.innerHTML;
  const text = (el.textContent ?? '').trim();
  if (!text) return { inners: [], restore: () => {} };

  const words = text.split(/\s+/);
  el.textContent = '';

  const probes = words.map((word, i) => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.textContent = word;
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    return span;
  });

  /* Group words by the vertical position the browser laid them out at. */
  const groups: string[][] = [];
  let currentTop: number | null = null;
  for (const probe of probes) {
    const top = probe.offsetTop;
    if (currentTop === null || Math.abs(top - currentTop) > 1) {
      groups.push([probe.textContent ?? '']);
      currentTop = top;
    } else {
      groups[groups.length - 1].push(probe.textContent ?? '');
    }
  }

  el.textContent = '';
  const inners = groups.map((group) => {
    const mask = document.createElement('span');
    mask.className = 'line-mask';
    const inner = document.createElement('span');
    inner.className = 'line-inner';
    inner.textContent = group.join(' ');
    mask.appendChild(inner);
    el.appendChild(mask);
    return inner;
  });

  return {
    inners,
    restore: () => {
      el.innerHTML = original;
    },
  };
}

export function revealLines(
  el: HTMLElement | null | undefined,
  opts: { stagger?: number; delay?: number; start?: string; immediate?: boolean } = {}
) {
  if (!el) return;
  const {
    stagger = 0.12,
    delay = 0,
    start = DEFAULT_START,
    immediate = false,
  } = opts;

  if (prefersReducedMotion()) return fadeIn(el, start, immediate);

  const { inners, restore } = splitLines(el);
  if (!inners.length) return;

  return gsap.from(inners, {
    yPercent: 100,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
    stagger,
    delay,
    onComplete: restore,
    ...trigger(el, start, immediate),
  });
}

/* ── word splitting ────────────────────────────────────────────── */

function wrapWords(node: Node, out: HTMLElement[]) {
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent ?? '';
      if (!text.trim()) continue;
      const frag = document.createDocumentFragment();
      for (const part of text.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          continue;
        }
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.textContent = part;
        frag.appendChild(span);
        out.push(span);
      }
      node.replaceChild(frag, child);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      wrapWords(child, out);
    }
  }
}

export function revealWords(
  el: HTMLElement | null | undefined,
  opts: { stagger?: number; delay?: number; start?: string; immediate?: boolean } = {}
) {
  if (!el) return;
  const {
    stagger = 0.035,
    delay = 0,
    start = DEFAULT_START,
    immediate = false,
  } = opts;

  if (prefersReducedMotion()) return fadeIn(el, start, immediate);

  const original = el.innerHTML;
  const words: HTMLElement[] = [];
  wrapWords(el, words);
  if (!words.length) return;

  return gsap.from(words, {
    y: 24,
    opacity: 0,
    duration: 0.7,
    ease: 'power4.out',
    stagger,
    delay,
    onComplete: () => {
      el.innerHTML = original;
    },
    ...trigger(el, start, immediate),
  });
}

/* ── hover spring ──────────────────────────────────────────────── */

/**
 * Spring `target` between two states while the pointer is over
 * `trigger` (which is often a parent). No-op on touch devices, where
 * the element simply stays in its resting CSS state.
 */
export function hoverSpring(
  triggerEl: HTMLElement | null | undefined,
  target: HTMLElement | null | undefined,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  cfg: { duration?: number; ease?: string } = SPRING.snappy
): () => void {
  if (!triggerEl || !target || !canHover() || prefersReducedMotion()) {
    return () => {};
  }
  const { duration = 0.35, ease = 'power3.out' } = cfg;

  gsap.set(target, from);
  const enter = () =>
    gsap.to(target, { ...to, duration, ease, overwrite: 'auto' });
  const leave = () =>
    gsap.to(target, { ...from, duration, ease, overwrite: 'auto' });

  triggerEl.addEventListener('mouseenter', enter);
  triggerEl.addEventListener('mouseleave', leave);
  triggerEl.addEventListener('focusin', enter);
  triggerEl.addEventListener('focusout', leave);

  return () => {
    triggerEl.removeEventListener('mouseenter', enter);
    triggerEl.removeEventListener('mouseleave', leave);
    triggerEl.removeEventListener('focusin', enter);
    triggerEl.removeEventListener('focusout', leave);
    gsap.set(target, from);
  };
}

/* ── scoped context hook ───────────────────────────────────────── */

/**
 * Runs `setup` inside a gsap.context scoped to the returned ref, and
 * reverts every tween + ScrollTrigger on unmount. `setup` may return
 * its own cleanup (for event listeners GSAP doesn't own).
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: (scope: T) => void | (() => void),
  deps: DependencyList = []
) {
  const ref = useRef<T>(null);
  const setupRef = useRef(setup);

  /* Keep the latest setup without re-running the context. */
  useIsomorphicLayoutEffect(() => {
    setupRef.current = setup;
  });

  useIsomorphicLayoutEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    registerGsap();

    let inner: void | (() => void);
    const ctx = gsap.context(() => {
      inner = setupRef.current(scope);
    }, scope);

    return () => {
      if (typeof inner === 'function') inner();
      ctx.revert();
    };
  }, deps);

  return ref;
}

/** Resolve once webfonts are ready, so line measuring is accurate. */
export function onFontsReady(cb: () => void) {
  if (typeof document === 'undefined') return () => {};
  let cancelled = false;
  const run = () => {
    if (!cancelled) cb();
  };
  if (document.fonts?.status === 'loaded') {
    run();
  } else {
    document.fonts?.ready.then(run).catch(run);
  }
  return () => {
    cancelled = true;
  };
}

export { gsap, ScrollTrigger };
