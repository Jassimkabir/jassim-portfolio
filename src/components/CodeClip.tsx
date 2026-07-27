'use client';

import { useState } from 'react';

/**
 * A printed code excerpt rendered in halftone that copies itself to the
 * clipboard when clicked — "clip the coupon". Line-numbered, monospace,
 * with a little press-stamp confirmation.
 */
export default function CodeClip({
  source,
  lang = 'tsx',
  caption,
}: {
  source: string;
  lang?: string;
  caption?: string;
}) {
  const [copied, setCopied] = useState(false);
  const lines = source.replace(/\n$/, '').split('\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = source;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* give up quietly */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.clearTimeout((copy as unknown as { _t?: number })._t);
    (copy as unknown as { _t?: number })._t = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <figure className="codeclip">
      <button
        type="button"
        className="codeclip-body"
        onClick={copy}
        data-cursor
        aria-label="Copy code excerpt to clipboard"
      >
        <span className="codeclip-lang">{lang}</span>
        <span className={`codeclip-stamp${copied ? ' show' : ''}`}>{copied ? 'Copied ✦' : 'Click to copy'}</span>
        <pre>
          <code>
            {lines.map((ln, i) => (
              <span className="codeclip-line" key={i}>
                <span className="codeclip-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="codeclip-code">{ln || ' '}</span>
              </span>
            ))}
          </code>
        </pre>
      </button>
      {caption ? <figcaption className="codeclip-cap">{caption}</figcaption> : null}
    </figure>
  );
}
