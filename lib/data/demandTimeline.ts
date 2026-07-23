/**
 * Marrakech — verified 2025 real-estate indicators (official annual results).
 *
 * Source: Bank Al-Maghrib & ANCFCC — Indice des Prix des Actifs Immobiliers,
 * 2025 annual results for the city of Marrakech.
 *
 *   Transaction volume 2025: +24.1% vs 2024
 *   Asset prices 2025:       +1.0%  vs 2024
 *
 * No projections, no cumulative-since-2022 claim: verified figures only.
 */

export type SiteLocaleCode = "fr" | "en" | "es" | "it" | "nl" | "no";

export type MarketIndexPoint = {
  year: number;
  /** Index level with 2024 = 100. */
  index: number;
};

/** Verified transaction-volume index (2024 base 100 → 2025 = 124.1, i.e. +24.1%). */
export const TRANSACTION_INDEX: readonly MarketIndexPoint[] = [
  { year: 2024, index: 100 },
  { year: 2025, index: 124.1 },
] as const;

/** Verified asset-price index (2024 base 100 → 2025 = 101, i.e. +1.0%). */
export const PRICE_INDEX: readonly MarketIndexPoint[] = [
  { year: 2024, index: 100 },
  { year: 2025, index: 101 },
] as const;

/** Official year-on-year change used across the section. */
export const TRANSACTION_GROWTH_2025 = 24.1;
export const PRICE_GROWTH_2025 = 1.0;

/** Locale-aware number (decimal comma for every locale except English). */
export function formatIndex(value: number, locale: SiteLocaleCode = "fr"): string {
  const rounded = Math.round(value * 10) / 10;
  const hasFraction = Math.abs(rounded - Math.round(rounded)) >= 0.05;
  const text = hasFraction ? rounded.toFixed(1) : String(Math.round(rounded));
  return locale === "en" ? text : text.replace(".", ",");
}
