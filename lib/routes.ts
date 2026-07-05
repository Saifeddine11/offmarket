export { SITE_URL, PRODUCTION_URLS, SITEMAP_URLS } from "@/lib/legacy/routes";

export const LANG_LINKS = {
  home: { en: "/en/", fr: "/fr/", it: "/it/", nl: "/nl/" },
  about: { en: "/en/", fr: "/about/", it: "/it/", nl: "/nl/" },
  frAbout: { en: "/en/", fr: "/fr/about/", it: "/it/", nl: "/nl/" },
  quartiers: { en: "/en/", fr: "/quartiers/", it: "/it/", nl: "/nl/" },
  nosProjets: { en: "/en/", fr: "/nos-projets/", it: "/it/", nl: "/nl/" },
  offPlan: {
    en: "/en/off-plan/",
    fr: "/fr/sur-plan/",
    it: "/it/progetti-su-piano/",
    nl: "/nl/nieuwbouw/",
  },
  offMarket: {
    en: "/en/off-market/",
    fr: "/off-market/",
    it: "/it/off-market/",
    nl: "/off-market/",
  },
  contact: {
    en: "/en/contact/",
    fr: "/fr/contact/",
    it: "/it/contatto/",
    nl: "/nl/contact/",
  },
} as const;
