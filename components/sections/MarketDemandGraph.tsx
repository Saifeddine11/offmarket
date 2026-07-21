"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useOnceInView } from "@/hooks/useOnceInView";
import {
  TRANSACTION_ANCHOR_YEAR,
  VISIBLE_TRANSACTION_HISTORY,
  formatChangePercent,
  type TransactionPoint,
} from "@/lib/data/demandTimeline";

type MarketDemandGraphProps = {
  graphLabel: string;
  svgTitle: string;
  svgDesc: string;
  unitHint: string;
  locale: "fr" | "en" | "it" | "nl";
};

const VIEW_W = 760;
const VIEW_H = 340;
const PAD_L = 36;
const PAD_R = 36;
const PAD_T = 44;
const PAD_B = 58;
const DOT_R = 4.5;
const DOT_R_ANCHOR = DOT_R * 1.32;
const HIT_R = 32;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type PlotPoint = TransactionPoint & {
  x: number;
  y: number;
  label: string;
  index: number;
  isAnchor: boolean;
  projected: boolean;
};

function buildGeometry(
  data: readonly TransactionPoint[],
  locale: MarketDemandGraphProps["locale"],
) {
  const changes = data.map((d) => d.change);
  const maxAbs = Math.max(...changes.map((c) => Math.abs(c)), 1);
  // Symmetric headroom around zero so + and − read equally
  const bound = maxAbs * 1.18;
  const spanX = VIEW_W - PAD_L - PAD_R;
  const spanY = VIEW_H - PAD_T - PAD_B;
  const zeroY = PAD_T + spanY * (bound / (bound * 2));

  const points: PlotPoint[] = data.map((d, index) => {
    const x = PAD_L + (spanX * index) / (data.length - 1);
    const y = PAD_T + spanY * (1 - (d.change + bound) / (bound * 2));
    return {
      ...d,
      x,
      y,
      label: formatChangePercent(d.change, locale),
      index,
      projected: d.type === "projected",
      isAnchor: d.year === TRANSACTION_ANCHOR_YEAR && d.type === "observed",
    };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  // Area between the curve and the zero line
  const areaPath = [
    `M ${points[0].x.toFixed(2)} ${zeroY.toFixed(2)}`,
    ...points.map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`),
    `L ${points[points.length - 1].x.toFixed(2)} ${zeroY.toFixed(2)}`,
    "Z",
  ].join(" ");

  let lineLength = 0;
  for (let i = 1; i < points.length; i += 1) {
    lineLength += Math.hypot(
      points[i].x - points[i - 1].x,
      points[i].y - points[i - 1].y,
    );
  }

  return { points, linePath, areaPath, lineLength, zeroY };
}

function nearestPointIndex(
  points: readonly PlotPoint[],
  svgX: number,
  svgY: number,
): number | null {
  const inBand = svgY >= PAD_T - HIT_R && svgY <= VIEW_H - PAD_B + HIT_R;
  if (inBand) {
    let best = 0;
    let bestDx = Math.abs(points[0].x - svgX);
    for (let i = 1; i < points.length; i += 1) {
      const dx = Math.abs(points[i].x - svgX);
      if (dx < bestDx) {
        bestDx = dx;
        best = i;
      }
    }
    if (bestDx <= HIT_R * 1.4) return best;
  }

  let best = -1;
  let bestDist = Number.POSITIVE_INFINITY;
  for (let i = 0; i < points.length; i += 1) {
    const dist = Math.hypot(points[i].x - svgX, points[i].y - svgY);
    if (dist <= HIT_R && dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best >= 0 ? best : null;
}

/**
 * Custom SVG — annual % change in Marrakech transaction volume.
 * Zero baseline · signed percentages · 2025 as current anchor.
 */
export function MarketDemandGraph({
  graphLabel,
  svgTitle,
  svgDesc,
  unitHint,
  locale,
}: MarketDemandGraphProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);
  const { visible, reducedMotion } = useOnceInView({
    targetId: "market-demand",
    fallbackRef: rootRef,
  });

  const { points, linePath, areaPath, lineLength, zeroY } = useMemo(
    () => buildGeometry(VISIBLE_TRANSACTION_HISTORY, locale),
    [locale],
  );

  const titleId = "om-md-svg-title";
  const descId = "om-md-svg-desc";

  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      setSettled(true);
      return;
    }
    const id = window.setTimeout(() => setSettled(true), 2200);
    return () => window.clearTimeout(id);
  }, [visible, reducedMotion]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ensure = (tag: "title" | "desc", id: string, text: string) => {
      let node = svg.querySelector(
        `:scope > ${tag}`,
      ) as SVGTitleElement | SVGDescElement | null;
      if (!node) {
        node = document.createElementNS("http://www.w3.org/2000/svg", tag);
        svg.insertBefore(node, svg.firstChild);
      }
      node.setAttribute("id", id);
      node.textContent = text;
    };

    ensure("title", titleId, svgTitle);
    ensure("desc", descId, svgDesc);
  }, [svgTitle, svgDesc, titleId, descId]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const svgX = ((event.clientX - rect.left) / rect.width) * VIEW_W;
      const svgY = ((event.clientY - rect.top) / rect.height) * VIEW_H;
      setActiveIndex(nearestPointIndex(points, svgX, svgY));
    },
    [points],
  );

  const clearActive = useCallback(() => setActiveIndex(null), []);

  const graphClass = [
    "om-market-demand__graph",
    visible ? "is-animated" : "",
    settled || reducedMotion ? "is-settled" : "",
    activeIndex !== null ? "is-hovering" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={graphClass}
      style={{ ["--om-md-ease" as string]: EASE }}
    >
      <div className="om-market-demand__graph-head">
        <p className="om-market-demand__graph-label">{graphLabel}</p>
        <p className="om-market-demand__unit-hint">{unitHint}</p>
      </div>
      <svg
        ref={svgRef}
        className="om-market-demand__svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={svgTitle}
        aria-labelledby={`${titleId} ${descId}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={clearActive}
      >
        {/* Soft horizontal guides */}
        {[0.2, 0.4, 0.6, 0.8].map((t) => {
          const y = PAD_T + (VIEW_H - PAD_T - PAD_B) * t;
          return (
            <line
              key={t}
              className="om-market-demand__grid-line"
              x1={PAD_L}
              x2={VIEW_W - PAD_R}
              y1={y}
              y2={y}
            />
          );
        })}

        <g className="om-market-demand__plot">
          {/* Zero baseline — “no change vs previous year” */}
          <line
            className="om-market-demand__zero-line"
            x1={PAD_L}
            x2={VIEW_W - PAD_R}
            y1={zeroY}
            y2={zeroY}
          />
          <text
            className="om-market-demand__zero-label"
            x={PAD_L - 6}
            y={zeroY + 3}
            textAnchor="end"
          >
            0
          </text>

          <path className="om-market-demand__area" d={areaPath} />
          <path
            className="om-market-demand__line"
            d={linePath}
            fill="none"
            style={
              {
                ["--om-md-line-length"]: String(Math.ceil(lineLength)),
              } as CSSProperties
            }
          />

          {activeIndex !== null ? (
            <line
              className="om-market-demand__guide"
              x1={points[activeIndex].x}
              x2={points[activeIndex].x}
              y1={points[activeIndex].y}
              y2={zeroY}
            />
          ) : null}

          {points.map((point) => {
            const isActive = activeIndex === point.index;
            const isDimmed =
              activeIndex !== null && activeIndex !== point.index;
            const valueAbove = point.change >= 0;

            return (
              <g
                key={point.year}
                className={[
                  "om-market-demand__point-group",
                  point.change < 0 ? "is-negative" : "is-positive",
                  point.isAnchor ? "om-market-demand__point-group--anchor" : "",
                  isActive ? "is-active" : "",
                  isDimmed ? "is-dimmed" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={
                  { ["--om-md-point-index"]: point.index } as CSSProperties
                }
              >
                {point.isAnchor ? (
                  <circle
                    className="om-market-demand__halo"
                    cx={point.x}
                    cy={point.y}
                    r={DOT_R_ANCHOR * 2.35}
                  />
                ) : null}
                <circle
                  className="om-market-demand__hit"
                  cx={point.x}
                  cy={point.y}
                  r={HIT_R}
                />
                <circle
                  className={[
                    "om-market-demand__dot",
                    point.isAnchor ? "om-market-demand__dot--anchor" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  cx={point.x}
                  cy={point.y}
                  r={point.isAnchor ? DOT_R_ANCHOR : DOT_R}
                />
                <text
                  className={[
                    "om-market-demand__value",
                    point.isAnchor ? "om-market-demand__value--anchor" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  x={point.x}
                  y={
                    valueAbove
                      ? point.y - (point.isAnchor ? 16 : 13)
                      : point.y + (point.isAnchor ? 20 : 17)
                  }
                  textAnchor="middle"
                >
                  {point.label}
                </text>
                <text
                  className={[
                    "om-market-demand__year",
                    point.isAnchor ? "om-market-demand__year--anchor" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  x={point.x}
                  y={VIEW_H - 22}
                  textAnchor="middle"
                >
                  {point.year}
                </text>
                <text
                  className="om-market-demand__comparison"
                  x={point.x}
                  y={VIEW_H - 8}
                  textAnchor="middle"
                >
                  {point.comparison}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
