'use client';

/**
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
import { CustomWiggle } from 'gsap/CustomWiggle';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
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
    CustomWiggle,       // the single Numbers counter overshoot
    Flip,               // Work card to detail, theme-toggle layout settle
    Observer,           // cursor magnetism, unified input on the Work track
    Draggable,          // drag-to-pan the Work track
    InertiaPlugin,      // hands that drag back to ScrollTrigger
    DrawSVGPlugin,      // the Experience connector line
    MotionPathPlugin,   // hero pane drift along shallow curves
    ScrambleTextPlugin, // stack tags on hover
  );

  /* Two eases for the whole page. Nothing uses a stock ease except
     sine.inOut for idle drift. Mirrored in globals.css as --ease-glass
     and --ease-snap; change both together or they desync. */
  CustomEase.create('glass', '0.16, 1, 0.3, 1'); // reveals and settles
  CustomEase.create('snap', '0.65, 0, 0.35, 1'); // UI state changes

  /* One overshoot shape, used only by the Numbers counters. */
  CustomWiggle.create('settle', { wiggles: 2, type: 'easeOut' });

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
  settle: 'settle',
  drift: 'sine.inOut',
} as const;

export {
  gsap,
  ScrollTrigger,
  SplitText,
  CustomEase,
  CustomWiggle,
  Flip,
  Observer,
  Draggable,
  InertiaPlugin,
  DrawSVGPlugin,
  MotionPathPlugin,
  ScrambleTextPlugin,
};
