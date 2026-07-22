import Link from "next/link";

import type { PageFinalCtaSecondaryButton } from "@/components/motion/PageFinalCtaMotion";
import type { SiteLocale } from "@/lib/i18n/types";

const BUTTON_ICON = (
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

const ADVISOR_ICON = (
  <span className="om-button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3v4M16 3v4M4.5 9.5h15"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M6.5 5.5h11a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const CALCULATOR_ICON = (
  <span className="om-button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="M8 7h8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M8 11h2M12 11h2M16 11h2M8 15h2M12 15h2M16 15h2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export type PageFinalCtaCopy = {
  eyebrow: string;
  title: string;
  text: string;
  trust: string;
  primaryHref: string;
  primaryLabel: string;
  simulatorHref: string;
  simulatorLabel: string;
  advisorHref: string;
  advisorLabel: string;
};

const FINAL_CTA_COPY: Record<SiteLocale, PageFinalCtaCopy> = {
  fr: {
    eyebrow: "PARLONS-EN",
    title: "Votre projet mérite une lecture privée.",
    text:
      "Dites-nous ce que vous recherchez. Nous vous répondons avec une sélection ciblée, une analyse claire et un accompagnement discret.",
    trust:
      "Nous qualifions votre demande avant de vous orienter vers les projets les plus cohérents avec votre profil.",
    primaryHref: "/contact/",
    primaryLabel: "Demander un accès privé",
    simulatorHref: "/simulateur/",
    simulatorLabel: "Simulateur",
    advisorHref: "/contact/",
    advisorLabel: "Parler à un conseiller",
  },
  en: {
    eyebrow: "LET'S TALK",
    title: "Your project deserves a private reading.",
    text:
      "Tell us what you are looking for. We will respond with a targeted selection, clear analysis and discreet guidance.",
    trust:
      "We qualify your request before guiding you toward the projects that best match your profile.",
    primaryHref: "/en/contact/",
    primaryLabel: "Request private access",
    simulatorHref: "/en/simulator/",
    simulatorLabel: "Simulator",
    advisorHref: "/en/contact/",
    advisorLabel: "Speak to an adviser",
  },
  it: {
    eyebrow: "PARLIAMONE",
    title: "Il tuo progetto merita una lettura privata.",
    text:
      "Dicci cosa stai cercando. Ti risponderemo con una selezione mirata, un'analisi chiara e un accompagnamento discreto.",
    trust:
      "Qualifichiamo la tua richiesta prima di orientarti verso i progetti più coerenti con il tuo profilo.",
    primaryHref: "/it/contatto/",
    primaryLabel: "Richiedi accesso privato",
    simulatorHref: "/it/simulatore/",
    simulatorLabel: "Simulatore",
    advisorHref: "/it/contatto/",
    advisorLabel: "Parla con un consulente",
  },
  nl: {
    eyebrow: "LATEN WE PRATEN",
    title: "Uw project verdient een private analyse.",
    text:
      "Vertel ons wat u zoekt. Wij antwoorden met een gerichte selectie, heldere analyse en discrete begeleiding.",
    trust:
      "Wij kwalificeren uw aanvraag voordat we u begeleiden naar de projecten die het beste bij uw profiel passen.",
    primaryHref: "/nl/contact/",
    primaryLabel: "Private toegang aanvragen",
    simulatorHref: "/nl/simulator/",
    simulatorLabel: "Simulator",
    advisorHref: "/nl/contact/",
    advisorLabel: "Met een adviseur spreken",
  },
};

export function getFinalCtaCopy(locale: SiteLocale = "fr"): PageFinalCtaCopy {
  return FINAL_CTA_COPY[locale];
}

/** Shared closing CTA for inner editorial pages (About, Quartiers, …). */
export function PageFinalCtaSection({
  secondaryCta,
  locale = "fr",
}: {
  secondaryCta?: PageFinalCtaSecondaryButton;
  locale?: SiteLocale;
} = {}) {
  const copy = getFinalCtaCopy(locale);

  return (
    <section
      className="om-final-cta om-final-cta--extended is-visible"
      id="final-cta"
      aria-labelledby="om-final-cta-title"
      data-scroll-section
      data-reveal-section
    >
      <div className="om-final-cta__media om-final-cta__reveal">
        <img
          src="/assets/mavericks/villa/mavericks-image00004-scaled.webp"
          alt=""
          loading="lazy"
          decoding="async"
          width={1440}
          height={900}
        />
        <div className="om-final-cta__overlay" aria-hidden="true" />

        <div className="om-final-cta__content">
          <span className="om-final-cta__eyebrow om-final-cta__reveal">
            {copy.eyebrow}
          </span>

          <h2
            className="om-final-cta__title om-final-cta__reveal"
            id="om-final-cta-title"
          >
            {copy.title}
          </h2>

          <p className="om-final-cta__text om-final-cta__reveal">
            {copy.text}
          </p>

          <p className="om-final-cta__trust om-final-cta__reveal">
            {copy.trust}
          </p>

          <div className="om-final-cta__actions om-final-cta__reveal">
            <Link href={copy.primaryHref} className="om-button om-button--primary">
              {BUTTON_ICON}
              <span>{copy.primaryLabel}</span>
            </Link>

            <Link
              href={secondaryCta?.href ?? copy.simulatorHref}
              className="om-button om-button--secondary"
            >
              {secondaryCta ? BUTTON_ICON : CALCULATOR_ICON}
              <span>{secondaryCta?.label ?? copy.simulatorLabel}</span>
            </Link>

            <Link href={copy.advisorHref} className="om-button om-button--secondary">
              {ADVISOR_ICON}
              <span>{copy.advisorLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
