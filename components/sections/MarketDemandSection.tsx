"use client";

import { MarketDemandGraph } from "@/components/sections/MarketDemandGraph";
import {
  MARKET_DEMAND_COPY,
  type MarketDemandCopy,
} from "@/lib/i18n/marketDemandCopy";
import type { SiteLocale } from "@/lib/i18n/types";

export type MarketDemandSectionProps = {
  locale?: string;
};

function resolveLocale(locale?: string): SiteLocale {
  if (locale === "en" || locale === "it" || locale === "nl") return locale;
  return "fr";
}

function MarketDemandEditorial({ copy }: { copy: MarketDemandCopy }) {
  return (
    <div className="om-market-demand__editorial">
      <p className="om-market-demand__eyebrow">{copy.eyebrow}</p>
      <h2 className="om-market-demand__title">{copy.title}</h2>
      <p className="om-market-demand__lead">{copy.lead}</p>

      <div className="om-market-demand__rule" aria-hidden="true" />

      <h3 className="om-market-demand__secondary-title">{copy.secondaryTitle}</h3>
      <p className="om-market-demand__secondary-lead">{copy.secondaryLead}</p>

      <dl className="om-market-demand__metrics">
        {copy.metrics.map((metric) => (
          <div key={`${metric.value}-${metric.label}`} className="om-market-demand__metric">
            <dt className="om-market-demand__metric-value">{metric.value}</dt>
            <dd className="om-market-demand__metric-label">{metric.label}</dd>
            <dd className="om-market-demand__metric-detail">{metric.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Homepage market-analysis section — shared across all locales,
 * inserted once after featured property listings.
 */
export function MarketDemandSection({ locale }: MarketDemandSectionProps) {
  const resolved = resolveLocale(locale);
  const copy = MARKET_DEMAND_COPY[resolved];

  return (
    <section
      id="market-demand"
      className="om-market-demand"
      aria-label={copy.ariaLabel}
      data-scroll-section
    >
      <div className="om-market-demand__shell">
        <div className="om-market-demand__panel">
          <div className="om-market-demand__layout">
            <MarketDemandEditorial copy={copy} />
            <div className="om-market-demand__divider" aria-hidden="true" />
            <MarketDemandGraph
              cities={copy.cities}
              graphLabel={copy.graphLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
