import Link from "next/link";

import { ContactLeadQuestionnaire } from "@/components/contact/ContactLeadQuestionnaire";
import { PageEntranceMotion } from "@/components/motion/PageEntranceMotion";
import { PageFinalCtaMotion } from "@/components/motion/PageFinalCtaMotion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getContactCopy } from "@/lib/i18n/contactCopy";
import type { SiteLocale } from "@/lib/i18n/types";

const VISUAL_IMAGE = "/assets/mavericks/location/mavericks-gueliz-hypercentre.webp";

type ContactPageContentProps = {
  homeHref?: string;
  locale?: SiteLocale;
};

export function ContactPageContent({
  homeHref = "/",
  locale = "fr",
}: ContactPageContentProps) {
  const copy = getContactCopy(locale);

  return (
    <>
      <a href="#main" className="sr-only sr-only--focusable">
        {copy.skipToMain}
      </a>

      <PageEntranceMotion>
        <main id="main" className="om-contact-lead-page">
          <div className="om-contact-lead-page__inner">
            <ScrollReveal
              as="nav"
              className="om-contact-lead-page__breadcrumb"
              aria-label={copy.breadcrumbAria}
            >
              <Link href={homeHref}>{copy.breadcrumbHome}</Link>
              <span className="om-contact-lead-page__breadcrumb-sep" aria-hidden="true">
                ·
              </span>
              <span aria-current="page">{copy.breadcrumbCurrent}</span>
            </ScrollReveal>

            <div className="om-contact-lead-page__columns">
              <section
                className="om-contact-lead-page__visual"
                aria-labelledby="om-contact-visual-title"
              >
                <ScrollReveal className="om-contact-lead-page__image-wrap" delay={0.06}>
                  <div className="om-contact-lead-page__image-card">
                    <img
                      src={VISUAL_IMAGE}
                      alt=""
                      className="om-contact-lead-page__image"
                      width={720}
                      height={900}
                      loading="eager"
                      decoding="async"
                    />
                    <div className="om-contact-lead-page__image-overlay" aria-hidden="true" />
                    <div className="om-contact-lead-page__image-copy">
                      <h1 id="om-contact-visual-title" className="om-contact-lead-page__image-title">
                        {copy.h1}
                      </h1>
                      <p className="om-contact-lead-page__image-text">{copy.intro}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </section>

              <section
                className="om-contact-lead-page__form-column"
                aria-label={copy.formColumnAria}
              >
                <ScrollReveal delay={0.08}>
                  <ContactLeadQuestionnaire locale={locale} />
                </ScrollReveal>

                <ScrollReveal className="om-contact-lead-page__aside" delay={0.14}>
                  <div className="om-contact-lead-page__info-card">
                    <p className="om-contact-lead-page__info-brand">{copy.infoBrand}</p>
                    <p className="om-contact-lead-page__info-city">{copy.infoCity}</p>
                    <p className="om-contact-lead-page__info-text">{copy.infoText}</p>
                    <div className="om-contact-lead-page__chips">
                      {copy.trustChips.map((chip) => (
                        <span key={chip} className="om-contact-lead-page__chip">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </section>
            </div>
          </div>

          <PageFinalCtaMotion />
        </main>
      </PageEntranceMotion>
    </>
  );
}
