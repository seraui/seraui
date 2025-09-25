import type { MetadataRoute } from "next";
import { generateDocsSitemap } from "./scripts/get-docs-sitemap";

/**
 * Instead of placing this in the /app directory, we're storing it here for a reason
 * The app is confgured for static export in next.config.ts
 * The sitemap generation provided by NextJs causes build error for static exports
 *
 * So we'll be using a custom script that runs before building the application,
 * Which will generate the sitemap.xml, and we'll use the same convention for sitemap as NextJs
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const docsSitemap = generateDocsSitemap();

  return [
    {
      url: "https://seraui.com/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
    {
      url: "https://seraui.com/sponsor/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://seraui.com/docs/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...docsSitemap,
  ];
}
