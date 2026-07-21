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
  sourcesTitle: string;
  sourcesBody: string;
  metrics: readonly [MarketDemandMetric, MarketDemandMetric, MarketDemandMetric];
};

export const MARKET_DEMAND_COPY: Record<SiteLocale, MarketDemandCopy> = {
  fr: {
    eyebrow: "TRANSACTIONS À MARRAKECH",
    title: "Le marché repart à la hausse.",
    lead:
      "Après le rebond engagé en 2023, les ventes immobilières à Marrakech poursuivent leur progression et accélèrent nettement en 2025.",
    graphLabel: "VARIATION ANNUELLE DU NOMBRE DE TRANSACTIONS",
    svgTitle: "Reprise des ventes immobilières à Marrakech — variation annuelle",
    svgDesc:
      "Variation annuelle du nombre de transactions : 2023 +16,5 % vs 2022, 2024 +4,2 % vs 2023, 2025 +24,1 % vs 2024.",
    summary:
      "À Marrakech, le nombre de transactions immobilières a progressé de +16,5 % en 2023, +4,2 % en 2024 et +24,1 % en 2025, chaque fois par rapport à l’année précédente.",
    unitHint: "% / an",
    sourcesTitle: "Sources et méthodologie",
    sourcesBody:
      "Les pourcentages indiquent la variation annuelle du nombre de transactions immobilières à Marrakech par rapport à l’année précédente. Série visible : 2023 (+16,5 % vs 2022), 2024 (+4,2 % vs 2023), 2025 (+24,1 % vs 2024). Pour transparence, 2022 a enregistré −17,3 % vs 2021 — cette année n’est pas représentée sur le graphique principal afin de mettre en avant la reprise. Le prix en 2025 (+1 % vs 2024) est une indication de stabilité des prix, distincte du volume de transactions.",
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
        detail: "rebond du marché",
      },
      {
        value: "+1 %",
        label: "prix en 2025",
        detail: "vs 2024",
      },
    ],
  },
  en: {
    eyebrow: "TRANSACTIONS IN MARRAKECH",
    title: "The market is rising again.",
    lead:
      "After the rebound that began in 2023, property sales in Marrakech keep advancing and accelerate clearly in 2025.",
    graphLabel: "ANNUAL CHANGE IN TRANSACTION VOLUME",
    svgTitle: "Recovery in Marrakech property sales — annual change",
    svgDesc:
      "Annual change in transaction volume: 2023 +16.5% vs 2022, 2024 +4.2% vs 2023, 2025 +24.1% vs 2024.",
    summary:
      "In Marrakech, real-estate transaction volume rose +16.5% in 2023, +4.2% in 2024 and +24.1% in 2025 — each versus the prior year.",
    unitHint: "% / year",
    sourcesTitle: "Sources and methodology",
    sourcesBody:
      "Percentages show the annual change in the number of real-estate transactions in Marrakech versus the previous year. Visible series: 2023 (+16.5% vs 2022), 2024 (+4.2% vs 2023), 2025 (+24.1% vs 2024). For transparency, 2022 recorded −17.3% vs 2021 — that year is omitted from the main chart to emphasise the recovery. The 2025 price figure (+1% vs 2024) indicates price stability, separate from transaction volume.",
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
        detail: "market rebound",
      },
      {
        value: "+1%",
        label: "prices in 2025",
        detail: "vs 2024",
      },
    ],
  },
  it: {
    eyebrow: "TRANSAZIONI A MARRAKECH",
    title: "Il mercato torna a salire.",
    lead:
      "Dopo il rimbalzo avviato nel 2023, le vendite immobiliari a Marrakech continuano a crescere e accelerano nettamente nel 2025.",
    graphLabel: "VARIAZIONE ANNUALE DEL NUMERO DI TRANSAZIONI",
    svgTitle: "Ripresa delle vendite immobiliari a Marrakech — variazione annuale",
    svgDesc:
      "Variazione annuale del numero di transazioni: 2023 +16,5 % vs 2022, 2024 +4,2 % vs 2023, 2025 +24,1 % vs 2024.",
    summary:
      "A Marrakech, il numero di transazioni immobiliari è cresciuto del +16,5 % nel 2023, +4,2 % nel 2024 e +24,1 % nel 2025, sempre rispetto all’anno precedente.",
    unitHint: "% / anno",
    sourcesTitle: "Fonti e metodologia",
    sourcesBody:
      "Le percentuali indicano la variazione annuale del numero di transazioni immobiliari a Marrakech rispetto all’anno precedente. Serie visibile: 2023 (+16,5 % vs 2022), 2024 (+4,2 % vs 2023), 2025 (+24,1 % vs 2024). Per trasparenza, il 2022 ha registrato −17,3 % vs 2021 — quell’anno non compare nel grafico principale per mettere in evidenza la ripresa. Il prezzo nel 2025 (+1 % vs 2024) indica stabilità dei prezzi, distinta dal volume di transazioni.",
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
        detail: "rimbalzo del mercato",
      },
      {
        value: "+1 %",
        label: "prezzi nel 2025",
        detail: "vs 2024",
      },
    ],
  },
  nl: {
    eyebrow: "TRANSACTIES IN MARRAKECH",
    title: "De markt trekt weer aan.",
    lead:
      "Na de opleving die in 2023 inzette, blijven de vastgoedverkopen in Marrakech groeien en versnellen ze duidelijk in 2025.",
    graphLabel: "JAARLIJKSE VARIATIE VAN HET AANTAL TRANSACTIES",
    svgTitle: "Herstel van vastgoedverkopen in Marrakech — jaarlijkse variatie",
    svgDesc:
      "Jaarlijkse variatie van het aantal transacties: 2023 +16,5 % vs 2022, 2024 +4,2 % vs 2023, 2025 +24,1 % vs 2024.",
    summary:
      "In Marrakech steeg het aantal vastgoedtransacties met +16,5 % in 2023, +4,2 % in 2024 en +24,1 % in 2025 — telkens ten opzichte van het vorige jaar.",
    unitHint: "% / jaar",
    sourcesTitle: "Bronnen en methodologie",
    sourcesBody:
      "Percentages tonen de jaarlijkse verandering van het aantal vastgoedtransacties in Marrakech ten opzichte van het vorige jaar. Zichtbare reeks: 2023 (+16,5 % vs 2022), 2024 (+4,2 % vs 2023), 2025 (+24,1 % vs 2024). Voor transparantie: 2022 noteerde −17,3 % vs 2021 — dat jaar staat niet in de hoofdgrafiek om het herstel te benadrukken. De prijs in 2025 (+1 % vs 2024) wijst op prijsstabiliteit, los van het transactievolume.",
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
        detail: "marktherstel",
      },
      {
        value: "+1 %",
        label: "prijzen in 2025",
        detail: "vs 2024",
      },
    ],
  },
};
