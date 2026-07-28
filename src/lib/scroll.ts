'use client';

import Lenis from 'lenis';

/* ──────────────────────────────────────────────────────────────────
   Smooth scroll + a single scroll-lock gate.

   One `scrollEnabled` boolean gates everything. The loader, the nav
   overlay and the request modal all call stopScroll()/startScroll().
─────────────────────────────────────────────────────────────────── */

let lenis: Lenis | null = null;
let scrollEnabled = true;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
  /* If something locked the page before Lenis existed, honour it. */
  if (instance && !scrollEnabled) instance.stop();
}

export function getLenis() {
  return lenis;
}

export function isScrollEnabled() {
  return scrollEnabled;
}

export function stopScroll() {
  if (typeof document === 'undefined') return;
  scrollEnabled = false;
  lenis?.stop();
  const html = document.documentElement;
  html.style.position = 'relative';
  html.style.overflow = 'hidden';
  html.style.height = '100%';
}

export function startScroll() {
  if (typeof document === 'undefined') return;
  scrollEnabled = true;
  const html = document.documentElement;
  html.style.removeProperty('position');
  html.style.removeProperty('overflow');
  html.style.removeProperty('height');
  lenis?.start();
}

/**
 * Scroll to a section by id. Lenis is paused for the duration so the
 * native smooth scroll isn't fought over, then resumed.
 */
export function scrollToId(id: string) {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;

  lenis?.stop();
  window.setTimeout(() => {
    const top = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top, behavior: 'smooth' });
    window.setTimeout(() => {
      /* Only hand control back if nothing else locked the page meanwhile. */
      if (scrollEnabled) lenis?.start();
    }, 100);
  }, 50);
}
