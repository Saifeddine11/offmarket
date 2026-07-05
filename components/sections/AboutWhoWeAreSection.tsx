import Link from "next/link";

import { AboutWhoVideo } from "./AboutWhoVideo";

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
export function AboutWhoWeAreSection() {
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
          <p className="about-who__eyebrow mav-reveal-item">QUI SOMMES-NOUS</p>

          <h2 className="about-who__title" id="mav-who-title">
            Une maison privée pour lire le marché immobilier de Marrakech avec
            exigence.
          </h2>

          <p className="about-who__lead">
            OFF MARKET accompagne les acheteurs, investisseurs et propriétaires
            avec une sélection ciblée, une analyse claire et un accès discret
            aux opportunités pertinentes.
          </p>

          <div
            className="about-who__chips mav-reveal-item"
            aria-label="Notre approche"
          >
            <span className="about-who__chip">Sélection ciblée</span>
            <span className="about-who__chip">Analyse claire</span>
            <span className="about-who__chip">Accompagnement discret</span>
          </div>

          <Link
            className="om-cta om-button om-button--dark about-who__cta mav-reveal-item"
            href="/off-market/"
          >
            {CTA_ICON}
            <span>Découvrir notre approche</span>
          </Link>
        </div>

        <div className="about-who__aside about-video-wrapper mav-reveal-item">
          <AboutWhoVideo />
        </div>
      </div>
    </section>
  );
}
