'use client';

import { useEffect, useRef } from 'react';
import {
  hoverSpring,
  onFontsReady,
  reveal,
  revealLines,
  SPRING,
  useGsapContext,
} from '@/lib/motion';
import { scrollToId } from '@/lib/scroll';
import { useSite } from '@/components/SiteProvider';
import { HERO, SITE } from '@/content/site';
import { CircleDot, Star } from '@/components/ui/icons';
import { PillButton } from '@/components/ui/PillButton';
import { LiquidReveal } from './LiquidReveal';
import { HeroCard } from './HeroCard';

const q = <T extends HTMLElement>(scope: HTMLElement, selector: string) =>
  scope.querySelector<T>(selector);

export function Hero() {
  const { ready, openModal } = useSite();
  const stackRef = useRef<HTMLUListElement>(null);

  /* Every hero reveal waits for the loader to finish. */
  const scopeRef = useGsapContext<HTMLElement>(
    (scope) => {
      if (!ready) return;

      reveal(q(scope, '[data-hero-eyebrow]'), { y: 10, delay: 0.2, immediate: true });
      reveal(q(scope, '[data-hero-proof]'), { delay: 0.65, immediate: true });
      reveal(q(scope, '[data-hero-cta]'), { delay: 0.75, immediate: true });
      reveal(q(scope, '[data-hero-card]'), {
        y: 16,
        scale: 0.96,
        duration: 0.8,
        ease: 'expo.out',
        delay: 0.4,
        immediate: true,
      });
      reveal(q(scope, '[data-hero-stack]'), { y: 14, delay: 0.55, immediate: true });
      reveal(q(scope, '[data-hero-status]'), { y: 0, delay: 0.9, immediate: true });
      reveal(q(scope, '[data-hero-watermark]'), {
        y: 20,
        duration: 1.1,
        ease: 'expo.out',
        delay: 0.3,
        immediate: true,
      });

      /* Lines are measured after webfonts land so they break correctly. */
      return onFontsReady(() =>
        revealLines(q(scope, '[data-hero-title]'), {
          stagger: 0.12,
          delay: 0.25,
          immediate: true,
        })
      );
    },
    [ready]
  );

  useEffect(() => {
    const list = stackRef.current;
    if (!list) return;
    const cleanups = Array.from(list.querySelectorAll<HTMLElement>('[data-stack-item]')).map(
      (el) => hoverSpring(el, el, { y: 0, opacity: 0.7 }, { y: -2, opacity: 1 }, SPRING.snappy)
    );
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={scopeRef}
      id="home"
      className="relative isolate overflow-hidden rounded-b-card bg-hero-to"
    >
      <LiquidReveal base={HERO.base} reveal={HERO.reveal} alt={HERO.alt} />

      {/* vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(255,255,255,.35),transparent,rgba(255,255,255,.35))]"
      />

      {/* watermark */}
      <span
        data-hero-watermark
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-28 z-[1] text-center text-watermark leading-none font-bold text-white/40 select-none"
      >
        {SITE.watermark}
      </span>

      <div className="shell relative z-20 flex flex-col gap-8 px-5 pt-28 pb-20 sm:px-8 lg:grid lg:min-h-[100lvh] lg:grid-cols-12 lg:gap-10 lg:pt-36 lg:pb-28">
        {/* left */}
        <div className="flex flex-col gap-7 lg:col-span-7">
          <span
            data-hero-eyebrow
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"
          >
            <span className="size-1.5 rounded-pill bg-foreground/50" aria-hidden="true" />
            {HERO.eyebrow}
          </span>

          <h1
            data-hero-title
            className="lines max-w-[18ch] text-4xl leading-[.98] font-semibold tracking-[-.02em] sm:text-5xl md:text-6xl"
          >
            {HERO.headline.map((line) => (
              <span data-line key={line}>
                {line}
              </span>
            ))}
          </h1>

          <div data-hero-proof className="flex items-center gap-3">
            <span className="flex items-center gap-0.5 text-base text-accent" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} />
              ))}
            </span>
            <span className="text-sm font-medium text-foreground/70">{HERO.proof}</span>
          </div>

          <div data-hero-cta className="flex flex-wrap gap-3">
            <PillButton variant="dark" arrow="right" onClick={openModal}>
              {HERO.ctaPrimary}
            </PillButton>
            <PillButton variant="outline" onClick={() => scrollToId('work')}>
              {HERO.ctaSecondary}
            </PillButton>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col items-start gap-8 lg:col-span-5 lg:items-end">
          <HeroCard />

          {/* Panelled like the hero card — the portrait sits directly
              behind this column, so plain text would be unreadable. */}
          <div
            data-hero-stack
            className="w-full max-w-96 rounded-card-sm bg-white/60 px-4 py-3.5 ring-1 ring-line/60 backdrop-blur-[12px] lg:w-76"
          >
            <p className="mb-3 text-left text-xs font-medium text-foreground/45 lg:text-right">
              {HERO.stackLabel}
            </p>
            {/* Two columns, not four — these stack names are long enough
                that four would overflow the 19rem strip at lg. */}
            <ul ref={stackRef} className="grid grid-cols-2 gap-x-4 gap-y-3">
              {HERO.stack.map((name) => (
                <li key={name}>
                  <span
                    data-stack-item
                    className="flex items-center gap-1.5 text-xs text-foreground/70"
                  >
                    <CircleDot className="text-sm text-foreground/40" />
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* status bar */}
      <div data-hero-status className="relative z-20">
        <div className="shell flex items-center justify-between gap-3 border-t border-foreground/10 p-5 text-xs font-medium tracking-[.025em] text-foreground/60 uppercase sm:px-8">
          <span>{HERO.status.left}</span>
          <span className="hidden sm:inline">{HERO.status.center}</span>
          <span className="inline-flex items-center gap-2">
            {HERO.status.right} <span aria-hidden="true">↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}
