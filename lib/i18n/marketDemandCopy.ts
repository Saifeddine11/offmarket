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
  detail: string;
};

export type MarketDemandCopy = {
  ariaLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  secondaryTitle: string;
  secondaryLead: string;
  graphLabel: string;
  cities: Record<DemandPoint["cityKey"], string>;
  metrics: readonly [MarketDemandMetric, MarketDemandMetric, MarketDemandMetric];
};

export const MARKET_DEMAND_COPY: Record<SiteLocale, MarketDemandCopy> = {
  fr: {
    ariaLabel: "Lecture du marché immobilier",
    eyebrow: "LECTURE DU MARCHÉ",
    title: "La demande se concentre là où l’offre se raréfie.",
    lead:
      "Parmi cinq grandes villes marocaines, Marrakech affiche la progression la plus nette. Une demande en hausse face à une offre limitée, notamment sur les biens proposés hors marché.",
    secondaryTitle: "Un écart qui se creuse.",
    secondaryLead:
      "La courbe compare l’évolution relative de la demande. Marrakech termine à +42 %, devant Agadir à +28 %.",
    graphLabel: "VARIATION RELATIVE DE LA DEMANDE",
    cities: {
      rabat: "Rabat",
      casablanca: "Casablanca",
      tanger: "Tanger",
      agadir: "Agadir",
      marrakech: "Marrakech",
    },
    metrics: [
      {
        value: "+42 %",
        label: "Marrakech",
        detail: "Plus forte progression",
      },
      {
        value: "5",
        label: "villes",
        detail: "Comparées sur la même base",
      },
      {
        value: "+14 pts",
        label: "d’écart",
        detail: "Avec Agadir, deuxième",
      },
    ],
  },
  en: {
    ariaLabel: "Real-estate market reading",
    eyebrow: "MARKET READING",
    title: "Demand concentrates where supply grows scarce.",
    lead:
      "Among five major Moroccan cities, Marrakech shows the clearest rise. Demand is climbing against limited supply — especially on properties offered off-market.",
    secondaryTitle: "A gap that keeps widening.",
    secondaryLead:
      "The curve compares relative demand growth. Marrakech ends at +42%, ahead of Agadir at +28%.",
    graphLabel: "RELATIVE DEMAND VARIATION",
    cities: {
      rabat: "Rabat",
      casablanca: "Casablanca",
      tanger: "Tangier",
      agadir: "Agadir",
      marrakech: "Marrakech",
    },
    metrics: [
      {
        value: "+42%",
        label: "Marrakech",
        detail: "Strongest progression",
      },
      {
        value: "5",
        label: "cities",
        detail: "Compared on the same basis",
      },
      {
        value: "+14 pts",
        label: "gap",
        detail: "Versus Agadir, second",
      },
    ],
  },
  it: {
    ariaLabel: "Lettura del mercato immobiliare",
    eyebrow: "LETTURA DI MERCATO",
    title: "La domanda si concentra dove l’offerta si rarefà.",
    lead:
      "Tra cinque grandi città marocchine, Marrakech mostra la progressione più netta. Una domanda in crescita di fronte a un’offerta limitata, soprattutto sui beni proposti fuori mercato.",
    secondaryTitle: "Uno scarto che si allarga.",
    secondaryLead:
      "La curva confronta l’evoluzione relativa della domanda. Marrakech chiude a +42 %, davanti ad Agadir a +28 %.",
    graphLabel: "VARIAZIONE RELATIVA DELLA DOMANDA",
    cities: {
      rabat: "Rabat",
      casablanca: "Casablanca",
      tanger: "Tangeri",
      agadir: "Agadir",
      marrakech: "Marrakech",
    },
    metrics: [
      {
        value: "+42 %",
        label: "Marrakech",
        detail: "Progressione più forte",
      },
      {
        value: "5",
        label: "città",
        detail: "Confrontate sulla stessa base",
      },
      {
        value: "+14 pts",
        label: "di scarto",
        detail: "Con Agadir, seconda",
      },
    ],
  },
  nl: {
    ariaLabel: "Vastgoedmarktlezing",
    eyebrow: "MARKTLEZING",
    title: "De vraag concentreert zich waar het aanbod schaarser wordt.",
    lead:
      "Onder vijf grote Marokkaanse steden toont Marrakech de duidelijkste stijging. Vraag die toeneemt tegenover beperkt aanbod — vooral bij off-market aanbod.",
    secondaryTitle: "Een kloof die groter wordt.",
    secondaryLead:
      "De curve vergelijkt de relatieve vraagontwikkeling. Marrakech eindigt op +42 %, vóór Agadir op +28 %.",
    graphLabel: "RELATIEVE VRAAGVARIATIE",
    cities: {
      rabat: "Rabat",
      casablanca: "Casablanca",
      tanger: "Tanger",
      agadir: "Agadir",
      marrakech: "Marrakech",
    },
    metrics: [
      {
        value: "+42 %",
        label: "Marrakech",
        detail: "Sterkste progressie",
      },
      {
        value: "5",
        label: "steden",
        detail: "Vergelijkbaar op dezelfde basis",
      },
      {
        value: "+14 pts",
        label: "verschil",
        detail: "Met Agadir, tweede",
      },
    ],
  },
};
