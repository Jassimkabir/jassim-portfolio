'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/motion';
import { scrollToId } from '@/lib/scroll';
import { trapFocus } from '@/lib/focusTrap';
import { useSite } from '@/components/SiteProvider';
import { NAV, SITE } from '@/content/site';
import { Close, LogoMark } from '@/components/ui/icons';
import { useClock } from './Clock';

export function NavMenu() {
  const { menuOpen } = useSite();
  if (!menuOpen) return null;
  return <NavMenuPanel />;
}

function NavMenuPanel() {
  const { closeMenu, openModal } = useSite();
  const rootRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(() => prefersReducedMotion());
  const { time } = useClock();

  /* Fade in, then stagger the items with a transition delay. */
  useEffect(() => {
    registerGsap();
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const dismiss = useCallback(
    (then?: () => void) => {
      const finish = () => {
        closeMenu();
        then?.();
      };
      if (prefersReducedMotion()) {
        finish();
        return;
      }
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power3.out',
        onComplete: finish,
      });
    },
    [closeMenu]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return trapFocus(root, () => dismiss());
  }, [dismiss]);

  const go = (item: (typeof NAV)[number]) =>
    dismiss(() => {
      if ('modal' in item && item.modal) openModal();
      else scrollToId(item.target);
    });

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[115] flex flex-col bg-ink text-white"
    >
      {/* top bar */}
      <div className="shell flex w-full items-center justify-between p-5 sm:px-8 sm:py-6">
        <span className="flex items-center gap-2 text-lg font-semibold">
          <LogoMark className="text-xl text-accent-from" />
          {SITE.name}
        </span>
        <button
          type="button"
          onClick={() => dismiss()}
          className="inline-flex items-center gap-2 rounded-control border border-white/15 px-4 py-2 text-xs font-medium tracking-[.05em] text-white/70 uppercase hover:border-white/40 hover:text-white"
        >
          <Close className="text-sm" />
          Close
        </button>
      </div>

      {/* nav */}
      <nav aria-label="Menu" className="shell flex w-full flex-1 flex-col justify-center px-5 sm:px-8">
        <ul className="flex flex-col gap-1">
          {NAV.map((item, i) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => go(item)}
                style={{
                  transitionDelay: `${i * 45 + 80}ms`,
                  transform: entered ? 'translateY(0)' : 'translateY(1rem)',
                  opacity: entered ? 1 : 0,
                }}
                className="group flex w-full items-baseline gap-4 py-2 text-left text-4xl font-semibold tracking-[-.02em] transition-all duration-500 ease-out sm:text-6xl"
              >
                <span className="text-base font-normal text-white/30 transition-colors duration-300 group-hover:text-accent-from">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-white/70 transition-colors duration-300 group-hover:text-white">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* bottom bar */}
      <div className="shell flex w-full flex-col gap-3 border-t border-white/10 px-5 py-6 text-xs tracking-[.025em] text-white/45 uppercase sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>
          {SITE.locationShort} — <span className="tabular-nums">{time}</span>
        </span>
        <button
          type="button"
          onClick={() => dismiss(openModal)}
          className="text-left text-white/70 hover:text-white hover:underline"
        >
          Start a project →
        </button>
      </div>
    </div>
  );
}
