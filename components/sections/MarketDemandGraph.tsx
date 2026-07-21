"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useOnceInView } from "@/hooks/useOnceInView";
import {
  TRANSACTION_ANCHOR_YEAR,
  TRANSACTION_TIMELINE,
  formatCumulativePercent,
  type TimelinePoint,
} from "@/lib/data/demandTimeline";

type MarketDemandGraphProps = {
  graphLabel: string;
  svgTitle: string;
  svgDesc: string;
  unitHint: string;
  projectedCaption: string;
  baseLabel: string;
  locale: "fr" | "en" | "it" | "nl";
};

type ChartLayout = {
  viewW: number;
  viewH: number;
  padL: number;
  padR: number;
  padT: number;
  padB: number;
  dotR: number;
  hitR: number;
  valueOffset: number;
  yearY: number;
  captionLift: number;
  /** Extra headroom above the peak (0–1) — flattens the visual Y scale. */
  yHeadroom: number;
};

/** Desktop / tablet — unchanged proportions, slightly roomier plot. */
const LAYOUT_DESKTOP: ChartLayout = {
  viewW: 780,
  viewH: 340,
  padL: 28,
  padR: 32,
  padT: 44,
  padB: 52,
  dotR: 4,
  hitR: 26,
  valueOffset: 12,
  yearY: 14,
  captionLift: 18,
  yHeadroom: 0,
};

/**
 * Mobile — wider horizontal viewBox, shorter on-screen height (~300–340px).
 * Generous side pads keep 2022 / 2030 clear; yHeadroom softens the rise.
 */
const LAYOUT_MOBILE: ChartLayout = {
  viewW: 920,
  viewH: 400,
  padL: 52,
  padR: 52,
  padT: 26,
  padB: 44,
  dotR: 7,
  hitR: 30,
  valueOffset: 13,
  yearY: 15,
  captionLift: 14,
  yHeadroom: 0.28,
};

/** Permanent % labels on narrow screens; others via touch/focus. */
const MOBILE_PINNED_VALUE_YEARS = new Set([2022, 2025, 2028, 2030]);

/** Permanent year axis labels on narrow screens; others via touch/focus. */
const MOBILE_PINNED_YEAR_LABELS = new Set([2022, 2024, 2026, 2030]);

const MOBILE_MQ = "(max-width: 759px)";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function subscribeMobile(onStoreChange: () => void) {
  const mql = window.matchMedia(MOBILE_MQ);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getMobileSnapshot() {
  return window.matchMedia(MOBILE_MQ).matches;
}

function getServerMobileSnapshot() {
  return false;
}

function useIsMobileLayout() {
  return useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerMobileSnapshot,
  );
}

type PlotPoint = TimelinePoint & {
  x: number;
  y: number;
  label: string;
  index: number;
  isAnchor: boolean;
  projected: boolean;
};

