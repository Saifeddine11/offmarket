import type { SiteLocale } from "@/lib/i18n/types";

export type MarketDemandMetric = {
  value: string;
  label: string;
  accent?: boolean;
};

export type MarketDemandCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  graphLabel: string;
  svgTitle: string;
  svgDesc: string;
  summary: string;
  /** Short caption near the projected segment (optional visual cue). */
  projectedCaption: string;
  metrics: readonly [MarketDemandMetric, MarketDemandMetric, MarketDemandMetric];
};

export const MARKET_DEMAND_COPY: Record<SiteLocale, MarketDemandCopy> = {
  fr: {
    eyebrow: "TRAJECTOIRE DE LA DEMANDE",
    title: "Une dynamique qui s’installe.",
    lead:
      "Depuis 2022, la demande progresse à Marrakech. Les projections à 2028 et 2030 prolongent cette tendance.",
    graphLabel: "ÉVOLUTION DE LA DEMANDE · 2022 → 2030",
    svgTitle: "Évolution de la demande de 2022 à 2030",
    svgDesc:
      "Indice de demande observé : 2022 à 100, 2024 à 124, 2026 à 148. Estimations : 2028 à 165, 2030 à 181.",
    summary:
      "La demande à Marrakech progresse de 2022 à 2026. Les années 2028 et 2030 sont des estimations qui prolongent la tendance.",
    projectedCaption: "estimé",
    metrics: [
      { value: "2022–2026", label: "données observées", accent: true },
      { value: "2028–2030", label: "estimations" },
      { value: "5", label: "jalons de lecture" },
    ],
  },
  en: {
    eyebrow: "DEMAND TRAJECTORY",
    title: "A momentum that settles in.",
    lead:
      "Since 2022, demand has been rising in Marrakech. Projections for 2028 and 2030 extend that trend.",
    graphLabel: "DEMAND EVOLUTION · 2022 → 2030",
    svgTitle: "Demand evolution from 2022 to 2030",
    svgDesc:
      "Observed demand index: 2022 at 100, 2024 at 124, 2026 at 148. Estimates: 2028 at 165, 2030 at 181.",
    summary:
      "Demand in Marrakech rises from 2022 to 2026. Years 2028 and 2030 are estimates extending the trend.",
    projectedCaption: "est.",
    metrics: [
      { value: "2022–2026", label: "observed data", accent: true },
      { value: "2028–2030", label: "estimates" },
      { value: "5", label: "reading markers" },
    ],
  },
  it: {
    eyebrow: "TRAETTORIA DELLA DOMANDA",
    title: "Una dinamica che si afferma.",
    lead:
      "Dal 2022 la domanda cresce a Marrakech. Le proiezioni al 2028 e al 2030 prolungano questa tendenza.",
    graphLabel: "EVOLUZIONE DELLA DOMANDA · 2022 → 2030",
    svgTitle: "Evoluzione della domanda dal 2022 al 2030",
    svgDesc:
      "Indice di domanda osservato: 2022 a 100, 2024 a 124, 2026 a 148. Stime: 2028 a 165, 2030 a 181.",
    summary:
      "La domanda a Marrakech cresce dal 2022 al 2026. Gli anni 2028 e 2030 sono stime che prolungano la tendenza.",
    projectedCaption: "stimato",
    metrics: [
      { value: "2022–2026", label: "dati osservati", accent: true },
      { value: "2028–2030", label: "stime" },
      { value: "5", label: "punti di lettura" },
    ],
  },
  nl: {
    eyebrow: "VRAAGTRAJECT",
    title: "Een dynamiek die zich vestigt.",
    lead:
      "Sinds 2022 stijgt de vraag in Marrakech. De projecties voor 2028 en 2030 verlengen die trend.",
    graphLabel: "VRAAGONTWIKKELING · 2022 → 2030",
    svgTitle: "Vraagontwikkeling van 2022 tot 2030",
    svgDesc:
      "Geobserveerde vraagindex: 2022 op 100, 2024 op 124, 2026 op 148. Schattingen: 2028 op 165, 2030 op 181.",
    summary:
      "De vraag in Marrakech stijgt van 2022 tot 2026. De jaren 2028 en 2030 zijn schattingen die de trend verlengen.",
    projectedCaption: "geschat",
    metrics: [
      { value: "2022–2026", label: "geobserveerde data", accent: true },
      { value: "2028–2030", label: "schattingen" },
      { value: "5", label: "leesmarkers" },
    ],
  },
};
