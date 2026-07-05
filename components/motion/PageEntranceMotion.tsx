"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { MOTION_EASE } from "@/lib/motion/config";

/** Approved OFF MARKET page entrance — soft fade-up on load. */
export function PageEntranceMotion({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}
