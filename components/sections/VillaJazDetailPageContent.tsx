import { PageEntranceMotion } from "@/components/motion/PageEntranceMotion";
import { PageFinalCtaMotion } from "@/components/motion/PageFinalCtaMotion";
import {
  PROPERTY_DETAIL_ANCHORS,
  PROPERTY_DETAIL_ANCHORS_EN,
  PROPERTY_DETAIL_ANCHORS_IT,
  PROPERTY_DETAIL_ANCHORS_NL,
  PropertyModalSlides,
} from "@/components/property/PropertyModalSlides";
import type { SiteLocale } from "@/lib/i18n/types";

const VILLA_PAGE_COPY = {
  fr: { skip: "Aller au contenu principal", nav: "Navigation fiche bien" },
  en: { skip: "Skip to main content", nav: "Property detail navigation" },
  it: { skip: "Vai al contenuto principale", nav: "Navigazione scheda bene" },
  nl: { skip: "Naar hoofdinhoud", nav: "Navigatie vastgoedfiche" },
} satisfies Record<SiteLocale, { skip: string; nav: string }>;

function getAnchors(locale: SiteLocale) {
  if (locale === "en") return PROPERTY_DETAIL_ANCHORS_EN;
  if (locale === "it") return PROPERTY_DETAIL_ANCHORS_IT;
  if (locale === "nl") return PROPERTY_DETAIL_ANCHORS_NL;
  return PROPERTY_DETAIL_ANCHORS;
}

export function VillaJazDetailPageContent({
  locale = "fr",
}: {
  locale?: SiteLocale;
}) {
  const copy = VILLA_PAGE_COPY[locale];
  const anchors = getAnchors(locale);
  return (
    <>
      <a href="#main" className="sr-only sr-only--focusable">
        {copy.skip}
      </a>

      <PageEntranceMotion>
        <main id="main">
          <div
            className="om-property-detail-page"
            data-property-detail-page
            data-property-id="villa-jaz"
          >
            <div className="om-property-detail-page__layout">
              <div className="om-property-detail-page__sections">
                <div
                  className="om-property-detail-page__track om-property-modal__track"
                  data-property-detail-track
                >
                  <PropertyModalSlides
                    pageMode
                    locale={locale}
                  />
                </div>
              </div>

              <nav
                className="om-property-detail-page__nav"
                aria-label={copy.nav}
                data-property-detail-nav
              >
                <div className="om-property-detail-page__nav-inner">
                  {anchors.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="om-property-detail-page__nav-link"
                      data-property-detail-nav-link
                    >
                      <span>{item.index}</span> {item.label}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          <PageFinalCtaMotion locale={locale} />
        </main>
      </PageEntranceMotion>
    </>
  );
}
