'use client';

import {
  gsap,
  onFontsReady,
  prefersReducedMotion,
  reveal,
  revealLines,
  ScrollTrigger,
  useGsapContext,
} from '@/lib/motion';
import { EXPERIENCE } from '@/content/site';
import { Eyebrow, TagChip } from '@/components/ui/primitives';

export function Experience() {
  const scopeRef = useGsapContext<HTMLElement>((scope) => {
    reveal(scope.querySelector('[data-exp-eyebrow]'));

    const entries = Array.from(scope.querySelectorAll<HTMLElement>('[data-exp-entry]'));
    entries.forEach((entry, i) => reveal(entry, { y: 24, delay: i * 0.08 }));

    const rail = scope.querySelector<HTMLElement>('[data-exp-rail]');
    const progress = scope.querySelector<HTMLElement>('[data-exp-progress]');
    const nodes = Array.from(scope.querySelectorAll<HTMLElement>('[data-exp-node]'));

    if (rail && progress) {
      if (prefersReducedMotion()) {
        gsap.set(progress, { scaleY: 1 });
      } else {
        let active = -1;

        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: rail,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.6,
              onUpdate: (self) => {
                /* Light up every node the progress head has passed. */
                const head = self.progress * rail.offsetHeight;
                let next = -1;
                nodes.forEach((node, i) => {
                  if (node.offsetTop <= head) next = i;
                });
                if (next === active) return;
                active = next;
                nodes.forEach((node, i) => {
                  gsap.to(node, {
                    backgroundColor: i <= next ? '#b15f2c' : '#ffffff',
                    scale: i <= next ? 1.15 : 1,
                    duration: 0.3,
                    overwrite: 'auto',
                  });
                });
              },
            },
          }
        );
      }
    }

    return onFontsReady(() => {
      revealLines(scope.querySelector<HTMLElement>('[data-exp-title]'), { delay: 0.12 });
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <section ref={scopeRef} id="experience" className="bg-surface">
      <div className="shell px-5 py-20 sm:px-8 lg:py-28">
        <span data-exp-eyebrow className="inline-block">
          <Eyebrow>{EXPERIENCE.eyebrow}</Eyebrow>
        </span>

        <h2
          data-exp-title
          className="mt-5 mb-14 max-w-[18ch] text-4xl font-semibold tracking-[-.02em] sm:text-5xl"
        >
          {EXPERIENCE.heading}
        </h2>

        <div data-exp-rail className="relative pl-7 sm:pl-10">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[.4375rem] w-px bg-line"
          />
          <span
            data-exp-progress
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[.4375rem] w-px origin-top bg-accent"
          />

          <ul>
            {EXPERIENCE.items.map((item) => (
              <li
                key={`${item.company}-${item.period}`}
                data-exp-entry
                className="relative grid gap-2 border-b border-line py-8 last:border-b-0 lg:grid-cols-[10rem_1fr] lg:items-start lg:gap-10"
              >
                {/* Pulled back out of the rail's padding so the node
                    centres on the line rather than on the period text. */}
                <span
                  data-exp-node
                  aria-hidden="true"
                  className="absolute top-8 -left-7 size-3.5 rounded-pill bg-white ring-1 ring-line sm:-left-10"
                />

                <p className="text-xs font-medium tracking-[.05em] text-foreground/45 uppercase">
                  {item.period}
                </p>

                <div>
                  <h3 className="text-xl font-medium">{item.role}</h3>
                  <p className="text-sm text-accent">{item.company}</p>
                  <p className="mt-2 max-w-xl text-sm text-foreground/55">{item.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <TagChip key={tag}>{tag}</TagChip>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
