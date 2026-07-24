/* ──────────────────────────────────────────────────────────────────
   ✏️  EDIT EVERYTHING HERE — THE JASSIM TIMES
   ──────────────────────────────────────────────────────────────────
   This single CONTENT object holds EVERY piece of copy in the paper.
   Change any value below and the broadsheet re-sets itself.

   Inline accent tags you can use inside headlines / prose:
     <em>word</em>   → italic serif accent
     <i>word</i>     → red "extra!" ink
     <strong>word</strong> → bold black ink
─────────────────────────────────────────────────────────────────── */

export const CONTENT = {
  /* — basics — */
  name: 'Jassim M Kabir',
  role: 'Web Developer',

  /* — MASTHEAD / NAMEPLATE — the paper itself — */
  paper: {
    title: 'The Jassim Times', // set in Chomsky blackletter
    slogan: 'All the Code That’s Fit to Ship',
    established: 'Est. 2019',
    edition: 'Morning Edition',
    volume: 'Vol. VI',
    issue: 'No. 2,048',
    price: 'Price: One Clever Idea',
    city: 'Kerala, India',
    /* the folio bar reads like a real broadsheet dateline */
    weather: 'Weather: Clear skies, 100% uptime, light drizzle of ideas.',
  },

  /* — SEO / browser tab — */
  seo: {
    title: 'The Jassim Times — Jassim M Kabir, Web Developer',
    description:
      'The Jassim Times — a digital broadsheet by Jassim M Kabir, a web developer crafting fast, expressive interfaces and the systems behind them, from pixel-perfect storefronts to the database layer.',
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
    url: 'https://jassimmkabir.dev',
    ogImage: '/og.png',
    twitterHandle: '@jassimmkabir',
    locale: 'en_US',
  },

  /* — preloader / press — */
  loaderName: 'The Jassim Times',
  loaderNote: 'Running the presses',

  /* — SECTIONS INDEX (nav) — label → section id — */
  nav: [
    { label: 'Front Page', href: '#front-page', page: 'A1' },
    { label: 'Editorial', href: '#editorial', page: 'A4' },
    { label: 'Dispatches', href: '#dispatches', page: 'B1' },
    { label: 'Classifieds', href: '#classifieds', page: 'C7' },
    { label: 'Correspondence', href: '#correspondence', page: 'D2' },
  ],

  /* — FRONT PAGE / LEAD STORY (hero) — */
  lead: {
    kicker: 'Lead Story · Front Page',
    // each fragment is its own headline line. <em>=italic, <i>=red
    headlineLines: ['Developer Builds', '<em>Digital</em> Worlds', 'That <i>Move</i>'],
    deck:
      'Local craftsman marries design and engineering to ship interfaces that feel alive — “buttery motion and clean architecture,” sources confirm.',
    byline: 'By Jassim M Kabir',
    dateline: 'KERALA —',
    lead:
      'A web developer working at the intersection of design and engineering was reported today building fast, expressive interfaces and the systems behind them — from pixel-perfect storefronts to the database layer.',
    body: [
      'By day he builds and maintains a full ERP platform, wrangling SQL Server logic, pricing engines and schema tooling. By craft he ships premium storefronts in React, TypeScript and Tailwind.',
      'Witnesses describe an obsession with the “front of the front-end”: smooth scroll, scroll-triggered reveals, magnetic interactions and polish you feel before you can name it.',
    ],
    continued: 'Continued on the Editorial page →',
    stamp: 'Open for Freelance — 2026',
  },

  /* — STOP-PRESS TICKER (marquee) — reads like a breaking-news crawl — */
  ticker: {
    label: 'Stop Press',
    items: [
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
  },

  /* — THE EDITORIAL (about) — opinion column from the editor — */
  editorial: {
    kicker: 'Opinion',
    page: 'A4',
    label: 'The Editorial',
    heading: 'From the <em>Editor’s</em> Desk',
    lede:
      'I design and build for the web with an obsession for <em>motion</em>, performance and the small details that make an interface feel <em>alive</em>.',
    columns: [
      "I'm a web developer who lives at the intersection of design and engineering. By day I build and maintain a full ERP platform — wrangling SQL Server logic, pricing engines and schema tooling — and by craft I build premium storefronts with React, TypeScript and Tailwind.",
      'My happy place is the front of the front-end: smooth scroll, scroll-triggered reveals, magnetic interactions and the kind of polish you feel before you can name it.',
      "Whether it's a high-converting brand storefront or a complex internal tool, I care about the same things: clean architecture, buttery motion, and shipping things that actually hold up in production.",
    ],
    signature: 'Jassim M Kabir, Editor-in-Chief',
    tags: [
      'Front-end',
      'UI Engineering',
      'Motion / GSAP',
      'SQL Server',
      'Shopify Hydrogen',
      'Design Systems',
    ],
  },

  /* — THE WIRE (terminal) — a teletype dispatch that prints on scroll — */
  wire: {
    kicker: 'Via the Wire',
    page: 'A2',
    label: 'The Newsroom Wire',
    heading: 'Incoming <em>dispatch</em>',
    machine: 'TELETYPE MODEL 15 · NEWSROOM',
    lines: [
      { cmd: 'WHOIS SENDER', out: 'web developer · motion-obsessed · systems-minded' },
      {
        cmd: 'LIST STACK',
        out: 'react · next.js · typescript · tailwind · gsap · node · sql-server',
      },
      { cmd: 'LIST BEATS', out: 'front-end / motion / e-commerce / data' },
      { cmd: 'LATEST FILING', out: 'feat: ship things that hold up in production' },
      { cmd: 'MESSAGE READER', out: 'Thanks for scrolling — let us build something. END.' },
    ],
  },

  /* — SERVICES OFFERED (services) — a display advert / directory — */
  services: {
    kicker: 'Advertisement',
    page: 'A6',
    label: 'Services Offered',
    heading: 'Now <em>Booking</em> Commissions',
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
    terms: 'Enquiries welcomed daily · No job too pixel-perfect · Satisfaction, engineered.',
  },

  /* — FEATURED DISPATCHES (work) — projects as front-page stories — */
  dispatches: {
    kicker: 'The Gallery',
    page: 'B1',
    label: 'Featured Dispatches',
    heading: 'Selected <em>Work</em>, Filed & Shipped',
    projects: [
      {
        name: 'Zebia Storefront',
        headline: 'Storefront Converts Browsers Into Believers',
        deck: 'A motion-rich Hydrogen build tuned to sell.',
        placeholder: 'ZB',
        year: '2026',
        beat: 'E-COMMERCE',
        tags: ['Shopify Hydrogen', 'React Router', 'Framer Motion'],
        href: '#',
      },
      {
        name: 'INNSOF ERP',
        headline: 'Internal Platform Tames a Sprawling Business',
        deck: 'Pricing engines and schema tooling, all in one system.',
        placeholder: 'ERP',
        year: '2025',
        beat: 'SYSTEMS',
        tags: ['SQL Server', 'Pricing Engine', 'Tooling'],
        href: '#',
      },
      {
        name: 'Schema Exporter',
        headline: 'Little CLI Exports Databases Without Complaint',
        deck: 'A quiet workhorse for keeping schemas honest.',
        placeholder: 'DB',
        year: '2025',
        beat: 'DATA',
        tags: ['Python', 'SQLAlchemy', 'CLI'],
        href: '#',
      },
      {
        name: 'Your Next Build',
        headline: 'This Space Reserved For Your Story',
        deck: 'A commission awaits an ambitious editor.',
        placeholder: 'NEW',
        year: '2026',
        beat: 'OPEN',
        tags: ['Let’s talk', 'Available'],
        href: '#correspondence',
      },
    ],
    continued: 'Full portfolio continued on request →',
  },

  /* — ON THIS DAY (experience) — career as an historical record — */
  chronicle: {
    kicker: 'The Record',
    page: 'B4',
    label: 'On This Day',
    heading: 'A Brief <em>History</em> of the Byline',
    items: [
      {
        period: '2024 — Present',
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
        company: 'Early Days',
        location: 'Kerala, India',
        current: false,
        blurb:
          'Cut his teeth turning designs into pixel-honest, responsive interfaces and learned to care about the details that make a UI feel alive.',
        tags: ['JavaScript', 'CSS', 'UI'],
      },
    ],
  },

  /* — BY THE NUMBERS (stats) — an infographic box — */
  numbers: {
    kicker: 'Almanac',
    page: 'B6',
    label: 'By the Numbers',
    heading: 'The Year in <em>Figures</em>',
    items: [
      { value: 5, suffix: '+', label: 'Years building for the web' },
      { value: 40, suffix: '+', label: 'Projects shipped to production' },
      { value: 99, suffix: '', label: 'Lighthouse scores chased relentlessly' },
      { value: 100, suffix: '%', label: 'Commitment to the details' },
    ],
  },

  /* — THE CLASSIFIEDS (new) — tiny ads; one hides a secret link — */
  classifieds: {
    kicker: 'The Back Pages',
    page: 'C7',
    label: 'Classifieds',
    heading: 'Small Ads, <em>Big</em> Ideas',
    note: 'To place an advertisement, write to the Correspondence desk. Cash only. No refunds.',
    ads: [
      {
        cat: 'For Hire',
        title: 'ONE (1) DEVELOPER',
        body: 'Motion-obsessed, systems-minded. Ships on time. Owns a very nice easing curve. References available.',
      },
      {
        cat: 'Wanted',
        title: 'INTERESTING PROBLEMS',
        body: 'Gently used or brand-new. Will trade clean code, good taste and buttery scroll. Enquire within.',
      },
      {
        cat: 'Lost & Found',
        title: 'FOUND: A SEMICOLON',
        body: 'Discovered loitering at the end of a line. Owner may claim it at the newsroom wire. ;',
      },
      {
        cat: 'Personals',
        title: 'SWF: STATE MGMT',
        body: 'Single function seeks composable partner for long-term re-renders. Must love hooks. No prop-drilling.',
        // the secret! a hidden link lives on the underlined word below
        secret: { word: 'hooks', href: 'https://github.com/Jassimkabir' },
      },
      {
        cat: 'Notice',
        title: 'PUBLIC APOLOGY',
        body: 'The management regrets any bugs experienced during the last release. They have been sentenced to a code review.',
      },
      {
        cat: 'For Sale',
        title: 'PIXEL, SLIGHTLY USED',
        body: 'Perfect alignment guaranteed. Comes with a matching baseline grid and a lifetime of kerning opinions.',
      },
    ],
    /* console/keyboard breadcrumb for the crossword easter egg */
    hint: 'Psst — a crossword is hidden in these pages. Press “X” to unfold it.',
  },

  /* — THE CROSSWORD (new · easter egg) — a tiny 5×5 interactive puzzle — */
  crossword: {
    kicker: 'The Puzzle Page',
    page: 'C9',
    label: 'The Daily Crossword',
    subtitle: 'A five-by-five diversion for the developer at leisure. Set by the Editor.',
    // solution grid: a letter, or null for a black square
    solution: [
      ['R', 'E', 'A', 'C', 'T'],
      ['A', null, 'R', null, 'H'],
      ['M', 'E', 'R', 'G', 'E'],
      ['P', null, 'A', null, 'M'],
      ['S', 'T', 'Y', 'L', 'E'],
    ],
    across: [
      { n: 1, clue: 'UI library that kicked off a hooks revolution (5)' },
      { n: 4, clue: 'To combine branches, or accept a pull request (5)' },
      { n: 5, clue: 'What CSS lets you do to your markup (5)' },
    ],
    down: [
      { n: 1, clue: 'Gentle inclines; a slow feature roll-“___ up” (5)' },
      { n: 2, clue: 'An ordered, zero-indexed list of values (5)' },
      { n: 3, clue: 'A design system’s palette, or a WordPress skin (5)' },
    ],
    win: 'EXTRA! EXTRA! You solved it — the Editor is impressed.',
  },

  /* — CORRESPONDENCE (contact) — letters to the editor — */
  correspondence: {
    kicker: 'Have Your Say',
    page: 'D2',
    label: 'Correspondence',
    heading: 'Write to the <em>Editor</em>',
    pre: 'Have a story, a commission, or simply a kind word?',
    email: 'jassimmkabir@gmail.com',
    cta: 'Address all letters to',
    socials: [
      { label: 'GitHub', href: 'https://github.com/Jassimkabir' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/waleed-jassim-m-k/' },
      { label: 'Instagram', href: 'https://www.instagram.com/jassim.m.kabir' },
      { label: 'Telegraph', href: 'mailto:jassimmkabir@gmail.com' },
    ],
  },

  /* — COLOPHON (footer) — printing credits — */
  colophon: {
    left: 'Written, set & printed by <b>Jassim M Kabir</b>',
    center: 'Kerala, India — © 2026 The Jassim Times',
    note: 'Composed in Chomsky, Playfair Display & Merriweather. Pressed with Next.js, GSAP & Lenis. No trees were harmed.',
  },
} as const;

export type SiteContent = typeof CONTENT;
