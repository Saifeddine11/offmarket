import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextMaskReveal } from "@/components/motion/TextMaskReveal";
import { PropertyModalSlides } from "@/components/property/PropertyModalSlides";
import { serializeProjectCardCopy } from "@/lib/i18n/projectCardCopy";
import type { SiteLocale } from "@/lib/i18n/types";

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
  locale?: string;
};

const FEATURED_COPY: Record<SiteLocale, {
  ariaLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  note: string;
  ctaLabel: string;
  ctaHref: string;
  ctaProof: string;
  popupClose: string;
  popupBadge: string;
  popupTitle: string;
  popupText: string;
  popupButton: string;
  closeModal: string;
  prev: string;
  next: string;
  tabsAria: string;
  tabs: readonly string[];
}> = {
  fr: {
    ariaLabel: "Biens accessibles sur dossier",
    eyebrow: "ADRESSES CONFIDENTIELLES",
    title: "Opportunités rares à Marrakech",
    lead: "Des biens sélectionnés en dehors des circuits classiques, avec des informations essentielles visibles et un dossier complet transmis sur demande.",
    note: "Sélection actualisée régulièrement.",
    ctaLabel: "Demander l'accès",
    ctaHref: "/off-market/",
    ctaProof: "15+ projets privés suivis à Marrakech",
    popupClose: "Fermer",
    popupBadge: "ACCÈS PRIVÉ",
    popupTitle:
      "Terrains, maisons, hôtels et restaurants vous attendent en off-market.",
    popupText: "Inscrivez-vous pour avoir accès à la sélection privée.",
    popupButton: "Débloquer l'accès",
    closeModal: "Fermer la fiche",
    prev: "Slide précédente",
    next: "Slide suivante",
    tabsAria: "Navigation fiche bien",
    tabs: ["Général", "À propos", "Caractéristiques", "Extérieur", "Intérieur", "Plans"],
  },
  en: {
    ariaLabel: "Properties available by private dossier",
    eyebrow: "CONFIDENTIAL ADDRESSES",
    title: "Rare opportunities in Marrakech",
    lead: "Properties selected outside the usual channels, with essential information visible and a complete dossier shared on request.",
    note: "Selection updated regularly.",
    ctaLabel: "Request access",
    ctaHref: "/en/off-market/",
    ctaProof: "15+ private projects monitored in Marrakech",
    popupClose: "Close",
    popupBadge: "PRIVATE ACCESS",
    popupTitle:
      "Land, homes, hotels and restaurants are available off-market.",
    popupText: "Register to access the private selection.",
    popupButton: "Unlock access",
    closeModal: "Close property sheet",
    prev: "Previous slide",
    next: "Next slide",
    tabsAria: "Property sheet navigation",
    tabs: ["General", "About", "Features", "Exterior", "Interior", "Plans"],
  },
  it: {
    ariaLabel: "Immobili disponibili su dossier",
    eyebrow: "INDIRIZZI RISERVATI",
    title: "Opportunità rare a Marrakech",
    lead: "Beni selezionati fuori dai circuiti classici, con informazioni essenziali visibili e dossier completo trasmesso su richiesta.",
    note: "Selezione aggiornata regolarmente.",
    ctaLabel: "Richiedi accesso",
    ctaHref: "/it/off-market/",
    ctaProof: "15+ progetti privati seguiti a Marrakech",
    popupClose: "Chiudi",
    popupBadge: "ACCESSO PRIVATO",
    popupTitle:
      "Terreni, case, hotel e ristoranti ti aspettano off-market.",
    popupText: "Iscriviti per accedere alla selezione privata.",
    popupButton: "Sblocca l'accesso",
    closeModal: "Chiudi la scheda",
    prev: "Slide precedente",
    next: "Slide successiva",
    tabsAria: "Navigazione scheda immobile",
    tabs: ["Generale", "Informazioni", "Caratteristiche", "Esterno", "Interno", "Planimetrie"],
  },
  nl: {
    ariaLabel: "Vastgoed beschikbaar op privaat dossier",
    eyebrow: "VERTROUWELIJKE ADRESSEN",
    title: "Zeldzame kansen in Marrakech",
    lead: "Vastgoed geselecteerd buiten de klassieke kanalen, met essentiële informatie vooraf en een volledig dossier op aanvraag.",
    note: "De selectie wordt regelmatig bijgewerkt.",
    ctaLabel: "Toegang aanvragen",
    ctaHref: "/nl/off-market/",
    ctaProof: "15+ private projecten opgevolgd in Marrakech",
    popupClose: "Sluiten",
    popupBadge: "PRIVATE TOEGANG",
    popupTitle:
      "Gronden, woningen, hotels en restaurants zijn off-market beschikbaar.",
    popupText: "Registreer u voor toegang tot de private selectie.",
    popupButton: "Toegang openen",
    closeModal: "Vastgoedfiche sluiten",
    prev: "Vorige slide",
    next: "Volgende slide",
    tabsAria: "Navigatie vastgoedfiche",
    tabs: ["Algemeen", "Over dit project", "Kenmerken", "Exterieur", "Interieur", "Plattegronden"],
  },
};

