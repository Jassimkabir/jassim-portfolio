'use client';

import { useRef } from 'react';
import { gsap, prefersReducedMotion, ScrollTrigger, useGsapContext } from '@/lib/motion';
import { MARQUEE } from '@/content/site';
import { LogoMark } from '@/components/ui/icons';

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scopeRef = useGsapContext<HTMLElement>((scope) => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const tl = gsap.to(track, {
      xPercent: -50,
      duration: 26,
      ease: 'none',
      repeat: -1,
    });

    let hovering = false;
    const enter = () => {
      hovering = true;
      gsap.to(tl, { timeScale: 0.25, duration: 0.4 });
    };
    const leave = () => {
      hovering = false;
      gsap.to(tl, { timeScale: 1, duration: 0.4 });
    };
    scope.addEventListener('mouseenter', enter);
    scope.addEventListener('mouseleave', leave);

    /* Scrolling nudges the strip along a little faster. */
    ScrollTrigger.create({
      trigger: scope,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (hovering) return;
        const velocity = Math.abs(self.getVelocity());
        const target = gsap.utils.clamp(0.8, 2.2, 0.8 + velocity / 1500);
        gsap.to(tl, { timeScale: target, duration: 0.3, overwrite: true });
      },
    });

    return () => {
      scope.removeEventListener('mouseenter', enter);
      scope.removeEventListener('mouseleave', leave);
    };
  }, []);

  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-10 pr-10">
      {MARQUEE.map((phrase, i) => (
        <span key={phrase} className="flex items-center gap-10 whitespace-nowrap">
          <span className={i % 2 ? 'text-foreground/35' : undefined}>{phrase}</span>
          <LogoMark className="text-xl text-accent" />
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={scopeRef}
      className="marquee-fade relative overflow-hidden border-y border-line bg-white"
    >
      <h2 className="sr-only">What I work on</h2>
      <p className="sr-only">{MARQUEE.join(', ')}.</p>

      <div
        ref={trackRef}
        aria-hidden="true"
        className="flex w-max py-6 text-3xl font-medium tracking-[-.01em] sm:py-8 sm:text-4xl"
      >
        {group('a')}
        {group('b')}
      </div>
    </section>
  );
}
