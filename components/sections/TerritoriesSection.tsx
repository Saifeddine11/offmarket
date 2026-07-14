import type { ReactNode } from "react";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeaderMotion } from "@/components/motion/SectionHeaderMotion";

type TerritoriesSectionProps = {
  /** `home` = 3 cards. `quartiers` = 3 cards, /quartiers/ grid layout. `page` = 6 cards (legacy extended gallery). */
  variant?: "home" | "quartiers" | "page";
  id?: string;
  ariaLabel?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  motion?: boolean;
};

const DEFAULT_TITLE = (
  <>
    Les zones où se construisent
    <br />
    les meilleures opportunités
  </>
);

/**
 * Homepage Quartiers / Territories gallery shell.
 * Cards are mounted by `om-territories.js` (preserve animation hooks).
 */
export function TerritoriesSection({
  variant = "home",
  id,
  ariaLabel = "Territoires d'investissement à Marrakech",
  eyebrow = "QUARTIERS",
  title = DEFAULT_TITLE,
  subtitle,
  motion = false,
}: TerritoriesSectionProps) {
  const sectionId =
    id ?? (variant === "page" ? "quartiers-territories" : "territories");
  const sectionClass =
    variant === "page"
      ? "om-territories om-territories--extended"
      : variant === "quartiers"
        ? "om-territories om-territories--quartiers-page"
        : "om-territories";

  return (
    <section
      id={sectionId}
      className={sectionClass}
      aria-label={ariaLabel}
      data-scroll-section
      data-om-territories-set={variant}
      // om-territories.js stamps data-om-territories-init, sometimes before hydration
      suppressHydrationWarning
    >
      {motion ? (
        <SectionHeaderMotion
          className="om-territories__header"
          eyebrowClassName="om-territories__eyebrow"
          titleClassName="om-territories__title"
          subtitleClassName="om-territories__subtitle"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />
      ) : (
        <div className="om-territories__header">
          <p className="om-territories__eyebrow">{eyebrow}</p>
          <h2 className="om-territories__title">{title}</h2>
          {subtitle ? (
            <p className="om-territories__subtitle">{subtitle}</p>
          ) : null}
        </div>
      )}
      <ScrollReveal
        className="om-territories__gallery-wrap"
        delay={0.12}
        disabled={!motion || variant === "quartiers"}
      >
        <div className="om-territories__desktop" data-om-territories-desktop>
          {/* Cards are injected by om-territories.js, sometimes before hydration */}
          <div
            className="om-territories__stage"
            data-om-territories-stage
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: "" }}
          />
        </div>
        <div
          className="om-territories__mobile"
          data-om-territories-mobile
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: "" }}
        />
      </ScrollReveal>
    </section>
  );
}
