'use client';

import {
  onFontsReady,
  prefersReducedMotion,
  reveal,
  revealLines,
  ScrollTrigger,
  useGsapContext,
} from '@/lib/motion';
import { STATS } from '@/content/site';
import { Eyebrow } from '@/components/ui/primitives';

export function Stats() {
  const scopeRef = useGsapContext<HTMLElement>((scope) => {
    const panel = scope.querySelector<HTMLElement>('[data-stats-panel]');
    reveal(panel, { y: 40, scale: 0.99, duration: 0.8, ease: 'expo.out' });

    scope.querySelectorAll<HTMLElement>('[data-stat]').forEach((stat, i) => {
      reveal(stat, { y: 20, delay: i * 0.09 });
    });

    const values = Array.from(scope.querySelectorAll<HTMLElement>('[data-stat-value]'));

    if (prefersReducedMotion()) {
      values.forEach((el) => {
        el.textContent = el.dataset.value ?? '0';
      });
    } else if (panel) {
      values.forEach((el) => {
        const target = Number(el.dataset.value ?? 0);
        let last = -1;
        ScrollTrigger.create({
          trigger: panel,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
          onUpdate: (self) => {
            const next = Math.round(self.progress * target);
            if (next === last) return;
            last = next;
            el.textContent = String(next);
          },
        });
      });
    }

    return onFontsReady(() =>
      revealLines(scope.querySelector<HTMLElement>('[data-stats-title]'), { delay: 0.12 })
    );
  }, []);

  return (
    <section ref={scopeRef} className="bg-white">
      <div className="shell px-5 pb-20 sm:px-8 lg:pb-28">
        <div
          data-stats-panel
          className="rounded-card bg-ink px-6 py-12 text-white sm:p-16 md:px-16"
        >
          <Eyebrow tone="light">{STATS.eyebrow}</Eyebrow>

          <h2
            data-stats-title
            className="mt-4 max-w-[20ch] text-3xl font-medium tracking-[-.01em] md:text-4xl"
          >
            {STATS.heading}
          </h2>

          <ul className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {STATS.items.map((stat) => (
              <li key={stat.label} data-stat>
                <p className="text-5xl font-semibold tracking-[-.02em] tabular-nums sm:text-6xl md:text-7xl">
                  <span data-stat-value data-value={stat.value}>
                    {stat.value}
                  </span>
                  {stat.suffix}
                </p>
                <p className="mt-3 text-sm text-white/55">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
