export { SITE_URL, PRODUCTION_URLS, SITEMAP_URLS } from "@/lib/legacy/routes";

export const LANG_LINKS = {
  home: { en: "/en/", fr: "/", it: "/it/", nl: "/nl/" },
  about: { en: "/en/about/", fr: "/about/", it: "/it/chi-siamo/", nl: "/nl/over-ons/" },
  frAbout: { en: "/en/about/", fr: "/about/", it: "/it/chi-siamo/", nl: "/nl/over-ons/" },
  quartiers: { en: "/en/neighbourhoods/", fr: "/quartiers/", it: "/it/quartieri/", nl: "/nl/wijken/" },
  nosProjets: { en: "/en/projects/", fr: "/nos-projets/", it: "/it/progetti/", nl: "/nl/projecten/" },
  offPlan: {
    en: "/en/off-plan/",
    fr: "/sur-plan/",
    it: "/it/progetti-su-piano/",
    nl: "/nl/nieuwbouw/",
  },
  offMarket: {
    en: "/en/off-market/",
    fr: "/off-market/",
    it: "/it/off-market/",
    nl: "/nl/off-market/",
  },
  villaJaz: {
    en: "/en/off-plan/villa-jaz/",
    fr: "/sur-plan/villa-jaz/",
    it: "/it/progetti-su-piano/villa-jaz/",
    nl: "/nl/nieuwbouw/villa-jaz/",
  },
  simulator: {
    en: "/en/simulator/",
    fr: "/simulateur/",
    it: "/it/simulatore/",
    nl: "/nl/simulator/",
  },
  blog: {
    en: "/en/blog/",
    fr: "/blog/",
    it: "/it/blog/",
    nl: "/nl/blog/",
  },
  privacy: {
    en: "/en/privacy-policy/",
    fr: "/privacy-policy/",
    it: "/it/privacy-policy/",
    nl: "/nl/privacybeleid/",
  },
  contact: {
    en: "/en/contact/",
    fr: "/contact/",
    it: "/it/contatto/",
    nl: "/nl/contact/",
  },
} as const;