function resolveLocale(locale?: string): SiteLocale {
  return locale === "en" || locale === "it" || locale === "nl" ? locale : "fr";
}

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
  locale,
}: FeaturedProjectsSectionProps) {
  const resolvedLocale = resolveLocale(locale);
  const copy = FEATURED_COPY[resolvedLocale];
  const sectionEyebrow = eyebrow === "ADRESSES CONFIDENTIELLES" ? copy.eyebrow : eyebrow;
  const sectionTitle = title === "Opportunités rares à Marrakech" ? copy.title : title;
  const sectionLead =
    lead ===
    "Des biens sélectionnés en dehors des circuits classiques, avec des informations essentielles visibles et un dossier complet transmis sur demande."
      ? copy.lead
      : lead;
  const sectionNote =
    note === "Sélection actualisée régulièrement." ? copy.note : note;
  const sectionCtaLabel =
    ctaLabel === "Demander l'accès" ? copy.ctaLabel : ctaLabel;
  const sectionCtaHref = ctaHref === "/off-market/" ? copy.ctaHref : ctaHref;
  const sectionCtaProof =
    ctaProof === "15+ projets privés suivis à Marrakech"
      ? copy.ctaProof
      : ctaProof;

  return (
    <section
      id={id}
      className="om-featured-projects"
      aria-label={copy.ariaLabel}
      data-scroll-section
    >
      <div className="om-featured-projects__container">
        <header className="om-featured-projects__intro">
          <div className="om-featured-projects__intro-copy">
            {motion ? (
              <>
                <ScrollReveal as="p" className="om-featured-projects__eyebrow">
                  {sectionEyebrow}
                </ScrollReveal>
                <TextMaskReveal
                  as="h2"
                  className="om-featured-projects__title"
                  delay={0.08}
                >
                  {sectionTitle}
                </TextMaskReveal>
                <ScrollReveal
                  as="p"
                  className="om-featured-projects__lead"
                  delay={0.16}
                  y={30}
                >
                  {sectionLead}
                </ScrollReveal>
                <ScrollReveal
                  as="p"
                  className="om-featured-projects__note"
                  delay={0.22}
                  y={20}
                >
                  {sectionNote}
                </ScrollReveal>
              </>
            ) : (
              <>
                <p className="om-featured-projects__eyebrow">{sectionEyebrow}</p>
                <h2 className="om-featured-projects__title">{sectionTitle}</h2>
                <p className="om-featured-projects__lead">{sectionLead}</p>
                <p className="om-featured-projects__note">{sectionNote}</p>
              </>
            )}
          </div>
          <div className="om-featured-projects__intro-action">
            <a href={sectionCtaHref} className="om-cta om-button om-button--dark">
              {CTA_ICON}
              <span>{sectionCtaLabel}</span>
            </a>
            <p className="om-featured-projects__cta-proof">{sectionCtaProof}</p>
          </div>
        </header>

        {/* Cards are injected by om-featured-projects.js, sometimes before
            hydration — dangerouslySetInnerHTML keeps hydration from diffing. */}
        <ScrollReveal
          className="om-featured-projects__grid"
          data-om-property-cards=""
          data-om-project-card-copy={serializeProjectCardCopy(resolvedLocale)}
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
            aria-label={copy.popupClose}
          >
            ×
          </button>
          <span className="om-private-access-popup__badge">{copy.popupBadge}</span>
          <h3>{copy.popupTitle}</h3>
          <p>{copy.popupText}</p>
          <a className="om-private-access-popup__button" href={copy.ctaHref}>
            {copy.popupButton}
          </a>
        </div>
      </div>

      <PropertyModalShell locale={resolvedLocale} />
    </section>
  );
}

/** Static shell hydrated at runtime by `om-property-modal.js` — same markup/data as the homepage modal. */
function PropertyModalShell({ locale }: { locale: SiteLocale }) {
  const copy = FEATURED_COPY[locale];

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
          aria-label={copy.closeModal}
        >
          ×
        </button>
        <div className="om-property-modal__stage">
          <div className="om-property-modal__track" data-property-modal-track>
            <PropertyModalSlides locale={locale === "it" ? "en" : locale} />
          </div>
        </div>
        <div className="om-property-modal__arrows" aria-hidden="false">
          <button
            type="button"
            className="om-property-modal__arrow om-property-modal__arrow--prev"
            data-modal-prev
            aria-label={copy.prev}
            aria-disabled="true"
          >
            ←
          </button>
          <button
            type="button"
            className="om-property-modal__arrow om-property-modal__arrow--next"
            data-modal-next
            aria-label={copy.next}
          >
            →
          </button>
        </div>
        <nav className="om-property-modal__tabs" aria-label={copy.tabsAria}>
          <button type="button" className="is-active" data-modal-tab="general">
            <span>01.</span> {copy.tabs[0]}
          </button>
          <button type="button" data-modal-tab="about">
            <span>02.</span> {copy.tabs[1]}
          </button>
          <button type="button" data-modal-tab="characteristics">
            <span>03.</span> {copy.tabs[2]}
          </button>
          <button type="button" data-modal-tab="exterior">
            <span>04.</span> {copy.tabs[3]}
          </button>
          <button type="button" data-modal-tab="interior">
            <span>05.</span> {copy.tabs[4]}
          </button>
          <button type="button" data-modal-tab="layout">
            <span>06.</span> {copy.tabs[5]}
          </button>
        </nav>
      </section>
    </div>
  );
}
