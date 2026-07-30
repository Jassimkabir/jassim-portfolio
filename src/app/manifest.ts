import type { MetadataRoute } from 'next';

import { IDENTITY, SEO } from '@/content/site';

/**
 * Web app manifest.
 *
 * Not here to make this installable, and `display: browser` says so honestly:
 * a one page portfolio has nothing to gain from a standalone window and would
 * lose the browser chrome a reader uses to leave. It exists because the
 * manifest is where Android and Chrome look for the name, icon and theme when
 * someone adds the page to a home screen or it turns up in a share sheet, and
 * without one they fall back to the document title and a screenshot.
 *
 * Both theme values are the real ones from globals.css. background_color is
 * the dark base because that is the page default before the pre-paint theme
 * script has run, so a splash cannot flash the wrong one.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${IDENTITY.fullName}, ${IDENTITY.title}`,
    short_name: IDENTITY.shortName,
    description: SEO.description,
    start_url: '/',
    display: 'browser',
    background_color: '#0a100d',
    theme_color: '#0a100d',
    lang: 'en',
    dir: 'ltr',
    categories: ['portfolio', 'technology'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 24x24 32x32 48x48 64x64 96x96 128x128 256x256',
        type: 'image/x-icon',
      },
    ],
  };
}
