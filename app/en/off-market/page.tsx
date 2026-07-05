import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";
import { SCRIPTS } from "@/lib/assets";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Private Access | OFF MARKET Marrakech",
  description:
    "Request private access to selected off-market real estate opportunities in Marrakech, including private villas, confidential properties and off-plan projects.",
  canonicalPath: "/en/off-market/",
});

export const viewport = buildPageViewport("#565449");

export default function EnOffMarketPage() {
  return (
    <PageShell className="om-off-market-page">
      <BodyClass className="om-off-market-page" />

      <a href="#main" className="om-contact-skip-link">
        Skip to main content
      </a>
      <Link className="om-off-market-close" href="/en/" aria-label="Back to home">
        ×
      </Link>

      <main id="main" className="om-off-market-main">
        <header className="om-off-market-hero">
          <p className="om-off-market-hero__eyebrow">PRIVATE ACCESS</p>
          <h1 className="om-off-market-hero__title">
            Access off-market properties
          </h1>
          <p className="om-off-market-hero__subtitle">
            Confidential opportunities are not published online. Complete the
            form to receive a private selection aligned with your project.
          </p>
          <a className="om-off-market-hero__cta" href="#off-market-form">
            Request access
          </a>
        </header>

        <section
          className="om-off-market-form-panel"
          id="off-market-form"
          aria-labelledby="om-off-market-form-title"
        >
          <h2
            id="om-off-market-form-title"
            className="om-private-access-form__label--sr"
          >
            Off-market access form
          </h2>
          <LeadForm
            source="off_market_page"
            context="private_access"
            intent="off-market"
            intentMode="from-url"
            locale="en"
            variant="bare"
          />
        </section>
      </main>

      <footer className="om-off-market-footer">
        <p>
          <Link href="/en/">OFF MARKET</Link> — Private real estate in Marrakech
        </p>
      </footer>

      <LegacyScripts srcs={SCRIPTS.offMarket} />
    </PageShell>
  );
}
