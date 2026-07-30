import type { MetadataRoute } from 'next';

import { SEO } from '@/content/site';

/**
 * One URL, because there is one page.
 *
 * The section anchors are deliberately absent. #about and #work are fragments
 * of this document, not documents, and listing them would submit URLs that
 * resolve to the same page for indexing, which is a duplicate content signal
 * rather than extra coverage. If any section ever becomes its own route, it
 * belongs here then.
 *
 * changeFrequency is a hint search engines have said for years they largely
 * ignore, and priority only orders this site against itself, which is
 * meaningless with a single entry. Both are kept because they cost nothing and
 * are still read by smaller crawlers; neither is doing real work here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SEO.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      /* Surfaces the OG card to image search, which is otherwise reachable
         only through the meta tag. */
      images: [`${SEO.url}/opengraph-image`],
    },
  ];
}
