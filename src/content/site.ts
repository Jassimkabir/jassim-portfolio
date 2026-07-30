/**
 * Single source of truth for every word on the page.
 *
 * RULES, enforced in review:
 *  - Zero em-dashes and zero en-dashes. Hyphen or restructure.
 *  - Every fact and every number traces to verified source material.
 *  - Anything not yet supplied is `NEEDS_INPUT`, never invented.
 *  - Percentages appear only welded to their mechanism. Never bare.
 */

/** Marks content that has been asked for and not yet supplied. */
export const NEEDS_INPUT = Symbol('NEEDS_INPUT');

export const IDENTITY = {
  fullName: 'Waleed Jassim M K',
  shortName: 'Jassim',
  title: 'Front-End Engineer',
  location: 'Palakkad, Kerala, India',
  email: 'jassimmkabir@gmail.com',
  github: { handle: 'Jassimkabir', url: 'https://github.com/Jassimkabir' },
  linkedin: {
    handle: 'waleed-jassim-m-k',
    url: 'https://linkedin.com/in/waleed-jassim-m-k',
  },
  instagram: {
    handle: 'jassim.m.kabir',
    url: 'https://www.instagram.com/jassim.m.kabir/',
  },
  facebook: {
    handle: 'waleed.jassim.927',
    url: 'https://www.facebook.com/waleed.jassim.927',
  },
} as const;

/**
 * The full profile set, shown as round icon buttons in About and Contact.
 *
 * Derived from IDENTITY so a URL is never written twice. Both About and
 * Contact render this same list, so a platform can never appear in one place
 * and not the other, or with a different handle.
 */
export const SOCIALS = [
  { label: 'GitHub', value: IDENTITY.github.handle, href: IDENTITY.github.url },
  {
    label: 'LinkedIn',
    value: IDENTITY.linkedin.handle,
    href: IDENTITY.linkedin.url,
  },
  {
    label: 'Instagram',
    value: IDENTITY.instagram.handle,
    href: IDENTITY.instagram.url,
  },
  {
    label: 'Facebook',
    value: IDENTITY.facebook.handle,
    href: IDENTITY.facebook.url,
  },
] as const;

export const SEO = {
  /*
   * 57 characters. Was 'Jassim, Front-End Engineer' at 26, which won searches
   * for his name and competed for nothing else while leaving half the space
   * Google renders unused. The full name is what someone types when looking
   * for him specifically, and the role and city are what someone types when
   * they do not know his name yet.
   *
   * Google truncates around 60 on desktop, so this is close to the limit
   * without crossing it. Anything longer gets an ellipsis, which costs the
   * city, which is the part doing the local work.
   */
  title: 'Waleed Jassim M K, Front-End Engineer in Palakkad, Kerala',

  /*
   * 115 characters. Was 133, which fits the roughly 155 Google allows on
   * desktop but overran the roughly 120 to 130 it allows on mobile and the
   * shorter budget social previews use, so the end was being cut on the
   * surfaces that matter most. Nothing was dropped except a repetition of the
   * city, which the title already carries.
   */
  description:
    'Waleed Jassim M K, front-end engineer in Kerala. Over 4 years building scalable React, Next.js and TypeScript apps.',
  /* The live origin, and it is load bearing. Everything canonical is derived
     from it: alternates.canonical, metadataBase, the OG and Twitter urls, the
     sitemap entry, robots' host, and every @id in the structured data graph.
     It was https://jassim-m-kabir.vercel.app, which 404s, so the page was
     telling search engines its canonical URL was a dead one. Verify a change
     here resolves before shipping it. */
  url: 'https://jassimmkabir.vercel.app',
  locale: 'en_US',
} as const;

export const HERO = {
  /** Two lines maximum on desktop. Non-negotiable. */
  headline: ['Front-end engineer', 'building for production'],
  /** One sentence, 17 words. */
  subtext:
    'Over 4 years building scalable React and Next.js applications, with a focus on performance and frontend architecture.',
  cta: { label: 'Get in touch', href: '#contact' },
  /**
   * The only status dot on the page, and only because it conveys real hiring
   * state. NEEDS INPUT: confirm he is actually open to work. If not, delete
   * the chip entirely rather than softening the wording.
   */
  availability: { label: 'Open to work', confirmed: false },
} as const;

/** Real stack only. No adjectives. The resume's AI-tools row stays off the site. */
export const MARQUEE = [
  'React.js',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Vue.js',
  'Tailwind CSS',
  'shadcn/ui',
  'Redux Toolkit',
  'Zustand',
  'Node.js',
  'Express.js',
  'REST APIs',
  'Supabase',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Vercel',
  'GSAP',
] as const;

