'use client';

import { CONTENT } from '@/content/site';

/** Résumé download + "print this edition" actions for the Classifieds. */
export default function ResumeActions() {
  const a = CONTENT.classifieds.availability;
  return (
    <div className="avail-actions">
      <a className="avail-btn primary" href={a.resumeHref} download data-cursor>
        <span aria-hidden="true">↓</span> {a.resumeLabel}
      </a>
      <button
        type="button"
        className="avail-btn"
        onClick={() => window.print()}
        data-cursor
      >
        <span aria-hidden="true">⎙</span> {a.printLabel}
      </button>
    </div>
  );
}
