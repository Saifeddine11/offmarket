import type { Metadata, Viewport } from "next";
import {
  getPageContent,
  type HomepagePageId,
} from "@/lib/content/pages";
import type { PageContent } from "@/lib/content/types";
import { SITE_URL } from "@/lib/legacy/routes";
import {
  buildPageContentMetadata,
  buildPageContentViewport,
} from "@/components/pages/PageContentShell";

export type HomepageLocale = "root" | "fr" | "en" | "it" | "nl" | "es" | "no";

const LOCALE_PAGE_IDS: Record<HomepageLocale, HomepagePageId> = {
  root: "home-root",
  fr: "home-fr",
  en: "home-en",
  it: "home-it",
  nl: "home-nl",
  es: "home-root",
  no: "home-root",
};

const GENERATED_HOME_META: Partial<Record<HomepageLocale, Partial<PageContent>>> = {
  es: {
    htmlLang: "es",
    title: "OFF MARKET Marrakech | Inmobiliaria privada y propiedades selectas",
    description:
      "Acceda a una selección confidencial de villas, apartamentos, proyectos sobre plano y oportunidades off-market en Marrakech, analizadas con método antes de ser presentadas.",
    canonical: `${SITE_URL}/es/`,
    ogTitle: "OFF MARKET Marrakech | Inmobiliaria privada",
    ogDescription:
      "Una selección privada de villas, apartamentos y oportunidades inmobiliarias confidenciales en Marrakech.",
    ogLocale: "es_ES",
    twitterTitle: "OFF MARKET Marrakech | Inmobiliaria privada",
    twitterDescription:
      "Una selección privada de villas, apartamentos y oportunidades inmobiliarias confidenciales en Marrakech.",
  },
  no: {
    htmlLang: "no",
    title: "OFF MARKET Marrakech | Privat eiendom og utvalgte objekter",
    description:
      "Få tilgang til et konfidensielt utvalg av villaer, leiligheter, nybyggprosjekter og off-market muligheter i Marrakech, analysert metodisk før presentasjon.",
    canonical: `${SITE_URL}/no/`,
    ogTitle: "OFF MARKET Marrakech | Privat eiendom",
    ogDescription:
      "Et privat utvalg av villaer, leiligheter og konfidensielle eiendomsmuligheter i Marrakech.",
    ogLocale: "nb_NO",
    twitterTitle: "OFF MARKET Marrakech | Privat eiendom",
    twitterDescription:
      "Et privat utvalg av villaer, leiligheter og konfidensielle eiendomsmuligheter i Marrakech.",
  },
};

const HOMEPAGE_DESCRIPTION: Record<HomepageLocale, string> = {
  root:
    "OFF MARKET PROPERTIES sélectionne des biens privés, villas et programmes sur plan à Marrakech pour une clientèle locale et internationale exigeante.",
  fr: "OFF MARKET PROPERTIES sélectionne des biens privés, villas et programmes sur plan à Marrakech pour une clientèle locale et internationale exigeante.",
  en: "OFF MARKET PROPERTIES selects private homes, villas and off-plan developments in Marrakech for local and international clients seeking discreet guidance.",
  nl: "OFF MARKET PROPERTIES selecteert privéwoningen, villa's en nieuwbouwprojecten in Marrakech voor lokale en internationale klanten die discretie waarderen.",
  it: "OFF MARKET PROPERTIES seleziona immobili privati, ville e progetti su progetto a Marrakech per una clientela locale e internazionale attenta alla discrezione.",
  es: "OFF MARKET PROPERTIES selecciona propiedades privadas, villas y proyectos sobre plano en Marrakech para clientes locales e internacionales exigentes.",
  no: "OFF MARKET PROPERTIES velger private eiendommer, villaer og nybyggprosjekter i Marrakech for lokale og internasjonale kunder som verdsetter diskresjon.",
};

const HOMEPAGE_SOCIAL_IMAGE = `${SITE_URL}/assets/images/social/offmarket-home-1200x630.jpg`;

const HOMEPAGE_SOCIAL_ALT: Record<HomepageLocale, string> = {
  root: "Cour intérieure avec piscine d'une propriété OFF MARKET PROPERTIES à Marrakech",
  fr: "Cour intérieure avec piscine d'une propriété OFF MARKET PROPERTIES à Marrakech",
  en: "Courtyard pool at an OFF MARKET PROPERTIES residence in Marrakech",
  nl: "Binnenplaats met zwembad van een OFF MARKET PROPERTIES-woning in Marrakech",
  it: "Cortile con piscina di una proprietà OFF MARKET PROPERTIES a Marrakech",
  es: "Patio con piscina de una propiedad OFF MARKET PROPERTIES en Marrakech",
  no: "Gårdsrom med basseng i en OFF MARKET PROPERTIES-eiendom i Marrakech",
};

export function getHomepagePageId(locale: HomepageLocale): HomepagePageId {
  return LOCALE_PAGE_IDS[locale];
}

export function getHomepageContent(locale: HomepageLocale): PageContent {
  const content = getPageContent(getHomepagePageId(locale));
  const generatedMeta = GENERATED_HOME_META[locale];
  const description = HOMEPAGE_DESCRIPTION[locale];

  return {
    ...content,
    ...generatedMeta,
    description,
    ogDescription: description,
    twitterDescription: description,
  };
}

export function buildHomepageMetadata(locale: HomepageLocale): Metadata {
  const metadata = buildPageContentMetadata(getHomepageContent(locale));
  const alt = HOMEPAGE_SOCIAL_ALT[locale];

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [
        {
          url: HOMEPAGE_SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt,
        },
      ],
    },
    twitter: {
      ...metadata.twitter,
      images: [
        {
          url: HOMEPAGE_SOCIAL_IMAGE,
          alt,
        },
      ],
    },
  };
}

export function buildHomepageViewport(locale: HomepageLocale): Viewport {
  return buildPageContentViewport(getHomepageContent(locale));
}
