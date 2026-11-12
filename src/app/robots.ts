import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";

/**
 * Directives for web crawlers.
 * Allows public pages, references the sitemap, and keeps internal API routes disallowed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

