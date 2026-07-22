export type QuartierDetailIcon =
  | "restaurant"
  | "cup"
  | "shopping"
  | "building"
  | "chart"
  | "road"
  | "villa"
  | "pool"
  | "pin"
  | "leaf"
  | "lock"
  | "arch"
  | "heritage"
  | "suitcase"
  | "house";

export type QuartierDetailPoint = {
  label: string;
  icon: QuartierDetailIcon;
  accent?: "green";
};

export type QuartierDetail = {
  id: string;
  number: string;
  valueLabel: string;
  title: string;
  description: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  points: QuartierDetailPoint[];
};

export const quartierDetails: QuartierDetail[] = [
  {
    id: "gueliz-hivernage",
    number: "01",
    valueLabel: "CENTRALITÉ LOCATIVE",
    title: "Guéliz Hyper-Centre / Hivernage",
    description:
      "Un secteur central recherché pour les appartements, les pied-à-terre, les commerces, les restaurants et la demande locative régulière.",
    seoDescription: "",
    image: "/assets/mavericks/territories/investment/gueliz-hypercentre.webp",
    imageAlt: "Appartement contemporain à Guéliz Marrakech",
    ctaLabel: "Voir les appartements",
    ctaHref: "/nos-projets/",
    points: [
      { label: "Commerces & restaurants", icon: "restaurant" },
      { label: "Cafés & vie urbaine", icon: "cup" },
      { label: "Centres commerciaux", icon: "shopping" },
      { label: "Hôtels & services", icon: "building" },
      { label: "Forte demande locative", icon: "chart", accent: "green" },
      { label: "Appartements neufs", icon: "building" },
    ],
  },
  {
    id: "triangle-or",
    number: "02",
    valueLabel: "ADRESSES RÉSIDENTIELLES",
    title: "Triangle d’Or",
    description:
      "Un secteur résidentiel premium, porté par l’espace, le calme, les villas, les accès principaux et la rareté foncière.",
    seoDescription: "",
    image: "/assets/mavericks/territories/investment/triangle-or-hivernage.webp",
    imageAlt: "Villa contemporaine dans un secteur résidentiel à Marrakech",
    ctaLabel: "Voir Villa Jaz",
    ctaHref: "/sur-plan/villa-jaz/",
    points: [
      { label: "Villas & résidences privées", icon: "villa" },
      { label: "Jardin & piscine", icon: "pool" },
      { label: "Accès routes principales", icon: "road" },
      { label: "Calme résidentiel", icon: "leaf" },
      { label: "Potentiel patrimonial", icon: "chart" },
      { label: "Rareté foncière", icon: "lock" },
    ],
  },
  {
    id: "medina",
    number: "03",
    valueLabel: "RENDEMENT TOURISTIQUE",
    title: "Médina",
    description:
      "Un marché patrimonial et confidentiel, recherché pour les riads, les maisons d’hôtes, le tourisme et les biens de caractère.",
    seoDescription: "",
    image: "/assets/mavericks/gallery/mavericks-collection-riads.webp",
    imageAlt: "Riad de caractère dans la Médina de Marrakech",
    ctaLabel: "Accès privé",
    ctaHref: "/off-market/",
    points: [
      { label: "Riads de caractère", icon: "arch" },
      { label: "Maisons d’hôtes", icon: "house" },
      { label: "Patrimoine & souks", icon: "heritage" },
      { label: "Proximité Jemaa el-Fna", icon: "pin" },
      { label: "Tourisme", icon: "suitcase" },
      { label: "Sélection confidentielle", icon: "lock" },
    ],
  },
];

export const quartierDetailsEn: QuartierDetail[] = [
  {
    ...quartierDetails[0],
    valueLabel: "RENTAL CENTRALITY",
    description:
      "A sought-after central sector for apartments, pied-à-terre homes, shops, restaurants and regular rental demand.",
    imageAlt: "Contemporary apartment in Guéliz Marrakech",
    ctaLabel: "View apartments",
    ctaHref: "/en/projects/",
    points: [
      { label: "Shops & restaurants", icon: "restaurant" },
      { label: "Cafes & urban life", icon: "cup" },
      { label: "Shopping centres", icon: "shopping" },
      { label: "Hotels & services", icon: "building" },
      { label: "Strong rental demand", icon: "chart", accent: "green" },
      { label: "New apartments", icon: "building" },
    ],
  },
  {
    ...quartierDetails[1],
    valueLabel: "RESIDENTIAL ADDRESSES",
    description:
      "A premium residential sector driven by space, calm, villas, main access routes and land scarcity.",
    imageAlt: "Contemporary villa in a residential area of Marrakech",
    ctaLabel: "View Villa Jaz",
    ctaHref: "/en/off-plan/villa-jaz/",
    points: [
      { label: "Villas & private residences", icon: "villa" },
      { label: "Garden & pool", icon: "pool" },
      { label: "Main road access", icon: "road" },
      { label: "Residential calm", icon: "leaf" },
      { label: "Long-term value potential", icon: "chart" },
      { label: "Land scarcity", icon: "lock" },
    ],
  },
  {
    ...quartierDetails[2],
    valueLabel: "TOURIST YIELD",
    description:
      "A heritage and confidential market, sought after for riads, guest houses, tourism and character properties.",
    imageAlt: "Character riad in the Medina of Marrakech",
    ctaLabel: "Private access",
    ctaHref: "/en/off-market/",
    points: [
      { label: "Character riads", icon: "arch" },
      { label: "Guest houses", icon: "house" },
      { label: "Heritage & souks", icon: "heritage" },
      { label: "Near Jemaa el-Fna", icon: "pin" },
      { label: "Tourism", icon: "suitcase" },
      { label: "Confidential selection", icon: "lock" },
    ],
  },
];

