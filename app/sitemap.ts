import { SITE_URL, SITEMAP_URLS } from "@/lib/legacy/routes";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_URLS.map((entry) => ({
    url: `${SITE_URL}${entry.path === "/" ? "/" : entry.path}`,
    lastModified: new Date(),
    changeFrequency: entry.changefreq,
    priority: entry.priority,
  }));
}
