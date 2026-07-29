'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, DUR, EASE } from '@/lib/gsap';
import { FAQ } from '@/content/site';
import SplitHeading from '@/components/ui/SplitHeading';
import MonoLabel from '@/components/ui/MonoLabel';

/**
 * Native <details> and <summary
                className={[
                  'flex cursor-pointer items-center justify-between gap-6',
                  // 44px minimum tap target.
                  'min-h-11 py-[clamp(1.1rem,2.5vh,1.6rem)]',
                  // Removes the native disclosure triangle.
                  'list-none [&::-webkit-details-marker]:hidden',
                ].join(' ')}
              >. Real disclosure semantics, keyboard and
 * screen-reader support for free, and it works with JavaScript disabled. A
 * div-based accordion driven by state would be a worse version of an element
 * the platform already ships.
 *
 * Questions with no truthful answer yet are filtered out rather than rendered
 * with placeholder copy. A live FAQ entry reading "NEEDS INPUT" would be worse
 * than the question simply not being there.
 *
 * Layout is a 40/60 split with the heading held left, so it does not repeat the
 * centred-heading-then-list shape used elsewhere. Each row carries a single
 * bottom hairline; the banned pattern is border-t AND border-b on every row.
 */
export default function Faq() {
  const root = useRef<HTMLElement>(null);

  const answered = FAQ.filter(
    (item): item is { question: string; answer: string } => item.answer !== null,
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tween = gsap.from('[data-faq-item]', {
          y: 24,
          opacity: 0,
          duration: DUR.base,
          stagger: 0.08,
          ease: EASE.glass,
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
        });
        return () => tween.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  if (answered.length === 0) return null;

  return (
    <section ref={root} id="faq" className="section-y faq">
      <div className="container-page grid gap-[clamp(2.5rem,6vh,4rem)] lg:grid-cols-[4fr_6fr] lg:items-start lg:gap-x-[clamp(2rem,6vw,6rem)]">
        <div className="grid content-start gap-4">
          <SplitHeading as="h2" variant="display-lg" widthAxis={{ from: 92, to: 100 }}>
            Common questions
          </SplitHeading>
          <MonoLabel>Straight answers</MonoLabel>
        </div>

        <div className="grid">
          {answered.map((item) => (
            <details
              key={item.question}
              data-faq-item
              /* `group` so the icon can react to [open] on the parent. A single
                 bottom hairline per row: the banned pattern is border-top AND
                 border-bottom on every row. */
              className="group border-b border-pane-edge"
            >
              <summary
                className={[
                  'flex cursor-pointer items-center justify-between gap-6',
                  // 44px minimum tap target.
                  'min-h-11 py-[clamp(1.1rem,2.5vh,1.6rem)]',
                  // Removes the native disclosure triangle.
                  'list-none [&::-webkit-details-marker]:hidden',
                ].join(' ')}
              >
                <span className="heading transition-colors duration-200 ease-snap group-hover:text-accent-lift">{item.question}</span>
                {/* Lucide "plus", rotated into a minus when open. SVG only;
                    emoji as icons is banned. */}
                <svg
                  className="flex-none text-fg-dim transition-[color,rotate] duration-200 ease-snap group-open:rotate-90 group-open:text-accent-lift"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  {/* The vertical bar collapses so the plus reads as a minus when open. */}
                  <path
                    className="origin-[12px_12px] transition-[scale] duration-200 ease-snap group-open:scale-y-0"
                    d="M12 5v14"
                  />
                </svg>
              </summary>
              <p className="max-w-[62ch] pb-[clamp(1.1rem,2.5vh,1.6rem)] text-fg-dim text-pretty">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
