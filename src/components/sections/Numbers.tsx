'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap } from '@/lib/gsap';
import { NUMBERS } from '@/content/site';
import Counter from '@/components/ui/Counter';
import MonoLabel from '@/components/ui/MonoLabel';

/** Four depths, deliberately unequal, so the panes never line up into a grid. */
const DEPTHS = [-18, -6, -24, -11];

/**
 * Four figures on four panes at four z-depths, parallaxing against each other.
 *
 * Every claim here is countable rather than a percentage, which is the point:
 * "3 companies" survives the follow-up question and "reduced defects by 25%"
 * does not without its baseline. Percentages live in Capabilities and
 * Experience where their mechanism sits next to them.
 */
export default function Numbers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          tablet:
            '(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean };
          const amp = desktop ? 1 : 0.5;

          const tweens = gsap.utils.toArray<HTMLElement>('[data-number]').map((el, i) =>
            gsap.to(el, {
              yPercent: DEPTHS[i % DEPTHS.length] * amp,
              ease: 'none',
              scrollTrigger: {
                trigger: root.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }),
          );

          return () => {
            for (const t of tweens) t.scrollTrigger?.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="stats" className="section numbers">
      <div className="container numbers__grid">
        {NUMBERS.map((item, i) => (
          <div
            key={item.label}
            data-number
            className="pane numbers__item"
            style={{ '--depth': i } as React.CSSProperties}
          >
            <span className="display-lg numbers__figure">
              {/* The one CustomWiggle on the page. Nothing else overshoots. */}
              <Counter value={item.value} suffix={item.suffix} overshoot />
            </span>
            <MonoLabel>{item.label}</MonoLabel>
          </div>
        ))}
      </div>
    </section>
  );
}
