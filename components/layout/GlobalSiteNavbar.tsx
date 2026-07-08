import { MavericksChrome } from "@/components/layout/MavericksChrome";
import type { SiteLocale } from "@/lib/i18n/types";

type GlobalSiteNavbarProps = {
  locale?: SiteLocale;
};

/** Single site-wide header — same markup and behavior as the homepage chrome. */
export function GlobalSiteNavbar({ locale = "fr" }: GlobalSiteNavbarProps) {
  return <MavericksChrome variant="hero" locale={locale} />;
}
