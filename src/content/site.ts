/* ──────────────────────────────────────────────────────────────────
   ✏️  EDIT EVERYTHING HERE
   ──────────────────────────────────────────────────────────────────
   This single CONTENT object holds EVERY piece of text on the site.
   Change any value below and the page updates.

   Inline accent tags you can use inside titles / statements:
     <em>word</em>  → serif italic accent
     <i>word</i>    → lime colour
     <strong>word</strong> → emphasised cream (about paragraphs)

   This is the only file you normally need to touch.
─────────────────────────────────────────────────────────────────── */

export const CONTENT = {
  /* — basics — */
  name: 'Jassim M Kabir',
  logo: 'JK<span>.</span>', // shown top-left
  role: 'Web Developer',

  /* — SEO / browser tab — */
  seo: {
    title: 'Jassim M Kabir — Web Developer',
    description:
      'Jassim M Kabir is a web developer crafting fast, expressive interfaces and the systems behind them — from pixel-perfect storefronts to the database layer.',
    keywords: [
      'Jassim M Kabir',
      'Web Developer',
      'Front-end Developer',
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'GSAP',
      'Shopify Hydrogen',
      'UI Engineering',
    ],
    /* used for canonical + Open Graph URLs — change to your domain */
    url: 'https://jassimmkabir.dev',
    ogImage: '/og.png',
    twitterHandle: '@jassimmkabir',
    locale: 'en_US',
  },

  /* — preloader — */
  loaderName: 'Ja<em>ssim</em>', // <em> = serif lime accent

  /* — navigation links (label → section id) — */
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],

  /* — HERO — */
  hero: {
    available: 'Open for freelance — 2026',
    intro:
      'A web developer crafting fast, expressive interfaces and the systems behind them — from pixel-perfect storefronts to the database layer.',
    /* each line is its own row. <em>=serif italic, <i>=lime */
    titleLines: [
      'Building',
      '<em>digital</em>',
      '<i>experiences</i>',
      'that move.',
    ],
  },

  /* — MARQUEE strip (the rotating tech words) — */
  marquee: [
    'React',
    'TypeScript',
    'Next.js',
    'Tailwind',
    'Framer Motion',
    'Lenis',
    'SQL Server',
    'Node',
    'GSAP',
    'Shopify Hydrogen',
    'UI Engineering',
  ],

  /* — ABOUT — */
  about: {
    label: 'About',
    /* big statement — <em>=serif coral accent */
    big: 'I design and build for the web with an obsession for <em>motion</em>, performance and the small details that make an interface feel <em>alive</em>.',
    colA: [
      "I'm a web developer who lives at the intersection of design and engineering. By day I build and maintain a full ERP platform — wrangling SQL Server logic, pricing engines and schema tooling — and by craft I build premium storefronts with React, TypeScript and Tailwind.",
      'My happy place is the front of the front-end: smooth scroll, scroll-triggered reveals, magnetic interactions and the kind of polish you feel before you can name it.',
    ],
    colB: [
      "Whether it's a high-converting brand storefront or a complex internal tool, I care about the same things: <strong>clean architecture</strong>, <strong>buttery motion</strong>, and shipping things that actually hold up in production.",
    ],
    tags: [
      'Front-end',
      'UI Engineering',
      'Motion / GSAP',
      'SQL Server',
      'Shopify Hydrogen',
      'Design Systems',
    ],
  },

  /* — TERMINAL — a faux shell that types itself out on scroll.
     user@host shows in the prompt; each line is a command + its output. */
  terminal: {
    label: 'Terminal',
    heading: 'Run the <em>intro</em>',
    user: 'jassim',
    host: 'portfolio',
    dir: '~',
    lines: [
      {
        cmd: 'whoami',
        out: 'web developer · motion-obsessed · systems-minded',
      },
      {
        cmd: 'cat stack.json',
        out: '["react", "next.js", "typescript", "tailwind", "gsap", "node", "sql-server"]',
      },
      { cmd: 'ls ./focus', out: 'front-end/   motion/   e-commerce/   data/' },
      {
        cmd: 'git log --oneline -1',
        out: 'feat: ship things that hold up in production ✦',
      },
      {
        cmd: './say-hi --to you',
        out: "👋 thanks for scrolling — let's build something.",
      },
    ],
  },

  /* — SERVICES — */
  services: {
    heading: 'What I <em>do</em>',
    label: 'Services',
    items: [
      {
        title: 'Front-end Development',
        desc: 'React, TypeScript & Tailwind builds that are fast, accessible and pixel-honest.',
      },
      {
        title: 'Motion & Interaction',
        desc: 'Scroll-driven storytelling, micro-interactions and smooth-scroll experiences.',
      },
      {
        title: 'E-commerce / Hydrogen',
        desc: 'Premium Shopify Hydrogen storefronts engineered to convert.',
      },
      {
        title: 'Backend & Data',
        desc: 'SQL Server logic, pricing engines, schema tooling and APIs that hold up.',
      },
    ],
  },

  /* — WORK / PROJECTS —
     placeholder = the big outlined letters/word shown in the card.
     c1 / c2 = the two glow colours (any CSS colour). */
  work: {
    heading: 'Selected <em>work</em>',
    label: 'Work',
    projects: [
      {
        name: 'Zebia Storefront',
        placeholder: 'ZB',
        year: '2026',
        tags: ['Shopify Hydrogen', 'React Router', 'Framer Motion'],
        c1: '#22d3ee',
        c2: '#3b82f6',
        href: '#',
      },
      {
        name: 'INNSOF ERP',
        placeholder: 'ERP',
        year: '2025',
        tags: ['SQL Server', 'Pricing Engine', 'Tooling'],
        c1: '#7dd3fc',
        c2: '#22d3ee',
        href: '#',
      },
      {
        name: 'Schema Exporter',
        placeholder: 'DB',
        year: '2025',
        tags: ['Python', 'SQLAlchemy', 'CLI'],
        c1: '#3b82f6',
        c2: '#7dd3fc',
        href: '#',
      },
      {
        name: 'Your Next Build',
        placeholder: 'NEW',
        year: '2026',
        tags: ["Let's talk", 'Available'],
        c1: '#22d3ee',
        c2: '#7dd3fc',
        href: '#contact',
      },
    ],
  },

  /* — EXPERIENCE — vertical timeline (most recent first).
     period = the date range shown in mono; current:true adds a live dot. */
  experience: {
    label: 'Experience',
    heading: 'The <em>road</em> so far',
    items: [
      {
        period: '2024 — Now',
        role: 'Web Developer',
        company: 'INNSOF',
        location: 'Kerala, India',
        current: true,
        blurb:
          'Building and maintaining a full ERP platform end-to-end — SQL Server logic, pricing engines and schema tooling — while crafting the front-end with React, TypeScript and Tailwind.',
        tags: ['SQL Server', 'React', 'TypeScript', 'Tooling'],
      },
      {
        period: '2023 — 2024',
        role: 'Front-end Developer',
        company: 'Freelance / Contract',
        location: 'Remote',
        current: false,
        blurb:
          'Designed and shipped premium brand storefronts on Shopify Hydrogen — motion-rich, accessible and tuned to convert, with smooth-scroll and scroll-driven storytelling.',
        tags: ['Shopify Hydrogen', 'Framer Motion', 'GSAP'],
      },
      {
        period: '2022 — 2023',
        role: 'Junior Web Developer',
        company: 'Early days',
        location: 'Kerala, India',
        current: false,
        blurb:
          'Cut my teeth turning designs into pixel-honest, responsive interfaces and learned to care about the details that make a UI feel alive.',
        tags: ['JavaScript', 'CSS', 'UI'],
      },
    ],
  },

  /* — STATS — (suffix renders in serif italic) — */
  stats: {
    label: 'By the numbers',
    items: [
      { value: 5, suffix: '+', label: 'Years building for the web' },
      { value: 40, suffix: '+', label: 'Projects shipped to production' },
      { value: 99, suffix: '', label: 'Lighthouse scores chased relentlessly' },
      { value: 100, suffix: '%', label: 'Commitment to the details' },
    ],
  },

  /* — CONTACT — */
  contact: {
    label: 'Contact',
    pre: 'Got something in mind?',
    email: 'jassimmkabir@gmail.com',
    socials: [
      { label: 'GitHub', href: 'https://github.com/Jassimkabir' },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/waleed-jassim-m-k/',
      },
      { label: 'Instagram', href: 'https://www.instagram.com/jassim.m.kabir' },
      { label: 'Email', href: 'mailto:jassimmkabir@gmail.com' },
    ],
  },

  /* — FOOTER — */
  footer: {
    left: 'Designed & built by <b>Jassim M Kabir</b>',
    center: 'Kerala, India — © 2026',
  },
} as const;

export type SiteContent = typeof CONTENT;
