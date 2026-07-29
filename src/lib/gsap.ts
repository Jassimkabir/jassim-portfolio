'use client';

/**
 * CustomWiggle was removed. Its only assigned job was the Numbers counter
 * overshoot, and that job is impossible: a wiggle ease ends at 0 by
 * construction, so it drove every counter to zero instead of to its value.
 * The counters use back.out, which genuinely overshoots and settles on target.
 * An unused plugin does not stay in the bundle.
 *
 * Single registration point for GSAP. Import `gsap` and the plugins from here,
 * never from 'gsap' directly, so registration is guaranteed to have run.
 *
 * Every plugin below has an assigned job (see design-system/jassim/MASTER.md).
 * Do not add one without a job, and do not leave one of these unused.
 *
 * GSAP has been fully free since April 2025, every former Club plugin
 * included, from the public `gsap` package. No .npmrc, no npm.greensock.com.
 *
 * ScrollSmoother is deliberately absent. It and Lenis both hijack scroll and
 * will fight each other. Lenis owns scroll; ScrollTrigger reads from it.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

/*
 * Browser only. 'use client' modules still execute during prerender, and GSAP
 * has no document there: CustomWiggle silently fails to resolve its CustomEase
 * dependency and throws "p is not a function" at build time. Nothing here is
 * needed on the server, since every animation runs inside useGSAP.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    ScrollTrigger,      // every scroll-driven moment
    SplitText,          // every display heading
    CustomEase,         // the two project eases
    Flip,               // Work card to detail, theme-toggle layout settle
    Observer,           // cursor magnetism, unified input on the Work track
    Draggable,          // drag-to-pan the Work track
    InertiaPlugin,      // hands that drag back to ScrollTrigger
    DrawSVGPlugin,      // the Experience connector line
    ScrambleTextPlugin, // stack tags on hover
  );

  /* Two eases for the whole page. Nothing uses a stock ease except
     sine.inOut for idle drift. Mirrored in globals.css as --ease-glass
     and --ease-snap; change both together or they desync. */
  CustomEase.create('glass', '0.16, 1, 0.3, 1'); // reveals and settles
  CustomEase.create('snap', '0.65, 0, 0.35, 1'); // UI state changes

  /* Development only. Statically dropped from the production bundle because
     NODE_ENV is inlined at build time. */
  if (process.env.NODE_ENV === 'development') {
    void import('gsap/GSDevTools').then(({ GSDevTools }) => {
      gsap.registerPlugin(GSDevTools);
    });
  }
}

/** Durations. Hover and UI state changes stay inside the 150-300ms band via
 *  `fast`; scroll-scrubbed reveals and ambient drift are a different class of
 *  motion and are not bound by it. */
export const DUR = {
  fast: 0.4,
  base: 0.8,
  slow: 1.4,
  drift: 2.2,
} as const;

export const EASE = {
  glass: 'glass',
  snap: 'snap',
  drift: 'sine.inOut',
} as const;

export {
  gsap,
  ScrollTrigger,
  SplitText,
  CustomEase,
  Flip,
  Observer,
  Draggable,
  InertiaPlugin,
  DrawSVGPlugin,
  ScrambleTextPlugin,
};
