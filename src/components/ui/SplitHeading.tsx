'use client';

import { useRef, type ElementType } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, SplitText, ScrollTrigger, DUR, EASE } from '@/lib/gsap';

type Variant = 'display-xl' | 'display-lg' | 'heading';

type SplitHeadingProps = {
  children: string;
  as?: ElementType;
  variant?: Variant;
  /** Chars are for the hero only. Everything else splits by line with masking. */
  splitBy?: 'lines' | 'chars';
  /**
   * Animate Bricolage's width axis as the heading enters. Full amplitude on the
   * hero, low amplitude on section headings.
   */
  widthAxis?: { from: number; to: number } | null;
  /** Hero runs off the load timeline, not off a ScrollTrigger. */
  trigger?: boolean;
  delay?: number;
  className?: string;
};

export default function SplitHeading({
  children,
  as: Tag = 'h2',
  variant = 'heading',
  splitBy = 'lines',
  widthAxis = null,
  trigger = true,
  delay = 0,
  className = '',
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* `mask` wraps each line in an overflow-hidden parent so the reveal
           slides out from behind a clean edge rather than just fading. */
        const split = SplitText.create(el, {
          type: splitBy,
          mask: splitBy,
          linesClass: 'split-line',
        });

        const targets = splitBy === 'chars' ? split.chars : split.lines;

        const tl = gsap.timeline({
          delay,
          paused: trigger,
          defaults: { ease: EASE.glass },
        });

        tl.from(targets, {
          yPercent: 110,
          duration: DUR.base,
          stagger: splitBy === 'chars' ? 0.02 : 0.08,
        });

        /*
         * Width-axis animation.
         *
         * The standing rule is transform, opacity and filter only. This is the
         * one documented exception: font-variation-settings repaints, so it
         * runs on entrance only, never on a scrub and never during scroll. The
         * rule exists to protect the per-frame scroll budget, and a bounded
         * one-shot tween does not touch it.
         */
        if (widthAxis) {
          const axis = { wdth: widthAxis.from };
          tl.to(
            axis,
            {
              wdth: widthAxis.to,
              duration: DUR.slow,
              onStart: () => {
                el.style.willChange = 'font-variation-settings';
              },
              onUpdate: () => {
                el.style.fontVariationSettings = `"wdth" ${axis.wdth.toFixed(1)}`;
              },
              onComplete: () => {
                el.style.willChange = '';
              },
            },
            0,
          );
        }

        let st: ScrollTrigger | undefined;
        if (trigger) {
          st = ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => tl.play(),
          });
        }

        return () => {
          st?.kill();
          tl.kill();
          split.revert();
        };
      });

      /* Reduced motion gets the text, unanimated, with no split wrappers. */
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={[variant, className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
