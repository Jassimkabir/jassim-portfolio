import { readFileSync } from 'node:fs';
import path from 'node:path';

import { ImageResponse } from 'next/og';

import { HERO, IDENTITY, SEO } from '@/content/site';

export const alt = `${IDENTITY.fullName}, ${IDENTITY.title} in ${IDENTITY.location}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/*
 * Dark-theme tokens, inlined because ImageResponse renders outside the
 * document and cannot read CSS variables. These must stay in sync with the
 * dark block in globals.css.
 */
const BG = '#0a100d';
const FG = '#d6d5c9';
const FG_DIM = '#b9baa3';
const ACCENT = '#a22c29';

/*
 * THE TYPEFACE IS VENDORED, and it has to be.
 *
 * ImageResponse renders through Satori, which cannot use next/font and cannot
 * read woff2 at all, so the built font assets under .next are useless here
 * even though they exist. With no font passed explicitly Satori falls back to
 * a generic sans, which is exactly what the previous card shipped: a portfolio
 * card for a front-end engineer, set in a typeface that was not his.
 *
 * So Bricolage Grotesque ships as TTF in src/lib/og-assets. Two static
 * instances at 82KB each rather than the variable font, because Satori
 * resolves one weight per run and gains nothing from the axes. OFL-1.1
 * licensed, which permits redistribution; mind the reserved font name terms if
 * these files are ever modified rather than embedded as they are.
 *
 * Read at module scope so it happens once during the static prerender rather
 * than per request.
 */
const fontDir = path.join(process.cwd(), 'src', 'lib', 'og-assets');
const bold = readFileSync(path.join(fontDir, 'bricolage-700.ttf'));
const medium = readFileSync(path.join(fontDir, 'bricolage-500.ttf'));

/*
 * The portrait, inlined as a data URI. Satori will not resolve a relative
 * path, and pointing it at the deployed URL would make the build depend on
 * the deployment it is part of.
 *
 * portrait.png, NOT Jassim.png. Jassim.png is the same photograph on a white
 * background, which on this base needs a scrim to hide and still leaves a pale
 * band down the right edge. portrait.png is cut out with real transparency, so
 * it composites straight onto the dark base with no scrim and no seam.
 */
const portrait = readFileSync(path.join(process.cwd(), 'public', 'portrait.png'));
const portraitSrc = `data:image/png;base64,${portrait.toString('base64')}`;

/** Origin without the scheme. The card shows where it lives, not a full URL. */
const domain = SEO.url.replace(/^https?:\/\//, '');

/**
 * The share card.
 *
 * WHAT WAS WRONG WITH THE OLD ONE. The full name at 128px overran the measure
 * and wrapped, orphaning "K" onto a line by itself, which is the same defect
 * the footer sign-off and the copyright line both had. The right half of the
 * card was empty. The stack sat in a filled pill that read as a button nobody
 * could press. And it carried no portrait, on a card whose whole job is to put
 * a face beside a name in a feed.
 *
 * Two columns now: everything readable on the left, the portrait bleeding off
 * the right and bottom edges. It needs no scrim because the source is cut out
 * with real transparency, so it composites onto the base with no seam.
 *
 * The display line is the short name. One word cannot wrap, which retires the
 * orphan outright instead of tuning a font size until it happens to fit, and
 * it matches the sign-off the footer already uses.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: BG,
          color: FG,
          fontFamily: 'Bricolage',
          position: 'relative',
        }}
      >
        {/*
          Portrait, bleeding off the right and bottom edges.

          THE CLIP CONTAINER IS THE WHOLE CARD, and it has to be. It was 520px
          wide, which put its left boundary straight through his shoulder and
          sliced it off on a hard vertical line. Only the bottom needs clipping
          here; nothing wants a left edge.

          Every number below comes from the source's own alpha bounds rather
          than from eyeballing it. In portrait.png the head occupies x 0.289 to
          0.696, the shoulders 0.094 to 0.939, and the hoodie logo sits in the
          band below y 0.80. At 780px placed at right -190 and bottom -175:

            head        x 835 to 1153, clear of the 1200 card edge by 47px
            shoulder    starts at x 683, clear of the text column by 51px
            logo        starts at y 649, below the 630 card edge, so it is gone

          The right shoulder still runs off the card edge. That is the bleed,
          and it is deliberate; the slice this replaced was not.

          No scrim: the cut-out is transparent, so it sits on the base directly.
        */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          <img
            src={portraitSrc}
            width={780}
            height={780}
            alt=""
            style={{ position: 'absolute', right: -190, bottom: -175, width: 780, height: 780 }}
          />
        </div>

        {/* ── accent spine, the one filled use of accent on this card ──── */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 14,
            height: 630,
            background: ACCENT,
            display: 'flex',
          }}
        />

        {/* ── text column ──────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '70px 60px 70px 92px',
            width: 760,
            height: 630,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 23,
              letterSpacing: 7,
              color: ACCENT,
              fontWeight: 500,
            }}
          >
            {IDENTITY.title.toUpperCase()}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Short name: one word, so it can never wrap. */}
            <div
              style={{
                display: 'flex',
                fontSize: 152,
                fontWeight: 700,
                letterSpacing: -6,
                lineHeight: 1,
              }}
            >
              {IDENTITY.shortName}
            </div>

            <div
              style={{
                display: 'flex',
                width: 120,
                height: 3,
                background: FG,
                marginTop: 30,
                marginBottom: 30,
              }}
            />

            <div
              style={{
                display: 'flex',
                fontSize: 29,
                lineHeight: 1.34,
                color: FG_DIM,
                fontWeight: 500,
                width: 540,
              }}
            >
              {HERO.subtext}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 22,
              color: FG_DIM,
              fontWeight: 500,
            }}
          >
            <div style={{ display: 'flex' }}>{domain}</div>
            <div
              style={{
                display: 'flex',
                width: 5,
                height: 5,
                borderRadius: 3,
                background: FG_DIM,
                marginLeft: 18,
                marginRight: 18,
              }}
            />
            <div style={{ display: 'flex' }}>{IDENTITY.location}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Bricolage', data: bold, weight: 700, style: 'normal' },
        { name: 'Bricolage', data: medium, weight: 500, style: 'normal' },
      ],
    },
  );
}
