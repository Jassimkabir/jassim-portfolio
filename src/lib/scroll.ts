'use client';

import type Lenis from 'lenis';

import { headerHeight } from '@/lib/nav';

/**
 * Shared scroll state, written once per frame by the single Lenis instance and
 * read by every consumer inside its own GSAP ticker or quickTo.
 *
 * This is a mutable module object on purpose. Writing scroll values into React
 * state would re-render the tree at 60fps, which is the thing the whole motion
 * budget is built to avoid.
 */
export const scrollState = {
  /** Raw Lenis velocity. Clamp before use. Never consume this directly. */
  velocity: 0,
  /** 0 to 1 across the document. Drives the progress hairline. */
  progress: 0,
  /** 1 scrolling down, -1 scrolling up. Flips the marquee, reveals the nav. */
  direction: 0 as 1 | -1 | 0,
};

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

/** Null under reduced motion, where Lenis is destroyed and native scroll runs. */
export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Lenis does not respect `overflow: hidden`, so locking the page means calling
 * these. Used around the Work detail view.
 */
export function lockScroll() {
  instance?.stop();
}

export function unlockScroll() {
  instance?.start();
}

/**
 * Nav jumps. `lock: true` stops a stray wheel event interrupting mid-flight.
 * Never use scrollIntoView, which bypasses Lenis entirely.
 *
 * The offset is read from the rendered header height rather than hardcoded,
 * because the header is 72px at desktop and 64px below 768 and a single
 * baked-in number would misalign every anchor on one of them.
 */
export function scrollToSection(target: string) {
  const lenis = instance;
  const offset = -headerHeight();

  if (!lenis) {
    /* Reduced motion destroys Lenis, so fall back to native scrolling while
       still honouring the header offset. */
    const el = document.querySelector(target);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'auto' });
    }
    return;
  }

  lenis.scrollTo(target, { offset, duration: 1.4, lock: true });
}

export function scrollToTop() {
  instance?.scrollTo(0, { duration: 2 });
}

/**
 * Velocity ceilings, one per consumer.
 *
 * Every one of these is clamped. Uncapped velocity mapping is how skew and
 * scale effects turn into nausea, and it is the single easiest thing to get
 * wrong here. Verify by flick-scrolling hard on a trackpad.
 */
export const VELOCITY_CAP = {
  /** degrees */
  paneSkew: 4,
  /** multiplier on the hero back-type */
  backTypeScale: 0.02,
  /** multiplier on marquee base speed */
  marqueeBoost: 2.5,
} as const;

/*
 * REMOVED, deliberately: the velocity-driven grain opacity lift.
 *
 * This is the §14 "remove one thing" call. A maximum lift of 0.01 on a layer
 * that sits at 0.05 is below the threshold anyone perceives while scrolling
 * fast enough to trigger it, and paying for it means a per-frame style write
 * to the one full-screen mix-blend-mode element on the page, which is already
 * the flagged jank risk here (see commit dde66e5). Cost with no payoff.
 *
 * The other three velocity consumers stay: marquee speed and direction, pane
 * skew, and hero back-type scale.
 */

/** Velocity magnitude beyond which every effect is already at its cap. */
export const VELOCITY_RANGE = 40;
