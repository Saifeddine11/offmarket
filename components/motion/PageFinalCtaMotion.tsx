"use client";

import Link from "next/link";
import { motion as Motion, useReducedMotion } from "framer-motion";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { TextMaskReveal } from "@/components/motion/TextMaskReveal";
import { useMotionMobile } from "@/components/motion/useMotionMobile";
import { PageFinalCtaSection } from "@/components/sections/PageFinalCtaSection";
import { MOTION_EASE, MOTION_VIEWPORT } from "@/lib/motion/config";

const BUTTON_ICON = (
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

const ADVISOR_ICON = (
  <span className="om-button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3v4M16 3v4M4.5 9.5h15"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M6.5 5.5h11a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const CALCULATOR_ICON = (
  <span className="om-button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="M8 7h8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M8 11h2M12 11h2M16 11h2M8 15h2M12 15h2M16 15h2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

const DEFAULT_IMAGE_SRC = "/assets/mavericks/villa/mavericks-image00004-scaled.webp";

export type PageFinalCtaSecondaryButton = {
  href: string;
  label: string;
};

export type PageFinalCtaMotionProps = {
  imageSrc?: string;
  /** Override middle secondary CTA (e.g. on /simulateur/ use project selection instead). */
  secondaryCta?: PageFinalCtaSecondaryButton;
};

function buildCtaButtons(secondaryCta?: PageFinalCtaSecondaryButton) {
  const secondary = secondaryCta
    ? {
        href: secondaryCta.href,
        className: "om-button om-button--secondary",
        icon: BUTTON_ICON,
        label: secondaryCta.label,
      }
    : {
        href: "/simulateur/",
        className: "om-button om-button--secondary",
        icon: CALCULATOR_ICON,
        label: "Simulateur",
      };

  return [
    {
      href: "/contact/",
      className: "om-button om-button--primary",
      icon: BUTTON_ICON,
      label: "Demander un accès privé",
    },
    secondary,
    {
      href: "/contact/",
      className: "om-button om-button--secondary",
      icon: ADVISOR_ICON,
      label: "Parler à un conseiller",
    },
  ] as const;
}

/** Approved final CTA motion — background scale reveal, masked title, staggered actions. */
export function PageFinalCtaMotion({
  imageSrc = DEFAULT_IMAGE_SRC,
  secondaryCta,
}: PageFinalCtaMotionProps = {}) {
  const reduced = useReducedMotion();
  const mobile = useMotionMobile();
  const ctaButtons = buildCtaButtons(secondaryCta);

  if (reduced) {
    return <PageFinalCtaSection secondaryCta={secondaryCta} />;
  }

  return (
    <section
      className="om-final-cta om-final-cta--extended"
      id="final-cta"
      aria-labelledby="om-final-cta-title"
      data-scroll-section
      data-reveal-section
    >
      <div className="om-final-cta__media">
        <Motion.div
          className="om-final-cta__bg-motion"
          initial={{ scale: 1.05, opacity: 0.9 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={MOTION_VIEWPORT}
          transition={{ duration: mobile ? 0.9 : 1.2, ease: MOTION_EASE }}
        >
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            decoding="async"
            width={1440}
            height={900}
          />
        </Motion.div>

        <Motion.div
          className="om-final-cta__overlay"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={MOTION_VIEWPORT}
          transition={{ duration: 0.9, ease: MOTION_EASE, delay: 0.1 }}
        />

        <div className="om-final-cta__content">
          <ScrollReveal as="span" className="om-final-cta__eyebrow">
            PARLONS-EN
          </ScrollReveal>

          <TextMaskReveal
            as="h2"
            className="om-final-cta__title"
            id="om-final-cta-title"
            delay={0.1}
          >
            Votre projet mérite une lecture privée.
          </TextMaskReveal>

          <ScrollReveal
            as="p"
            className="om-final-cta__text"
            delay={0.18}
            y={40}
          >
            Dites-nous ce que vous recherchez. Nous vous répondons avec une
            sélection ciblée, une analyse claire et un accompagnement discret.
          </ScrollReveal>

          <ScrollReveal
            as="p"
            className="om-final-cta__trust"
            delay={0.22}
            y={28}
          >
            Nous qualifions votre demande avant de vous orienter vers les
            projets les plus cohérents avec votre profil.
          </ScrollReveal>

          <StaggerReveal
            className="om-final-cta__actions"
            stagger={0.1}
            delayChildren={0.28}
          >
            {ctaButtons.map((button) => (
              <StaggerItem key={button.label}>
                <Link href={button.href} className={button.className}>
                  {button.icon}
                  <span>{button.label}</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
