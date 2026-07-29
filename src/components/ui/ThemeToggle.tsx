'use client';

import { useCallback, useState } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, Flip, ScrollTrigger, DUR, EASE } from '@/lib/gsap';

type Theme = 'dark' | 'light';

/** Kept in sync with the pre-paint script in the root layout. */
const STORAGE_KEY = 'theme';

/* Lucide geometry, inlined rather than pulling the package in for two icons.
   SVG only; emoji as icons is banned. */
function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  /* Read what the pre-paint script already decided rather than deciding again,
     so the button label never disagrees with the rendered theme. */
  useGSAP(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === 'light' ? 'light' : 'dark');
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const panes = gsap.utils.toArray<HTMLElement>('.pane');

    /* Theme values change type metrics slightly (weights differ between the
       two modes), so panes can shift by a pixel or two. Flip absorbs that as
       a settle instead of a jump. */
    const state = reduced ? null : Flip.getState(panes);

    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Private mode or storage disabled. The theme still applies for the
         session; only persistence is lost. */
    }
    setTheme(next);

    if (state) {
      Flip.from(state, {
        duration: DUR.fast,
        ease: EASE.snap,
        absolute: false,
        onComplete: () => ScrollTrigger.refresh(),
      });
    } else {
      ScrollTrigger.refresh();
    }
  }, []);

  const nextLabel = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextLabel} theme`}
      className={[
        'grid size-11 cursor-pointer place-items-center rounded-pane',
        'border border-pane-edge text-fg-dim',
        'transition-[color,border-color] duration-200 ease-snap',
        'hover:border-accent-lift hover:text-fg',
      ].join(' ')}
      data-magnetic
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
