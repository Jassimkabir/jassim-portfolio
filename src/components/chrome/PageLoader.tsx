'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/motion';
import { startScroll, stopScroll } from '@/lib/scroll';
import { useSite } from '@/components/SiteProvider';
import { LOADER, SITE } from '@/content/site';
import { LogoMark } from '@/components/ui/icons';

const FILL_MS = 1300;

/* easeInOutCubic */
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function PageLoader() {
  const { finishIntro } = useSite();
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const finished = useRef(false);

  useEffect(() => {
    stopScroll();
  }, []);

  useEffect(() => {
    registerGsap();

    const done = () => {
      setGone(true);
      finishIntro();
      startScroll();
    };

    const exit = () => {
      if (finished.current) return;
      finished.current = true;

      if (prefersReducedMotion()) {
        done();
        return;
      }

      gsap
        .timeline({ onComplete: done })
        .to(centerRef.current, { opacity: 0, y: -12, duration: 0.35, ease: 'power2.out' }, 0)
        .to(rootRef.current, { yPercent: -100, duration: 0.7, ease: 'expo.out' }, 0);
    };

    /* Reduced motion: land on 100 and get out of the way after one frame. */
    if (prefersReducedMotion()) {
      const id = requestAnimationFrame(() => {
        setProgress(100);
        exit();
      });
      return () => cancelAnimationFrame(id);
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / FILL_MS, 1);
      setProgress(Math.round(ease(t) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else exit();
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [finishIntro]);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-8 rounded-b-card bg-ink text-white"
      role="status"
      aria-live="polite"
      aria-label={`${LOADER.label} ${progress}%`}
    >
      <div ref={centerRef} className="flex flex-col items-center gap-5 text-center">
        <span className="flex items-center gap-2 text-2xl font-semibold sm:text-3xl">
          <LogoMark className="text-3xl text-accent-from" />
          {SITE.name}
        </span>
        <p className="max-w-[26ch] text-sm text-white/55">{LOADER.tagline}</p>
      </div>

      <div className="flex w-[min(22rem,72vw)] flex-col gap-3">
        <div className="h-px w-full bg-white/15">
          <div
            className="h-full bg-accent-from transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs font-medium tracking-[.05em] text-white/45 uppercase">
          <span>{LOADER.label}</span>
          <span className="tabular-nums text-white/80">
            {String(progress).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
