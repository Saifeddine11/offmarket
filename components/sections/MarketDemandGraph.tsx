"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { DEMAND_DATA, type DemandPoint } from "@/lib/i18n/marketDemandCopy";

type MarketDemandGraphProps = {
  cities: Record<DemandPoint["cityKey"], string>;
  graphLabel: string;
};

const VIEW_W = 720;
const VIEW_H = 310;
const PAD_L = 22;
const PAD_R = 26;
const PAD_T = 38;
const PAD_B = 44;
const DOT_R = 4.5;
/** Marrakech point ~30% larger than other cities. */
const DOT_R_PEAK = DOT_R * 1.3;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

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
 * Custom SVG demand curve.
 * One upward entrance when #market-demand enters the viewport:
 * plot rises → line draws L→R → area reveals → points → labels → Marrakech last.
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
      window.setTimeout(() => setSettled(true), 2200);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: [0, 0.12, 0.25], rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(target);

    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.82 && rect.bottom > window.innerHeight * 0.12) {
      start();
      observer.disconnect();
    }

    const fallbackId = window.setTimeout(() => {
      if (!started) {
        setAnimated(true);
        setSettled(true);
      }
    }, 2800);

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
    <div ref={rootRef} className={graphClass} style={{ ["--om-md-ease" as string]: EASE }}>
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

          {points.map((point, index) => {
            const isLast = index === points.length - 1;
            return (
              <g
                key={point.cityKey}
                className={
                  isLast
                    ? "om-market-demand__point-group om-market-demand__point-group--peak"
                    : "om-market-demand__point-group"
                }
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
                  r={isLast ? DOT_R_PEAK : DOT_R}
                />
                <text
                  className={
                    isLast
                      ? "om-market-demand__value om-market-demand__value--peak"
                      : "om-market-demand__value"
                  }
                  x={point.x}
                  y={point.y - (isLast ? 15 : 12)}
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
        </g>
      </svg>
    </div>
  );
}
