"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import { useMotionMobile } from "@/components/motion/useMotionMobile";
import { MOTION_EASE, MOTION_VIEWPORT } from "@/lib/motion/config";

type ScrollRevealProps = {
  children: ReactNode;
  as?: keyof typeof motion;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  id?: string;
  disabled?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView">;

export function ScrollReveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 14,
  duration = 0.32,
  id,
  disabled = false,
  ...rest
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const mobile = useMotionMobile();
  const Tag = motion[as] as typeof motion.div;

  if (reduced || disabled) {
    const Plain = as as ElementType;
    return (
      <Plain id={id} className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  const offsetY = mobile ? y * 0.45 : y;
  const motionDuration = mobile ? Math.min(duration, 0.35) : duration;

  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0.96, y: offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...MOTION_VIEWPORT, amount: 0.05 }}
      transition={{ duration: motionDuration, ease: MOTION_EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
