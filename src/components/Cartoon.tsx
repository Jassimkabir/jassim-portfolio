/**
 * An animated, vintage editorial cartoon: a smiling sun rendered in the
 * halftone-engraving style of an old op-ed illustration. Rays rotate, a
 * finer beam layer counter-rotates, the face gently bobs and winks — all
 * pure SVG + CSS (see .cartoon rules in globals.css). Decorative only.
 */
export default function Cartoon() {
  // twenty rays, alternating long/short, evenly spaced round the disc
  const rays = Array.from({ length: 20 }, (_, i) => {
    const a = (i / 20) * Math.PI * 2;
    const long = i % 2 === 0;
    const r0 = 66;
    const r1 = long ? 96 : 84;
    const x0 = 100 + Math.cos(a) * r0;
    const y0 = 100 + Math.sin(a) * r0;
    const x1 = 100 + Math.cos(a) * r1;
    const y1 = 100 + Math.sin(a) * r1;
    return { x0, y0, x1, y1, long };
  });

  return (
    <div className='cartoon' aria-hidden='true'>
      <svg viewBox='0 0 200 200' role='img'>
        <defs>
          {/* halftone screen for the sun disc */}
          <pattern id='halftone' width='6' height='6' patternUnits='userSpaceOnUse'>
            <circle cx='3' cy='3' r='1.15' fill='currentColor' />
          </pattern>
          <clipPath id='disc'>
            <circle cx='100' cy='100' r='58' />
          </clipPath>
        </defs>

        {/* rotating rays */}
        <g className='rays' stroke='currentColor' strokeLinecap='round'>
          {rays.map((r, i) => (
            <line
              key={i}
              x1={r.x0}
              y1={r.y0}
              x2={r.x1}
              y2={r.y1}
              strokeWidth={r.long ? 3 : 1.6}
            />
          ))}
        </g>

        {/* counter-rotating fine beams */}
        <g className='beam' stroke='currentColor' strokeWidth='0.8' opacity='0.5'>
          {Array.from({ length: 40 }, (_, i) => {
            const a = (i / 40) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={100 + Math.cos(a) * 60}
                y1={100 + Math.sin(a) * 60}
                x2={100 + Math.cos(a) * 72}
                y2={100 + Math.sin(a) * 72}
              />
            );
          })}
        </g>

        {/* the disc: outline + halftone shading */}
        <circle cx='100' cy='100' r='58' fill='none' stroke='currentColor' strokeWidth='3' />
        <g clipPath='url(#disc)' opacity='0.28'>
          {/* halftone only over the lower-right for engraved shading */}
          <rect x='100' y='100' width='100' height='100' fill='url(#halftone)' />
          <rect x='70' y='120' width='130' height='90' fill='url(#halftone)' opacity='0.7' />
        </g>

        {/* the face */}
        <g className='face' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round'>
          {/* eyes */}
          <g className='eye'>
            <circle cx='82' cy='92' r='4.2' fill='currentColor' stroke='none' />
          </g>
          <circle cx='118' cy='92' r='4.2' fill='currentColor' stroke='none' />
          {/* little spectacle bridge — an editor, after all */}
          <path d='M86 92 q14 -6 28 0' strokeWidth='1.4' />
          {/* smile */}
          <path d='M80 112 q20 20 40 0' strokeWidth='3.4' />
          {/* rosy cheek ticks */}
          <path d='M72 106 l4 3' strokeWidth='1.6' className='red-ink' />
          <path d='M128 106 l-4 3' strokeWidth='1.6' className='red-ink' />
        </g>
      </svg>
    </div>
  );
}
