import type { Metadata, Viewport } from "next";
import { GeistPixelSquare, GeistPixelGrid } from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { VT323, Press_Start_2P } from "next/font/google";
import { CONTENT } from "@/content/site";
import "./globals.css";

/* ── Type system ──────────────────────────────────────────────────
   Display voice  → Geist Pixel Square  (headlines, numbers, logo)
   Accent texture → Geist Pixel Grid    (the <em> highlight words)
   System voice   → Geist Mono          (labels, nav, tags)
   Reading voice  → Geist Sans          (paragraphs / prose)
   CRT voice      → VT323               (terminal, BIOS, readouts)
   Arcade voice   → Press Start 2P      (game HUD, coin/score badges) */
const crt = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-crt",
  display: "swap",
});
const arcade = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-arcade",
  display: "swap",
});

const fontVars = [
  GeistPixelSquare.variable, // --font-geist-pixel-square
  GeistPixelGrid.variable, // --font-geist-pixel-grid
  GeistSans.variable, // --font-geist-sans
  GeistMono.variable, // --font-geist-mono
  crt.variable, // --font-crt
  arcade.variable, // --font-arcade
].join(" ");

const { seo, name, role } = CONTENT;

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: {
    default: seo.title,
    template: `%s — ${name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name, url: seo.url }],
  creator: name,
  publisher: name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: seo.url,
    siteName: `${name} — ${role}`,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    creator: seo.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name,
  url: seo.url,
  jobTitle: role,
  email: `mailto:${CONTENT.contact.email}`,
  description: seo.description,
  knowsAbout: [...seo.keywords],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={fontVars}
    >
      <body>
        {/* set theme before paint to avoid a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
