export type PropertyModalSlidesProps = {
  /** When true, slides stack as page sections with anchor IDs (no carousel). */
  pageMode?: boolean;
  /** Modal-only: title id for aria-labelledby on the dialog shell. */
  titleId?: string;
};

const PAGE_SECTIONS = [
  { slide: "general", id: "general", active: true },
  { slide: "about", id: "a-propos", active: true },
  { slide: "characteristics", id: "caracteristiques", active: true },
  { slide: "exterior", id: "exterieur", active: true },
  { slide: "interior", id: "interieur", active: true },
  { slide: "layout", id: "plans", active: true },
] as const;

function slideClass(
  base: string,
  pageMode: boolean,
  active: boolean,
): string {
  const classes = [base];
  if (pageMode || active) {
    classes.push("is-active");
  }
  return classes.join(" ");
}

/**
 * Shared 6-slide markup for the property modal and project detail pages.
 * Hydrated at runtime by `om-property-modal.js`.
 */
export function PropertyModalSlides({
  pageMode = false,
  titleId = "om-property-modal-title",
}: PropertyModalSlidesProps) {
  const general = PAGE_SECTIONS[0];
  const about = PAGE_SECTIONS[1];
  const characteristics = PAGE_SECTIONS[2];
  const exterior = PAGE_SECTIONS[3];
  const interior = PAGE_SECTIONS[4];
  const layout = PAGE_SECTIONS[5];

  return (
    <>
      <article
        id={pageMode ? general.id : undefined}
        className={slideClass(
          "om-property-modal__slide om-property-modal__slide--general",
          pageMode,
          general.active,
        )}
        data-modal-slide="general"
      >
        <figure className="om-property-modal__media">
          <img data-modal-image alt="" />
        </figure>
        <div className="om-property-modal__content">
          <div className="om-property-modal__top">
            <div className="om-property-modal__tags">
              <span data-modal-index>01</span>
              <span data-modal-location>MARRAKECH</span>
              <span data-modal-type>Villa sur plan</span>
            </div>
          </div>
          <p className="om-property-modal__selection" data-modal-selection>
            <span>Sélection :</span> Projet sur plan
          </p>
          <h3
            className="om-property-modal__title"
            id={pageMode ? undefined : titleId}
            data-modal-title
          >
            Villa Jaz
          </h3>
          <p className="om-property-modal__subtitle" data-modal-subtitle hidden />
          <div className="om-property-modal__typologies" data-modal-typologies hidden />
          <div className="om-property-modal__facts" data-modal-facts />
          <p className="om-property-modal__description" data-modal-description />
          <div className="om-property-modal__bottom">
            <div className="om-property-modal__bottom-price">
              <span>Prix</span>
              <strong data-modal-price-bottom>À partir de 351 000 €</strong>
            </div>
            <div className="om-property-modal__actions">
              <a href="/contact/" className="om-cta om-button om-button--outline">
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
                <span>Rappel</span>
              </a>
              <a href="/off-market/" className="om-cta om-button om-button--dark">
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
                <span>Recevoir le dossier</span>
              </a>
            </div>
          </div>
        </div>
      </article>

      <article
        id={pageMode ? about.id : undefined}
        className={slideClass(
          "om-property-modal__slide om-property-modal__slide--about",
          pageMode,
          about.active,
        )}
        data-modal-slide="about"
      >
        <div className="om-property-modal__about-copy">
          <div className="om-property-modal__about-kicker">
            <img data-modal-about-thumb alt="" />
            <div>
              <span>Projet</span>
              <strong data-modal-about-project>Projet sur plan</strong>
            </div>
          </div>
          <h3 data-modal-about-title>Villa Jaz</h3>
          <div
            className="om-property-modal__about-editorial"
            data-modal-about-editorial
            hidden
          />
          <p data-modal-about-description-primary />
          <p data-modal-about-description-secondary />
        </div>
        <figure className="om-property-modal__about-media">
          <img data-modal-about-image alt="" />
        </figure>
      </article>

      <article
        id={pageMode ? characteristics.id : undefined}
        className={slideClass(
          "om-property-modal__slide om-property-modal__slide--characteristics",
          pageMode,
          characteristics.active,
        )}
        data-modal-slide="characteristics"
      >
        <div className="om-property-modal__amenities" data-modal-amenities />
      </article>

      <article
        id={pageMode ? exterior.id : undefined}
        className={slideClass(
          "om-property-modal__slide om-property-modal__slide--gallery om-property-modal__slide--exterior",
          pageMode,
          exterior.active,
        )}
        data-modal-slide="exterior"
      >
        <div className="om-property-modal__gallery" data-modal-exterior-gallery />
        <div className="om-property-modal__gallery-card">
          <span>Galerie</span>
          <strong data-modal-exterior-count>5 photos</strong>
          <p>Extérieur</p>
          <button type="button">Voir</button>
        </div>
      </article>

      <article
        id={pageMode ? interior.id : undefined}
        className={slideClass(
          "om-property-modal__slide om-property-modal__slide--gallery om-property-modal__slide--interior",
          pageMode,
          interior.active,
        )}
        data-modal-slide="interior"
      >
        <div className="om-property-modal__gallery" data-modal-interior-gallery />
        <div className="om-property-modal__gallery-card">
          <span>Galerie</span>
          <strong data-modal-interior-count>5 photos</strong>
          <p>Intérieur</p>
          <button type="button">Voir</button>
        </div>
      </article>

      <article
        id={pageMode ? layout.id : undefined}
        className={slideClass(
          "om-property-modal__slide om-property-modal__slide--layout",
          pageMode,
          layout.active,
        )}
        data-modal-slide="layout"
      >
        <div className="om-property-modal__layout-copy">
          <div>
            <h3>Plans &amp; configuration</h3>
            <div className="om-property-modal__layout-tabs" data-modal-layout-tabs>
              <button type="button" className="is-active" data-layout-floor="ground">
                Rez-de-chaussée
              </button>
              <button type="button" data-layout-floor="first">
                Étage
              </button>
            </div>
            <div className="om-property-modal__layout-meta">
              <div>
                <span>Surface</span>
                <strong data-modal-layout-surface>Détails sur demande</strong>
              </div>
              <div>
                <span>Suites</span>
                <strong data-modal-layout-rooms>Détails sur demande</strong>
              </div>
              <div>
                <span>Salles d&apos;eau</span>
                <strong data-modal-layout-baths>Détails sur demande</strong>
              </div>
            </div>
            <p data-modal-layout-description />
          </div>
          <div className="om-property-modal__actions">
            <a href="/contact/" className="om-cta om-button om-button--outline">
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
              <span>Rappel</span>
            </a>
            <a href="/off-market/" className="om-cta om-button om-button--dark">
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
              <span>Recevoir le dossier</span>
            </a>
          </div>
        </div>
        <figure
          className="om-property-modal__plan om-property-modal__plan-frame"
          data-modal-layout-plan
        >
          <img
            data-modal-layout-image
            className="om-property-modal__plan-image"
            alt=""
            hidden
          />
          <p
            className="om-property-modal__plan-placeholder"
            data-modal-layout-placeholder
          >
            Plans transmis sur demande
          </p>
        </figure>
      </article>
    </>
  );
}

export const PROPERTY_DETAIL_ANCHORS = [
  { href: "#general", label: "Général", index: "01." },
  { href: "#a-propos", label: "À propos", index: "02." },
  { href: "#caracteristiques", label: "Caractéristiques", index: "03." },
  { href: "#exterieur", label: "Extérieur", index: "04." },
  { href: "#interieur", label: "Intérieur", index: "05." },
  { href: "#plans", label: "Plans", index: "06." },
] as const;
