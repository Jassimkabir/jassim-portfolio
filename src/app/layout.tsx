import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';

import { IDENTITY, SEO } from '@/content/site';
import { structuredData } from '@/lib/structured-data';
import SmoothScroll from '@/components/SmoothScroll';
import Grain from '@/components/ui/Grain';
import Cursor from '@/components/ui/Cursor';
import './globals.css';

/**
 * Display face. The width axis is an animation target, not a static setting,
 * which is why `wdth` is requested here. `wght` is included by default and
 * must not appear in `axes` or the build fails.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['opsz', 'wdth'],
  variable: '--font-bricolage',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO.url),
  title: {
    default: SEO.title,
    template: `%s, ${IDENTITY.shortName}`,
  },
  description: SEO.description,
  applicationName: `${IDENTITY.shortName}, ${IDENTITY.title}`,
  authors: [{ name: IDENTITY.fullName, url: SEO.url }],
  creator: IDENTITY.fullName,
  publisher: IDENTITY.fullName,
  category: 'technology',
  /* Send the full URL on same-origin navigations and only the origin when
     leaving, which is the default most analytics expect without leaking the
     visitor's path to the four social profiles this page links out to. */
  referrer: 'origin-when-cross-origin',
  /* Safari turns bare digit strings into tel: links on its own. The page has
     one phone number and it is behind a real tel: anchor already, so every
     other number here is a metric and must be left alone. */
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SEO.locale,
    url: SEO.url,
    siteName: `${IDENTITY.shortName}, ${IDENTITY.title}`,
    title: SEO.title,
    description: SEO.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      /* Large image previews, unlimited snippet length. The defaults truncate
         both, and for a single page whose whole job is to be read in a result
         there is nothing here worth withholding. */
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  /* Matches --bg in each theme. */
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a100d' },
    { media: '(prefers-color-scheme: light)', color: '#d6d5c9' },
  ],
  /* Both themes are real and switchable, so the UA is told so rather than
     being left to guess from the background colour. */
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};


/**
 * Resolves the theme before first paint so there is no flash of the wrong one.
 * Stored choice wins; otherwise the system preference is honoured; otherwise
 * dark, which is the page default.
 */
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');if(s==='light'||s==='dark'){document.documentElement.dataset.theme=s;return}document.documentElement.dataset.theme=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
        <Cursor />
        <Grain />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
