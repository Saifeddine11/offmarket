import type { SiteLocale } from "@/lib/i18n/types";

export type BlogHubCategory = {
  slug: string;
  label: string;
};

export type BlogHubArticle = {
  slug: string;
  category: string;
  title: string;
  date: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  excerpt: string;
};

const CATEGORIES_FR: BlogHubCategory[] = [
  { slug: "sur-plan", label: "Sur plan" },
  { slug: "investissement", label: "Investissement" },
  { slug: "marrakech", label: "Marrakech" },
  { slug: "off-market", label: "Off-market" },
];

const CATEGORIES_EN: BlogHubCategory[] = [
  { slug: "sur-plan", label: "Off-plan" },
  { slug: "investissement", label: "Investment" },
  { slug: "marrakech", label: "Marrakech" },
  { slug: "off-market", label: "Off-market" },
];

const CATEGORIES_NL: BlogHubCategory[] = [
  { slug: "sur-plan", label: "Nieuwbouw" },
  { slug: "investissement", label: "Investering" },
  { slug: "marrakech", label: "Marrakech" },
  { slug: "off-market", label: "Off-market" },
];

const CATEGORIES_IT: BlogHubCategory[] = [
  { slug: "sur-plan", label: "Acquisto su progetto" },
  { slug: "investissement", label: "Investimento" },
  { slug: "marrakech", label: "Marrakech" },
  { slug: "off-market", label: "Off-market" },
];

const ARTICLES_FR: BlogHubArticle[] = [
  {
    slug: "acheter-villa-sur-plan-marrakech",
    category: "sur-plan",
    title:
      "Acheter une villa sur plan à Marrakech : ce qu’il faut vérifier avant de réserver",
    date: "2026",
    image:
      "/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp",
    imageAlt: "Villa sur plan à Marrakech — extérieur",
    featured: false,
    excerpt:
      "Avant de réserver une villa sur plan à Marrakech, quels points vérifier sur le promoteur, le calendrier, les paiements et la cohérence du dossier.",
  },
  {
    slug: "investir-immobilier-luxe-marrakech",
    category: "investissement",
    title:
      "Investir dans l’immobilier de prestige à Marrakech : les zones à surveiller",
    date: "2026",
    image: "/assets/mavericks/hero/mavericks-hero-villa.webp",
    imageAlt: "Immobilier de prestige à Marrakech",
    featured: false,
    excerpt:
      "Comment lire une adresse à Marrakech avant d’investir : demande locative, liquidité à la revente, profil d’acheteurs et dynamique du quartier.",
  },
  {
    slug: "adresses-immobilier-marrakech",
    category: "marrakech",
    title:
      "Guéliz, Hivernage, Amelkis : comprendre les adresses qui prennent de la valeur",
    date: "2026",
    image: "/assets/mavericks/gallery/mavericks-the-passage.webp",
    imageAlt: "Architecture et adresses à Marrakech",
    featured: true,
    excerpt:
      "Guéliz, Hivernage, Amelkis : ce qui distingue ces secteurs de Marrakech, et comment chacun répond à un usage et un horizon différents.",
  },
  {
    slug: "off-market-marrakech-biens-confidentiels",
    category: "off-market",
    title: "Pourquoi certains biens à Marrakech ne sont jamais publiés en ligne",
    date: "2026",
    image: "/assets/mavericks/gallery/mavericks-collection-estates.jpg",
    imageAlt: "Sélection immobilière privée à Marrakech",
    featured: false,
    excerpt:
      "Pourquoi certains biens à Marrakech restent hors des annonces publiques : discrétion, dossiers sensibles et accès réservé aux acquéreurs qualifiés.",
  },
  {
    slug: "appartement-hypercentre-gueliz-marrakech",
    category: "sur-plan",
    title:
      "Appartement en hypercentre : pourquoi la localisation reste le premier filtre",
    date: "2026",
    image: "/assets/mavericks/villa/mavericks-image00006-scaled.webp",
    imageAlt: "Appartement en hypercentre à Marrakech",
    featured: false,
    excerpt:
      "En hypercentre à Marrakech, la localisation filtre le projet : usages quotidiens, rareté des adresses et lecture du potentiel résidentiel.",
  },
];

