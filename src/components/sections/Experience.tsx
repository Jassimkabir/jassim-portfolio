'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, DUR, EASE } from '@/lib/gsap';
import { EXPERIENCE } from '@/content/site';
import SplitHeading from '@/components/ui/SplitHeading';
import MonoLabel from '@/components/ui/MonoLabel';

/**
 * Vertical timeline, entries alternating sides.
 *
 * The connector is a plain geometric line drawn by DrawSVG on scroll, and each
 * entry reveals as the line reaches it, so the line drives the section rather
 * than decorating it. Kept straight on purpose; a decorative squiggle would be
 * ornament pretending to be structure.
 *
 * Dates are mono in --fg-dim, never accent. Two bullets per role maximum. The
 * full list lives on the resume.
 */
export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const draw = gsap.from('[data-experience-line]', {
          drawSVG: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: 1,
          },
        });

        const entries = gsap.utils.toArray<HTMLElement>('[data-experience-entry]');
        const tweens = entries.map((entry, i) =>
          gsap.from(entry, {
            /* Each entry slides in from its own side, matching where it sits
               relative to the spine. */
            x: i % 2 === 0 ? -40 : 40,
            opacity: 0,
            duration: DUR.base,
            ease: EASE.glass,
            scrollTrigger: { trigger: entry, start: 'top 80%', once: true },
          }),
        );

        return () => {
          draw.scrollTrigger?.kill();
          for (const t of tweens) t.scrollTrigger?.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="section-y experience">
      <div className="container-page">
        <SplitHeading as="h2" variant="display-lg" widthAxis={{ from: 92, to: 100 }}>
          Where I have worked
        </SplitHeading>

        <div className="relative mt-[clamp(2.5rem,6vh,4rem)]">
          <svg
            className="absolute top-0 bottom-0 left-0 h-full w-0.5 overflow-visible md:left-1/2 md:-translate-x-1/2"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              data-experience-line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="var(--accent-lift)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="grid list-none gap-[clamp(2.5rem,7vh,5rem)]">
            {EXPERIENCE.map((role, i) => (
              <li
                key={role.company}
                data-experience-entry
                className={[
                  'pl-8 md:w-1/2 md:pl-0',
                  i % 2 === 0
                    ? 'md:pr-[clamp(2rem,4vw,4rem)]'
                    : 'md:ml-[50%] md:pr-0 md:pl-[clamp(2rem,4vw,4rem)]',
                ].join(' ')}
              >
                <div className="grid gap-[0.6rem]">
                  <MonoLabel>
                    {role.from} to {role.to}
                  </MonoLabel>
                  <h3 className="heading">{role.company}</h3>
                  <p className="text-fg-dim">
                    {role.role}, {role.city}
                  </p>
                  <ul className="mt-[0.4rem] grid gap-2 pl-[1.1rem] text-fg-dim marker:text-accent-lift">
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
