import Link from "next/link";

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

/** Shared closing CTA for inner editorial pages (About, Quartiers, …). */
export function PageFinalCtaSection() {
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
            PARLONS-EN
          </span>

          <h2
            className="om-final-cta__title om-final-cta__reveal"
            id="om-final-cta-title"
          >
            Votre projet mérite une lecture privée.
          </h2>

          <p className="om-final-cta__text om-final-cta__reveal">
            Dites-nous ce que vous recherchez. Nous vous répondons avec une
            sélection ciblée, une analyse claire et un accompagnement discret.
          </p>

          <p className="om-final-cta__trust om-final-cta__reveal">
            Nous qualifions votre demande avant de vous orienter vers les
            projets les plus cohérents avec votre profil.
          </p>

          <div className="om-final-cta__actions om-final-cta__reveal">
            <Link href="/off-market/" className="om-button om-button--primary">
              {BUTTON_ICON}
              <span>Demander un accès privé</span>
            </Link>

            <Link href="/sur-plan/" className="om-button om-button--secondary">
              {BUTTON_ICON}
              <span>Voir la sélection</span>
            </Link>

            <Link href="/contact/" className="om-button om-button--secondary">
              {ADVISOR_ICON}
              <span>Parler à un conseiller</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
