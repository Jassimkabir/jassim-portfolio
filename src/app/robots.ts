import type { MetadataRoute } from "next";
import { CONTENT } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${CONTENT.seo.url}/sitemap.xml`,
    host: CONTENT.seo.url,
  };
}
