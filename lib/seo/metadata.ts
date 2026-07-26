import type { Metadata, Viewport } from "next";
import type { ParsedStaticPage } from "@/lib/static-html/parsePage";
import { SITE_URL } from "@/lib/legacy/routes";

/**
 * Single source of truth for the site favicon / touch icons.
 * All variants are rendered from the official OFF MARKET "OM" monogram
 * (favicon-offmarket.svg). The `?v=` token busts the immutable /assets cache
 * so browsers/CDN drop the previous icon bytes.
 */
export const ICON_VERSION = "1785100000";

export const SITE_ICONS: NonNullable<Metadata["icons"]> = {
  icon: [
    {
      url: `/assets/manifest/favicon-offmarket.svg?v=${ICON_VERSION}`,
      type: "image/svg+xml",
    },
    {
      url: `/assets/manifest/favicon-96x96.png?v=${ICON_VERSION}`,
      type: "image/png",
      sizes: "96x96",
    },
    {
      url: `/assets/manifest/favicon-32x32.png?v=${ICON_VERSION}`,
      type: "image/png",
      sizes: "32x32",
    },
  ],
  apple: [
    {
      url: `/assets/manifest/apple-touch-icon.png?v=${ICON_VERSION}`,
      sizes: "180x180",
      type: "image/png",
    },
  ],
};

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
  es?: string;
  no?: string;
  ar?: string;
};

const HREFLANG_GROUPS: HreflangGroup[] = [
  { fr: "/", en: "/en/", es: "/es/", it: "/it/", nl: "/nl/", no: "/no/" },
  { fr: "/about/", en: "/en/about/", es: "/es/sobre-nosotros/", it: "/it/chi-siamo/", nl: "/nl/over-ons/", no: "/no/om-oss/" },
  { fr: "/quartiers/", en: "/en/neighbourhoods/", es: "/es/barrios/", it: "/it/quartieri/", nl: "/nl/wijken/", no: "/no/omrader/" },
  { fr: "/nos-projets/", en: "/en/projects/", es: "/es/proyectos/", it: "/it/progetti/", nl: "/nl/projecten/", no: "/no/prosjekter/" },
  { fr: "/sur-plan/", en: "/en/off-plan/", es: "/es/sobre-plano/", it: "/it/progetti-su-piano/", nl: "/nl/nieuwbouw/", no: "/no/nybygg/" },
  { fr: "/sur-plan/villa-jaz/", en: "/en/off-plan/villa-jaz/", es: "/es/sobre-plano/villa-jaz/", it: "/it/progetti-su-piano/villa-jaz/", nl: "/nl/nieuwbouw/villa-jaz/", no: "/no/nybygg/villa-jaz/" },
  { fr: "/off-market/", en: "/en/off-market/", es: "/es/off-market/", it: "/it/off-market/", nl: "/nl/off-market/", no: "/no/off-market/" },
  { fr: "/simulateur/", en: "/en/simulator/", es: "/es/simulador/", it: "/it/simulatore/", nl: "/nl/simulator/", no: "/no/kalkulator/" },
  { fr: "/contact/", en: "/en/contact/", es: "/es/contacto/", it: "/it/contatto/", nl: "/nl/contact/", no: "/no/kontakt/" },
  { fr: "/blog/", en: "/en/blog/", es: "/es/blog/", it: "/it/blog/", nl: "/nl/blog/", no: "/no/blogg/" },
  { fr: "/privacy-policy/", en: "/en/privacy-policy/", it: "/it/privacy-policy/", nl: "/nl/privacybeleid/", es: "/es/politica-de-privacidad/", no: "/no/personvernerklaering/", ar: "/ar/privacy-policy/" },
  { fr: "/conditions-generales/", en: "/en/terms-of-use/", it: "/it/condizioni-d-uso/", nl: "/nl/gebruiksvoorwaarden/", es: "/es/condiciones-de-uso/", no: "/no/bruksvilkaar/", ar: "/ar/terms-of-use/" },
  { fr: "/mentions-legales/", en: "/en/legal-notice/", it: "/it/note-legali/", nl: "/nl/wettelijke-vermeldingen/", es: "/es/aviso-legal/", no: "/no/juridisk-merknad/", ar: "/ar/legal-notice/" },
  {
    fr: "/blog/acheter-villa-sur-plan-marrakech/",
    en: "/en/blog/buying-off-plan-villa-marrakech/",
    es: "/es/blog/comprar-villa-sobre-plano-marrakech/",
    it: "/it/blog/acquistare-villa-su-progetto-marrakech/",
    nl: "/nl/blog/nieuwbouwvilla-kopen-marrakech/",
    no: "/no/blogg/kjope-nybyggvilla-marrakech/",
  },
  {
    fr: "/blog/investir-immobilier-luxe-marrakech/",
    en: "/en/blog/luxury-real-estate-investment-marrakech/",
    es: "/es/blog/invertir-inmobiliario-lujo-marrakech/",
    it: "/it/blog/investire-immobiliare-di-lusso-marrakech/",
    nl: "/nl/blog/investeren-luxe-vastgoed-marrakech/",
    no: "/no/blogg/investere-luksus-eiendom-marrakech/",
  },
  {
    fr: "/blog/adresses-immobilier-marrakech/",
    en: "/en/blog/best-addresses-real-estate-marrakech/",
    es: "/es/blog/mejores-zonas-inmobiliarias-marrakech/",
    it: "/it/blog/indirizzi-immobiliari-marrakech/",
    nl: "/nl/blog/beste-adressen-vastgoed-marrakech/",
    no: "/no/blogg/beste-omrader-eiendom-marrakech/",
  },
  {
    fr: "/blog/off-market-marrakech-biens-confidentiels/",
    en: "/en/blog/off-market-properties-marrakech/",
    es: "/es/blog/inmuebles-off-market-marrakech/",
    it: "/it/blog/immobili-off-market-marrakech/",
    nl: "/nl/blog/off-market-vastgoed-marrakech/",
    no: "/no/blogg/off-market-eiendom-marrakech/",
  },
  {
    fr: "/blog/appartement-hypercentre-gueliz-marrakech/",
    en: "/en/blog/apartment-hypercentre-gueliz-marrakech/",
    es: "/es/blog/apartamento-centro-gueliz-marrakech/",
    it: "/it/blog/appartamento-centro-gueliz-marrakech/",
    nl: "/nl/blog/appartement-hypercentre-gueliz-marrakech/",
    no: "/no/blogg/leilighet-sentrum-gueliz-marrakech/",
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
    ...(group.es ? { "es-ES": `${SITE_URL}${group.es}` } : {}),
    ...(group.no ? { "nb-NO": `${SITE_URL}${group.no}` } : {}),
    ...(group.ar ? { "ar-MA": `${SITE_URL}${group.ar}` } : {}),
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
    icons: SITE_ICONS,
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
    `${SITE_URL}/assets/offmarket/hero/offmarket-hero-poster.jpg`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(seo.canonicalPath),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    icons: SITE_ICONS,
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
