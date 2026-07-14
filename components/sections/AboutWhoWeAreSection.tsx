import Link from "next/link";

import { AboutWhoVideo } from "./AboutWhoVideo";
import type { SiteLocale } from "@/lib/i18n/types";

const CTA_ICON = (
  <span className="om-button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

/** About page “Qui sommes-nous” — left editorial copy + simple video. */
const ABOUT_WHO_COPY = {
  fr: {
    eyebrow: "QUI SOMMES-NOUS",
    title:
      "Une maison privée pour lire le marché immobilier de Marrakech avec exigence.",
    lead:
      "OFF MARKET accompagne les acheteurs, investisseurs et propriétaires avec une sélection ciblée, une analyse claire et un accès discret aux opportunités pertinentes.",
    chipsLabel: "Notre approche",
    chips: ["Sélection ciblée", "Analyse claire", "Accompagnement discret"],
    cta: "Découvrir notre approche",
    href: "/off-market/",
  },
  en: {
    eyebrow: "WHO WE ARE",
    title:
      "A private house for reading Marrakech real estate with rigour.",
    lead:
      "OFF MARKET supports buyers, investors and owners with a targeted selection, clear analysis and discreet access to relevant opportunities.",
    chipsLabel: "Our approach",
    chips: ["Targeted selection", "Clear analysis", "Discreet support"],
    cta: "Discover our approach",
    href: "/en/off-market/",
  },
  it: {
    eyebrow: "CHI SIAMO",
    title:
      "Una maison privata per leggere il mercato immobiliare di Marrakech con rigore.",
    lead:
      "OFF MARKET accompagna acquirenti, investitori e proprietari con una selezione mirata, un'analisi chiara e un accesso discreto alle opportunità pertinenti.",
    chipsLabel: "Il nostro approccio",
    chips: ["Selezione mirata", "Analisi chiara", "Accompagnamento discreto"],
    cta: "Scopri il nostro approccio",
    href: "/it/off-market/",
  },
  nl: {
    eyebrow: "WIE ZIJN WIJ",
    title:
      "Een private speler die de vastgoedmarkt van Marrakech met zorg leest.",
    lead:
      "OFF MARKET begeleidt kopers, investeerders en eigenaars met een gerichte selectie, heldere analyse en discrete toegang tot relevante kansen.",
    chipsLabel: "Onze aanpak",
    chips: ["Gerichte selectie", "Heldere analyse", "Discrete begeleiding"],
    cta: "Ontdek onze aanpak",
    href: "/nl/off-market/",
  },
} satisfies Record<SiteLocale, {
  eyebrow: string;
  title: string;
  lead: string;
  chipsLabel: string;
  chips: string[];
  cta: string;
  href: string;
}>;

export function AboutWhoWeAreSection({ locale = "fr" }: { locale?: SiteLocale }) {
  const copy = ABOUT_WHO_COPY[locale] ?? ABOUT_WHO_COPY.fr;
  return (
    <section
      className="about-who mav-who light-section"
      id="about-qui-sommes-nous"
      aria-labelledby="mav-who-title"
      data-scroll-section
      data-reveal-section
      data-no-word-reveal
    >
      <div className="about-who__inner">
        <div className="about-who__content">
          <p className="about-who__eyebrow mav-reveal-item">{copy.eyebrow}</p>

          <h2 className="about-who__title" id="mav-who-title">
            {copy.title}
          </h2>

          <p className="about-who__lead">
            {copy.lead}
          </p>

          <div
            className="about-who__chips mav-reveal-item"
            aria-label={copy.chipsLabel}
          >
            {copy.chips.map((chip) => (
              <span key={chip} className="about-who__chip">
                {chip}
              </span>
            ))}
          </div>

          <Link
            className="om-cta om-button om-button--dark about-who__cta mav-reveal-item"
            href={copy.href}
          >
            {CTA_ICON}
            <span>{copy.cta}</span>
          </Link>
        </div>

        <div className="about-who__aside about-video-wrapper mav-reveal-item">
          <AboutWhoVideo locale={locale} />
        </div>
      </div>
    </section>
  );
}
