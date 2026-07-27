'use client';

import { useEffect, useRef, useState } from 'react';
import { CONTENT } from '@/content/site';

type Line = { kind: 'cmd' | 'out' | 'err' | 'sys'; text: string };

/**
 * The Newsroom Terminal — a genuinely interactive REPL, kept under lock until
 * the reader solves The Daily Crossword (it listens for the `jt:solved`
 * event). On unlock it boots with a typewriter effect, then accepts commands:
 * help, whoami, stack, projects, resume, contact, socials, theme, coffee,
 * sudo, clear (plus a couple of hidden ones). Command history via ↑/↓.
 */
export default function Terminal() {
  const t = CONTENT.terminal;
  const [unlocked, setUnlocked] = useState(false);
  const [booted, setBooted] = useState(false);
  const [booting, setBooting] = useState<string[]>([]); // lines revealed so far
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const history = useRef<string[]>([]);
  const histIdx = useRef<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  /* unlock on crossword solve (or a manual event) */
  useEffect(() => {
    const unlock = () => setUnlocked((u) => u || true);
    window.addEventListener('jt:solved', unlock);
    return () => window.removeEventListener('jt:solved', unlock);
  }, []);

  /* boot sequence — typewriter the boot lines, then hand over the prompt */
  useEffect(() => {
    if (!unlocked || booted) return;
    let line = 0;
    let char = 0;
    const revealed: string[] = [];
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const src = t.boot[line] ?? '';
      char++;
      revealed[line] = src.slice(0, char);
      setBooting([...revealed]);
      if (char >= src.length) {
        line++;
        char = 0;
        if (line >= t.boot.length) {
          setBooted(true);
          setTimeout(() => inputRef.current?.focus(), 60);
          return;
        }
        timer = setTimeout(step, 220);
      } else {
        timer = setTimeout(step, 16);
      }
    };
    timer = setTimeout(step, 260);
    return () => clearTimeout(timer);
  }, [unlocked, booted, t.boot]);

  /* keep the view pinned to the newest output */
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, booting]);

  const push = (text: string, kind: Line['kind'] = 'out') =>
    setLines((l) => [...l, { kind, text }]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'night' ? 'day' : 'night';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage may be unavailable */
    }
    push(`Flipped to the ${next === 'night' ? 'Late' : 'Morning'} Edition.`, 'sys');
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    push(cmd, 'cmd');
    if (cmd) {
      history.current.unshift(cmd);
      history.current = history.current.slice(0, 40);
    }
    histIdx.current = -1;
    const [name, ...args] = cmd.split(/\s+/);
    const n = name.toLowerCase();
    const r = t.responses as Record<string, string>;

    if (n === '') return;
    if (n === 'clear') return setLines([]);
    if (n === 'help') {
      push('Available commands:', 'sys');
      t.help.forEach(([c, d]) => push(`  ${c.padEnd(9)} ${d}`));
      return;
    }
    if (n === 'theme') return toggleTheme();
    if (n === 'sudo') {
      window.dispatchEvent(new Event('jk:party'));
      push('root access granted ✦  dev mode unlocked — the ornaments approve.', 'sys');
      if (args[0]) push(`(there is no manual for “${args.join(' ')}”, but the spirit is willing.)`);
      return;
    }
    if (n === 'ls') return push('features/   editorial/   classifieds/   resume.pdf   .secret');
    if (n === 'cat' && args[0] === '.secret')
      return push('the secret was the clean commits we made along the way.', 'sys');
    if (n === 'date')
      return push(
        new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      );
    if (n === 'party') {
      window.dispatchEvent(new Event('jk:party'));
      return push('🎉  stop the presses!');
    }
    if (r[n]) return push(r[n]);
    push(`command not found: ${name}. type \`help\` for the list.`, 'err');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(value);
      setValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.current.length) {
        histIdx.current = Math.min(histIdx.current + 1, history.current.length - 1);
        setValue(history.current[histIdx.current] ?? '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      histIdx.current = Math.max(histIdx.current - 1, -1);
      setValue(histIdx.current === -1 ? '' : history.current[histIdx.current] ?? '');
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const prompt = (
    <>
      <span className="term-user">
        {t.user}@{t.host}
      </span>
      <span className="term-sep">:</span>
      <span className="term-path">~</span>
      <span className="term-dollar">$</span>
    </>
  );

  return (
    <section className="pad" id="terminal">
      <div className="wrap">
        <div className="section-front reveal">
          <div className="folio">
            <span className="kicker">Newsroom Access</span>
            <span>The Jassim Times</span>
            <span className="folio-page">Page C9</span>
          </div>
          <h2 className="section-title">{t.label}</h2>
          <div className="section-rule" />
        </div>

        <div className={`terminal reveal${unlocked ? ' is-unlocked' : ' is-locked'}`}>
          <div className="term-bar">
            <span className="term-holes" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="term-title">
              {t.user}@{t.host} — {unlocked ? 'session live' : 'locked'}
            </span>
            <span className="term-status">{unlocked ? '● online' : '○ restricted'}</span>
          </div>

          <div className="term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
            {!unlocked ? (
              <div className="term-locked">
                <span className="term-lock-icon" aria-hidden="true">
                  ⌸
                </span>
                <p>{t.locked}</p>
                <a href="#crossword" className="term-lock-cta" data-cursor>
                  Go to the Crossword ↑
                </a>
              </div>
            ) : (
              <>
                {booting.map((ln, i) => (
                  <p className="term-out term-boot" key={`b${i}`}>
                    {ln}
                    {!booted && i === booting.length - 1 ? (
                      <span className="term-caret" aria-hidden="true" />
                    ) : null}
                  </p>
                ))}

                {booted &&
                  lines.map((l, i) => {
                    if (l.kind === 'cmd') {
                      return (
                        <p className="term-prompt" key={i}>
                          {prompt}
                          <span className="term-cmd-echo">{l.text}</span>
                        </p>
                      );
                    }
                    return (
                      <p className={`term-out term-${l.kind}`} key={i}>
                        {l.text}
                      </p>
                    );
                  })}

                {booted ? (
                  <p className="term-prompt term-input-row">
                    {prompt}
                    <input
                      ref={inputRef}
                      className="term-input"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onKeyDown={onKeyDown}
                      spellCheck={false}
                      autoComplete="off"
                      autoCapitalize="off"
                      aria-label="Terminal command input"
                    />
                    <span className="term-caret" aria-hidden="true" />
                  </p>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
