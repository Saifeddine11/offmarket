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
  /** Tiny unit reminder near the graph (e.g. “%/an”). */
  unitHint: string;
  metrics: readonly [MarketDemandMetric, MarketDemandMetric, MarketDemandMetric];
};

export const MARKET_DEMAND_COPY: Record<SiteLocale, MarketDemandCopy> = {
  fr: {
    eyebrow: "TRANSACTIONS À MARRAKECH",
    title: "La variation annuelle des ventes.",
    lead:
      "Chaque chiffre indique de combien le nombre de transactions immobilières a changé par rapport à l’année précédente.",
    graphLabel: "VARIATION ANNUELLE DU NOMBRE DE TRANSACTIONS",
    svgTitle: "Variation annuelle des transactions immobilières à Marrakech",
    svgDesc:
      "Variation du nombre de ventes vs l’année précédente : 2022 −17,3 % vs 2021, 2023 +16,5 % vs 2022, 2024 +4,2 % vs 2023, 2025 +24,1 % vs 2024.",
    summary:
      "À Marrakech, le nombre de transactions immobilières a varié de −17,3 % en 2022, +16,5 % en 2023, +4,2 % en 2024 et +24,1 % en 2025, chaque fois par rapport à l’année précédente.",
    unitHint: "% / an",
    metrics: [
      {
        value: "+24,1 %",
        label: "en 2025",
        detail: "vs 2024",
        accent: true,
      },
      {
        value: "+16,5 %",
        label: "en 2023",
        detail: "vs 2022",
      },
      {
        value: "−17,3 %",
        label: "en 2022",
        detail: "vs 2021",
      },
    ],
  },
  en: {
    eyebrow: "TRANSACTIONS IN MARRAKECH",
    title: "Yearly change in sales volume.",
    lead:
      "Each figure shows how much the number of real-estate transactions changed compared with the previous year.",
    graphLabel: "ANNUAL CHANGE IN TRANSACTION VOLUME",
    svgTitle: "Annual change in real-estate transactions in Marrakech",
    svgDesc:
      "Year-over-year change in sales volume: 2022 −17.3% vs 2021, 2023 +16.5% vs 2022, 2024 +4.2% vs 2023, 2025 +24.1% vs 2024.",
    summary:
      "In Marrakech, real-estate transaction volume changed by −17.3% in 2022, +16.5% in 2023, +4.2% in 2024 and +24.1% in 2025 — each versus the prior year.",
    unitHint: "% / year",
    metrics: [
      {
        value: "+24.1%",
        label: "in 2025",
        detail: "vs 2024",
        accent: true,
      },
      {
        value: "+16.5%",
        label: "in 2023",
        detail: "vs 2022",
      },
      {
        value: "−17.3%",
        label: "in 2022",
        detail: "vs 2021",
      },
    ],
  },
  it: {
    eyebrow: "TRANSAZIONI A MARRAKECH",
    title: "La variazione annuale delle vendite.",
    lead:
      "Ogni cifra indica di quanto è cambiato il numero di transazioni immobiliari rispetto all’anno precedente.",
    graphLabel: "VARIAZIONE ANNUALE DEL NUMERO DI TRANSAZIONI",
    svgTitle: "Variazione annuale delle transazioni immobiliari a Marrakech",
    svgDesc:
      "Variazione del numero di vendite vs l’anno precedente: 2022 −17,3 % vs 2021, 2023 +16,5 % vs 2022, 2024 +4,2 % vs 2023, 2025 +24,1 % vs 2024.",
    summary:
      "A Marrakech, il numero di transazioni immobiliari è variato di −17,3 % nel 2022, +16,5 % nel 2023, +4,2 % nel 2024 e +24,1 % nel 2025, sempre rispetto all’anno precedente.",
    unitHint: "% / anno",
    metrics: [
      {
        value: "+24,1 %",
        label: "nel 2025",
        detail: "vs 2024",
        accent: true,
      },
      {
        value: "+16,5 %",
        label: "nel 2023",
        detail: "vs 2022",
      },
      {
        value: "−17,3 %",
        label: "nel 2022",
        detail: "vs 2021",
      },
    ],
  },
  nl: {
    eyebrow: "TRANSACTIES IN MARRAKECH",
    title: "De jaarlijkse verandering in verkopen.",
    lead:
      "Elk cijfer toont hoeveel het aantal vastgoedtransacties is veranderd ten opzichte van het vorige jaar.",
    graphLabel: "JAARLIJKSE VARIATIE VAN HET AANTAL TRANSACTIES",
    svgTitle: "Jaarlijkse variatie van vastgoedtransacties in Marrakech",
    svgDesc:
      "Variatie van het aantal verkopen vs het vorige jaar: 2022 −17,3 % vs 2021, 2023 +16,5 % vs 2022, 2024 +4,2 % vs 2023, 2025 +24,1 % vs 2024.",
    summary:
      "In Marrakech is het aantal vastgoedtransacties veranderd met −17,3 % in 2022, +16,5 % in 2023, +4,2 % in 2024 en +24,1 % in 2025 — telkens ten opzichte van het vorige jaar.",
    unitHint: "% / jaar",
    metrics: [
      {
        value: "+24,1 %",
        label: "in 2025",
        detail: "vs 2024",
        accent: true,
      },
      {
        value: "+16,5 %",
        label: "in 2023",
        detail: "vs 2022",
      },
      {
        value: "−17,3 %",
        label: "in 2022",
        detail: "vs 2021",
      },
    ],
  },
};
