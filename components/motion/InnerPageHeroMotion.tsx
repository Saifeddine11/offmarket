"use client";

import Link from "next/link";

import { ImageScrollReveal } from "@/components/motion/ImageScrollReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextMaskReveal } from "@/components/motion/TextMaskReveal";
import type { InnerPageHeroProps } from "@/components/sections/InnerPageHero";

/** Approved inner-page hero motion — masked title, image reveal, breadcrumb fade-up. */
export function InnerPageHeroMotion(props: InnerPageHeroProps) {
  const {
    breadcrumbs,
    title,
    subtitle,
    imageSrc,
    scrollTarget,
    scrollLabel = "Scroll to explore ↓",
    breadcrumbAriaLabel = "Fil d'Ariane",
    actions,
  } = props;

  return (
    <section
      className="inner-hero"
      data-inner-hero
      data-om-framer-hero="true"
      aria-labelledby="inner-hero-title"
    >
      <div className="inner-hero__card">
        <ImageScrollReveal className="inner-hero__media" aria-hidden radius="0px">
          <img
            className="inner-hero__image"
            src={imageSrc}
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
          />
        </ImageScrollReveal>

        <div className="inner-hero__content">
          <ScrollReveal as="nav" className="inner-hero__breadcrumb" aria-label={breadcrumbAriaLabel}>
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
          </ScrollReveal>

          <div className="inner-hero__main">
            <TextMaskReveal
              as="h1"
              id="inner-hero-title"
              className="inner-hero__title"
              delay={0.1}
            >
              {title}
            </TextMaskReveal>
          </div>

          <div className="inner-hero__bottom">
            <div className="inner-hero__bottom-left">
              <ScrollReveal as="p" className="inner-hero__subtitle" delay={0.2} y={40}>
                {subtitle}
              </ScrollReveal>
              {actions ? (
                <div className="inner-hero__actions" data-hero-reveal="actions">
                  {actions}
                </div>
              ) : null}
            </div>

            {scrollTarget ? (
              <a className="inner-hero__scroll" href={scrollTarget}>
                {scrollLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
