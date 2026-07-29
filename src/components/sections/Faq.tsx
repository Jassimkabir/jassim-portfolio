'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, MinusSignIcon } from '@hugeicons/core-free-icons';

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

      /*
       * GSAP-driven accordion.
       *
       * <details> is kept for the semantics and the no-JS fallback, but it
       * snaps open with no height to animate, so the click is intercepted and
       * the panel is tweened instead:
       *   opening  set open first, so the content is in flow and measurable,
       *            then tween height 0 -> auto
       *   closing  tween height -> 0 first and only clear `open` on complete,
       *            or the panel vanishes before the animation runs
       *
       * The icon still keys off [open] in CSS, so it flips at the right moment
       * in both directions with no extra wiring.
       */
      const items = gsap.utils.toArray<HTMLDetailsElement>('[data-faq-item]');

      const handlers = items.map((el) => {
        const summary = el.querySelector('summary');
        const panel = el.querySelector<HTMLElement>('[data-faq-panel]');
        if (!summary || !panel) return () => {};

        const onClick = (e: Event) => {
          e.preventDefault();

          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.open = !el.open;
            gsap.set(panel, { height: 'auto', opacity: 1 });
            return;
          }

          gsap.killTweensOf(panel);

          if (el.open) {
            gsap.to(panel, {
              height: 0,
              opacity: 0,
              duration: DUR.fast,
              ease: EASE.snap,
              onComplete: () => {
                el.open = false;
              },
            });
          } else {
            el.open = true;
            gsap.fromTo(
              panel,
              { height: 0, opacity: 0 },
              { height: 'auto', opacity: 1, duration: DUR.base, ease: EASE.glass },
            );
          }
        };

        summary.addEventListener('click', onClick);
        return () => summary.removeEventListener('click', onClick);
      });

      return () => {
        for (const off of handlers) off();
        mm.revert();
      };
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
                {/*
                  Plus swaps to minus on open. Both are stacked in one grid
                  cell and cross-faded rather than conditionally rendered,
                  because <details> toggles in CSS with no React state to hook
                  into, and swapping nodes would kill the transition.

                  PlusIcon and MinusIcon do not exist in the free Hugeicons set;
                  PlusSignIcon and MinusSignIcon are the equivalents.
                */}
                <span className="grid flex-none place-items-center text-fg-dim transition-colors duration-200 ease-snap group-open:text-accent-lift">
                  <HugeiconsIcon
                    icon={PlusSignIcon}
                    size={20}
                    color="currentColor"
                    strokeWidth={2}
                    className="col-start-1 row-start-1 transition-[opacity,rotate] duration-200 ease-snap group-open:rotate-90 group-open:opacity-0"
                  />
                  <HugeiconsIcon
                    icon={MinusSignIcon}
                    size={20}
                    color="currentColor"
                    strokeWidth={2}
                    className="col-start-1 row-start-1 -rotate-90 opacity-0 transition-[opacity,rotate] duration-200 ease-snap group-open:rotate-0 group-open:opacity-100"
                  />
                </span>
              </summary>
              {/* overflow-hidden so the height tween clips rather than
                  spilling. Height animates on this wrapper, never on the
                  paragraph, so the text never reflows mid-animation. */}
              <div data-faq-panel className="overflow-hidden">
                <p className="max-w-[62ch] pb-[clamp(1.1rem,2.5vh,1.6rem)] text-fg-dim text-pretty">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
