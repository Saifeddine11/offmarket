import Link from "next/link";

import type { PageFinalCtaSecondaryButton } from "@/components/motion/PageFinalCtaMotion";

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

/** Shared closing CTA for inner editorial pages (About, Quartiers, …). */
export function PageFinalCtaSection({
  secondaryCta,
}: {
  secondaryCta?: PageFinalCtaSecondaryButton;
} = {}) {
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
            <Link href="/contact/" className="om-button om-button--primary">
              {BUTTON_ICON}
              <span>Demander un accès privé</span>
            </Link>

            <Link
              href={secondaryCta?.href ?? "/simulateur/"}
              className="om-button om-button--secondary"
            >
              {secondaryCta ? BUTTON_ICON : CALCULATOR_ICON}
              <span>{secondaryCta?.label ?? "Simulateur"}</span>
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
