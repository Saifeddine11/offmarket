"use client";

import { useRef } from "react";

import { useOnceInView } from "@/hooks/useOnceInView";
import type {
  MarketDemandCopy,
  MarketDemandMetric,
} from "@/lib/i18n/marketDemandCopy";

type MarketDemandEditorialProps = {
  copy: MarketDemandCopy;
  titleId: string;
};

function MetricCard({ metric }: { metric: MarketDemandMetric }) {
  return (
    <div
      className={
        metric.accent
          ? "om-market-demand__metric om-market-demand__metric--accent"
          : "om-market-demand__metric"
      }
    >
      <dt
        className={
          metric.accent
            ? "om-market-demand__metric-value om-market-demand__metric-value--accent"
            : "om-market-demand__metric-value"
        }
      >
        {metric.value}
      </dt>
      <dd className="om-market-demand__metric-label">{metric.label}</dd>
      <dd className="om-market-demand__metric-detail">{metric.detail}</dd>
    </div>
  );
}

/**
 * Left editorial — verified 2025 transaction + price figures.
 */
export function MarketDemandEditorial({
  copy,
  titleId,
}: MarketDemandEditorialProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { visible } = useOnceInView({
    targetId: "market-demand",
    fallbackRef: rootRef,
  });

  const reveal = visible ? " is-revealed" : "";

  return (
    <div ref={rootRef} className={`om-market-demand__editorial${reveal}`}>
      <p
        className="om-market-demand__eyebrow om-market-demand__reveal"
        style={{ ["--om-md-stagger" as string]: 0 }}
      >
        {copy.eyebrow}
      </p>
      <h2
        id={titleId}
        className="om-market-demand__title om-market-demand__reveal"
        style={{ ["--om-md-stagger" as string]: 1 }}
      >
        {copy.title}
      </h2>
      <p
        className="om-market-demand__lead om-market-demand__reveal"
        style={{ ["--om-md-stagger" as string]: 2 }}
      >
        {copy.lead}
      </p>

      <dl
        className="om-market-demand__metrics om-market-demand__reveal"
        style={{ ["--om-md-stagger" as string]: 3 }}
      >
        <MetricCard metric={copy.primaryMetric} />
        <MetricCard metric={copy.secondaryMetric} />
      </dl>
    </div>
  );
}
