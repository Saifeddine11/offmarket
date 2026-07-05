"use client";

import { useEffect } from "react";

type HtmlInitProps = {
  className?: string;
  winClass?: boolean;
  preloaderDisabled?: boolean;
};

export function HtmlInit({
  className = "has-hover js",
  winClass = false,
  preloaderDisabled = false,
}: HtmlInitProps) {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("no-js");
    html.classList.add("js");

    if (preloaderDisabled) {
      html.classList.add("is-preloader-disabled", "js-no-reveal");
    }

    if (winClass && navigator.platform.toUpperCase().indexOf("WIN") >= 0) {
      html.classList.add("is-win");
    }

    if (className) {
      className.split(/\s+/).forEach((token) => {
        if (token && token !== "js" && token !== "no-js") {
          html.classList.add(token);
        }
      });
    }
  }, [className, winClass, preloaderDisabled]);

  return null;
}
