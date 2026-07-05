"use client";

import { ContactLeadQuestionnaire } from "@/components/contact/ContactLeadQuestionnaire";
import { getFormCopy } from "@/lib/i18n/formCopy";
import type { SiteLocale } from "@/lib/i18n/types";

export type HomePrivateAccessLeadSectionProps = {
  locale?: SiteLocale;
  source?: string;
  context?: string;
  intent?: string;
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

/**
 * Homepage "Recevoir la sélection off-market" block — 3-step questionnaire + lead form.
 * Same markup/classes as the legacy `section.om-home-private-access` section.
 */
export function HomePrivateAccessLeadSection({
  locale = "fr",
  source = "homepage",
  context = "home_access",
  intent = "homepage-off-market",
  id = "acces-off-market",
  eyebrow,
  title = "Recevoir la sélection off-market",
  subtitle = "Remplissez le formulaire pour accéder aux projets confidentiels et recevoir une sélection privée adaptée à votre budget.",
}: HomePrivateAccessLeadSectionProps) {
  const copy = getFormCopy(locale);

  return (
    <section
      className="om-home-private-access is-animated-fallback"
      id={id}
      aria-labelledby="om-home-private-access-title"
      data-scroll-section
    >
      <div className="om-home-private-access__inner">
        <header className="om-home-private-access__header">
          <span className="om-home-private-access__eyebrow">
            {eyebrow ?? copy.eyebrow}
          </span>
          <h2
            id="om-home-private-access-title"
            className="om-home-private-access__title"
          >
            {title}
          </h2>
          <p className="om-home-private-access__subtitle">{subtitle}</p>
        </header>

        <div className="om-home-private-access__questionnaire">
          <ContactLeadQuestionnaire
            locale={locale}
            embedded
            source={source}
            context={context}
            intent={intent}
          />
        </div>
      </div>
    </section>
  );
}