const ARTICLES_EN: BlogHubArticle[] = [
  {
    ...ARTICLES_FR[0],
    slug: "buying-off-plan-villa-marrakech",
    title: "Buying an off-plan villa in Marrakech: what to check before reserving",
    imageAlt: "Off-plan villa in Marrakech — exterior",
    excerpt:
      "Before reserving an off-plan villa in Marrakech, what to verify on the developer, schedule, payments and the consistency of the file.",
  },
  {
    ...ARTICLES_FR[1],
    slug: "luxury-real-estate-investment-marrakech",
    title: "Investing in luxury real estate in Marrakech: areas to monitor",
    imageAlt: "Luxury real estate in Marrakech",
    excerpt:
      "How to read an address in Marrakech before investing: rental demand, resale liquidity, buyer profile and neighbourhood dynamics.",
  },
  {
    ...ARTICLES_FR[2],
    slug: "best-addresses-real-estate-marrakech",
    title: "Guéliz, Hivernage, Amelkis: understanding the addresses that gain value",
    imageAlt: "Architecture and addresses in Marrakech",
    excerpt:
      "Guéliz, Hivernage, Amelkis: what sets these Marrakech areas apart, and how each fits a different use and time horizon.",
  },
  {
    ...ARTICLES_FR[3],
    slug: "off-market-properties-marrakech",
    title: "Why some Marrakech properties are never published online",
    imageAlt: "Private real estate selection in Marrakech",
    excerpt:
      "Why some Marrakech properties stay off public listings: discretion, sensitive files and access reserved for qualified buyers.",
  },
  {
    ...ARTICLES_FR[4],
    slug: "apartment-hypercentre-gueliz-marrakech",
    title: "Apartment in the hyper-centre: why location remains the first filter",
    imageAlt: "Apartment in Marrakech hyper-centre",
    excerpt:
      "In Marrakech’s hyper-centre, location filters the project: daily uses, address rarity and how to read residential potential.",
  },
];

const ARTICLES_NL: BlogHubArticle[] = [
  {
    ...ARTICLES_FR[0],
    slug: "nieuwbouwvilla-kopen-marrakech",
    title:
      "Een nieuwbouwvilla kopen in Marrakech: wat u moet controleren voordat u reserveert",
    imageAlt: "Nieuwbouwvilla in Marrakech — exterieur",
    excerpt:
      "Voor u een nieuwbouwvilla in Marrakech reserveert: wat te controleren over ontwikkelaar, planning, betalingen en de samenhang van het dossier.",
  },
  {
    ...ARTICLES_FR[1],
    slug: "investeren-luxe-vastgoed-marrakech",
    title: "Investeren in luxevastgoed in Marrakech: de zones om te volgen",
    imageAlt: "Luxevastgoed in Marrakech",
    excerpt:
      "Hoe u een adres in Marrakech leest vóór u investeert: huurvraag, liquiditeit bij doorverkoop, kopersprofiel en dynamiek van de wijk.",
  },
  {
    ...ARTICLES_FR[2],
    slug: "beste-adressen-vastgoed-marrakech",
    title: "Guéliz, Hivernage, Amelkis: adressen begrijpen die in waarde toenemen",
    imageAlt: "Architectuur en adressen in Marrakech",
    excerpt:
      "Guéliz, Hivernage, Amelkis: wat deze zones in Marrakech onderscheidt, en hoe elk past bij een ander gebruik en tijdshorizon.",
  },
  {
    ...ARTICLES_FR[3],
    slug: "off-market-vastgoed-marrakech",
    title: "Waarom sommige panden in Marrakech nooit online verschijnen",
    imageAlt: "Private vastgoedselectie in Marrakech",
    excerpt:
      "Waarom sommige panden in Marrakech buiten publieke advertenties blijven: discretie, gevoelige dossiers en toegang voor gekwalificeerde kopers.",
  },
  {
    ...ARTICLES_FR[4],
    slug: "appartement-hypercentre-gueliz-marrakech",
    title: "Appartement in het hypercentrum: waarom ligging de eerste filter blijft",
    imageAlt: "Appartement in het hypercentrum van Marrakech",
    excerpt:
      "In het hypercentrum van Marrakech filtert de ligging het project: dagelijks gebruik, schaarste van adressen en lezing van het residentieel potentieel.",
  },
];

