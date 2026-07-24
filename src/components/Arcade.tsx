"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CONTENT } from "@/content/site";

/**
 * Hidden Snake — an easter egg, not a visible section. Opens as a retro popup
 * only when the live terminal fires "jk:play" (type `play`). Keyboard-driven;
 * Esc or a click on the backdrop closes it.
 */

const GRID = 21;
const CELL = 20;
const SIZE = GRID * CELL; // 420 logical px
type Pt = { x: number; y: number };
type Status = "idle" | "playing" | "paused" | "over";

const { arcade } = CONTENT;

export default function Arcade() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [hi, setHi] = useState(0);

  // mutable game state (kept in refs so the loop never re-renders per tick)
  const snake = useRef<Pt[]>([]);
  const dir = useRef<Pt>({ x: 1, y: 0 });
  const nextDir = useRef<Pt>({ x: 1, y: 0 });
  const food = useRef<Pt>({ x: 10, y: 10 });
  const acc = useRef(0);
  const last = useRef(0);
  const speed = useRef(130);
  const raf = useRef(0);
  const loopRef = useRef<(t: number) => void>(() => {});
  const statusRef = useRef<Status>("idle");
  const scoreRef = useRef(0);
  const colors = useRef({
    snake: "#52ffb0",
    head: "#eef1f7",
    food: "#ff45a6",
    dim: "rgba(255,255,255,0.05)",
    bg: "#0d0d16",
  });

  const setStatusBoth = (s: Status) => {
    statusRef.current = s;
    setStatus(s);
  };

  const readColors = useCallback(() => {
    const cs = getComputedStyle(document.documentElement);
    const g = (v: string, f: string) => cs.getPropertyValue(v).trim() || f;
    colors.current = {
      snake: g("--grn", "#52ffb0"),
      head: g("--cream", "#eef1f7"),
      food: g("--coral", "#ff45a6"),
      dim: `rgba(${g("--fg-rgb", "238,241,247")}, 0.06)`,
      bg: "#0d0d16",
    };
  }, []);

  const placeFood = useCallback(() => {
    let p: Pt;
    do {
      p = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID),
      };
    } while (snake.current.some((s) => s.x === p.x && s.y === p.y));
    food.current = p;
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const c = colors.current;
    ctx.fillStyle = c.bg;
    ctx.fillRect(0, 0, SIZE, SIZE);
    // faint grid
    ctx.fillStyle = c.dim;
    for (let i = 0; i < GRID; i++) {
      ctx.fillRect(i * CELL, 0, 1, SIZE);
      ctx.fillRect(0, i * CELL, SIZE, 1);
    }
    // food (blinks)
    if (Math.floor(performance.now() / 250) % 2 === 0) {
      ctx.fillStyle = c.food;
      ctx.fillRect(food.current.x * CELL + 3, food.current.y * CELL + 3, CELL - 6, CELL - 6);
    }
    // snake
    snake.current.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? c.head : c.snake;
      ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const die = useCallback(() => {
    setStatusBoth("over");
    setHi((prev) => {
      const best = Math.max(prev, scoreRef.current);
      try {
        localStorage.setItem("jk_snake_hi", String(best));
      } catch {}
      return best;
    });
  }, []);

  const step = useCallback(() => {
    dir.current = nextDir.current;
    const head = snake.current[0];
    const nh = { x: head.x + dir.current.x, y: head.y + dir.current.y };
    // walls + self
    if (
      nh.x < 0 ||
      nh.y < 0 ||
      nh.x >= GRID ||
      nh.y >= GRID ||
      snake.current.some((s) => s.x === nh.x && s.y === nh.y)
    ) {
      die();
      return;
    }
    snake.current.unshift(nh);
    if (nh.x === food.current.x && nh.y === food.current.y) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      speed.current = Math.max(70, 130 - scoreRef.current * 3);
      placeFood();
    } else {
      snake.current.pop();
    }
  }, [die, placeFood]);

  const loop = useCallback(
    (t: number) => {
      raf.current = requestAnimationFrame(loopRef.current);
      if (statusRef.current !== "playing") {
        draw();
        last.current = t;
        return;
      }
      const dt = t - last.current;
      last.current = t;
      acc.current += dt;
      if (acc.current >= speed.current) {
        acc.current = 0;
        step();
      }
      draw();
    },
    [draw, step],
  );

  // keep the self-referential rAF pointing at the latest loop
  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  const start = useCallback(() => {
    readColors();
    snake.current = [
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 },
    ];
    dir.current = { x: 1, y: 0 };
    nextDir.current = { x: 1, y: 0 };
    speed.current = 130;
    scoreRef.current = 0;
    setScore(0);
    acc.current = 0;
    last.current = performance.now();
    placeFood();
    setStatusBoth("playing");
    wrapRef.current?.focus();
  }, [placeFood, readColors]);

  const openGame = useCallback(() => {
    openRef.current = true;
    setOpen(true);
    readColors();
    try {
      const saved = Number(localStorage.getItem("jk_snake_hi") || 0);
      if (saved) setHi(saved);
    } catch {}
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(loopRef.current);
    setTimeout(start, 80);
  }, [readColors, start]);

  const close = useCallback(() => {
    openRef.current = false;
    setOpen(false);
    setStatusBoth("idle");
    cancelAnimationFrame(raf.current);
  }, []);

  // launch from terminal (jk:play) + Esc to close + redraw on theme change
  useEffect(() => {
    window.addEventListener("jk:play", openGame);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) close();
    };
    window.addEventListener("keydown", onKey);
    const obs = new MutationObserver(() => readColors());
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      window.removeEventListener("jk:play", openGame);
      window.removeEventListener("keydown", onKey);
      obs.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [openGame, close, readColors]);

  const turn = (x: number, y: number) => {
    // forbid reversing straight back
    if (x === -dir.current.x && y === -dir.current.y) return;
    nextDir.current = { x, y };
  };

  const onKey = (e: React.KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k))
      e.preventDefault();
    if (k === "arrowup" || k === "w") turn(0, -1);
    else if (k === "arrowdown" || k === "s") turn(0, 1);
    else if (k === "arrowleft" || k === "a") turn(-1, 0);
    else if (k === "arrowright" || k === "d") turn(1, 0);
    else if (k === "enter" || k === " ") {
      if (statusRef.current !== "playing") start();
    } else if (k === "p") {
      if (statusRef.current === "playing") setStatusBoth("paused");
      else if (statusRef.current === "paused") setStatusBoth("playing");
    }
  };

  return (
    <div
      className={`arcade-modal${open ? " open" : ""}`}
      onClick={close}
      aria-hidden={!open}
    >
      <div
        className="cabinet"
        ref={wrapRef}
        tabIndex={0}
        onKeyDown={onKey}
        onClick={(e) => e.stopPropagation()}
        role="application"
        aria-label="Snake mini-game. Arrow keys to play, Escape to close."
      >
        <div className="cab-bar">
          <span className="cab-title">{arcade.title}</span>
          <span className="cab-score">
            SCORE <b>{String(score).padStart(3, "0")}</b> · HI{" "}
            <b>{String(hi).padStart(3, "0")}</b>
          </span>
          <button className="cab-close" onClick={close} aria-label="Close game">
            ✕
          </button>
        </div>
        <div className="cab-screen">
          <canvas
            ref={canvasRef}
            width={SIZE}
            height={SIZE}
            className="cab-canvas"
          />
          <div className="cab-scan" aria-hidden="true" />
          {status !== "playing" && (
            <div className="cab-overlay">
              {status === "idle" && (
                <>
                  <p className="cab-big">SNAKE</p>
                  <button className="cab-btn" onClick={start}>
                    ▶ Insert coin
                  </button>
                </>
              )}
              {status === "paused" && <p className="cab-big">PAUSED</p>}
              {status === "over" && (
                <>
                  <p className="cab-big">GAME OVER</p>
                  <p className="cab-sub">
                    score {score} · hi {hi}
                  </p>
                  <button className="cab-btn" onClick={start}>
                    ↻ Retry
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="cab-foot">
          <span className="cab-hint">
            {arcade.hint} · <b>Esc</b> to close
          </span>
          <div className="cab-dpad" aria-hidden="true">
            <button className="dbtn up" onClick={() => turn(0, -1)}>
              ▲
            </button>
            <button className="dbtn left" onClick={() => turn(-1, 0)}>
              ◀
            </button>
            <button className="dbtn ctr" onClick={start}>
              ●
            </button>
            <button className="dbtn right" onClick={() => turn(1, 0)}>
              ▶
            </button>
            <button className="dbtn down" onClick={() => turn(0, 1)}>
              ▼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
