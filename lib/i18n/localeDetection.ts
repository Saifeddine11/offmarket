import type { SiteLocale } from "@/lib/i18n/types";

/** Cookie that stores the visitor's active/last-chosen locale. */
export const LOCALE_COOKIE = "offmarket_locale";

/** 12 months, in seconds. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const SUPPORTED_LOCALES: readonly SiteLocale[] = [
  "fr",
  "en",
  "nl",
  "it",
  "es",
  "no",
];

export const DEFAULT_LOCALE: SiteLocale = "fr";

export function isSupportedLocale(value: unknown): value is SiteLocale {
  return typeof value === "string" && SUPPORTED_LOCALES.includes(value as SiteLocale);
}

/**
 * Maps a BCP 47 primary language subtag to a supported site locale.
 * Norwegian variants (nb/nn/no) all resolve to Bokmål (`no`).
 */
function languageSubtagToLocale(subtag: string): SiteLocale | null {
  const base = subtag.toLowerCase().split("-")[0];
  switch (base) {
    case "fr":
      return "fr";
    case "en":
      return "en";
    case "nl":
      return "nl";
    case "it":
      return "it";
    case "es":
      return "es";
    case "no":
    case "nb":
    case "nn":
      return "no";
    default:
      return null;
  }
}

/**
 * Picks the highest-priority supported locale from an Accept-Language header.
 * Honours quality values and preserves client order (navigator.languages).
 */
export function localeFromAcceptLanguage(
  header: string | null | undefined,
): SiteLocale | null {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.split("=")[1]) : 1;
      return { tag: tag.trim(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const entry of ranked) {
    const locale = languageSubtagToLocale(entry.tag);
    if (locale) return locale;
  }
  return null;
}

/**
 * Passive country → locale fallback, used only when no supported browser
 * language is available. Belgium/Switzerland intentionally resolve to French
 * only after the browser language has already failed to match.
 */
export function localeFromCountry(
  country: string | null | undefined,
): SiteLocale | null {
  if (!country) return null;
  switch (country.toUpperCase()) {
    case "MA":
    case "FR":
    case "BE":
    case "CH":
      return "fr";
    case "GB":
    case "US":
    case "IE":
      return "en";
    case "NL":
      return "nl";
    case "IT":
      return "it";
    case "ES":
      return "es";
    case "NO":
      return "no";
    default:
      return null;
  }
}

export type LocaleDetectionInput = {
  cookie?: string | null;
  acceptLanguage?: string | null;
  country?: string | null;
};

/**
 * Detection priority:
 *   1. Stored/manual choice (cookie)
 *   2. Browser Accept-Language (equivalent to navigator.languages server-side)
 *   3. Passive country fallback
 *   4. French default
 */
export function detectLocale({
  cookie,
  acceptLanguage,
  country,
}: LocaleDetectionInput): SiteLocale {
  if (isSupportedLocale(cookie)) return cookie;
  return (
    localeFromAcceptLanguage(acceptLanguage) ??
    localeFromCountry(country) ??
    DEFAULT_LOCALE
  );
}

/** Conservative crawler check so search engines are never geo/language redirected. */
export function isLikelyBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  return /bot|crawl|spider|slurp|mediapartners|googlebot|bingpreview|baiduspider|yandex|duckduckbot|facebookexternalhit|embedly|quora link preview|showyoubot|outbrain|pinterest\/0|pinterestbot|slackbot|vkshare|w3c_validator|whatsapp|telegrambot|discordbot|applebot|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|bytespider|gptbot|chatgpt|claudebot|perplexity/i.test(
    userAgent,
  );
}
