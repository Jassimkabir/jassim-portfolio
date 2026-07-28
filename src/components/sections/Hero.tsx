'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, ScrollTrigger, SplitText, DUR, EASE } from '@/lib/gsap';
import { scrollState, scrollToSection, VELOCITY_CAP, VELOCITY_RANGE } from '@/lib/scroll';
import { HERO, IDENTITY } from '@/content/site';

/**
 * Figure anchored bottom-right and cropped by both the right and bottom
 * viewport edges, text left. No glass in this section.
 *
 * The separation field, both rear panes and the crossing front pane were
 * removed at the client's direction. What remains carries the hero on
 * composition alone, so two things are load-bearing and must not be "tidied":
 *
 *  1. The final headline line is OCCLUDED by the figure's near shoulder. The
 *     headline sits below the portrait in z-order for exactly this reason.
 *     Without it this is text-left image-right, the most templated hero there
 *     is.
 *  2. The back type is sliced by the bottom edge and interrupted by the body.
 *
 * mix-blend-mode difference was specified for the crossing portion of the
 * headline, but a portion hidden behind the figure has nothing to blend
 * against, and splitting one line into blended and unblended fragments would
 * need the text duplicated in the DOM, which makes screen readers announce the
 * headline twice. Occlusion is both the stronger read and the accessible one.
 *
 * BLUR BUDGET here: the nav veil, and nothing else. 1 of 6.
 */
export default function Hero({ hasPortrait }: { hasPortrait: boolean }) {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* ── entrance ─────────────────────────────────────────────────────── */
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = SplitText.create(headline.current, {
          type: 'chars,lines',
          mask: 'lines',
        });

        const tl = gsap.timeline({ defaults: { ease: EASE.glass } });

        tl.addLabel('backtype')
          .from('[data-hero-backtype]', { opacity: 0, duration: DUR.slow }, 0)
          .addLabel('portrait', 0.15)
          .from('[data-hero-portrait]', { scale: 1.04, opacity: 0, duration: DUR.slow }, 'portrait')
          .addLabel('headline', 0.3)
          .from(split.chars, { yPercent: 110, duration: DUR.base, stagger: 0.02 }, 'headline')
          /* Width axis opens 75 to 78 as the headline lands. Entrance only,
             never scrubbed: font-variation-settings repaints, so it stays off
             the per-frame scroll budget. */
          .to(
            { wdth: 75 },
            {
              wdth: 78,
              duration: DUR.slow,
              onUpdate() {
                const { wdth } = this.targets()[0] as { wdth: number };
                headline.current?.style.setProperty(
                  'font-variation-settings',
                  `"wdth" ${wdth.toFixed(1)}`,
                );
              },
            },
            'headline',
          )
          .addLabel('support', 0.75)
          .from('[data-hero-support]', { y: 20, opacity: 0, duration: DUR.base, stagger: 0.1 }, 'support');
        /* The nav fades last, but it owns that tween itself. useGSAP is scoped
           to this section, so a '.nav' selector here silently matched nothing
           and the tween never ran. Reaching into another section's DOM is also
           the thing the no-global-animation rule exists to prevent. */

        return () => {
          tl.kill();
          split.revert();
        };
      });

      /* ── scroll depth ─────────────────────────────────────────────────── */
      mm.add(
        {
          desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          tablet:
            '(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean };
          const amp = desktop ? 1 : 0.5;

          const scrub = {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          } as const;

          /* The slight inward drift reads as the figure stepping toward the
             viewer rather than simply sliding up the page. */
          gsap.to('[data-hero-portrait]', {
            yPercent: 6 * amp,
            xPercent: -2 * amp,
            ease: 'none',
            scrollTrigger: scrub,
          });

          /* The giant word slides horizontally behind the figure. Scrubbed on
             x, not y, so the body interrupts a moving word. */
          gsap.to('[data-hero-backtype]', {
            xPercent: -14 * amp,
            ease: 'none',
            scrollTrigger: scrub,
          });

          /* Velocity feeds the back type's horizontal speed. Applied to an
             inner element so it composes with the scrub above instead of
             fighting it for the same transform. */
          const velTo = gsap.quickTo('[data-hero-backtype-inner]', 'x', {
            duration: 0.6,
            ease: 'power3',
          });
          const tick = () => {
            const v = gsap.utils.clamp(-VELOCITY_RANGE, VELOCITY_RANGE, scrollState.velocity);
            velTo(
              gsap.utils.mapRange(-VELOCITY_RANGE, VELOCITY_RANGE, -60, 60, v) *
                VELOCITY_CAP.backTypeScale *
                50,
            );
          };
          gsap.ticker.add(tick);

          return () => gsap.ticker.remove(tick);
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="home" className="hero">
      {/* Decorative repetition of the name, so it is hidden rather than
          announced a second time. */}
      <div data-hero-backtype className="hero__backtype" aria-hidden="true">
        <span data-hero-backtype-inner>{IDENTITY.shortName.toUpperCase()}</span>
      </div>

      {/*
        Each line is an explicit block. Joining with "\n" and relying on
        `white-space: pre-line` does NOT survive SplitText, which rebuilds the
        element's content and drops the newline: at 1280 the headline silently
        collapsed to a single line and ran off the viewport mid-word.
      */}
      <h1 ref={headline} className="display-xl hero__headline">
        {HERO.headline.map((line) => (
          <span key={line} className="hero__line">
            {line}
          </span>
        ))}
      </h1>

      <div data-hero-portrait className="hero__portrait">
        {hasPortrait ? (
          <Image
            src="/portrait.png"
            alt={`${IDENTITY.fullName}, ${IDENTITY.title}`}
            /* The asset is 759x759. It was declared 1200x1800, which gave
               next/image the wrong aspect ratio and voided the no-layout-shift
               guarantee. */
            width={759}
            height={759}
            priority
            sizes="(max-width: 767px) 100vw, 62vw"
            onLoad={() => ScrollTrigger.refresh()}
          />
        ) : null}
      </div>

      <div className="hero__support">
        <p data-hero-support className="body-lg hero__subtext">
          {HERO.subtext}
        </p>

        <div data-hero-support className="hero__actions">
          {/* The only status dot on the page, and only because it carries real
              hiring state. Rendered only once confirmed. */}
          {HERO.availability.confirmed ? (
            <span className="chip">
              <span className="chip__dot" aria-hidden="true" />
              <span>{HERO.availability.label}</span>
            </span>
          ) : null}

          <a
            href={HERO.cta.href}
            className="btn-primary"
            data-magnetic
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(HERO.cta.href);
            }}
          >
            {HERO.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
