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
      path === "/location/" ||
      path === "/location"
    );
  } catch {
    return false;
  }
}

type HreflangGroup = {
  fr: string;
  en: string;
  nl: string;
  it?: string;
};

const HREFLANG_GROUPS: HreflangGroup[] = [
  { fr: "/", en: "/en/", it: "/it/", nl: "/nl/" },
  { fr: "/about/", en: "/en/about/", it: "/it/chi-siamo/", nl: "/nl/over-ons/" },
  { fr: "/quartiers/", en: "/en/neighbourhoods/", it: "/it/quartieri/", nl: "/nl/wijken/" },
  { fr: "/nos-projets/", en: "/en/projects/", it: "/it/progetti/", nl: "/nl/projecten/" },
  { fr: "/sur-plan/", en: "/en/off-plan/", it: "/it/progetti-su-piano/", nl: "/nl/nieuwbouw/" },
  { fr: "/sur-plan/villa-jaz/", en: "/en/off-plan/villa-jaz/", it: "/it/progetti-su-piano/villa-jaz/", nl: "/nl/nieuwbouw/villa-jaz/" },
  { fr: "/off-market/", en: "/en/off-market/", it: "/it/off-market/", nl: "/nl/off-market/" },
  { fr: "/simulateur/", en: "/en/simulator/", it: "/it/simulatore/", nl: "/nl/simulator/" },
  { fr: "/contact/", en: "/en/contact/", it: "/it/contatto/", nl: "/nl/contact/" },
  { fr: "/blog/", en: "/en/blog/", it: "/it/blog/", nl: "/nl/blog/" },
  { fr: "/privacy-policy/", en: "/en/privacy-policy/", it: "/it/privacy-policy/", nl: "/nl/privacybeleid/" },
  {
    fr: "/blog/acheter-villa-sur-plan-marrakech/",
    en: "/en/blog/buying-off-plan-villa-marrakech/",
    it: "/it/blog/acquistare-villa-su-progetto-marrakech/",
    nl: "/nl/blog/nieuwbouwvilla-kopen-marrakech/",
  },
  {
    fr: "/blog/investir-immobilier-luxe-marrakech/",
    en: "/en/blog/luxury-real-estate-investment-marrakech/",
    it: "/it/blog/investire-immobiliare-di-lusso-marrakech/",
    nl: "/nl/blog/investeren-luxe-vastgoed-marrakech/",
  },
  {
    fr: "/blog/adresses-immobilier-marrakech/",
    en: "/en/blog/best-addresses-real-estate-marrakech/",
    it: "/it/blog/indirizzi-immobiliari-marrakech/",
    nl: "/nl/blog/beste-adressen-vastgoed-marrakech/",
  },
  {
    fr: "/blog/off-market-marrakech-biens-confidentiels/",
    en: "/en/blog/off-market-properties-marrakech/",
    it: "/it/blog/immobili-off-market-marrakech/",
    nl: "/nl/blog/off-market-vastgoed-marrakech/",
  },
  {
    fr: "/blog/appartement-hypercentre-gueliz-marrakech/",
    en: "/en/blog/apartment-hypercentre-gueliz-marrakech/",
    it: "/it/blog/appartamento-centro-gueliz-marrakech/",
    nl: "/nl/blog/appartement-hypercentre-gueliz-marrakech/",
  },
] as const;

function normalizePath(pathOrUrl: string): string {
  const path = pathOrUrl.startsWith("http")
    ? new URL(pathOrUrl).pathname
    : pathOrUrl;
  if (!path.endsWith("/")) return `${path}/`;
  return path;
}

export function getLanguageAlternates(pathOrUrl: string) {
  const path = normalizePath(pathOrUrl);
  const group = HREFLANG_GROUPS.find((item) =>
    Object.values(item).some((value) => value === path),
  );
  if (!group) return undefined;

  return {
    "fr-FR": `${SITE_URL}${group.fr}`,
    "en-US": `${SITE_URL}${group.en}`,
    ...(group.it ? { "it-IT": `${SITE_URL}${group.it}` } : {}),
    "nl-NL": `${SITE_URL}${group.nl}`,
    "x-default": `${SITE_URL}${group.fr}`,
  };
}

function isTemporarilyNoindexedStaticPage(parsed: ParsedStaticPage): boolean {
  return isTemporarilyNoindexedPath(parsed.canonical);
}

export function buildMetadataFromParsed(parsed: ParsedStaticPage): Metadata {
  const canonical = parsed.canonical.startsWith("http")
    ? parsed.canonical
    : `${SITE_URL}${parsed.canonical}`;
  const noindex = isTemporarilyNoindexedStaticPage(parsed);

  return {
    title: parsed.title,
    description: parsed.description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(canonical),
    },
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
    alternates: {
      canonical,
      languages: getLanguageAlternates(seo.canonicalPath),
    },
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
