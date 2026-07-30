import { ImageResponse } from 'next/og';

import { ACCENT, ACCENT_FG, ACCENT_PRESS, fonts } from '@/lib/og-card';

/**
 * The iOS home screen icon.
 *
 * There was none, so saving the site to a home screen produced a screenshot of
 * the page shrunk to 180px. favicon.ico does not cover this: iOS ignores it and
 * looks for apple-touch-icon by name.
 *
 * WHY A LETTERFORM AND NOT THE FAVICON'S PHOTOGRAPH. The favicon is a circular
 * headshot, and matching it here was the obvious move, but it loses at this
 * job. iOS asks for 180px and then downsamples the same file to roughly 120,
 * 87 and 60 for its smaller slots, and a face at 60px is mush. A letterform
 * survives every one of those reductions intact. The two marks stay different
 * on purpose: tabs keep the photograph, tiles get the letter.
 *
 * OPAQUE ON PURPOSE. iOS does not support transparency here and composites
 * anything transparent onto black, so a cut-out would sit in a black square on
 * every device. This is also why the favicon cannot simply be reused: its
 * corners are transparent, so it would arrive framed in black.
 *
 * NO CORNER RADIUS. iOS applies its own superellipse mask and clips whatever
 * it is given. A radius here would be masked again and read as a rounded tile
 * floating inside a rounded tile.
 *
 * THE NUMBERS BELOW WERE MEASURED, not chosen. See the note on GLYPH.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * Optical geometry for the J, measured off a render rather than judged.
 *
 * `size` sets the cap height to roughly 53% of the tile, which is where a
 * single letterform stops looking lost in its own square and starts filling it
 * without crowding the corners iOS masks away.
 *
 * `lift` corrects the baseline. Text centred by its line box sits low, because
 * the box reserves descender space this glyph does not use, so centring on the
 * box leaves the ink low by about half that descent. This raises it back onto
 * the optical centre.
 *
 * Both were tuned against a render. The first pass used 132 with a lift of 7
 * and letter-spacing of -2, which measured out at a 48.9% cap height sitting
 * 2.5px above and 2.5px left of centre: the lift overshot, and trailing
 * letter-spacing on a single glyph pulls the centred box off axis for no
 * benefit, so the tracking is gone.
 *
 * `nudgeX` is not a fudge. This J carries more left side bearing than right,
 * so its advance box centres while its ink does not; measured, the ink sat 4px
 * left of the tile centre. Centring what you can see rather than what the font
 * reserves is the whole point of doing this optically.
 *
 * If this glyph ever changes, re-measure the ink bounds. Do not adjust by eye.
 */
const GLYPH = { size: 143, lift: 3, nudgeX: 4 };

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
          /* Accent into accent-press, both existing tokens. A flat fill reads
             cheap at tile size; the gradient gives it depth without
             introducing a colour the palette does not already have. */
          backgroundImage: `linear-gradient(145deg, ${ACCENT} 0%, ${ACCENT_PRESS} 100%)`,
          backgroundColor: ACCENT,
          color: ACCENT_FG,
          fontFamily: 'Bricolage',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: GLYPH.size,
            fontWeight: 700,
            lineHeight: 1,
            marginTop: -GLYPH.lift,
            marginLeft: GLYPH.nudgeX,
          }}
        >
          J
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
