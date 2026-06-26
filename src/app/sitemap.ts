import type { MetadataRoute } from "next";
import { CONTENT } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CONTENT.seo.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
