import type { PageContent } from "@/lib/content/types";
import type { PageId } from "@/lib/content/pages";
import type { SiteLocale } from "@/lib/i18n/types";
import { SITE_URL } from "@/lib/legacy/routes";

type LocalizedBlogMeta = {
  slug: string;
  title: string;
  description: string;
  ogTitle: string;
};

const BLOG_INDEX_META = {
  en: {
    title: "Marrakech real estate blog — OFF MARKET",
    description:
      "Private analyses on luxury real estate in Marrakech, off-plan projects, investment, Guéliz, Hivernage and off-market properties.",
    ogTitle: "Marrakech real estate blog — OFF MARKET",
    canonical: "/en/blog/",
    ogLocale: "en_US",
  },
  nl: {
    title: "Vastgoedblog Marrakech — OFF MARKET",
    description:
      "Private analyses over luxevastgoed in Marrakech, nieuwbouwprojecten, investeringen, Guéliz, Hivernage en off-market panden.",
    ogTitle: "Vastgoedblog Marrakech — OFF MARKET",
    canonical: "/nl/blog/",
    ogLocale: "nl_NL",
  },
} satisfies Record<"en" | "nl", {
  title: string;
  description: string;
  ogTitle: string;
  canonical: string;
  ogLocale: string;
}>;

const ARTICLE_META: Record<
  "en" | "nl",
  Partial<Record<PageId, LocalizedBlogMeta>>
> = {
  en: {
    "blog-acheter-villa-sur-plan-marrakech": {
      slug: "buying-off-plan-villa-marrakech",
      title: "Buying an off-plan villa in Marrakech — OFF MARKET",
      description:
        "What to check before reserving an off-plan villa in Marrakech: developer, schedule, payments and quality of outdoor spaces.",
      ogTitle: "Buying an off-plan villa in Marrakech",
    },
    "blog-investir-immobilier-luxe-marrakech": {
      slug: "luxury-real-estate-investment-marrakech",
      title: "Investing in luxury real estate in Marrakech — OFF MARKET",
      description:
        "The areas to monitor before investing in luxury real estate in Marrakech: address, rental demand, liquidity and long-term value.",
      ogTitle: "Investing in luxury real estate in Marrakech",
    },
    "blog-adresses-immobilier-marrakech": {
      slug: "best-addresses-real-estate-marrakech",
      title: "Guéliz, Hivernage, Amelkis — Understanding Marrakech addresses",
      description:
        "Understand the Marrakech addresses that gain value: Guéliz, Hivernage, Amelkis, buyer profiles, rarity and future demand.",
      ogTitle: "Understanding the Marrakech addresses that gain value",
    },
    "blog-off-market-marrakech-biens-confidentiels": {
      slug: "off-market-properties-marrakech",
      title: "Why some Marrakech properties are never published online",
      description:
        "Why many premium properties in Marrakech stay off-market: discretion, qualified access, sensitive negotiations and confidential addresses.",
      ogTitle: "Why some Marrakech properties are never published online",
    },
    "blog-appartement-hypercentre-gueliz-marrakech": {
      slug: "apartment-hypercentre-gueliz-marrakech",
      title: "Apartment in the hyper-centre — Why location remains the first filter",
      description:
        "Why immediate location remains the first filter for an apartment in Guéliz hyper-centre: access, noise, uses, liquidity and resale.",
      ogTitle: "Apartment in the hyper-centre: why location remains the first filter",
    },
  },
  nl: {
    "blog-acheter-villa-sur-plan-marrakech": {
      slug: "nieuwbouwvilla-kopen-marrakech",
      title: "Een nieuwbouwvilla kopen in Marrakech — OFF MARKET",
      description:
        "Wat u moet controleren voordat u een nieuwbouwvilla in Marrakech reserveert: ontwikkelaar, planning, betalingen en kwaliteit van buitenruimtes.",
      ogTitle: "Een nieuwbouwvilla kopen in Marrakech",
    },
    "blog-investir-immobilier-luxe-marrakech": {
      slug: "investeren-luxe-vastgoed-marrakech",
      title: "Investeren in luxevastgoed in Marrakech — OFF MARKET",
      description:
        "De zones om te volgen voordat u in luxevastgoed in Marrakech investeert: adres, huurvraag, liquiditeit en vermogenswaarde.",
      ogTitle: "Investeren in luxevastgoed in Marrakech",
    },
    "blog-adresses-immobilier-marrakech": {
      slug: "beste-adressen-vastgoed-marrakech",
      title: "Guéliz, Hivernage, Amelkis — Adressen in Marrakech begrijpen",
      description:
        "Begrijp de adressen in Marrakech die in waarde toenemen: Guéliz, Hivernage, Amelkis, kopersprofielen, schaarste en toekomstige vraag.",
      ogTitle: "Adressen in Marrakech begrijpen die in waarde toenemen",
    },
    "blog-off-market-marrakech-biens-confidentiels": {
      slug: "off-market-vastgoed-marrakech",
      title: "Waarom sommige panden in Marrakech nooit online verschijnen",
      description:
        "Waarom veel premium vastgoed in Marrakech off-market blijft: discretie, gekwalificeerde toegang, gevoelige onderhandelingen en vertrouwelijke adressen.",
      ogTitle: "Waarom sommige panden in Marrakech nooit online verschijnen",
    },
    "blog-appartement-hypercentre-gueliz-marrakech": {
      slug: "appartement-hypercentre-gueliz-marrakech",
      title: "Appartement in het hypercentrum — Waarom ligging de eerste filter blijft",
      description:
        "Waarom de onmiddellijke ligging de eerste filter blijft voor een appartement in het hypercentrum van Guéliz: toegang, geluid, gebruik, liquiditeit en herverkoop.",
      ogTitle: "Appartement in het hypercentrum: waarom ligging de eerste filter blijft",
    },
  },
};

