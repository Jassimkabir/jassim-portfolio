'use client';

import { useEffect, useRef } from 'react';
import {
  gsap,
  hoverSpring,
  prefersReducedMotion,
  registerGsap,
  SPRING,
  useIsomorphicLayoutEffect,
} from '@/lib/motion';
import { scrollToId } from '@/lib/scroll';
import { useSite } from '@/components/SiteProvider';
import { NAV, SITE } from '@/content/site';
import { LogoMark, Menu } from '@/components/ui/icons';
import { useClock } from './Clock';

export function Header() {
  const { ready, openMenu, openModal } = useSite();
  const rootRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const { time, date } = useClock();

  /* Entrance is gated on the loader finishing. */
  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!ready || !el) return;
    registerGsap();

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: -14 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.15 }
    );
    return () => {
      tween.kill();
    };
  }, [ready]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups = [
      hoverSpring(
        root.querySelector<HTMLElement>('[data-brand]'),
        brandRef.current,
        { scale: 1 },
        { scale: 1.04 },
        SPRING.snappy
      ),
      hoverSpring(menuBtnRef.current, menuLabelRef.current, { scale: 1 }, { scale: 1.05 }, SPRING.snappy),
    ];

    root.querySelectorAll<HTMLElement>('[data-hover-lift]').forEach((el) => {
      cleanups.push(
        hoverSpring(el, el, { y: 0, opacity: 0.8 }, { y: -2, opacity: 1 }, SPRING.snappy)
      );
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const go = (item: (typeof NAV)[number]) => {
    if ('modal' in item && item.modal) openModal();
    else scrollToId(item.target);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[60] focus-visible:rounded-control focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-white"
      >
        Skip to content
      </a>

      <header
        ref={rootRef}
        className={`absolute inset-x-0 top-0 z-50 ${ready ? '' : 'opacity-0'}`}
      >
        <div className="shell flex items-center justify-between gap-6 p-5 sm:px-8 sm:py-6">
          {/* brand */}
          <button
            type="button"
            data-brand
            onClick={() => scrollToId('home')}
            aria-label={`${SITE.name} — back to top`}
          >
            <span
              ref={brandRef}
              className="flex items-center gap-2 text-lg font-semibold tracking-[-.01em]"
            >
              <LogoMark className="text-xl text-accent" />
              {SITE.firstName}
            </span>
          </button>

          {/* nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              {NAV.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    data-hover-lift
                    onClick={() => go(item)}
                    aria-current={item.target === 'home' ? 'page' : undefined}
                    className="inline-flex items-center gap-1"
                  >
                    {item.label}
                    {'caret' in item && item.caret ? (
                      <span aria-hidden="true" className="text-xs opacity-60">
                        ▾
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* clock + menu */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 rounded-control border border-line/80 bg-white/40 px-3 py-2 text-xs text-foreground/70 backdrop-blur-[4px] md:flex">
              <span className="text-foreground/45">{SITE.locationShort}</span>
              <span className="min-w-14 font-medium tabular-nums text-foreground">
                {time}
              </span>
              <span className="text-foreground/30" aria-hidden="true">
                •
              </span>
              <span className="font-medium">{date}</span>
            </div>

            <button
              ref={menuBtnRef}
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              className="rounded-control border border-line/80 bg-white/40 backdrop-blur-[4px] hover:bg-white/70"
            >
              <span
                ref={menuLabelRef}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-[.05em] uppercase"
              >
                <Menu className="text-sm" />
                <span className="hidden sm:inline">Menu</span>
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
