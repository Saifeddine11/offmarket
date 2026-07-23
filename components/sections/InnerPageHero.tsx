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
  /** Optional responsive WebP/JPEG srcset for the LCP image. */
  imageSrcSet?: string;
  /** Optional AVIF srcset — rendered via <picture> when provided. */
  imageAvifSrcSet?: string;
  imageSizes?: string;
  imageWidth?: number;
  imageHeight?: number;
  scrollTarget?: string;
  scrollLabel?: string;
  breadcrumbAriaLabel?: string;
  /** Optional supporting line rendered below the subtitle. */
  secondary?: ReactNode;
  actions?: ReactNode;
};

function HeroMediaImage({
  imageSrc,
  imageSrcSet,
  imageSizes,
  imageWidth = 1920,
  imageHeight = 1080,
}: Pick<
  InnerPageHeroProps,
  "imageSrc" | "imageSrcSet" | "imageSizes" | "imageWidth" | "imageHeight"
>) {
  return (
    <img
      className="inner-hero__image"
      src={imageSrc}
      srcSet={imageSrcSet}
      sizes={imageSizes}
      alt=""
      width={imageWidth}
      height={imageHeight}
      decoding="async"
      loading="eager"
      fetchPriority="high"
    />
  );
}

/** Reusable inner-page hero — same structure as /about/. */
export function InnerPageHero({
  breadcrumbs,
  title,
  subtitle,
  imageSrc,
  imageSrcSet,
  imageAvifSrcSet,
  imageSizes = "100vw",
  imageWidth = 1920,
  imageHeight = 1080,
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
          {imageAvifSrcSet || imageSrcSet ? (
            <picture>
              {imageAvifSrcSet ? (
                <source
                  type="image/avif"
                  srcSet={imageAvifSrcSet}
                  sizes={imageSizes}
                />
              ) : null}
              {imageSrcSet ? (
                <source
                  type="image/webp"
                  srcSet={imageSrcSet}
                  sizes={imageSizes}
                />
              ) : null}
              <HeroMediaImage
                imageSrc={imageSrc}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
              />
            </picture>
          ) : (
            <HeroMediaImage
              imageSrc={imageSrc}
              imageSrcSet={imageSrcSet}
              imageSizes={imageSizes}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
            />
          )}
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
