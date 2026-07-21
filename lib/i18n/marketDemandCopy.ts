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
    ariaLabel: "Demande du marché immobilier",
    eyebrow: "Lecture de marché",
    title: "La demande se concentre là où le marché reste rare.",
    lead:
      "Sur les grands marchés marocains, l’appétit des acheteurs privés n’est pas uniformément réparti. Marrakech concentre aujourd’hui la progression la plus nette, portée par une offre limitée et une sélection hors circuit.",
    secondaryTitle: "Une courbe qui révèle l’écart.",
    secondaryLead:
      "Cette lecture compare la variation relative de demande observée sur cinq villes. Marrakech clôture la série — au plus haut — et confirme pourquoi les dossiers privés y restent les plus disputés.",
    graphLabel: "Variation relative de la demande",
    cities: {
      rabat: "Rabat",
      casablanca: "Casablanca",
      tanger: "Tanger",
      agadir: "Agadir",
      marrakech: "Marrakech",
    },
    metrics: [
      {
        value: "+42%",
        label: "Marrakech",
        detail: "Point le plus haut de la série",
      },
      {
        value: "5",
        label: "Villes",
        detail: "Comparées sur la même base",
      },
      {
        value: "1er",
        label: "Écart",
        detail: "Marrakech tire nettement la courbe",
      },
    ],
  },
  en: {
    ariaLabel: "Real-estate market demand",
    eyebrow: "Market reading",
    title: "Demand concentrates where the market stays scarce.",
    lead:
      "Across Morocco’s major cities, private-buyer appetite is not evenly spread. Marrakech now shows the clearest upward move, driven by limited supply and addresses kept outside the open market.",
    secondaryTitle: "A curve that makes the gap visible.",
    secondaryLead:
      "This reading compares relative demand variation across five cities. Marrakech closes the series — at the highest point — and explains why private dossiers remain most contested there.",
    graphLabel: "Relative demand variation",
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
        detail: "Highest point in the series",
      },
      {
        value: "5",
        label: "Cities",
        detail: "Compared on the same basis",
      },
      {
        value: "1st",
        label: "Gap",
        detail: "Marrakech clearly leads the curve",
      },
    ],
  },
  it: {
    ariaLabel: "Domanda del mercato immobiliare",
    eyebrow: "Lettura di mercato",
    title: "La domanda si concentra dove il mercato resta raro.",
    lead:
      "Sui grandi mercati marocchini, l’appetito degli acquirenti privati non è uniforme. Marrakech mostra oggi la progressione più netta, sostenuta da un’offerta limitata e da una selezione fuori circuito.",
    secondaryTitle: "Una curva che rende visibile lo scarto.",
    secondaryLead:
      "Questa lettura confronta la variazione relativa della domanda su cinque città. Marrakech chiude la serie — al punto più alto — e conferma perché i dossier privati restano lì i più contesi.",
    graphLabel: "Variazione relativa della domanda",
    cities: {
      rabat: "Rabat",
      casablanca: "Casablanca",
      tanger: "Tangeri",
      agadir: "Agadir",
      marrakech: "Marrakech",
    },
    metrics: [
      {
        value: "+42%",
        label: "Marrakech",
        detail: "Punto più alto della serie",
      },
      {
        value: "5",
        label: "Città",
        detail: "Confrontate sulla stessa base",
      },
      {
        value: "1°",
        label: "Scarto",
        detail: "Marrakech guida chiaramente la curva",
      },
    ],
  },
  nl: {
    ariaLabel: "Vraag op de vastgoedmarkt",
    eyebrow: "Marktlezing",
    title: "De vraag concentreert zich waar de markt schaars blijft.",
    lead:
      "Op de grote Marokkaanse markten is de interesse van private kopers niet gelijk verdeeld. Marrakech toont nu de duidelijkste opwaartse beweging, gedreven door beperkt aanbod en selectie buiten het openbare circuit.",
    secondaryTitle: "Een curve die het verschil zichtbaar maakt.",
    secondaryLead:
      "Deze lezing vergelijkt de relatieve vraagvariatie over vijf steden. Marrakech sluit de reeks — op het hoogste punt — en verklaart waarom private dossiers daar het meest betwist blijven.",
    graphLabel: "Relatieve vraagvariatie",
    cities: {
      rabat: "Rabat",
      casablanca: "Casablanca",
      tanger: "Tanger",
      agadir: "Agadir",
      marrakech: "Marrakech",
    },
    metrics: [
      {
        value: "+42%",
        label: "Marrakech",
        detail: "Hoogste punt in de reeks",
      },
      {
        value: "5",
        label: "Steden",
        detail: "Vergelijkbaar op dezelfde basis",
      },
      {
        value: "1e",
        label: "Verschil",
        detail: "Marrakech trekt duidelijk de curve",
      },
    ],
  },
};