/**
 * Section eyebrows. One mono-caps line in --accent-lift above every section
 * heading, naming the section the reader has just scrolled into.
 *
 * They live in one object rather than beside each section's own copy, because
 * the rule is "every section has one" and a single map is the only shape where
 * a missing entry is visible at a glance.
 *
 * Each one is deliberately NOT a restatement of the heading below it: the
 * eyebrow names the section, the heading makes the claim. "Capabilities" over
 * "What I actually do", not "What I do" over "What I actually do".
 *
 * The hero has none on purpose. An eyebrow tells you where you have arrived,
 * which is only useful once you have scrolled; above the h1 it would be a
 * label on the top of the page.
 */
export const EYEBROWS = {
  about: 'About me',
  proof: 'Writing',
  capabilities: 'Capabilities',
  work: 'Client work',
  experience: 'Experience',
  education: 'Education',
  faq: 'Straight answers',
  contact: 'Contact',
} as const;

/**
 * Statement, first-person intro, resume download. The eyebrow lives in
 * EYEBROWS with every other section's.
 *
 * The reference this was modelled on reads "passionate about crafting
 * intuitive, user-centered experiences" and claims "100+ projects". All three
 * of passionate, crafting and seamless are on the banned list, and the project
 * count has no basis in the source material, so the structure was taken and the
 * copy written from the resume instead.
 *
 * Every figure below is welded to the mechanism that produced it, which is what
 * makes it survive the follow-up question in an interview.
 */
export const ABOUT = {
  /** Two lines at display-lg. Deliberately not a restatement of the hero. */
  heading: 'I work on code that already exists',

  intro:
    "I'm Jassim, a front-end engineer based in Palakkad. Most of my work is on products that are already running and already struggling: cutting page load times 30% with code splitting and API refinement, reducing production defects 25% through structured reviews, and factoring shared components so the next feature ships faster.",

  resumeCta: 'Download resume',
  socialsLabel: 'Follow me',
} as const;

export const PROOF = {
  article: {
    /* Published as "BlurHash : An Alternative to Generic Image Placeholders."
       The stray space before the colon and the trailing period are dropped
       here, which is normalisation and not a rewrite. */
    title: 'BlurHash: An Alternative to Generic Image Placeholders',

    url: 'https://medium.com/@jassimmkabir/blurhash-an-alternative-to-generic-image-placeholders-05731df38ad3',

    /**
     * The post's own first two paragraphs, verbatim and contiguous.
     *
     * Not a summary, and not the opening spliced together with the later
     * paragraph that defines BlurHash, which would read better and would be a
     * quote of something he did not write in that order. If this ever needs to
     * be shorter, cut from the end. Do not stitch.
     */
    excerpt:
      "Having too many images in your app or images that are very large and load slowly can negatively impact page speed and user experience. In fact, images are probably one of the most significant contributors to your app's speed. Instead of reducing the number of images in an app, we can use placeholders for some of them, thereby reducing the number of image files on initial load.",

    cta: 'Read the post',
  },
  /** NEEDS INPUT: screenshots, recordings, or a Lighthouse report. */
  assets: [] as ReadonlyArray<{ src: string; alt: string; caption: string }>,
} as const;

/**
 * Each capability carries concrete evidence. Percentages live here, welded to
 * the mechanism that produced them, because the context is what makes them
 * defensible in an interview.
 */
export const CAPABILITIES = [
  {
    title: 'Frontend architecture',
    body: 'Rebuilding underperforming projects around maintainable structure, and factoring shared components so teams move faster on the next feature.',
    evidence: {
      value: 25,
      suffix: '%',
      label: 'faster UI development',
      mechanism: 'reusable components and shared design systems',
    },
  },
  {
    title: 'Performance optimisation',
    body: 'Finding what the browser actually waits on, then removing it. Splitting bundles at the route boundary and cutting redundant network work.',
    evidence: {
      value: 30,
      suffix: '%',
      label: 'lower page load times',
      mechanism: 'code splitting and API refinement',
    },
  },
  {
    title: 'State management',
    body: 'Picking the smallest tool that fits. Redux Toolkit where the state is genuinely shared and long-lived, Zustand where it is not.',
    evidence: {
      value: 20,
      suffix: '%',
      label: 'better delivery efficiency',
      mechanism: 'end to end ownership of production React and Next.js builds',
    },
  },
  {
    title: 'API integration',
    body: 'Designing the contract from both sides, then making the client resilient to the parts of it that will change.',
    evidence: {
      value: 20,
      suffix: '+',
      label: 'REST APIs designed',
      mechanism: 'improving backend performance by 15%',
    },
  },
] as const;

