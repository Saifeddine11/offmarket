"use client";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/layout/SiteFooter";
import type { SiteLocale } from "@/lib/i18n/types";

type GlobalSiteFooterProps = {
  locale?: SiteLocale;
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

  if (path === "/privacy-policy") {
    return "privacy-policy";
  }

  return null;
}

/** Single site-wide footer — mounted from the root layout. */
export function GlobalSiteFooter({ locale = "fr" }: GlobalSiteFooterProps) {
  const pathname = usePathname();
  const currentPage = resolveCurrentPage(pathname);

  return <SiteFooter locale={locale} currentPage={currentPage} />;
}
