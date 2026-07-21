/**
 * Homepage market-demand timeline — editable demand index by year.
 * Observed: 2022–2026 · Projected: 2028–2030
 *
 * Replace `value` fields when real figures are available.
 * Scale is relative (base 100 in 2022); the chart normalizes to max.
 */

export type DemandPoint = {
  year: number;
  value: number;
  /** When true, rendered as a softer projected estimate. */
  projected: boolean;
};

export const DEMAND_TIMELINE: readonly DemandPoint[] = [
  { year: 2022, value: 100, projected: false },
  { year: 2024, value: 124, projected: false },
  { year: 2026, value: 148, projected: false },
  { year: 2028, value: 165, projected: true },
  { year: 2030, value: 181, projected: true },
] as const;

/** Last observed year — visual “current anchor” on the chart. */
export const DEMAND_ANCHOR_YEAR = 2026;
