/* ──────────────────────────────────────────────────────────────────
   ✏️  EDIT EVERYTHING HERE
   Every string on the page lives in this file. Sections read from it,
   so changing a value here updates the site.
─────────────────────────────────────────────────────────────────── */

export const SITE = {
  name: 'Jassim M Kabir',
  firstName: 'Jassim',
  role: 'Front-End Engineer',
  locationShort: 'Kerala, IN',
  location: 'Kerala, India',
  email: 'jassimmkabir@gmail.com',
  url: 'https://jassimmkabir.dev',
  resume: '/jassim-m-kabir-resume.pdf',
  watermark: 'JASSIM',
  timeZone: 'Asia/Kolkata',
} as const;

export const SEO = {
  title: 'Jassim M Kabir — Front-End & Full-Stack Engineer',
  description:
    'I build fast, considered interfaces and the systems behind them — React, TypeScript, Next.js, and everything that makes them ship.',
  themeColor: '#0a0a0a',
  locale: 'en_US',
  twitterHandle: '@jassimmkabir',
  keywords: [
    'Jassim M Kabir',
    'Front-End Engineer',
    'Full-Stack Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'GSAP',
    'Shopify Hydrogen',
    'UI Engineering',
  ],
} as const;

export const SOCIALS = {
  github: 'https://github.com/Jassimkabir',
  linkedin: 'https://www.linkedin.com/in/waleed-jassim-m-k/',
  instagram: 'https://www.instagram.com/jassim.m.kabir',
} as const;

/* — header / nav — “modal: true” opens the contact modal instead of scrolling — */
export const NAV = [
  { label: 'Home', target: 'home' },
  { label: 'Work', target: 'work' },
  { label: 'Services', target: 'services', caret: true },
  { label: 'About', target: 'about' },
  { label: 'Experience', target: 'experience' },
  { label: 'Contact', target: 'contact', modal: true },
] as const;

/* — loader — */
export const LOADER = {
  tagline: 'Front-end engineer. Full-stack when it helps.',
  label: 'Loading',
} as const;

/* — hero — */
export const HERO = {
  eyebrow: 'Front-end engineer · Kerala, IN',
  /* one array entry per rendered line */
  headline: ['Interfaces that', 'feel fast,', 'built to last'],
  proof: '4+ years shipping production front-ends',
  ctaPrimary: "Let's talk",
  ctaSecondary: 'See the work',
  cards: [
    { caption: 'Front-end', title: 'React & Next.js, typed end to end.' },
    { caption: 'Motion', title: 'GSAP and Lenis, tuned by hand.' },
    { caption: 'Full-stack', title: 'Node, SQL Server, Shopify Hydrogen.' },
  ],
  stackLabel: 'Working with',
  stack: [
    'React',
    'TypeScript',
    'Next.js',
    'Tailwind',
    'GSAP',
    'Node',
    'SQL Server',
    'Hydrogen',
  ],
  status: {
    left: 'Building since 2022',
    center: 'Remote · working worldwide',
    right: 'Scroll to explore',
  },
  /* Base layer is always visible; the reveal layer is painted under the
     cursor. Both frames must share a crop and aspect ratio or the
     reveal will slide against the base. Set `reveal` to null to fall
     back to the generated dark code plate (see lib/heroPlate.ts). */
  base: '/assets/hero/me.webp',
  reveal: '/assets/hero/mecha.webp' as string | null,
  alt: 'Jassim M Kabir, smiling, in a dark green hoodie',
} as const;

/* — marquee — */
export const MARQUEE = [
  'Front-end engineering',
  'Design systems',
  'Motion & interaction',
  'Next.js at scale',
  'API & data layer',
  'Performance budgets',
  'Shopify Hydrogen',
] as const;

/* — about — */
export const ABOUT = {
  eyebrow: 'About',
  based: 'Based in Kerala, India — working with teams across time zones.',
  statementLead:
    'I build front-ends for teams who care about the details — ',
  statementMuted:
    'typed React and Next.js on the surface, a considered data layer underneath, and motion that earns its place.',
  socialsLabel: 'Find me online',
  cta: 'Download CV',
} as const;

/* — terminal — “cmd” lines get the ➜ ~ prompt, “out” lines are output — */
export type TerminalLine = { kind: 'cmd' | 'out' | 'gap'; text: string };

export const TERMINAL = {
  title: 'jassim@portfolio — zsh',
  lines: [
    { kind: 'cmd', text: 'whoami' },
    { kind: 'out', text: 'Jassim M Kabir — front-end engineer, sometimes full-stack.' },
    { kind: 'gap', text: '' },
    { kind: 'cmd', text: 'cat stack.json' },
    { kind: 'out', text: '{' },
    { kind: 'out', text: '  "core":      ["React", "TypeScript", "Next.js"],' },
    { kind: 'out', text: '  "styling":   ["Tailwind", "CSS Modules", "design tokens"],' },
    { kind: 'out', text: '  "motion":    ["GSAP", "ScrollTrigger", "Lenis"],' },
    { kind: 'out', text: '  "backend":   ["Node", "SQL Server", "REST"],' },
    { kind: 'out', text: '  "commerce":  ["Shopify Hydrogen", "Storefront API"]' },
    { kind: 'out', text: '}' },
    { kind: 'gap', text: '' },
    { kind: 'cmd', text: './availability --next' },
    { kind: 'out', text: 'open for freelance and full-time roles' },
  ] as TerminalLine[],
  exit: 'Exit code 0',
  copy: 'Copy email',
  copied: 'Copied',
} as const;

