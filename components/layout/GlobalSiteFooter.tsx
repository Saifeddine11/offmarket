"use client";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/layout/SiteFooter";
import type { SiteLocale } from "@/lib/i18n/types";
import { localeFromPathname } from "@/lib/i18n/locale";
import { legalLocaleFromPathname, type LegalLocale } from "@/lib/legal/legalContent";

type GlobalSiteFooterProps = {
  locale?: SiteLocale;
  legalLocale?: LegalLocale;
};

function resolveCurrentPage(
  pathname: string,
): "about" | "contact" | "privacy-policy" | null {
  const path = pathname.replace(/\/$/, "") || "/";

  if (path === "/about" || path === "/fr/about") {
    return "about";
  }

  if (
    path === "/contact" ||
    path === "/en/contact" ||
    path === "/it/contatto" ||
    path === "/nl/contact"
  ) {
    return "contact";
  }

  if (path.endsWith("/privacy-policy") || path === "/privacybeleid" || path === "/no/personvernerklaering" || path === "/es/politica-de-privacidad" || path === "/ar/privacy-policy") {
    return "privacy-policy";
  }

  return null;
}

/** Single site-wide footer — mounted from the root layout. */
export function GlobalSiteFooter({ locale = "fr", legalLocale }: GlobalSiteFooterProps) {
  const pathname = usePathname();
  const currentPage = resolveCurrentPage(pathname);
  const resolvedLocale = localeFromPathname(pathname) ?? locale;

  return <SiteFooter locale={resolvedLocale} legalLocale={legalLocale ?? legalLocaleFromPathname(pathname)} currentPage={currentPage} />;
}
