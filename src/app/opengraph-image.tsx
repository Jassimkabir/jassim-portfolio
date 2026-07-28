import { ImageResponse } from 'next/og';
import { SEO, SITE } from '@/content/site';

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="44" height="44" viewBox="0 0 48 48" fill="#cf8047">
            <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
          </svg>
          <span style={{ marginLeft: 18, fontSize: 30, fontWeight: 600 }}>
            {SITE.name}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              maxWidth: 900,
            }}
          >
            Interfaces that feel fast, built to last.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 27,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: 820,
            }}
          >
            {SEO.description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            color: 'rgba(255,255,255,0.45)',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 28,
          }}
        >
          <span>{SITE.role} · Kerala, IN</span>
          <span style={{ color: '#cf8047' }}>{SITE.url.replace('https://', '')}</span>
        </div>
      </div>
    ),
    size
  );
}
