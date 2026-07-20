"use client";

import {
  Children,
  isValidElement,
  type ElementType,
  type ReactNode,
} from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { useMotionMobile } from "@/components/motion/useMotionMobile";
import { MOTION_EASE, MOTION_VIEWPORT } from "@/lib/motion/config";

type TextMaskRevealProps = {
  children: ReactNode;
  as?: keyof typeof motion;
  className?: string;
  id?: string;
  delay?: number;
  duration?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

function lineChunks(children: ReactNode): ReactNode[][] {
  const chunks: ReactNode[][] = [[]];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === "br") {
      chunks.push([]);
      return;
    }
    chunks[chunks.length - 1]?.push(child);
  });

  return chunks.filter((chunk) => chunk.length > 0);
}

export function TextMaskReveal({
  children,
  as = "h2",
  className,
  id,
  delay = 0,
  duration = 0.55,
  ...rest
}: TextMaskRevealProps) {
  const reduced = useReducedMotion();
  const mobile = useMotionMobile();
  const Tag = motion[as] as typeof motion.h2;
  const lines = lineChunks(children);
  const motionDuration = mobile ? 0.4 : duration;

  if (reduced) {
    const Plain = as as ElementType;
    return (
      <Plain id={id} className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag id={id} className={className} {...rest}>
      {lines.map((line, index) => (
        <span key={index} className="om-text-mask-reveal__line" aria-hidden={false}>
          <motion.span
            className="om-text-mask-reveal__inner"
            initial={{
              y: mobile ? "28%" : "45%",
              opacity: mobile ? 0.85 : 0.75,
            }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={MOTION_VIEWPORT}
            transition={{
              duration: motionDuration,
              ease: MOTION_EASE,
              delay: delay + index * 0.05,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
