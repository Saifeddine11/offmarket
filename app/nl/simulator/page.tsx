import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { CallbackModal } from "@/components/layout/CallbackModal";
import { DeferredSimulatorBoot } from "@/components/layout/DeferredSimulatorBoot";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";
import { SimulatorSection } from "@/components/sections/SimulatorSection";
import { SCRIPTS, STYLES } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Simulator vastgoedinvestering Marrakech | OFF MARKET",
  description:
    "Simuleer het potentiële rendement van een appartement, villa of riad in Marrakech. OFF MARKET verfijnt uw analyse met echte vergelijkingspunten en een private selectie.",
  canonicalPath: "/nl/simulator/",
  ogLocale: "nl_NL",
});

export const viewport = buildPageViewport("#565449");

export default function NlSimulatorPage() {
  return (
    <>
      <HtmlInit preloaderDisabled removeNotReady />
      <BodyClass className="om-simulator-page om-inner-page" deferLegacyBoot />
      <StylesheetLinks hrefs={STYLES.simulateur} />
      <style>{`
        body { color: #565449; }
        .js.not-ready, .js.not-ready * { transition: none !important; }
      `}</style>

      <a href="#main" className="sr-only sr-only--focusable">
        Naar hoofdinhoud
      </a>

      <SimulatorSection locale="nl" />
      <CallbackModal locale="nl" secondaryHref="/nl/contact/" />
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html:
            "document.body.setAttribute('data-om-defer-legacy-boot','true');",
        }}
      />
      <LegacyScripts srcs={SCRIPTS.simulateur} />
      <DeferredSimulatorBoot />
    </>
  );
}
