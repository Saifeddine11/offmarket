import type { Metadata } from "next";
import type { PageContent } from "@/lib/content/types";
import { SITE_URL } from "@/lib/legacy/routes";
import { getLanguageAlternates } from "@/lib/seo/metadata";

/**
 * Blog article metadata — matches static HTML heads.
 * Meta description is rendered via PageHeadMeta (avoids Next auto og:description).
 */
export function buildBlogArticleMetadata(content: PageContent): Metadata {
  const canonical = content.canonical.startsWith("http")
    ? content.canonical
    : `${SITE_URL}${content.canonical}`;

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: content.ogType === "article" ? "article" : "website",
    url: canonical,
    title: content.ogTitle || content.title,
    images: content.ogImage ? [{ url: content.ogImage }] : undefined,
  };

  if (content.ogDescription) {
    openGraph.description = content.ogDescription;
  }
  if (content.ogLocale) {
    openGraph.locale = content.ogLocale;
  }

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(canonical),
    },
    icons: {
      icon: "/assets/manifest/favicon-offmarket.svg?v=1765297300",
    },
    openGraph,
  };
}
