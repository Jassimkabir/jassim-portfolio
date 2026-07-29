'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, DUR, EASE } from '@/lib/gsap';
import { EDUCATION, EYEBROWS } from '@/content/site';
import MonoLabel from '@/components/ui/MonoLabel';

/**
 * One degree, presented as a single statement rather than a list.
 *
 * The reference stacks four education entries. There is one real entry here,
 * and a four-row layout carrying one row reads as padding. So the spatial idea
 * is different from Experience directly above it: no timeline, no spine, no
 * alternating sides. Just the degree at heading scale against a wide measure,
 * with the institution and dates as mono metadata on the opposite edge.
 */
export default function Education() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tween = gsap.from('[data-education]', {
          y: 28,
          opacity: 0,
          duration: DUR.base,
          stagger: 0.1,
          ease: EASE.glass,
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
        });
        return () => tween.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="education" className="section-y education">
      <div className="container-page grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-x-[clamp(2rem,6vw,6rem)]">
        <MonoLabel data-education tone="accent">
          {EYEBROWS.education}
        </MonoLabel>

        <div data-education className="grid gap-3">
          <h2 className="display-lg max-w-[20ch]">{EDUCATION.degree}</h2>
          <p className="body-lg text-fg-dim">
            {EDUCATION.institution}, {EDUCATION.city}
          </p>
        </div>

        <MonoLabel data-education>
          {EDUCATION.from} to {EDUCATION.to}
        </MonoLabel>

        {/* Renders only when real certifications exist. An empty "coming soon"
            row would be worse than nothing. */}
        {EDUCATION.certifications.length > 0 ? (
          <ul data-education className="col-span-full mt-[clamp(2rem,5vh,3rem)] grid list-none gap-4">
            {EDUCATION.certifications.map((cert) => (
              <li key={cert.name} className="grid gap-[0.3rem]">
                <span className="font-display text-[1.05rem] font-medium">{cert.name}</span>
                <MonoLabel>
                  {cert.issuer}, {cert.year}
                </MonoLabel>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
