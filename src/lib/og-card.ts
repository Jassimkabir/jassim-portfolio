import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Shared pieces for the two share cards.
 *
 * There are two: a 1200x630 landscape at /opengraph-image, which is what every
 * feed consumer reads, and a 1200x1200 square at /share-square, which exists
 * for the structured data image array. They are separate compositions of the
 * same content, so everything that is not composition lives here and neither
 * card owns a copy.
 *
 * The square is deliberately NOT a second opengraph-image output. The Open
 * Graph spec allows repeating og:image, but consumers each apply their own
 * rule for choosing between them and most simply take the first, so a second
 * tag buys ambiguity rather than control. Keeping the square on its own route
 * means it cannot leak into og:image at all.
 */

/*
 * Dark-theme tokens, inlined because ImageResponse renders outside the
 * document and cannot read CSS variables. These must stay in sync with the
 * dark block in globals.css.
 */
export const BG = '#0a100d';
export const FG = '#d6d5c9';
export const FG_DIM = '#b9baa3';
export const ACCENT = '#a22c29';

/*
 * THE TYPEFACE IS VENDORED, and it has to be.
 *
 * ImageResponse renders through Satori, which cannot use next/font and cannot
 * read woff2 at all, so the built font assets under .next are useless here
 * even though they exist. With no font passed explicitly Satori falls back to
 * a generic sans, which is what the first version of the landscape card
 * shipped: a portfolio card for a front-end engineer, set in a typeface that
 * was not his.
 *
 * Bricolage Grotesque ships as TTF in src/lib/og-assets. Two static instances
 * at 82KB each rather than the variable font, because Satori resolves one
 * weight per run and gains nothing from the axes. OFL-1.1, which permits
 * redistribution; mind the reserved font name terms if these are ever modified
 * rather than embedded as they are.
 *
 * Read at module scope so it happens once per build rather than per request.
 */
const assetDir = path.join(process.cwd(), 'src', 'lib', 'og-assets');

export const fonts = [
  {
    name: 'Bricolage',
    data: readFileSync(path.join(assetDir, 'bricolage-700.ttf')),
    weight: 700 as const,
    style: 'normal' as const,
  },
  {
    name: 'Bricolage',
    data: readFileSync(path.join(assetDir, 'bricolage-500.ttf')),
    weight: 500 as const,
    style: 'normal' as const,
  },
];

/*
 * The portrait, inlined as a data URI. Satori will not resolve a relative
 * path, and pointing it at the deployed URL would make the build depend on the
 * deployment it is part of.
 *
 * portrait.png, NOT Jassim.png. Both are the same photograph, but Jassim.png
 * is on a white background, which needs a scrim to hide and still leaves a
 * pale band down the edge; the first attempt at the landscape card shipped
 * exactly that. portrait.png is cut out with real transparency and composites
 * onto the base with no seam and no scrim at all.
 */
const portrait = readFileSync(path.join(process.cwd(), 'public', 'portrait.png'));
export const portraitSrc = `data:image/png;base64,${portrait.toString('base64')}`;

/**
 * Where the subject actually sits inside portrait.png, as fractions of the
 * source, measured from its alpha channel rather than judged by eye.
 *
 * Both cards position the photograph from these numbers. The landscape card
 * was first laid out by eye and the clip ran straight through his shoulder;
 * measuring is what fixed it, so the measurements live here where the second
 * card gets them for free.
 *
 * The chest band is the one that matters most: the hoodie carries a coffee
 * shop's logo, and both cards run that band off an edge so another business's
 * branding stays off his share card.
 */
export const SUBJECT = {
  /** Head, including hair. */
  head: { left: 0.289, right: 0.696, top: 0.09 },
  /** Shoulder line, the widest part above the chest. */
  shoulders: { left: 0.094, right: 0.939 },
  /** Everything below this fraction of the height contains the hoodie logo. */
  logoBelow: 0.8,
} as const;
