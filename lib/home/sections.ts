import enSections from "@/content/home/en-sections.json";
import frSections from "@/content/home/fr-sections.json";
import nlSections from "@/content/home/nl-sections.json";
import rootSections from "@/content/home/root-sections.json";
import { localizeHomeLegacyHtml } from "@/lib/homepage/localizeHomeLegacyContent";
import type { SiteLocale } from "@/lib/i18n/types";

export type HomeSectionKey = "intro" | "testimonials";

const SECTIONS_BY_LOCALE = {
  fr: (frSections.sections ?? rootSections.sections) as Record<string, string>,
  en: (enSections.sections ?? rootSections.sections) as Record<string, string>,
  nl: (nlSections.sections ?? rootSections.sections) as Record<string, string>,
  it: rootSections.sections as Record<string, string>,
} satisfies Record<SiteLocale, Record<string, string>>;

/** Homepage section HTML extracted from the matching locale homepage archive. */
export function getHomeSectionHtml(
  key: HomeSectionKey,
  locale: SiteLocale = "fr",
): string {
  const sections = SECTIONS_BY_LOCALE[locale] ?? SECTIONS_BY_LOCALE.fr;
  const html = sections[key] ?? SECTIONS_BY_LOCALE.fr[key] ?? "";
  return localizeHomeLegacyHtml(html, locale);
}
