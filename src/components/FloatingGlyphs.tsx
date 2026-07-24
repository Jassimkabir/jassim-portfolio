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

/* web-dev code tokens, floating in the background (rendered in the pixel font). */
const GLYPHS: Glyph[] = [
  { s: "</>", top: "16%", left: "80%", size: 62, color: "var(--lime)", depth: 1.4, o: 0.16 },
  { s: "{ }", top: "70%", left: "7%", size: 60, color: "var(--coral)", depth: 1.1, o: 0.14 },
  { s: "=>", top: "38%", left: "46%", size: 54, color: "var(--lilac)", depth: 0.7, o: 0.1, hideSm: true },
  { s: "( )", top: "84%", left: "70%", size: 56, color: "var(--lime)", depth: 1.2, o: 0.13 },
  { s: "git", top: "26%", left: "13%", size: 58, color: "var(--coral)", depth: 0.9, o: 0.12 },
  { s: "#fff", top: "58%", left: "88%", size: 46, color: "var(--lilac)", depth: 1.5, o: 0.13, hideSm: true },
  { s: ";", top: "8%", left: "40%", size: 66, color: "var(--lime)", depth: 0.6, o: 0.12, hideSm: true },
  { s: "npm", top: "92%", left: "30%", size: 52, color: "var(--lilac)", depth: 1.0, o: 0.11 },
  { s: "&&", top: "48%", left: "23%", size: 56, color: "var(--coral)", depth: 1.3, o: 0.1, hideSm: true },
  { s: "css", top: "12%", left: "62%", size: 54, color: "var(--lime)", depth: 0.8, o: 0.12, hideSm: true },
  { s: "404", top: "76%", left: "50%", size: 50, color: "var(--lilac)", depth: 1.1, o: 0.1, hideSm: true },
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
