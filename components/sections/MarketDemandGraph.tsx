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
import { DEMAND_DATA, type DemandPoint } from "@/lib/i18n/marketDemandCopy";

type MarketDemandGraphProps = {
  cities: Record<DemandPoint["cityKey"], string>;
  graphLabel: string;
  svgTitle: string;
  svgDesc: string;
};

const VIEW_W = 760;
const VIEW_H = 340;
const PAD_L = 28;
const PAD_R = 32;
const PAD_T = 42;
const PAD_B = 48;
const DOT_R = 4.75;
/** Marrakech ~35% larger than standard points. */
const DOT_R_PEAK = DOT_R * 1.35;
const HIT_R = 28;
const BASELINE_Y = VIEW_H - PAD_B;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type PlotPoint = DemandPoint & {
  x: number;
  y: number;
  label: string;
  index: number;
};

function buildGeometry(data: readonly DemandPoint[]) {
  const max = Math.max(...data.map((d) => d.value));
  const spanX = VIEW_W - PAD_L - PAD_R;
  const spanY = VIEW_H - PAD_T - PAD_B;

  const points: PlotPoint[] = data.map((d, index) => {
    const x = PAD_L + (spanX * index) / (data.length - 1);
    const y = PAD_T + spanY * (1 - d.value / max);
    return { ...d, x, y, label: `+${d.value}%`, index };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const areaPath = [
    `M ${points[0].x.toFixed(2)} ${BASELINE_Y.toFixed(2)}`,
    ...points.map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`),
    `L ${points[points.length - 1].x.toFixed(2)} ${BASELINE_Y.toFixed(2)}`,
    "Z",
  ].join(" ");

  let lineLength = 0;
  for (let i = 1; i < points.length; i += 1) {
    lineLength += Math.hypot(
      points[i].x - points[i - 1].x,
      points[i].y - points[i - 1].y,
    );
  }

  return { points, linePath, areaPath, lineLength };
}

function nearestPointIndex(
  points: readonly PlotPoint[],
  svgX: number,
  svgY: number,
): number | null {
  // Prefer nearest city by X when the pointer is within the plot band
  // (generous hit area around the line / points).
  const inBand =
    svgY >= PAD_T - HIT_R && svgY <= BASELINE_Y + HIT_R * 0.75;

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
    // Require reasonable proximity to the series
    if (bestDx <= HIT_R * 1.35) return best;
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
 * Custom SVG demand curve — one upward entrance + restrained hover.
 * Marrakech stays brand-accent (`--om-green`) by default.
 */
export function MarketDemandGraph({
  cities,
  graphLabel,
  svgTitle,
  svgDesc,
}: MarketDemandGraphProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);
  const { visible, reducedMotion } = useOnceInView({
    targetId: "market-demand",
    fallbackRef: rootRef,
  });

  const { points, linePath, areaPath, lineLength } = useMemo(
    () => buildGeometry(DEMAND_DATA),
    [],
  );

  const peakIndex = points.length - 1;
  const titleId = "om-md-svg-title";
  const descId = "om-md-svg-desc";

  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      setSettled(true);
      return;
    }
    const id = window.setTimeout(() => setSettled(true), 2100);
    return () => window.clearTimeout(id);
  }, [visible, reducedMotion]);

  // Inject SVG <title>/<desc> client-side only — React/App Router treats
  // SSR <title> as the document title.
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
      <p className="om-market-demand__graph-label">{graphLabel}</p>
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
        {[0.25, 0.5, 0.75, 1].map((t) => {
          const y = PAD_T + (VIEW_H - PAD_T - PAD_B) * (1 - t);
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
              y2={BASELINE_Y}
            />
          ) : null}

          {points.map((point) => {
            const isPeak = point.index === peakIndex;
            const isActive = activeIndex === point.index;
            const isDimmed =
              activeIndex !== null && activeIndex !== point.index;

            return (
              <g
                key={point.cityKey}
                className={[
                  "om-market-demand__point-group",
                  isPeak ? "om-market-demand__point-group--peak" : "",
                  isActive ? "is-active" : "",
                  isDimmed ? "is-dimmed" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={
                  { ["--om-md-point-index"]: point.index } as CSSProperties
                }
              >
                {isPeak ? (
                  <circle
                    className="om-market-demand__halo"
                    cx={point.x}
                    cy={point.y}
                    r={DOT_R_PEAK * 2.4}
                  />
                ) : null}
                <circle
                  className="om-market-demand__hit"
                  cx={point.x}
                  cy={point.y}
                  r={HIT_R}
                />
                <circle
                  className={
                    isPeak
                      ? "om-market-demand__dot om-market-demand__dot--peak"
                      : "om-market-demand__dot"
                  }
                  cx={point.x}
                  cy={point.y}
                  r={isPeak ? DOT_R_PEAK : DOT_R}
                />
                <text
                  className={
                    isPeak
                      ? "om-market-demand__value om-market-demand__value--peak"
                      : "om-market-demand__value"
                  }
                  x={point.x}
                  y={point.y - (isPeak ? 16 : 13)}
                  textAnchor="middle"
                >
                  {point.label}
                </text>
                <text
                  className={
                    isPeak
                      ? "om-market-demand__city om-market-demand__city--peak"
                      : "om-market-demand__city"
                  }
                  x={point.x}
                  y={VIEW_H - 14}
                  textAnchor="middle"
                >
                  {cities[point.cityKey]}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
