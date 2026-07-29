'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUp01Icon } from '@hugeicons/core-free-icons';

import { gsap, DUR, EASE } from '@/lib/gsap';
import { scrollToSection, scrollToTop } from '@/lib/scroll';
import { NAV_LINKS } from '@/lib/nav';
import { FOOTER, IDENTITY } from '@/content/site';
import ThemeToggle from '@/components/ui/ThemeToggle';
import SplitHeading from '@/components/ui/SplitHeading';
import MonoLabel from '@/components/ui/MonoLabel';
import TravellingUnderline from '@/components/ui/TravellingUnderline';

/**
 * Name, quick links, and the bottom bar.
 *
 * Deliberately absent, and still banned: local time strip, city, weather,
 * build number, last-sync timestamp. All filler, and filler that reads as
 * filler to this audience.
 *
 * WHERE LENIS IS, and it is the whole reason the quick links are buttons
 * rather than plain <a href="#work"> anchors. A hash anchor hands the jump to
 * the browser, which sets the scroll position directly and desynchronises
 * Lenis: the page teleports, and every ScrollTrigger then recalculates against
 * a position Lenis never produced. scrollToSection goes through the Lenis
 * instance instead, easing to the target and offsetting by the live header
 * height, so a jump from the footer behaves exactly like one from the nav. It
 * also falls back to native scrolling under reduced motion, where Lenis is
 * destroyed. See lib/scroll.
 *
 * Grain continues over this section, because it is a single document-level
 * layer rather than anything per-section.
 */

/** Contact is not in NAV_LINKS, which stops at Experience. It belongs here. */
const QUICK_LINKS = [...NAV_LINKS, { id: 'contact', label: 'Contact' }];

export default function Footer({ year }: { year: number }) {
  const root = useRef<HTMLElement>(null);
  /* Cleared on leaving the LIST, not the link. The links have real gaps
     between them and clearing per link makes the rule blink at every
     crossing; see TravellingUnderline. */
  const [hovered, setHovered] = useState<string | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* One trigger for the whole footer. It is the last thing on the page,
           so it arrives as a block rather than element by element. */
        const reveal = gsap.from('[data-footer-reveal]', {
          y: 24,
          opacity: 0,
          duration: DUR.base,
          stagger: 0.06,
          ease: EASE.glass,
          scrollTrigger: { trigger: root.current, start: 'top 92%', once: true },
          /* A `from` tween ends by leaving its end value inline, and an inline
             opacity would outrank the link hover states underneath it. */
          clearProps: 'opacity,transform',
        });

        return () => reveal.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <footer
      ref={root}
      id="socials"
      className="border-t border-pane-edge pt-[clamp(3rem,8vh,5rem)] pb-[clamp(2rem,5vh,3rem)]"
    >
      <div className="container-page">
        {/* Name left, links right. Below md the links drop under the name and
            run as two columns, which keeps five of them off a tall single
            stack on a phone. */}
        <div className="grid gap-[clamp(2.5rem,6vh,4rem)] md:grid-cols-[1fr_auto] md:items-start md:gap-x-[clamp(2rem,6vw,6rem)]">
          <div className="grid gap-3">
            {/* shortName, not fullName. The full name still signs the
                copyright in the bottom bar, where a legal attribution wants
                it; here it is a sign-off and reads better short.

                This also retires the wrap problem entirely: one word cannot
                orphan a trailing initial the way "Waleed Jassim M K" did, so
                no balancing or measure is needed. */}
            <SplitHeading as="p" variant="display-lg">
              {IDENTITY.shortName}
            </SplitHeading>

            <MonoLabel data-footer-reveal>
              {IDENTITY.title}, {IDENTITY.location}
            </MonoLabel>
          </div>

          <nav aria-label="Footer" className="md:justify-self-end">
            <MonoLabel data-footer-reveal tone="accent" className="mb-4 block">
              {FOOTER.quickLinksLabel}
            </MonoLabel>

            {/* relative so the rule has somewhere to sit before it has
                travelled into a link. */}
            <ul
              className="relative grid list-none grid-cols-2 gap-x-[clamp(1.5rem,5vw,3rem)] gap-y-1 md:grid-cols-1"
              onMouseLeave={() => setHovered(null)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(null);
              }}
            >
              {QUICK_LINKS.map((link) => (
                <li key={link.id} data-footer-reveal>
                  <button
                    type="button"
                    data-footer-link={link.id}
                    onClick={() => scrollToSection(`#${link.id}`)}
                    onMouseEnter={() => setHovered(link.id)}
                    onFocus={() => setHovered(link.id)}
                    /* tap-44 is what makes this position: relative, which the
                       rule measures against once reparented. */
                    /* NO data-magnetic HERE, and it is not only taste. The
                       cursor writes x and y to a magnetised element, and the
                       rule is a child of the link it has travelled into. Flip
                       captures viewport rects, so leaving a link that is
                       mid-pull records the offset position and the travel then
                       animates toward a target that is still moving. The
                       effect this list was given is smoother without it. */
                    className="tap-44 inline-flex cursor-pointer items-center text-fg-dim transition-colors duration-200 ease-snap hover:text-accent-lift"
                  >
                    {link.label}
                  </button>
                </li>
              ))}

              <TravellingUnderline hovered={hovered} attr="data-footer-link" />
            </ul>
          </nav>
        </div>

        {/*
          The bottom bar. A grid, not flex-wrap: with three items and
          justify-between, the moment a phone forces a wrap each lands alone on
          its own line and justify-between stops doing anything, which is how
          this previously collapsed into a ragged left-aligned stack.

          DOM order is control, control, credit, so the two tab stops stay
          adjacent and come before the static text at every width.
        */}
        <div
          data-footer-reveal
          className="mt-[clamp(2.5rem,6vh,4rem)] grid grid-cols-2 items-center gap-x-6 gap-y-5 border-t border-pane-edge pt-[clamp(1.5rem,4vh,2.25rem)] md:grid-cols-[auto_1fr_auto]"
        >
          <button
            type="button"
            className="tap-44 inline-flex cursor-pointer items-center gap-2 justify-self-start text-fg-dim transition-colors duration-200 ease-snap hover:text-fg md:col-start-1 md:row-start-1"
            onClick={scrollToTop}
            data-magnetic
          >
            <HugeiconsIcon icon={ArrowUp01Icon} size={18} color="currentColor" strokeWidth={2} />
            {FOOTER.backToTop}
          </button>

          <div className="justify-self-end md:col-start-3 md:row-start-1">
            <ThemeToggle />
          </div>

          <MonoLabel className="col-span-2 normal-case tracking-[0.08em] md:col-span-1 md:col-start-2 md:row-start-1 md:text-center">
            &copy; {year} {FOOTER.creditPrefix}{' '}
            {/* The name never breaks. If the line has to wrap it wraps before
                the name rather than inside it. */}
            <span className="whitespace-nowrap">{IDENTITY.fullName}</span>
          </MonoLabel>
        </div>
      </div>
    </footer>
  );
}
