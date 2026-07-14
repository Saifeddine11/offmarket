import type { SiteLocale } from "@/lib/i18n/types";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterCopy = {
  brandHeadline: string;
  brandSupport: string;
  newsletterTitle: string;
  newsletterText: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  newsletterSuccess: string;
  navTitle: string;
  navLinks: FooterLink[];
  immobilierTitle: string;
  immobilierLinks: FooterLink[];
  ctaStatement: string;
  ctaButton: string;
  ctaHref: string;
  addressTitle: string;
  addressLine: string;
  addressNote: string;
  email: string;
  rights: string;
  privacy: string;
  terms: string;
  legal: string;
  privacyHref: string;
  termsHref: string;
  legalHref: string;
  logoAlt: string;
  logoHref: string;
};

const FR: FooterCopy = {
  brandHeadline: "Immobilier privé à Marrakech.",
  brandSupport:
    "Une sélection confidentielle de villas, appartements, projets sur plan et opportunités off-market.",
  newsletterTitle: "Recevoir les opportunités privées",
  newsletterText: "Soyez informé des nouveaux projets sélectionnés à Marrakech.",
  newsletterPlaceholder: "votre@email.com",
  newsletterButton: "S'inscrire",
  newsletterSuccess: "Votre demande d'inscription est prête dans votre messagerie.",
  navTitle: "Navigation",
  navLinks: [
    { label: "Accueil", href: "/" },
    { label: "Notre Histoire", href: "/about/" },
    { label: "Quartiers", href: "/quartiers/" },
    { label: "Nos Projets", href: "/nos-projets/" },
    { label: "Sur plan", href: "/sur-plan/" },
    { label: "Contact", href: "/contact/" },
  ],
  immobilierTitle: "Immobilier",
  immobilierLinks: [
    { label: "Off-market", href: "/off-market/" },
    { label: "Villas à Marrakech", href: "/nos-projets/" },
    { label: "Appartements à Marrakech", href: "/nos-projets/" },
    { label: "Acheter sur plan", href: "/sur-plan/" },
    { label: "Simulateur investissement", href: "/simulateur/" },
    { label: "Blog", href: "/blog/" },
  ],
  ctaStatement:
    "Une opportunité rare commence souvent par une conversation privée.",
  ctaButton: "Demander l'accès",
  ctaHref: "/contact/",
  addressTitle: "OFF MARKET Marrakech",
  addressLine: "Marrakech, Maroc",
  addressNote: "Accès privé sur demande",
  email: "contact@offmarketofficial.com",
  rights: "Tous droits réservés.",
  privacy: "Confidentialité",
  terms: "Conditions",
  legal: "Mentions légales",
  privacyHref: "/privacy-policy/",
  termsHref: "",
  legalHref: "/privacy-policy/",
  logoAlt: "OFF MARKET",
  logoHref: "/",
};

const EN: FooterCopy = {
  ...FR,
  brandHeadline: "Private real estate in Marrakech.",
  brandSupport:
    "A confidential selection of villas, apartments, off-plan projects and off-market opportunities.",
  newsletterTitle: "Receive private opportunities",
  newsletterText: "Be informed of newly selected projects in Marrakech.",
  newsletterPlaceholder: "your@email.com",
  newsletterButton: "Subscribe",
  newsletterSuccess: "Your subscription request is ready in your email app.",
  navTitle: "Navigation",
  navLinks: [
    { label: "Home", href: "/en/" },
    { label: "Our Story", href: "/en/about/" },
    { label: "Neighbourhoods", href: "/en/neighbourhoods/" },
    { label: "Our Projects", href: "/en/projects/" },
    { label: "Off-plan", href: "/en/off-plan/" },
    { label: "Contact", href: "/en/contact/" },
  ],
  immobilierTitle: "Real estate",
  immobilierLinks: [
    { label: "Off-market", href: "/en/off-market/" },
    { label: "Villas in Marrakech", href: "/en/projects/" },
    { label: "Apartments in Marrakech", href: "/en/projects/" },
    { label: "Buy off-plan", href: "/en/off-plan/" },
    { label: "Investment simulator", href: "/en/simulator/" },
    { label: "Blog", href: "/en/blog/" },
  ],
  ctaStatement: "A rare opportunity often begins with a private conversation.",
  ctaButton: "Request access",
  ctaHref: "/en/contact/",
  addressNote: "Private access on request",
  rights: "All rights reserved.",
  privacy: "Privacy",
  terms: "Terms",
  legal: "Legal notice",
  privacyHref: "/en/privacy-policy/",
  legalHref: "/en/privacy-policy/",
  logoHref: "/en/",
};

