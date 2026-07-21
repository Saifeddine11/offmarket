/**
 * Marrakech — annual change in real-estate transaction volume.
 *
 * Public chart uses `VISIBLE_TRANSACTION_HISTORY` only (2023–2025).
 * Full series including 2022 is kept for the methodology disclosure.
 */

export type TransactionPoint = {
  year: number;
  /** Year-over-year % change in number of transactions. */
  change: number;
  /** Human-readable baseline year, e.g. "vs 2024". */
  comparison: string;
  type: "observed" | "projected";
};

/** Complete verified series — for methodology / transparency only. */
export const TRANSACTION_HISTORY: readonly TransactionPoint[] = [
  {
    year: 2022,
    change: -17.3,
    comparison: "vs 2021",
    type: "observed",
  },
  {
    year: 2023,
    change: 16.5,
    comparison: "vs 2022",
    type: "observed",
  },
  {
    year: 2024,
    change: 4.2,
    comparison: "vs 2023",
    type: "observed",
  },
  {
    year: 2025,
    change: 24.1,
    comparison: "vs 2024",
    type: "observed",
  },
] as const;

/**
 * Public-facing chart — recovery narrative only.
 * Do not surface 2022 (negative) in the main visual.
 */
export const VISIBLE_TRANSACTION_HISTORY: readonly TransactionPoint[] = [
  {
    year: 2023,
    change: 16.5,
    comparison: "vs 2022",
    type: "observed",
  },
  {
    year: 2024,
    change: 4.2,
    comparison: "vs 2023",
    type: "observed",
  },
  {
    year: 2025,
    change: 24.1,
    comparison: "vs 2024",
    type: "observed",
  },
] as const;

/** Latest observed year — visual anchor on the chart. */
export const TRANSACTION_ANCHOR_YEAR = 2025;

export function formatChangePercent(
  change: number,
  locale: "fr" | "en" | "it" | "nl" = "fr",
): string {
  const abs = Math.abs(change);
  const formatted =
    locale === "en" ? abs.toFixed(1) : abs.toFixed(1).replace(".", ",");
  const sign = change > 0 ? "+" : change < 0 ? "−" : "";
  const space = locale === "en" ? "" : " ";
  return `${sign}${formatted}${space}%`;
}
