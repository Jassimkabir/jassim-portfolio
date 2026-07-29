'use client';

import { useRef } from 'react';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Download01Icon,
  GithubIcon,
  Linkedin02Icon,
  InstagramIcon,
  MetaIcon,
} from '@hugeicons/core-free-icons';

import { CLOSING, CONTACT, SOCIALS } from '@/content/site';
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
/* Same mapping as About, so a platform never gets two different glyphs. */
const SOCIAL_ICON: Record<string, typeof GithubIcon> = {
  GitHub: GithubIcon,
  LinkedIn: Linkedin02Icon,
  Instagram: InstagramIcon,
  Facebook: MetaIcon,
};

export default function Contact({ resumeHref }: { resumeHref: string | null }) {
  const root = useRef<HTMLElement>(null);

  return (
    <section ref={root} id="contact" className="py-[clamp(5rem,12vh,7rem)] md:py-[clamp(8rem,18vh,14rem)]">
      <div className="container-page">
        {/*
          The reference puts a full-width "let's work together" banner here and
          then a separate contact block. That is the same conversion twice. The
          closing statement sits directly above the address instead, so this
          section carries the banner's job without duplicating it.
        */}
        <SplitHeading
          as="h2"
          variant="display-lg"
          className="mb-[clamp(2.5rem,7vh,5rem)] max-w-[16ch] text-fg-dim"
        >
          {CLOSING.lines.join(' ')}
        </SplitHeading>

        <a
          href={`mailto:${CONTACT.email}`}
          className={[
            'display-xl inline-block max-w-full',
            // The address is one 22-character token with no natural break
            // opportunity, so at display-xl it overran the viewport below 1024.
            // `word-break: break-word` does not reliably break an unbroken
            // token; `anywhere` does.
            '[overflow-wrap:anywhere]',
            // A hard two-stop gradient slid into place on hover and clipped to
            // the glyphs. In dark mode this is the accent behaving as a fill,
            // which is its only AA-passing use against the base.
            'bg-[linear-gradient(90deg,var(--accent)_0_50%,var(--fg)_50%_100%)]',
            'bg-[length:200%_100%] bg-[position:100%_0] bg-clip-text text-transparent',
            'transition-[background-position] duration-300 ease-snap',
            'hover:bg-[position:0_0] focus-visible:bg-[position:0_0]',
          ].join(' ')}
          data-magnetic
        >
          {CONTACT.email}
        </a>

        {/*
          Follow row left, resume right, on one baseline. No rule between this
          and the address: the space does that job, and a hairline here fought
          the round controls sitting on it.
        */}
        <div className="mt-[clamp(3rem,8vh,5rem)] grid gap-8">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6">
            <div className="flex items-center gap-4">
              <MonoLabel className="hidden sm:block">{CONTACT.followLabel}</MonoLabel>

              <ul className="flex flex-wrap gap-3">
                {SOCIALS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${link.label}, ${link.value}`}
                      className="icon-round"
                      data-magnetic
                    >
                      <HugeiconsIcon
                        icon={SOCIAL_ICON[link.label]}
                        size={20}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rendered only once the file exists. A dead download link is
                worse than no download link. */}
            {resumeHref ? (
              <a
                href={resumeHref}
                download="Waleed-Jassim-M-K-CV.pdf"
                data-magnetic
                /* An outlined pill rather than an underline, so it joins the
                   same control family as the round social buttons beside it:
                   identical border, colour and hover, just wide enough for a
                   label. The filled accent CTA stays unique to About. */
                className="inline-flex min-h-11 items-center gap-2.5 rounded-chip border border-pane-edge px-5 font-medium text-fg-dim transition-[color,border-color] duration-200 ease-snap hover:border-accent-lift hover:text-fg"
              >
                {CONTACT.resumeCta}
                <HugeiconsIcon icon={Download01Icon} size={18} color="currentColor" strokeWidth={2} />
              </a>
            ) : null}
          </div>

          {/* Off by default. Publishing a phone number is the owner's call. */}
          {CONTACT.phone ? (
            <a
              href={`tel:${CONTACT.phone}`}
              className="grid min-h-11 w-fit content-center gap-[0.35rem] transition-colors duration-200 ease-snap hover:text-accent-lift"
            >
              <MonoLabel>Phone</MonoLabel>
              <span>{CONTACT.phone}</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
