'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, DUR, EASE } from '@/lib/gsap';
import { EDUCATION } from '@/content/site';
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
    <section ref={root} id="education" className="section education">
      <div className="container education__grid">
        <MonoLabel data-education className="education__eyebrow">
          Education
        </MonoLabel>

        <div data-education className="education__body">
          <h2 className="display-lg education__degree">{EDUCATION.degree}</h2>
          <p className="body-lg education__institution">
            {EDUCATION.institution}, {EDUCATION.city}
          </p>
        </div>

        <MonoLabel data-education className="education__dates">
          {EDUCATION.from} to {EDUCATION.to}
        </MonoLabel>

        {/* Renders only when real certifications exist. An empty "coming soon"
            row would be worse than nothing. */}
        {EDUCATION.certifications.length > 0 ? (
          <ul data-education className="education__certs">
            {EDUCATION.certifications.map((cert) => (
              <li key={cert.name}>
                <span className="education__cert-name">{cert.name}</span>
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
