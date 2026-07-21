"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { DEMAND_DATA, type DemandPoint } from "@/lib/i18n/marketDemandCopy";

type MarketDemandGraphProps = {
  cities: Record<DemandPoint["cityKey"], string>;
  graphLabel: string;
};

/** Wider / flatter canvas so the section reads shorter and less compressed. */
const VIEW_W = 720;
const VIEW_H = 300;
const PAD_L = 24;
const PAD_R = 28;
const PAD_T = 36;
const PAD_B = 42;

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
 * Demand curve — starts undrawn, climbs left→right when #market-demand
 * enters the viewport. Falls back to a settled visible state if needed.
 */
export function MarketDemandGraph({
  cities,
  graphLabel,
}: MarketDemandGraphProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [settled, setSettled] = useState(false);
  const { points, linePath, areaPath, lineLength } = useMemo(
    () => buildGeometry(DEMAND_DATA),
    [],
  );

  useEffect(() => {
    const section = document.getElementById("market-demand");
    const target = section ?? rootRef.current;
    if (!target) {
      setSettled(true);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setAnimated(true);
      setSettled(true);
      return;
    }

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      setAnimated(true);
      window.setTimeout(() => setSettled(true), 1900);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: [0, 0.1, 0.2], rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(target);

    // If already in view on mount / after scroll restore.
    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15) {
      start();
      observer.disconnect();
    }

    // Safety: never leave the curve blank if the observer never fires.
    const fallbackId = window.setTimeout(() => {
      if (!started) {
        setAnimated(true);
        setSettled(true);
      }
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackId);
    };
  }, []);

  const graphClass = [
    "om-market-demand__graph",
    animated ? "is-animated" : "",
    settled ? "is-settled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={graphClass}>
      <p className="om-market-demand__graph-label">{graphLabel}</p>
      <svg
        className="om-market-demand__svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={graphLabel}
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

        {points.map((point, index) => {
          const isLast = index === points.length - 1;
          return (
            <g
              key={point.cityKey}
              className="om-market-demand__point-group"
              style={{ ["--om-md-point-index"]: index } as CSSProperties}
            >
              <circle
                className={
                  isLast
                    ? "om-market-demand__dot om-market-demand__dot--peak"
                    : "om-market-demand__dot"
                }
                cx={point.x}
                cy={point.y}
                r={isLast ? 6 : 4.25}
              />
              <text
                className={
                  isLast
                    ? "om-market-demand__value om-market-demand__value--peak"
                    : "om-market-demand__value"
                }
                x={point.x}
                y={point.y - (isLast ? 14 : 12)}
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
                y={VIEW_H - 14}
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
