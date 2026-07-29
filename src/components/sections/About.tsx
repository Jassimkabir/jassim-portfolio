'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, DUR, EASE } from '@/lib/gsap';
import { ABOUT, NUMBERS, SOCIALS } from '@/content/site';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Download01Icon,
  GithubIcon,
  Linkedin02Icon,
  InstagramIcon,
  MetaIcon,
} from '@hugeicons/core-free-icons';

import SplitHeading from '@/components/ui/SplitHeading';
import MonoLabel from '@/components/ui/MonoLabel';
import Counter from '@/components/ui/Counter';

/** Four depths, deliberately unequal, so the panes never line up into a grid. */
const DEPTHS = [-18, -6, -24, -11];

/* Social platform to Hugeicons glyph. Only platforms that actually exist in
   the content are here; nothing is invented to fill the row. */
const SOCIAL_ICON: Record<string, typeof GithubIcon> = {
  GitHub: GithubIcon,
  LinkedIn: Linkedin02Icon,
  Instagram: InstagramIcon,
  /* MetaIcon rather than a Facebook glyph, as requested. Facebook01Icon and
     FacebookIcon are both available if the wordmark is wanted instead. */
  Facebook: MetaIcon,
};

/**
 * Eyebrow, statement, first-person intro and resume download on the left;
 * socials on the right; the four countable figures across the foot.
 *
 * NUMBERS WAS FOLDED IN HERE and no longer exists as its own section. Its
 * `#stats` anchor is preserved on the figures row below, because that slug is
 * on the do-not-rename list and existing deep links have to keep landing.
 *
 * The upper half is purely typographic. The figures keep their original glass
 * treatment and parallax, which is a deliberate contrast rather than an
 * inconsistency: the text block is the quiet part, the figures are the beat.
 *
 * NOT PINNED. Work is the only pinned section on the page.
 */
export default function About({ resumeHref }: { resumeHref: string | null }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.from('[data-about-reveal]', {
          y: 24,
          opacity: 0,
          duration: DUR.base,
          stagger: 0.12,
          ease: EASE.glass,
          scrollTrigger: { trigger: root.current, start: 'top 78%', once: true },
        });

        return () => intro.scrollTrigger?.kill();
      });

      /* The figures keep their original treatment: four panes parallaxing
         against each other at four unequal depths. Desktop and tablet only,
         per the degradation tiers. */
      mm.add(
        {
          desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          tablet:
            '(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean };
          const amp = desktop ? 1 : 0.5;

          const tweens = gsap.utils.toArray<HTMLElement>('[data-number]').map((el, i) =>
            gsap.to(el, {
              yPercent: DEPTHS[i % DEPTHS.length] * amp,
              ease: 'none',
              scrollTrigger: {
                trigger: '[data-figures]',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }),
          );

          return () => {
            for (const t of tweens) t.scrollTrigger?.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="section-y">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[7fr_4fr] lg:items-start lg:gap-x-[clamp(2rem,6vw,6rem)]">
          {/* ── left: who, and the resume ─────────────────────────────── */}
          <div className="grid gap-6">
            <MonoLabel data-about-reveal>{ABOUT.eyebrow}</MonoLabel>

            <SplitHeading
              as="h2"
              variant="display-lg"
              className="max-w-[16ch]"
              widthAxis={{ from: 92, to: 100 }}
            >
              {ABOUT.heading}
            </SplitHeading>

            <p data-about-reveal className="body-lg max-w-[62ch] text-fg-dim text-pretty">
              {ABOUT.intro}
            </p>

            {/*
              Rendered only when the file actually exists in /public, checked at
              render time in page.tsx. A download button pointing at a 404 is
              worse than no button, and this lights up the moment the PDF is
              dropped in, with no code change.
            */}
            {resumeHref ? (
              <a
                href={resumeHref}
                download="Waleed-Jassim-M-K-CV.pdf"
                data-about-reveal
                data-magnetic
                className="mt-2 inline-flex min-h-11 w-fit cursor-pointer items-center gap-2.5 rounded-pane bg-accent px-7 py-3.5 font-semibold text-accent-fg transition-[background-color,transform] duration-200 ease-snap hover:bg-accent-press active:translate-y-px"
              >
                {ABOUT.resumeCta}
                <HugeiconsIcon icon={Download01Icon} size={18} color="currentColor" strokeWidth={2} />
              </a>
            ) : null}
          </div>

          {/* ── right: socials ────────────────────────────────────────── */}
          <div data-about-reveal className="grid content-start gap-5">
            <MonoLabel>{ABOUT.socialsLabel}</MonoLabel>

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
        </div>

        {/* ── the four countable figures ──────────────────────────────────
            Original Numbers treatment, unchanged: four panes at four unequal
            depths so they never line up into a row. id="stats" is preserved
            from when this was its own section, so /#stats still lands. Do not
            rename it. */}
        <div
          data-figures
          id="stats"
          className="mt-[clamp(3.5rem,9vh,6rem)] grid grid-cols-2 gap-[clamp(1rem,3vw,2rem)] lg:grid-cols-4 lg:items-start"
        >
          {NUMBERS.map((item, i) => (
            <div
              key={item.label}
              data-number
              /* Vertical offsets so the four never sit on one baseline, which
                 is what lets the parallax read as depth rather than drift. */
              className={[
                'pane grid gap-2 p-[clamp(1.25rem,3vw,2rem)]',
                ['', 'lg:mt-16', 'lg:mt-6', 'lg:mt-22'][i % 4],
              ].join(' ')}
            >
              <span className="display-lg block">
                {/* The one overshoot on the page. */}
                <Counter value={item.value} suffix={item.suffix} overshoot />
              </span>
              <MonoLabel>{item.label}</MonoLabel>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
