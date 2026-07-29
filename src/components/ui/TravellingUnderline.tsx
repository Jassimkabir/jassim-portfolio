'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, Flip, EASE } from '@/lib/gsap';

/**
 * A single 1px rule that moves into whichever link is hovered.
 *
 * Extracted from Nav so the footer's quick links can share it rather than
 * grow a second copy that drifts. Both the header and the footer render one
 * of these; they stay independent because each is found by its own attribute.
 *
 * WHAT THE CONSUMER OWES THIS COMPONENT:
 *  - a positioned ancestor to sit in before it has travelled anywhere
 *  - links carrying `attr` set to their id, each `position: relative` so the
 *    rule measures against the link once it is reparented into one. The
 *    `tap-44` utility already does that, which is why every consumer has it
 *  - `hovered` cleared on leaving the LIST, never on leaving a link
 *
 * That last one is not a style note. Links are separated by real gaps, so a
 * pointer moving from one to the next passes through dead space. Clearing the
 * hover per link made the rule fade to 0 and snap back on at every crossing,
 * measured as opacity running 1 to 0 to 1 each time. Scoped to the list,
 * crossing a gap changes nothing.
 */
export default function TravellingUnderline({
  hovered,
  attr,
}: {
  /** Id of the hovered link, or null when the pointer is outside the list. */
  hovered: string | null;
  /** Data attribute the links are tagged with, e.g. `data-nav-link`. */
  attr: string;
}) {
  const bar = useRef<HTMLSpanElement>(null);
  /** Whether the rule is on screen. Decides travel versus fade in. */
  const visible = useRef(false);

  useGSAP(
    () => {
      const el = bar.current;
      if (!el) return;

      if (!hovered) {
        visible.current = false;
        gsap.to(el, { opacity: 0, duration: 0.18, ease: EASE.snap, overwrite: 'auto' });
        return;
      }

      const target = document.querySelector<HTMLElement>(`[${attr}="${hovered}"]`);
      if (!target) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const wasVisible = visible.current;
      visible.current = true;

      if (target === el.parentElement) {
        gsap.to(el, { opacity: 1, duration: 0.18, ease: EASE.snap, overwrite: 'auto' });
        return;
      }

      /*
       * Arriving from nothing: place the rule and fade it up where it belongs.
       *
       * It must NOT travel here. The bar is still parented to whichever link
       * was hovered last, so flipping would fly a hairline across the whole
       * list from a position the reader never saw it occupy.
       */
      if (reduced || !wasVisible) {
        target.appendChild(el);
        gsap.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: reduced ? 0 : 0.18, ease: EASE.snap, overwrite: 'auto' },
        );
        return;
      }

      /* On screen already and moving to a different link, so it travels. */
      const state = Flip.getState(el);
      target.appendChild(el);
      gsap.set(el, { opacity: 1 });
      Flip.from(state, { duration: 0.34, ease: EASE.snap, absolute: true });
    },
    { dependencies: [hovered, attr] },
  );

  return (
    <span
      ref={bar}
      aria-hidden="true"
      /* Accent as a 1px hairline needs the lift value to clear contrast on the
         dark base. Hover affordance only; neither list has an active state. */
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-accent-lift opacity-0"
    />
  );
}
