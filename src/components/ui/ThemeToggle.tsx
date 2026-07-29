'use client';

import { useCallback, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Sun01Icon, Moon02Icon } from '@hugeicons/core-free-icons';

import { gsap, Flip, ScrollTrigger, DUR, EASE } from '@/lib/gsap';

type Theme = 'dark' | 'light';

/** Kept in sync with the pre-paint script in the root layout. */
const STORAGE_KEY = 'theme';

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

    /* Theme values change type metrics slightly, so panes can shift by a pixel
       or two. Flip absorbs that as a settle instead of a jump. */
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
      className="icon-round"
      data-magnetic
    >
      <HugeiconsIcon
        icon={theme === 'dark' ? Sun01Icon : Moon02Icon}
        size={20}
        color="currentColor"
        strokeWidth={1.5}
      />
    </button>
  );
}
