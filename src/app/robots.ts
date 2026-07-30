import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The booking endpoint has nothing to index and takes POSTs only.
      disallow: "/api/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
