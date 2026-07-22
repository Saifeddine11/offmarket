import type { SiteLocale } from "@/lib/i18n/types";

export type ChromeNavItem = { label: string; href: string };

export type ChromeCopy = {
  homeHref: string;
  accessHref: string;
  accessLabel: string;
  menuAria: string;
  mainNavAria: string;
  languageLabel: string;
  chooseLanguageAria: string;
  menuTagline: string;
  placeholderNav: ChromeNavItem[];
  openMenuPrefix: string;
  showPrefix: string;
};

const FR: ChromeCopy = {
  homeHref: "/",
  accessHref: "/contact/",
  accessLabel: "Demander l'accès",
  menuAria: "Menu",
  mainNavAria: "Navigation principale",
  languageLabel: "Langue",
  chooseLanguageAria: "Choisir la langue",
  menuTagline: "Immobilier privé à Marrakech",
  placeholderNav: [
    { label: "Accueil", href: "/" },
    { label: "Notre Histoire", href: "/about/" },
    { label: "Quartiers", href: "/quartiers/" },
    { label: "Nos Projets", href: "/nos-projets/" },
    { label: "Off-market", href: "/off-market/" },
    { label: "Simulateur", href: "/simulateur/" },
    { label: "Contact", href: "/contact/" },
  ],
  openMenuPrefix: "Ouvrir le menu ",
  showPrefix: "Afficher ",
};

const EN: ChromeCopy = {
  homeHref: "/en/",
  accessHref: "/en/contact/",
  accessLabel: "Request access",
  menuAria: "Menu",
  mainNavAria: "Main navigation",
  languageLabel: "Language",
  chooseLanguageAria: "Choose language",
  menuTagline: "Private real estate in Marrakech",
  placeholderNav: [
    { label: "Home", href: "/en/" },
    { label: "Our Story", href: "/en/about/" },
    { label: "Neighbourhoods", href: "/en/neighbourhoods/" },
    { label: "Our Projects", href: "/en/projects/" },
    { label: "Off-market", href: "/en/off-market/" },
    { label: "Simulator", href: "/en/simulator/" },
    { label: "Contact", href: "/en/contact/" },
  ],
  openMenuPrefix: "Open menu ",
  showPrefix: "Show ",
};

const IT: ChromeCopy = {
  homeHref: "/it/",
  accessHref: "/it/contatto/",
  accessLabel: "Richiedi accesso",
  menuAria: "Menu",
  mainNavAria: "Navigazione principale",
  languageLabel: "Lingua",
  chooseLanguageAria: "Scegli la lingua",
  menuTagline: "Immobiliare privato a Marrakech",
  placeholderNav: [
    { label: "Home", href: "/it/" },
    { label: "La nostra storia", href: "/it/chi-siamo/" },
    { label: "Quartieri", href: "/it/quartieri/" },
    { label: "Progetti", href: "/it/progetti/" },
    { label: "Off-market", href: "/it/off-market/" },
    { label: "Simulatore", href: "/it/simulatore/" },
    { label: "Contatto", href: "/it/contatto/" },
  ],
  openMenuPrefix: "Apri menu ",
  showPrefix: "Mostra ",
};

const NL: ChromeCopy = {
  homeHref: "/nl/",
  accessHref: "/nl/contact/",
  accessLabel: "Toegang aanvragen",
  menuAria: "Menu",
  mainNavAria: "Hoofdnavigatie",
  languageLabel: "Taal",
  chooseLanguageAria: "Taal kiezen",
  menuTagline: "Privévastgoed in Marrakech",
  placeholderNav: [
    { label: "Home", href: "/nl/" },
    { label: "Ons verhaal", href: "/nl/over-ons/" },
    { label: "Wijken", href: "/nl/wijken/" },
    { label: "Onze projecten", href: "/nl/projecten/" },
    { label: "Off-market", href: "/nl/off-market/" },
    { label: "Simulator", href: "/nl/simulator/" },
    { label: "Contact", href: "/nl/contact/" },
  ],
  openMenuPrefix: "Menu openen ",
  showPrefix: "Toon ",
};

const COPY: Record<SiteLocale, ChromeCopy> = {
  fr: FR,
  en: EN,
  it: IT,
  nl: NL,
};

export function getChromeCopy(locale?: SiteLocale): ChromeCopy {
  return COPY[locale ?? "fr"];
}
