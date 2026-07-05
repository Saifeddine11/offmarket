import type { PageContent, PageMetadata } from "@/lib/content/types";

import blogAcheterVilla from "@/content/pages/blog-acheter-villa-sur-plan-marrakech.json";
import blogAdresses from "@/content/pages/blog-adresses-immobilier-marrakech.json";
import blogAppartement from "@/content/pages/blog-appartement-hypercentre-gueliz-marrakech.json";
import blogIndex from "@/content/pages/blog-index.json";
import blogInvestir from "@/content/pages/blog-investir-immobilier-luxe-marrakech.json";
import blogOffMarket from "@/content/pages/blog-off-market-marrakech-biens-confidentiels.json";
import contactEn from "@/content/pages/contact-en.json";
import contactFr from "@/content/pages/contact-fr.json";
import contactIt from "@/content/pages/contact-it.json";
import contactNl from "@/content/pages/contact-nl.json";
import homeEn from "@/content/pages/home-en.json";
import homeFr from "@/content/pages/home-fr.json";
import homeIt from "@/content/pages/home-it.json";
import homeNl from "@/content/pages/home-nl.json";
import homeRoot from "@/content/pages/home-root.json";
import location from "@/content/pages/location.json";
import nieuwbouwNl from "@/content/pages/nieuwbouw-nl.json";
import offPlanEn from "@/content/pages/off-plan-en.json";
import progettiIt from "@/content/pages/progetti-it.json";
import surPlan from "@/content/pages/sur-plan.json";
import surPlanFr from "@/content/pages/sur-plan-fr.json";

export type PageId =
  | "home-root"
  | "home-fr"
  | "home-en"
  | "home-it"
  | "home-nl"
  | "blog-index"
  | "blog-acheter-villa-sur-plan-marrakech"
  | "blog-investir-immobilier-luxe-marrakech"
  | "blog-adresses-immobilier-marrakech"
  | "blog-off-market-marrakech-biens-confidentiels"
  | "blog-appartement-hypercentre-gueliz-marrakech"
  | "location"
  | "sur-plan"
  | "sur-plan-fr"
  | "off-plan-en"
  | "progetti-it"
  | "nieuwbouw-nl";

export type ContactPageId = "contact-fr" | "contact-en" | "contact-it" | "contact-nl";

export type HomepagePageId =
  | "home-root"
  | "home-fr"
  | "home-en"
  | "home-it"
  | "home-nl";

const PAGE_CONTENT: Record<PageId, PageContent> = {
  "home-root": homeRoot as PageContent,
  "home-fr": homeFr as PageContent,
  "home-en": homeEn as PageContent,
  "home-it": homeIt as PageContent,
  "home-nl": homeNl as PageContent,
  "blog-index": blogIndex as PageContent,
  "blog-acheter-villa-sur-plan-marrakech":
    blogAcheterVilla as PageContent,
  "blog-investir-immobilier-luxe-marrakech": blogInvestir as PageContent,
  "blog-adresses-immobilier-marrakech": blogAdresses as PageContent,
  "blog-off-market-marrakech-biens-confidentiels":
    blogOffMarket as PageContent,
  "blog-appartement-hypercentre-gueliz-marrakech":
    blogAppartement as PageContent,
  location: location as PageContent,
  "sur-plan": surPlan as PageContent,
  "sur-plan-fr": surPlanFr as PageContent,
  "off-plan-en": offPlanEn as PageContent,
  "progetti-it": progettiIt as PageContent,
  "nieuwbouw-nl": nieuwbouwNl as PageContent,
};

const CONTACT_METADATA: Record<ContactPageId, PageMetadata> = {
  "contact-fr": contactFr as PageMetadata,
  "contact-en": contactEn as PageMetadata,
  "contact-it": contactIt as PageMetadata,
  "contact-nl": contactNl as PageMetadata,
};

export function getPageContent(id: PageId): PageContent {
  return PAGE_CONTENT[id];
}

export function getPageMetadata(id: ContactPageId): PageMetadata {
  return CONTACT_METADATA[id];
}

export function metadataToPageContent(meta: PageMetadata): PageContent {
  return {
    ...meta,
    stylesheets: [],
    headInlineStyle: null,
    preconnects: [],
    manifestHref: null,
    bodyClass: "",
    headInlineStyles: [],
    headInitScript: null,
    headJsonLdScripts: [],
    bodySegments: [],
  };
}
