import type { Metadata, Viewport } from 'next';
import { Onest } from 'next/font/google';
import { SEO, SITE, SOCIALS } from '@/content/site';
import './globals.css';

/* Onest ships as a variable font, so one file covers 400–700. */
const onest = Onest({
  subsets: ['latin'],
  variable: '--font-onest',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SEO.title,
    template: `%s — ${SITE.name}`,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SEO.locale,
    url: SITE.url,
    siteName: `${SITE.name} — ${SITE.role}`,
    title: SEO.title,
    description: SEO.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
    creator: SEO.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: SEO.themeColor,
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  url: SITE.url,
  jobTitle: 'Front-End Engineer',
  email: `mailto:${SITE.email}`,
  description: SEO.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kerala',
    addressCountry: 'IN',
  },
  knowsAbout: [...SEO.keywords],
  sameAs: [SOCIALS.github, SOCIALS.linkedin, SOCIALS.instagram],
};

/* Adaptive grid: CSS media queries handle every width up to 1920px;
   above that the root font-size is scaled up here, damped by `coef`.
   Runs before paint so wide screens never flash at the wrong scale. */
const adaptiveGrid = `(function(){
var FONT_BASE=16,baseWidth=1920,coef=0.6666;
function apply(){
var w=window.innerWidth;
var widthReduction=((baseWidth-w)/baseWidth)*100;
var size=FONT_BASE-(FONT_BASE*(widthReduction*coef))/100;
if(size>FONT_BASE){document.documentElement.style.fontSize=size+'px';}
else{document.documentElement.style.removeProperty('font-size');}
}
apply();window.addEventListener('resize',apply);
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={onest.variable}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: adaptiveGrid }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
