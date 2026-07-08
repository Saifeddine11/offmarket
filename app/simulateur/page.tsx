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
  title: "Simulateur investissement immobilier Marrakech | OFF MARKET",
  description:
    "Simulez le rendement potentiel d'un appartement, d'une villa ou d'un riad à Marrakech. OFF MARKET affine votre analyse avec des comparables réels et une sélection privée.",
  canonicalPath: "/simulateur/",
});

export const viewport = buildPageViewport("#565449");

export default function SimulateurPage() {
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
        Aller au contenu principal
      </a>

      <SimulatorSection />
      <CallbackModal />
      <LegacyScripts srcs={SCRIPTS.simulateur} />
      <DeferredSimulatorBoot />
    </>
  );
}
