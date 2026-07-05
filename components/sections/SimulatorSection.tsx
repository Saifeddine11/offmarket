import { PageFinalCtaMotion } from "@/components/motion/PageFinalCtaMotion";

export function SimulatorSection() {
  return (
    <main id="main" className="om-simulator-page">
      <header className="om-simulator-hero">
        <span className="om-simulator-hero__eyebrow">SIMULATEUR PRIVÉ</span>
        <h1 className="om-simulator-hero__title">Simuler avant d'investir</h1>
        <p className="om-simulator-hero__subtitle om-simulator-hero__text">
          Estimez le potentiel d'un bien à Marrakech selon son usage, son adresse et votre stratégie.
          <span className="om-brand-inline">OFF MARKET</span> affine ensuite les chiffres avec des comparables réels et des opportunités sélectionnées.
        </p>
      </header>

      {/* om-simulator.js stamps data-simulator-init here, sometimes before hydration */}
      <div className="om-simulator" data-simulator suppressHydrationWarning>
        <div className="om-simulator__grid om-simulator__layout">
          <section className="om-simulator__inputs" aria-label="Paramètres de simulation">
            <header className="om-simulator__panel-intro">
              <span className="om-simulator__panel-eyebrow">PARAMÈTRES</span>
              <h2 className="om-simulator__panel-title">Ajustez vos hypothèses. Le résultat se recalcule en direct.</h2>
              {/* om-simulator.js rewrites this text (with a typographic apostrophe), sometimes before hydration */}
              <p className="om-simulator__note" data-simulator-note suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "Estimation indicative. OFF MARKET affine cette simulation avec l'adresse exacte, les charges réelles et les biens disponibles." }} />
            </header>

            <div className="om-simulator__tabs" role="tablist" aria-label="Modes de simulation">
              <button type="button" className="om-simulator__tab is-active" data-simulator-tab="short" role="tab" aria-selected="true">Location courte durée</button>
              <button type="button" className="om-simulator__tab" data-simulator-tab="long" role="tab" aria-selected="false">Location longue durée</button>
              <button type="button" className="om-simulator__tab" data-simulator-tab="resale" role="tab" aria-selected="false">Achat-revente</button>
            </div>

            <div className="om-simulator__panel" data-simulator-panel="short" role="tabpanel">
              <div className="om-simulator__field" data-field data-field-type="range" data-field-key="budget">
                <div className="om-simulator__field-header">
                  <div>
                    <span className="om-simulator__label">Budget d'acquisition</span>
                    <p className="om-simulator__field-help">Prix estimé du bien, hors frais.</p>
                  </div>
                  <span className="om-simulator__value"><span data-field-value suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /><span className="om-simulator__value-eur" data-field-eur suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /></span>
                </div>
                <input className="om-simulator__range" type="range" min="750000" max="12000000" step="50000" defaultValue="1500000" />
              </div>
              <div className="om-simulator__field" data-field data-field-type="range" data-field-key="nightlyRate">
                <div className="om-simulator__field-header">
                  <div>
                    <span className="om-simulator__label">Prix nuitée moyen</span>
                  </div>
                   <span className="om-simulator__value"><span data-field-value suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /></span>
                </div>
                <input className="om-simulator__range" type="range" min="600" max="3500" step="50" defaultValue="1200" />
              </div>
              <div className="om-simulator__field" data-field data-field-type="range" data-field-key="personalWeeks" data-field-weeks="true">
                <div className="om-simulator__field-header">
                  <div>
                    <span className="om-simulator__label">Semaines d'usage personnel</span>
                  </div>
                  <span className="om-simulator__value"><span data-field-value suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /></span>
                </div>
                <input className="om-simulator__range" type="range" min="0" max="20" step="1" defaultValue="0" />
              </div>
              <div className="om-simulator__field" data-field data-field-type="range" data-field-key="occupancy" data-field-percent="true">
                <div className="om-simulator__field-header">
                  <div>
                    <span className="om-simulator__label">Taux d'occupation</span>
                  </div>
                  <span className="om-simulator__value"><span data-field-value suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /></span>
                </div>
                <input className="om-simulator__range" type="range" min="30" max="85" step="1" defaultValue="70" />
              </div>
            </div>

            <div className="om-simulator__panel" data-simulator-panel="long" role="tabpanel" hidden>
              <div className="om-simulator__field" data-field data-field-type="range" data-field-key="budget">
                <div className="om-simulator__field-header">
                  <div>
                    <span className="om-simulator__label">Budget d'acquisition</span>
                    <p className="om-simulator__field-help">Prix estimé du bien, hors frais.</p>
                  </div>
                  <span className="om-simulator__value"><span data-field-value suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /><span className="om-simulator__value-eur" data-field-eur suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /></span>
                </div>
                <input className="om-simulator__range" type="range" min="750000" max="12000000" step="50000" defaultValue="1500000" />
              </div>
              <div className="om-simulator__field" data-field data-field-type="range" data-field-key="monthlyRent">
                <div className="om-simulator__field-header">
                  <div>
                    <span className="om-simulator__label">Loyer mensuel estimé</span>
                  </div>
                  <span className="om-simulator__value"><span data-field-value suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /></span>
                </div>
                <input className="om-simulator__range" type="range" min="6000" max="60000" step="500" defaultValue="18000" />
              </div>
            </div>

            <div className="om-simulator__panel" data-simulator-panel="resale" role="tabpanel" hidden>
              <div className="om-simulator__field" data-field data-field-type="range" data-field-key="budget">
                <div className="om-simulator__field-header">
                  <div>
                    <span className="om-simulator__label">Budget d'acquisition</span>
                    <p className="om-simulator__field-help">Prix estimé du bien, hors frais.</p>
                  </div>
                  <span className="om-simulator__value"><span data-field-value suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /><span className="om-simulator__value-eur" data-field-eur suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /></span>
                </div>
                <input className="om-simulator__range" type="range" min="750000" max="12000000" step="50000" defaultValue="1500000" />
              </div>
              <div className="om-simulator__field" data-field data-field-type="range" data-field-key="resaleHorizonYears" data-field-years="true">
                <div className="om-simulator__field-header">
                  <div>
                    <span className="om-simulator__label">Horizon de revente</span>
                  </div>
                  <span className="om-simulator__value"><span data-field-value suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /></span>
                </div>
                <input className="om-simulator__range" type="range" min="3" max="15" step="1" defaultValue="8" />
              </div>
              <div className="om-simulator__field" data-field data-field-type="range" data-field-key="annualAppreciationRate" data-field-percent="true" data-field-decimals="1">
                <div className="om-simulator__field-header">
                  <div>
                    <span className="om-simulator__label">Hypothèse de valorisation annuelle</span>
                  </div>
                  <span className="om-simulator__value"><span data-field-value suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} /></span>
                </div>
                <input className="om-simulator__range" type="range" min="8" max="15" step="0.5" defaultValue="10" />
              </div>
            </div>
          </section>

          <aside className="om-simulator__results om-simulator__result" data-simulator-results aria-live="polite">
            {/* All values below are (re)written by om-simulator.js, sometimes before hydration */}
            <span className="om-simulator__results-section om-simulator__result-section" data-result-section-label suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "RÉSULTAT" }} />
            <span className="om-simulator__results-label om-simulator__result-label" data-result-label suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "RENDEMENT BRUT ANNUEL" }} />
            <p className="om-simulator__results-main om-simulator__result-value" data-result-main suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "0,0 %" }} />
            <p className="om-simulator__results-sub om-simulator__result-sub" data-result-sub hidden suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} />
            <p className="om-simulator__results-caption" data-result-caption suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "avant charges, fiscalité et frais réels" }} />

            <div className="om-simulator__metrics om-simulator__metrics--primary" data-result-metrics suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} />

            {/* om-simulator.js rewrites this text (with a typographic apostrophe), sometimes before hydration */}
            <p className="om-simulator__cta-note" data-simulator-note suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "Estimation indicative. OFF MARKET affine cette simulation avec l'adresse exacte, les charges réelles et les biens disponibles." }} />
            <div className="om-simulator__actions">
              <a href="/contact/" className="om-button om-button--primary"><span className="om-button__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span>Recevoir une analyse privée</span></a>
              <a href="/nos-projets/" className="om-button om-button--secondary"><span className="om-button__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span>Voir les biens compatibles</span></a>
            </div>
          </aside>
        </div>
      </div>

      <PageFinalCtaMotion />
    </main>
  );
}
