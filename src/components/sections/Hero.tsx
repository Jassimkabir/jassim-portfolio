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

        },
      );

      /*
       * The back type slides on EVERY size, phones included.
       *
       * It used to sit inside the desktop-and-tablet block, so on a phone the
       * word was both static and nearly invisible at 8% opacity. Vertical
       * parallax still stops at 768 per the degradation tiers; a horizontal
       * slide on one decorative element is cheap and it is the only thing
       * giving the mobile hero any depth.
       */
      mm.add(
        {
          desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          tablet: '(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)',
          phone: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { desktop, tablet } = context.conditions as { desktop: boolean; tablet: boolean };
          const amp = desktop ? 1 : tablet ? 0.6 : 0.4;

          const slide = gsap.to('[data-hero-backtype]', {
            xPercent: -14 * amp,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });

          /* Velocity feeds the word's speed. Applied to an inner element so it
             composes with the scrub above instead of fighting it. */
          const velTo = gsap.quickTo('[data-hero-backtype-inner]', 'x', {
            duration: 0.6,
            ease: 'power3',
          });
          const tick = () => {
            const v = gsap.utils.clamp(-VELOCITY_RANGE, VELOCITY_RANGE, scrollState.velocity);
            velTo(
              gsap.utils.mapRange(-VELOCITY_RANGE, VELOCITY_RANGE, -60, 60, v) *
                VELOCITY_CAP.backTypeScale *
                50 *
                amp,
            );
          };
          gsap.ticker.add(tick);

          return () => {
            gsap.ticker.remove(tick);
            slide.scrollTrigger?.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative isolate min-h-svh overflow-hidden max-md:grid max-md:content-start max-md:pt-[calc(var(--nav-h)+4vh)]"
    >
      {/* Decorative repetition of the name, so it is hidden rather than
          announced a second time. */}
      <div
        data-hero-backtype
        aria-hidden="true"
        className={[
          'pointer-events-none absolute bottom-[-0.13em] left-[30%] z-[1] select-none',
          "font-display text-[clamp(8rem,23vw,21rem)] font-extrabold leading-[0.8] tracking-[-0.05em] [font-variation-settings:'wdth'_82]",
          'whitespace-nowrap text-fg opacity-[0.09] will-change-transform',
          'max-lg:left-[22%] max-lg:text-[clamp(6rem,21vw,12rem)]',
          // On a phone the word sat at the very bottom, directly behind the
          // opaque hoodie, so it was invisible however high the opacity went.
          // Raised into the band where the figure's mask is still fading, so it
          // reads and the head interrupts it, which is the intended effect.
          // Sits so the hair cuts through the lower third of the word, which is
          // the same interruption the desktop composition uses. Lower than this
          // and the head swallows it (an earlier pass left only the J stem
          // showing); higher and it floats in the gap as a separate label.
          'max-md:bottom-[35vh] max-md:left-[4%] max-md:text-[clamp(6rem,34vw,12rem)] max-md:opacity-[0.22]',
        ].join(' ')}
      >
        <span data-hero-backtype-inner>{IDENTITY.shortName.toUpperCase()}</span>
      </div>

      {/*
        Each line is an explicit block. Joining with "\n" and relying on
        `white-space: pre-line` does NOT survive SplitText, which rebuilds the
        element's content and drops the newline: at 1280 the headline silently
        collapsed to a single line and ran off the viewport mid-word.
      */}
      <h1
        ref={headline}
        className={[
          'display-xl absolute top-[58vh] left-[clamp(1.25rem,5vw,5rem)] z-[2] max-w-none [translate:0_-58%]',
          'max-lg:top-[calc(var(--nav-h)+4vh)] max-lg:text-[clamp(2.25rem,7.2vw,3.25rem)] max-lg:[translate:0]',
          'tall:top-[calc(var(--nav-h)+6vh)] tall:text-[clamp(2.5rem,5.6vw,4rem)] tall:[translate:0]',
          'max-md:static max-md:gutter-x max-md:text-[clamp(2.25rem,10vw,3.25rem)]',
          'short:top-[52vh] short:text-[clamp(2.25rem,7.2vw,5.5rem)]',
        ].join(' ')}
      >
        {HERO.headline.map((line) => (
          <span
            key={line}
            /* nowrap guarantees exactly two lines at every desktop width.
               Wrapping is allowed again below 768, where nowrap would push the
               headline off the viewport and there is no figure to occlude the
               overrun. */
            className="block whitespace-nowrap max-md:whitespace-normal"
          >
            {line}
          </span>
        ))}
      </h1>

      <div
        data-hero-portrait
        className={[
          'pointer-events-none absolute top-[15vh] right-0 bottom-0 z-[3]',
          'flex w-[clamp(30rem,62vw,70rem)] items-end justify-end will-change-transform',
          // 1024 to 1279. The overlap is tuned by the FIGURE's width, not by shrinking
          // the headline: at 46vw the opaque edge left only 67px of the last line
          // covered, which slices "production" mid-word and reads as clipped text
          // rather than as occlusion. 54vw brings it to ~140px, matching the
          // 150-170px that reads correctly at 1280 and 1440.
          'max-xl:top-[17vh] max-xl:w-[clamp(22rem,54vw,44rem)]',
          'max-lg:top-auto max-lg:h-[58svh] max-lg:w-[52%]',
          'tall:top-auto tall:h-[56svh] tall:w-[56%]',
          // Taller and closer on phones. At 40vh with a 26% mask fade there was
          // a ~180px void between the CTA and where the figure became visible,
          // which read as a layout gap rather than as a bleed.
          'max-md:inset-x-0 max-md:top-auto max-md:h-[52vh] max-md:w-full',
          'short:top-[20vh]',
        ].join(' ')}
      >
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
            className={[
              /*
               * object-CONTAIN, not cover.
               *
               * The base `img { max-width: 100% }` squeezes the image to the
               * container width, and on every size below 1280 that container is
               * taller than it is wide. object-cover then crops the axis that
               * does not fit, which was slicing 33% of the figure off at 768,
               * 38% at 820 and 25% at 1024. Contain fits the whole subject.
               * At 1280 and up the box is exactly square, so this is a no-op
               * there and the desktop composition is unchanged.
               */
              'h-full w-auto -mr-[6%] object-contain object-bottom',
              // Pulls the cutout toward the base palette so it sits in the
              // scene rather than on top of it.
              '[filter:saturate(0.92)_contrast(1.04)]',
              // Below 768 the figure is a full-width bleed masked into --bg at
              // its top edge, so the text above stays legible.
              'max-md:mr-0 max-md:h-full max-md:w-full',
              'max-md:[mask-image:linear-gradient(to_bottom,transparent_0%,black_14%)]',
            ].join(' ')}
          />
        ) : null}
      </div>

      <div
        className={[
          'absolute bottom-[clamp(3rem,9vh,6rem)] left-[clamp(1.25rem,5vw,5rem)] z-[4]',
          // Six of a nominal twelve columns.
          'grid w-[calc((100%-2*clamp(1.25rem,5vw,5rem))/2)] justify-items-start gap-7',
          'max-lg:top-[calc(var(--nav-h)+26vh)] max-lg:bottom-auto max-lg:w-[min(58%,34rem)]',
          'tall:top-[calc(var(--nav-h)+28vh)] tall:bottom-auto tall:w-[min(56%,34rem)]',
          'max-md:static max-md:mt-7 max-md:mb-[34vh] max-md:w-full max-md:gutter-x',
          'short:bottom-10',
        ].join(' ')}
      >
        <p data-hero-support className="body-lg max-w-[68ch] text-fg-dim text-pretty">
          {HERO.subtext}
        </p>

        <div data-hero-support className="flex flex-wrap items-center gap-4">
          {/* The only status dot on the page, and only because it carries real
              hiring state. Rendered only once confirmed. */}
          {HERO.availability.confirmed ? (
            <span
              /* Solid, not blurred: it sits over flat --bg where blur is cost
                 with no payoff. rounded-chip is the single documented radius
                 exception on the page. */
              className="inline-flex items-center gap-2 rounded-chip border border-pane-edge bg-bg-raised px-3.5 py-2"
            >
              <span
                aria-hidden="true"
                className="size-[7px] flex-none rounded-chip bg-accent-lift"
              />
              <span>{HERO.availability.label}</span>
            </span>
          ) : null}

          <a
            href={HERO.cta.href}
            className="inline-flex items-center justify-center px-7 py-3.5 bg-accent text-accent-fg rounded-pane font-semibold cursor-pointer transition-[background-color,transform] duration-200 ease-snap hover:bg-accent-press active:translate-y-px"
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
