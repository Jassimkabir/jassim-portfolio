'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap } from '@/lib/gsap';
import { scrollState, VELOCITY_CAP, VELOCITY_RANGE } from '@/lib/scroll';
import { MARQUEE } from '@/content/site';

/** Base drift in pixels per frame, before any velocity boost. */
const BASE_SPEED = 0.6;

/**
 * Full-bleed band. Speed and direction both come from Lenis, so it reads as an
 * instrument responding to the reader rather than a decoration looping on its
 * own clock.
 *
 * Content is the real stack and nothing else. No adjectives, and the resume's
 * AI-tools row stays off the site.
 */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-marquee-item]');
        if (!items.length) return;

        /* Measured lazily and re-measured on font load and resize. Reading the
           width once at mount catches the fallback face, then Bricolage swaps
           in and changes it, leaving the wrap point wrong and the band
           visibly jumping once per loop. */
        let total = items[0].offsetWidth;
        let wrap = gsap.utils.wrap(-total, 0);
        let offset = 0;

        const measure = () => {
          total = items[0].offsetWidth;
          wrap = gsap.utils.wrap(-total, 0);
        };

        document.fonts?.ready.then(measure);
        window.addEventListener('resize', measure);

        const setters = items.map((el) => gsap.quickSetter(el, 'x', 'px'));

        const tick = () => {
          const v = scrollState.velocity;
          const magnitude = Math.min(Math.abs(v), VELOCITY_RANGE);

          /* Clamped hard. Uncapped velocity mapping is how this turns into
             nausea on a hard trackpad flick. */
          const boost = gsap.utils.mapRange(0, VELOCITY_RANGE, 1, VELOCITY_CAP.marqueeBoost, magnitude);

          /* Direction flips with scroll direction. Scrolling up reverses it. */
          const dir = scrollState.direction === -1 ? 1 : -1;

          offset += BASE_SPEED * boost * dir;
          const x = wrap(offset);
          for (const set of setters) set(x);
        };

        gsap.ticker.add(tick);
        return () => {
          gsap.ticker.remove(tick);
          window.removeEventListener('resize', measure);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  /* Doubled so the wrap always has a copy on screen. */
  const runs = [0, 1];

  return (
    <div ref={root} id="marquee" className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {runs.map((run) => (
          <div key={run} data-marquee-item className="marquee__run">
            {MARQUEE.map((item, i) => (
              <span
                key={item}
                className={i % 2 === 0 ? 'marquee__word' : 'marquee__word is-outlined'}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
