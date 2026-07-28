'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, DUR, EASE } from '@/lib/gsap';
import { CAPABILITIES } from '@/content/site';
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
    <section ref={root} id="services" className="section capabilities">
      <div className="container">
        <SplitHeading as="h2" variant="display-lg" widthAxis={{ from: 92, to: 100 }}>
          What I actually do
        </SplitHeading>

        <div className="capabilities__list">
          {CAPABILITIES.map((cap, i) => (
            <article
              key={cap.title}
              data-capability
              className={i % 2 === 0 ? 'capabilities__row' : 'capabilities__row is-flipped'}
            >
              <div className="capabilities__body">
                <h3 className="heading">{cap.title}</h3>
                <p className="capabilities__text">{cap.body}</p>
              </div>

              <div className="pane capabilities__evidence">
                <span className="capabilities__figure">
                  <Counter value={cap.evidence.value} suffix={cap.evidence.suffix} />
                </span>
                <span className="capabilities__evidence-label">{cap.evidence.label}</span>
                {/* The mechanism sits with the number. This is the whole point
                    of the section. */}
                <MonoLabel className="capabilities__mechanism">
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
