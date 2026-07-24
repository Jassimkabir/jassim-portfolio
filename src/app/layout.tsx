import type { Metadata, Viewport } from "next";
import { Playfair_Display, Merriweather, Oswald, Special_Elite } from "next/font/google";
import localFont from "next/font/local";
import { CONTENT } from "@/content/site";
import "./globals.css";

/* Chomsky — the blackletter nameplate (SIL OFL, self-hosted) */
const masthead = localFont({
  src: "./fonts/Chomsky.woff2",
  variable: "--font-masthead",
  display: "swap",
});

/* Playfair Display — high-contrast headline serif */
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

/* Merriweather — the readable body serif */
const body = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

/* Oswald — condensed gothic for kickers / labels / rules */
const gothic = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gothic",
  display: "swap",
});

/* Special Elite — typewriter for the wire, captions & classifieds */
const type = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-type",
  display: "swap",
});

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
  themeColor: "#efe4cf",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name,
  url: seo.url,
  jobTitle: role,
  email: `mailto:${CONTENT.correspondence.email}`,
  description: seo.description,
  knowsAbout: [...seo.keywords],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="day"
      suppressHydrationWarning
      className={`${masthead.variable} ${display.variable} ${body.variable} ${gothic.variable} ${type.variable}`}
    >
      <body>
        {/* set theme before paint to avoid a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='day'||t==='night'){document.documentElement.dataset.theme=t;}}catch(e){}})();`,
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
