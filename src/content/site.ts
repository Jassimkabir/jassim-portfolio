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
  title: 'Jassim, Front-End Engineer',
  /* 131 characters. Under the 155 limit, no dashes. */
  description:
    'Waleed Jassim M K, front-end engineer in Palakkad, Kerala. Over 4 years building scalable React, Next.js and TypeScript applications.',
  url: 'https://jassim-m-kabir.vercel.app',
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
 * Eyebrow, statement, first-person intro, resume download.
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
  work: 'Selected work',
  experience: 'Experience',
  education: 'Education',
  faq: 'Straight answers',
  contact: 'Contact',
} as const;

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
  credit: `Designed and built by ${IDENTITY.fullName}`,
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
