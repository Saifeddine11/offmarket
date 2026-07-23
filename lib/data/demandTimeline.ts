/**
 * Marrakech — cumulative transaction-level index since 2022.
 *
 * Graph Y = cumulativeGrowth vs 2022 (base 100).
 * Always rises when annual growth is positive; never falls on a slowdown year.
 *
 * Observed annual rates (official):
 *   2023 +16.5% vs 2022 · 2024 +4.2% vs 2023 · 2025 +24.1% vs 2024
 *
 * 2026–2030 are editable OffMarket internal projections (not official stats).
 */

export type TimelinePoint = {
  year: number;
  /** Index level with 2022 = 100. */
  level: number;
  /** % above the 2022 baseline (= level − 100). */
  cumulativeGrowth: number;
  /** YoY % used to build the level (null for the base year). */
  annualGrowth: number | null;
  status: "observed" | "projected";
};

/** Verified observed cumulative path from official annual rates. */
export const OBSERVED_TRANSACTION_TIMELINE: readonly TimelinePoint[] = [
  {
    year: 2022,
    level: 100,
    cumulativeGrowth: 0,
    annualGrowth: null,
    status: "observed",
  },
  {
    year: 2023,
    level: 116.5,
    cumulativeGrowth: 16.5,
    annualGrowth: 16.5,
    status: "observed",
  },
  {
    year: 2024,
    level: 121.393,
    cumulativeGrowth: 21.393,
    annualGrowth: 4.2,
    status: "observed",
  },
  {
    year: 2025,
    level: 150.648713,
    cumulativeGrowth: 50.648713,
    annualGrowth: 24.1,
    status: "observed",
  },
] as const;

/**
 * Internal projected annual growth rates applied after 2025.
 * Edit these rates to reshape 2026–2030 without touching the chart code.
 */
export const PROJECTED_ANNUAL_GROWTH_RATES = [
  { year: 2026, annualGrowth: 9 },
  { year: 2027, annualGrowth: 8 },
  { year: 2028, annualGrowth: 7 },
  { year: 2029, annualGrowth: 6 },
  { year: 2030, annualGrowth: 5 },
] as const;

function buildProjectedTimeline(
  observed: readonly TimelinePoint[],
  rates: typeof PROJECTED_ANNUAL_GROWTH_RATES,
): TimelinePoint[] {
  const last = observed[observed.length - 1];
  let level = last.level;
  return rates.map(({ year, annualGrowth }) => {
    level = level * (1 + annualGrowth / 100);
    return {
      year,
      level,
      cumulativeGrowth: level - 100,
      annualGrowth,
      status: "projected" as const,
    };
  });
}

/** Full public chart series: observed 2022–2025 + projected 2026–2030. */
export const TRANSACTION_TIMELINE: readonly TimelinePoint[] = [
  ...OBSERVED_TRANSACTION_TIMELINE,
  ...buildProjectedTimeline(
    OBSERVED_TRANSACTION_TIMELINE,
    PROJECTED_ANNUAL_GROWTH_RATES,
  ),
];

/** Last observed year — visual anchor before the projection. */
export const TRANSACTION_ANCHOR_YEAR = 2025;

export function formatCumulativePercent(
  cumulativeGrowth: number,
  locale: "fr" | "en" | "es" | "it" | "nl" | "no" = "fr",
): string {
  if (Math.abs(cumulativeGrowth) < 0.05) {
    return locale === "en" ? "base" : "base";
  }
  const rounded = Math.round(cumulativeGrowth * 10) / 10;
  const formatted =
    locale === "en"
      ? rounded.toFixed(1)
      : rounded.toFixed(1).replace(".", ",");
  const space = locale === "en" ? "" : " ";
  return `+${formatted}${space}%`;
}
