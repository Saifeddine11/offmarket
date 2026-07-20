import type { PageContent } from "@/lib/content/types";
import type { PageId } from "@/lib/content/pages";
import type { SiteLocale } from "@/lib/i18n/types";
import { SITE_URL } from "@/lib/legacy/routes";
import { localizeHomeLegacySegments } from "@/lib/homepage/localizeHomeLegacyContent";

type LocalizedBlogMeta = {
  slug: string;
  title: string;
  description: string;
  ogTitle: string;
};

const BLOG_INDEX_META = {
  en: {
    title: "Marrakech real estate blog — OFF MARKET",
    description:
      "Private analyses on luxury real estate in Marrakech, off-plan projects, investment, Guéliz, Hivernage and off-market properties.",
    ogTitle: "Marrakech real estate blog — OFF MARKET",
    canonical: "/en/blog/",
    ogLocale: "en_US",
  },
  nl: {
    title: "Vastgoedblog Marrakech — OFF MARKET",
    description:
      "Private analyses over luxevastgoed in Marrakech, nieuwbouwprojecten, investeringen, Guéliz, Hivernage en off-market panden.",
    ogTitle: "Vastgoedblog Marrakech — OFF MARKET",
    canonical: "/nl/blog/",
    ogLocale: "nl_NL",
  },
} satisfies Record<"en" | "nl", {
  title: string;
  description: string;
  ogTitle: string;
  canonical: string;
  ogLocale: string;
}>;

const ARTICLE_META: Record<
  "en" | "nl",
  Partial<Record<PageId, LocalizedBlogMeta>>
> = {
  en: {
    "blog-acheter-villa-sur-plan-marrakech": {
      slug: "buying-off-plan-villa-marrakech",
      title: "Buying an off-plan villa in Marrakech — OFF MARKET",
      description:
        "What to check before reserving an off-plan villa in Marrakech: developer, schedule, payments and quality of outdoor spaces.",
      ogTitle: "Buying an off-plan villa in Marrakech",
    },
    "blog-investir-immobilier-luxe-marrakech": {
      slug: "luxury-real-estate-investment-marrakech",
      title: "Investing in luxury real estate in Marrakech — OFF MARKET",
      description:
        "The areas to monitor before investing in luxury real estate in Marrakech: address, rental demand, liquidity and long-term value.",
      ogTitle: "Investing in luxury real estate in Marrakech",
    },
    "blog-adresses-immobilier-marrakech": {
      slug: "best-addresses-real-estate-marrakech",
      title: "Guéliz, Hivernage, Amelkis — Understanding Marrakech addresses",
      description:
        "Understand the Marrakech addresses that gain value: Guéliz, Hivernage, Amelkis, buyer profiles, rarity and future demand.",
      ogTitle: "Understanding the Marrakech addresses that gain value",
    },
    "blog-off-market-marrakech-biens-confidentiels": {
      slug: "off-market-properties-marrakech",
      title: "Why some Marrakech properties are never published online",
      description:
        "Why many premium properties in Marrakech stay off-market: discretion, qualified access, sensitive negotiations and confidential addresses.",
      ogTitle: "Why some Marrakech properties are never published online",
    },
    "blog-appartement-hypercentre-gueliz-marrakech": {
      slug: "apartment-hypercentre-gueliz-marrakech",
      title: "Apartment in the hyper-centre — Why location remains the first filter",
      description:
        "Why immediate location remains the first filter for an apartment in Guéliz hyper-centre: access, noise, uses, liquidity and resale.",
      ogTitle: "Apartment in the hyper-centre: why location remains the first filter",
    },
  },
  nl: {
    "blog-acheter-villa-sur-plan-marrakech": {
      slug: "nieuwbouwvilla-kopen-marrakech",
      title: "Een nieuwbouwvilla kopen in Marrakech — OFF MARKET",
      description:
        "Wat u moet controleren voordat u een nieuwbouwvilla in Marrakech reserveert: ontwikkelaar, planning, betalingen en kwaliteit van buitenruimtes.",
      ogTitle: "Een nieuwbouwvilla kopen in Marrakech",
    },
    "blog-investir-immobilier-luxe-marrakech": {
      slug: "investeren-luxe-vastgoed-marrakech",
      title: "Investeren in luxevastgoed in Marrakech — OFF MARKET",
      description:
        "De zones om te volgen voordat u in luxevastgoed in Marrakech investeert: adres, huurvraag, liquiditeit en vermogenswaarde.",
      ogTitle: "Investeren in luxevastgoed in Marrakech",
    },
    "blog-adresses-immobilier-marrakech": {
      slug: "beste-adressen-vastgoed-marrakech",
      title: "Guéliz, Hivernage, Amelkis — Adressen in Marrakech begrijpen",
      description:
        "Begrijp de adressen in Marrakech die in waarde toenemen: Guéliz, Hivernage, Amelkis, kopersprofielen, schaarste en toekomstige vraag.",
      ogTitle: "Adressen in Marrakech begrijpen die in waarde toenemen",
    },
    "blog-off-market-marrakech-biens-confidentiels": {
      slug: "off-market-vastgoed-marrakech",
      title: "Waarom sommige panden in Marrakech nooit online verschijnen",
      description:
        "Waarom veel premium vastgoed in Marrakech off-market blijft: discretie, gekwalificeerde toegang, gevoelige onderhandelingen en vertrouwelijke adressen.",
      ogTitle: "Waarom sommige panden in Marrakech nooit online verschijnen",
    },
    "blog-appartement-hypercentre-gueliz-marrakech": {
      slug: "appartement-hypercentre-gueliz-marrakech",
      title: "Appartement in het hypercentrum — Waarom ligging de eerste filter blijft",
      description:
        "Waarom de onmiddellijke ligging de eerste filter blijft voor een appartement in het hypercentrum van Guéliz: toegang, geluid, gebruik, liquiditeit en herverkoop.",
      ogTitle: "Appartement in het hypercentrum: waarom ligging de eerste filter blijft",
    },
  },
};

