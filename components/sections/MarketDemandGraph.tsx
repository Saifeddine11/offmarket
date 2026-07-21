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
  DEMAND_ANCHOR_YEAR,
  DEMAND_TIMELINE,
  type DemandPoint,
} from "@/lib/data/demandTimeline";

type MarketDemandGraphProps = {
  graphLabel: string;
  svgTitle: string;
  svgDesc: string;
  projectedCaption: string;
};

const VIEW_W = 760;
const VIEW_H = 340;
const PAD_L = 28;
const PAD_R = 36;
const PAD_T = 42;
const PAD_B = 52;
const DOT_R = 4.5;
const DOT_R_ANCHOR = DOT_R * 1.32;
const HIT_R = 30;
const BASELINE_Y = VIEW_H - PAD_B;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type PlotPoint = DemandPoint & {
  x: number;
  y: number;
  label: string;
  index: number;
  isAnchor: boolean;
};

function buildGeometry(data: readonly DemandPoint[]) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  // Leave headroom so the curve doesn’t hug the top edge
  const floor = min * 0.82;
  const spanX = VIEW_W - PAD_L - PAD_R;
  const spanY = VIEW_H - PAD_T - PAD_B;

  const points: PlotPoint[] = data.map((d, index) => {
    const x = PAD_L + (spanX * index) / (data.length - 1);
    const y = PAD_T + spanY * (1 - (d.value - floor) / (max - floor));
    return {
      ...d,
      x,
      y,
      label: String(d.value),
      index,
      isAnchor: d.year === DEMAND_ANCHOR_YEAR && !d.projected,
    };
  });

  const lastObservedIdx = points.reduce(
    (acc, p, i) => (!p.projected ? i : acc),
    0,
  );

  const observedPoints = points.slice(0, lastObservedIdx + 1);
  const projectedPoints = points.slice(lastObservedIdx); // includes anchor for continuity

  const toLine = (pts: PlotPoint[]) =>
    pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(" ");

  const observedLine = toLine(observedPoints);
  const projectedLine = toLine(projectedPoints);

  const areaFor = (pts: PlotPoint[]) => {
    if (pts.length < 2) return "";
    return [
      `M ${pts[0].x.toFixed(2)} ${BASELINE_Y.toFixed(2)}`,
      ...pts.map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`),
      `L ${pts[pts.length - 1].x.toFixed(2)} ${BASELINE_Y.toFixed(2)}`,
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
    lastObservedIdx,
    observedLine,
    projectedLine,
    observedArea: areaFor(observedPoints),
    projectedArea: areaFor(projectedPoints),
    observedLength: pathLength(observedPoints),
    projectedLength: pathLength(projectedPoints),
    // Midpoint between last observed and first projected for caption
    projectedCaptionX:
      (points[lastObservedIdx].x + points[Math.min(lastObservedIdx + 1, points.length - 1)].x) /
        2 +
      8,
    projectedCaptionY: Math.min(
      points[lastObservedIdx].y,
      points[Math.min(lastObservedIdx + 1, points.length - 1)].y,
    ) - 22,
  };
}

function nearestPointIndex(
  points: readonly PlotPoint[],
  svgX: number,
  svgY: number,
): number | null {
  const inBand = svgY >= PAD_T - HIT_R && svgY <= BASELINE_Y + HIT_R * 0.75;
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
 * Custom SVG demand timeline — observed (dark) then projected (gray).
 * One upward entrance; restrained hover. 2026 is the current anchor.
 */
export function MarketDemandGraph({
  graphLabel,
  svgTitle,
  svgDesc,
  projectedCaption,
}: MarketDemandGraphProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);
  const { visible, reducedMotion } = useOnceInView({
    targetId: "market-demand",
    fallbackRef: rootRef,
  });

  const geometry = useMemo(() => buildGeometry(DEMAND_TIMELINE), []);
  const {
    points,
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

  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      setSettled(true);
      return;
    }
    const id = window.setTimeout(() => setSettled(true), 2400);
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
              y2={BASELINE_Y}
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
                    point.projected ? "om-market-demand__dot--projected" : "",
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
                    point.projected ? "om-market-demand__value--projected" : "",
                    point.isAnchor ? "om-market-demand__value--anchor" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  x={point.x}
                  y={point.y - (point.isAnchor ? 16 : 13)}
                  textAnchor="middle"
                >
                  {point.label}
                </text>
                <text
                  className={[
                    "om-market-demand__year",
                    point.projected ? "om-market-demand__year--projected" : "",
                    point.isAnchor ? "om-market-demand__year--anchor" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  x={point.x}
                  y={VIEW_H - 14}
                  textAnchor="middle"
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
