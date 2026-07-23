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
  title: "Eiendomsinvesteringskalkulator Marrakech | OFF MARKET",
  description:
    "Beregn potensiell avkastning for en leilighet, villa eller riad i Marrakech. OFF MARKET finjusterer analysen med reelle sammenligninger og et privat utvalg.",
  canonicalPath: "/no/kalkulator/",
  ogLocale: "nb_NO",
});

export const viewport = buildPageViewport("#565449");

export default function NoKalkulatorPage() {
  return (
    <>
      <HtmlInit preloaderDisabled removeNotReady />
      <BodyClass className="om-simulator-page om-inner-page" deferLegacyBoot />
      <StylesheetLinks hrefs={STYLES.simulateur} />
      <style>{`body { color: #565449; } .js.not-ready, .js.not-ready * { transition: none !important; }`}</style>
      <a href="#main" className="sr-only sr-only--focusable">
        Gå til hovedinnhold
      </a>
      <SimulatorSection locale="no" />
      <CallbackModal locale="no" secondaryHref="/no/kontakt/" />
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
