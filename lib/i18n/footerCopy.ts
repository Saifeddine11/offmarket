import type { SiteLocale } from "@/lib/i18n/types";

export type FooterCopy = {
  brandLabel: string;
  tagline: string;
  navLabel: string;
  contactLabel: string;
  home: string;
  ourStory: string;
  offPlan: string;
  simulator: string;
  contact: string;
  location: string;
  rights: string;
  legal: string;
  homeHref: string;
  aboutHref: string;
  offPlanHref: string;
  simulatorHref: string;
  contactHref: string;
  privacyHref: string;
};

const FR: FooterCopy = {
  brandLabel: "Maison OFF MARKET",
  tagline: "Sélection privée d'opportunités immobilières à Marrakech.",
  navLabel: "Navigation",
  contactLabel: "Contact",
  home: "Accueil",
  ourStory: "Notre Histoire",
  offPlan: "Sur plan",
  simulator: "Simulateur",
  contact: "Contact",
  location: "Marrakech, Maroc",
  rights: "Tous droits réservés.",
  legal: "Mentions légales",
  homeHref: "/",
  aboutHref: "/about/",
  offPlanHref: "/sur-plan/",
  simulatorHref: "/simulateur/",
  contactHref: "/contact/",
  privacyHref: "/privacy-policy/",
};

const EN: FooterCopy = {
  brandLabel: "Maison OFF MARKET",
  tagline: "A private selection of real estate opportunities in Marrakech.",
  navLabel: "Navigation",
  contactLabel: "Contact",
  home: "Home",
  ourStory: "Our story",
  offPlan: "Off-plan",
  simulator: "Simulator",
  contact: "Contact",
  location: "Marrakech, Morocco",
  rights: "All rights reserved.",
  legal: "Legal notice",
  homeHref: "/en/",
  aboutHref: "/en/",
  offPlanHref: "/en/off-plan/",
  simulatorHref: "/simulateur/",
  contactHref: "/en/contact/",
  privacyHref: "/privacy-policy/",
};

const IT: FooterCopy = {
  brandLabel: "Maison OFF MARKET",
  tagline: "Selezione privata di opportunità immobiliari a Marrakech.",
  navLabel: "Navigazione",
  contactLabel: "Contatto",
  home: "Home",
  ourStory: "La nostra storia",
  offPlan: "Progetti su piano",
  simulator: "Simulatore",
  contact: "Contatto",
  location: "Marrakech, Marocco",
  rights: "Tutti i diritti riservati.",
  legal: "Note legali",
  homeHref: "/it/",
  aboutHref: "/it/",
  offPlanHref: "/it/progetti-su-piano/",
  simulatorHref: "/simulateur/",
  contactHref: "/it/contatto/",
  privacyHref: "/privacy-policy/",
};

const COPY: Record<SiteLocale, FooterCopy> = {
  fr: FR,
  en: EN,
  it: IT,
  nl: FR,
};

export function getFooterCopy(locale?: SiteLocale): FooterCopy {
  return COPY[locale ?? "fr"];
}
