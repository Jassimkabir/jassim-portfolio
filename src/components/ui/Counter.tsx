'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, DUR, EASE } from '@/lib/gsap';

/**
 * Counts up on entry.
 *
 * `overshoot` applies the single CustomWiggle on the page and belongs to the
 * Numbers section only. Nothing else wiggles, so Capabilities leaves it off.
 */
export default function Counter({
  value,
  suffix = '',
  overshoot = false,
  className = '',
}: {
  value: number;
  suffix?: string;
  overshoot?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const counter = { n: 0 };

        const tween = gsap.to(counter, {
          n: value,
          duration: DUR.slow,
          ease: overshoot ? EASE.settle : EASE.glass,
          /* Snapping the tweened property keeps the rendered digits integral,
             so the number never flickers through fractional values. */
          snap: { n: 1 },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.n)}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  /* Rendered at its final value so the number is correct with JS disabled,
     under reduced motion, and for anything reading the static HTML. */
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
