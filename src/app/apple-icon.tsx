import { ImageResponse } from 'next/og';

import { IDENTITY } from '@/content/site';
import { BONE, BONE_LIFT, FG_DIM, fonts, portraitSrc } from '@/lib/og-card';

/**
 * The iOS home screen icon: the name behind the figure, as the hero does it.
 *
 * There was none before, so saving the site to a home screen produced a
 * screenshot of the page shrunk to 180px. favicon.ico does not cover this; iOS
 * ignores it and looks for apple-touch-icon by name.
 *
 * THE HERO'S IDEA, NOT THE HERO'S VALUES. On the page the word sits at 0.09
 * opacity and 21rem, which works because there is a viewport of quiet around
 * it and a reader who has already arrived. A 180px tile seen at a glance has
 * neither. What carries over is the composition, an oversized name bleeding off
 * both edges with the head interrupting it, and what does not carry over is
 * every number, which is retuned for the format.
 *
 * THE GROUND IS LIGHT, and that is a constraint rather than a preference. His
 * hair is close to black, so on the dark base the head loses its silhouette and
 * dissolves into the tile. The favicon already answers this with a light
 * circle. Keeping the ground light also lets the wordmark sit a step darker
 * than the background instead of a step lighter, which is the more restrained
 * of the two and the reason this reads as tonal rather than as a watermark
 * pasted on.
 *
 * OPAQUE. iOS does not support transparency here and composites anything
 * transparent onto black, which is also why the favicon cannot simply be
 * reused: its corners are transparent and it would arrive framed in black.
 *
 * NO CORNER RADIUS. iOS applies its own superellipse mask and clips whatever
 * it is handed, so a radius here would be masked twice.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * The crop, derived from the source rather than judged by eye.
 *
 * portrait.png is 759px square. Measured from its alpha channel the head
 * occupies x 219 to 528 and y 68 to 352, the silhouette narrows to the neck at
 * 352, and the hoodie's coffee shop logo lives below y 607.
 *
 * The window is 580px starting 20px above the hair, which is deliberately
 * looser than the 440px this replaced: the head lands at 49% of the tile
 * rather than 65%, so the shoulders and upper chest are in frame and the
 * figure has room to be a figure. It stops at y 600, seven pixels above the
 * logo, which keeps another business's branding off the icon.
 *
 * If the portrait is ever replaced, re-measure. Do not nudge these.
 */
const CROP = { rendered: 235.6, left: -25.9, top: -6.2 };

/**
 * The wordmark.
 *
 * `top` places its optical centre near y 59, which is where the head's own
 * centre falls, so the hair cuts through the word rather than clearing it.
 * That interruption is the whole effect; a word floating above an untouched
 * head is a caption, not a composition.
 *
 * It is sized to overrun the tile on both sides. A name that fits inside the
 * frame reads as a label; one that runs past the edges reads as scale.
 *
 * Measured, not guessed. At 62 the word rendered 152px wide with 14px of bone
 * showing either side, which is a label sitting politely in a box. 80 pushes it
 * past both edges. `top` moved with it so the cap band stays centred on the
 * head rather than drifting up as the type grew.
 */
const WORD = { size: 80, top: 20 };

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          /* Bone with the lighter tint above, both already in the palette. A
             flat fill reads cheap at tile size, and the lighter end belongs at
             the top because that is where the light falls on him in the
             photograph. */
          backgroundImage: `linear-gradient(180deg, ${BONE_LIFT} 0%, ${BONE} 100%)`,
          backgroundColor: BONE,
        }}
      >
        {/* Behind the figure. First in the DOM because Satori stacks in order. */}
        <div
          style={{
            position: 'absolute',
            top: WORD.top,
            left: 0,
            width: 180,
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Bricolage',
            fontSize: WORD.size,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -3,
            color: FG_DIM,
            whiteSpace: 'nowrap',
          }}
        >
          {IDENTITY.shortName.toUpperCase()}
        </div>

        <img
          src={portraitSrc}
          width={CROP.rendered}
          height={CROP.rendered}
          alt=""
          style={{
            position: 'absolute',
            left: CROP.left,
            top: CROP.top,
            width: CROP.rendered,
            height: CROP.rendered,
          }}
        />
      </div>
    ),
    { ...size, fonts },
  );
}