export const WORK = {
  /**
   * Four shipped client sites.
   *
   * Every stack list below was read off the live site rather than recalled:
   * response headers plus build fingerprints in the served HTML. Nothing is
   * listed that could not be confirmed that way, which is why the lists are
   * shorter than the real toolchains almost certainly are.
   *
   * NEEDS INPUT, per project: one outcome, and a repo URL where the repo is
   * public. `metric` is null on all four rather than carrying a plausible
   * number, because an invented outcome on the section a hiring manager reads
   * most carefully is the worst possible place to be caught. The card renders
   * without it.
   */
  projects: [
    {
      name: 'Beyond Smiles Dentistry',
      problem:
        'Clinic site for a dental practice in Palakkad, covering its specialists, treatment galleries and an appointment request form.',
      stack: ['Next.js', 'React', 'Vercel'],
      metric: null,
      liveUrl: 'https://www.draryasbeyondsmiles.com/',
      repoUrl: null,
    },
    {
      name: 'SugarWho',
      problem:
        'Direct to consumer storefront for a monk fruit sweetener brand, with catalog, cart and cash on delivery across India.',
      stack: ['Shopify Hydrogen', 'React', 'Vite', 'Tailwind CSS', 'Oxygen'],
      metric: null,
      liveUrl: 'https://sugarwho.in/',
      repoUrl: null,
    },
    {
      name: 'Orbinoz Event Planners',
      problem:
        'Site for a corporate event company in Kochi, built around a work gallery, client logos and an enquiry form that routes by event type.',
      stack: ['Next.js', 'React', 'Vercel'],
      metric: null,
      liveUrl: 'https://www.orbinozevents.com/',
      repoUrl: null,
    },
    {
      name: 'Ragooty Sasidharan',
      problem:
        'Photography portfolio built around the gallery, with the work as the only thing on screen.',
      stack: ['Next.js', 'React', 'Vercel'],
      metric: null,
      liveUrl: 'https://ragootysasidharan.com/',
      repoUrl: null,
    },
  ] as ReadonlyArray<{
    name: string;
    problem: string;
    stack: readonly string[];
    /* Null until a real outcome exists. Never a placeholder number. */
    metric: string | null;
    liveUrl: string | null;
    repoUrl: string | null;
  }>,
} as const;

/** Two bullets per role maximum on the page. The full list lives on the resume. */
export const EXPERIENCE = [
  {
    company: 'Innsof Private Limited',
    city: 'Calicut',
    role: 'Software Developer',
    from: 'Nov 2025',
    to: 'Present',
    bullets: [
      'Refactored a legacy codebase, cutting complexity and improving feature development speed by 15%.',
      'Built a reporting tool that improved internal data access efficiency by 20%.',
    ],
  },
  {
    company: 'Zartek Technologies',
    city: 'Kochi',
    role: 'React.js Developer',
    from: 'Jun 2024',
    to: 'Aug 2025',
    bullets: [
      'Led end to end development of production React.js and Next.js applications, improving delivery efficiency by 20%.',
      'Cut page load times by 30% through code splitting and API refinement.',
    ],
  },
  {
    company: 'Hamon Technologies',
    city: 'Calicut',
    role: 'Junior Engineer I',
    from: 'Jan 2022',
    to: 'Jun 2024',
    bullets: [
      'Designed and optimised 20+ REST APIs, improving backend performance by 15%.',
      'Increased UI development speed by 25% through reusable components and shared design systems.',
    ],
  },
] as const;

/**
 * Countable claims only. These survive the follow-up question, which bare
 * percentages do not. Percentages belong in Capabilities and Experience where
 * their mechanism sits next to them.
 */
export const NUMBERS = [
  { value: 4, suffix: '+', label: 'years experience' },
  { value: 3, suffix: '', label: 'companies' },
  { value: 20, suffix: '+', label: 'REST APIs designed' },
  { value: 2, suffix: '', label: 'developers mentored' },
] as const;

export const CONTACT = {
  email: IDENTITY.email,
  followLabel: 'Follow',
  resumeCta: 'Download resume',
  /* The resume link is derived from the filesystem in page.tsx rather than
     stored here: drop any PDF into /public and both the About button and the
     contact row appear. */
  /** NEEDS INPUT: include the phone number publicly? Default is no. */
  phone: null as string | null,
} as const;

