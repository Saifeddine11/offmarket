"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useMotionMobile } from "@/components/motion/useMotionMobile";
import { MOTION_EASE, MOTION_VIEWPORT } from "@/lib/motion/config";

type ImageScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  radius?: string;
  parallax?: boolean;
  "aria-hidden"?: boolean | "true" | "false";
};

function isElementInViewport(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewportHeight * 0.92 && rect.bottom > viewportHeight * 0.08;
}

export function ImageScrollReveal({
  children,
  className,
  delay = 0,
  radius = "36px",
  parallax = true,
  "aria-hidden": ariaHidden,
}: ImageScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useMotionMobile();
  const inView = useInView(ref, { ...MOTION_VIEWPORT, amount: 0.05 });
  const [visibleOnLoad, setVisibleOnLoad] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const motionDuration = mobile ? 0.9 : 1.2;
  const revealed = reduced || inView || visibleOnLoad;

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    if (isElementInViewport(node)) {
      setVisibleOnLoad(true);
    }
  }, [reduced]);

  useEffect(() => {
    if (reduced || revealed) return;

    const node = ref.current;
    if (!node) return;

    const check = () => {
      if (isElementInViewport(node)) {
        setVisibleOnLoad(true);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });

    const safety = window.setTimeout(() => {
      if (node && isElementInViewport(node)) {
        setVisibleOnLoad(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.clearTimeout(safety);
    };
  }, [reduced, revealed]);

  if (reduced) {
    return (
      <div ref={ref} className={className} aria-hidden={ariaHidden}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      aria-hidden={ariaHidden}
      style={{ overflow: "hidden", borderRadius: radius === "0px" ? undefined : radius }}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
      transition={{ duration: motionDuration, ease: MOTION_EASE, delay }}
    >
      <motion.div
        className="om-image-scroll-reveal__inner"
        style={parallax && !mobile && revealed ? { y: imageY } : undefined}
        initial={{ scale: 1.04 }}
        animate={revealed ? { scale: 1 } : { scale: 1.04 }}
        transition={{ duration: motionDuration, ease: MOTION_EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
