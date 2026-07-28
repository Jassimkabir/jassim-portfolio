'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/motion';
import { HERO } from '@/content/site';
import { ArrowRight, LogoMark } from '@/components/ui/icons';

const AUTO_MS = 5000;
const ITEMS = HERO.cards;

export function HeroCard() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const slotRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const mounted = useRef(false);

  /* Animate the incoming copy in from the side the swap came from. */
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    animating.current = false;
    if (prefersReducedMotion()) return;
    registerGsap();
    gsap.fromTo(
      slotRef.current,
      { y: direction > 0 ? 14 : -14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
    );
  }, [index, direction]);

  const advance = (step: number) => {
    if (animating.current) return;
    const next = (index + step + ITEMS.length) % ITEMS.length;

    if (prefersReducedMotion()) {
      setDirection(step);
      setIndex(next);
      return;
    }

    registerGsap();
    animating.current = true;
    gsap.to(slotRef.current, {
      y: step > 0 ? -14 : 14,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.out',
      onComplete: () => {
        setDirection(step);
        setIndex(next);
      },
    });
  };

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => advance(1), AUTO_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index]);

  const item = ITEMS[index];

  return (
    <div
      data-hero-card
      className="w-full max-w-96 rounded-card-sm bg-white/70 p-2 shadow-sm ring-1 ring-line/70 backdrop-blur-[12px] lg:w-76"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="group"
      aria-label="What I build"
    >
      <div
        className="flex cursor-pointer gap-2 rounded-control"
        onClick={() => advance(1)}
      >
        <div className="grid aspect-square w-24 place-items-center rounded-control bg-ink text-3xl text-white">
          <LogoMark className="text-accent-from" />
        </div>

        <div className="flex flex-1 flex-col justify-between rounded-control bg-surface/70 p-3">
          <div ref={slotRef} className="relative min-h-13">
            <p className="text-[.65rem] font-medium tracking-[.05em] text-foreground/45 uppercase">
              {item.caption}
            </p>
            <p className="max-w-36 text-sm leading-[1.35] font-medium">{item.title}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {ITEMS.map((entry, i) => (
                <span
                  key={entry.caption}
                  className={`h-1 rounded-pill transition-all duration-300 ${
                    i === index ? 'w-4 bg-foreground/70' : 'w-1.5 bg-foreground/20'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous"
                onClick={(event) => {
                  event.stopPropagation();
                  advance(-1);
                }}
                className="grid size-7 place-items-center rounded-pill bg-white text-foreground/70 ring-1 ring-line hover:text-foreground"
              >
                <ArrowRight className="rotate-180 text-xs" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(event) => {
                  event.stopPropagation();
                  advance(1);
                }}
                className="grid size-7 place-items-center rounded-pill bg-white text-foreground/70 ring-1 ring-line hover:text-foreground"
              >
                <ArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
