import type { SiteLocale } from "@/lib/i18n/types";

export type MarketDemandMetric = {
  value: string;
  label: string;
  detail?: string;
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
  unitHint: string;
  projectedCaption: string;
  baseLabel: string;
  sourcesTitle: string;
  sourcesBody: string;
  metrics: readonly [MarketDemandMetric, MarketDemandMetric, MarketDemandMetric];
};

export const MARKET_DEMAND_COPY: Record<SiteLocale, MarketDemandCopy> = {
  fr: {
    eyebrow: "TRANSACTIONS À MARRAKECH",
    title: "Une progression qui s’accumule.",
    lead:
      "Depuis 2022, le niveau estimé des transactions immobilières à Marrakech s’élève. Chaque pourcentage indique l’écart cumulé par rapport à 2022.",
    graphLabel: "PROGRESSION CUMULÉE DES TRANSACTIONS · DEPUIS 2022",
    svgTitle:
      "Progression cumulée des transactions immobilières à Marrakech depuis 2022",
    svgDesc:
      "Niveau cumulé vs 2022 : 2022 base, 2023 +16,5 %, 2024 +21,4 %, 2025 +50,6 %. Projections internes de 2026 à 2030 en prolongation de la tendance.",
    summary:
      "À Marrakech, le niveau estimé des transactions immobilières est supérieur de +16,5 % en 2023, +21,4 % en 2024 et +50,6 % en 2025 par rapport à 2022. Les années 2026 à 2030 sont des projections internes.",
    unitHint: "% vs 2022",
    projectedCaption: "estimé",
    baseLabel: "base",
    sourcesTitle: "Sources et méthodologie",
    sourcesBody:
      "Le graphique montre une progression cumulée depuis 2022 (base 100), et non la variation annuelle seule — ce qui évite qu’une année de croissance plus lente fasse « descendre » la courbe. Taux annuels officiels utilisés : 2023 +16,5 % vs 2022, 2024 +4,2 % vs 2023, 2025 +24,1 % vs 2024. Niveaux cumulés observés : 2023 +16,5 %, 2024 +21,4 %, 2025 +50,6 % vs 2022. Les points 2026–2030 sont des projections internes OffMarket (taux annuels dégressifs indicatifs), distincts des statistiques officielles. Il ne s’agit pas d’un décompte exact de biens vendus.",
    metrics: [
      {
        value: "+50,6 %",
        label: "vs 2022",
        detail: "niveau fin 2025",
        accent: true,
      },
      {
        value: "+24,1 %",
        label: "en 2025",
        detail: "vs 2024",
      },
      {
        value: "2030",
        label: "horizon projeté",
        detail: "estimation interne",
      },
    ],
  },
  en: {
    eyebrow: "TRANSACTIONS IN MARRAKECH",
    title: "Growth that keeps compounding.",
    lead:
      "Since 2022, the estimated transaction level in Marrakech has risen. Each percentage shows how much higher it stands versus 2022.",
    graphLabel: "CUMULATIVE TRANSACTION PROGRESS · SINCE 2022",
    svgTitle:
      "Cumulative progress of real-estate transactions in Marrakech since 2022",
    svgDesc:
      "Cumulative level vs 2022: 2022 base, 2023 +16.5%, 2024 +21.4%, 2025 +50.6%. Internal projections from 2026 to 2030 extend the trend.",
    summary:
      "In Marrakech, the estimated transaction level is +16.5% in 2023, +21.4% in 2024 and +50.6% in 2025 versus 2022. Years 2026 to 2030 are internal projections.",
    unitHint: "% vs 2022",
    projectedCaption: "est.",
    baseLabel: "base",
    sourcesTitle: "Sources and methodology",
    sourcesBody:
      "The chart shows cumulative progress since 2022 (base 100), not year-on-year change alone — so a slower growth year does not pull the line down. Official annual rates used: 2023 +16.5% vs 2022, 2024 +4.2% vs 2023, 2025 +24.1% vs 2024. Observed cumulative levels: 2023 +16.5%, 2024 +21.4%, 2025 +50.6% vs 2022. Points 2026–2030 are OffMarket internal projections (indicative tapering annual rates), not official statistics. This is not an exact count of properties sold.",
    metrics: [
      {
        value: "+50.6%",
        label: "vs 2022",
        detail: "level end-2025",
        accent: true,
      },
      {
        value: "+24.1%",
        label: "in 2025",
        detail: "vs 2024",
      },
      {
        value: "2030",
        label: "projected horizon",
        detail: "internal estimate",
      },
    ],
  },
  it: {
    eyebrow: "TRANSAZIONI A MARRAKECH",
    title: "Una progressione che si accumula.",
    lead:
      "Dal 2022, il livello stimato delle transazioni immobiliari a Marrakech sale. Ogni percentuale indica lo scarto cumulato rispetto al 2022.",
    graphLabel: "PROGRESSIONE CUMULATA DELLE TRANSAZIONI · DAL 2022",
    svgTitle:
      "Progressione cumulata delle transazioni immobiliari a Marrakech dal 2022",
    svgDesc:
      "Livello cumulato vs 2022: 2022 base, 2023 +16,5 %, 2024 +21,4 %, 2025 +50,6 %. Proiezioni interne dal 2026 al 2030 in prolungamento della tendenza.",
    summary:
      "A Marrakech, il livello stimato delle transazioni è superiore del +16,5 % nel 2023, +21,4 % nel 2024 e +50,6 % nel 2025 rispetto al 2022. Gli anni 2026–2030 sono proiezioni interne.",
    unitHint: "% vs 2022",
    projectedCaption: "stimato",
    baseLabel: "base",
    sourcesTitle: "Fonti e metodologia",
    sourcesBody:
      "Il grafico mostra una progressione cumulata dal 2022 (base 100), non la sola variazione annuale — così un anno di crescita più lenta non fa scendere la curva. Tassi annui ufficiali usati: 2023 +16,5 % vs 2022, 2024 +4,2 % vs 2023, 2025 +24,1 % vs 2024. Livelli cumulati osservati: 2023 +16,5 %, 2024 +21,4 %, 2025 +50,6 % vs 2022. I punti 2026–2030 sono proiezioni interne OffMarket (tassi annui decrescenti indicativi), non statistiche ufficiali. Non si tratta di un conteggio esatto di immobili venduti.",
    metrics: [
      {
        value: "+50,6 %",
        label: "vs 2022",
        detail: "livello fine 2025",
        accent: true,
      },
      {
        value: "+24,1 %",
        label: "nel 2025",
        detail: "vs 2024",
      },
      {
        value: "2030",
        label: "orizzonte proiettato",
        detail: "stima interna",
      },
    ],
  },
  nl: {
    eyebrow: "TRANSACTIES IN MARRAKECH",
    title: "Een groei die zich opstapelt.",
    lead:
      "Sinds 2022 stijgt het geschatte transactieniveau in Marrakech. Elk percentage toont het cumulatieve verschil ten opzichte van 2022.",
    graphLabel: "CUMULATIEVE TRANSACTIEGROEI · SINDS 2022",
    svgTitle:
      "Cumulatieve progressie van vastgoedtransacties in Marrakech sinds 2022",
    svgDesc:
      "Cumulatief niveau vs 2022: 2022 basis, 2023 +16,5 %, 2024 +21,4 %, 2025 +50,6 %. Interne projecties van 2026 tot 2030 verlengen de trend.",
    summary:
      "In Marrakech ligt het geschatte transactieniveau +16,5 % in 2023, +21,4 % in 2024 en +50,6 % in 2025 hoger dan in 2022. De jaren 2026–2030 zijn interne projecties.",
    unitHint: "% vs 2022",
    projectedCaption: "geschat",
    baseLabel: "basis",
    sourcesTitle: "Bronnen en methodologie",
    sourcesBody:
      "De grafiek toont cumulatieve progressie sinds 2022 (basis 100), niet alleen de jaarlijkse variatie — zo trekt een trager groeijaar de lijn niet omlaag. Officiële jaarlijkse percentages: 2023 +16,5 % vs 2022, 2024 +4,2 % vs 2023, 2025 +24,1 % vs 2024. Geobserveerde cumulatieve niveaus: 2023 +16,5 %, 2024 +21,4 %, 2025 +50,6 % vs 2022. Punten 2026–2030 zijn interne OffMarket-projecties (indicatieve aflopende jaarrates), geen officiële statistiek. Dit is geen exacte telling van verkochte panden.",
    metrics: [
      {
        value: "+50,6 %",
        label: "vs 2022",
        detail: "niveau eind 2025",
        accent: true,
      },
      {
        value: "+24,1 %",
        label: "in 2025",
        detail: "vs 2024",
      },
      {
        value: "2030",
        label: "geprojecteerd horizon",
        detail: "interne schatting",
      },
    ],
  },
};
