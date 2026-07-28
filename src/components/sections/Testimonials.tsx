'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, ScrollTrigger, DUR, EASE } from '@/lib/gsap';
import { TESTIMONIALS } from '@/content/site';
import SplitHeading from '@/components/ui/SplitHeading';
import MonoLabel from '@/components/ui/MonoLabel';

/**
 * CONTENT BLOCKED. Renders nothing until real quotes exist.
 *
 * The reference fills this with testimonials and a "Trusted 18,000+ Satisfied
 * Clients" figure. Neither has any basis in the source material. A fabricated
 * endorsement attributed to a named person at a named company is the worst
 * category of invented content on a portfolio, and it is checkable in about
 * thirty seconds by exactly the people this page is built for.
 *
 * The shell below works the moment TESTIMONIALS is populated. The layout is a
 * deliberate offset stack rather than a row of equal cards, which is banned:
 * the first quote runs at heading scale across a wide measure, the rest sit
 * smaller and staggered at different depths.
 */
export default function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (TESTIMONIALS.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const batch = ScrollTrigger.batch('[data-testimonial]', {
          start: 'top 85%',
          once: true,
          onEnter: (targets) =>
            gsap.from(targets, {
              y: 32,
              opacity: 0,
              duration: DUR.base,
              stagger: 0.12,
              ease: EASE.glass,
            }),
        });
        return () => {
          for (const st of batch) st.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  /* No placeholder, no "testimonials coming soon". The section simply does not
     exist until it has something true to say. */
  if (TESTIMONIALS.length === 0) return null;

  const [lead, ...rest] = TESTIMONIALS;

  return (
    <section ref={root} id="testimonials" className="section testimonials">
      <div className="container">
        <SplitHeading as="h2" variant="display-lg" widthAxis={{ from: 92, to: 100 }}>
          What people say
        </SplitHeading>

        <figure data-testimonial className="testimonials__lead">
          <blockquote className="heading">{lead.quote}</blockquote>
          <figcaption>
            <span className="testimonials__name">{lead.name}</span>
            <MonoLabel>
              {lead.role}, {lead.company}
            </MonoLabel>
          </figcaption>
        </figure>

        <div className="testimonials__rest">
          {rest.map((item) => (
            <figure key={item.name} data-testimonial className="pane testimonials__item">
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <span className="testimonials__name">{item.name}</span>
                <MonoLabel>
                  {item.role}, {item.company}
                </MonoLabel>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
