/* ──────────────────────────────────────────────────────────────────
   ✏️  EDIT EVERYTHING HERE — THE JASSIM TIMES
   ──────────────────────────────────────────────────────────────────
   A vintage developer broadsheet. This single CONTENT object holds
   EVERY piece of copy in the paper. Change any value and the page resets.

   Inline accent tags you can use inside headlines / prose:
     <em>word</em>   → italic serif accent
     <i>word</i>     → red "extra!" ink
     <strong>word</strong> → bold black ink
     <code>word</code> → monospace inline code
─────────────────────────────────────────────────────────────────── */

export const CONTENT = {
  /* — basics — */
  name: 'Jassim M Kabir',
  role: 'Web Developer',

  /* — MASTHEAD / NAMEPLATE — the paper itself — */
  paper: {
    title: 'The Jassim Times', // set in Chomsky blackletter
    descriptor: 'The Web Development, UI/UX & Software Engineering Broadsheet',
    slogan: 'All the Code That’s Fit to Ship',
    established: 'Est. 2019',
    edition: 'Morning Edition',
    volume: 'Vol. VI',
    issue: 'No. 2,048',
    price: 'Price: One Clever Idea',
    city: 'Kerala, India',
    weather: 'Weather: Clear skies, 100% uptime, light drizzle of ideas.',
  },

  /* — SEO / browser tab — */
  seo: {
    title: 'The Jassim Times — Jassim M Kabir, Web Developer',
    description:
      'The Jassim Times — a developer broadsheet by Jassim M Kabir, a web developer crafting fast, expressive interfaces and the systems behind them: React, Next.js, TypeScript, Tailwind and the database layer.',
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
  loaderNote: 'Compiling the edition',

  /* — SECTIONS INDEX (nav) — label → section id — */
  nav: [
    { label: 'Front Page', href: '#front-page', page: 'A1' },
    { label: 'Features', href: '#features', page: 'B1' },
    { label: 'Tech Desk', href: '#stack', page: 'B6' },
    { label: 'Classifieds', href: '#classifieds', page: 'C7' },
    { label: 'Terminal', href: '#terminal', page: 'C9' },
  ],

  /* — FRONT PAGE / LEAD STORY (hero) — */
  lead: {
    kicker: 'Lead Story · Front Page',
    // each fragment is its own headline line. <em>=italic, <i>=red
    headlineLines: ['Developer Ships', '<em>Interfaces</em>', 'That <i>Move</i>'],
    deck:
      'Kerala-based engineer marries design and systems to build fast, expressive web apps — “buttery motion and clean architecture,” colleagues confirm.',
    byline: 'By Jassim M Kabir',
    role: 'Web Developer @ INNSOF',
    dateline: 'KERALA —',
    lead:
      'A web developer working at the intersection of design and engineering was reported today building fast, expressive interfaces and the systems behind them — from pixel-perfect storefronts to the database layer.',
    body: [
      'By day he builds and maintains a full ERP platform in <code>SQL Server</code>, wrangling pricing engines and schema tooling. By craft he ships premium storefronts in <code>React</code>, <code>TypeScript</code> and <code>Tailwind</code>.',
      'Witnesses describe an obsession with the “front of the front-end”: smooth scroll, scroll-triggered reveals, magnetic interactions and polish you feel before you can name it.',
    ],
    continued: 'Continued in Features, page B1 →',
    stamp: 'Available for Freelance — 2026',
  },

  /* — BREAKING NEWS TICKER — reads like a live commit / status feed — */
  breaking: {
    label: 'Breaking',
    items: [
      'feat: shipped a motion-rich Hydrogen storefront',
      '● Status: available for freelance — Q3 2026',
      'fix: squashed a nasty hydration mismatch',
      'perf: Lighthouse back to 99 after image audit',
      'chore: refactored the pricing engine (−1.2k LOC)',
      '● Now reading: the React compiler RFCs',
      'style: migrated a design system to CSS tokens',
      'test: 0 flaky specs, and it stays that way',
    ],
  },

  /* — THE EDITORIAL (about) — opinion column from the editor — */
  editorial: {
    kicker: 'Opinion',
    page: 'A4',
    label: 'The Editorial',
    heading: 'From the <em>Editor’s</em> Desk',
    lede:
      'I build for the web with an obsession for <em>motion</em>, performance and the small details that make an interface feel <em>alive</em>.',
    columns: [
      "I'm a web developer who lives at the intersection of design and engineering. By day I build and maintain a full ERP platform — wrangling SQL Server logic, pricing engines and schema tooling — and by craft I build premium storefronts with React, TypeScript and Tailwind.",
      'My happy place is the front of the front-end: smooth scroll, scroll-triggered reveals, magnetic interactions and the kind of polish you feel before you can name it. I sweat the easing curves so the user never has to think about them.',
      "Whether it's a high-converting brand storefront or a complex internal tool, I care about the same things: clean architecture, buttery motion, accessible markup, and shipping things that actually hold up in production.",
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

  /* — FEATURE ARTICLES (work) — technical editorials / case studies —
     The first item renders as the big lead feature (multi-column, with
     a code excerpt & subheads). The rest render as secondary stories.  */
  features: {
    kicker: 'Technical Editorials',
    page: 'B1',
    label: 'Feature Articles',
    heading: 'Case <em>Studies</em> From the Field',
    lead: {
      beat: 'E-COMMERCE · CASE STUDY',
      name: 'Zebia Storefront',
      headline: 'Storefront Converts Browsers Into Believers',
      deck: 'How a motion-rich Shopify Hydrogen build shaved seconds off the funnel and lifted conversion — without a single janky frame.',
      byline: 'Filed from the Front-end Desk',
      year: '2026',
      dropcap:
        'The brief was deceptively simple: make it fast, make it feel expensive. Delivering both meant treating motion as an engineering budget, not a decoration.',
      sections: [
        {
          h: 'The Design',
          p: 'A restrained editorial grid, oversized product type and a single accent colour did the heavy lifting. Every interaction — magnetic add-to-cart, sticky gallery, scroll-linked reveals — was storyboarded before a line of code was written.',
        },
        {
          h: 'The Architecture',
          p: 'Built on Next.js-style routing with Shopify Hydrogen, streaming server components kept the storefront shell instant while product data hydrated progressively. Cart state lived in a small, typed store; nothing re-rendered that did not have to.',
        },
        {
          h: 'The Stack',
          p: 'React and TypeScript for the app, Tailwind for a token-driven design system, Framer Motion and GSAP for the choreography, and Lenis for a scroll that finally felt native.',
        },
      ],
      // a click-to-copy code excerpt printed in halftone
      code: {
        caption: 'Excerpt — scroll-linked reveal, reduced-motion aware',
        lang: 'tsx',
        source: `const prefersReduced = useReducedMotion();

useGSAP(() => {
  if (prefersReduced) return;
  gsap.from(".product", {
    yPercent: 12,
    opacity: 0,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: { trigger: ".grid", start: "top 80%" },
  });
});`,
      },
      tags: ['Shopify Hydrogen', 'React', 'TypeScript', 'Tailwind', 'GSAP', 'Lenis'],
    },
    stories: [
      {
        name: 'INNSOF ERP',
        beat: 'SYSTEMS',
        headline: 'Internal Platform Tames a Sprawling Business',
        deck: 'Pricing engines, schema tooling and reporting — one typed system replacing a decade of spreadsheets.',
        placeholder: 'ERP',
        year: '2025',
        tags: ['SQL Server', 'Pricing Engine', 'Tooling'],
        href: '#',
      },
      {
        name: 'Schema Exporter',
        beat: 'DEVELOPER TOOLS',
        headline: 'Little CLI Exports Databases Without Complaint',
        deck: 'A quiet Python workhorse that keeps schemas honest across environments.',
        placeholder: 'CLI',
        year: '2025',
        tags: ['Python', 'SQLAlchemy', 'CLI'],
        href: '#',
      },
      {
        name: 'Your Next Build',
        beat: 'OPEN COMMISSION',
        headline: 'This Column Reserved For Your Story',
        deck: 'A commission awaits an ambitious editor. Enquire at the Classifieds.',
        placeholder: 'NEW',
        year: '2026',
        tags: ['Let’s talk', 'Available'],
        href: '#classifieds',
      },
    ],
    continued: 'More filings available on request →',
  },

  /* — THE TECH DESK (new) — a stock-ticker of the stack — */
  stack: {
    kicker: 'The Tech Desk',
    page: 'B6',
    label: 'The Stack Exchange',
    heading: 'Today’s <em>Listings</em> on the Tech Desk',
    note: 'Closing positions as of this edition. Past performance is indicative of future shipping.',
    // sym = ticker, name = tech, sector = category, trend = up/flat/watch
    listings: [
      { sym: 'RCT', name: 'React', sector: 'UI Framework', trend: 'up' },
      { sym: 'NEXT', name: 'Next.js', sector: 'App Framework', trend: 'up' },
      { sym: 'TS', name: 'TypeScript', sector: 'Language', trend: 'up' },
      { sym: 'TWCS', name: 'Tailwind CSS', sector: 'Styling', trend: 'up' },
      { sym: 'GSAP', name: 'GSAP', sector: 'Animation', trend: 'up' },
      { sym: 'FM', name: 'Framer Motion', sector: 'Animation', trend: 'up' },
      { sym: 'LEN', name: 'Lenis', sector: 'Smooth Scroll', trend: 'up' },
      { sym: 'NODE', name: 'Node.js', sector: 'Runtime', trend: 'flat' },
      { sym: 'SQL', name: 'SQL Server', sector: 'Database', trend: 'flat' },
      { sym: 'HYDR', name: 'Shopify Hydrogen', sector: 'E-commerce', trend: 'up' },
      { sym: 'FIGMA', name: 'Figma', sector: 'Design Tool', trend: 'up' },
      { sym: 'GIT', name: 'Git', sector: 'Version Control', trend: 'flat' },
    ],
    // secondary column: design tools & disciplines
    desk: {
      h: 'Design Desk',
      items: [
        'UI Engineering',
        'Design Systems',
        'Design Tokens',
        'Accessibility (a11y)',
        'Motion Design',
        'Responsive Layout',
        'Prototyping',
        'Type & Grid',
      ],
    },
  },

  /* — ON THIS DAY (experience) — career as an historical record — */
  chronicle: {
    kicker: 'The Record',
    page: 'B8',
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
    page: 'B9',
    label: 'By the Numbers',
    heading: 'The Year in <em>Figures</em>',
    items: [
      { value: 5, suffix: '+', label: 'Years building for the web' },
      { value: 40, suffix: '+', label: 'Projects shipped to production' },
      { value: 99, suffix: '', label: 'Lighthouse scores chased relentlessly' },
      { value: 100, suffix: '%', label: 'Commitment to the details' },
    ],
  },

  /* — THE CLASSIFIEDS — ads, freelance availability & résumé — */
  classifieds: {
    kicker: 'The Back Pages',
    page: 'C7',
    label: 'Classifieds',
    heading: 'Small Ads, <em>Big</em> Ideas',
    note: 'To place an advertisement, write to the Correspondence desk. Cash only. No refunds.',
    // headline availability box
    availability: {
      status: 'Available',
      title: 'Now Booking Freelance',
      body: 'One (1) motion-obsessed web developer open for select commissions in 2026. React, Next.js, Tailwind & the systems behind them.',
      resumeLabel: 'Download Résumé (PDF)',
      resumeHref: '/resume.pdf',
      printLabel: 'Print this Edition',
    },
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
        body: 'Discovered loitering at the end of a line. Owner may claim it at the newsroom terminal. ;',
      },
      {
        cat: 'Personals',
        title: 'SWF: STATE MGMT',
        body: 'Single function seeks composable partner for long-term re-renders. Must love hooks. No prop-drilling.',
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
  },

  /* — THE PUZZLE PAGE — crossword + the hidden newsroom terminal — */
  crossword: {
    kicker: 'The Puzzle Page',
    page: 'C9',
    label: 'The Daily Crossword',
    subtitle: 'Solve the grid to unlock newsroom terminal access. Set by the Editor.',
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
    win: 'EXTRA! EXTRA! You solved it — terminal access granted. Try “sudo” below.',
  },

  /* — THE NEWSROOM TERMINAL — an interactive REPL, unlocked by the puzzle — */
  terminal: {
    label: 'The Newsroom Terminal',
    locked: 'Restricted — solve The Daily Crossword above to gain access.',
    user: 'guest',
    host: 'jassim-times',
    boot: [
      'Newsroom Terminal v2.6 — Geist Mono edition',
      'Connected to jassim-times over the wire ✦',
      'Type `help` for the list of commands.',
    ],
    help: [
      ['help', 'list available commands'],
      ['whoami', 'who is behind this paper'],
      ['stack', 'the current tech stack'],
      ['projects', 'selected work, filed & shipped'],
      ['resume', 'grab the résumé'],
      ['contact', 'how to reach the desk'],
      ['socials', 'links to the wire'],
      ['theme', 'flip the morning / late edition'],
      ['coffee', 'brew a fresh cup'],
      ['sudo', 'attempt root access'],
      ['clear', 'clear the screen'],
    ],
    responses: {
      whoami: 'Jassim M Kabir — Web Developer @ INNSOF. Motion-obsessed, systems-minded.',
      stack: 'react · next.js · typescript · tailwind · gsap · lenis · node · sql-server',
      projects:
        'Zebia Storefront (2026) · INNSOF ERP (2025) · Schema Exporter (2025). See Features, page B1.',
      contact: 'jassimmkabir@gmail.com — letters welcomed at the Correspondence desk (D2).',
      socials: 'github.com/Jassimkabir · linkedin.com/in/waleed-jassim-m-k',
      resume: 'Fetching résumé… available for download in The Classifieds (page C7).',
      coffee: '☕  brewing… done. A developer runs on caffeine and clean diffs.',
    },
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
    left: 'Written, set & compiled by <b>Jassim M Kabir</b>',
    center: 'Kerala, India — © 2026 The Jassim Times',
    note: 'Set in Chomsky, Playfair Display, Merriweather & Geist Mono. Compiled with Next.js, GSAP & Lenis. No trees were harmed.',
  },
} as const;

export type SiteContent = typeof CONTENT;