export const quartierDetailsNl: QuartierDetail[] = [
  {
    ...quartierDetails[0],
    valueLabel: "CENTRALE HUURVRAAG",
    description:
      "Een centrale sector die gezocht is voor appartementen, pied-à-terre woningen, winkels, restaurants en regelmatige huurvraag.",
    imageAlt: "Modern appartement in Guéliz Marrakech",
    ctaLabel: "Appartementen bekijken",
    ctaHref: "/nl/projecten/",
    points: [
      { label: "Winkels & restaurants", icon: "restaurant" },
      { label: "Cafés & stadsleven", icon: "cup" },
      { label: "Winkelcentra", icon: "shopping" },
      { label: "Hotels & diensten", icon: "building" },
      { label: "Sterke huurvraag", icon: "chart", accent: "green" },
      { label: "Nieuwe appartementen", icon: "building" },
    ],
  },
  {
    ...quartierDetails[1],
    valueLabel: "RESIDENTIËLE ADRESSEN",
    description:
      "Een premium residentiële sector, gedragen door ruimte, rust, villa's, hoofdtoegangen en schaarse grond.",
    imageAlt: "Moderne villa in een residentiële sector in Marrakech",
    ctaLabel: "Villa Jaz bekijken",
    ctaHref: "/nl/nieuwbouw/villa-jaz/",
    points: [
      { label: "Villa's & private residenties", icon: "villa" },
      { label: "Tuin & zwembad", icon: "pool" },
      { label: "Toegang tot hoofdwegen", icon: "road" },
      { label: "Residentiële rust", icon: "leaf" },
      { label: "Vermogenspotentieel", icon: "chart" },
      { label: "Schaarse grond", icon: "lock" },
    ],
  },
  {
    ...quartierDetails[2],
    valueLabel: "TOERISTISCH RENDEMENT",
    description:
      "Een patrimoniale en vertrouwelijke markt, gezocht voor riads, gastenhuizen, toerisme en karaktervolle woningen.",
    imageAlt: "Karaktervolle riad in de Medina van Marrakech",
    ctaLabel: "Private toegang",
    ctaHref: "/nl/off-market/",
    points: [
      { label: "Karaktervolle riads", icon: "arch" },
      { label: "Gastenhuizen", icon: "house" },
      { label: "Erfgoed & souks", icon: "heritage" },
      { label: "Nabij Jemaa el-Fna", icon: "pin" },
      { label: "Toerisme", icon: "suitcase" },
      { label: "Vertrouwelijke selectie", icon: "lock" },
    ],
  },
];

export const quartierDetailsIt: QuartierDetail[] = [
  {
    ...quartierDetails[0],
    valueLabel: "CENTRALITÀ LOCATIVA",
    title: "Guéliz Iper-centro / Hivernage",
    description:
      "Un settore centrale ricercato per appartamenti, pied-à-terre, negozi, ristoranti e una domanda locativa costante.",
    imageAlt: "Appartamento contemporaneo a Guéliz, Marrakech",
    ctaLabel: "Vedi gli appartamenti",
    ctaHref: "/it/progetti/",
    points: [
      { label: "Negozi e ristoranti", icon: "restaurant" },
      { label: "Caffè e vita urbana", icon: "cup" },
      { label: "Centri commerciali", icon: "shopping" },
      { label: "Hotel e servizi", icon: "building" },
      { label: "Forte domanda locativa", icon: "chart", accent: "green" },
      { label: "Appartamenti nuovi", icon: "building" },
    ],
  },
  {
    ...quartierDetails[1],
    valueLabel: "INDIRIZZI RESIDENZIALI",
    description:
      "Un settore residenziale premium, sostenuto da spazio, tranquillità, ville, assi di accesso principali e scarsità di terreni.",
    imageAlt: "Villa contemporanea in una zona residenziale di Marrakech",
    ctaLabel: "Vedi Villa Jaz",
    ctaHref: "/it/progetti-su-piano/villa-jaz/",
    points: [
      { label: "Ville e residenze private", icon: "villa" },
      { label: "Giardino e piscina", icon: "pool" },
      { label: "Accesso alle strade principali", icon: "road" },
      { label: "Tranquillità residenziale", icon: "leaf" },
      { label: "Potenziale patrimoniale", icon: "chart" },
      { label: "Scarsità di terreni", icon: "lock" },
    ],
  },
  {
    ...quartierDetails[2],
    valueLabel: "RENDIMENTO TURISTICO",
    description:
      "Un mercato patrimoniale e riservato, ricercato per riad, maison d’hôtes, turismo e immobili di carattere.",
    imageAlt: "Riad di carattere nella Medina di Marrakech",
    ctaLabel: "Accesso privato",
    ctaHref: "/it/off-market/",
    points: [
      { label: "Riad di carattere", icon: "arch" },
      { label: "Maison d’hôtes", icon: "house" },
      { label: "Patrimonio e souk", icon: "heritage" },
      { label: "Vicino a Jemaa el-Fna", icon: "pin" },
      { label: "Turismo", icon: "suitcase" },
      { label: "Selezione riservata", icon: "lock" },
    ],
  },
];
