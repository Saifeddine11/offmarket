import { QuartierFeatureCard } from "@/components/sections/QuartierFeatureCard";
import { SectionHeaderMotion } from "@/components/motion/SectionHeaderMotion";
import {
  quartierDetails,
  quartierDetailsEn,
  quartierDetailsNl,
} from "@/lib/quartiers/quartier-details";
import type { SiteLocale } from "@/lib/i18n/types";

/** /quartiers/ only — premium quartier detail fiches below Top 3 cards. */
const DETAIL_COPY = {
  fr: {
    eyebrow: "QUARTIER PAR QUARTIER",
    title: "Comprendre ce qui donne de la valeur à une adresse.",
    subtitle:
      "Chaque quartier de Marrakech répond à une logique différente : accessibilité, commerces, écoles, hôtellerie, demande locative, rareté et potentiel de revente.",
  },
  en: {
    eyebrow: "AREA BY AREA",
    title: "Understand what gives value to an address.",
    subtitle:
      "Each Marrakech neighbourhood follows a different logic: access, shops, schools, hospitality, rental demand, rarity and resale potential.",
  },
  it: {
    eyebrow: "QUARTIERE PER QUARTIERE",
    title: "Capire cosa dà valore a un indirizzo.",
    subtitle:
      "Ogni quartiere di Marrakech risponde a una logica diversa: accessibilità, negozi, scuole, hotellerie, domanda locativa, rarità e potenziale di rivendita.",
  },
  nl: {
    eyebrow: "WIJK PER WIJK",
    title: "Begrijpen wat waarde geeft aan een adres.",
    subtitle:
      "Elke wijk in Marrakech volgt een andere logica: bereikbaarheid, winkels, scholen, hotellerie, huurvraag, schaarste en herverkooppotentieel.",
  },
} satisfies Record<SiteLocale, { eyebrow: string; title: string; subtitle: string }>;

function getDetails(locale: SiteLocale) {
  if (locale === "en") return quartierDetailsEn;
  if (locale === "nl") return quartierDetailsNl;
  return quartierDetails;
}

export function QuartierDetailSection({
  motion = false,
  locale = "fr",
}: {
  motion?: boolean;
  locale?: SiteLocale;
}) {
  const copy = DETAIL_COPY[locale] ?? DETAIL_COPY.fr;
  const details = getDetails(locale);
  return (
    <section
      id="quartiers-details"
      className="om-quartier-details"
      aria-labelledby="om-quartier-details-title"
    >
      {motion ? (
        <SectionHeaderMotion
          className="om-quartier-details__header"
          eyebrowClassName="om-quartier-details__eyebrow"
          titleClassName="om-quartier-details__title"
          subtitleClassName="om-quartier-details__subtitle"
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="om-quartier-details-title"
          subtitle={copy.subtitle}
        />
      ) : (
        <header className="om-quartier-details__header">
          <p className="om-quartier-details__eyebrow">{copy.eyebrow}</p>
          <h2 className="om-quartier-details__title" id="om-quartier-details-title">
            {copy.title}
          </h2>
          <p className="om-quartier-details__subtitle">
            {copy.subtitle}
          </p>
        </header>
      )}

      <div className="om-quartier-details__list">
        {details.map((detail, index) => (
          <QuartierFeatureCard
            key={detail.id}
            detail={detail}
            reverse={index === 1}
            motion={motion}
          />
        ))}
      </div>
    </section>
  );
}
