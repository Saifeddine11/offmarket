import { VerifiedActorsTimeline } from "@/components/sections/VerifiedActorsTimeline";
import type { SiteLocale } from "@/lib/i18n/types";

const SAFE_CTA_ICON = (
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

/** About page — the S.A.F.E. verification standard applied before presenting a project. */
const SAFE_COPY = {
  fr: {
    eyebrow: "VÉRIFICATION PRIVÉE",
    titlePrefix: "Le standard",
    lead:
      "Chaque projet est étudié avant d'être présenté : promoteur, dossier, construction, paiements, matériaux, livraison et cohérence avec le marché. Notre rôle n'est pas de montrer tout ce qui existe, mais de retenir les projets qui méritent vraiment d'être étudiés.",
    closing: "La sélection commence avant la visite.",
    safeTitle: "C'est quoi la S.A.F.E. ?",
    safeText:
      "Découvrez comment notre grille de vérification analyse un projet avant qu'il soit présenté : promoteur, dossier, matériaux, paiements, livraison et cohérence avec le marché.",
    safeCta: "Lire plus sur la S.A.F.E.",
  },
  en: {
    eyebrow: "PRIVATE REVIEW",
    titlePrefix: "The",
    lead:
      "Every project is reviewed before it is presented: developer, file, construction, payments, materials, delivery and consistency with the market. Our role is not to show everything that exists, but to retain the projects that genuinely deserve to be studied.",
    closing: "Selection begins before the visit.",
    safeTitle: "What is S.A.F.E.?",
    safeText:
      "See how our review grid analyses a project before it is presented: developer, file, materials, payments, delivery and consistency with the market.",
    safeCta: "Read more about S.A.F.E.",
  },
  it: {
    eyebrow: "VERIFICA PRIVATA",
    titlePrefix: "Lo standard",
    lead:
      "Ogni progetto viene studiato prima di essere presentato: promotore, dossier, costruzione, pagamenti, materiali, consegna e coerenza con il mercato. Il nostro ruolo non è mostrare tutto ciò che esiste, ma trattenere i progetti che meritano davvero di essere studiati.",
    closing: "La selezione inizia prima della visita.",
    safeTitle: "Che cos'è S.A.F.E.?",
    safeText:
      "Scopri come la nostra griglia di verifica analizza un progetto prima che venga presentato: promotore, dossier, materiali, pagamenti, consegna e coerenza con il mercato.",
    safeCta: "Leggere di più su S.A.F.E.",
  },
  nl: {
    eyebrow: "PRIVATE CONTROLE",
    titlePrefix: "De",
    lead:
      "Elk project wordt onderzocht voordat het wordt gepresenteerd: ontwikkelaar, dossier, bouw, betalingen, materialen, oplevering en samenhang met de markt. Onze rol is niet om alles te tonen wat bestaat, maar om de projecten te behouden die het echt verdienen om bestudeerd te worden.",
    closing: "De selectie begint vóór de bezichtiging.",
    safeTitle: "Wat is S.A.F.E.?",
    safeText:
      "Ontdek hoe onze controlemethode een project analyseert voordat het wordt gepresenteerd: ontwikkelaar, dossier, materialen, betalingen, oplevering en samenhang met de markt.",
    safeCta: "Lees meer over S.A.F.E.",
  },
} satisfies Record<SiteLocale, {
  eyebrow: string;
  titlePrefix: string;
  lead: string;
  closing: string;
  safeTitle: string;
  safeText: string;
  safeCta: string;
}>;

export function AboutVerifiedActorsSection({
  locale = "fr",
}: {
  locale?: SiteLocale;
}) {
  const copy = SAFE_COPY[locale] ?? SAFE_COPY.fr;
  return (
    <section
      id="acteurs-verifies"
      className="about-verified"
      aria-labelledby="about-verified-actors-title"
      data-reveal-section
    >
      <div className="about-verified__inner">
        <div className="about-verified__glow" aria-hidden="true" />

        <header className="about-verified__header">
          <p className="about-verified__eyebrow about-verified__reveal mav-reveal-item">
            {copy.eyebrow}
          </p>

          <h2
            id="about-verified-actors-title"
            className="about-verified__title about-verified__reveal mav-reveal-item"
          >
            {copy.titlePrefix}{" "}
            <span className="about-verified__title-safe">S.A.F.E.</span>
          </h2>

          <div className="about-verified__intro">
    
            <p className="about-verified__lead about-verified__lead--secondary about-verified__reveal mav-reveal-item">
              {copy.lead}
            </p>
        
          </div>
        </header>

        <VerifiedActorsTimeline locale={locale} />

        <p className="about-verified__closing about-verified__reveal mav-reveal-item">
          {copy.closing}
        </p>

        <div className="about-verified__safe about-verified__reveal mav-reveal-item">
          <h3 className="about-verified__safe-title">
            {copy.safeTitle}
          </h3>
          <p className="about-verified__safe-text">
            {copy.safeText}
          </p>
          <a
            className="om-button om-button--outline about-verified__safe-btn"
            href="#acteurs-verifies"
          >
            <span>{copy.safeCta}</span>
            {SAFE_CTA_ICON}
          </a>
        </div>
      </div>
    </section>
  );
}
