import type { ReactNode } from "react";

import { HomeSimulatorCalculator } from "@/components/sections/HomeSimulatorCalculator";
import { SectionHeaderMotion } from "@/components/motion/SectionHeaderMotion";

export type HomeSimulatorSectionProps = {
  id?: string;
  titleId?: string;
  eyebrow?: string;
  title?: string;
  text?: ReactNode;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  motion?: boolean;
};

const DEFAULT_EYEBROW = "SIMULATEUR PRIVÉ";
const DEFAULT_TITLE = "Simuler avant d'investir";
const DEFAULT_TEXT = (
  <>
    Estimez le potentiel d&apos;un bien à Marrakech selon votre usage, puis affinez
    les chiffres avec <span className="om-brand-inline">OFF MARKET</span>.
  </>
);

/**
 * Homepage-style simulator embed (`om-simulator--home`).
 * Calculator logic is handled by `om-simulator.js` via `[data-simulator]`.
 */
export function HomeSimulatorSection({
  id = "simulateur",
  titleId = "om-simulator-home-title",
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  text = DEFAULT_TEXT,
  primaryCtaHref,
  secondaryCtaHref,
  motion = false,
}: HomeSimulatorSectionProps) {
  return (
    <section
      id={id}
      className="om-simulator--home"
      aria-labelledby={titleId}
      data-scroll-section
    >
      {motion ? (
        <SectionHeaderMotion
          className="om-simulator-home__header"
          eyebrowClassName="om-simulator-home__eyebrow"
          titleClassName="om-simulator-home__title"
          subtitleClassName="om-simulator-home__text"
          eyebrowAs="span"
          eyebrow={eyebrow}
          title={title}
          titleId={titleId}
          subtitle={text}
        />
      ) : (
        <header className="om-simulator-home__header">
          <span className="om-simulator-home__eyebrow">{eyebrow}</span>
          <h2 className="om-simulator-home__title" id={titleId}>
            {title}
          </h2>
          <p className="om-simulator-home__text">{text}</p>
        </header>
      )}

      <HomeSimulatorCalculator
        primaryCtaHref={primaryCtaHref}
        secondaryCtaHref={secondaryCtaHref}
        motion={motion}
      />
    </section>
  );
}
