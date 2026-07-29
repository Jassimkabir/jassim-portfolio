'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, Observer } from '@/lib/gsap';

/** Elements carrying this attribute magnetise toward the cursor. */
const MAGNET_SELECTOR = '[data-magnetic]';

/** Detection radius, from the ui-ux-pro-max Interactive Cursor entry. */
const MAGNET_RADIUS = 100;

/** Maximum travel. The pull is meant to be felt, not seen. */
const MAGNET_TRAVEL = 8;

/**
 * A 12px ring that lags the pointer.
 *
 * Fine-pointer and hover-capable only, and never the only affordance for
 * anything. ui-ux-pro-max rates custom cursors "Not for touch/SR", so every
 * element it decorates keeps its own hover state, focus ring and cursor:pointer
 * independently of this component existing.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        fine: '(hover: hover) and (pointer: fine)',
        motion: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { fine, motion } = context.conditions as {
          fine: boolean;
          motion: boolean;
        };
        if (!fine || !motion) return;

        document.body.dataset.cursor = 'custom';

        /* quickTo, never gsap.to inside a pointer handler. */
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

        const magnets = gsap.utils.toArray<HTMLElement>(MAGNET_SELECTOR);
        const magnetTo = magnets.map((m) => ({
          el: m,
          x: gsap.quickTo(m, 'x', { duration: 0.4, ease: 'power3' }),
          y: gsap.quickTo(m, 'y', { duration: 0.4, ease: 'power3' }),
        }));

        /* Observer rather than a raw mousemove listener, so the same code path
           handles pointer, wheel and touch input consistently. */
        const observer = Observer.create({
          type: 'pointer',
          onMove: (self) => {
            const x = self.x ?? 0;
            const y = self.y ?? 0;

            el.dataset.active = 'true';
            xTo(x);
            yTo(y);

            for (const magnet of magnetTo) {
              const rect = magnet.el.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              const dx = x - cx;
              const dy = y - cy;
              const dist = Math.hypot(dx, dy);

              if (dist < MAGNET_RADIUS) {
                /* Falls off with distance so the pull eases in rather than
                   snapping on at the radius boundary. */
                const pull = gsap.utils.mapRange(
                  MAGNET_RADIUS,
                  0,
                  0,
                  MAGNET_TRAVEL,
                  dist,
                );
                magnet.x((dx / dist) * pull);
                magnet.y((dy / dist) * pull);
                el.dataset.hovering = 'true';
              } else {
                magnet.x(0);
                magnet.y(0);
              }
            }

            if (!magnetTo.some((m) => m.el.matches(':hover'))) {
              el.dataset.hovering = 'false';
            }
          },
        });

        const onLeave = () => {
          el.dataset.active = 'false';
        };
        document.documentElement.addEventListener('mouseleave', onLeave);

        return () => {
          observer.kill();
          document.documentElement.removeEventListener('mouseleave', onLeave);
          delete document.body.dataset.cursor;
          gsap.set(magnets, { x: 0, y: 0 });
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={[
        'pointer-events-none fixed top-0 left-0 z-[9997] -mt-1.5 -ml-1.5 size-3',
        'rounded-chip border border-accent-lift opacity-0',
        'transition-[opacity,scale] duration-200 ease-snap',
        'data-[active=true]:opacity-100',
        // Never the only affordance for anything, so it only ever scales.
        'data-[hovering=true]:scale-[2.2]',
        'motion-reduce:hidden',
      ].join(' ')}
    />
  );
}
