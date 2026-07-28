'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, SplitText, DUR, EASE } from '@/lib/gsap';
import { CONTACT } from '@/content/site';
import MonoLabel from '@/components/ui/MonoLabel';

/**
 * One oversized mailto and nothing competing with it. No contact form.
 *
 * The headline fills with accent on hover via animated background-position and
 * background-clip: text. In dark mode that is the accent behaving as a fill,
 * which is its only AA-passing use against the base.
 */
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const mailto = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const el = mailto.current;
        if (!el) return;

        const split = SplitText.create(el, { type: 'chars' });

        /* Character-level displacement, kept subtle. The fill itself is a CSS
           transition; this only adds the ripple underneath it. */
        const enter = () =>
          gsap.to(split.chars, {
            yPercent: -8,
            duration: DUR.fast,
            ease: EASE.snap,
            stagger: { each: 0.012, from: 'start' },
          });

        const leave = () =>
          gsap.to(split.chars, {
            yPercent: 0,
            duration: DUR.fast,
            ease: EASE.snap,
            stagger: { each: 0.012, from: 'end' },
          });

        el.addEventListener('pointerenter', enter);
        el.addEventListener('pointerleave', leave);

        return () => {
          el.removeEventListener('pointerenter', enter);
          el.removeEventListener('pointerleave', leave);
          split.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contact" className="section contact">
      <div className="container">
        <a
          ref={mailto}
          href={`mailto:${CONTACT.email}`}
          className="display-xl contact__mailto"
          data-magnetic
        >
          {CONTACT.email}
        </a>

        <div className="contact__row">
          {CONTACT.links.map((link) => (
            <a key={link.label} href={link.href} className="contact__link">
              <MonoLabel>{link.label}</MonoLabel>
              <span>{link.value}</span>
            </a>
          ))}

          {/* Rendered only once the file exists. A dead download link is worse
              than no download link. */}
          {CONTACT.resume ? (
            <a href={CONTACT.resume} className="contact__link" download>
              <MonoLabel>Resume</MonoLabel>
              <span>Download</span>
            </a>
          ) : null}

          {/* Off by default. Publishing a phone number is the owner's call, not
              a default. */}
          {CONTACT.phone ? (
            <a href={`tel:${CONTACT.phone}`} className="contact__link">
              <MonoLabel>Phone</MonoLabel>
              <span>{CONTACT.phone}</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
