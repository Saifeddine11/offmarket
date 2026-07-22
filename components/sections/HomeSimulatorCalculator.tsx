"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { SiteLocale } from "@/lib/i18n/types";

type HomeSimulatorCalculatorProps = {
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  motion?: boolean;
  locale?: SiteLocale;
};

const SIMULATOR_COPY = {
  fr: {
    tabsAria: "Modes de simulation",
    short: "Location courte durée",
    long: "Location longue durée",
    resale: "Achat-revente",
    inputsAria: "Paramètres de simulation",
    panelEyebrow: "PARAMÈTRES",
    panelTitle: "Ajustez vos hypothèses. Le résultat se recalcule en direct.",
    note:
      "Estimation indicative. OFF MARKET affine cette simulation avec l'adresse exacte, les charges réelles et les biens disponibles.",
    purchasePrice: "Budget d'acquisition",
    purchaseHelp: "Prix estimé du bien, hors frais.",
    nightlyRate: "Prix nuitée moyen",
    personalWeeks: "Semaines d'usage personnel",
    occupancy: "Taux d'occupation",
    monthlyRent: "Loyer mensuel estimé",
    resaleHorizon: "Horizon de revente",
    appreciation: "Hypothèse de valorisation annuelle",
    resultSection: "RÉSULTAT",
    resultLabel: "RENDEMENT BRUT ANNUEL",
    resultCaption: "avant charges, fiscalité et frais réels",
    primary: "Recevoir une analyse privée",
    secondary: "Voir les biens compatibles",
  },
  en: {
    tabsAria: "Simulation modes",
    short: "Short-term rental",
    long: "Long-term rental",
    resale: "Purchase-resale",
    inputsAria: "Simulation parameters",
    panelEyebrow: "PARAMETERS",
    panelTitle: "Adjust your assumptions. The result recalculates live.",
    note:
      "Indicative estimate. OFF MARKET refines this simulation with the exact address, actual charges and available properties.",
    purchasePrice: "Purchase price",
    purchaseHelp: "Estimated property price, excluding fees.",
    nightlyRate: "Average nightly rate",
    personalWeeks: "Weeks of personal use",
    occupancy: "Occupancy rate",
    monthlyRent: "Monthly rent",
    resaleHorizon: "Resale horizon",
    appreciation: "Annual appreciation assumption",
    resultSection: "RESULT",
    resultLabel: "GROSS RENTAL YIELD",
    resultCaption: "before charges, taxes and real operating costs",
    primary: "Receive a private analysis",
    secondary: "View compatible properties",
  },
  it: {
    tabsAria: "Modalità di simulazione",
    short: "Affitto breve",
    long: "Affitto lungo",
    resale: "Acquisto-rivendita",
    inputsAria: "Parametri di simulazione",
    panelEyebrow: "PARAMETRI",
    panelTitle: "Regola le ipotesi. Il risultato si ricalcola in tempo reale.",
    note:
      "Stima indicativa. OFF MARKET affina questa simulazione con l'indirizzo esatto, le spese reali e i beni disponibili.",
    purchasePrice: "Budget di acquisto",
    purchaseHelp: "Prezzo stimato del bene, esclusi i costi.",
    nightlyRate: "Prezzo medio a notte",
    personalWeeks: "Settimane di uso personale",
    occupancy: "Tasso di occupazione",
    monthlyRent: "Canone mensile stimato",
    resaleHorizon: "Orizzonte di rivendita",
    appreciation: "Ipotesi di rivalutazione annuale",
    resultSection: "RISULTATO",
    resultLabel: "RENDIMENTO LORDO ANNUO",
    resultCaption: "prima di spese, fiscalità e costi operativi reali",
    primary: "Ricevere un'analisi privata",
    secondary: "Vedere i beni compatibili",
  },
  nl: {
    tabsAria: "Simulatiemodi",
    short: "Korte termijn verhuur",
    long: "Lange termijn verhuur",
    resale: "Aankoop en herverkoop",
    inputsAria: "Simulatieparameters",
    panelEyebrow: "INSTELLINGEN",
    panelTitle: "Pas uw aannames aan. Het resultaat wordt live herberekend.",
    note:
      "Indicatieve schatting. OFF MARKET verfijnt deze simulatie met het exacte adres, de werkelijke kosten en beschikbare woningen.",
    purchasePrice: "Aankoopprijs",
    purchaseHelp: "Geschatte aankoopprijs, exclusief kosten.",
    nightlyRate: "Gemiddelde nachtprijs",
    personalWeeks: "Weken eigen gebruik",
    occupancy: "Bezettingsgraad",
    monthlyRent: "Maandelijkse huur",
    resaleHorizon: "Herverkoophorizon",
    appreciation: "Aanname jaarlijkse waardestijging",
    resultSection: "RESULTAAT",
    resultLabel: "BRUTO HUURRENDEMENT",
    resultCaption: "vóór kosten, fiscaliteit en werkelijke lasten",
    primary: "Een private analyse ontvangen",
    secondary: "Passend vastgoed bekijken",
  },
} satisfies Record<SiteLocale, Record<string, string>>;

