export type PropertyModalSlidesProps = {
  /** When true, slides stack as page sections with anchor IDs (no carousel). */
  pageMode?: boolean;
  /** Modal-only: title id for aria-labelledby on the dialog shell. */
  titleId?: string;
  locale?: "fr" | "en" | "nl";
};

const PAGE_SECTIONS = [
  { slide: "general", id: "general", active: true },
  { slide: "about", id: "a-propos", active: true },
  { slide: "characteristics", id: "caracteristiques", active: true },
  { slide: "exterior", id: "exterieur", active: true },
  { slide: "interior", id: "interieur", active: true },
  { slide: "layout", id: "plans", active: true },
] as const;

const COPY = {
  fr: {
    type: "Villa sur plan",
    selectionLabel: "Sélection :",
    selectionValue: "Projet sur plan",
    price: "Prix",
    fromPrice: "À partir de 351 000 €",
    callback: "Rappel",
    dossier: "Recevoir le dossier",
    project: "Projet",
    gallery: "Galerie",
    photos: "5 photos",
    exterior: "Extérieur",
    interior: "Intérieur",
    view: "Voir",
    layoutTitle: "Plans & configuration",
    ground: "Rez-de-chaussée",
    first: "Étage",
    surface: "Surface",
    suites: "Suites",
    baths: "Salles d'eau",
    requestDetails: "Détails sur demande",
    plansRequest: "Plans transmis sur demande",
    contactHref: "/contact/",
    dossierHref: "/off-market/",
  },
  en: {
    type: "Off-plan villa",
    selectionLabel: "Selection:",
    selectionValue: "Off-plan property",
    price: "Price",
    fromPrice: "From €351,000",
    callback: "Callback",
    dossier: "Receive the dossier",
    project: "Project",
    gallery: "Gallery",
    photos: "5 photos",
    exterior: "Exterior",
    interior: "Interior",
    view: "View",
    layoutTitle: "Plans & configuration",
    ground: "Ground floor",
    first: "First floor",
    surface: "Area",
    suites: "Suites",
    baths: "Bathrooms",
    requestDetails: "Details on request",
    plansRequest: "Plans shared on request",
    contactHref: "/en/contact/",
    dossierHref: "/en/off-market/",
  },
  nl: {
    type: "Nieuwbouwvilla",
    selectionLabel: "Selectie:",
    selectionValue: "Nieuwbouwproject",
    price: "Prijs",
    fromPrice: "Vanaf 351.000 €",
    callback: "Terugbelverzoek",
    dossier: "Het dossier ontvangen",
    project: "Project",
    gallery: "Galerij",
    photos: "5 foto's",
    exterior: "Exterieur",
    interior: "Interieur",
    view: "Bekijken",
    layoutTitle: "Plattegronden en indeling",
    ground: "Begane grond",
    first: "Verdieping",
    surface: "Oppervlakte",
    suites: "Suites",
    baths: "Badkamers",
    requestDetails: "Details op aanvraag",
    plansRequest: "Plattegronden op aanvraag",
    contactHref: "/nl/contact/",
    dossierHref: "/nl/off-market/",
  },
} as const;

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
  locale = "fr",
}: PropertyModalSlidesProps) {
  const copy = COPY[locale] ?? COPY.fr;
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
              <span data-modal-type>{copy.type}</span>
            </div>
          </div>
          <p className="om-property-modal__selection" data-modal-selection>
            <span>{copy.selectionLabel}</span> {copy.selectionValue}
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
              <span>{copy.price}</span>
              <strong data-modal-price-bottom>{copy.fromPrice}</strong>
            </div>
            <div className="om-property-modal__actions">
              <a href={copy.contactHref} className="om-cta om-button om-button--outline">
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
                <span>{copy.callback}</span>
              </a>
              <a href={copy.dossierHref} className="om-cta om-button om-button--dark">
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
                <span>{copy.dossier}</span>
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
              <span>{copy.project}</span>
              <strong data-modal-about-project>{copy.selectionValue}</strong>
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
          <span>{copy.gallery}</span>
          <strong data-modal-exterior-count>{copy.photos}</strong>
          <p>{copy.exterior}</p>
          <button type="button" data-modal-gallery-focus="exterior">
            {copy.view}
          </button>
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
          <span>{copy.gallery}</span>
          <strong data-modal-interior-count>{copy.photos}</strong>
          <p>{copy.interior}</p>
          <button type="button" data-modal-gallery-focus="interior">
            {copy.view}
          </button>
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
            <h3>{copy.layoutTitle}</h3>
            <div className="om-property-modal__layout-tabs" data-modal-layout-tabs>
              <button type="button" className="is-active" data-layout-floor="ground">
                {copy.ground}
              </button>
              <button type="button" data-layout-floor="first">
                {copy.first}
              </button>
            </div>
            <div className="om-property-modal__layout-meta">
              <div>
                <span>{copy.surface}</span>
                <strong data-modal-layout-surface>{copy.requestDetails}</strong>
              </div>
              <div>
                <span>{copy.suites}</span>
                <strong data-modal-layout-rooms>{copy.requestDetails}</strong>
              </div>
              <div>
                <span>{copy.baths}</span>
                <strong data-modal-layout-baths>{copy.requestDetails}</strong>
              </div>
            </div>
            <p data-modal-layout-description />
          </div>
          <div className="om-property-modal__actions">
            <a href={copy.contactHref} className="om-cta om-button om-button--outline">
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
              <span>{copy.callback}</span>
            </a>
            <a href={copy.dossierHref} className="om-cta om-button om-button--dark">
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
              <span>{copy.dossier}</span>
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
            {copy.plansRequest}
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

export const PROPERTY_DETAIL_ANCHORS_EN = [
  { href: "#general", label: "General", index: "01." },
  { href: "#a-propos", label: "About", index: "02." },
  { href: "#caracteristiques", label: "Features", index: "03." },
  { href: "#exterieur", label: "Exterior", index: "04." },
  { href: "#interieur", label: "Interior", index: "05." },
  { href: "#plans", label: "Plans", index: "06." },
] as const;

export const PROPERTY_DETAIL_ANCHORS_NL = [
  { href: "#general", label: "Algemeen", index: "01." },
  { href: "#a-propos", label: "Over dit project", index: "02." },
  { href: "#caracteristiques", label: "Kenmerken", index: "03." },
  { href: "#exterieur", label: "Exterieur", index: "04." },
  { href: "#interieur", label: "Interieur", index: "05." },
  { href: "#plans", label: "Plattegronden", index: "06." },
] as const;
