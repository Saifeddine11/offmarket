"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { SiteChrome } from "@/components/layout/SiteChrome";
import type { SiteLocale } from "@/lib/i18n/types";
import { languageLinksForPathname, localeFromPathname } from "@/lib/i18n/locale";
import { getSiteStructuredData } from "@/lib/seo/structuredData";

type GlobalSiteNavbarProps = {
  locale?: SiteLocale;
};

/** Single site-wide header — same markup and behavior as the homepage chrome. */
export function GlobalSiteNavbar({ locale = "fr" }: GlobalSiteNavbarProps) {
  const pathname = usePathname();
  const resolvedLocale = localeFromPathname(pathname) ?? locale;
  const langLinks = languageLinksForPathname(pathname);

  useEffect(() => {
    const currentLocale = localeFromPathname(pathname);
    document.documentElement.lang = currentLocale;
    const structuredData =
      document.getElementById("site-structured-data") ||
      document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
      structuredData.textContent = JSON.stringify(getSiteStructuredData(currentLocale));
    }
  }, [pathname]);

  return (
    <SiteChrome
      variant="hero"
      locale={resolvedLocale}
      langLinks={langLinks}
      pathname={pathname || "/"}
    />
  );
}
