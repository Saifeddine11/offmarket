import { QuartierFeatureCard } from "@/components/sections/QuartierFeatureCard";
import { SectionHeaderMotion } from "@/components/motion/SectionHeaderMotion";
import { quartierDetails } from "@/lib/quartiers/quartier-details";

/** /quartiers/ only — premium quartier detail fiches below Top 3 cards. */
export function QuartierDetailSection({ motion = false }: { motion?: boolean }) {
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
          eyebrow="QUARTIER PAR QUARTIER"
          title="Comprendre ce qui donne de la valeur à une adresse."
          titleId="om-quartier-details-title"
          subtitle="Chaque quartier de Marrakech répond à une logique différente : accessibilité, commerces, écoles, hôtellerie, demande locative, rareté et potentiel de revente."
        />
      ) : (
        <header className="om-quartier-details__header">
          <p className="om-quartier-details__eyebrow">QUARTIER PAR QUARTIER</p>
          <h2 className="om-quartier-details__title" id="om-quartier-details-title">
            Comprendre ce qui donne de la valeur à une adresse.
          </h2>
          <p className="om-quartier-details__subtitle">
            Chaque quartier de Marrakech répond à une logique différente : accessibilité,
            commerces, écoles, hôtellerie, demande locative, rareté et potentiel de revente.
          </p>
        </header>
      )}

      <div className="om-quartier-details__list">
        {quartierDetails.map((detail, index) => (
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
