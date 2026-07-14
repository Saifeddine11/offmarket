"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { MavericksChrome } from "@/components/layout/MavericksChrome";
import type { SiteLocale } from "@/lib/i18n/types";

type GlobalSiteNavbarProps = {
  locale?: SiteLocale;
};

/** Single site-wide header — same markup and behavior as the homepage chrome. */
export function GlobalSiteNavbar({ locale = "fr" }: GlobalSiteNavbarProps) {
  const pathname = usePathname();
  const [resolvedLocale, setResolvedLocale] = useState<SiteLocale>(locale);

  useEffect(() => {
    setResolvedLocale(
      pathname.startsWith("/en")
        ? "en"
        : pathname.startsWith("/it")
          ? "it"
          : pathname.startsWith("/nl")
            ? "nl"
            : locale,
    );
  }, [locale, pathname]);

  return <MavericksChrome variant="hero" locale={resolvedLocale} />;
}
