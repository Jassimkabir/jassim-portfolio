'use client';

import { useRef, useState } from 'react';
import { gsap, prefersReducedMotion, reveal, useGsapContext } from '@/lib/motion';
import { SITE, TERMINAL } from '@/content/site';
import { AnimatedLink } from '@/components/ui/AnimatedLink';
import { Terminal as TerminalIcon } from '@/components/ui/icons';

const CHAR_MS = 0.018;
const LINE_GAP = 0.25;

/** Brighten JSON keys in output lines. */
function renderOut(text: string) {
  return text.split(/("(?:[^"\\]|\\.)*"\s*:)/g).map((part, i) =>
    /^"/.test(part) && part.trimEnd().endsWith(':') ? (
      <span key={i} className="text-white/90">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function Terminal() {
  const [copied, setCopied] = useState(false);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);

  const scopeRef = useGsapContext<HTMLElement>((scope) => {
    reveal(scope.querySelector('[data-terminal-panel]'), {
      y: 40,
      scale: 0.99,
      duration: 0.8,
      ease: 'expo.out',
    });

    const lines = lineRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!lines.length) return;

    /* Reduced motion: the whole block is already in the DOM, just show it. */
    if (prefersReducedMotion()) {
      gsap.set(lines, { autoAlpha: 1 });
      return;
    }

    gsap.set(lines, { autoAlpha: 0 });

    const caret = document.createElement('span');
    caret.className = 'caret ml-1';
    caret.setAttribute('aria-hidden', 'true');

    const tl = gsap.timeline({
      scrollTrigger: { trigger: scope, start: 'top 70%', once: true },
    });

    TERMINAL.lines.forEach((line, i) => {
      const el = lines[i];
      if (!el) return;

      tl.set(el, { autoAlpha: 1 });

      if (line.kind === 'gap') {
        tl.to({}, { duration: 0.05 });
        return;
      }

      tl.call(() => el.appendChild(caret));

      if (line.kind === 'cmd') {
        const target = el.querySelector<HTMLElement>('[data-text]');
        const counter = { n: 0 };
        tl.to(counter, {
          n: line.text.length,
          duration: line.text.length * CHAR_MS,
          ease: 'none',
          onUpdate: () => {
            if (target) target.textContent = line.text.slice(0, Math.round(counter.n));
          },
          onComplete: () => {
            if (target) target.textContent = line.text;
          },
        });
      }

      tl.to({}, { duration: LINE_GAP });
    });

    return () => caret.remove();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked — the address is in the footer anyway. */
    }
  };

  return (
    <section ref={scopeRef} className="bg-white">
      <div className="shell px-5 py-10 sm:px-8">
        <div
          data-terminal-panel
          className="overflow-hidden rounded-card bg-ink text-white ring-1 ring-white/6"
        >
          {/* chrome */}
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3.5">
            <span className="size-2.5 rounded-pill bg-accent-from" />
            <span className="size-2.5 rounded-pill bg-white/25" />
            <span className="size-2.5 rounded-pill bg-white/15" />
            <span className="font-mono text-xs text-white/40">{TERMINAL.title}</span>
            <TerminalIcon className="ml-auto hidden text-sm text-white/35 sm:block" />
          </div>

          {/* body */}
          <div className="min-h-80 px-5 py-6 font-mono text-sm leading-7 sm:p-8">
            {TERMINAL.lines.map((line, i) => {
              if (line.kind === 'gap') {
                return (
                  <div
                    key={i}
                    ref={(el) => {
                      lineRefs.current[i] = el;
                    }}
                    className="h-4"
                    aria-hidden="true"
                  />
                );
              }

              return (
                <div
                  key={i}
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className="whitespace-pre-wrap"
                >
                  {line.kind === 'cmd' ? (
                    <>
                      <span className="text-accent-from">➜</span>{' '}
                      <span className="text-white/45">~</span>{' '}
                      <span data-text className="text-white" />
                    </>
                  ) : (
                    <span className="text-white/60">{renderOut(line.text)}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* footer */}
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-xs tracking-[.05em] text-white/40 uppercase">
            <span>{TERMINAL.exit}</span>
            <AnimatedLink onClick={copyEmail} rest={0.7}>
              {copied ? TERMINAL.copied : `${TERMINAL.copy} →`}
            </AnimatedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
