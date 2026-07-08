"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";

type HomeSimulatorCalculatorProps = {
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  motion?: boolean;
};

const SIMULATOR_NOTE_TEXT =
  "Estimation indicative. OFF MARKET affine cette simulation avec l\u2019adresse exacte, les charges réelles et les biens disponibles.";

export function HomeSimulatorCalculator({
  primaryCtaHref = "#callback-modal",
  secondaryCtaHref = "#featured-projects",
  motion = false,
}: HomeSimulatorCalculatorProps) {
  return (
  <div className="om-simulator om-simulator-home__container" data-simulator>
    <div className="om-simulator__tabs-wrap om-simulator-home__tabs-wrap">
      <div className="om-simulator__tabs om-simulator-home__tabs" role="tablist" aria-label="Modes de simulation">
        <button type="button" className="om-simulator__tab is-active" data-simulator-tab="short" role="tab" aria-selected="true">
          <span className="om-simulator__tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span>Location courte durée</span>
        </button>
        <button type="button" className="om-simulator__tab" data-simulator-tab="long" role="tab" aria-selected="false">
          <span className="om-simulator__tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span>Location longue durée</span>
        </button>
        <button type="button" className="om-simulator__tab" data-simulator-tab="resale" role="tab" aria-selected="false">
          <span className="om-simulator__tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 17 10 11l4 4 6-8M14 7h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span>Achat-revente</span>
        </button>
      </div>
    </div>

    <div className="om-simulator__grid om-simulator__layout om-simulator-home__grid">
      <ScrollReveal
        as="section"
        className="om-simulator__inputs"
        aria-label="Paramètres de simulation"
        disabled={!motion}
      >
        <header className="om-simulator__panel-intro">
          <span className="om-simulator__panel-eyebrow">PARAMÈTRES</span>
          <h3 className="om-simulator__panel-title">Ajustez vos hypothèses. Le résultat se recalcule en direct.</h3>
          <p className="om-simulator__note om-simulator__panel-copy" data-simulator-note suppressHydrationWarning>
            {SIMULATOR_NOTE_TEXT}
          </p>
        </header>

        <div className="om-simulator__panel" data-simulator-panel="short" role="tabpanel">
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="budget">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3 9h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z M3 9l2.2-5.4A2 2 0 0 1 7.03 2h9.94a2 2 0 0 1 1.83 1.6L21 9M12 14v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>Budget d'acquisition</span></span>
                <p className="om-simulator__field-help">Prix estimé du bien, hors frais.</p>
              </div>
              <span className="om-simulator__value"><span data-field-value /><span className="om-simulator__value-eur" data-field-eur /></span>
            </div>
            <input className="om-simulator__range" type="range" min="750000" max="12000000" step="50000" defaultValue="1500000" />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="nightlyRate">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>Prix nuitée moyen</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value /></span>
            </div>
            <input className="om-simulator__range" type="range" min="600" max="3500" step="50" defaultValue="1200" />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="personalWeeks" data-field-weeks="true">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>Semaines d'usage personnel</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value /></span>
            </div>
            <input className="om-simulator__range" type="range" min="0" max="20" step="1" defaultValue="0" />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="occupancy" data-field-percent="true">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="7.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.75"/><circle cx="16.5" cy="16.5" r="2.5" stroke="currentColor" strokeWidth="1.75"/><path d="M19 5 5 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg></span><span>Taux d'occupation</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value /></span>
            </div>
            <input className="om-simulator__range" type="range" min="30" max="85" step="1" defaultValue="70" />
          </div>
        </div>

        <div className="om-simulator__panel" data-simulator-panel="long" role="tabpanel" hidden>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="budget">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3 9h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z M3 9l2.2-5.4A2 2 0 0 1 7.03 2h9.94a2 2 0 0 1 1.83 1.6L21 9M12 14v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>Budget d'acquisition</span></span>
                <p className="om-simulator__field-help">Prix estimé du bien, hors frais.</p>
              </div>
              <span className="om-simulator__value"><span data-field-value /><span className="om-simulator__value-eur" data-field-eur /></span>
            </div>
            <input className="om-simulator__range" type="range" min="750000" max="12000000" step="50000" defaultValue="1500000" />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="monthlyRent">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>Loyer mensuel estimé</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value /></span>
            </div>
            <input className="om-simulator__range" type="range" min="6000" max="60000" step="500" defaultValue="18000" />
          </div>
        </div>

        <div className="om-simulator__panel" data-simulator-panel="resale" role="tabpanel" hidden>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="budget">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3 9h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z M3 9l2.2-5.4A2 2 0 0 1 7.03 2h9.94a2 2 0 0 1 1.83 1.6L21 9M12 14v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>Budget d'acquisition</span></span>
                <p className="om-simulator__field-help">Prix estimé du bien, hors frais.</p>
              </div>
              <span className="om-simulator__value"><span data-field-value /><span className="om-simulator__value-eur" data-field-eur /></span>
            </div>
            <input className="om-simulator__range" type="range" min="750000" max="12000000" step="50000" defaultValue="1500000" />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="resaleHorizonYears" data-field-years="true">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg></span><span>Horizon de revente</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value /></span>
            </div>
            <input className="om-simulator__range" type="range" min="3" max="15" step="1" defaultValue="8" />
          </div>
          <div className="om-simulator__field" data-field data-field-type="range" data-field-key="annualAppreciationRate" data-field-percent="true" data-field-decimals="1">
            <div className="om-simulator__field-header">
              <div>
                <span className="om-simulator__label"><span className="om-simulator__field-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 17h16M7 13l3-3 3 2 5-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>Hypothèse de valorisation annuelle</span></span>
              </div>
              <span className="om-simulator__value"><span data-field-value /></span>
            </div>
            <input className="om-simulator__range" type="range" min="8" max="15" step="0.5" defaultValue="10" />
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
          <span data-result-section-text>RÉSULTAT</span>
        </span>
        <span className="om-simulator__results-label om-simulator__result-label" data-result-label>
          <span className="om-simulator__result-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 17h16M7 13l3-3 3 2 5-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span data-result-label-text>RENDEMENT BRUT ANNUEL</span>
        </span>
        <p className="om-simulator__results-main om-simulator__result-value" data-result-main>0,0 %</p>
        <p className="om-simulator__results-sub om-simulator__result-sub" data-result-sub hidden />
        <p className="om-simulator__results-caption" data-result-caption>avant charges, fiscalité et frais réels</p>

        <div className="om-simulator__metrics om-simulator__metrics--primary" data-result-metrics />

        <p className="om-simulator__cta-note" data-simulator-note suppressHydrationWarning>
          {SIMULATOR_NOTE_TEXT}
        </p>
        <div className="om-simulator__actions">
          <a href={primaryCtaHref} className="om-button om-button--primary"><span className="om-button__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>Recevoir une analyse privée</span></a>
          <a href={secondaryCtaHref} className="om-button om-button--secondary"><span className="om-button__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>Voir les biens compatibles</span></a>
        </div>
      </ScrollReveal>
    </div>
  </div>
  );
}
