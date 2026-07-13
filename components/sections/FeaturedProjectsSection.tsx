import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextMaskReveal } from "@/components/motion/TextMaskReveal";
import { PropertyModalSlides } from "@/components/property/PropertyModalSlides";

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

export type FeaturedProjectsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaProof?: string;
  motion?: boolean;
};

/**
 * Reused homepage "Biens accessibles sur dossier" section shell.
 * Cards, private-access popup and the property modal are populated by the
 * existing `om-featured-projects.js` / `om-property-modal.js` /
 * `om-private-access-popup.js` bundles (same data source as the homepage —
 * nothing here duplicates property content).
 */
export function FeaturedProjectsSection({
  id = "featured-projects",
  eyebrow = "ADRESSES CONFIDENTIELLES",
  title = "Opportunités rares à Marrakech",
  lead = "Des biens sélectionnés en dehors des circuits classiques, avec des informations essentielles visibles et un dossier complet transmis sur demande.",
  note = "Sélection actualisée régulièrement.",
  ctaLabel = "Demander l'accès",
  ctaHref = "/off-market/",
  ctaProof = "15+ projets privés suivis à Marrakech",
  motion = false,
}: FeaturedProjectsSectionProps) {
  return (
    <section
      id={id}
      className="om-featured-projects"
      aria-label="Biens accessibles sur dossier"
      data-scroll-section
    >
      <div className="om-featured-projects__container">
        <header className="om-featured-projects__intro">
          <div className="om-featured-projects__intro-copy">
            {motion ? (
              <>
                <ScrollReveal as="p" className="om-featured-projects__eyebrow">
                  {eyebrow}
                </ScrollReveal>
                <TextMaskReveal
                  as="h2"
                  className="om-featured-projects__title"
                  delay={0.08}
                >
                  {title}
                </TextMaskReveal>
                <ScrollReveal
                  as="p"
                  className="om-featured-projects__lead"
                  delay={0.16}
                  y={30}
                >
                  {lead}
                </ScrollReveal>
                <ScrollReveal
                  as="p"
                  className="om-featured-projects__note"
                  delay={0.22}
                  y={20}
                >
                  {note}
                </ScrollReveal>
              </>
            ) : (
              <>
                <p className="om-featured-projects__eyebrow">{eyebrow}</p>
                <h2 className="om-featured-projects__title">{title}</h2>
                <p className="om-featured-projects__lead">{lead}</p>
                <p className="om-featured-projects__note">{note}</p>
              </>
            )}
          </div>
          <div className="om-featured-projects__intro-action">
            <a href={ctaHref} className="om-cta om-button om-button--dark">
              {CTA_ICON}
              <span>{ctaLabel}</span>
            </a>
            <p className="om-featured-projects__cta-proof">{ctaProof}</p>
          </div>
        </header>

        {/* Cards are injected by om-featured-projects.js, sometimes before
            hydration — dangerouslySetInnerHTML keeps hydration from diffing. */}
        <ScrollReveal
          className="om-featured-projects__grid"
          data-om-property-cards=""
          delay={0.12}
          disabled={!motion}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: "" }}
        >
          {null}
        </ScrollReveal>

        <div className="om-private-access-popup" aria-hidden="true">
          <button
            className="om-private-access-popup__close"
            type="button"
            aria-label="Fermer"
          >
            ×
          </button>
          <span className="om-private-access-popup__badge">ACCÈS PRIVÉ</span>
          <h3>
            Terrains, maisons, hôtels et restaurants vous attendent en
            off-market.
          </h3>
          <p>Inscrivez-vous pour avoir accès à la sélection privée.</p>
          <a className="om-private-access-popup__button" href="/off-market/">
            Débloquer l&rsquo;accès
          </a>
        </div>
      </div>

      <PropertyModalShell />
    </section>
  );
}

/** Static shell hydrated at runtime by `om-property-modal.js` — same markup/data as the homepage modal. */
function PropertyModalShell() {
  return (
    <div className="om-property-modal" data-property-modal aria-hidden="true">
      <div className="om-property-modal__backdrop" data-property-modal-close />
      <section
        className="om-property-modal__shell"
        role="dialog"
        aria-modal="true"
        aria-labelledby="om-property-modal-title"
      >
        <button
          className="om-property-modal__close"
          type="button"
          data-property-modal-close
          aria-label="Fermer la fiche"
        >
          ×
        </button>
        <div className="om-property-modal__stage">
          <div className="om-property-modal__track" data-property-modal-track>
            <PropertyModalSlides />
          </div>
        </div>
        <div className="om-property-modal__arrows" aria-hidden="false">
          <button
            type="button"
            className="om-property-modal__arrow om-property-modal__arrow--prev"
            data-modal-prev
            aria-label="Slide précédente"
            aria-disabled="true"
          >
            ←
          </button>
          <button
            type="button"
            className="om-property-modal__arrow om-property-modal__arrow--next"
            data-modal-next
            aria-label="Slide suivante"
          >
            →
          </button>
        </div>
        <nav className="om-property-modal__tabs" aria-label="Navigation fiche bien">
          <button type="button" className="is-active" data-modal-tab="general">
            <span>01.</span> Général
          </button>
          <button type="button" data-modal-tab="about">
            <span>02.</span> À propos
          </button>
          <button type="button" data-modal-tab="characteristics">
            <span>03.</span> Caractéristiques
          </button>
          <button type="button" data-modal-tab="exterior">
            <span>04.</span> Extérieur
          </button>
          <button type="button" data-modal-tab="interior">
            <span>05.</span> Intérieur
          </button>
          <button type="button" data-modal-tab="layout">
            <span>06.</span> Plans
          </button>
        </nav>
      </section>
    </div>
  );
}
