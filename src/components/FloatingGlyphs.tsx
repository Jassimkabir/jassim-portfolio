/**
 * Decorative 3D floating code glyphs. Positioned here, animated by Effects
 * (parallax + rotation tied to Lenis scroll, plus mouse parallax & idle float).
 * Purely cosmetic + aria-hidden.
 */
type Glyph = {
  s: string;
  top: string;
  left: string;
  size: number;
  color: string;
  depth: number;
  o: number;
  hideSm?: boolean;
};

const GLYPHS: Glyph[] = [
  { s: "</>", top: "16%", left: "82%", size: 92, color: "var(--lime)", depth: 1.4, o: 0.16 },
  { s: "{ }", top: "70%", left: "8%", size: 78, color: "var(--coral)", depth: 1.1, o: 0.14 },
  { s: "( )", top: "38%", left: "46%", size: 64, color: "var(--lilac)", depth: 0.7, o: 0.1, hideSm: true },
  { s: "=>", top: "84%", left: "70%", size: 70, color: "var(--lime)", depth: 1.2, o: 0.13 },
  { s: ";", top: "26%", left: "14%", size: 110, color: "var(--coral)", depth: 0.9, o: 0.12 },
  { s: "#", top: "58%", left: "90%", size: 86, color: "var(--lilac)", depth: 1.5, o: 0.13, hideSm: true },
  { s: "*", top: "8%", left: "40%", size: 60, color: "var(--lime)", depth: 0.6, o: 0.12, hideSm: true },
  { s: "[ ]", top: "92%", left: "30%", size: 66, color: "var(--lilac)", depth: 1.0, o: 0.11 },
  { s: "&&", top: "48%", left: "24%", size: 58, color: "var(--coral)", depth: 1.3, o: 0.1, hideSm: true },
  { s: "::", top: "12%", left: "62%", size: 72, color: "var(--lime)", depth: 0.8, o: 0.12, hideSm: true },
  { s: "0x1", top: "76%", left: "52%", size: 54, color: "var(--lilac)", depth: 1.1, o: 0.1, hideSm: true },
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
              color: g.color,
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
