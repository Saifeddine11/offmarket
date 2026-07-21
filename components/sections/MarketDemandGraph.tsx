"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { DEMAND_DATA, type DemandPoint } from "@/lib/i18n/marketDemandCopy";

type MarketDemandGraphProps = {
  cities: Record<DemandPoint["cityKey"], string>;
  graphLabel: string;
};

const VIEW_W = 640;
const VIEW_H = 420;
const PAD_L = 28;
const PAD_R = 36;
const PAD_T = 48;
const PAD_B = 56;

function buildGeometry(data: readonly DemandPoint[]) {
  const max = Math.max(...data.map((d) => d.value));
  const spanX = VIEW_W - PAD_L - PAD_R;
  const spanY = VIEW_H - PAD_T - PAD_B;

  const points = data.map((d, index) => {
    const x = PAD_L + (spanX * index) / (data.length - 1);
    const y = PAD_T + spanY * (1 - d.value / max);
    return { ...d, x, y, label: `+${d.value}%` };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const areaPath = [
    `M ${points[0].x.toFixed(2)} ${(VIEW_H - PAD_B).toFixed(2)}`,
    ...points.map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`),
    `L ${points[points.length - 1].x.toFixed(2)} ${(VIEW_H - PAD_B).toFixed(2)}`,
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

/**
 * Animated SVG demand curve.
 * Content stays visible by default — motion is progressive enhancement via
 * `.is-animated` so a failed observer never leaves the graph blank.
 */
export function MarketDemandGraph({
  cities,
  graphLabel,
}: MarketDemandGraphProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const { points, linePath, areaPath, lineLength } = useMemo(
    () => buildGeometry(DEMAND_DATA),
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    const section = document.getElementById("market-demand");
    const target = section ?? root;
    if (!target) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setAnimated(true);
      return;
    }

    const start = () => setAnimated(true);

    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 40) {
      start();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: [0, 0.05, 0.15, 0.3] },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={
        animated
          ? "om-market-demand__graph is-animated"
          : "om-market-demand__graph"
      }
    >
      <p className="om-market-demand__graph-label">{graphLabel}</p>
      <svg
        className="om-market-demand__svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={graphLabel}
      >
        {/* Do not render <title> here — in the App Router it can override the document title. */}

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

        <path className="om-market-demand__area" d={areaPath} />
        <path
          className="om-market-demand__line"
          d={linePath}
          fill="none"
          style={
            {
              ["--om-md-line-length" as string]: `${lineLength}`,
            } as React.CSSProperties
          }
        />

        {points.map((point, index) => {
          const isLast = index === points.length - 1;
          return (
            <g
              key={point.cityKey}
              className="om-market-demand__point-group"
              style={{ ["--om-md-point-index" as string]: index }}
            >
              <circle
                className={
                  isLast
                    ? "om-market-demand__dot om-market-demand__dot--peak"
                    : "om-market-demand__dot"
                }
                cx={point.x}
                cy={point.y}
                r={isLast ? 6.5 : 4.5}
              />
              <text
                className={
                  isLast
                    ? "om-market-demand__value om-market-demand__value--peak"
                    : "om-market-demand__value"
                }
                x={point.x}
                y={point.y - (isLast ? 18 : 14)}
                textAnchor="middle"
              >
                {point.label}
              </text>
              <text
                className={
                  isLast
                    ? "om-market-demand__city om-market-demand__city--peak"
                    : "om-market-demand__city"
                }
                x={point.x}
                y={VIEW_H - 22}
                textAnchor="middle"
              >
                {cities[point.cityKey]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
