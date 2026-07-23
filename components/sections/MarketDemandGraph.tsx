"use client";

import { useRef, type CSSProperties } from "react";

import { useOnceInView } from "@/hooks/useOnceInView";
import {
  TRANSACTION_INDEX,
  formatIndex,
  type SiteLocaleCode,
} from "@/lib/data/demandTimeline";

type MarketDemandGraphProps = {
  graphTitle: string;
  graphBaseline: string;
  highlight: string;
  chartAria: string;
  locale: SiteLocaleCode;
};

/** Horizontal placement (%) of the two verified points inside the plot. */
const POINT_X = [18, 82] as const;
/** Vertical placement (%) — index 100 sits near the base, the peak near the top. */
const POINT_Y_BASE = 78;
const POINT_Y_PEAK = 22;

/**
 * Transaction-volume chart — verified two-point comparison.
 * 2024 = base 100 · 2025 = 124.1 (+24.1%). Labels are HTML for guaranteed
 * legibility at every width; the line/area is a non-distorting SVG.
 */
export function MarketDemandGraph({
  graphTitle,
  graphBaseline,
  highlight,
  chartAria,
  locale,
}: MarketDemandGraphProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { visible, reducedMotion } = useOnceInView({
    targetId: "market-demand",
    fallbackRef: rootRef,
  });

  const base = TRANSACTION_INDEX[0];
  const peak = TRANSACTION_INDEX[TRANSACTION_INDEX.length - 1];

  const points = [
    { year: base.year, index: base.index, x: POINT_X[0], y: POINT_Y_BASE },
    { year: peak.year, index: peak.index, x: POINT_X[1], y: POINT_Y_PEAK },
  ];

  const areaPath = `M ${POINT_X[0]} 100 L ${POINT_X[0]} ${POINT_Y_BASE} L ${POINT_X[1]} ${POINT_Y_PEAK} L ${POINT_X[1]} 100 Z`;
  const linePath = `M ${POINT_X[0]} ${POINT_Y_BASE} L ${POINT_X[1]} ${POINT_Y_PEAK}`;

  const graphClass = [
    "om-market-demand__graph",
    visible ? "is-visible" : "",
    reducedMotion ? "is-reduced" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={graphClass}>
      <div className="om-market-demand__graph-head">
        <p className="om-market-demand__graph-label">{graphTitle}</p>
        <p className="om-market-demand__unit-hint">{graphBaseline}</p>
      </div>

      <div className="om-market-demand__chart" role="img" aria-label={chartAria}>
        <svg
          className="om-market-demand__svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <line
            className="om-market-demand__baseline"
            x1={POINT_X[0]}
            x2={POINT_X[1]}
            y1={POINT_Y_BASE}
            y2={POINT_Y_BASE}
          />
          <path className="om-market-demand__area" d={areaPath} />
          <path
            className="om-market-demand__line"
            d={linePath}
            fill="none"
          />
        </svg>

        <div className="om-market-demand__points" aria-hidden="true">
          {points.map((point, index) => (
            <div
              key={point.year}
              className={
                index === points.length - 1
                  ? "om-market-demand__point om-market-demand__point--accent"
                  : "om-market-demand__point"
              }
              style={
                {
                  ["--om-md-x" as string]: `${point.x}%`,
                  ["--om-md-y" as string]: `${point.y}%`,
                } as CSSProperties
              }
            >
              <span className="om-market-demand__point-value">
                {formatIndex(point.index, locale)}
              </span>
              <span className="om-market-demand__dot" />
            </div>
          ))}

          <span
            className="om-market-demand__highlight"
            style={
              {
                ["--om-md-x" as string]: `${POINT_X[1]}%`,
                ["--om-md-y" as string]: `${POINT_Y_PEAK}%`,
              } as CSSProperties
            }
          >
            {highlight}
          </span>
        </div>

        <div className="om-market-demand__years" aria-hidden="true">
          {points.map((point) => (
            <span
              key={point.year}
              className="om-market-demand__year"
              style={{ ["--om-md-x" as string]: `${point.x}%` } as CSSProperties}
            >
              {point.year}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
