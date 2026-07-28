'use client';

import { useEffect, useRef } from 'react';
import { hoverSpring, onFontsReady, reveal, revealLines, SPRING, useGsapContext } from '@/lib/motion';
import { WORK } from '@/content/site';
import { Eyebrow, TagChip } from '@/components/ui/primitives';
import { PillButton } from '@/components/ui/PillButton';
import { ArrowUpRight, LogoMark } from '@/components/ui/icons';

export function Work() {
  const gridRef = useRef<HTMLUListElement>(null);

  const scopeRef = useGsapContext<HTMLElement>((scope) => {
    reveal(scope.querySelector('[data-work-eyebrow]'));

    scope.querySelectorAll<HTMLElement>('[data-work-card]').forEach((card, i) => {
      reveal(card, { y: 48, delay: i * 0.09 });
    });

    return onFontsReady(() =>
      revealLines(scope.querySelector<HTMLElement>('[data-work-title]'), { delay: 0.12 })
    );
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cleanups: Array<() => void> = [];
    grid.querySelectorAll<HTMLElement>('[data-work-article]').forEach((article) => {
      cleanups.push(
        hoverSpring(article, article, { y: 0, scale: 1 }, { y: -8, scale: 1.012 }, SPRING.quick)
      );
      cleanups.push(
        hoverSpring(
          article,
          article.querySelector<HTMLElement>('[data-work-badge]'),
          { rotate: 0, scale: 1 },
          { rotate: 45, scale: 1.08 },
          SPRING.snappy
        )
      );
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={scopeRef} id="work" className="bg-white">
      <div className="shell px-5 pt-10 pb-20 sm:px-8 lg:pb-28">
        <div className="flex flex-col items-center text-center">
          <span data-work-eyebrow className="rounded-pill border border-line px-4 py-1.5">
            <Eyebrow>{WORK.eyebrow}</Eyebrow>
          </span>
          <h2
            data-work-title
            className="mt-5 mb-12 w-fit text-4xl font-semibold tracking-[-.02em] sm:mb-14 sm:text-5xl"
          >
            {WORK.heading}
          </h2>
        </div>

        <ul ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {WORK.projects.map((project) => (
            <li key={project.name} data-work-card>
              <a href={project.href} target="_blank" rel="noreferrer" className="block">
                <article
                  data-work-article
                  className="relative min-h-88 overflow-hidden rounded-card bg-ink p-6 text-white ring-1 ring-white/5 sm:min-h-104 sm:p-8"
                >
                  <div className="relative z-10 flex items-start justify-between text-xs tracking-[.025em] text-white/45 uppercase">
                    <span>
                      {project.type} — {project.year}
                    </span>
                    <span
                      data-work-badge
                      aria-hidden="true"
                      className="grid size-11 place-items-center rounded-pill bg-white/10 ring-1 ring-white/15"
                    >
                      <ArrowUpRight className="text-base" />
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 grid place-items-center"
                  >
                    <span className="flex items-start gap-1">
                      <LogoMark className="text-7xl text-white/90" />
                      <span className="text-xs text-white/60">®</span>
                    </span>
                  </span>

                  <div className="absolute inset-x-6 bottom-6 z-10 sm:inset-x-8 sm:bottom-8">
                    <h3 className="text-2xl font-medium tracking-[-.01em] sm:text-3xl">
                      {project.name}
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-white/55">{project.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <TagChip key={tag} tone="light">
                          {tag}
                        </TagChip>
                      ))}
                    </div>
                  </div>
                </article>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <PillButton variant="outline" arrow="up-right" href={WORK.ctaHref} external>
            {WORK.cta}
          </PillButton>
        </div>
      </div>
    </section>
  );
}
