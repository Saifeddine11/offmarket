import type { LangCode, SiteLocale } from "@/lib/i18n/types";

/** Short code shown on the switcher trigger (FR, EN, …). */
export const LANGUAGE_CODES: Record<SiteLocale, LangCode> = {
  fr: "FR",
  en: "EN",
  nl: "NL",
  it: "IT",
  es: "ES",
  no: "NO",
};

/** Native language names shown inside the dropdown/popover. */
export const LANGUAGE_NATIVE_NAMES: Record<SiteLocale, string> = {
  fr: "Français",
  en: "English",
  nl: "Nederlands",
  it: "Italiano",
  es: "Español",
  no: "Norsk",
};
