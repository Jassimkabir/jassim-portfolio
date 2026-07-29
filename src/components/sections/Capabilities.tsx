'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, DUR, EASE } from '@/lib/gsap';
import { CAPABILITIES, EYEBROWS } from '@/content/site';
import SplitHeading from '@/components/ui/SplitHeading';
import MonoLabel from '@/components/ui/MonoLabel';
import Counter from '@/components/ui/Counter';

/**
 * Zig-zag rows with widths flipping 60/40 to 40/60.
 *
 * Not three equal cards, which is banned. Not border-t plus border-b on every
 * row, which is also banned. Rows alternate which side they enter from, so the
 * eye is pulled across the column rather than down a list.
 *
 * Every percentage on this page lives here or in Experience, welded to the
 * mechanism that produced it. A bare percentage invites "from what to what?",
 * and a portfolio is a worse place to get caught than a resume.
 *
 * Anchor is #services, preserved from the previous site. The visible label is
 * "Capabilities"; see design-system/jassim/MASTER.md for why that override.
 */
export default function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('[data-capability]');

        const tweens = rows.map((row, i) =>
          gsap.from(row, {
            /* Left rows enter from the left, right rows from the right. */
            x: i % 2 === 0 ? -48 : 48,
            opacity: 0,
            duration: DUR.base,
            ease: EASE.glass,
            scrollTrigger: { trigger: row, start: 'top 82%', once: true },
          }),
        );

        return () => {
          for (const t of tweens) t.scrollTrigger?.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="section-y capabilities">
      <div className="container-page">
        <MonoLabel tone="accent" className="mb-5 block">{EYEBROWS.capabilities}</MonoLabel>

        <SplitHeading as="h2" variant="display-lg" widthAxis={{ from: 92, to: 100 }}>
          What I actually do
        </SplitHeading>

        <div className="mt-[clamp(2.5rem,6vh,4rem)] grid gap-[clamp(2.5rem,7vh,5.5rem)]">
          {CAPABILITIES.map((cap, i) => (
            <article
              key={cap.title}
              data-capability
              /* Widths flip 60/40 to 40/60 down the column. Not three equal
                 cards, and no border-t plus border-b list. */
              className={[
                'grid gap-6 md:items-center md:gap-[clamp(2rem,5vw,4rem)]',
                i % 2 === 0
                  ? 'md:grid-cols-[6fr_4fr]'
                  : 'md:grid-cols-[4fr_6fr] md:[&>*:first-child]:order-2',
              ].join(' ')}
            >
              <div className="grid gap-[0.85rem]">
                <h3 className="heading">{cap.title}</h3>
                <p className="max-w-[52ch] text-fg-dim">{cap.body}</p>
              </div>

              <div className="pane grid content-center gap-[0.4rem] p-[clamp(1.5rem,3vw,2.25rem)]">
                <span className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none tracking-[-0.03em]">
                  <Counter value={cap.evidence.value} suffix={cap.evidence.suffix} />
                </span>
                <span className="text-fg-dim">{cap.evidence.label}</span>
                {/* The mechanism sits with the number. This is the whole point
                    of the section. */}
                <MonoLabel className="mt-2 leading-normal tracking-[0.04em] normal-case">
                  {cap.evidence.mechanism}
                </MonoLabel>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
