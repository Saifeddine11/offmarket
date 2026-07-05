"use client";

import { useLayoutEffect } from "react";

type HtmlInitProps = {
  preloaderDisabled?: boolean;
  removeNotReady?: boolean;
  addNotReady?: boolean;
};

export function HtmlInit({
  preloaderDisabled = false,
  removeNotReady = false,
  addNotReady = false,
}: HtmlInitProps) {
  const apply = () => {
    const html = document.documentElement;
    if (removeNotReady) {
      html.classList.remove("not-ready");
    }
    if (addNotReady) {
      html.classList.add("not-ready");
    }
    if (preloaderDisabled) {
      html.classList.add("is-preloader-disabled", "js-no-reveal");
    }
  };

  if (typeof document !== "undefined") {
    apply();
  }

  useLayoutEffect(() => {
    apply();
  }, [preloaderDisabled, removeNotReady, addNotReady]);

  return null;
}
