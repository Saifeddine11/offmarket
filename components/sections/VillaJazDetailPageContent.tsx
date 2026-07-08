import { PageEntranceMotion } from "@/components/motion/PageEntranceMotion";
import { PageFinalCtaMotion } from "@/components/motion/PageFinalCtaMotion";
import {
  PROPERTY_DETAIL_ANCHORS,
  PropertyModalSlides,
} from "@/components/property/PropertyModalSlides";

export function VillaJazDetailPageContent() {
  return (
    <>
      <a href="#main" className="sr-only sr-only--focusable">
        Aller au contenu principal
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
                  <PropertyModalSlides pageMode />
                </div>
              </div>

              <nav
                className="om-property-detail-page__nav"
                aria-label="Navigation fiche bien"
                data-property-detail-nav
              >
                <div className="om-property-detail-page__nav-inner">
                  {PROPERTY_DETAIL_ANCHORS.map((item) => (
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

          <PageFinalCtaMotion />
        </main>
      </PageEntranceMotion>
    </>
  );
}
