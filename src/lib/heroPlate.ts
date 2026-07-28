/* ──────────────────────────────────────────────────────────────────
   Hero frame geometry.

   The hero is two frames of the *same* composition at the *same*
   crop: a light base (public/assets/hero/light.svg, always visible)
   and a dark plate painted under the cursor. Both are described by
   the constants below so they line up exactly — swap in real photo-
   graphy by pointing HERO.base / HERO.reveal at two matching images.
─────────────────────────────────────────────────────────────────── */

export const PLATE = { w: 2400, h: 1400 } as const;

export const WINDOW = { x: 300, y: 260, w: 1800, h: 880, r: 36 } as const;

export const GRID = 100;

/** Editor "source lines": [indent step, bar width] in plate pixels. */
export const LINES: ReadonlyArray<readonly [number, number]> = [
  [0, 520],
  [0, 760],
  [1, 640],
  [1, 880],
  [2, 700],
  [2, 540],
  [1, 820],
  [0, 300],
  [0, 680],
  [1, 900],
  [2, 610],
  [2, 760],
  [1, 520],
  [0, 440],
];

export const LINE = {
  x: WINDOW.x + 80,
  y: WINDOW.y + 200,
  step: 46,
  height: 14,
  indent: 60,
} as const;

export const CHROME_Y = WINDOW.y + 70;

/** Draw the dark reveal plate at full PLATE resolution. */
export function drawPlate(ctx: CanvasRenderingContext2D) {
  const { w, h } = PLATE;

  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, w, h);

  /* Matching grid, so the two layers register against each other. */
  ctx.strokeStyle = 'rgba(255,255,255,0.045)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = GRID; x < w; x += GRID) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
  }
  for (let y = GRID; y < h; y += GRID) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
  }
  ctx.stroke();

  /* Accent bloom, mirroring the light frame's warm corner. */
  const bloom = ctx.createRadialGradient(w * 0.78, h * 0.76, 0, w * 0.78, h * 0.76, w * 0.42);
  bloom.addColorStop(0, 'rgba(207,128,71,0.20)');
  bloom.addColorStop(1, 'rgba(207,128,71,0)');
  ctx.fillStyle = bloom;
  ctx.fillRect(0, 0, w, h);

  /* Editor panel */
  roundRect(ctx, WINDOW.x, WINDOW.y, WINDOW.w, WINDOW.h, WINDOW.r);
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 2;
  ctx.stroke();

  /* Chrome dots + divider */
  const dots = ['#cf8047', 'rgba(255,255,255,0.25)', 'rgba(255,255,255,0.15)'];
  dots.forEach((fill, i) => {
    ctx.beginPath();
    ctx.arc(WINDOW.x + 56 + i * 44, CHROME_Y, 13, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
  });
  ctx.beginPath();
  ctx.moveTo(WINDOW.x, CHROME_Y + 70);
  ctx.lineTo(WINDOW.x + WINDOW.w, CHROME_Y + 70);
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 2;
  ctx.stroke();

  /* Source lines */
  LINES.forEach(([indent, width], i) => {
    const x = LINE.x + indent * LINE.indent;
    const y = LINE.y + i * LINE.step;
    roundRect(ctx, x, y, width, LINE.height, LINE.height / 2);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fill();
  });

  /* Caret parked after the last line */
  const lastIndex = LINES.length - 1;
  const [lastIndent, lastWidth] = LINES[lastIndex];
  ctx.fillStyle = '#cf8047';
  ctx.fillRect(
    LINE.x + lastIndent * LINE.indent + lastWidth + 16,
    LINE.y + lastIndex * LINE.step - 4,
    10,
    LINE.height + 8
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/** Build the reveal plate once, as an offscreen canvas at PLATE size. */
export function createPlateCanvas(): HTMLCanvasElement | null {
  const canvas = document.createElement('canvas');
  canvas.width = PLATE.w;
  canvas.height = PLATE.h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  drawPlate(ctx);
  return canvas;
}
