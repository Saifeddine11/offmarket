import type { SiteLocale } from "@/lib/i18n/types";

export type ChromeNavItem = { label: string; href: string };

export type ChromeCopy = {
  homeHref: string;
  accessHref: string;
  accessLabel: string;
  menuAria: string;
  mainNavAria: string;
  chooseLanguageAria: string;
  menuTagline: string;
  placeholderNav: ChromeNavItem[];
  openMenuPrefix: string;
  showPrefix: string;
};

const FR: ChromeCopy = {
  homeHref: "/",
  accessHref: "/off-market/",
  accessLabel: "Demander l'accès",
  menuAria: "Menu",
  mainNavAria: "Navigation principale",
  chooseLanguageAria: "Choisir la langue",
  menuTagline: "Immobilier privé à Marrakech",
  placeholderNav: [
    { label: "Accueil", href: "/" },
    { label: "Sur plan", href: "/sur-plan/" },
    { label: "Simulateur", href: "/simulateur/" },
    { label: "Contact", href: "/contact/" },
  ],
  openMenuPrefix: "Ouvrir le menu ",
  showPrefix: "Afficher ",
};

const EN: ChromeCopy = {
  homeHref: "/en/",
  accessHref: "/en/off-market/",
  accessLabel: "Request access",
  menuAria: "Menu",
  mainNavAria: "Main navigation",
  chooseLanguageAria: "Choose language",
  menuTagline: "Private real estate in Marrakech",
  placeholderNav: [
    { label: "Home", href: "/en/" },
    { label: "Off-plan", href: "/en/off-plan/" },
    { label: "Simulator", href: "/simulateur/" },
    { label: "Contact", href: "/en/contact/" },
  ],
  openMenuPrefix: "Open menu ",
  showPrefix: "Show ",
};

const IT: ChromeCopy = {
  homeHref: "/it/",
  accessHref: "/it/off-market/",
  accessLabel: "Richiedi accesso",
  menuAria: "Menu",
  mainNavAria: "Navigazione principale",
  chooseLanguageAria: "Scegli la lingua",
  menuTagline: "Immobiliare privato a Marrakech",
  placeholderNav: [
    { label: "Home", href: "/it/" },
    { label: "Progetti su piano", href: "/it/progetti-su-piano/" },
    { label: "Simulatore", href: "/simulateur/" },
    { label: "Contatto", href: "/it/contatto/" },
  ],
  openMenuPrefix: "Apri menu ",
  showPrefix: "Mostra ",
};

const COPY: Record<SiteLocale, ChromeCopy> = {
  fr: FR,
  en: EN,
  it: IT,
  nl: FR,
};

export function getChromeCopy(locale?: SiteLocale): ChromeCopy {
  return COPY[locale ?? "fr"];
}
