import type { SiteLocale } from "@/lib/i18n/types";

export type MarketDemandMetric = {
  value: string;
  label: string;
  detail: string;
  accent?: boolean;
};

export type MarketDemandCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  /** Chart heading — transaction volume, base 100 in 2024. */
  graphTitle: string;
  graphBaseline: string;
  /** Accent badge on the 2025 point. */
  highlight: string;
  /** SVG aria-label. */
  chartAria: string;
  /** Screen-reader textual equivalent of every chart value (both series). */
  chartSummary: string;
  primaryMetric: MarketDemandMetric;
  secondaryMetric: MarketDemandMetric;
  sourcesTitle: string;
  source: string;
  methodology: string;
};

export const MARKET_DEMAND_COPY: Record<SiteLocale, MarketDemandCopy> = {
  fr: {
    eyebrow: "MARCHÉ IMMOBILIER À MARRAKECH",
    title: "Une activité en forte progression",
    lead: "En 2025, le nombre de transactions immobilières à Marrakech a progressé de 24,1 % par rapport à 2024, tandis que les prix des actifs immobiliers ont augmenté de 1 %.",
    graphTitle: "Évolution du volume des transactions",
    graphBaseline: "Base 100 en 2024",
    highlight: "+24,1 %",
    chartAria:
      "Le volume des transactions immobilières à Marrakech est passé d’un indice 100 en 2024 à 124,1 en 2025, soit une hausse de 24,1 %.",
    chartSummary:
      "Volume des transactions immobilières à Marrakech : indice 100 en 2024, 124,1 en 2025, soit +24,1 %. Prix des actifs immobiliers : indice 100 en 2024, 101 en 2025, soit +1,0 %.",
    primaryMetric: {
      value: "+24,1 %",
      label: "Transactions en 2025",
      detail: "par rapport à 2024",
      accent: true,
    },
    secondaryMetric: {
      value: "+1,0 %",
      label: "Prix immobiliers en 2025",
      detail: "par rapport à 2024",
    },
    sourcesTitle: "Source et méthodologie",
    source:
      "Source : Bank Al-Maghrib et ANCFCC — Indice des Prix des Actifs Immobiliers, bilan 2025.",
    methodology:
      "Les variations indiquées correspondent aux résultats annuels officiels publiés pour la ville de Marrakech.",
  },
  en: {
    eyebrow: "REAL ESTATE MARKET IN MARRAKECH",
    title: "Activity growing strongly",
    lead: "In 2025, the number of real-estate transactions in Marrakech rose by 24.1% compared with 2024, while real-estate asset prices increased by 1%.",
    graphTitle: "Transaction volume trend",
    graphBaseline: "Base 100 in 2024",
    highlight: "+24.1%",
    chartAria:
      "The volume of real-estate transactions in Marrakech rose from an index of 100 in 2024 to 124.1 in 2025, an increase of 24.1%.",
    chartSummary:
      "Real-estate transaction volume in Marrakech: index 100 in 2024, 124.1 in 2025, i.e. +24.1%. Real-estate asset prices: index 100 in 2024, 101 in 2025, i.e. +1.0%.",
    primaryMetric: {
      value: "+24.1%",
      label: "Transactions in 2025",
      detail: "vs 2024",
      accent: true,
    },
    secondaryMetric: {
      value: "+1.0%",
      label: "Property prices in 2025",
      detail: "vs 2024",
    },
    sourcesTitle: "Source and methodology",
    source:
      "Source: Bank Al-Maghrib and ANCFCC — Real Estate Asset Price Index, 2025 annual results.",
    methodology:
      "The figures shown correspond to the official annual results published for the city of Marrakech.",
  },
  it: {
    eyebrow: "MERCATO IMMOBILIARE A MARRAKECH",
    title: "Un’attività in forte crescita",
    lead: "Nel 2025, il numero di transazioni immobiliari a Marrakech è cresciuto del 24,1 % rispetto al 2024, mentre i prezzi degli attivi immobiliari sono aumentati dell’1 %.",
    graphTitle: "Andamento del volume delle transazioni",
    graphBaseline: "Base 100 nel 2024",
    highlight: "+24,1 %",
    chartAria:
      "Il volume delle transazioni immobiliari a Marrakech è passato da un indice di 100 nel 2024 a 124,1 nel 2025, con un aumento del 24,1 %.",
    chartSummary:
      "Volume delle transazioni immobiliari a Marrakech: indice 100 nel 2024, 124,1 nel 2025, ossia +24,1 %. Prezzi degli attivi immobiliari: indice 100 nel 2024, 101 nel 2025, ossia +1,0 %.",
    primaryMetric: {
      value: "+24,1 %",
      label: "Transazioni nel 2025",
      detail: "rispetto al 2024",
      accent: true,
    },
    secondaryMetric: {
      value: "+1,0 %",
      label: "Prezzi immobiliari nel 2025",
      detail: "rispetto al 2024",
    },
    sourcesTitle: "Fonte e metodologia",
    source:
      "Fonte: Bank Al-Maghrib e ANCFCC — Indice dei Prezzi degli Attivi Immobiliari, bilancio 2025.",
    methodology:
      "Le variazioni indicate corrispondono ai risultati annuali ufficiali pubblicati per la città di Marrakech.",
  },
  nl: {
    eyebrow: "VASTGOEDMARKT IN MARRAKECH",
    title: "Een sterk groeiende activiteit",
    lead: "In 2025 steeg het aantal vastgoedtransacties in Marrakech met 24,1 % ten opzichte van 2024, terwijl de prijzen van vastgoedactiva met 1 % toenamen.",
    graphTitle: "Ontwikkeling van het transactievolume",
    graphBaseline: "Basis 100 in 2024",
    highlight: "+24,1 %",
    chartAria:
      "Het volume van de vastgoedtransacties in Marrakech steeg van een index van 100 in 2024 naar 124,1 in 2025, een stijging van 24,1 %.",
    chartSummary:
      "Vastgoedtransactievolume in Marrakech: index 100 in 2024, 124,1 in 2025, oftewel +24,1 %. Prijzen van vastgoedactiva: index 100 in 2024, 101 in 2025, oftewel +1,0 %.",
    primaryMetric: {
      value: "+24,1 %",
      label: "Transacties in 2025",
      detail: "t.o.v. 2024",
      accent: true,
    },
    secondaryMetric: {
      value: "+1,0 %",
      label: "Vastgoedprijzen in 2025",
      detail: "t.o.v. 2024",
    },
    sourcesTitle: "Bron en methodologie",
    source:
      "Bron: Bank Al-Maghrib en ANCFCC — Prijsindex van vastgoedactiva, jaarcijfers 2025.",
    methodology:
      "De weergegeven wijzigingen komen overeen met de officiële jaarcijfers die voor de stad Marrakech zijn gepubliceerd.",
  },
  es: {
    eyebrow: "MERCADO INMOBILIARIO EN MARRAKECH",
    title: "Una actividad en fuerte crecimiento",
    lead: "En 2025, el número de transacciones inmobiliarias en Marrakech creció un 24,1 % en comparación con 2024, mientras que los precios de los activos inmobiliarios aumentaron un 1 %.",
    graphTitle: "Evolución del volumen de transacciones",
    graphBaseline: "Base 100 en 2024",
    highlight: "+24,1 %",
    chartAria:
      "El volumen de las transacciones inmobiliarias en Marrakech pasó de un índice de 100 en 2024 a 124,1 en 2025, un aumento del 24,1 %.",
    chartSummary:
      "Volumen de transacciones inmobiliarias en Marrakech: índice 100 en 2024, 124,1 en 2025, es decir, +24,1 %. Precios de los activos inmobiliarios: índice 100 en 2024, 101 en 2025, es decir, +1,0 %.",
    primaryMetric: {
      value: "+24,1 %",
      label: "Transacciones en 2025",
      detail: "respecto a 2024",
      accent: true,
    },
    secondaryMetric: {
      value: "+1,0 %",
      label: "Precios inmobiliarios en 2025",
      detail: "respecto a 2024",
    },
    sourcesTitle: "Fuente y metodología",
    source:
      "Fuente: Bank Al-Maghrib y ANCFCC — Índice de Precios de los Activos Inmobiliarios, balance 2025.",
    methodology:
      "Las variaciones indicadas corresponden a los resultados anuales oficiales publicados para la ciudad de Marrakech.",
  },
  no: {
    eyebrow: "EIENDOMSMARKEDET I MARRAKECH",
    title: "En aktivitet i sterk vekst",
    lead: "I 2025 økte antallet eiendomstransaksjoner i Marrakech med 24,1 % sammenlignet med 2024, mens prisene på eiendomsaktiva steg med 1 %.",
    graphTitle: "Utvikling i transaksjonsvolumet",
    graphBaseline: "Basis 100 i 2024",
    highlight: "+24,1 %",
    chartAria:
      "Volumet av eiendomstransaksjoner i Marrakech steg fra en indeks på 100 i 2024 til 124,1 i 2025, en økning på 24,1 %.",
    chartSummary:
      "Eiendomstransaksjonsvolum i Marrakech: indeks 100 i 2024, 124,1 i 2025, altså +24,1 %. Priser på eiendomsaktiva: indeks 100 i 2024, 101 i 2025, altså +1,0 %.",
    primaryMetric: {
      value: "+24,1 %",
      label: "Transaksjoner i 2025",
      detail: "mot 2024",
      accent: true,
    },
    secondaryMetric: {
      value: "+1,0 %",
      label: "Eiendomspriser i 2025",
      detail: "mot 2024",
    },
    sourcesTitle: "Kilde og metode",
    source:
      "Kilde: Bank Al-Maghrib og ANCFCC — Prisindeks for eiendomsaktiva, årsresultater 2025.",
    methodology:
      "De oppgitte endringene tilsvarer de offisielle årsresultatene som er publisert for byen Marrakech.",
  },
};
