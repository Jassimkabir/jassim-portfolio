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
} as const;

export const SEO = {
  title: 'Jassim, Front-End Engineer',
  /* 131 characters. Under the 155 limit, no dashes. */
  description:
    'Waleed Jassim M K, front-end engineer in Palakkad, Kerala. Over 4 years building scalable React, Next.js and TypeScript applications.',
  url: 'https://jassim-m-kabir.vercel.app',
  locale: 'en_US',
} as const;

/**
 * Anchor slugs are preserved from the previous site so existing deep links
 * survive. Two are deliberately stale: `#terminal` now holds Proof, and
 * `#services` now holds Capabilities. Do not rename either.
 */
export const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  /* Label overridden from "Services". Anchor kept. See MASTER.md. */
  { label: 'Capabilities', href: '#services' },
  { label: 'Contact', href: '#contact' },
] as const;

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

export const ABOUT = {
  paragraphs: [
    'I started at Hamon Technologies in 2022 as a Junior Engineer, building full-stack applications in React and Node and designing the REST APIs behind them.',
    'At Zartek I led production React and Next.js builds end to end. Now at Innsof I refactor legacy code and rebuild products that underperformed.',
  ],
  /** Real artifacts for the drifting right column. */
  artifacts: [
    { kind: 'education', label: 'Bachelor of Computer Applications', detail: 'AJK College of Arts and Science, Coimbatore', meta: '2018 to 2022' },
    { kind: 'location', label: 'Based in Palakkad', detail: 'Kerala, India', meta: 'Remote and hybrid' },
    { kind: 'focus', label: 'Frontend architecture', detail: 'State management, API integration, performance', meta: '4+ years' },
  ],
} as const;

export const PROOF = {
  article: {
    title: 'BlurHash: An Alternative to Generic Image Placeholders',
    /**
     * NEEDS INPUT: the published URL and 4 to 5 lines of the real opening.
     * Do not paraphrase the post from its title. Ship the pane empty before
     * shipping invented prose.
     */
    url: null,
    excerpt: null,
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
    evidence: { value: 25, suffix: '%', label: 'faster UI development', mechanism: 'reusable components and shared design systems' },
  },
  {
    title: 'Performance optimisation',
    body: 'Finding what the browser actually waits on, then removing it. Splitting bundles at the route boundary and cutting redundant network work.',
    evidence: { value: 30, suffix: '%', label: 'lower page load times', mechanism: 'code splitting and API refinement' },
  },
  {
    title: 'State management',
    body: 'Picking the smallest tool that fits. Redux Toolkit where the state is genuinely shared and long-lived, Zustand where it is not.',
    evidence: { value: 20, suffix: '%', label: 'better delivery efficiency', mechanism: 'end to end ownership of production React and Next.js builds' },
  },
  {
    title: 'API integration',
    body: 'Designing the contract from both sides, then making the client resilient to the parts of it that will change.',
    evidence: { value: 20, suffix: '+', label: 'REST APIs designed', mechanism: 'improving backend performance by 15%' },
  },
] as const;

export const WORK = {
  /**
   * BLOCKED. No client names, product names, live URLs, or repo links were
   * supplied. Build the shell, ship nothing here.
   *
   * NEEDS INPUT: 3 to 5 projects, each with name, one-line problem, stack,
   * one outcome, live URL, repo URL. If the work is all under NDA, say so and
   * this becomes anonymised case notes with that stated on the page.
   */
  projects: [] as ReadonlyArray<{
    name: string;
    problem: string;
    stack: readonly string[];
    metric: string;
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
  links: [
    { label: 'GitHub', value: IDENTITY.github.handle, href: IDENTITY.github.url },
    { label: 'LinkedIn', value: IDENTITY.linkedin.handle, href: IDENTITY.linkedin.url },
  ],
  /** NEEDS INPUT: resume file. Drop it at /public/resume.pdf and set this. */
  resume: null as string | null,
  /** NEEDS INPUT: include the phone number publicly? Default is no. */
  phone: null as string | null,
} as const;

export const FOOTER = {
  builtWith: ['Next.js', 'GSAP', 'Lenis'],
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
  to: '2022',
  /** NEEDS INPUT: any certifications worth listing, with issuer and year. */
  certifications: [] as ReadonlyArray<{ name: string; issuer: string; year: string }>,
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
  {
    question: 'Are you available for freelance or contract work?',
    answer: null,
  },
  {
    question: 'How soon do you reply?',
    answer: null,
  },
  {
    question: 'Can I see your resume?',
    answer: null,
  },
];

/** Closing statement above the contact block. Two lines maximum. */
export const CLOSING = {
  lines: ['Have something', 'worth building?'],
} as const;
