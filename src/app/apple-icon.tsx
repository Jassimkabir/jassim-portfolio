import { ImageResponse } from 'next/og';

import { ACCENT, ACCENT_FG, fonts } from '@/lib/og-card';

/**
 * The iOS home screen icon.
 *
 * There was none, so adding this site to a home screen produced a screenshot
 * of the page shrunk to 180px, which is unreadable and reads as unfinished.
 * `favicon.ico` does not cover this: iOS ignores it and looks for
 * apple-touch-icon specifically.
 *
 * 180x180 is the size current iPhones request. iOS downsamples it for every
 * smaller slot, so one file is enough; older devices asked for a spread of
 * sizes and no longer do.
 *
 * OPAQUE ON PURPOSE. iOS does not support transparency here and composites
 * anything transparent onto black, so a cut-out mark would sit in a black
 * square on every device. The accent fill is the background rather than a
 * detail for that reason.
 *
 * Accent as a fill with bone on top, which is the accent's only AA-passing use
 * and measures 4.86:1. iOS applies its own rounded mask, so this ships square
 * with no corner radius of its own.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: ACCENT,
          color: ACCENT_FG,
          fontFamily: 'Bricolage',
        }}
      >
        {/* Optically centred, not mathematically. The J's descender hangs
            below the baseline, so centring the glyph box leaves it sitting
            low; the offset lifts it back. */}
        <div
          style={{
            display: 'flex',
            fontSize: 128,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -4,
            marginTop: -10,
          }}
        >
          J
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