export function HomeSimulatorCalculator({
  primaryCtaHref = "/contact/",
  secondaryCtaHref = "#featured-projects",
  motion = false,
  locale = "fr",
}: HomeSimulatorCalculatorProps) {
  const copy = SIMULATOR_COPY[locale];
  return (
  <div className="om-simulator om-simulator-home__container" data-simulator>
    <div className="om-simulator__tabs-wrap om-simulator-home__tabs-wrap">
      <div className="om-simulator__tabs om-simulator-home__tabs" role="tablist" aria-label={copy.tabsAria}>
        <button type="button" className="om-simulator__tab is-active" data-simulator-tab="short" role="tab" aria-selected="true">
          <span className="om-simulator__tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span>{copy.short}</span>
        </button>
        <button type="button" className="om-simulator__tab" data-simulator-tab="long" role="tab" aria-selected="false">
          <span className="om-simulator__tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span>{copy.long}</span>
        </button>
        <button type="button" className="om-simulator__tab" data-simulator-tab="resale" role="tab" aria-selected="false">
          <span className="om-simulator__tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 17 10 11l4 4 6-8M14 7h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span>{copy.resale}</span>
        </button>
      </div>
    </div>

    <div className="om-simulator__grid om-simulator__layout om-simulator-home__grid">
      <ScrollReveal
        as="section"
        className="om-simulator__inputs"
        aria-label={copy.inputsAria}
        disabled={!motion}
      >
        <header className="om-simulator__panel-intro">
          <span className="om-simulator__panel-eyebrow">{copy.panelEyebrow}</span>
          <h3 className="om-simulator__panel-title">{copy.panelTitle}</h3>
          <p className="om-simulator__note om-simulator__panel-copy" data-simulator-note suppressHydrationWarning>
            {copy.note}
          </p>
        </header>

        <div className="om-simulator__panel" data-simulator-panel="short" role="tabpanel">
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="budget">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3 9h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z M3 9l2.2-5.4A2 2 0 0 1 7.03 2h9.94a2 2 0 0 1 1.83 1.6L21 9M12 14v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>{copy.purchasePrice}</span></span>
                <p className="om-simulator__field-help">{copy.purchaseHelp}</p>
              </div>
              <span className="om-simulator__value"><span data-field-value suppressHydrationWarning /><span className="om-simulator__value-eur" data-field-eur suppressHydrationWarning /></span>
            </div>
            <input className="om-simulator__range" type="range" min="750000" max="12000000" step="50000" defaultValue="1500000" aria-label={copy.purchasePrice} />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="nightlyRate">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>{copy.nightlyRate}</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value suppressHydrationWarning /></span>
            </div>
            <input className="om-simulator__range" type="range" min="600" max="12000" step="50" defaultValue="1200" aria-label={copy.nightlyRate} />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="personalWeeks" data-field-weeks="true">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>{copy.personalWeeks}</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value suppressHydrationWarning /></span>
            </div>
            <input className="om-simulator__range" type="range" min="0" max="20" step="1" defaultValue="0" aria-label={copy.personalWeeks} />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="occupancy" data-field-percent="true">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="7.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.75"/><circle cx="16.5" cy="16.5" r="2.5" stroke="currentColor" strokeWidth="1.75"/><path d="M19 5 5 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg></span><span>{copy.occupancy}</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value suppressHydrationWarning /></span>
            </div>
            <input className="om-simulator__range" type="range" min="30" max="85" step="1" defaultValue="70" aria-label={copy.occupancy} />
          </div>
        </div>

        <div className="om-simulator__panel" data-simulator-panel="long" role="tabpanel" hidden>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="budget">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3 9h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z M3 9l2.2-5.4A2 2 0 0 1 7.03 2h9.94a2 2 0 0 1 1.83 1.6L21 9M12 14v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>{copy.purchasePrice}</span></span>
                <p className="om-simulator__field-help">{copy.purchaseHelp}</p>
              </div>
              <span className="om-simulator__value"><span data-field-value suppressHydrationWarning /><span className="om-simulator__value-eur" data-field-eur suppressHydrationWarning /></span>
            </div>
            <input className="om-simulator__range" type="range" min="750000" max="12000000" step="50000" defaultValue="1500000" aria-label={copy.purchasePrice} />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="monthlyRent">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>{copy.monthlyRent}</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value suppressHydrationWarning /></span>
            </div>
            <input className="om-simulator__range" type="range" min="6000" max="60000" step="500" defaultValue="18000" aria-label={copy.monthlyRent} />
          </div>
        </div>

        <div className="om-simulator__panel" data-simulator-panel="resale" role="tabpanel" hidden>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="budget">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3 9h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z M3 9l2.2-5.4A2 2 0 0 1 7.03 2h9.94a2 2 0 0 1 1.83 1.6L21 9M12 14v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>{copy.purchasePrice}</span></span>
                <p className="om-simulator__field-help">{copy.purchaseHelp}</p>
              </div>
              <span className="om-simulator__value"><span data-field-value suppressHydrationWarning /><span className="om-simulator__value-eur" data-field-eur suppressHydrationWarning /></span>
            </div>
            <input className="om-simulator__range" type="range" min="750000" max="12000000" step="50000" defaultValue="1500000" aria-label={copy.purchasePrice} />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="resaleHorizonYears" data-field-years="true">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg></span><span>{copy.resaleHorizon}</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value suppressHydrationWarning /></span>
            </div>
            <input className="om-simulator__range" type="range" min="3" max="15" step="1" defaultValue="8" aria-label={copy.resaleHorizon} />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="annualAppreciationRate" data-field-percent="true" data-field-decimals="1">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 17h16M7 13l3-3 3 2 5-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>{copy.appreciation}</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value suppressHydrationWarning /></span>
            </div>
            <input className="om-simulator__range" type="range" min="8" max="15" step="0.5" defaultValue="10" aria-label={copy.appreciation} />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal
        as="aside"
        className="om-simulator__results om-simulator__result"
        data-simulator-results
        aria-live="polite"
        delay={0.12}
        disabled={!motion}
      >
        <span className="om-simulator__results-section om-simulator__result-section" data-result-section-label>
          <span className="om-simulator__result-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3 14.5 8.5 20 9l-4 4.2.9 5.8L12 16.8 7.1 19l.9-5.8L4 9l5.5-.5L12 3Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/></svg></span>
          <span data-result-section-text suppressHydrationWarning>{copy.resultSection}</span>
        </span>
        <span className="om-simulator__results-label om-simulator__result-label" data-result-label>
          <span className="om-simulator__result-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 17h16M7 13l3-3 3 2 5-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span data-result-label-text suppressHydrationWarning>{copy.resultLabel}</span>
        </span>
        <p className="om-simulator__results-main om-simulator__result-value" data-result-main suppressHydrationWarning>0,0 %</p>
        <p className="om-simulator__results-sub om-simulator__result-sub" data-result-sub hidden suppressHydrationWarning />
        <p className="om-simulator__results-caption" data-result-caption suppressHydrationWarning>{copy.resultCaption}</p>

        <div className="om-simulator__metrics om-simulator__metrics--primary" data-result-metrics suppressHydrationWarning />

        <p className="om-simulator__cta-note" data-simulator-note suppressHydrationWarning>
          {copy.note}
        </p>
        <div className="om-simulator__actions">
          <a href={primaryCtaHref} className="om-button om-button--primary"><span className="om-button__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>{copy.primary}</span></a>
          <a href={secondaryCtaHref} className="om-button om-button--secondary"><span className="om-button__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>{copy.secondary}</span></a>
        </div>
      </ScrollReveal>
    </div>
  </div>
  );
}
