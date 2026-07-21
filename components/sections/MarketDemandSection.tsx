import { MarketDemandEditorial } from "@/components/sections/MarketDemandEditorial";
import { MarketDemandGraph } from "@/components/sections/MarketDemandGraph";
import { MARKET_DEMAND_COPY } from "@/lib/i18n/marketDemandCopy";
import type { SiteLocale } from "@/lib/i18n/types";

export type MarketDemandSectionProps = {
  locale?: string;
};

function resolveLocale(locale?: string): SiteLocale {
  if (locale === "en" || locale === "it" || locale === "nl") return locale;
  return "fr";
}

/**
 * Homepage market section — cumulative transaction progress since 2022.
 * Inserted once after featured property listings.
 */
export function MarketDemandSection({ locale }: MarketDemandSectionProps) {
  const resolved = resolveLocale(locale);
  const copy = MARKET_DEMAND_COPY[resolved];
  const titleId = "market-demand-title";

  return (
    <section
      id="market-demand"
      className="om-market-demand"
      aria-labelledby={titleId}
      data-scroll-section
    >
      <div className="om-market-demand__shell">
        <div className="om-market-demand__panel">
          <div className="om-market-demand__layout">
            <MarketDemandEditorial copy={copy} titleId={titleId} />
            <div className="om-market-demand__divider" aria-hidden="true" />
            <MarketDemandGraph
              graphLabel={copy.graphLabel}
              svgTitle={copy.svgTitle}
              svgDesc={copy.svgDesc}
              unitHint={copy.unitHint}
              projectedCaption={copy.projectedCaption}
              baseLabel={copy.baseLabel}
              locale={resolved}
            />
          </div>

          <details className="om-market-demand__sources">
            <summary className="om-market-demand__sources-summary">
              {copy.sourcesTitle}
            </summary>
            <p className="om-market-demand__sources-body">{copy.sourcesBody}</p>
          </details>
        </div>
      </div>
      <p className="om-market-demand__sr-only">{copy.summary}</p>
    </section>
  );
}
