import { SITE_URL, SITEMAP_URLS } from "@/lib/legacy/routes";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_URLS.map((entry) => ({
    url: `${SITE_URL}${entry.path === "/" ? "/" : entry.path}`,
    changeFrequency: entry.changefreq,
    priority: entry.priority,
  }));
}
