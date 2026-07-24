"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CONTENT } from "@/content/site";

/**
 * A working vintage shell. On scroll-in it auto-types a short intro, then hands
 * the prompt to the visitor: real commands (help, ls, open, theme, play…) with
 * responses, command history, and links back into the site. Server content is
 * still SEO-safe because the section heading lives in the DOM; this box is an
 * enhancement layered on top.
 */

type Line = { id: number; node: ReactNode };

const { terminal: T, contact, nav } = CONTENT;
const PROMPT = (
  <>
    <span className="term-user">
      {T.user}@{T.host}
    </span>
    <span className="term-path">:{T.dir}</span>
    <span className="term-dollar">$</span>{" "}
  </>
);

const COMMANDS = [
  ["help", "list everything you can type"],
  ["ls", "list the channels (sections)"],
  ["whoami", "who is this guy"],
  ["cat stack.json", "print the tech stack"],
  ["open <name>", "tune to a channel — e.g. open work"],
  ["skills", "show signal levels"],
  ["theme", "flip dark / light"],
  ["play", "boot the arcade (Snake)"],
  ["socials", "print the links"],
  ["date", "system clock"],
  ["clear", "wipe the screen"],
] as const;

export default function TerminalLive() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [ready, setReady] = useState(false); // intro finished → live prompt
  const idRef = useRef(0);
  const histRef = useRef<string[]>([]);
  const histPos = useRef(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  const cleanupRef = useRef<() => void>(() => {});

  const push = useCallback((node: ReactNode) => {
    setLines((l) => [...l, { id: idRef.current++, node }]);
  }, []);

  /* keep the newest line in view inside the scrolling body */
  useEffect(() => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [lines, ready]);

  /* smooth-scroll to a section id (Effects owns Lenis, so we ask it politely) */
  const goto = (id: string) => {
    window.dispatchEvent(new CustomEvent("jk:goto", { detail: id }));
  };

  const setTheme = (next?: string) => {
    const root = document.documentElement;
    const target =
      next === "dark" || next === "light"
        ? next
        : root.dataset.theme === "light"
          ? "dark"
          : "light";
    const apply = () => {
      root.dataset.theme = target;
      try {
        localStorage.setItem("theme", target);
      } catch {}
    };
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => unknown;
    };
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (doc.startViewTransition && !reduce) doc.startViewTransition(apply);
    else apply();
    return target;
  };

  /* ---- command interpreter ---- */
  const run = useCallback(
    (raw: string) => {
      const input = raw.trim();
      // echo the command back as a prompt line
      push(
        <p className="term-prompt">
          {PROMPT}
          <span className="term-cmd">{raw}</span>
        </p>,
      );
      if (!input) return;
      histRef.current.unshift(input);
      histPos.current = -1;

      const [cmd, ...rest] = input.split(/\s+/);
      const arg = rest.join(" ").toLowerCase();
      const out = (node: ReactNode) => push(<div className="term-out">{node}</div>);

      switch (cmd.toLowerCase()) {
        case "help":
          out(
            <div className="term-help">
              {COMMANDS.map(([c, d]) => (
                <div key={c} className="term-help-row">
                  <span className="term-help-cmd">{c}</span>
                  <span className="term-help-desc">{d}</span>
                </div>
              ))}
            </div>,
          );
          break;
        case "ls":
          out(
            <span className="term-ls">
              {nav.map((n) => (
                <button
                  key={n.href}
                  className="term-link"
                  onClick={() => goto(n.href)}
                >
                  {n.label.toLowerCase()}/
                </button>
              ))}
              <button
                className="term-link"
                onClick={() => window.dispatchEvent(new Event("jk:play"))}
              >
                play
              </button>
            </span>,
          );
          break;
        case "whoami":
          out("web developer · motion-obsessed · systems-minded");
          break;
        case "cat":
          if (arg.includes("stack"))
            out(
              '["react", "next.js", "typescript", "tailwind", "gsap", "node", "sql-server"]',
            );
          else if (arg.includes("about") || !arg)
            out(CONTENT.hero.intro);
          else out(`cat: ${arg}: no such file`);
          break;
        case "skills":
        case "levels":
          goto("#skills");
          out("→ tuning to SIGNAL LEVELS…");
          break;
        case "open":
        case "cd":
        case "goto": {
          const map: Record<string, string> = {
            work: "#work",
            about: "#about",
            services: "#services",
            contact: "#contact",
            skills: "#skills",
            experience: "#experience",
            terminal: "#terminal",
            home: "#top",
            "~": "#top",
          };
          const id = map[arg];
          if (id) {
            goto(id);
            out(`→ tuning to ${arg}…`);
          } else out(`open: unknown channel "${arg || "?"}" — try: ls`);
          break;
        }
        case "theme": {
          const t = setTheme(arg);
          out(`→ theme set to ${t}`);
          break;
        }
        case "play":
        case "snake":
        case "game":
        case "arcade":
          window.dispatchEvent(new Event("jk:play"));
          out("→ INSERT COIN … booting SNAKE.EXE in a popup");
          break;
        case "socials":
        case "links":
          out(
            <span className="term-ls">
              {contact.socials.map((s) => (
                <a
                  key={s.label}
                  className="term-link"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label.toLowerCase()}
                </a>
              ))}
            </span>,
          );
          break;
        case "contact":
        case "email":
          out(
            <a className="term-link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>,
          );
          break;
        case "date":
          out(new Date().toString());
          break;
        case "echo":
          out(rest.join(" "));
          break;
        case "sudo":
          out("nice try. you already have root here. 😎");
          break;
        case "konami":
          out("↑ ↑ ↓ ↓ ← → ← → B A — go on, try it.");
          break;
        case "clear":
        case "cls":
          setLines([]);
          break;
        case "exit":
          out("there's no escape from a good portfolio.");
          break;
        default:
          out(`command not found: ${cmd} — type "help"`);
      }
    },
    [push],
  );

  /* ---- auto-type the intro once the terminal scrolls into view ---- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    const boot = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (reduce) {
        T.lines.forEach((l) => {
          push(
            <p className="term-prompt">
              {PROMPT}
              <span className="term-cmd">{l.cmd}</span>
            </p>,
          );
          push(<div className="term-out">{l.out}</div>);
        });
        setReady(true);
        return;
      }

      const timers: ReturnType<typeof setTimeout>[] = [];
      let t = 300;
      T.lines.forEach((l) => {
        const chars = l.cmd.length;
        // type the command char-by-char
        for (let i = 1; i <= chars; i++) {
          timers.push(
            setTimeout(() => {
              setLines((cur) => {
                const partial = l.cmd.slice(0, i);
                const node = (
                  <p className="term-prompt">
                    {PROMPT}
                    <span className="term-cmd typing">{partial}</span>
                  </p>
                );
                // replace the last line if it's this same command-in-progress
                if (i === 1)
                  return [...cur, { id: idRef.current++, node }];
                const copy = cur.slice();
                copy[copy.length - 1] = { ...copy[copy.length - 1], node };
                return copy;
              });
            }, (t += 34)),
          );
        }
        // settle the command (drop caret) + print output
        timers.push(
          setTimeout(() => {
            setLines((cur) => {
              const copy = cur.slice();
              copy[copy.length - 1] = {
                ...copy[copy.length - 1],
                node: (
                  <p className="term-prompt">
                    {PROMPT}
                    <span className="term-cmd">{l.cmd}</span>
                  </p>
                ),
              };
              return copy;
            });
            push(<div className="term-out">{l.out}</div>);
          }, (t += 260)),
        );
      });
      timers.push(
        setTimeout(() => {
          push(
            <div className="term-out term-hint">
              type <b>help</b> and hit enter — the shell is live.
            </div>,
          );
          setReady(true);
        }, (t += 300)),
      );
      cleanupRef.current = () => timers.forEach(clearTimeout);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          boot();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => cleanupRef.current(), []);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const h = histRef.current;
      if (h.length) {
        histPos.current = Math.min(histPos.current + 1, h.length - 1);
        setValue(h[histPos.current]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const h = histRef.current;
      if (histPos.current > 0) {
        histPos.current -= 1;
        setValue(h[histPos.current]);
      } else {
        histPos.current = -1;
        setValue("");
      }
    } else if ((e.key === "l" || e.key === "L") && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <section className="pad" id="terminal" ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head">
          <h2 className="reveal" dangerouslySetInnerHTML={{ __html: T.heading }} />
          <span className="eyebrow reveal">
            <b>CH.03</b> <span>{T.label}</span>
          </span>
        </div>
        <div
          className="term reveal is-live"
          id="term"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="term-bar">
            <span className="term-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="term-title">
              {T.user}@{T.host}: {T.dir} — sh
            </span>
            <span className="term-live" aria-hidden="true">
              ● live
            </span>
          </div>
          <div className="term-body" ref={bodyRef}>
            {lines.map((l) => (
              <div key={l.id}>{l.node}</div>
            ))}
            {ready && (
              <p className="term-prompt term-input-row">
                {PROMPT}
                <input
                  ref={inputRef}
                  className="term-input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal command input"
                  placeholder="help"
                />
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