type ArticleBodyLocale = Extract<SiteLocale, "en" | "nl">;
type BodyReplacement = readonly [from: string, to: string];

const ARTICLE_BODY_COPY: Record<
  ArticleBodyLocale,
  Partial<Record<PageId, readonly BodyReplacement[]>>
> = {
  en: {
    "blog-acheter-villa-sur-plan-marrakech": [
      [
        "Un projet sur plan à Marrakech peut offrir une excellente opportunité d’entrée sur un secteur recherché, à condition de lire le dossier avec méthode. Avant de réserver, la première lecture porte sur le promoteur, la solidité juridique du programme et la cohérence entre les visuels marketing et les plans techniques transmis.",
        "An off-plan project in Marrakech can offer a strong entry point in a sought-after area, provided the file is reviewed methodically. Before reserving, start with the developer, the programme's legal standing and the consistency between the marketing visuals and the technical plans supplied.",
      ],
      [
        "Le calendrier compte autant que le prix affiché. Dates de livraison, étapes de paiement, pénalités de retard et niveau d’avancement réel du chantier doivent être explicités. Un échéancier clair protège l’acquéreur et évite les mauvaises surprises en cours de projet.",
        "The timetable matters as much as the advertised price. Delivery dates, payment milestones, late-delivery provisions and the actual construction stage should be explicit. A clear schedule protects the buyer and reduces surprises during the project.",
      ],
      [
        "Enfin, les espaces extérieurs — jardin, piscine, stationnement, sécurité — structurent la valeur d’usage d’une villa. Sur plan, ils sont souvent sous-estimés dans la décision. Les vérifier en amont permet de comparer des programmes sur des bases comparables, pas seulement sur une surface habitable.",
        "Finally, outdoor spaces — garden, pool, parking and security — shape a villa's practical value. In an off-plan purchase they are often underestimated. Checking them early makes it possible to compare programmes on consistent criteria, rather than on floor area alone.",
      ],
    ],
    "blog-adresses-immobilier-marrakech": [
      [
        "À Marrakech, chaque secteur répond à une demande différente. Guéliz concentre une logique urbaine dense, prisée pour la proximité des usages et la liquidité. Hivernage et ses abords s’appuient sur une image patrimoniale et une clientèle internationale exigeante. Amelkis et les zones résidentielles périphériques séduisent par l’espace, le calme et une offre plus contemporaine.",
        "Each Marrakech area answers a different type of demand. Guéliz has a dense urban logic, valued for proximity to daily amenities and liquidity. Hivernage and its surroundings rely on a heritage-led image and a demanding international clientele. Amelkis and premium residential outskirts appeal through space, calm and more contemporary stock.",
      ],
      [
        "Comprendre une adresse, c’est lire sa demande réelle : profil d’acquéreurs, niveau de rareté, qualité du cadre de vie et capacité du secteur à rester désirable dans le temps. Deux biens au même prix n’ont pas la même trajectoire si leurs environnements immédiats ne répondent pas aux mêmes attentes.",
        "Understanding an address means reading its real demand: buyer profile, scarcity, quality of life and the area's ability to remain desirable over time. Two properties at the same price do not follow the same path when their immediate surroundings answer different needs.",
      ],
      [
        "Pour un acheteur ou un investisseur, la bonne question n’est donc pas seulement « où acheter », mais « quelle adresse correspond à mon usage, mon horizon et mon niveau de discrétion recherché ».",
        "For a buyer or investor, the right question is therefore not only “where should I buy?” but “which address fits my use, time horizon and desired level of discretion?”",
      ],
    ],
    "blog-appartement-hypercentre-gueliz-marrakech": [
      [
        "En hypercentre, un appartement se compare d’abord par son adresse immédiate : rue, orientation, accès, bruit, vis-à-vis et proximité réelle des usages quotidiens. Deux programmes voisins peuvent avoir des trajectoires très différentes si l’un bénéficie d’un accès plus direct aux axes, commerces ou espaces de respiration urbaine.",
        "In a city-centre location, an apartment should first be compared by its immediate address: street, orientation, access, noise, outlook and real proximity to daily amenities. Two neighbouring programmes can follow very different paths if one has more direct access to roads, shops or quieter urban spaces.",
      ],
      [
        "Pour un usage résidentiel ou locatif, cette localisation structure la demande future. L’hypercentre de Guéliz, par exemple, reste recherché pour sa centralité, mais toutes les adresses n’offrent pas le même confort de vie ni la même capacité de revente.",
        "For residential use or rental, location shapes future demand. Guéliz's city centre remains sought-after for its centrality, but not every address offers the same living comfort or resale potential.",
      ],
      [
        "Avant d’étudier la surface ou le prix, il est donc pertinent de valider la cohérence de l’emplacement avec le projet : qui va y vivre, combien de temps, et avec quelle exigence de liquidité ou de valorisation patrimoniale.",
        "Before studying floor area or price, validate whether the location fits the project: who will use it, for how long, and with what expectations for liquidity or long-term value.",
      ],
    ],
    "blog-investir-immobilier-luxe-marrakech": [
      [
        "Investir à Marrakech ne se résume pas à choisir un prix au mètre carré attractif. La performance d’un actif dépend d’abord de l’adresse, du profil d’usage visé — résidence principale, location saisonnière ou patrimoine long terme — et de la capacité du secteur à absorber une revente dans de bonnes conditions.",
        "Investing in Marrakech is not simply about finding an attractive price per square metre. An asset's performance first depends on its address, intended use — primary residence, short-term rental or long-term wealth — and the area's ability to support a resale in sound conditions.",
      ],
      [
        "Les zones centrales et les quartiers patrimoniaux offrent une visibilité locative forte, mais avec des niveaux de prix plus élevés. Les secteurs périphériques premium, quant à eux, peuvent proposer plus d’espace et une dynamique de croissance, à condition d’anticiper les infrastructures et la demande future.",
        "Central and heritage districts offer strong rental visibility, but usually at higher price levels. Premium outskirts can provide more space and growth potential, provided infrastructure and future demand are assessed carefully.",
      ],
      [
        "Une lecture investisseur sérieuse croise donc liquidité, demande locative, qualité de l’environnement et rareté de l’adresse. C’est cette combinaison qui distingue un simple achat immobilier d’un placement cohérent sur le moyen terme.",
        "A serious investor review therefore combines liquidity, rental demand, quality of the surroundings and address scarcity. That combination distinguishes a property purchase from a coherent medium-term investment.",
      ],
    ],
    "blog-off-market-marrakech-biens-confidentiels": [
      [
        "Une part significative de l’immobilier premium à Marrakech ne passe jamais par les portails publics. Les vendeurs privés, familles, investisseurs ou propriétaires occupant encore le bien recherchent souvent la discrétion avant la visibilité. La publication large peut attirer des demandes non qualifiées et compliquer une négociation sensible.",
        "A significant share of premium Marrakech property never reaches public portals. Private sellers, families, investors and owner-occupiers often value discretion before visibility. Broad publication can attract unqualified enquiries and complicate a sensitive negotiation.",
      ],
      [
        "Par ailleurs, certains dossiers ne sont pas immédiatement présentables : prix en cours de définition, travaux à finaliser, documents en cours de consolidation ou simple volonté de tester le marché sans exposer l’adresse. Dans ces cas, la diffusion se fait de manière ciblée, auprès d’acheteurs ou d’interlocuteurs déjà identifiés.",
        "Some files are also not ready for public presentation: the price is still being defined, works remain to be completed, documents are being consolidated, or the owner simply wants to test the market without exposing the address. Distribution is then targeted to identified buyers or contacts.",
      ],
      [
        "L’off-market n’est donc pas une simple absence de publicité. C’est un mode de distribution qui filtre l’accès, préserve la confidentialité et permet de traiter des opportunités avec plus de rigueur, là où la visibilité publique serait contre-productive.",
        "Off-market is therefore more than the absence of advertising. It is a distribution method that filters access, preserves confidentiality and allows opportunities to be handled with greater rigour where public visibility would be counterproductive.",
      ],
    ],
  },
  nl: {
    "blog-acheter-villa-sur-plan-marrakech": [
      [
        "Un projet sur plan à Marrakech peut offrir une excellente opportunité d’entrée sur un secteur recherché, à condition de lire le dossier avec méthode. Avant de réserver, la première lecture porte sur le promoteur, la solidité juridique du programme et la cohérence entre les visuels marketing et les plans techniques transmis.",
        "Een nieuwbouwproject in Marrakech kan een goede instapkans bieden in een gewilde omgeving, op voorwaarde dat het dossier methodisch wordt beoordeeld. Controleer vóór de reservering eerst de ontwikkelaar, de juridische basis van het programma en de samenhang tussen marketingbeelden en technische plannen.",
      ],
      [
        "Le calendrier compte autant que le prix affiché. Dates de livraison, étapes de paiement, pénalités de retard et niveau d’avancement réel du chantier doivent être explicités. Un échéancier clair protège l’acquéreur et évite les mauvaises surprises en cours de projet.",
        "De planning is net zo belangrijk als de geafficheerde prijs. Opleverdatum, betalingsmomenten, bepalingen bij vertraging en de werkelijke bouwfase moeten duidelijk zijn. Een helder schema beschermt de koper en beperkt verrassingen tijdens het project.",
      ],
      [
        "Enfin, les espaces extérieurs — jardin, piscine, stationnement, sécurité — structurent la valeur d’usage d’une villa. Sur plan, ils sont souvent sous-estimés dans la décision. Les vérifier en amont permet de comparer des programmes sur des bases comparables, pas seulement sur une surface habitable.",
        "Tot slot bepalen buitenruimtes — tuin, zwembad, parkeren en beveiliging — de praktische waarde van een villa. Bij nieuwbouw worden ze in de beslissing vaak onderschat. Controleer ze vooraf zodat projecten op dezelfde criteria kunnen worden vergeleken, niet alleen op woonoppervlakte.",
      ],
    ],
    "blog-adresses-immobilier-marrakech": [
      [
        "À Marrakech, chaque secteur répond à une demande différente. Guéliz concentre une logique urbaine dense, prisée pour la proximité des usages et la liquidité. Hivernage et ses abords s’appuient sur une image patrimoniale et une clientèle internationale exigeante. Amelkis et les zones résidentielles périphériques séduisent par l’espace, le calme et une offre plus contemporaine.",
        "Elke wijk in Marrakech beantwoordt aan een andere vraag. Guéliz heeft een dichte stedelijke logica en wordt gewaardeerd om de nabijheid van voorzieningen en de liquiditeit. Hivernage en omgeving steunen op een patrimoniaal imago en een veeleisende internationale clientèle. Amelkis en premium woongebieden buiten het centrum trekken aan door ruimte, rust en een hedendaags aanbod.",
      ],
      [
        "Comprendre une adresse, c’est lire sa demande réelle : profil d’acquéreurs, niveau de rareté, qualité du cadre de vie et capacité du secteur à rester désirable dans le temps. Deux biens au même prix n’ont pas la même trajectoire si leurs environnements immédiats ne répondent pas aux mêmes attentes.",
        "Een adres begrijpen betekent de werkelijke vraag lezen: kopersprofiel, schaarste, leefkwaliteit en het vermogen van de wijk om op lange termijn aantrekkelijk te blijven. Twee panden met dezelfde prijs hebben niet dezelfde vooruitzichten wanneer hun directe omgeving aan andere behoeften voldoet.",
      ],
      [
        "Pour un acheteur ou un investisseur, la bonne question n’est donc pas seulement « où acheter », mais « quelle adresse correspond à mon usage, mon horizon et mon niveau de discrétion recherché ».",
        "Voor een koper of investeerder is de juiste vraag daarom niet alleen ‘waar moet ik kopen?’, maar ook ‘welk adres past bij mijn gebruik, horizon en gewenste mate van discretie?’",
      ],
    ],
    "blog-appartement-hypercentre-gueliz-marrakech": [
      [
        "En hypercentre, un appartement se compare d’abord par son adresse immédiate : rue, orientation, accès, bruit, vis-à-vis et proximité réelle des usages quotidiens. Deux programmes voisins peuvent avoir des trajectoires très différentes si l’un bénéficie d’un accès plus direct aux axes, commerces ou espaces de respiration urbaine.",
        "In het hypercentrum vergelijkt u een appartement eerst op zijn directe ligging: straat, oriëntatie, toegang, geluid, inkijk en de werkelijke nabijheid van dagelijkse voorzieningen. Twee naburige projecten kunnen sterk uiteenlopen wanneer één ervan een directere toegang heeft tot wegen, winkels of rustige stedelijke ruimtes.",
      ],
      [
        "Pour un usage résidentiel ou locatif, cette localisation structure la demande future. L’hypercentre de Guéliz, par exemple, reste recherché pour sa centralité, mais toutes les adresses n’offrent pas le même confort de vie ni la même capacité de revente.",
        "Voor eigen bewoning of verhuur bepaalt deze ligging de toekomstige vraag. Het hypercentrum van Guéliz blijft bijvoorbeeld gewild door zijn centrale ligging, maar niet elk adres biedt hetzelfde wooncomfort of dezelfde kansen bij herverkoop.",
      ],
      [
        "Avant d’étudier la surface ou le prix, il est donc pertinent de valider la cohérence de l’emplacement avec le projet : qui va y vivre, combien de temps, et avec quelle exigence de liquidité ou de valorisation patrimoniale.",
        "Controleer daarom vóór u oppervlakte of prijs bestudeert of de ligging bij het project past: wie zal er wonen, hoe lang en met welke verwachtingen rond liquiditeit of vermogenswaarde?",
      ],
    ],
    "blog-investir-immobilier-luxe-marrakech": [
      [
        "Investir à Marrakech ne se résume pas à choisir un prix au mètre carré attractif. La performance d’un actif dépend d’abord de l’adresse, du profil d’usage visé — résidence principale, location saisonnière ou patrimoine long terme — et de la capacité du secteur à absorber une revente dans de bonnes conditions.",
        "Investeren in Marrakech draait niet alleen om een aantrekkelijke prijs per vierkante meter. De prestaties van een pand hangen eerst af van het adres, het beoogde gebruik — hoofdwoning, kortetermijnverhuur of langetermijnvermogen — en van het vermogen van de wijk om een goede herverkoop te dragen.",
      ],
      [
        "Les zones centrales et les quartiers patrimoniaux offrent une visibilité locative forte, mais avec des niveaux de prix plus élevés. Les secteurs périphériques premium, quant à eux, peuvent proposer plus d’espace et une dynamique de croissance, à condition d’anticiper les infrastructures et la demande future.",
        "Centrale en patrimoniale wijken bieden een sterke verhuurzichtbaarheid, maar vaak tegen hogere prijsniveaus. Premiumgebieden buiten het centrum kunnen meer ruimte en groeidynamiek bieden, op voorwaarde dat infrastructuur en toekomstige vraag zorgvuldig worden ingeschat.",
      ],
      [
        "Une lecture investisseur sérieuse croise donc liquidité, demande locative, qualité de l’environnement et rareté de l’adresse. C’est cette combinaison qui distingue un simple achat immobilier d’un placement cohérent sur le moyen terme.",
        "Een serieuze investeringsanalyse combineert daarom liquiditeit, huurvraag, kwaliteit van de omgeving en schaarste van het adres. Die combinatie onderscheidt een gewone vastgoedaankoop van een coherente investering op middellange termijn.",
      ],
    ],
    "blog-off-market-marrakech-biens-confidentiels": [
      [
        "Une part significative de l’immobilier premium à Marrakech ne passe jamais par les portails publics. Les vendeurs privés, familles, investisseurs ou propriétaires occupant encore le bien recherchent souvent la discrétion avant la visibilité. La publication large peut attirer des demandes non qualifiées et compliquer une négociation sensible.",
        "Een aanzienlijk deel van het premium vastgoed in Marrakech verschijnt nooit op openbare platforms. Private verkopers, families, investeerders en eigenaars die het pand nog bewonen, verkiezen vaak discretie boven zichtbaarheid. Een brede publicatie kan ongekwalificeerde aanvragen aantrekken en gevoelige onderhandelingen bemoeilijken.",
      ],
      [
        "Par ailleurs, certains dossiers ne sont pas immédiatement présentables : prix en cours de définition, travaux à finaliser, documents en cours de consolidation ou simple volonté de tester le marché sans exposer l’adresse. Dans ces cas, la diffusion se fait de manière ciblée, auprès d’acheteurs ou d’interlocuteurs déjà identifiés.",
        "Sommige dossiers zijn bovendien nog niet klaar voor publieke presentatie: de prijs wordt nog bepaald, werken moeten worden afgerond, documenten worden verzameld of de eigenaar wil de markt testen zonder het adres bekend te maken. In zulke gevallen wordt de informatie gericht gedeeld met geïdentificeerde kopers of contacten.",
      ],
      [
        "L’off-market n’est donc pas une simple absence de publicité. C’est un mode de distribution qui filtre l’accès, préserve la confidentialité et permet de traiter des opportunités avec plus de rigueur, là où la visibilité publique serait contre-productive.",
        "Off-market betekent daarom meer dan het ontbreken van reclame. Het is een distributiemethode die de toegang filtert, vertrouwelijkheid bewaart en kansen zorgvuldiger laat behandelen wanneer publieke zichtbaarheid contraproductief zou zijn.",
      ],
    ],
  },
};

