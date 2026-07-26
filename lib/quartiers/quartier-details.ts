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
    image: "/assets/offmarket/territories/investment/gueliz-hypercentre.webp",
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
    image: "/assets/offmarket/territories/investment/triangle-or-hivernage.webp",
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
    image: "/assets/offmarket/gallery/offmarket-collection-riads.webp",
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

export const quartierDetailsEs: QuartierDetail[] = [
  {
    ...quartierDetails[0],
    valueLabel: "CENTRALIDAD DE ALQUILER",
    title: "Hipercentro de Guéliz / Hivernage",
    description:
      "Un sector central muy buscado para apartamentos, pied-à-terre, comercios, restaurantes y una demanda de alquiler regular.",
    imageAlt: "Apartamento contemporáneo en Guéliz Marrakech",
    ctaLabel: "Ver apartamentos",
    ctaHref: "/es/proyectos/",
    points: [
      { label: "Comercios y restaurantes", icon: "restaurant" },
      { label: "Cafés y vida urbana", icon: "cup" },
      { label: "Centros comerciales", icon: "shopping" },
      { label: "Hoteles y servicios", icon: "building" },
      { label: "Fuerte demanda de alquiler", icon: "chart", accent: "green" },
      { label: "Apartamentos nuevos", icon: "building" },
    ],
  },
  {
    ...quartierDetails[1],
    valueLabel: "DIRECCIONES RESIDENCIALES",
    description:
      "Un sector residencial premium, impulsado por el espacio, la calma, las villas, los accesos principales y la escasez de suelo.",
    imageAlt: "Villa contemporánea en un sector residencial de Marrakech",
    ctaLabel: "Ver Villa Jaz",
    ctaHref: "/es/sobre-plano/villa-jaz/",
    points: [
      { label: "Villas y residencias privadas", icon: "villa" },
      { label: "Jardín y piscina", icon: "pool" },
      { label: "Acceso a vías principales", icon: "road" },
      { label: "Calma residencial", icon: "leaf" },
      { label: "Potencial patrimonial", icon: "chart" },
      { label: "Escasez de suelo", icon: "lock" },
    ],
  },
  {
    ...quartierDetails[2],
    valueLabel: "RENDIMIENTO TURÍSTICO",
    title: "Medina",
    description:
      "Un mercado patrimonial y confidencial, buscado por riads, casas de huéspedes, turismo y propiedades con carácter.",
    imageAlt: "Riad con carácter en la Medina de Marrakech",
    ctaLabel: "Acceso privado",
    ctaHref: "/es/off-market/",
    points: [
      { label: "Riads con carácter", icon: "arch" },
      { label: "Casas de huéspedes", icon: "house" },
      { label: "Patrimonio y zocos", icon: "heritage" },
      { label: "Cerca de Jemaa el-Fna", icon: "pin" },
      { label: "Turismo", icon: "suitcase" },
      { label: "Selección confidencial", icon: "lock" },
    ],
  },
];

export const quartierDetailsNo: QuartierDetail[] = [
  {
    ...quartierDetails[0],
    valueLabel: "SENTRAL UTLEIEETTERSPØRSEL",
    title: "Guéliz hyper-sentrum / Hivernage",
    description:
      "Et etterspurt sentralt område for leiligheter, pied-à-terre-boliger, butikker, restauranter og jevn utleieetterspørsel.",
    imageAlt: "Moderne leilighet i Guéliz Marrakech",
    ctaLabel: "Se leiligheter",
    ctaHref: "/no/prosjekter/",
    points: [
      { label: "Butikker og restauranter", icon: "restaurant" },
      { label: "Kafeer og byliv", icon: "cup" },
      { label: "Kjøpesentre", icon: "shopping" },
      { label: "Hoteller og tjenester", icon: "building" },
      { label: "Sterk utleieetterspørsel", icon: "chart", accent: "green" },
      { label: "Nye leiligheter", icon: "building" },
    ],
  },
  {
    ...quartierDetails[1],
    valueLabel: "BOLIGADRESSER",
    description:
      "Et premium boligområde drevet av plass, ro, villaer, hovedadkomster og knapphet på tomter.",
    imageAlt: "Moderne villa i et boligområde i Marrakech",
    ctaLabel: "Se Villa Jaz",
    ctaHref: "/no/nybygg/villa-jaz/",
    points: [
      { label: "Villaer og private residenser", icon: "villa" },
      { label: "Hage og basseng", icon: "pool" },
      { label: "Tilgang til hovedveier", icon: "road" },
      { label: "Rolig boligmiljø", icon: "leaf" },
      { label: "Langsiktig verdipotensial", icon: "chart" },
      { label: "Tomteknapphet", icon: "lock" },
    ],
  },
  {
    ...quartierDetails[2],
    valueLabel: "TURISTISK AVKASTNING",
    title: "Medina",
    description:
      "Et kulturarvspreget og konfidensielt marked, etterspurt for riader, gjestehus, turisme og eiendommer med særpreg.",
    imageAlt: "Riad med særpreg i Medina i Marrakech",
    ctaLabel: "Privat tilgang",
    ctaHref: "/no/off-market/",
    points: [
      { label: "Riader med særpreg", icon: "arch" },
      { label: "Gjestehus", icon: "house" },
      { label: "Kulturarv og souker", icon: "heritage" },
      { label: "Nær Jemaa el-Fna", icon: "pin" },
      { label: "Turisme", icon: "suitcase" },
      { label: "Konfidensielt utvalg", icon: "lock" },
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
