"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENT } from "@/content/site";
import { Html } from "@/lib/text";

/**
 * Skills as a retro equalizer / VU-meter rack. The segmented meters rise to
 * their level when the rack scrolls into view; the lit cap flickers like a
 * real meter riding the signal.
 */
export default function Skills() {
  const { skills } = CONTENT;
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="pad" id="skills">
      <div className="wrap">
        <div className="sec-head">
          <Html as="h2" className="reveal" html={skills.heading} />
          <span className="eyebrow reveal">
            <b>CH.02</b> <span>{skills.label}</span>
          </span>
        </div>

        <div className={`vu-rack reveal${on ? " on" : ""}`} ref={ref}>
          <div className="vu-topbar">
            <span>{skills.note}</span>
            <span className="vu-scale" aria-hidden="true">
              <i>-20</i>
              <i>-10</i>
              <i>-3</i>
              <i className="peak">0</i>
              <i className="peak">+3</i>
            </span>
          </div>
          {skills.items.map((s) => (
            <div className="vu-row" key={s.name} data-accent={s.accent}>
              <span className="vu-name">{s.name}</span>
              <span className="vu-meter" aria-hidden="true">
                <span
                  className="vu-fill"
                  style={{ "--lvl": `${s.level}%` } as React.CSSProperties}
                />
                <span className="vu-cap" style={{ left: `${s.level}%` }} />
              </span>
              <span className="vu-val">{s.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