function buildGeometry(
  data: readonly TimelinePoint[],
  locale: MarketDemandGraphProps["locale"],
  baseLabel: string,
  layout: ChartLayout,
) {
  const { viewW, viewH, padL, padR, padT, padB, captionLift, yHeadroom } =
    layout;
  const baselineY = viewH - padB;
  const values = data.map((d) => d.cumulativeGrowth);
  const max = Math.max(...values);
  const spanX = viewW - padL - padR;
  const spanY = viewH - padT - padB;
  // Leave a little floor so the base point sits above the axis
  const floor = -max * 0.04;
  // Headroom above the peak compresses the visual Y scale (gentler rise)
  const ceiling = max + (max - floor) * Math.max(0, yHeadroom);
  const range = ceiling - floor;

  const points: PlotPoint[] = data.map((d, index) => {
    const x = padL + (spanX * index) / (data.length - 1);
    const y = padT + spanY * (1 - (d.cumulativeGrowth - floor) / range);
    const isBase = d.cumulativeGrowth === 0;
    return {
      ...d,
      x,
      y,
      label: isBase
        ? baseLabel
        : formatCumulativePercent(d.cumulativeGrowth, locale),
      index,
      projected: d.status === "projected",
      isAnchor: d.year === TRANSACTION_ANCHOR_YEAR && d.status === "observed",
    };
  });

  const lastObservedIdx = points.reduce(
    (acc, p, i) => (!p.projected ? i : acc),
    0,
  );
  const observedPoints = points.slice(0, lastObservedIdx + 1);
  const projectedPoints = points.slice(lastObservedIdx);

  const toLine = (pts: PlotPoint[]) =>
    pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(" ");

  const areaFor = (pts: PlotPoint[]) => {
    if (pts.length < 2) return "";
    return [
      `M ${pts[0].x.toFixed(2)} ${baselineY.toFixed(2)}`,
      ...pts.map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`),
      `L ${pts[pts.length - 1].x.toFixed(2)} ${baselineY.toFixed(2)}`,
      "Z",
    ].join(" ");
  };

  const pathLength = (pts: PlotPoint[]) => {
    let len = 0;
    for (let i = 1; i < pts.length; i += 1) {
      len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    }
    return len;
  };

  return {
    points,
    baselineY,
    lastObservedIdx,
    observedLine: toLine(observedPoints),
    projectedLine: toLine(projectedPoints),
    observedArea: areaFor(observedPoints),
    projectedArea: areaFor(projectedPoints),
    observedLength: pathLength(observedPoints),
    projectedCaptionX:
      (points[lastObservedIdx].x +
        points[Math.min(lastObservedIdx + 1, points.length - 1)].x) /
        2 +
      6,
    projectedCaptionY:
      Math.min(
        points[lastObservedIdx].y,
        points[Math.min(lastObservedIdx + 1, points.length - 1)].y,
      ) - captionLift,
  };
}

function nearestPointIndex(
  points: readonly PlotPoint[],
  svgX: number,
  svgY: number,
  layout: ChartLayout,
  baselineY: number,
): number | null {
  const { padT, hitR } = layout;
  const inBand = svgY >= padT - hitR && svgY <= baselineY + hitR;
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
    if (bestDx <= hitR * 1.35) return best;
  }
  let best = -1;
  let bestDist = Number.POSITIVE_INFINITY;
  for (let i = 0; i < points.length; i += 1) {
    const dist = Math.hypot(points[i].x - svgX, points[i].y - svgY);
    if (dist <= hitR && dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best >= 0 ? best : null;
}

/**
 * Cumulative transaction timeline — observed solid, projected dashed gray.
 * Labels = % above 2022 baseline.
 */
export function MarketDemandGraph({
  graphLabel,
  svgTitle,
  svgDesc,
  unitHint,
  projectedCaption,
  baseLabel,
  locale,
}: MarketDemandGraphProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);
  const isMobile = useIsMobileLayout();
  const layout = isMobile ? LAYOUT_MOBILE : LAYOUT_DESKTOP;
  const { visible, reducedMotion } = useOnceInView({
    targetId: "market-demand",
    fallbackRef: rootRef,
  });

  const geometry = useMemo(
    () => buildGeometry(TRANSACTION_TIMELINE, locale, baseLabel, layout),
    [locale, baseLabel, layout],
  );
  const {
    points,
    baselineY,
    observedLine,
    projectedLine,
    observedArea,
    projectedArea,
    observedLength,
    projectedCaptionX,
    projectedCaptionY,
  } = geometry;

  const titleId = "om-md-svg-title";
  const descId = "om-md-svg-desc";
  const dotRAnchor = layout.dotR * 1.35;

  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      setSettled(true);
      return;
    }
    const id = window.setTimeout(() => setSettled(true), 2600);
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
      const svgX = ((event.clientX - rect.left) / rect.width) * layout.viewW;
      const svgY = ((event.clientY - rect.top) / rect.height) * layout.viewH;
      setActiveIndex(nearestPointIndex(points, svgX, svgY, layout, baselineY));
    },
    [points, layout, baselineY],
  );

  const clearActive = useCallback(() => setActiveIndex(null), []);

  const graphClass = [
    "om-market-demand__graph",
    isMobile ? "is-mobile-chart" : "",
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
        viewBox={`0 0 ${layout.viewW} ${layout.viewH}`}
        preserveAspectRatio={isMobile ? "none" : "xMidYMid meet"}
        role="img"
        aria-label={svgTitle}
        aria-labelledby={`${titleId} ${descId}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={clearActive}
        onPointerDown={handlePointerMove}
      >
        {[0.25, 0.5, 0.75, 1].map((t) => {
          const y = layout.padT + (layout.viewH - layout.padT - layout.padB) * (1 - t);
          return (
            <line
              key={t}
              className="om-market-demand__grid-line"
              x1={layout.padL}
              x2={layout.viewW - layout.padR}
              y1={y}
              y2={y}
            />
          );
        })}

        <g className="om-market-demand__plot">
          <path
            className="om-market-demand__area om-market-demand__area--observed"
            d={observedArea}
          />
          <g className="om-market-demand__projected-draw">
            <path
              className="om-market-demand__area om-market-demand__area--projected"
              d={projectedArea}
            />
            <path
              className="om-market-demand__line om-market-demand__line--projected"
              d={projectedLine}
              fill="none"
            />
          </g>

          <path
            className="om-market-demand__line om-market-demand__line--observed"
            d={observedLine}
            fill="none"
            style={
              {
                ["--om-md-line-length"]: String(Math.ceil(observedLength)),
              } as CSSProperties
            }
          />

          {activeIndex !== null ? (
            <line
              className={
                points[activeIndex].projected
                  ? "om-market-demand__guide om-market-demand__guide--projected"
                  : "om-market-demand__guide"
              }
              x1={points[activeIndex].x}
              x2={points[activeIndex].x}
              y1={points[activeIndex].y}
              y2={baselineY}
            />
          ) : null}

          <text
            className="om-market-demand__projected-caption"
            x={projectedCaptionX}
            y={projectedCaptionY}
            textAnchor="middle"
          >
            {projectedCaption}
          </text>

          {points.map((point) => {
            const isActive = activeIndex === point.index;
            const isDimmed =
              activeIndex !== null && activeIndex !== point.index;
            const pinValue =
              !isMobile || MOBILE_PINNED_VALUE_YEARS.has(point.year);
            const valueCollapsed = isMobile && !pinValue;
            const pinYear =
              !isMobile || MOBILE_PINNED_YEAR_LABELS.has(point.year);
            const yearCollapsed = isMobile && !pinYear;

            return (
              <g
                key={point.year}
                className={[
                  "om-market-demand__point-group",
                  point.projected
                    ? "om-market-demand__point-group--projected"
                    : "",
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
                    r={dotRAnchor * 2.3}
                  />
                ) : null}
                <circle
                  className="om-market-demand__hit"
                  cx={point.x}
                  cy={point.y}
                  r={layout.hitR}
                  tabIndex={0}
                  role="button"
                  aria-label={`${point.year}: ${point.label}`}
                  onFocus={() => setActiveIndex(point.index)}
                  onBlur={clearActive}
                />
                <circle
                  className={[
                    "om-market-demand__dot",
                    point.projected ? "om-market-demand__dot--projected" : "",
                    point.isAnchor ? "om-market-demand__dot--anchor" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  cx={point.x}
                  cy={point.y}
                  r={point.isAnchor ? dotRAnchor : layout.dotR}
                />
                <text
                  className={[
                    "om-market-demand__value",
                    point.projected ? "om-market-demand__value--projected" : "",
                    point.isAnchor ? "om-market-demand__value--anchor" : "",
                    valueCollapsed ? "is-collapsed" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  x={point.x}
                  y={
                    point.y -
                    (point.isAnchor
                      ? layout.valueOffset + 3
                      : layout.valueOffset)
                  }
                  textAnchor="middle"
                  aria-hidden={valueCollapsed && !isActive ? true : undefined}
                >
                  {point.label}
                </text>
                <text
                  className={[
                    "om-market-demand__year",
                    point.projected ? "om-market-demand__year--projected" : "",
                    point.isAnchor ? "om-market-demand__year--anchor" : "",
                    yearCollapsed ? "is-collapsed" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  x={point.x}
                  y={layout.viewH - layout.yearY}
                  textAnchor="middle"
                  aria-hidden={yearCollapsed && !isActive ? true : undefined}
                >
                  {point.year}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
