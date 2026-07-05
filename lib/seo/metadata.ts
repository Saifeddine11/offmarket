import type { Metadata, Viewport } from "next";
import type { ParsedStaticPage } from "@/lib/static-html/parsePage";
import { SITE_URL } from "@/lib/legacy/routes";

export type PageSeo = {
  title: string;
  description: string;
  canonicalPath: string;
  ogLocale?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterDescription?: string;
  themeColor?: string;
};

function isTemporarilyNoindexedPath(pathOrUrl: string): boolean {
  try {
    const path = pathOrUrl.startsWith("http")
      ? new URL(pathOrUrl).pathname
      : pathOrUrl;

    return (
      path.startsWith("/en/") ||
      path === "/en" ||
      path.startsWith("/it/") ||
      path === "/it" ||
      path.startsWith("/nl/") ||
      path === "/nl" ||
      path === "/location/" ||
      path === "/location"
    );
  } catch {
    return false;
  }
}

function isTemporarilyNoindexedStaticPage(parsed: ParsedStaticPage): boolean {
  return parsed.htmlLang !== "fr" || isTemporarilyNoindexedPath(parsed.canonical);
}

export function buildMetadataFromParsed(parsed: ParsedStaticPage): Metadata {
  const canonical = parsed.canonical.startsWith("http")
    ? parsed.canonical
    : `${SITE_URL}${parsed.canonical}`;
  const noindex = isTemporarilyNoindexedStaticPage(parsed);

  return {
    title: parsed.title,
    description: parsed.description,
    alternates: { canonical },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    icons: {
      icon: "/assets/manifest/favicon-offmarket.svg?v=1765297300",
    },
    openGraph: {
      type: (parsed.ogType === "article" ? "article" : "website") as
        | "website"
        | "article",
      url: canonical,
      title: parsed.ogTitle || parsed.title,
      ...(parsed.ogDescription
        ? { description: parsed.ogDescription }
        : {}),
      ...(parsed.ogLocale ? { locale: parsed.ogLocale } : {}),
      images: parsed.ogImage ? [{ url: parsed.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: parsed.twitterTitle || parsed.ogTitle || parsed.title,
      ...(parsed.twitterDescription
        ? { description: parsed.twitterDescription }
        : {}),
      images: parsed.twitterImage ? [parsed.twitterImage] : undefined,
    },
  };
}

export function buildPageMetadata(seo: PageSeo): Metadata {
  const canonical = `${SITE_URL}${seo.canonicalPath}`;
  const noindex = isTemporarilyNoindexedPath(seo.canonicalPath);
  const ogImage =
    seo.ogImage ??
    `${SITE_URL}/assets/mavericks/hero/mavericks-hero-poster.jpg`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    icons: {
      icon: "/assets/manifest/favicon-offmarket.svg?v=1765297300",
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
      locale: seo.ogLocale ?? "fr_FR",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle ?? seo.title,
      description: seo.twitterDescription ?? seo.ogDescription ?? seo.description,
      images: [ogImage],
    },
  };
}

export function buildPageViewport(themeColor = "#565449"): Viewport {
  return { themeColor };
}
