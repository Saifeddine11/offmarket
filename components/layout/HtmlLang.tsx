"use client";

import { useLayoutEffect } from "react";

export function HtmlLang({ lang }: { lang: string }) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
  }

  useLayoutEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