const ARTICLES_IT: BlogHubArticle[] = [
  {
    ...ARTICLES_FR[0],
    slug: "acquistare-villa-su-progetto-marrakech",
    title: "Acquistare una villa su progetto a Marrakech: cosa verificare prima di prenotare",
    imageAlt: "Villa su progetto a Marrakech — esterno",
    excerpt:
      "Prima di prenotare una villa su progetto a Marrakech, cosa verificare sul promotore, sul calendario, sui pagamenti e sulla coerenza del dossier.",
  },
  {
    ...ARTICLES_FR[1],
    slug: "investire-immobiliare-di-lusso-marrakech",
    title: "Investire nell'immobiliare di lusso a Marrakech: le zone da seguire",
    imageAlt: "Immobiliare di lusso a Marrakech",
    excerpt:
      "Come leggere un indirizzo a Marrakech prima di investire: domanda locativa, liquidità alla rivendita, profilo degli acquirenti e dinamica del quartiere.",
  },
  {
    ...ARTICLES_FR[2],
    slug: "indirizzi-immobiliari-marrakech",
    title: "Guéliz, Hivernage, Amelkis: capire gli indirizzi di Marrakech che acquistano valore",
    imageAlt: "Architettura e indirizzi a Marrakech",
    excerpt:
      "Guéliz, Hivernage, Amelkis: cosa distingue queste zone di Marrakech e come ciascuna risponde a un uso e a un orizzonte diversi.",
  },
  {
    ...ARTICLES_FR[3],
    slug: "immobili-off-market-marrakech",
    title: "Perché alcuni immobili a Marrakech non vengono mai pubblicati online",
    imageAlt: "Selezione immobiliare privata a Marrakech",
    excerpt:
      "Perché alcuni immobili a Marrakech restano fuori dagli annunci pubblici: riservatezza, dossier sensibili e accesso riservato ad acquirenti qualificati.",
  },
  {
    ...ARTICLES_FR[4],
    slug: "appartamento-centro-gueliz-marrakech",
    title: "Appartamento nel centro di Guéliz: perché la posizione resta il primo filtro",
    imageAlt: "Appartamento nel centro di Marrakech",
    excerpt:
      "Nel centro di Marrakech, la posizione filtra il progetto: uso quotidiano, rarità degli indirizzi e lettura del potenziale residenziale.",
  },
];

export function getBlogHubLocale(htmlLang: string): SiteLocale {
  return htmlLang === "en" || htmlLang === "nl" || htmlLang === "it"
    ? htmlLang
    : "fr";
}

export function getBlogHubCategories(locale: SiteLocale): BlogHubCategory[] {
  if (locale === "en") return CATEGORIES_EN;
  if (locale === "nl") return CATEGORIES_NL;
  if (locale === "it") return CATEGORIES_IT;
  return CATEGORIES_FR;
}

export function getBlogHubArticles(locale: SiteLocale): BlogHubArticle[] {
  if (locale === "en") return ARTICLES_EN;
  if (locale === "nl") return ARTICLES_NL;
  if (locale === "it") return ARTICLES_IT;
  return ARTICLES_FR;
}

export function getBlogHubCategoryLabel(
  locale: SiteLocale,
  slug: string,
): string {
  const match = getBlogHubCategories(locale).find((category) => category.slug === slug);
  return match?.label ?? slug;
}

export function blogHubArticleHref(locale: SiteLocale, slug: string): string {
  if (locale === "en") return `/en/blog/${slug}/`;
  if (locale === "nl") return `/nl/blog/${slug}/`;
  if (locale === "it") return `/it/blog/${slug}/`;
  return `/blog/${slug}/`;
}

export function blogHubHomeHref(locale: SiteLocale): string {
  if (locale === "en") return "/en/";
  if (locale === "nl") return "/nl/";
  if (locale === "it") return "/it/";
  return "/";
}
