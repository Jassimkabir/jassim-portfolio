import { ImageResponse } from 'next/og';

import { HERO, IDENTITY, SEO } from '@/content/site';
import { ACCENT, BG, FG, FG_DIM, fonts, portraitSrc } from '@/lib/og-card';

/**
 * The 1:1 share card, 1200x1200.
 *
 * WHY THIS IS A ROUTE AND NOT A SECOND opengraph-image OUTPUT. Next can emit
 * several images from one metadata file, and Open Graph permits repeating
 * og:image, but consumers each apply their own rule for picking between them
 * and most just take the first. A second tag would buy ambiguity, not control:
 * nothing lets you say "square for one platform, landscape for another".
 *
 * So this shape goes only where something reads it deliberately, which is the
 * structured data image array. Google's rich results guidance asks for the
 * same image in several aspect ratios so it can choose per surface, and that
 * is the one place multiple shapes are a documented input rather than a guess.
 * Keeping it off the metadata API means it cannot leak into og:image at all.
 *
 * It also replaces what that slot used to hold. The graph pointed at
 * portrait.png, which is 759x759, under Google's 1200px recommendation, and is
 * the bare transparent cut-out: composited onto someone else's surface it was
 * a floating head with no name, no branding and no context.
 *
 * WHATSAPP WILL NEVER SEE THIS FILE. It reads Open Graph only, so it gets the
 * landscape card. See the note in structured-data.ts.
 */

/* Static, so it is rendered once at build time like the landscape card rather
   than on every crawler request. */
export const dynamic = 'force-static';

const SIZE = 1200;

/** Origin without the scheme. The card shows where it lives, not a full URL. */
const domain = SEO.url.replace(/^https?:\/\//, '');

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: BG,
          color: FG,
          fontFamily: 'Bricolage',
          position: 'relative',
        }}
      >
        {/*
          Portrait, anchored to the bottom edge.

          A square has no room for the landscape card's side-by-side split, so
          the composition stacks instead: type in the upper half, photograph
          filling the lower.

          Geometry from SUBJECT in lib/og-card, which was measured off the
          source's alpha channel. At 880px placed at right -110 and bottom -205
          the head lands at x 634 to 969 and y 654 upward, clear of the type
          above it, and the hoodie logo starts at y 1199, which the bottom edge
          removes. The far shoulder bleeds off the right edge on purpose.

          The clip container is the whole card. On the landscape card a narrow
          container put its boundary through his shoulder and sliced it on a
          hard vertical line; only the bottom ever needs clipping.
        */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: SIZE,
            height: SIZE,
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {/* next/image cannot be used here. ImageResponse renders through
              Satori, which understands a small subset of HTML and CSS and has
              no React runtime, so an Image component would never render. The
              rule exempts opengraph-image.tsx by name but not route handlers,
              which is the only reason the landscape card does not need this. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitSrc}
            width={880}
            height={880}
            alt=""
            style={{ position: 'absolute', right: -110, bottom: -205, width: 880, height: 880 }}
          />
        </div>

        {/* Accent spine, the one filled use of accent on this card. */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 18,
            height: SIZE,
            background: ACCENT,
            display: 'flex',
          }}
        />

        {/* ── type, upper half ─────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '96px 96px 0 110px',
            width: SIZE,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              letterSpacing: 8,
              color: ACCENT,
              fontWeight: 500,
            }}
          >
            {IDENTITY.title.toUpperCase()}
          </div>

          {/* Short name: one word, so it can never wrap. */}
          <div
            style={{
              display: 'flex',
              fontSize: 190,
              fontWeight: 700,
              letterSpacing: -8,
              lineHeight: 1,
              marginTop: 44,
            }}
          >
            {IDENTITY.shortName}
          </div>

          <div
            style={{
              display: 'flex',
              width: 150,
              height: 4,
              background: FG,
              marginTop: 44,
              marginBottom: 44,
            }}
          />

          <div
            style={{
              display: 'flex',
              fontSize: 36,
              lineHeight: 1.34,
              color: FG_DIM,
              fontWeight: 500,
              width: 720,
            }}
          >
            {HERO.subtext}
          </div>
        </div>

        {/* ── footer, sitting over the base to the left of the shoulder ── */}
        <div
          style={{
            position: 'absolute',
            left: 110,
            bottom: 76,
            display: 'flex',
            flexDirection: 'column',
            fontSize: 27,
            color: FG_DIM,
            fontWeight: 500,
          }}
        >
          <div style={{ display: 'flex' }}>{domain}</div>
          <div style={{ display: 'flex', marginTop: 12 }}>{IDENTITY.location}</div>
        </div>
      </div>
    ),
    { width: SIZE, height: SIZE, fonts },
  );
}