function withSite(path: string): string {
  return `${SITE_URL}${path}`;
}

function replaceJsonLdUrl(json: string, from: RegExp | string, to: string): string {
  return json.replace(from, to);
}

export function localizeBlogIndexContent(
  content: PageContent,
  locale: Extract<SiteLocale, "en" | "nl">,
): PageContent {
  const meta = BLOG_INDEX_META[locale];
  return {
    ...content,
    htmlLang: locale,
    title: meta.title,
    description: meta.description,
    canonical: withSite(meta.canonical),
    ogTitle: meta.ogTitle,
    ogDescription: meta.description,
    ogLocale: meta.ogLocale,
    twitterTitle: meta.ogTitle,
    twitterDescription: meta.description,
    headJsonLdScripts: content.headJsonLdScripts.map((json) =>
      replaceJsonLdUrl(json, `${SITE_URL}/blog/`, withSite(meta.canonical)),
    ),
  };
}

export function localizeBlogArticleContent(
  content: PageContent,
  locale: Extract<SiteLocale, "en" | "nl">,
  pageId: PageId,
): PageContent {
  const meta = ARTICLE_META[locale][pageId];
  if (!meta) return content;
  const canonicalPath = `/${locale}/blog/${meta.slug}/`;
  return {
    ...content,
    htmlLang: locale,
    title: meta.title,
    description: meta.description,
    canonical: withSite(canonicalPath),
    ogTitle: meta.ogTitle,
    ogDescription: meta.description,
    ogLocale: locale === "en" ? "en_US" : "nl_NL",
    twitterTitle: meta.ogTitle,
    twitterDescription: meta.description,
    headJsonLdScripts: content.headJsonLdScripts.map((json) =>
      replaceJsonLdUrl(
        json,
        /https:\/\/offmarketofficial\.com\/blog\/[^"]+\//g,
        withSite(canonicalPath),
      ),
    ),
  };
}
