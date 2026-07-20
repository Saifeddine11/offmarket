"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { MOTION_EASE } from "@/lib/motion/config";

/**
 * Soft page entrance — content stays visible (no blank flash on route changes).
 * Subtle rise only; never hide the page behind a dark body background.
 */
export function PageEntranceMotion({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 1, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}
