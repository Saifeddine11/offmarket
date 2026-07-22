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
  title: "Simulatore di investimento immobiliare a Marrakech | OFF MARKET",
  description:
    "Stima il potenziale rendimento di un appartamento, una villa o un riad a Marrakech. OFF MARKET affina l'analisi con comparabili reali e una selezione privata.",
  canonicalPath: "/it/simulatore/",
  ogLocale: "it_IT",
});

export const viewport = buildPageViewport("#565449");

export default function ItSimulatorePage() {
  return (
    <>
      <HtmlInit preloaderDisabled removeNotReady />
      <BodyClass className="om-simulator-page om-inner-page" deferLegacyBoot />
      <StylesheetLinks hrefs={STYLES.simulateur} />
      <style>{`body { color: #565449; } .js.not-ready, .js.not-ready * { transition: none !important; }`}</style>
      <a href="#main" className="sr-only sr-only--focusable">
        Vai al contenuto principale
      </a>
      <SimulatorSection locale="it" />
      <CallbackModal locale="it" secondaryHref="/it/progetti/" />
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: "document.body.setAttribute('data-om-defer-legacy-boot','true');",
        }}
      />
      <LegacyScripts srcs={SCRIPTS.simulateur} />
      <DeferredSimulatorBoot />
    </>
  );
}
