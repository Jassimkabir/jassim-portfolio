'use client';

import { useEffect, useRef } from 'react';
import { hoverSpring, onFontsReady, reveal, revealLines, SPRING, useGsapContext } from '@/lib/motion';
import { useSite } from '@/components/SiteProvider';
import { SERVICES } from '@/content/site';
import { Eyebrow } from '@/components/ui/primitives';
import { ArrowUpRight } from '@/components/ui/icons';

export function Services() {
  const { openModal } = useSite();
  const listRef = useRef<HTMLUListElement>(null);

  const scopeRef = useGsapContext<HTMLElement>((scope) => {
    reveal(scope.querySelector('[data-services-eyebrow]'));

    scope.querySelectorAll<HTMLElement>('[data-service-row]').forEach((row, i) => {
      reveal(row, { y: 24, delay: i * 0.08 });
    });

    return onFontsReady(() =>
      revealLines(scope.querySelector<HTMLElement>('[data-services-title]'), { delay: 0.12 })
    );
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const cleanups: Array<() => void> = [];
    list.querySelectorAll<HTMLElement>('[data-service-hit]').forEach((hit) => {
      cleanups.push(
        hoverSpring(
          hit,
          hit,
          {
            backgroundColor: 'rgba(241,240,238,0)',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
          {
            backgroundColor: 'rgba(241,240,238,1)',
            paddingLeft: '2rem',
            paddingRight: '1.25rem',
          },
          SPRING.fill
        )
      );
      cleanups.push(
        hoverSpring(
          hit,
          hit.querySelector<HTMLElement>('[data-service-badge]'),
          { x: 0 },
          { x: 5 },
          SPRING.snappy
        )
      );
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={scopeRef} id="services" className="bg-white">
      <div className="shell px-5 py-20 sm:px-8 lg:py-28">
        <span data-services-eyebrow className="inline-block">
          <Eyebrow>{SERVICES.eyebrow}</Eyebrow>
        </span>

        <h2
          data-services-title
          className="mt-5 mb-12 max-w-[16ch] text-4xl font-semibold tracking-[-.02em] sm:mb-14 sm:text-5xl"
        >
          {SERVICES.heading}
        </h2>

        <ul ref={listRef}>
          {SERVICES.items.map((item, i) => (
            <li
              key={item.title}
              data-service-row
              className={i === 0 ? undefined : 'border-t border-line'}
            >
              <button
                type="button"
                data-service-hit
                onClick={openModal}
                className="flex w-full items-center gap-4 rounded-card-sm px-6 py-6 text-left sm:gap-6 sm:py-8"
              >
                <span className="w-7 text-sm font-medium text-foreground/40 sm:w-10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="flex-1 text-2xl font-medium tracking-[-.01em] sm:text-3xl md:text-4xl">
                  {item.title}
                </h3>
                <p className="hidden max-w-80 text-sm text-foreground/55 lg:block">{item.desc}</p>
                <span
                  data-service-badge
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-pill bg-ink text-white sm:size-12"
                >
                  <ArrowUpRight className="text-base" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