const IT: FooterCopy = {
  ...FR,
  brandHeadline: "Immobiliare privato a Marrakech.",
  brandSupport:
    "Una selezione riservata di ville, appartamenti, progetti su piano e opportunità off-market.",
  newsletterTitle: "Ricevere le opportunità private",
  newsletterText: "Resta informato sui nuovi progetti selezionati a Marrakech.",
  newsletterPlaceholder: "tua@email.com",
  newsletterButton: "Iscriviti",
  newsletterSuccess: "La tua richiesta di iscrizione è pronta nella tua email.",
  navTitle: "Navigazione",
  navLinks: [
    { label: "Home", href: "/it/" },
    { label: "La nostra storia", href: "/about/" },
    { label: "Quartieri", href: "/quartiers/" },
    { label: "Progetti", href: "/nos-projets/" },
    { label: "Su piano", href: "/it/progetti-su-piano/" },
    { label: "Contatto", href: "/it/contatto/" },
  ],
  immobilierTitle: "Immobiliare",
  immobilierLinks: [
    { label: "Off-market", href: "/it/off-market/" },
    { label: "Ville a Marrakech", href: "/nos-projets/" },
    { label: "Appartamenti a Marrakech", href: "/nos-projets/" },
    { label: "Acquistare su piano", href: "/it/progetti-su-piano/" },
    { label: "Simulatore investimento", href: "/simulateur/" },
    { label: "Blog", href: "/blog/" },
  ],
  ctaStatement:
    "Un'opportunità rara inizia spesso con una conversazione privata.",
  ctaButton: "Richiedi l'accesso",
  ctaHref: "/it/contatto/",
  addressNote: "Accesso privato su richiesta",
  rights: "Tutti i diritti riservati.",
  privacy: "Privacy",
  terms: "Condizioni",
  legal: "Note legali",
};

const NL: FooterCopy = {
  ...FR,
  brandHeadline: "Discreet geselecteerd vastgoed in Marrakech.",
  brandSupport:
    "Een vertrouwelijke selectie van villa's, appartementen, nieuwbouwprojecten en off-market kansen.",
  newsletterTitle: "Ontvang private kansen",
  newsletterText: "Blijf op de hoogte van nieuw geselecteerde projecten in Marrakech.",
  newsletterPlaceholder: "uw@email.com",
  newsletterButton: "Inschrijven",
  newsletterSuccess: "Uw inschrijvingsaanvraag staat klaar in uw e-mailprogramma.",
  navTitle: "Navigatie",
  navLinks: [
    { label: "Home", href: "/nl/" },
    { label: "Ons verhaal", href: "/nl/over-ons/" },
    { label: "Wijken", href: "/nl/wijken/" },
    { label: "Onze projecten", href: "/nl/projecten/" },
    { label: "Nieuwbouw", href: "/nl/nieuwbouw/" },
    { label: "Contact", href: "/nl/contact/" },
  ],
  immobilierTitle: "Vastgoed",
  immobilierLinks: [
    { label: "Off-market", href: "/nl/off-market/" },
    { label: "Villa's in Marrakech", href: "/nl/projecten/" },
    { label: "appartementen in Marrakech", href: "/nl/projecten/" },
    { label: "Nieuwbouw kopen", href: "/nl/nieuwbouw/" },
    { label: "Investeringssimulator", href: "/nl/simulator/" },
    { label: "Blog", href: "/nl/blog/" },
  ],
  ctaStatement: "Een zeldzame kans begint vaak met een privégesprek.",
  ctaButton: "Toegang aanvragen",
  ctaHref: "/nl/contact/",
  addressLine: "Marrakech, Marokko",
  addressNote: "Privétoegang op aanvraag",
  rights: "Alle rechten voorbehouden.",
  privacy: "Privacy",
  terms: "Voorwaarden",
  legal: "Wettelijke vermeldingen",
  privacyHref: "/nl/privacybeleid/",
  legalHref: "/nl/privacybeleid/",
  logoHref: "/nl/",
};

const COPY: Record<SiteLocale, FooterCopy> = {
  fr: FR,
  en: EN,
  it: IT,
  nl: NL,
};

export function getFooterCopy(locale?: SiteLocale): FooterCopy {
  return COPY[locale ?? "fr"];
}
