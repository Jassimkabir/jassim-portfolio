"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Client-side interaction + animation engine.
 *  - Lenis smooth scroll (drives ScrollTrigger + a shared scroll state)
 *  - custom cursor, magnetic letters, preloader, nav auto-hide
 *  - GSAP scroll reveals, word-scrub, blob parallax, stat counters
 *  - 3D floating code glyphs + velocity-reactive marquee (one gsap.ticker)
 *  - 3D tilt project cards, hero pointer parallax, scroll-progress bar
 *  - mobile menu overlay
 * Content is rendered server-side (SEO); this only wires behaviour.
 */
export default function Effects() {
  useEffect(() => {
    const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) =>
      c.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) =>
      Array.from(c.querySelectorAll<T>(s));
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    const prefersReduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const hoverable = window.matchMedia("(hover:hover)").matches;
    // touch / phones: skip the heaviest per-frame work and let native scroll run
    const coarse = window.matchMedia("(pointer:coarse)").matches;

    const cleanups: Array<() => void> = [];
    let lenis: Lenis | null = null;

    // shared, frame-read state
    const pointer = { nx: 0, ny: 0, x: innerWidth / 2, y: innerHeight / 2 }; // normalised + px
    const scroll = { y: 0, progress: 0, velocity: 0 };
    // velocity-marquee state (read in the ticker, fed by scroll)
    let marqueeBoost = 0;
    let marqueeSkew = 0;
    let marqueeSkewTarget = 0;
    let marqueeX = 0;

    gsap.registerPlugin(ScrollTrigger);

    const on = <K extends keyof WindowEventMap>(
      t: Window | Document | Element,
      ev: K | string,
      fn: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions,
    ) => {
      t.addEventListener(ev, fn as EventListener, opts);
      cleanups.push(() => t.removeEventListener(ev, fn as EventListener, opts));
    };

    /* ---- global pointer (for glyphs / hero / cursor parallax) ---- */
    if (hoverable) {
      on(window, "mousemove", (e) => {
        const me = e as MouseEvent;
        pointer.x = me.clientX;
        pointer.y = me.clientY;
        pointer.nx = (me.clientX / innerWidth) * 2 - 1;
        pointer.ny = (me.clientY / innerHeight) * 2 - 1;
      });
    }

    /* ---- custom cursor ---- */
    const ring = $(".cursor-ring");
    const dot = $(".cursor-dot");
    if (ring && dot && hoverable) {
      let mx = innerWidth / 2,
        my = innerHeight / 2,
        rx = mx,
        ry = my;
      on(window, "mousemove", (e) => {
        const me = e as MouseEvent;
        mx = me.clientX;
        my = me.clientY;
        dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      });
      // share the single gsap.ticker loop instead of a separate rAF
      const cursorTick = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      };
      gsap.ticker.add(cursorTick);
      cleanups.push(() => gsap.ticker.remove(cursorTick));

      $$("[data-cursor],[data-view],a,button").forEach((el) => {
        const view = el.hasAttribute("data-view");
        const enter = () => ring.classList.add(view ? "is-view" : "is-hover");
        const leave = () => ring.classList.remove("is-view", "is-hover");
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
      });
    }

    /* ---- magnetic socials + contact mail letters ---- */
    if (hoverable) {
      const magnetize = (el: HTMLElement, strength: number) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px,${
            (e.clientY - r.top - r.height / 2) * strength
          }px)`;
        };
        const leave = () => (el.style.transform = "");
        el.addEventListener("mousemove", move as EventListener);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move as EventListener);
          el.removeEventListener("mouseleave", leave);
        });
      };
      $$("#socials a").forEach((a) => magnetize(a, 0.3));

      const mailEl = $("#contactMail");
      if (mailEl) {
        const spans = $$("span", mailEl);
        const move = (e: MouseEvent) => {
          spans.forEach((s) => {
            const sr = s.getBoundingClientRect();
            s.style.transform = `translate(${(e.clientX - (sr.left + sr.width / 2)) * -0.06}px,${
              (e.clientY - (sr.top + sr.height / 2)) * -0.06
            }px)`;
          });
        };
        const leave = () => spans.forEach((s) => (s.style.transform = ""));
        mailEl.addEventListener("mousemove", move as EventListener);
        mailEl.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          mailEl.removeEventListener("mousemove", move as EventListener);
          mailEl.removeEventListener("mouseleave", leave);
        });
      }
    }

    /* ---- 3D tilt on project cards ---- */
    if (hoverable && !prefersReduced) {
      $$(".proj").forEach((card) => {
        const frame = $(".frame", card);
        if (!frame) return;
        const move = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          frame.style.transform = `rotateY(${px * 11}deg) rotateX(${-py * 11}deg) scale(1.02)`;
          card.classList.add("tilting");
        };
        const leave = () => {
          frame.style.transform = "";
          card.classList.remove("tilting");
        };
        card.addEventListener("mousemove", move as EventListener);
        card.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", move as EventListener);
          card.removeEventListener("mouseleave", leave);
        });
      });
    }

    /* ---- hero pointer parallax on the headline ---- */
    if (hoverable && !prefersReduced) {
      const hero = $(".hero");
      const h1 = $(".hero h1");
      if (hero && h1) {
        const move = () => {
          h1.style.transform = `rotateX(${-pointer.ny * 4}deg) rotateY(${pointer.nx * 5}deg)`;
        };
        const leave = () => (h1.style.transform = "");
        hero.addEventListener("mousemove", move);
        hero.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          hero.removeEventListener("mousemove", move);
          hero.removeEventListener("mouseleave", leave);
        });
      }
    }

    /* ---- nav auto-hide ---- */
    const nav = $("#nav");
    let lastY = 0;
    const onScrollState = (y: number, progress: number, velocity: number) => {
      scroll.y = y;
      scroll.progress = progress;
      scroll.velocity = velocity;
      if (nav) {
        if (y > lastY && y > 400) nav.classList.add("hidden");
        else nav.classList.remove("hidden");
      }
      lastY = y;
      // feed the velocity marquee (gentle)
      marqueeBoost = clamp(marqueeBoost + velocity * 0.12, -7, 7);
      marqueeSkewTarget = clamp(velocity * -0.12, -5, 5);
    };

    /* ---- Lenis smooth scroll (desktop only) ----
       Driven by gsap.ticker so Lenis + ScrollTrigger share ONE rAF loop — two
       independent loops is a classic source of scroll jitter. On touch we use
       native scrolling (smoother on phones) with a passive listener. */
    const anchorHandlers: Array<[HTMLAnchorElement, (e: Event) => void]> = [];
    let lenisTick: ((time: number) => void) | null = null;
    const useSmooth = !prefersReduced && !coarse;
    // shared scroll-to used by anchors, the live terminal (jk:goto) and channel keys
    let scrollToId: (id: string) => void = (id) =>
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

    const bindAnchors = (scrollTo: (id: string) => void) => {
      $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
        const handler = (e: Event) => {
          const id = a.getAttribute("href") || "";
          if (id.length > 1 && document.querySelector(id)) {
            e.preventDefault();
            scrollTo(id);
          }
        };
        a.addEventListener("click", handler);
        anchorHandlers.push([a, handler]);
      });
    };

    if (useSmooth) {
      lenis = new Lenis({
        lerp: 0.11, // frame-rate independent smoothing — snappy, not floaty
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
      });
      lenis.on("scroll", (e: { scroll: number; progress: number; velocity: number }) => {
        onScrollState(e.scroll, e.progress, e.velocity);
        ScrollTrigger.update();
      });
      lenisTick = (time: number) => lenis?.raf(time * 1000); // gsap time is seconds
      gsap.ticker.add(lenisTick);
      gsap.ticker.lagSmoothing(0);
      scrollToId = (id) => lenis?.scrollTo(id, { offset: -10 });
      bindAnchors(scrollToId);
    } else {
      const docProgress = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const y = scrollY;
        onScrollState(y, max > 0 ? y / max : 0, 0);
      };
      on(window, "scroll", docProgress, { passive: true } as AddEventListenerOptions);
      docProgress();
      scrollToId = (id) =>
        document
          .querySelector(id)
          ?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      bindAnchors(scrollToId);
    }

    /* ---- the live terminal asks us to tune to a channel ---- */
    on(window, "jk:goto", (e) => {
      const id = (e as CustomEvent<string>).detail;
      if (id && document.querySelector(id)) scrollToId(id);
    });

    /* ---- CHANNEL HUD + number-key channel switching ----
       Sections are "channels". A corner bug shows the current one; number keys
       1–9 jump between them with a quick channel-change flash. */
    const channelSections = $$<HTMLElement>("main section[id]").filter((s) =>
      $(".eyebrow b", s),
    );
    const bug = $("#channelBug");
    const bugNum = $("#channelNum");
    const bugName = $("#channelName");
    const flashChannel = (label: string, num: string) => {
      if (bugName) bugName.textContent = label;
      if (bugNum) bugNum.textContent = num;
      if (bug) {
        bug.classList.add("flash");
        setTimeout(() => bug.classList.remove("flash"), 420);
      }
    };
    if (channelSections.length && bug) {
      const labelOf = (s: HTMLElement) =>
        ($(".eyebrow span:last-child", s)?.textContent || s.id).toUpperCase();
      const numOf = (s: HTMLElement) =>
        ($(".eyebrow b", s)?.textContent || "").replace(/[^0-9]/g, "").padStart(2, "0");
      const io = new IntersectionObserver(
        (entries) => {
          const vis = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (vis) {
            const s = vis.target as HTMLElement;
            if (bugName) bugName.textContent = labelOf(s);
            if (bugNum) bugNum.textContent = numOf(s);
          }
        },
        { threshold: [0.25, 0.55] },
      );
      channelSections.forEach((s) => io.observe(s));
      cleanups.push(() => io.disconnect());

      // hide the HUD once the footer is in view so it doesn't overlap it
      const footerEl = $("footer");
      if (footerEl) {
        const fio = new IntersectionObserver(
          (entries) => bug.classList.toggle("at-footer", entries[0].isIntersecting),
          { threshold: 0.1 },
        );
        fio.observe(footerEl);
        cleanups.push(() => fio.disconnect());
      }

      on(window, "keydown", (e) => {
        const ev = e as KeyboardEvent;
        const el = document.activeElement;
        const typing =
          el instanceof HTMLElement &&
          (el.tagName === "INPUT" ||
            el.tagName === "TEXTAREA" ||
            el.isContentEditable);
        if (typing || ev.metaKey || ev.ctrlKey || ev.altKey) return;
        if (/^[1-9]$/.test(ev.key)) {
          const idx = Number(ev.key) - 1;
          const s = channelSections[idx];
          if (s) {
            scrollToId(`#${s.id}`);
            flashChannel(
              ($(".eyebrow span:last-child", s)?.textContent || s.id).toUpperCase(),
              ($(".eyebrow b", s)?.textContent || "").replace(/[^0-9]/g, "").padStart(2, "0"),
            );
          }
        }
      });
    }

    /* ---- shared ticker: floating glyphs + velocity marquee ----
       Desktop only. On touch the glyphs are static CSS and the marquee falls
       back to its pure-CSS animation (js-marquee class is never added), so there
       is NO continuous JavaScript on phones — the biggest win for smoothness. */
    if (!prefersReduced && !coarse) {
      // glyphs flee from the cursor (force-field), drift on scroll & float idly.
      // current offset (ox/oy/scale) eases toward a per-frame target.
      type G = {
        el: HTMLElement;
        i: number;
        depth: number;
        cx: number;
        cy: number;
        ox: number;
        oy: number;
        s: number;
      };
      const glyphLayer = $(".glyphs");
      const glyphs: G[] = $$<HTMLElement>(".glyph").map((el, i) => {
        el.dataset.glyph = el.textContent ?? ""; // remember original for scramble restore
        return { el, i, depth: parseFloat(el.dataset.depth || "1"), cx: 0, cy: 0, ox: 0, oy: 0, s: 1 };
      });
      const measure = () => {
        for (const g of glyphs) {
          // base centre WITHOUT the transform offset we apply each frame
          const r = g.el.getBoundingClientRect();
          g.cx = r.left + r.width / 2 - g.ox;
          g.cy = r.top + r.height / 2 - g.oy;
        }
      };
      // measure once layout is settled, and on resize
      requestAnimationFrame(measure);
      on(window, "resize", measure);

      const REPEL = 200; // px radius of influence
      const FORCE = 110; // px max push

      const marquee = $("#marquee");
      const track = $(".track", marquee || document);
      const skewer = $(".marq-skew", marquee || document);
      if (marquee && track) marquee.classList.add("js-marquee");
      const wrapX = gsap.utils.wrap(-50, 0);
      const baseSpeed = 1.5; // % per second, leftward (calm)

      const tick = (_t: number, deltaMs: number) => {
        const dt = Math.min(deltaMs, 50) / 1000;
        const time = _t / 1000;

        // glyphs — cursor repulsion + scroll parallax + idle float
        const useRepel = hoverable && glyphLayer;
        for (const g of glyphs) {
          let tx = pointer.nx * g.depth * 10; // mild lateral parallax
          let scaleT = 1;
          if (useRepel) {
            const dx = g.cx - pointer.x;
            const dy = g.cy - pointer.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < REPEL) {
              const f = (1 - dist / REPEL) ** 2;
              tx += (dx / dist) * f * FORCE;
              g.oy += ((dy / dist) * f * FORCE - g.oy) * 0.18;
              scaleT = 1 + f * 0.4;
            } else {
              g.oy += (0 - g.oy) * 0.12;
            }
          }
          g.ox += (tx - g.ox) * 0.12;
          g.s += (scaleT - g.s) * 0.12;
          const ty = -scroll.y * 0.045 * g.depth; // lenis-linked drift
          const idle = Math.sin(time * 0.6 + g.i * 1.3) * 8;
          g.el.style.transform = `translate3d(${g.ox}px,${ty + g.oy + idle}px,0) scale(${g.s})`;
        }

        // velocity marquee (calm base, gentle reaction)
        if (track) {
          const speed = baseSpeed + marqueeBoost;
          marqueeX = wrapX(marqueeX - speed * dt);
          track.style.transform = `translateX(${marqueeX}%)`;
          marqueeBoost *= 0.92;
          marqueeSkew += (marqueeSkewTarget - marqueeSkew) * 0.1;
          marqueeSkewTarget *= 0.9;
          if (skewer) skewer.style.transform = `skewX(${marqueeSkew}deg)`;
        }
      };
      gsap.ticker.add(tick);
      cleanups.push(() => gsap.ticker.remove(tick));

      // konami party: kick every glyph outward (springs back) + rainbow sweep
      const party = () => {
        if (glyphLayer) {
          glyphLayer.classList.add("party");
          setTimeout(() => glyphLayer.classList.remove("party"), 1300);
        }
        for (const g of glyphs) {
          g.ox += (Math.random() * 2 - 1) * 210;
          g.oy += (Math.random() * 2 - 1) * 210;
          g.s = 1.9;
        }
      };
      on(window, "jk:party", party);

      // periodic "scramble" glitch — a random glyph cycles random code chars then settles
      const SCRAMBLE = "</>{}[]();=&|*#%$@!~^:";
      const scrambleOne = () => {
        if (glyphs.length === 0) return;
        const g = glyphs[Math.floor(Math.random() * glyphs.length)];
        const original = g.el.dataset.glyph ?? g.el.textContent ?? "";
        const len = original.length || 2;
        let steps = 7;
        const iv = setInterval(() => {
          if (steps-- <= 0) {
            clearInterval(iv);
            g.el.textContent = original;
            return;
          }
          let out = "";
          for (let k = 0; k < len; k++)
            out += SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
          g.el.textContent = out;
        }, 45);
        cleanups.push(() => clearInterval(iv));
      };
      const scrambleTimer = setInterval(scrambleOne, 2200);
      cleanups.push(() => clearInterval(scrambleTimer));
    }

    /* ---- mobile menu overlay ---- */
    const menuBtn = $("#menuBtn");
    const menuClose = $("#menuClose");
    const menu = $("#mobileMenu");
    if (menu) {
      const setOpen = (open: boolean) => {
        menu.classList.toggle("open", open);
        menu.setAttribute("aria-hidden", String(!open));
        document.body.classList.toggle("menu-open", open);
        menuBtn?.setAttribute("aria-expanded", String(open));
      };
      if (menuBtn) on(menuBtn, "click", () => setOpen(true));
      if (menuClose) on(menuClose, "click", () => setOpen(false));
      $$("a.mm-link", menu).forEach((a) => on(a, "click", () => setOpen(false)));
      on(window, "keydown", (e) => {
        if ((e as KeyboardEvent).key === "Escape") setOpen(false);
      });
    }

    // hide hero lines immediately so they don't flash before the timeline runs
    gsap.set(".lnInner", { yPercent: 115 });

    /* ---- GSAP reveal animations (run after the loader lifts) ---- */
    let ctx: gsap.Context | null = null;
    const runGSAP = () => {
      ctx = gsap.context(() => {
        // hero title lines
        gsap
          .timeline({ delay: 0.1 })
          .to(".lnInner", { yPercent: 0, duration: 1.1, stagger: 0.09, ease: "power4.out" })
          // fromTo (not from): the .reveal CSS pins opacity:0, so we must
          // animate explicitly TO opacity:1 or these stay invisible
          .fromTo(
            ".hero .reveal",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
            "-=.7",
          );

        // generic reveals (projects get their own 3D entrance below)
        $$(".reveal").forEach((el) => {
          if (el.closest(".hero") || el.classList.contains("proj")) return;
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            },
          );
        });

        // about big — word highlight on scrub
        gsap.fromTo(
          "#aboutBig .w",
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: "#aboutBig", start: "top 80%", end: "bottom 60%", scrub: 0.6 },
          },
        );

        // project cards: staggered 3D entrance
        $$(".proj").forEach((p) => {
          gsap.fromTo(
            p,
            { y: 60, opacity: 0, rotateX: 12, transformPerspective: 900 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: p, start: "top 90%" },
            },
          );
        });

        // blobs parallax — skip on touch: translating a big blurred layer on
        // every scroll frame is costly and the effect is barely visible there
        if (!coarse) {
          $$<HTMLElement>(".blob").forEach((b) => {
            gsap.to(b, {
              yPercent: parseFloat(b.dataset.speed || "0") * 60,
              ease: "none",
              scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
            });
          });
        }

        // stat counters
        $$<HTMLElement>(".count").forEach((el) => {
          const to = Number(el.dataset.to);
          gsap.to(el, {
            textContent: to,
            duration: 1.6,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate() {
              el.textContent = String(Math.round(Number(el.textContent)));
            },
          });
        });

        // (the live terminal — #term — auto-types + accepts input on its own)

        ScrollTrigger.refresh();
      });
    };

    /* ---- fit the contact email to a single line ---- */
    const mailFit = $("#contactMail");
    const fitMail = () => {
      const el = mailFit;
      const parent = el?.parentElement;
      if (!el || !parent) return;
      const cs = getComputedStyle(parent);
      const avail = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.fontSize = "100px"; // measure natural one-line width at a known size
      const natural = el.scrollWidth;
      if (!natural) return;
      const size = Math.min(120, (avail / natural) * 100 * 0.98);
      el.style.fontSize = `${size}px`;
    };
    fitMail();
    on(window, "resize", fitMail);
    // re-fit once the display font is ready (metrics differ from the fallback)
    if (document.fonts?.ready) document.fonts.ready.then(fitMail);

    /* ---- preloader ---- */
    const countEl = $("#loaderCount");
    const fillEl = $("#loaderFill");
    const memEl = $("#loaderMem");
    const loader = $("#loader");
    const startReveals = () => {
      runGSAP();
      ScrollTrigger.refresh();
    };

    // reveals (and glyphs) become ready as soon as the engine mounts
    document.body.classList.add("anim-ready");

    if (prefersReduced || !loader || !countEl) {
      if (loader) loader.style.display = "none";
      runGSAP();
    } else {
      let n = 0;
      const iv = setInterval(() => {
        n += Math.floor(Math.random() * 8) + 3;
        if (n >= 100) {
          n = 100;
          clearInterval(iv);
        }
        countEl.textContent = String(n);
        if (fillEl) fillEl.style.width = `${n}%`;
        if (memEl) memEl.textContent = String(Math.round((65536 * n) / 100)).padStart(5, "0");
        if (n === 100) {
          setTimeout(() => {
            loader.classList.add("loader-out");
            setTimeout(startReveals, 1000);
          }, 350);
        }
      }, 90);
      cleanups.push(() => clearInterval(iv));
    }

    /* ---- cleanup ---- */
    return () => {
      cleanups.forEach((fn) => fn());
      anchorHandlers.forEach(([a, h]) => a.removeEventListener("click", h));
      if (lenisTick) {
        gsap.ticker.remove(lenisTick);
        gsap.ticker.lagSmoothing(500, 33); // restore GSAP default
      }
      lenis?.destroy();
      ctx?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.body.classList.remove("anim-ready", "menu-open");
    };
  }, []);

  return null;
}
