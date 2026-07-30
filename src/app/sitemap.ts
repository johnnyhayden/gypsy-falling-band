import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data";

/*
 * One entry, because the site is one page — the nav links are in-page anchors,
 * not routes. Add URLs here if a real second route ever ships.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
