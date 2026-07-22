import Link from "next/link";
import type { ReactNode } from "react";

export type InnerPageHeroBreadcrumb = {
  label: string;
  href?: string;
  current?: boolean;
};

export type InnerPageHeroProps = {
  breadcrumbs: InnerPageHeroBreadcrumb[];
  title: string;
  subtitle: string;
  imageSrc: string;
  scrollTarget?: string;
  scrollLabel?: string;
  breadcrumbAriaLabel?: string;
  /** Optional supporting line rendered below the subtitle. */
  secondary?: ReactNode;
  actions?: ReactNode;
};

/** Reusable inner-page hero — same structure as /about/. */
export function InnerPageHero({
  breadcrumbs,
  title,
  subtitle,
  imageSrc,
  scrollTarget,
  scrollLabel = "Scroll to explore ↓",
  breadcrumbAriaLabel = "Fil d'Ariane",
  secondary,
  actions,
}: InnerPageHeroProps) {
  return (
    <section
      className="inner-hero is-visible"
      data-inner-hero
      aria-labelledby="inner-hero-title"
    >
      <div className="inner-hero__card">
        <div className="inner-hero__media" aria-hidden="true">
          <img
            className="inner-hero__image"
            src={imageSrc}
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="inner-hero__content">
          <nav
            className="inner-hero__breadcrumb"
            aria-label={breadcrumbAriaLabel}
            data-hero-reveal="breadcrumb"
          >
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`}>
                {index > 0 ? (
                  <span className="inner-hero__breadcrumb-sep" aria-hidden="true">
                    •
                  </span>
                ) : null}
                {crumb.href && !crumb.current ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span aria-current={crumb.current ? "page" : undefined}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <div className="inner-hero__main">
            <h1
              id="inner-hero-title"
              className="inner-hero__title"
              data-hero-reveal="title"
            >
              {title}
            </h1>
          </div>

          <div className="inner-hero__bottom">
            <div className="inner-hero__bottom-left">
              <p className="inner-hero__subtitle" data-hero-reveal="subtitle">
                {subtitle}
              </p>
              {secondary ? (
                <p className="inner-hero__secondary" data-hero-reveal="secondary">
                  {secondary}
                </p>
              ) : null}
              {actions ? (
                <div className="inner-hero__actions" data-hero-reveal="actions">
                  {actions}
                </div>
              ) : null}
            </div>

            {scrollTarget ? (
              <a
                className="inner-hero__scroll"
                href={scrollTarget}
                data-hero-reveal="scroll"
              >
                {scrollLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
