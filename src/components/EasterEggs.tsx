"use client";

import { useEffect, useState } from "react";
import { CONTENT } from "@/content/site";

/**
 * On-brand newsroom delights:
 *  - Konami code → ornament shuffle (dispatches "jk:party") + a stop-press toast
 *  - press "X" (outside inputs) → the crossword unfolds into view
 *  - a styled console greeting for devs who peek behind the presses
 *  - a cheeky tab title when you leave, restored when you return
 * All purely additive.
 */
export default function EasterEggs() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    /* ---- console greeting (once) ---- */
    const w = window as unknown as { __jkHello?: boolean };
    if (!w.__jkHello) {
      w.__jkHello = true;
      const big = "font:700 24px Georgia,serif;color:#97281d";
      const p = "color:inherit;font:13px/1.6 monospace";
      const a = "color:#97281d;font:13px monospace";
      console.log(`%c★ ${CONTENT.paper.title} ★`, big);
      console.log(
        "%cYou opened the console — a reader after our own heart.\nHeadlines for the curious:\n • Press X for the crossword\n • Konami code: ↑ ↑ ↓ ↓ ← → ← → B A\n • A secret hides in the Classifieds…",
        p,
      );
      console.log(`%cLetters to the editor → ${CONTENT.correspondence.email}`, a);
    }

    /* ---- cheeky tab title on blur ---- */
    const original = document.title;
    const away = [
      "Read all about it — come back!",
      "The presses miss you…",
      "Extra! Extra! You left the tab!",
    ];
    const onVis = () => {
      if (document.hidden) document.title = away[Math.floor(Math.random() * away.length)];
      else document.title = original;
    };
    document.addEventListener("visibilitychange", onVis);

    /* ---- press "X" → jump to the crossword ---- */
    const isTyping = (el: EventTarget | null) => {
      const n = el as HTMLElement | null;
      return !!n && (n.tagName === "INPUT" || n.tagName === "TEXTAREA" || n.isContentEditable);
    };
    const onX = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "x" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping(e.target)) return;
      const xw = document.getElementById("crossword");
      if (xw) {
        xw.scrollIntoView({ behavior: "smooth", block: "start" });
        setToast("The crossword, as requested ✎");
        clearTimeout(xTimer);
        xTimer = setTimeout(() => setToast((t) => (t && t.includes("crossword") ? null : t)), 2600);
      }
    };
    let xTimer: ReturnType<typeof setTimeout>;
    window.addEventListener("keydown", onX);

    /* ---- Konami code ---- */
    const seq = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
    ];
    let pos = 0;
    let toastTimer: ReturnType<typeof setTimeout>;
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === seq[pos] ? pos + 1 : key === seq[0] ? 1 : 0;
      if (pos === seq.length) {
        pos = 0;
        window.dispatchEvent(new Event("jk:party"));
        setToast("Stop the presses — you found the secret edition!");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => setToast(null), 3200);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keydown", onX);
      clearTimeout(toastTimer);
      clearTimeout(xTimer);
      document.title = original;
    };
  }, []);

  return (
    <div className={`egg-toast${toast ? " show" : ""}`} role="status" aria-live="polite">
      <span className="egg-dot" aria-hidden="true">★</span>
      {toast}
    </div>
  );
}
