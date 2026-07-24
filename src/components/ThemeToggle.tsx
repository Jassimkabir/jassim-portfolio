"use client";

import { useCallback } from "react";

type VTDocument = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

/**
 * Morning / Late edition toggle. State lives on <html data-theme> (set
 * pre-paint by the inline script in layout) as "day" | "night", so every
 * toggle instance stays in sync and styling is driven purely by CSS.
 * Switching uses the View Transition API for a print-style cross-fade.
 */
export default function ThemeToggle() {
  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = root.dataset.theme === "night" ? "day" : "night";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* storage may be unavailable */
      }
    };

    const doc = document as VTDocument;
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (doc.startViewTransition && !reduce) {
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Switch between the morning and late editions"
      data-cursor
    >
      {/* sun — shown in the night edition, offering the morning */}
      <svg className="i-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
      </svg>
      {/* moon — shown in the day edition, offering the late edition */}
      <svg className="i-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <span className="lbl-day">Late Edition</span>
      <span className="lbl-night">Morning Edition</span>
    </button>
  );
}
