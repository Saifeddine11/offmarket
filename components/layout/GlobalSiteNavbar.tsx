"use client";

import { usePathname } from "next/navigation";

import { MavericksChrome } from "@/components/layout/MavericksChrome";
import type { SiteLocale } from "@/lib/i18n/types";
import { languageLinksForPathname, localeFromPathname } from "@/lib/i18n/locale";

type GlobalSiteNavbarProps = {
  locale?: SiteLocale;
};

/** Single site-wide header — same markup and behavior as the homepage chrome. */
export function GlobalSiteNavbar({ locale = "fr" }: GlobalSiteNavbarProps) {
  const pathname = usePathname();
  const resolvedLocale = localeFromPathname(pathname) ?? locale;
  const langLinks = languageLinksForPathname(pathname);

  return <MavericksChrome variant="hero" locale={resolvedLocale} langLinks={langLinks} />;
}
