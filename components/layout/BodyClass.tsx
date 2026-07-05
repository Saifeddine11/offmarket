"use client";

import { useLayoutEffect } from "react";

type BodyClassProps = {
  className: string;
  /** When true, legacy section scripts wait for React boot (avoids hydration errors). */
  deferLegacyBoot?: boolean;
};

/** Sets document.body class + optional legacy boot flag. */
export function BodyClass({ className, deferLegacyBoot }: BodyClassProps) {
  if (typeof document !== "undefined") {
    document.body.className = className;
    if (deferLegacyBoot) {
      document.body.dataset.omDeferLegacyBoot = "true";
    } else {
      delete document.body.dataset.omDeferLegacyBoot;
    }
  }

  useLayoutEffect(() => {
    document.body.className = className;
    if (deferLegacyBoot) {
      document.body.dataset.omDeferLegacyBoot = "true";
    } else {
      delete document.body.dataset.omDeferLegacyBoot;
    }
  }, [className, deferLegacyBoot]);

  return null;
}
