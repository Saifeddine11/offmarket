import { VerifiedActorsTimeline } from "@/components/sections/VerifiedActorsTimeline";

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
export function AboutVerifiedActorsSection() {
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
            VÉRIFICATION PRIVÉE
          </p>

          <h2
            id="about-verified-actors-title"
            className="about-verified__title about-verified__reveal mav-reveal-item"
          >
            Le standard{" "}
            <span className="about-verified__title-safe">S.A.F.E.</span>
          </h2>

          <div className="about-verified__intro">
    
            <p className="about-verified__lead about-verified__lead--secondary about-verified__reveal mav-reveal-item">
              Chaque projet est étudié avant d&apos;être présenté : promoteur, dossier, construction, paiements, matériaux, 
              livraison et cohérence avec le marché.
              Notre rôle n&apos;est pas de montrer tout ce qui existe, mais de retenir les projets qui méritent vraiment d&apos;être étudiés.
            </p>
        
          </div>
        </header>

        <VerifiedActorsTimeline />

        <p className="about-verified__closing about-verified__reveal mav-reveal-item">
          La sélection commence avant la visite.
        </p>

        <div className="about-verified__safe about-verified__reveal mav-reveal-item">
          <h3 className="about-verified__safe-title">
            C&apos;est quoi la S.A.F.E. ?
          </h3>
          <p className="about-verified__safe-text">
            Découvrez comment notre grille de vérification analyse un projet
            avant qu&apos;il soit présenté : promoteur, dossier, matériaux,
            paiements, livraison et cohérence avec le marché.
          </p>
          <a
            className="om-button om-button--outline about-verified__safe-btn"
            href="#safe"
          >
            <span>Lire plus sur la S.A.F.E.</span>
            {SAFE_CTA_ICON}
          </a>
        </div>
      </div>
    </section>
  );
}
