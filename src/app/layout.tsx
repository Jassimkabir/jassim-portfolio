import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';

import { IDENTITY, SEO } from '@/content/site';
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
  authors: [{ name: IDENTITY.fullName, url: SEO.url }],
  creator: IDENTITY.fullName,
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
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  /* Matches --bg in each theme. */
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a100d' },
    { media: '(prefers-color-scheme: light)', color: '#d6d5c9' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: IDENTITY.fullName,
  alternateName: IDENTITY.shortName,
  url: SEO.url,
  jobTitle: IDENTITY.title,
  email: `mailto:${IDENTITY.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Palakkad', addressRegion: 'Kerala', addressCountry: 'IN' },
  sameAs: [
    IDENTITY.github.url,
    IDENTITY.linkedin.url,
    IDENTITY.instagram.url,
    IDENTITY.facebook.url,
  ],
  description: SEO.description,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
