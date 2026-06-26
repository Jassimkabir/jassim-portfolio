"use client";

import { useEffect, useState } from "react";
import { CONTENT } from "@/content/site";

/**
 * Minimal, on-brand delights:
 *  - Konami code → glyph burst + rainbow (dispatches "jk:party" for Effects) + toast
 *  - a styled console greeting for devs who peek
 *  - a cheeky tab title when you leave, restored when you return
 * All purely additive and easy to remove.
 */
export default function EasterEggs() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    /* ---- console greeting (once) ---- */
    const w = window as unknown as { __jkHello?: boolean };
    if (!w.__jkHello) {
      w.__jkHello = true;
      const big = "font:700 26px monospace;color:#5eead4";
      const p = "color:#a78bfa;font:14px/1.6 monospace";
      const a = "color:#fbbf24;font:13px monospace";
      console.log(`%c${CONTENT.name} ✦`, big);
      console.log("%cYou opened the console — respect.\nTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A", p);
      console.log(`%cLike what you see? → ${CONTENT.contact.email}`, a);
    }

    /* ---- cheeky tab title on blur ---- */
    const original = document.title;
    const away = ["(╯°□°)╯ come back!", "👀 don't go…", "psst — your code misses you"];
    const onVis = () => {
      if (document.hidden) document.title = away[Math.floor(Math.random() * away.length)];
      else document.title = original;
    };
    document.addEventListener("visibilitychange", onVis);

    /* ---- Konami code ---- */
    const seq = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
    ];
    let pos = 0;
    let toastTimer: ReturnType<typeof setTimeout>;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === seq[pos] ? pos + 1 : key === seq[0] ? 1 : 0;
      if (pos === seq.length) {
        pos = 0;
        window.dispatchEvent(new Event("jk:party"));
        setToast("dev mode unlocked — you found it ✦");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => setToast(null), 3200);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("keydown", onKey);
      clearTimeout(toastTimer);
      document.title = original;
    };
  }, []);

  return (
    <div className={`egg-toast${toast ? " show" : ""}`} role="status" aria-live="polite">
      <span className="egg-dot" aria-hidden="true" />
      {toast}
    </div>
  );
}
