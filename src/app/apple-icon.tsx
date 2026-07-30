import { ImageResponse } from 'next/og';

import { BONE, BONE_LIFT, fonts, portraitSrc } from '@/lib/og-card';

/**
 * The iOS home screen icon: the portrait, cropped to head and shoulders.
 *
 * There was none before, so saving the site to a home screen produced a
 * screenshot of the page shrunk to 180px. favicon.ico does not cover this; iOS
 * ignores it and looks for apple-touch-icon by name.
 *
 * THE BACKGROUND IS LIGHT, and that is not a style preference. His hair is
 * close to black, so a cut-out on the dark base loses its silhouette entirely:
 * the head dissolves into the tile. The existing favicon solves the same
 * problem the same way, with a light circle, so this matches it rather than
 * inventing a second answer to it.
 *
 * OPAQUE. iOS does not support transparency here and composites anything
 * transparent onto black. That is also why the favicon cannot simply be reused
 * as this file: its corners are transparent, so it would arrive framed in
 * black.
 *
 * NO CORNER RADIUS. iOS applies its own superellipse mask and clips whatever
 * it is handed, so a radius here would be masked twice and read as a rounded
 * tile floating inside a rounded tile.
 *
 * `fonts` is still passed although nothing here sets type: ImageResponse
 * requires at least one font and throws without one.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * The crop, derived from the source rather than judged by eye.
 *
 * portrait.png is 759px square. Measured from its alpha channel, the head
 * occupies x 219 to 528 and y 68 to 352, where the silhouette narrows to the
 * neck.
 *
 * Showing a 440px window of that source, centred on the head horizontally and
 * starting 30px above the hair, puts the head at 65% of the tile height with
 * its centre exactly on the tile's vertical axis. A small head marooned in a
 * large square is what makes photographic icons look weak; filling the frame
 * is what stops it.
 *
 * The head sits a little above the tile's centre on purpose. Portraits want
 * headroom, and centring the head's bounding box instead leaves the face
 * looking like it is sliding off the bottom.
 *
 * If the portrait is ever replaced, re-measure these. Do not nudge them.
 */
const CROP = {
  /** 759 * (180 / 440): the source scaled so a 440px window fills the tile. */
  rendered: 310.5,
  left: -62.8,
  top: -12.3,
};

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'hidden',
          /* Bone, with the lighter tint at the top. Both are already in the
             palette. A flat fill reads cheap at tile size, and putting the
             lighter end above matches where the light falls on him in the
             photograph. */
          backgroundImage: `linear-gradient(180deg, ${BONE_LIFT} 0%, ${BONE} 100%)`,
          backgroundColor: BONE,
        }}
      >
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
