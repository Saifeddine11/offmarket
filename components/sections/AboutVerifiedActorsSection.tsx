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

/** About page — the S.A.F.E principles applied before presenting a project. */
const SAFE_COPY = {
  fr: {
    eyebrow: "CADRE INDÉPENDANT",
    titlePrefix: "Le cadre",
    lead:
      "Chaque projet est étudié avant d'être présenté : promoteur, dossier, construction, paiements, matériaux, livraison et cohérence avec le marché. S.A.F.E structure les informations disponibles et signale les sujets qui doivent encore être vérifiés.",
    closing: "La sélection commence avant la visite.",
    safeTitle: "C'est quoi la S.A.F.E ?",
    safeText:
      "S.A.F.E. — Security, Analysis, Fidelity & Expert Guidance est une méthode indépendante d'analyse, de présélection et de sécurisation immobilière destinée à renforcer la protection et la compréhension des acheteurs et des investisseurs. OFF MARKET n'est pas propriétaire de S.A.F.E. et n'en revendique pas la création. OFF MARKET respecte et applique les principes S.A.F.E. dans son processus d'étude et de présentation des opportunités immobilières. S.A.F.E. constitue un cadre indépendant d'analyse et de sécurisation immobilière. Son application ne remplace pas les vérifications juridiques, notariales, techniques, fiscales ou financières nécessaires avant toute acquisition et ne garantit pas l'absence totale de risque.",
    safeCta: "Lire le cadre S.A.F.E",
  },
  en: {
    eyebrow: "INDEPENDENT FRAMEWORK",
    titlePrefix: "The",
    lead:
      "Every project is reviewed before it is presented: developer, file, construction, payments, materials, delivery and consistency with the market. Our role is not to show everything that exists, but to retain the projects that genuinely deserve to be studied.",
    closing: "Selection begins before the visit.",
    safeTitle: "What is S.A.F.E?",
    safeText:
      "S.A.F.E. — Security, Analysis, Fidelity & Expert Guidance is an independent real-estate analysis, pre-selection and security framework designed to strengthen the protection and understanding of buyers and investors. OFF MARKET does not own S.A.F.E. and does not claim to have created it. OFF MARKET follows and applies S.A.F.E. principles when reviewing and presenting real-estate opportunities. S.A.F.E. is an independent real-estate analysis and security framework. Its application does not replace the legal, notarial, technical, tax or financial checks required before an acquisition and does not guarantee the complete absence of risk.",
    safeCta: "Read more about S.A.F.E",
  },
  it: {
    eyebrow: "QUADRO INDIPENDENTE",
    titlePrefix: "Il quadro",
    lead:
      "Ogni progetto viene studiato prima di essere presentato: promotore, dossier, costruzione, pagamenti, materiali, consegna e coerenza con il mercato. Il nostro ruolo non è mostrare tutto ciò che esiste, ma trattenere i progetti che meritano davvero di essere studiati.",
    closing: "La selezione inizia prima della visita.",
    safeTitle: "Che cos'è S.A.F.E?",
    safeText:
      "S.A.F.E. — Security, Analysis, Fidelity & Expert Guidance è un metodo indipendente di analisi, preselezione e tutela immobiliare, concepito per rafforzare la protezione e la comprensione di acquirenti e investitori. S.A.F.E. non appartiene a OFF MARKET e OFF MARKET non ne rivendica la creazione. OFF MARKET rispetta e applica i principi S.A.F.E. nella valutazione e presentazione delle opportunità immobiliari. S.A.F.E. è un quadro indipendente di analisi e tutela immobiliare. La sua applicazione non sostituisce le verifiche legali, notarili, tecniche, fiscali o finanziarie necessarie prima di un acquisto e non garantisce la totale assenza di rischi.",
    safeCta: "Leggere di più su S.A.F.E",
  },
  nl: {
    eyebrow: "ONAFHANKELIJK KADER",
    titlePrefix: "Het kader",
    lead:
      "Elk project wordt onderzocht voordat het wordt gepresenteerd: ontwikkelaar, dossier, bouw, betalingen, materialen, oplevering en samenhang met de markt. Onze rol is niet om alles te tonen wat bestaat, maar om de projecten te behouden die het echt verdienen om bestudeerd te worden.",
    closing: "De selectie begint vóór de bezichtiging.",
    safeTitle: "Wat is S.A.F.E?",
    safeText:
      "S.A.F.E. — Security, Analysis, Fidelity & Expert Guidance is een onafhankelijke methode voor vastgoedanalyse, voorselectie en risicobeheersing, bedoeld om kopers en investeerders beter te beschermen en te informeren. S.A.F.E. is geen eigendom van OFF MARKET en OFF MARKET beweert niet de methode te hebben ontwikkeld. OFF MARKET volgt en past de S.A.F.E.-principes toe bij de beoordeling en presentatie van vastgoedmogelijkheden. S.A.F.E. is een onafhankelijk kader voor vastgoedanalyse en risicobeheersing. De toepassing ervan vervangt niet de juridische, notariële, technische, fiscale of financiële controles die vóór een aankoop nodig zijn en garandeert niet dat elk risico is uitgesloten.",
    safeCta: "Lees meer over S.A.F.E",
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
            href="https://levraimaroc.com/safe-certification-immobiliere/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{copy.safeCta}</span>
            {SAFE_CTA_ICON}
          </a>
        </div>
      </div>
    </section>
  );
}
