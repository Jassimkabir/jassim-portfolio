/**
 * Drifting printer's ornaments — pilcrows, sections marks, fists & fleurons
 * scattered across the page like marginalia. Positioned here, animated by
 * Effects (cursor repulsion + scroll parallax + idle float). Decorative.
 */
type Glyph = {
  s: string;
  top: string;
  left: string;
  size: number;
  depth: number;
  o: number;
  hideSm?: boolean;
};

const GLYPHS: Glyph[] = [
  { s: '¶', top: '16%', left: '82%', size: 92, depth: 1.4, o: 0.1 },
  { s: '§', top: '70%', left: '8%', size: 84, depth: 1.1, o: 0.09 },
  { s: '☞', top: '38%', left: '46%', size: 70, depth: 0.7, o: 0.08, hideSm: true },
  { s: '❦', top: '84%', left: '70%', size: 74, depth: 1.2, o: 0.09 },
  { s: '†', top: '26%', left: '13%', size: 96, depth: 0.9, o: 0.08 },
  { s: '❧', top: '58%', left: '90%', size: 86, depth: 1.5, o: 0.09, hideSm: true },
  { s: '✶', top: '8%', left: '40%', size: 56, depth: 0.6, o: 0.08, hideSm: true },
  { s: '‡', top: '92%', left: '30%', size: 70, depth: 1.0, o: 0.08 },
  { s: '※', top: '48%', left: '24%', size: 60, depth: 1.3, o: 0.07, hideSm: true },
  { s: '☙', top: '12%', left: '62%', size: 72, depth: 0.8, o: 0.08, hideSm: true },
  { s: '✦', top: '76%', left: '52%', size: 52, depth: 1.1, o: 0.08, hideSm: true },
];

export default function FloatingGlyphs() {
  return (
    <div className="glyphs" aria-hidden="true">
      {GLYPHS.map((g, i) => (
        <span
          key={i}
          className={`glyph${g.hideSm ? " hide-sm" : ""}`}
          data-depth={g.depth}
          data-dir={i % 2 === 0 ? 1 : -1}
          style={
            {
              top: g.top,
              left: g.left,
              fontSize: g.size,
              "--o": g.o,
            } as React.CSSProperties
          }
        >
          {g.s}
        </span>
      ))}
    </div>
  );
}
