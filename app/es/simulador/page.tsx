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
  title: "Simulador de inversión inmobiliaria en Marrakech | OFF MARKET",
  description:
    "Simule la rentabilidad potencial de un apartamento, una villa o un riad en Marrakech. OFF MARKET afina su análisis con comparables reales y una selección privada.",
  canonicalPath: "/es/simulador/",
  ogLocale: "es_ES",
});

export const viewport = buildPageViewport("#565449");

export default function EsSimuladorPage() {
  return (
    <>
      <HtmlInit preloaderDisabled removeNotReady />
      <BodyClass className="om-simulator-page om-inner-page" deferLegacyBoot />
      <StylesheetLinks hrefs={STYLES.simulateur} />
      <style>{`body { color: #565449; } .js.not-ready, .js.not-ready * { transition: none !important; }`}</style>
      <a href="#main" className="sr-only sr-only--focusable">
        Saltar al contenido principal
      </a>
      <SimulatorSection locale="es" />
      <CallbackModal locale="es" secondaryHref="/es/contacto/" />
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
