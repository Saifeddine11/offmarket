"use client";

import type { ElementType, ReactNode } from "react";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextMaskReveal } from "@/components/motion/TextMaskReveal";

type SectionHeaderMotionProps = {
  eyebrow?: ReactNode;
  eyebrowAs?: ElementType;
  title: ReactNode;
  titleId?: string;
  subtitle?: ReactNode;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export function SectionHeaderMotion({
  eyebrow,
  eyebrowAs: EyebrowTag = "p",
  title,
  titleId,
  subtitle,
  className = "",
  eyebrowClassName = "",
  titleClassName = "",
  subtitleClassName = "",
}: SectionHeaderMotionProps) {
  return (
    <header className={className}>
      {eyebrow ? (
        <ScrollReveal
          as={EyebrowTag === "span" ? "span" : "p"}
          className={eyebrowClassName}
        >
          {eyebrow}
        </ScrollReveal>
      ) : null}
      <TextMaskReveal as="h2" id={titleId} className={titleClassName} delay={0.08}>
        {title}
      </TextMaskReveal>
      {subtitle ? (
        <ScrollReveal as="p" className={subtitleClassName} delay={0.18} y={40} duration={0.95}>
          {subtitle}
        </ScrollReveal>
      ) : null}
    </header>
  );
}
