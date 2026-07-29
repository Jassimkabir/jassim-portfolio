'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, SplitText, ScrollTrigger, DUR, EASE } from '@/lib/gsap';
import { EYEBROWS, PROOF } from '@/content/site';
import SplitHeading from '@/components/ui/SplitHeading';
import MonoLabel from '@/components/ui/MonoLabel';

/**
 * Replaces the old fake terminal, which was div-built product UI pretending to
 * execute. Banned, and it was the least honest thing on the previous site.
 *
 * The BlurHash post anchors this section because it is real, it is his, and it
 * demonstrates the performance thinking the rest of the page claims. It gets a
 * dominant pane rather than a footer link.
 *
 * If a functional element is ever wanted here it must genuinely execute against
 * real data. Do not ship a simulation.
 */
export default function Proof() {
  const root = useRef<HTMLElement>(null);
  const excerpt = useRef<HTMLParagraphElement>(null);

  const hasExcerpt = Boolean(PROOF.article.excerpt);
  const hasAssets = PROOF.assets.length > 0;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cleanups: Array<() => void> = [];

        /* The excerpt reveals line by line and slower than anything else on
           the page, because this is the piece you actually want read. */
        if (excerpt.current) {
          const split = SplitText.create(excerpt.current, { type: 'lines', mask: 'lines' });
          const tween = gsap.from(split.lines, {
            yPercent: 100,
            duration: DUR.slow,
            stagger: 0.14,
            ease: EASE.glass,
            scrollTrigger: { trigger: excerpt.current, start: 'top 80%', once: true },
          });
          cleanups.push(() => {
            tween.scrollTrigger?.kill();
            split.revert();
          });
        }

        /* One trigger for the whole set rather than one per card. */
        const batch = ScrollTrigger.batch('[data-proof-item]', {
          start: 'top 85%',
          once: true,
          onEnter: (targets) =>
            gsap.from(targets, {
              y: 28,
              opacity: 0,
              duration: DUR.base,
              stagger: 0.1,
              ease: EASE.glass,
            }),
        });
        cleanups.push(() => {
          for (const st of batch) st.kill();
        });

        return () => {
          for (const fn of cleanups) fn();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="terminal" className="section-y proof">
      <div className="container-page">
        <MonoLabel tone="accent" className="mb-5 block">{EYEBROWS.proof}</MonoLabel>

        <SplitHeading as="h2" variant="display-lg" widthAxis={{ from: 92, to: 100 }}>
          Written work
        </SplitHeading>

        {/* Without assets the article pane runs full width rather than sitting
            next to empty placeholder boxes. */}
        <div
          className={[
            'mt-[clamp(2.5rem,6vh,4rem)] grid gap-6 lg:items-start',
            // Without assets the article runs full width rather than sitting
            // beside an empty column.
            hasAssets ? 'lg:grid-cols-[7fr_3fr]' : 'lg:grid-cols-1',
          ].join(' ')}
        >
          <article data-proof-item className="pane grid gap-5 p-[clamp(1.75rem,4vw,3.25rem)] backdrop-blur-pane">
            <MonoLabel>Article</MonoLabel>

            <h3 className="heading max-w-[24ch]">{PROOF.article.title}</h3>

            {hasExcerpt ? (
              <p ref={excerpt} className="body-lg max-w-[62ch] text-fg-dim">
                {PROOF.article.excerpt}
              </p>
            ) : (
              /* No excerpt supplied. The pane ships without prose rather than
                 with prose invented from the title. */
              <p className="font-mono text-[0.85rem] text-fg-dim">
                NEEDS INPUT: published URL and four to five lines of the real opening.
              </p>
            )}

            {PROOF.article.url ? (
              /* Offsite, so it opens in a new tab and carries rel, matching
                 every other external link on the page. This only became
                 reachable when the URL was supplied; until then the anchor
                 never rendered. */
              <a href={PROOF.article.url} target="_blank" rel="noreferrer" className="tap-44 justify-self-start border-b border-accent-lift pb-0.5 text-accent-lift transition-[color,border-color] duration-200 ease-snap hover:border-fg hover:text-fg" data-magnetic>
                {PROOF.article.cta}
              </a>
            ) : null}
          </article>

          {hasAssets ? (
            <div className="grid gap-6">
              {PROOF.assets.map((asset) => (
                <figure key={asset.src} data-proof-item className="pane overflow-hidden p-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset.src} alt={asset.alt} />
                  <figcaption className="p-4">
                    <MonoLabel>{asset.caption}</MonoLabel>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
