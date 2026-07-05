"use client";

import Link from "next/link";
import { motion as Motion, useReducedMotion } from "framer-motion";

import { ImageScrollReveal } from "@/components/motion/ImageScrollReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { QuartierDetailIconGlyph } from "@/components/sections/quartier-detail-icons";
import { useMotionMobile } from "@/components/motion/useMotionMobile";
import { MOTION_EASE, MOTION_VIEWPORT } from "@/lib/motion/config";
import type { QuartierDetail } from "@/lib/quartiers/quartier-details";

const CTA_ICON = (
  <span className="om-button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

type QuartierFeatureCardProps = {
  detail: QuartierDetail;
  reverse?: boolean;
  motion?: boolean;
};

export function QuartierFeatureCard({
  detail,
  reverse = false,
  motion = false,
}: QuartierFeatureCardProps) {
  const reduced = useReducedMotion();
  const mobile = useMotionMobile();
  const articleClassName =
    "quartier-feature-card" + (reverse ? " quartier-feature-card--reverse" : "");

  const panelX = reverse ? -48 : 48;

  const panelTop = (
    <>
      <ScrollReveal as="p" className="quartier-feature-card__meta" delay={0.08} disabled={!motion}>
        <span className="quartier-feature-card__number">{detail.number}</span>
        <span className="quartier-feature-card__meta-sep" aria-hidden="true">
          ·
        </span>
        <span className="quartier-feature-card__meta-label">{detail.valueLabel}</span>
      </ScrollReveal>

      <h3
        className="quartier-feature-card__title"
        id={`quartier-feature-${detail.id}-title`}
      >
        {detail.title}
      </h3>

      <p className="quartier-feature-card__description">{detail.description}</p>
      {detail.seoDescription ? (
        <p className="quartier-feature-card__description">{detail.seoDescription}</p>
      ) : null}

      {motion ? (
        <StaggerReveal
          as="ul"
          className="quartier-feature-card__points"
          aria-label={`Points clés — ${detail.title}`}
          stagger={0.06}
          delayChildren={0.2}
        >
          {detail.points.map((point) => (
            <StaggerItem
              key={point.label}
              as="li"
              className={
                "quartier-feature-card__point" +
                (point.accent === "green" ? " quartier-feature-card__point--green" : "")
              }
            >
              <span className="quartier-feature-card__point-icon" aria-hidden="true">
                <QuartierDetailIconGlyph name={point.icon} />
              </span>
              <span className="quartier-feature-card__point-label">{point.label}</span>
            </StaggerItem>
          ))}
        </StaggerReveal>
      ) : (
        <ul className="quartier-feature-card__points" aria-label={`Points clés — ${detail.title}`}>
          {detail.points.map((point) => (
            <li
              key={point.label}
              className={
                "quartier-feature-card__point" +
                (point.accent === "green" ? " quartier-feature-card__point--green" : "")
              }
            >
              <span className="quartier-feature-card__point-icon" aria-hidden="true">
                <QuartierDetailIconGlyph name={point.icon} />
              </span>
              <span className="quartier-feature-card__point-label">{point.label}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  const cta = (
    <Link
      href={detail.ctaHref}
      className="om-button om-button--dark quartier-feature-card__cta"
    >
      {CTA_ICON}
      <span>{detail.ctaLabel}</span>
    </Link>
  );

  if (!motion || reduced) {
    return (
      <article
        id={`quartier-${detail.id}`}
        className={articleClassName}
        aria-labelledby={`quartier-feature-${detail.id}-title`}
      >
        <div className="quartier-feature-card__media">
          <img
            className="quartier-feature-card__image"
            src={detail.image}
            alt={detail.imageAlt}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="quartier-feature-card__panel">
          {panelTop}
          {cta}
        </div>
      </article>
    );
  }

  return (
    <article
      id={`quartier-${detail.id}`}
      className={articleClassName}
      aria-labelledby={`quartier-feature-${detail.id}-title`}
    >
      <ImageScrollReveal className="quartier-feature-card__media" delay={0.12}>
        <img
          className="quartier-feature-card__image"
          src={detail.image}
          alt={detail.imageAlt}
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
        />
      </ImageScrollReveal>

      <Motion.div
        className="quartier-feature-card__panel"
        initial={{ opacity: 0, x: mobile ? panelX * 0.5 : panelX, y: mobile ? 12 : 24 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={MOTION_VIEWPORT}
        transition={{
          duration: mobile ? 0.85 : 1,
          ease: MOTION_EASE,
          delay: 0.22,
        }}
      >
        {panelTop}
        <ScrollReveal delay={0.32} y={20} duration={0.9}>
          {cta}
        </ScrollReveal>
      </Motion.div>
    </article>
  );
}