function localizeArticleBody(
  content: PageContent,
  locale: ArticleBodyLocale,
  pageId: PageId,
): PageContent {
  const replacements = ARTICLE_BODY_COPY[locale][pageId] ?? [];
  // Apply full-paragraph article copy first. Generic home legacy replacements
  // (e.g. "à Marrakech" → "in Marrakech") must not rewrite FR source strings
  // before those exact article matches run.
  const withArticleCopy = content.bodySegments.map((segment) => {
    if (segment.kind !== "html" || !replacements.length) return segment;
    return {
      ...segment,
      html: [...replacements]
        .sort((a, b) => b[0].length - a[0].length)
        .reduce((html, [from, to]) => html.split(from).join(to), segment.html),
    };
  });
  return {
    ...content,
    bodySegments: localizeHomeLegacySegments(withArticleCopy, locale),
  };
}

function withSite(path: string): string {
  return `${SITE_URL}${path}`;
}

function replaceJsonLdUrl(json: string, from: RegExp | string, to: string): string {
  return json.replace(from, to);
}

export function localizeBlogIndexContent(
  content: PageContent,
  locale: Extract<SiteLocale, "en" | "nl">,
): PageContent {
  const meta = BLOG_INDEX_META[locale];
  return {
    ...content,
    htmlLang: locale,
    title: meta.title,
    description: meta.description,
    canonical: withSite(meta.canonical),
    ogTitle: meta.ogTitle,
    ogDescription: meta.description,
    ogLocale: meta.ogLocale,
    bodySegments: localizeHomeLegacySegments(content.bodySegments, locale),
    twitterTitle: meta.ogTitle,
    twitterDescription: meta.description,
    headJsonLdScripts: content.headJsonLdScripts.map((json) =>
      replaceJsonLdUrl(json, `${SITE_URL}/blog/`, withSite(meta.canonical)),
    ),
  };
}

export function localizeBlogArticleContent(
  content: PageContent,
  locale: Extract<SiteLocale, "en" | "nl">,
  pageId: PageId,
): PageContent {
  const meta = ARTICLE_META[locale][pageId];
  if (!meta) return content;
  const canonicalPath = `/${locale}/blog/${meta.slug}/`;
  return localizeArticleBody({
    ...content,
    htmlLang: locale,
    title: meta.title,
    description: meta.description,
    canonical: withSite(canonicalPath),
    ogTitle: meta.ogTitle,
    ogDescription: meta.description,
    ogLocale: locale === "en" ? "en_US" : "nl_NL",
    twitterTitle: meta.ogTitle,
    twitterDescription: meta.description,
    headJsonLdScripts: content.headJsonLdScripts.map((json) =>
      replaceJsonLdUrl(
        json,
        /https:\/\/offmarketofficial\.com\/blog\/[^"]+\//g,
        withSite(canonicalPath),
      ),
    ),
  }, locale, pageId);
}
