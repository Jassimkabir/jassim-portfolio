import { ImageResponse } from 'next/og';
import { IDENTITY } from '@/content/site';

export const alt = 'Waleed Jassim M K, front-end engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/*
 * Dark-theme tokens, inlined because ImageResponse renders outside the
 * document and cannot read CSS variables. These four values must stay in sync
 * with globals.css.
 *
 * Bricolage is not loaded here: ImageResponse cannot use next/font, and
 * fetching the woff2 would make the build depend on the network. The card
 * leans on scale and colour instead.
 */
const BG = '#0a100d';
const FG = '#d6d5c9';
const FG_DIM = '#b9baa3';
const ACCENT = '#a22c29';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          color: FG,
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: FG_DIM, textTransform: 'uppercase' }}>
          {IDENTITY.title}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>
            {IDENTITY.fullName}
          </div>
          {/* Accent as a fill, never as text on this base. */}
          <div style={{ display: 'flex', marginTop: 40 }}>
            <div style={{ display: 'flex', background: ACCENT, color: FG, fontSize: 30, padding: '16px 32px', borderRadius: 20 }}>
              React, Next.js, TypeScript
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: FG_DIM }}>
          {IDENTITY.location}
        </div>
      </div>
    ),
    size,
  );
}