export const FOOTER = {
  /* The year is computed in page.tsx, a server component, and passed down.
     Calling new Date() during a client render risks a hydration mismatch at a
     year boundary for a value that only changes once a year. */
  /* Split from the name on purpose. The footer keeps the name on one line, so
     it needs the two separately; as a single interpolated string the credit
     broke mid-name on a 375px viewport and left "K" alone on its own line. */
  creditPrefix: 'Designed and built by',
  quickLinksLabel: 'Quick links',
  backToTop: 'Back to top',
} as const;

/**
 * Education. One real entry.
 *
 * The reference layout carries four; inventing three more is not an option, so
 * this section is designed around a single statement rather than a list that
 * would look padded. `certifications` stays empty until real ones exist.
 */
export const EDUCATION = {
  degree: 'Bachelor of Computer Applications',
  institution: 'AJK College of Arts and Science',
  city: 'Coimbatore',
  from: '2018',
  to: '2021',
  /** NEEDS INPUT: any certifications worth listing, with issuer and year. */
  certifications: [] as ReadonlyArray<{
    name: string;
    issuer: string;
    year: string;
  }>,
} as const;

/**
 * Testimonials.
 *
 * BLOCKED, and deliberately empty. The reference fills this with quotes and a
 * "18,000+ satisfied clients" figure. Nothing equivalent exists in the source
 * material, and a fabricated endorsement attributed to a named person is both
 * the worst kind of invented content and trivially checkable by the exact
 * audience this page is for.
 *
 * NEEDS INPUT: 2 to 4 real quotes, each with the person's name, their role and
 * company, and their permission to publish it.
 */
export const TESTIMONIALS = [] as ReadonlyArray<{
  quote: string;
  name: string;
  role: string;
  company: string;
}>;

/**
 * FAQ.
 *
 * Only questions that can be answered from verified material are here. The
 * reference asks about refund policy, ongoing support and hidden costs, which
 * are freelance-service questions with no truthful answer available, so they
 * are absent rather than guessed at.
 *
 * NEEDS INPUT for the three marked below: availability for freelance or
 * contract work alongside the current role, typical response time, and
 * preferred engagement type.
 */
export const FAQ: ReadonlyArray<{ question: string; answer: string | null }> = [
  {
    question: 'What kind of work do you take on?',
    answer:
      'Production React and Next.js applications. Most of my work is frontend architecture, state management, API integration and performance, on products that need to keep working after launch.',
  },
  {
    question: 'Where are you based?',
    answer:
      'Palakkad, Kerala, India. I have worked with teams in Kochi and Calicut, and I work remotely.',
  },
  {
    question: 'What do you build with?',
    answer:
      'React, Next.js and TypeScript day to day, with Tailwind and shadcn/ui for interfaces, Redux Toolkit or Zustand for state, and Node, Express, PostgreSQL and Supabase on the backend when a project needs it.',
  },
  /*
   * The three below were written for Jassim rather than supplied by him, at
   * his request. The first two are commitments a reader can hold him to, so
   * they are deliberately conservative: they promise less than he can
   * probably deliver, because the failure mode of a portfolio FAQ is a
   * promise that gets broken on the first enquiry.
   *
   * If either becomes untrue, change it here.
   */
  {
    question: 'Are you available for freelance or contract work?',
    /* Kept consistent with EXPERIENCE, which has him at Innsof from Nov 2025
       to Present. Claiming open availability would contradict the page
       directly above it. This says yes to the right enquiry without
       promising capacity he may not have. */
    answer:
      'I am in a full time role, so I take on a small amount of contract work and only where I can commit properly to it. If you have something specific in mind, send me the details and I will tell you honestly whether I can do it justice.',
  },
  {
    question: 'How soon do you reply?',
    /* Two working days, not "within 24 hours". He has a day job, and this is
       a floor he can hold on a bad week rather than a best case. */
    answer:
      'Within two working days, usually sooner. If you have not heard back after that, the message went astray somewhere, so it is worth sending again.',
  },
  {
    question: 'Can I see your resume?',
    /* The only one of the three that is a fact rather than a commitment. It
       is true because the PDF is in /public and both buttons render off its
       presence; if the file is ever removed both buttons disappear and this
       answer becomes a lie. */
    answer:
      'Yes. There is a download button in the About section and another next to my email at the bottom of this page. It covers the same ground in more detail, including the roles and dates.',
  },
];

/** Closing statement above the contact block. Two lines maximum. */
export const CLOSING = {
  lines: ['Have something', 'worth building?'],
} as const;
