"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import { useMotionMobile } from "@/components/motion/useMotionMobile";
import { MOTION_EASE, MOTION_VIEWPORT } from "@/lib/motion/config";

type StaggerRevealProps = {
  children: ReactNode;
  as?: keyof typeof motion;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  "aria-label"?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

export const staggerItemVariants = {
  hidden: { opacity: 0.92, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerReveal({
  children,
  as = "div",
  className,
  stagger = 0.12,
  delayChildren = 0,
  "aria-label": ariaLabel,
  ...rest
}: StaggerRevealProps) {
  const reduced = useReducedMotion();
  const mobile = useMotionMobile();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    const Plain = as as ElementType;
    return (
      <Plain className={className} aria-label={ariaLabel} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={MOTION_VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: mobile ? Math.min(stagger, 0.08) : stagger,
            delayChildren,
          },
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  duration = 0.95,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof motion;
  duration?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  const mobile = useMotionMobile();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0.92, y: mobile ? y * 0.4 : y * 0.6 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: mobile ? 0.35 : Math.min(duration, 0.45),
            ease: MOTION_EASE,
          },
        },
      }}
    >
      {children}
    </Tag>
  );
}
