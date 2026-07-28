'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { canHover, prefersReducedMotion } from '@/lib/motion';
import { createPlateCanvas, PLATE } from '@/lib/heroPlate';

/* ──────────────────────────────────────────────────────────────────
   Liquid cursor reveal.

   The base frame is always visible (and is the LCP element). A canvas
   on top paints the second frame along a soft brush trail that follows
   the pointer and decays back to nothing when it stops.
─────────────────────────────────────────────────────────────────── */

const BRUSH_RADIUS = 143; // CSS px
const DECAY = 0.016; // per frame
const FADE_FRAMES = 120;
const MAX_POINTS = 60;

type Point = { x: number; y: number };

export function LiquidReveal({
  base,
  reveal,
  alt,
}: {
  base: string;
  reveal: string | null;
  alt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    /* Reduced motion keeps the static base frame and nothing else. */
    if (prefersReducedMotion()) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const radius = BRUSH_RADIUS * dpr;
    const diameter = Math.ceil(radius * 2);
    const centre = diameter / 2;

    const brush = document.createElement('canvas');
    brush.width = diameter;
    brush.height = diameter;
    const bctx = brush.getContext('2d');

    const cover = document.createElement('canvas');
    const cctx = cover.getContext('2d');
    if (!bctx || !cctx) return;

    let source: CanvasImageSource | null = null;
    let srcW: number = PLATE.w;
    let srcH: number = PLATE.h;

    const points: Point[] = [];
    let last: Point | null = null;
    let idle = 0;
    let raf = 0;
    let frame = 0;
    let drift = 0;
    let disposed = false;

    /* Draw the reveal frame into an offscreen canvas using the same
       object-fit: cover maths the <img> underneath is using, so the
       two frames stay registered. */
    const paintCover = () => {
      if (!source || !canvas.width || !canvas.height) return;
      cover.width = canvas.width;
      cover.height = canvas.height;
      const scale = Math.max(canvas.width / srcW, canvas.height / srcH);
      const dw = srcW * scale;
      const dh = srcH * scale;
      cctx.clearRect(0, 0, cover.width, cover.height);
      cctx.drawImage(source, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      paintCover();
      last = null;
      points.length = 0;
    };

    const stamp = (x: number, y: number) => {
      bctx.clearRect(0, 0, diameter, diameter);
      bctx.globalCompositeOperation = 'source-over';

      const gradient = bctx.createRadialGradient(centre, centre, 0, centre, centre, centre);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.55, 'rgba(255,255,255,0.82)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      bctx.fillStyle = gradient;
      bctx.fillRect(0, 0, diameter, diameter);

      /* Keep only the part of the reveal frame under the brush. */
      bctx.globalCompositeOperation = 'source-in';
      bctx.drawImage(cover, x - centre, y - centre, diameter, diameter, 0, 0, diameter, diameter);

      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(brush, x - centre, y - centre);
    };

    /* Touch devices have no pointer to follow — drift a point along a
       slow sine path at ~20fps so the effect still reads. */
    const autonomous = !canHover();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      frame += 1;

      if (autonomous && frame % 3 === 0) {
        drift += 0.02;
        points.push({
          x: canvas.width * (0.5 + 0.32 * Math.sin(drift)),
          y: canvas.height * (0.5 + 0.26 * Math.sin(drift * 1.7)),
        });
      }

      const drawing = points.length > 0;
      if (drawing) {
        idle = 0;
      } else {
        idle += 1;
        if (idle > FADE_FRAMES) return;
      }

      const fade = drawing ? DECAY : Math.min(DECAY + idle * 0.004, 0.5);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (drawing) {
        for (const point of points) stamp(point.x, point.y);
        points.length = 0;
      } else if (idle === FADE_FRAMES) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
      const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

      /* Ignore anything well outside the canvas, and break the trail. */
      if (x < -radius || y < -radius || x > canvas.width + radius || y > canvas.height + radius) {
        last = null;
        return;
      }

      if (!last) {
        last = { x, y };
        points.push({ x, y });
        return;
      }

      const dx = x - last.x;
      const dy = y - last.y;
      const distance = Math.hypot(dx, dy);
      const step = Math.max(radius * 0.3, 1);
      const count = Math.min(Math.max(Math.ceil(distance / step), 1), MAX_POINTS);

      for (let i = 1; i <= count; i += 1) {
        points.push({ x: last.x + (dx * i) / count, y: last.y + (dy * i) / count });
      }
      last = { x, y };
    };

    const observer = new ResizeObserver(resize);

    const start = () => {
      if (disposed) return;
      resize();
      observer.observe(container);
      if (!autonomous) window.addEventListener('pointermove', onPointerMove, { passive: true });
      raf = requestAnimationFrame(tick);
    };

    if (reveal) {
      /* createElement, not `new Image()` — next/image shadows the
         global Image constructor in this module. */
      const image = document.createElement('img');
      image.decoding = 'async';
      image.onload = () => {
        if (disposed) return;
        source = image;
        srcW = image.naturalWidth || PLATE.w;
        srcH = image.naturalHeight || PLATE.h;
        start();
      };
      image.src = reveal;
    } else {
      const plate = createPlateCanvas();
      if (plate) {
        source = plate;
        srcW = PLATE.w;
        srcH = PLATE.h;
        start();
      }
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [reveal]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      {/* The LCP element. `fill` + object-cover uses exactly the cover
          maths paintCover() replicates, so the layers stay registered
          whichever optimised variant is served. */}
      <Image
        src={base}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
      />
    </div>
  );
}
