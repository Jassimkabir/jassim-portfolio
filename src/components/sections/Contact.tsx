'use client';

import { useRef } from 'react';

import { CLOSING, CONTACT } from '@/content/site';
import MonoLabel from '@/components/ui/MonoLabel';
import SplitHeading from '@/components/ui/SplitHeading';

/**
 * One oversized mailto and nothing competing with it. No contact form.
 *
 * The address fills with accent on hover: a hard two-stop gradient slid into
 * place with background-position and clipped to the glyphs. In dark mode that
 * is the accent behaving as a fill, which is its only AA-passing use against
 * the base. It is pure CSS, and deliberately so.
 *
 * NO CHARACTER-LEVEL DISPLACEMENT HERE, and do not add it back.
 *
 * The brief asked for a subtle per-character hover ripple, which is
 * structurally incompatible with this fill. `background-clip: text` clips the
 * gradient to the anchor's own background box; splitting the address into
 * per-character spans and translating them moves the glyphs outside that clip,
 * so they render as nothing and the address appears to vanish on hover. The
 * inline-block spans SplitText introduces also reflow the line box, which made
 * it collapse. Either the fill goes or the displacement does, and the fill is
 * the one the design actually depends on.
 */
export default function Contact() {
  const root = useRef<HTMLElement>(null);

  return (
    <section ref={root} id="contact" className="section contact">
      <div className="container">
        {/*
          The reference puts a full-width "let's work together" banner here and
          then a separate contact block. That is the same conversion twice. The
          closing statement sits directly above the address instead, so this
          section carries the banner's job without duplicating it.
        */}
        <SplitHeading as="h2" variant="display-lg" className="contact__closing">
          {CLOSING.lines.join(' ')}
        </SplitHeading>

        <a
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