/* — services — */
export const SERVICES = {
  eyebrow: 'Services',
  heading: 'What I do best',
  items: [
    {
      title: 'Front-End Engineering',
      desc: 'Production React and Next.js — typed, accessible, and fast.',
    },
    {
      title: 'Design Systems & UI',
      desc: 'Component libraries and tokens that stay consistent as the product grows.',
    },
    {
      title: 'Motion & Interaction',
      desc: 'Scroll, transitions, and micro-interaction built with GSAP and Lenis.',
    },
    {
      title: 'Full-Stack & Commerce',
      desc: 'Node APIs, SQL Server data layers, and Shopify Hydrogen storefronts.',
    },
  ],
} as const;

/* — work — exactly four, for the 2×2 grid — */
export const WORK = {
  eyebrow: 'Selected work',
  heading: "Things I've shipped",
  cta: 'See all projects',
  ctaHref: SOCIALS.github,
  projects: [
    {
      name: 'Zebia Storefront',
      type: 'E-commerce',
      year: '2026',
      summary:
        'A premium Shopify Hydrogen storefront — motion-rich, accessible, and tuned to convert on mobile first.',
      tags: ['Shopify Hydrogen', 'Storefront API', 'GSAP'],
      href: SOCIALS.github,
    },
    {
      name: 'INNSOF ERP',
      type: 'Product',
      year: '2025',
      summary:
        'A full ERP platform end to end — pricing engine, SQL Server logic, and the typed React front-end on top of it.',
      tags: ['React', 'Node', 'SQL Server'],
      href: SOCIALS.github,
    },
    {
      name: 'Schema Exporter',
      type: 'Developer Tool',
      year: '2025',
      summary:
        'A CLI that snapshots SQL Server schemas and diffs them between environments, so migrations stop being guesswork.',
      tags: ['Python', 'SQLAlchemy', 'CLI'],
      href: SOCIALS.github,
    },
    {
      name: 'This Portfolio',
      type: 'Experiment',
      year: '2026',
      summary:
        'A liquid cursor reveal painted on canvas, driven by GSAP and Lenis on an adaptive rem grid.',
      tags: ['GSAP', 'Canvas', 'Lenis'],
      href: SOCIALS.github,
    },
  ],
} as const;

/* — experience — most recent first — */
export const EXPERIENCE = {
  eyebrow: 'Experience',
  heading: "Where I've been building",
  items: [
    {
      period: '2024 — Present',
      role: 'Web Developer',
      company: 'INNSOF',
      summary:
        'Own a full ERP platform end to end — SQL Server logic, pricing engines, and schema tooling — while building the front-end in React, TypeScript, and Tailwind.',
      tags: ['React', 'TypeScript', 'SQL Server', 'Tooling'],
    },
    {
      period: '2023 — 2024',
      role: 'Front-End Developer',
      company: 'Freelance / Contract',
      summary:
        'Designed and shipped premium brand storefronts on Shopify Hydrogen — scroll-driven storytelling, smooth scroll, and accessible motion tuned to convert.',
      tags: ['Shopify Hydrogen', 'GSAP', 'Lenis'],
    },
    {
      period: '2022 — 2023',
      role: 'Junior Web Developer',
      company: 'Early days',
      summary:
        'Turned designs into pixel-honest, responsive interfaces and learned to care about the details that make a UI feel alive.',
      tags: ['JavaScript', 'CSS', 'UI'],
    },
  ],
} as const;

/* — stats — */
export const STATS = {
  eyebrow: 'By the numbers',
  heading: 'Measured in shipped work, not job titles.',
  items: [
    { value: 4, suffix: '+', label: 'Years of experience' },
    { value: 30, suffix: '+', label: 'Projects shipped' },
    { value: 99, suffix: '', label: 'Lighthouse performance' },
    { value: 12, suffix: '', label: 'Production stacks' },
  ],
} as const;

/* — contact — */
export const CONTACT = {
  eyebrow: 'Contact',
  heading: ["Have something in mind?", "Let's build it."],
  body: "Freelance projects, contract work, or a full-time role — tell me what you're building and I'll reply within a day.",
  ctaPrimary: 'Send a message',
  ctaSecondary: 'Email me directly',
  replies: 'Replies within 24h',
} as const;

/* — modal — */
export const MODAL = {
  eyebrow: 'Start a project',
  heading: "Tell me what you're building.",
  note: 'I reply within one business day.',
  submit: 'Send message',
  sending: 'Sending…',
  successTitle: 'Message received',
  successBody:
    "Thanks for reaching out — I'll get back to you within one business day.",
} as const;

/* — footer — */
export const FOOTER = {
  heading: ['Available for work.', "Let's start."],
  cta: 'Start a project',
  blurb:
    'Front-end engineer building fast, considered interfaces — and the systems behind them.',
  columns: [
    {
      title: 'Navigate',
      links: [
        { label: 'Home', target: 'home' },
        { label: 'Work', target: 'work' },
        { label: 'Services', target: 'services' },
        { label: 'About', target: 'about' },
        { label: 'Experience', target: 'experience' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Front-End Engineering', target: 'services' },
        { label: 'Design Systems', target: 'services' },
        { label: 'Motion & Interaction', target: 'services' },
        { label: 'Full-Stack & Commerce', target: 'services' },
      ],
    },
  ],
  elsewhere: [
    { label: 'GitHub', href: SOCIALS.github },
    { label: 'LinkedIn', href: SOCIALS.linkedin },
    { label: 'Instagram', href: SOCIALS.instagram },
    { label: 'Email', href: `mailto:${SITE.email}` },
    { label: 'Resume', href: SITE.resume },
  ],
  copyright: `© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.`,
  legal: [
    { label: 'Built with Next.js & GSAP', href: 'https://nextjs.org' },
    { label: 'Colophon', href: 'https://gsap.com' },
  ],
} as const;
