/**
 * Animated vintage editorial illustrations, drawn in the halftone-engraving
 * style of old op-ed art but with a developer subject: a retro CRT computer,
 * a glowing server rack, and a browser wireframe. Pure SVG + CSS (see the
 * .ill-* rules in globals.css). Decorative; each is aria-hidden.
 */

const halftoneDefs = (id: string) => (
  <defs>
    <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.1" fill="currentColor" />
    </pattern>
  </defs>
);

/* ── Retro CRT computer — blinking prompt + sweeping scanline ── */
export function RetroComputer() {
  return (
    <div className="ill ill-crt" aria-hidden="true">
      <svg viewBox="0 0 220 200" role="img">
        {halftoneDefs('ht-crt')}
        {/* monitor case */}
        <rect x="18" y="16" width="184" height="140" rx="10" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="18" y="16" width="184" height="140" rx="10" fill="url(#ht-crt)" opacity="0.12" />
        {/* screen */}
        <rect x="34" y="30" width="152" height="104" rx="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <clipPath id="crt-screen">
          <rect x="34" y="30" width="152" height="104" rx="5" />
        </clipPath>
        <g clipPath="url(#crt-screen)">
          {/* prompt lines */}
          <g className="ill-type" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M44 48 h10" className="red-ink" />
            <path d="M60 48 h46" />
            <path d="M44 62 h10" className="red-ink" />
            <path d="M60 62 h70" />
            <path d="M44 76 h10" className="red-ink" />
            <path d="M60 76 h32" />
          </g>
          {/* blinking cursor */}
          <rect className="ill-cursor" x="60" y="86" width="9" height="11" fill="currentColor" />
          {/* sweeping scanline */}
          <rect className="ill-scan" x="34" y="30" width="152" height="7" fill="currentColor" opacity="0.16" />
        </g>
        {/* base + stand */}
        <path d="M96 156 h28 l6 20 h-40 z" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="70" y="176" width="80" height="8" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
        {/* power LED */}
        <circle className="ill-led" cx="176" cy="146" r="3.4" fill="currentColor" />
      </svg>
    </div>
  );
}

/* ── Glowing server rack — staggered blinking LEDs ── */
export function ServerRack() {
  const units = [0, 1, 2, 3, 4];
  return (
    <div className="ill ill-rack" aria-hidden="true">
      <svg viewBox="0 0 200 200" role="img">
        {halftoneDefs('ht-rack')}
        <rect x="40" y="14" width="120" height="172" rx="7" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="40" y="14" width="120" height="172" rx="7" fill="url(#ht-rack)" opacity="0.1" />
        {units.map((u) => {
          const y = 26 + u * 32;
          return (
            <g key={u}>
              <rect x="50" y={y} width="100" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
              {/* vents */}
              <g stroke="currentColor" strokeWidth="1.4" opacity="0.5">
                <path d={`M96 ${y + 6} h44`} />
                <path d={`M96 ${y + 12} h44`} />
                <path d={`M96 ${y + 18} h44`} />
              </g>
              {/* LEDs — glow + blink, staggered by unit */}
              <circle className="ill-led" style={{ animationDelay: `${u * 0.4}s` }} cx="60" cy={y + 8} r="3" fill="currentColor" />
              <circle className="ill-led red-ink" style={{ animationDelay: `${u * 0.4 + 0.7}s` }} cx="72" cy={y + 8} r="3" />
              <circle className="ill-led" style={{ animationDelay: `${u * 0.4 + 1.1}s` }} cx="60" cy={y + 16} r="3" fill="currentColor" opacity="0.5" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Browser wireframe — blocks that pulse as if "building" ── */
export function Wireframe() {
  return (
    <div className="ill ill-wire" aria-hidden="true">
      <svg viewBox="0 0 220 180" role="img">
        {halftoneDefs('ht-wire')}
        {/* window */}
        <rect x="14" y="14" width="192" height="152" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
        {/* title bar */}
        <path d="M14 38 h192" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="28" cy="26" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="40" cy="26" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="52" cy="26" r="3.2" fill="currentColor" className="red-ink" />
        <rect x="74" y="21" width="118" height="10" rx="5" fill="url(#ht-wire)" opacity="0.3" stroke="currentColor" strokeWidth="1.2" />
        {/* layout blocks — staggered pulse */}
        <rect className="ill-block" x="28" y="52" width="70" height="44" rx="4" fill="url(#ht-wire)" opacity="0.5" stroke="currentColor" strokeWidth="1.6" />
        <rect className="ill-block" style={{ animationDelay: '0.5s' }} x="108" y="52" width="84" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <rect className="ill-block" style={{ animationDelay: '0.9s' }} x="108" y="78" width="60" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <rect className="ill-block" style={{ animationDelay: '1.2s' }} x="28" y="108" width="164" height="14" rx="4" fill="url(#ht-wire)" opacity="0.4" stroke="currentColor" strokeWidth="1.4" />
        <rect className="ill-block" style={{ animationDelay: '1.5s' }} x="28" y="130" width="120" height="14" rx="4" stroke="currentColor" strokeWidth="1.4" fill="none" />
        {/* build scanline */}
        <rect className="ill-scan" x="14" y="38" width="192" height="6" fill="currentColor" opacity="0.14" />
      </svg>
    </div>
  );
}
