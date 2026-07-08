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
