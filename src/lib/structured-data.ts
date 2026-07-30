import {
  CAPABILITIES,
  EDUCATION,
  EXPERIENCE,
  FAQ,
  IDENTITY,
  MARQUEE,
  SEO,
  WORK,
} from '@/content/site';

/**
 * The page's structured data, as one linked graph.
 *
 * WHY A GRAPH AND NOT SEPARATE BLOCKS. Search engines will parse several
 * standalone <script type="application/ld+json"> blocks, but nothing tells
 * them the Person in one is the same entity as the author in another. Giving
 * every node a stable @id and referring to those ids instead of repeating
 * objects states the relationships outright: this page is about this person,
 * this person wrote these projects, this site publishes this page. That is the
 * difference between markup a crawler tolerates and markup it can reason over.
 *
 * EVERYTHING BELOW IS DERIVED FROM content/site.ts. Not one fact is retyped
 * here. Structured data that disagrees with the page it describes is worse
 * than none, because it is exactly what a spam classifier is built to catch,
 * and hand-maintained duplicates drift the moment someone edits the copy. Add
 * a job to EXPERIENCE and it appears here; change a FAQ answer and this
 * follows. If you find yourself typing a fact into this file, put it in the
 * content module and read it back instead.
 *
 * Every @id is absolute and fragment-scoped to the origin, which is what makes
 * them stable across pages if this ever stops being a single page.
 */

const PERSON_ID = `${SEO.url}/#person`;
const SITE_ID = `${SEO.url}/#website`;
const PAGE_ID = `${SEO.url}/#webpage`;

/** "Nov 2025" to "2025-11", the ISO 8601 partial date Schema.org expects. */
const MONTHS: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

function isoDate(value: string): string | undefined {
  if (value === 'Present') return undefined;
  const [month, year] = value.split(' ');
  if (year && MONTHS[month]) return `${year}-${MONTHS[month]}`;
  return /^\d{4}$/.test(value) ? value : undefined;
}

/**
 * Employers, as Organization nodes the Person's roles can point at.
 *
 * Deduplicated by name, because a person who returns to a company must not
 * produce two organisations that a crawler then treats as different employers.
 */
const employers = [...new Map(EXPERIENCE.map((role) => [role.company, role])).values()].map(
  (role) => ({
    '@type': 'Organization',
    '@id': `${SEO.url}/#org-${role.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: role.company,
    address: { '@type': 'PostalAddress', addressLocality: role.city, addressCountry: 'IN' },
  }),
);

/** The roles themselves, so employment history is machine readable, not prose. */
const occupations = EXPERIENCE.map((role) => ({
  '@type': 'OrganizationRole',
  roleName: role.role,
  startDate: isoDate(role.from),
  ...(isoDate(role.to) ? { endDate: isoDate(role.to) } : {}),
  worksFor: {
    '@id': `${SEO.url}/#org-${role.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  },
}));

/**
 * Skills. MARQUEE is the verified stack list and CAPABILITIES names the
 * disciplines, so together they are what he demonstrably knows, drawn from the
 * two places the page already claims it.
 */
const knowsAbout = [...new Set([...MARQUEE, ...CAPABILITIES.map((c) => c.title)])];

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: IDENTITY.fullName,
  alternateName: IDENTITY.shortName,
  url: SEO.url,
  image: `${SEO.url}/portrait.png`,
  jobTitle: IDENTITY.title,
  email: `mailto:${IDENTITY.email}`,
  description: SEO.description,
  knowsAbout,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Palakkad',
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: EDUCATION.institution,
    address: { '@type': 'PostalAddress', addressLocality: EDUCATION.city, addressCountry: 'IN' },
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'degree',
    name: EDUCATION.degree,
    educationalLevel: 'Bachelor',
  },
  hasOccupation: occupations,
  worksFor: { '@id': employers[0]['@id'] },
  sameAs: [
    IDENTITY.github.url,
    IDENTITY.linkedin.url,
    IDENTITY.instagram.url,
    IDENTITY.facebook.url,
  ],
};

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SEO.url,
  name: `${IDENTITY.shortName}, ${IDENTITY.title}`,
  description: SEO.description,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
  /* No SearchAction. The site has no search, and declaring one that does not
     exist is a misrepresentation Google explicitly penalises. */
};

/**
 * ProfilePage rather than WebPage, which is the correct type for a page whose
 * subject is one person, and the type Google's profile page documentation
 * expects. mainEntity is what states that subject rather than implying it.
 */
const profilePage = {
  '@type': 'ProfilePage',
  '@id': PAGE_ID,
  url: SEO.url,
  name: SEO.title,
  description: SEO.description,
  inLanguage: 'en',
  isPartOf: { '@id': SITE_ID },
  about: { '@id': PERSON_ID },
  mainEntity: { '@id': PERSON_ID },
  primaryImageOfPage: `${SEO.url}/portrait.png`,
};

/**
 * FAQPage, built only from answered questions.
 *
 * Unanswered entries are filtered rather than shipped empty. An acceptedAnswer
 * with no text is invalid markup, and Google's FAQ guidance is explicit that
 * the answer must be the one visible on the page, so a question the reader
 * cannot see answered must not appear here either.
 */
const answered = FAQ.filter((item): item is { question: string; answer: string } =>
  Boolean(item.answer),
);

const faqPage =
  answered.length > 0
    ? {
        '@type': 'FAQPage',
        '@id': `${SEO.url}/#faq`,
        isPartOf: { '@id': PAGE_ID },
        mainEntity: answered.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null;

/**
 * The projects, as WebSite nodes he is credited on.
 *
 * WebSite and not CreativeWork: each one is a site that exists at a URL, and
 * saying so lets the credit resolve to a real thing rather than an abstract
 * work. Only projects with a live URL are listed, because a portfolio item a
 * crawler cannot reach is an assertion it cannot verify.
 */
const shipped = WORK.projects.filter((p) => p.liveUrl);

const projectList =
  shipped.length > 0
    ? {
        '@type': 'ItemList',
        '@id': `${SEO.url}/#work`,
        name: 'Selected work',
        itemListOrder: 'https://schema.org/ItemListUnordered',
        numberOfItems: shipped.length,
        itemListElement: shipped.map((project, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'WebSite',
            name: project.name,
            url: project.liveUrl,
            description: project.problem,
            creator: { '@id': PERSON_ID },
            keywords: project.stack.join(', '),
          },
        })),
      }
    : null;

/** One graph, one script tag. */
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [person, ...employers, website, profilePage, faqPage, projectList].filter(Boolean),
};
