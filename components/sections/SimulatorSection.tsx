import { PageFinalCtaMotion } from "@/components/motion/PageFinalCtaMotion";
import { HomeSimulatorSection } from "@/components/sections/HomeSimulatorSection";

const SIMULATOR_PAGE_TEXT = (
  <>
    Estimez le potentiel d&apos;un bien à Marrakech selon son usage, son adresse et votre
    stratégie.{" "}
    <span className="om-brand-inline">OFF MARKET</span> affine ensuite les chiffres avec des
    comparables réels et des opportunités sélectionnées.
  </>
);

/** Dedicated /simulateur/ page — same calculator UI as the homepage embed. */
export function SimulatorSection() {
  return (
    <main id="main" className="om-simulator-page">
      <HomeSimulatorSection
        id="simulateur"
        titleId="om-simulator-page-title"
        title="Simuler avant d'investir"
        text={SIMULATOR_PAGE_TEXT}
        motion
        primaryCtaHref="#callback-modal"
        secondaryCtaHref="/nos-projets/"
      />

      <PageFinalCtaMotion />
    </main>
  );
}
