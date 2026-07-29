'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, DUR, EASE } from '@/lib/gsap';

/**
 * Counts up on entry.
 *
 * `overshoot` counts past the target and settles back onto it, and belongs to
 * the Numbers section only.
 *
 * IT IS NOT A CustomWiggle EASE, AND MUST NOT BECOME ONE AGAIN. A wiggle ease
 * ends at 0 by construction: CustomWiggle's path builder closes with
 * `path.push(..., 1, 0)`, because it is designed for round trips like
 * `gsap.to(el, { rotation: 30, ease: 'wiggle' })` that return to their start.
 * Driving a counter with it animated every figure to zero, which is why the
 * whole Numbers section rendered 0+, 0, 0+, 0.
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
          ease: overshoot ? 'back.out(1.7)' : EASE.glass,
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
