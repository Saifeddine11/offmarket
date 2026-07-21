import type { SiteLocale } from "@/lib/i18n/types";

export type DemandPoint = {
  cityKey: "rabat" | "casablanca" | "tanger" | "agadir" | "marrakech";
  value: number;
};

/** Exact demand series — left → right, Marrakech is final / highest. */
export const DEMAND_DATA: readonly DemandPoint[] = [
  { cityKey: "rabat", value: 2 },
  { cityKey: "casablanca", value: 9 },
  { cityKey: "tanger", value: 18 },
  { cityKey: "agadir", value: 28 },
  { cityKey: "marrakech", value: 42 },
] as const;

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
  cities: Record<DemandPoint["cityKey"], string>;
  metrics: readonly [MarketDemandMetric, MarketDemandMetric, MarketDemandMetric];
};

export const MARKET_DEMAND_COPY: Record<SiteLocale, MarketDemandCopy> = {
  fr: {
    eyebrow: "LECTURE DU MARCHÉ",
    title: "Marrakech prend de l’avance.",
    lead: "La demande progresse plus vite que dans les autres grandes villes marocaines.",
    graphLabel: "ÉVOLUTION DE LA DEMANDE",
    svgTitle: "Évolution de la demande par ville",
    svgDesc:
      "Courbe de la demande relative : Rabat +2 %, Casablanca +9 %, Tanger +18 %, Agadir +28 %, Marrakech +42 %.",
    summary:
      "Parmi cinq villes, Marrakech enregistre la plus forte progression de la demande à +42 %, devant Agadir à +28 %.",
    cities: {
      rabat: "Rabat",
      casablanca: "Casablanca",
      tanger: "Tanger",
      agadir: "Agadir",
      marrakech: "Marrakech",
    },
    metrics: [
      { value: "+42 %", label: "Marrakech", accent: true },
      { value: "5", label: "villes comparées" },
      { value: "+14 pts", label: "devant Agadir" },
    ],
  },
  en: {
    eyebrow: "MARKET READING",
    title: "Marrakech pulls ahead.",
    lead: "Demand is rising faster here than in other major Moroccan cities.",
    graphLabel: "DEMAND TREND",
    svgTitle: "Demand trend by city",
    svgDesc:
      "Relative demand curve: Rabat +2%, Casablanca +9%, Tangier +18%, Agadir +28%, Marrakech +42%.",
    summary:
      "Among five cities, Marrakech leads demand growth at +42%, ahead of Agadir at +28%.",
    cities: {
      rabat: "Rabat",
      casablanca: "Casablanca",
      tanger: "Tangier",
      agadir: "Agadir",
      marrakech: "Marrakech",
    },
    metrics: [
      { value: "+42%", label: "Marrakech", accent: true },
      { value: "5", label: "cities compared" },
      { value: "+14 pts", label: "ahead of Agadir" },
    ],
  },
  it: {
    eyebrow: "LETTURA DI MERCATO",
    title: "Marrakech prende il largo.",
    lead: "La domanda cresce più in fretta che nelle altre grandi città marocchine.",
    graphLabel: "EVOLUZIONE DELLA DOMANDA",
    svgTitle: "Evoluzione della domanda per città",
    svgDesc:
      "Curva della domanda relativa: Rabat +2 %, Casablanca +9 %, Tangeri +18 %, Agadir +28 %, Marrakech +42 %.",
    summary:
      "Tra cinque città, Marrakech registra la crescita di domanda più forte a +42 %, davanti ad Agadir a +28 %.",
    cities: {
      rabat: "Rabat",
      casablanca: "Casablanca",
      tanger: "Tangeri",
      agadir: "Agadir",
      marrakech: "Marrakech",
    },
    metrics: [
      { value: "+42 %", label: "Marrakech", accent: true },
      { value: "5", label: "città confrontate" },
      { value: "+14 pts", label: "davanti ad Agadir" },
    ],
  },
  nl: {
    eyebrow: "MARKTLEZING",
    title: "Marrakech trekt vooruit.",
    lead: "De vraag stijgt hier sneller dan in andere grote Marokkaanse steden.",
    graphLabel: "VRAAGONTWIKKELING",
    svgTitle: "Vraagontwikkeling per stad",
    svgDesc:
      "Relatieve vraagcurve: Rabat +2 %, Casablanca +9 %, Tanger +18 %, Agadir +28 %, Marrakech +42 %.",
    summary:
      "Onder vijf steden toont Marrakech de sterkste vraagstijging op +42 %, vóór Agadir op +28 %.",
    cities: {
      rabat: "Rabat",
      casablanca: "Casablanca",
      tanger: "Tanger",
      agadir: "Agadir",
      marrakech: "Marrakech",
    },
    metrics: [
      { value: "+42 %", label: "Marrakech", accent: true },
      { value: "5", label: "steden vergeleken" },
      { value: "+14 pts", label: "vóór Agadir" },
    ],
  },
};
