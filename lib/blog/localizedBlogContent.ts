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
  es: {
    title: "Blog inmobiliario Marrakech — OFF MARKET",
    description:
      "Análisis privados sobre inmobiliario de lujo en Marrakech, proyectos sobre plano, inversión, Guéliz, Hivernage y propiedades off-market.",
    ogTitle: "Blog inmobiliario Marrakech — OFF MARKET",
    canonical: "/es/blog/",
    ogLocale: "es_ES",
  },
  nl: {
    title: "Vastgoedblog Marrakech — OFF MARKET",
    description:
      "Private analyses over luxevastgoed in Marrakech, nieuwbouwprojecten, investeringen, Guéliz, Hivernage en off-market panden.",
    ogTitle: "Vastgoedblog Marrakech — OFF MARKET",
    canonical: "/nl/blog/",
    ogLocale: "nl_NL",
  },
  it: {
    title: "Blog immobiliare Marrakech — OFF MARKET",
    description:
      "Analisi riservate sul mercato immobiliare di Marrakech, acquisto su progetto, investimenti, quartieri e opportunità off-market.",
    ogTitle: "Blog immobiliare Marrakech — OFF MARKET",
    canonical: "/it/blog/",
    ogLocale: "it_IT",
  },
  no: {
    title: "Eiendomsblogg Marrakech — OFF MARKET",
    description:
      "Private analyser om luksuseiendom i Marrakech, nybyggprosjekter, investering, Guéliz, Hivernage og off-market eiendommer.",
    ogTitle: "Eiendomsblogg Marrakech — OFF MARKET",
    canonical: "/no/blogg/",
    ogLocale: "nb_NO",
  },
} satisfies Record<"en" | "es" | "nl" | "it" | "no", {
  title: string;
  description: string;
  ogTitle: string;
  canonical: string;
  ogLocale: string;
}>;

const ARTICLE_META: Record<
  "en" | "es" | "nl" | "it" | "no",
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
  es: {
    "blog-acheter-villa-sur-plan-marrakech": {
      slug: "comprar-villa-sobre-plano-marrakech",
      title: "Comprar una villa sobre plano en Marrakech — OFF MARKET",
      description:
        "Qué verificar antes de reservar una villa sobre plano en Marrakech: promotor, calendario, pagos y calidad de los espacios exteriores.",
      ogTitle: "Comprar una villa sobre plano en Marrakech",
    },
    "blog-investir-immobilier-luxe-marrakech": {
      slug: "invertir-inmobiliario-lujo-marrakech",
      title: "Invertir en inmobiliario de lujo en Marrakech — OFF MARKET",
      description:
        "Las zonas que conviene seguir antes de invertir en inmobiliario de lujo en Marrakech: dirección, demanda de alquiler, liquidez y valor patrimonial.",
      ogTitle: "Invertir en inmobiliario de lujo en Marrakech",
    },
    "blog-adresses-immobilier-marrakech": {
      slug: "mejores-zonas-inmobiliarias-marrakech",
      title: "Guéliz, Hivernage, Amelkis — Entender las direcciones de Marrakech",
      description:
        "Entender las direcciones de Marrakech que ganan valor: Guéliz, Hivernage, Amelkis, perfiles de compradores, rareza y demanda futura.",
      ogTitle: "Entender las direcciones de Marrakech que ganan valor",
    },
    "blog-off-market-marrakech-biens-confidentiels": {
      slug: "inmuebles-off-market-marrakech",
      title: "Por qué algunos inmuebles en Marrakech nunca se publican en línea",
      description:
        "Por qué muchos inmuebles premium en Marrakech permanecen off-market: discreción, acceso cualificado, negociaciones sensibles y direcciones confidenciales.",
      ogTitle: "Por qué algunos inmuebles en Marrakech nunca se publican en línea",
    },
    "blog-appartement-hypercentre-gueliz-marrakech": {
      slug: "apartamento-centro-gueliz-marrakech",
      title: "Apartamento en el centro de Guéliz — Por qué la ubicación sigue siendo el primer filtro",
      description:
        "Por qué la ubicación inmediata sigue siendo el primer filtro para un apartamento en el centro de Guéliz: acceso, ruido, usos, liquidez y reventa.",
      ogTitle: "Apartamento en el centro de Guéliz: por qué la ubicación sigue siendo el primer filtro",
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
  it: {
    "blog-acheter-villa-sur-plan-marrakech": {
      slug: "acquistare-villa-su-progetto-marrakech",
      title: "Acquistare una villa su progetto a Marrakech — OFF MARKET",
      description:
        "Cosa verificare prima di prenotare una villa su progetto a Marrakech: promotore, calendario, pagamenti e qualità degli spazi esterni.",
      ogTitle: "Acquistare una villa su progetto a Marrakech",
    },
    "blog-investir-immobilier-luxe-marrakech": {
      slug: "investire-immobiliare-di-lusso-marrakech",
      title: "Investire nell'immobiliare di lusso a Marrakech — OFF MARKET",
      description:
        "Le zone da seguire prima di investire nell'immobiliare di lusso a Marrakech: indirizzo, domanda locativa, liquidità e valore nel tempo.",
      ogTitle: "Investire nell'immobiliare di lusso a Marrakech",
    },
    "blog-adresses-immobilier-marrakech": {
      slug: "indirizzi-immobiliari-marrakech",
      title: "Guéliz, Hivernage, Amelkis — Capire gli indirizzi di Marrakech",
      description:
        "Capire gli indirizzi di Marrakech che acquistano valore: Guéliz, Hivernage, Amelkis, profili degli acquirenti, rarità e domanda futura.",
      ogTitle: "Capire gli indirizzi di Marrakech che acquistano valore",
    },
    "blog-off-market-marrakech-biens-confidentiels": {
      slug: "immobili-off-market-marrakech",
      title: "Perché alcuni immobili a Marrakech non vengono mai pubblicati online",
      description:
        "Perché molti immobili premium a Marrakech restano off-market: riservatezza, accesso qualificato, trattative sensibili e indirizzi riservati.",
      ogTitle: "Perché alcuni immobili a Marrakech non vengono mai pubblicati online",
    },
    "blog-appartement-hypercentre-gueliz-marrakech": {
      slug: "appartamento-centro-gueliz-marrakech",
      title: "Appartamento nel centro di Guéliz — Perché la posizione resta il primo filtro",
      description:
        "Perché la posizione immediata resta il primo filtro per un appartamento nel centro di Guéliz: accesso, rumore, uso, liquidità e rivendita.",
      ogTitle: "Appartamento nel centro di Guéliz: perché la posizione resta il primo filtro",
    },
  },
  no: {
    "blog-acheter-villa-sur-plan-marrakech": {
      slug: "kjope-nybyggvilla-marrakech",
      title: "Kjøpe nybyggvilla i Marrakech — OFF MARKET",
      description:
        "Hva du bør kontrollere før reservasjon av nybyggvilla i Marrakech: utvikler, fremdrift, betalinger og kvaliteten på uteområdene.",
      ogTitle: "Kjøpe nybyggvilla i Marrakech",
    },
    "blog-investir-immobilier-luxe-marrakech": {
      slug: "investere-luksus-eiendom-marrakech",
      title: "Investere i luksuseiendom i Marrakech — OFF MARKET",
      description:
        "Områdene du bør følge før investering i luksuseiendom i Marrakech: adresse, utleieetterspørsel, likviditet og langsiktig verdi.",
      ogTitle: "Investere i luksuseiendom i Marrakech",
    },
    "blog-adresses-immobilier-marrakech": {
      slug: "beste-omrader-eiendom-marrakech",
      title: "Guéliz, Hivernage, Amelkis — Forstå adressene i Marrakech",
      description:
        "Forstå adressene i Marrakech som øker i verdi: Guéliz, Hivernage, Amelkis, kjøperprofiler, sjeldenhet og fremtidig etterspørsel.",
      ogTitle: "Forstå adressene i Marrakech som øker i verdi",
    },
    "blog-off-market-marrakech-biens-confidentiels": {
      slug: "off-market-eiendom-marrakech",
      title: "Hvorfor enkelte eiendommer i Marrakech aldri publiseres på nett",
      description:
        "Hvorfor mange premiumeiendommer i Marrakech forblir off-market: diskresjon, kvalifisert tilgang, sensitive forhandlinger og konfidensielle adresser.",
      ogTitle: "Hvorfor enkelte eiendommer i Marrakech aldri publiseres på nett",
    },
    "blog-appartement-hypercentre-gueliz-marrakech": {
      slug: "leilighet-sentrum-gueliz-marrakech",
      title: "Leilighet i sentrum av Guéliz — Hvorfor beliggenhet fortsatt er første filter",
      description:
        "Hvorfor umiddelbar beliggenhet fortsatt er første filter for en leilighet i Guéliz sentrum: tilgang, støy, bruk, likviditet og videresalg.",
      ogTitle: "Leilighet i sentrum av Guéliz: hvorfor beliggenhet fortsatt er første filter",
    },
  },
};

type ArticleBodyLocale = Extract<SiteLocale, "en" | "es" | "nl" | "it" | "no">;
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
  es: {
    "blog-acheter-villa-sur-plan-marrakech": [
      [
        "Un projet sur plan à Marrakech peut offrir une excellente opportunité d’entrée sur un secteur recherché, à condition de lire le dossier avec méthode. Avant de réserver, la première lecture porte sur le promoteur, la solidité juridique du programme et la cohérence entre les visuels marketing et les plans techniques transmis.",
        "Un proyecto sobre plano en Marrakech puede ofrecer una excelente oportunidad de entrada en una zona buscada, siempre que el expediente se lea con método. Antes de reservar, la primera revisión debe centrarse en el promotor, la solidez jurídica del programa y la coherencia entre las imágenes comerciales y los planos técnicos entregados.",
      ],
      [
        "Le calendrier compte autant que le prix affiché. Dates de livraison, étapes de paiement, pénalités de retard et niveau d’avancement réel du chantier doivent être explicités. Un échéancier clair protège l’acquéreur et évite les mauvaises surprises en cours de projet.",
        "El calendario cuenta tanto como el precio anunciado. Las fechas de entrega, las etapas de pago, las penalizaciones por retraso y el avance real de la obra deben estar claramente definidos. Un calendario preciso protege al comprador y evita sorpresas durante el proyecto.",
      ],
      [
        "Enfin, les espaces extérieurs — jardin, piscine, stationnement, sécurité — structurent la valeur d’usage d’une villa. Sur plan, ils sont souvent sous-estimés dans la décision. Les vérifier en amont permet de comparer des programmes sur des bases comparables, pas seulement sur une surface habitable.",
        "Por último, los espacios exteriores — jardín, piscina, estacionamiento y seguridad — estructuran el valor de uso de una villa. En una compra sobre plano, a menudo se subestiman. Verificarlos de antemano permite comparar programas sobre bases equivalentes, no solo por superficie habitable.",
      ],
    ],
    "blog-adresses-immobilier-marrakech": [
      [
        "À Marrakech, chaque secteur répond à une demande différente. Guéliz concentre une logique urbaine dense, prisée pour la proximité des usages et la liquidité. Hivernage et ses abords s’appuient sur une image patrimoniale et une clientèle internationale exigeante. Amelkis et les zones résidentielles périphériques séduisent par l’espace, le calme et une offre plus contemporaine.",
        "En Marrakech, cada sector responde a una demanda diferente. Guéliz concentra una lógica urbana densa, apreciada por la proximidad de los usos diarios y la liquidez. Hivernage y sus alrededores se apoyan en una imagen patrimonial y una clientela internacional exigente. Amelkis y las zonas residenciales periféricas atraen por el espacio, la calma y una oferta más contemporánea.",
      ],
      [
        "Comprendre une adresse, c’est lire sa demande réelle : profil d’acquéreurs, niveau de rareté, qualité du cadre de vie et capacité du secteur à rester désirable dans le temps. Deux biens au même prix n’ont pas la même trajectoire si leurs environnements immédiats ne répondent pas aux mêmes attentes.",
        "Entender una dirección significa leer su demanda real: perfil de compradores, nivel de rareza, calidad del entorno de vida y capacidad del sector para seguir siendo deseable con el tiempo. Dos propiedades al mismo precio no tienen la misma trayectoria si sus entornos inmediatos no responden a las mismas expectativas.",
      ],
      [
        "Pour un acheteur ou un investisseur, la bonne question n’est donc pas seulement « où acheter », mais « quelle adresse correspond à mon usage, mon horizon et mon niveau de discrétion recherché ».",
        "Para un comprador o un inversor, la pregunta correcta no es solo «dónde comprar», sino «qué dirección corresponde a mi uso, mi horizonte y el nivel de discreción que busco».",
      ],
    ],
    "blog-appartement-hypercentre-gueliz-marrakech": [
      [
        "En hypercentre, un appartement se compare d’abord par son adresse immédiate : rue, orientation, accès, bruit, vis-à-vis et proximité réelle des usages quotidiens. Deux programmes voisins peuvent avoir des trajectoires très différentes si l’un bénéficie d’un accès plus direct aux axes, commerces ou espaces de respiration urbaine.",
        "En pleno centro, un apartamento se compara primero por su dirección inmediata: calle, orientación, acceso, ruido, vistas y proximidad real a los usos cotidianos. Dos programas vecinos pueden tener trayectorias muy distintas si uno ofrece un acceso más directo a los ejes, comercios o espacios urbanos de respiro.",
      ],
      [
        "Pour un usage résidentiel ou locatif, cette localisation structure la demande future. L’hypercentre de Guéliz, par exemple, reste recherché pour sa centralité, mais toutes les adresses n’offrent pas le même confort de vie ni la même capacité de revente.",
        "Para uso residencial o de alquiler, esta ubicación estructura la demanda futura. El centro de Guéliz, por ejemplo, sigue siendo buscado por su centralidad, pero no todas las direcciones ofrecen el mismo confort de vida ni la misma capacidad de reventa.",
      ],
      [
        "Avant d’étudier la surface ou le prix, il est donc pertinent de valider la cohérence de l’emplacement avec le projet : qui va y vivre, combien de temps, et avec quelle exigence de liquidité ou de valorisation patrimoniale.",
        "Antes de estudiar la superficie o el precio, conviene validar la coherencia de la ubicación con el proyecto: quién vivirá allí, durante cuánto tiempo y con qué exigencia de liquidez o valorización patrimonial.",
      ],
    ],
    "blog-investir-immobilier-luxe-marrakech": [
      [
        "Investir à Marrakech ne se résume pas à choisir un prix au mètre carré attractif. La performance d’un actif dépend d’abord de l’adresse, du profil d’usage visé — résidence principale, location saisonnière ou patrimoine long terme — et de la capacité du secteur à absorber une revente dans de bonnes conditions.",
        "Invertir en Marrakech no consiste únicamente en elegir un precio atractivo por metro cuadrado. El rendimiento de un activo depende primero de la dirección, del uso previsto — residencia principal, alquiler estacional o patrimonio a largo plazo — y de la capacidad del sector para absorber una reventa en buenas condiciones.",
      ],
      [
        "Les zones centrales et les quartiers patrimoniaux offrent une visibilité locative forte, mais avec des niveaux de prix plus élevés. Les secteurs périphériques premium, quant à eux, peuvent proposer plus d’espace et une dynamique de croissance, à condition d’anticiper les infrastructures et la demande future.",
        "Las zonas centrales y los barrios patrimoniales ofrecen una fuerte visibilidad de alquiler, pero con niveles de precio más elevados. Los sectores periféricos premium pueden ofrecer más espacio y una dinámica de crecimiento, siempre que se anticipen las infraestructuras y la demanda futura.",
      ],
      [
        "Une lecture investisseur sérieuse croise donc liquidité, demande locative, qualité de l’environnement et rareté de l’adresse. C’est cette combinaison qui distingue un simple achat immobilier d’un placement cohérent sur le moyen terme.",
        "Una lectura inversora seria cruza liquidez, demanda de alquiler, calidad del entorno y rareza de la dirección. Es esta combinación la que distingue una simple compra inmobiliaria de una inversión coherente a medio plazo.",
      ],
    ],
    "blog-off-market-marrakech-biens-confidentiels": [
      [
        "Une part significative de l’immobilier premium à Marrakech ne passe jamais par les portails publics. Les vendeurs privés, familles, investisseurs ou propriétaires occupant encore le bien recherchent souvent la discrétion avant la visibilité. La publication large peut attirer des demandes non qualifiées et compliquer une négociation sensible.",
        "Una parte significativa del inmobiliario premium en Marrakech nunca pasa por portales públicos. Vendedores privados, familias, inversores o propietarios que aún ocupan la propiedad suelen buscar discreción antes que visibilidad. Una publicación amplia puede atraer solicitudes no cualificadas y complicar una negociación sensible.",
      ],
      [
        "Par ailleurs, certains dossiers ne sont pas immédiatement présentables : prix en cours de définition, travaux à finaliser, documents en cours de consolidation ou simple volonté de tester le marché sans exposer l’adresse. Dans ces cas, la diffusion se fait de manière ciblée, auprès d’acheteurs ou d’interlocuteurs déjà identifiés.",
        "Además, algunos expedientes no están listos para presentarse: precio en definición, obras por finalizar, documentos en consolidación o simple voluntad de probar el mercado sin exponer la dirección. En esos casos, la difusión se realiza de forma dirigida, con compradores o interlocutores ya identificados.",
      ],
      [
        "L’off-market n’est donc pas une simple absence de publicité. C’est un mode de distribution qui filtre l’accès, préserve la confidentialité et permet de traiter des opportunités avec plus de rigueur, là où la visibilité publique serait contre-productive.",
        "El off-market no es una simple ausencia de publicidad. Es un modo de distribución que filtra el acceso, preserva la confidencialidad y permite tratar oportunidades con más rigor allí donde la visibilidad pública sería contraproducente.",
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
  it: {
    "blog-acheter-villa-sur-plan-marrakech": [
      [
        "Un projet sur plan à Marrakech peut offrir une excellente opportunité d’entrée sur un secteur recherché, à condition de lire le dossier avec méthode. Avant de réserver, la première lecture porte sur le promoteur, la solidité juridique du programme et la cohérence entre les visuels marketing et les plans techniques transmis.",
        "Un progetto su progetto a Marrakech può offrire una buona opportunità di ingresso in una zona ricercata, a condizione che il dossier venga letto con metodo. Prima di prenotare, occorre esaminare il promotore, la solidità giuridica del programma e la coerenza tra le immagini di marketing e i piani tecnici forniti.",
      ],
      [
        "Le calendrier compte autant que le prix affiché. Dates de livraison, étapes de paiement, pénalités de retard et niveau d’avancement réel du chantier doivent être explicités. Un échéancier clair protège l’acquéreur et évite les mauvaises surprises en cours de projet.",
        "Il calendario conta quanto il prezzo indicato. Le date di consegna, le fasi di pagamento, le clausole sui ritardi e lo stato reale dei lavori devono essere esplicitati. Un programma chiaro protegge l'acquirente e riduce le sorprese durante il progetto.",
      ],
      [
        "Enfin, les espaces extérieurs — jardin, piscine, stationnement, sécurité — structurent la valeur d’usage d’une villa. Sur plan, ils sont souvent sous-estimés dans la décision. Les vérifier en amont permet de comparer des programmes sur des bases comparables, pas seulement sur une surface habitable.",
        "Infine, gli spazi esterni — giardino, piscina, parcheggio e sicurezza — definiscono il valore d'uso di una villa. Nell'acquisto su progetto vengono spesso sottovalutati. Verificarli in anticipo permette di confrontare i programmi su basi omogenee, non solo sulla superficie abitabile.",
      ],
    ],
    "blog-adresses-immobilier-marrakech": [
      [
        "À Marrakech, chaque secteur répond à une demande différente. Guéliz concentre une logique urbaine dense, prisée pour la proximité des usages et la liquidité. Hivernage et ses abords s’appuient sur une image patrimoniale et une clientèle internationale exigeante. Amelkis et les zones résidentielles périphériques séduisent par l’espace, le calme et une offre plus contemporaine.",
        "A Marrakech, ogni zona risponde a una domanda diversa. Guéliz offre una logica urbana densa, apprezzata per la vicinanza ai servizi e la liquidità. Hivernage e i dintorni si basano su un'immagine patrimoniale e su una clientela internazionale esigente. Amelkis e le zone residenziali periferiche attirano per lo spazio, la tranquillità e un'offerta più contemporanea.",
      ],
      [
        "Comprendre une adresse, c’est lire sa demande réelle : profil d’acquéreurs, niveau de rareté, qualité du cadre de vie et capacité du secteur à rester désirable dans le temps. Deux biens au même prix n’ont pas la même trajectoire si leurs environnements immédiats ne répondent pas aux mêmes attentes.",
        "Capire un indirizzo significa leggerne la domanda reale: profilo degli acquirenti, livello di rarità, qualità dell'ambiente e capacità della zona di rimanere desiderabile nel tempo. Due immobili allo stesso prezzo non hanno la stessa traiettoria se i loro contesti immediati rispondono a esigenze diverse.",
      ],
      [
        "Pour un acheteur ou un investisseur, la bonne question n’est donc pas seulement « où acheter », mais « quelle adresse correspond à mon usage, mon horizon et mon niveau de discrétion recherché ». ",
        "Per un acquirente o un investitore, la domanda corretta non è soltanto «dove acquistare», ma «quale indirizzo corrisponde al mio uso, al mio orizzonte e al livello di riservatezza che cerco».",
      ],
    ],
    "blog-appartement-hypercentre-gueliz-marrakech": [
      [
        "En hypercentre, un appartement se compare d’abord par son adresse immédiate : rue, orientation, accès, bruit, vis-à-vis et proximité réelle des usages quotidiens. Deux programmes voisins peuvent avoir des trajectoires très différentes si l’un bénéficie d’un accès plus direct aux axes, commerces ou espaces de respiration urbaine.",
        "Nel centro di Guéliz, un appartamento si confronta innanzitutto in base al suo indirizzo immediato: strada, esposizione, accesso, rumore, affacci e vicinanza reale ai servizi quotidiani. Due programmi vicini possono avere traiettorie molto diverse se uno offre un accesso più diretto alle strade principali, ai negozi o a spazi urbani più tranquilli.",
      ],
      [
        "Pour un usage résidentiel ou locatif, cette localisation structure la demande future. L’hypercentre de Guéliz, par exemple, reste recherché pour sa centralité, mais toutes les adresses n’offrent pas le même confort de vie ni la même capacité de revente.",
        "Per un uso residenziale o locativo, questa posizione struttura la domanda futura. Il centro di Guéliz, ad esempio, resta ricercato per la sua centralità, ma non tutti gli indirizzi offrono lo stesso comfort abitativo o lo stesso potenziale di rivendita.",
      ],
      [
        "Avant d’étudier la surface ou le prix, il est donc pertinent de valider la cohérence de l’emplacement avec le projet : qui va y vivre, combien de temps, et avec quelle exigence de liquidité ou de valorisation patrimoniale.",
        "Prima di studiare superficie o prezzo, è quindi utile verificare la coerenza della posizione con il progetto: chi vi abiterà, per quanto tempo e con quali aspettative di liquidità o valorizzazione patrimoniale.",
      ],
    ],
    "blog-investir-immobilier-luxe-marrakech": [
      [
        "Investir à Marrakech ne se résume pas à choisir un prix au mètre carré attractif. La performance d’un actif dépend d’abord de l’adresse, du profil d’usage visé — résidence principale, location saisonnière ou patrimoine long terme — et de la capacité du secteur à absorber une revente dans de bonnes conditions.",
        "Investire a Marrakech non significa soltanto scegliere un prezzo al metro quadro interessante. La performance di un bene dipende innanzitutto dall'indirizzo, dal profilo d'uso previsto — residenza principale, affitto stagionale o patrimonio di lungo periodo — e dalla capacità della zona di sostenere una rivendita in buone condizioni.",
      ],
      [
        "Les zones centrales et les quartiers patrimoniaux offrent une visibilité locative forte, mais avec des niveaux de prix plus élevés. Les secteurs périphériques premium, quant à eux, peuvent proposer plus d’espace et une dynamique de croissance, à condition d’anticiper les infrastructures et la demande future.",
        "Le zone centrali e i quartieri dal valore patrimoniale offrono una forte visibilità locativa, ma con livelli di prezzo più elevati. Le aree premium periferiche possono invece offrire più spazio e una dinamica di crescita, a condizione di anticipare infrastrutture e domanda futura.",
      ],
      [
        "Une lecture investisseur sérieuse croise donc liquidité, demande locative, qualité de l’environnement et rareté de l’adresse. C’est cette combinaison qui distingue un simple achat immobilier d’un placement cohérent sur le moyen terme.",
        "Una lettura seria per l'investitore incrocia quindi liquidità, domanda locativa, qualità dell'ambiente e rarità dell'indirizzo. È questa combinazione a distinguere un semplice acquisto immobiliare da un investimento coerente nel medio periodo.",
      ],
    ],
    "blog-off-market-marrakech-biens-confidentiels": [
      [
        "Une part significative de l’immobilier premium à Marrakech ne passe jamais par les portails publics. Les vendeurs privés, familles, investisseurs ou propriétaires occupant encore le bien recherchent souvent la discrétion avant la visibilité. La publication large peut attirer des demandes non qualifiées et compliquer une négociation sensible.",
        "Una parte significativa degli immobili premium a Marrakech non passa mai dai portali pubblici. Venditori privati, famiglie, investitori e proprietari che occupano ancora l'immobile cercano spesso la riservatezza prima della visibilità. Una pubblicazione ampia può attirare richieste non qualificate e complicare una trattativa sensibile.",
      ],
      [
        "Par ailleurs, certains dossiers ne sont pas immédiatement présentables : prix en cours de définition, travaux à finaliser, documents en cours de consolidation ou simple volonté de tester le marché sans exposer l’adresse. Dans ces cas, la diffusion se fait de manière ciblée, auprès d’acheteurs ou d’interlocuteurs déjà identifiés.",
        "Alcuni dossier, inoltre, non sono ancora pronti per essere presentati: il prezzo è in definizione, i lavori devono essere ultimati, i documenti sono in fase di consolidamento oppure il proprietario vuole semplicemente testare il mercato senza esporre l'indirizzo. In questi casi, la diffusione è mirata verso acquirenti o interlocutori già identificati.",
      ],
      [
        "L’off-market n’est donc pas une simple absence de publicité. C’est un mode de distribution qui filtre l’accès, préserve la confidentialité et permet de traiter des opportunités avec plus de rigueur, là où la visibilité publique serait contre-productive.",
        "L'off-market non è quindi una semplice assenza di pubblicità. È un modo di distribuzione che filtra l'accesso, preserva la riservatezza e permette di trattare le opportunità con maggiore rigore quando la visibilità pubblica sarebbe controproducente.",
      ],
    ],
  },
  no: {
    "blog-acheter-villa-sur-plan-marrakech": [
      [
        "Un projet sur plan à Marrakech peut offrir une excellente opportunité d’entrée sur un secteur recherché, à condition de lire le dossier avec méthode. Avant de réserver, la première lecture porte sur le promoteur, la solidité juridique du programme et la cohérence entre les visuels marketing et les plans techniques transmis.",
        "Et nybyggprosjekt i Marrakech kan gi en sterk inngangsmulighet i et etterspurt område, forutsatt at dokumentasjonen leses metodisk. Før reservasjon bør den første vurderingen gjelde utvikleren, prosjektets juridiske soliditet og sammenhengen mellom markedsføringsbildene og de tekniske planene som er levert.",
      ],
      [
        "Le calendrier compte autant que le prix affiché. Dates de livraison, étapes de paiement, pénalités de retard et niveau d’avancement réel du chantier doivent être explicités. Un échéancier clair protège l’acquéreur et évite les mauvaises surprises en cours de projet.",
        "Fremdriften er like viktig som den oppgitte prisen. Leveringsdatoer, betalingsetapper, bestemmelser ved forsinkelse og reell byggefase må være tydelige. En klar betalings- og fremdriftsplan beskytter kjøperen og reduserer ubehagelige overraskelser underveis.",
      ],
      [
        "Enfin, les espaces extérieurs — jardin, piscine, stationnement, sécurité — structurent la valeur d’usage d’une villa. Sur plan, ils sont souvent sous-estimés dans la décision. Les vérifier en amont permet de comparer des programmes sur des bases comparables, pas seulement sur une surface habitable.",
        "Til slutt former uteområdene — hage, basseng, parkering og sikkerhet — den praktiske verdien av en villa. Ved kjøp av nybygg undervurderes de ofte i beslutningen. Å kontrollere dem tidlig gjør det mulig å sammenligne prosjekter på like kriterier, ikke bare på boareal.",
      ],
    ],
    "blog-adresses-immobilier-marrakech": [
      [
        "À Marrakech, chaque secteur répond à une demande différente. Guéliz concentre une logique urbaine dense, prisée pour la proximité des usages et la liquidité. Hivernage et ses abords s’appuient sur une image patrimoniale et une clientèle internationale exigeante. Amelkis et les zones résidentielles périphériques séduisent par l’espace, le calme et une offre plus contemporaine.",
        "I Marrakech svarer hvert område på en annen type etterspørsel. Guéliz har en tett urban logikk, verdsatt for nærhet til daglige funksjoner og god likviditet. Hivernage og nærområdene bygger på et patrimonielt image og en krevende internasjonal kundebase. Amelkis og de perifere boligområdene tiltrekker gjennom plass, ro og et mer moderne tilbud.",
      ],
      [
        "Comprendre une adresse, c’est lire sa demande réelle : profil d’acquéreurs, niveau de rareté, qualité du cadre de vie et capacité du secteur à rester désirable dans le temps. Deux biens au même prix n’ont pas la même trajectoire si leurs environnements immédiats ne répondent pas aux mêmes attentes.",
        "Å forstå en adresse betyr å lese den reelle etterspørselen: kjøperprofil, grad av sjeldenhet, kvaliteten på bomiljøet og områdets evne til å forbli attraktivt over tid. To eiendommer til samme pris får ikke samme utvikling dersom deres umiddelbare omgivelser svarer på ulike forventninger.",
      ],
      [
        "Pour un acheteur ou un investisseur, la bonne question n’est donc pas seulement « où acheter », mais « quelle adresse correspond à mon usage, mon horizon et mon niveau de discrétion recherché ».",
        "For en kjøper eller investor er derfor spørsmålet ikke bare «hvor bør jeg kjøpe», men «hvilken adresse passer til mitt bruk, min tidshorisont og ønsket diskresjonsnivå».",
      ],
    ],
    "blog-appartement-hypercentre-gueliz-marrakech": [
      [
        "En hypercentre, un appartement se compare d’abord par son adresse immédiate : rue, orientation, accès, bruit, vis-à-vis et proximité réelle des usages quotidiens. Deux programmes voisins peuvent avoir des trajectoires très différentes si l’un bénéficie d’un accès plus direct aux axes, commerces ou espaces de respiration urbaine.",
        "I sentrum sammenlignes en leilighet først etter den umiddelbare adressen: gate, orientering, tilgang, støy, innsyn og reell nærhet til daglige funksjoner. To naboprosjekter kan utvikle seg svært forskjellig dersom ett har mer direkte tilgang til hovedårer, butikker eller rolige urbane rom.",
      ],
      [
        "Pour un usage résidentiel ou locatif, cette localisation structure la demande future. L’hypercentre de Guéliz, par exemple, reste recherché pour sa centralité, mais toutes les adresses n’offrent pas le même confort de vie ni la même capacité de revente.",
        "For boligbruk eller utleie former beliggenheten den fremtidige etterspørselen. Sentrum av Guéliz er fortsatt etterspurt for sin sentralitet, men ikke alle adresser gir samme bokomfort eller samme videresalgspotensial.",
      ],
      [
        "Avant d’étudier la surface ou le prix, il est donc pertinent de valider la cohérence de l’emplacement avec le projet : qui va y vivre, combien de temps, et avec quelle exigence de liquidité ou de valorisation patrimoniale.",
        "Før areal eller pris vurderes, er det derfor relevant å kontrollere om beliggenheten stemmer med prosjektet: hvem skal bo der, hvor lenge, og med hvilke krav til likviditet eller langsiktig verdistigning.",
      ],
    ],
    "blog-investir-immobilier-luxe-marrakech": [
      [
        "Investir à Marrakech ne se résume pas à choisir un prix au mètre carré attractif. La performance d’un actif dépend d’abord de l’adresse, du profil d’usage visé — résidence principale, location saisonnière ou patrimoine long terme — et de la capacité du secteur à absorber une revente dans de bonnes conditions.",
        "Å investere i Marrakech handler ikke bare om å velge en attraktiv kvadratmeterpris. Avkastningen til et objekt avhenger først av adressen, tiltenkt bruk — primærbolig, sesongutleie eller langsiktig formue — og områdets evne til å tåle et videresalg under gode forhold.",
      ],
      [
        "Les zones centrales et les quartiers patrimoniaux offrent une visibilité locative forte, mais avec des niveaux de prix plus élevés. Les secteurs périphériques premium, quant à eux, peuvent proposer plus d’espace et une dynamique de croissance, à condition d’anticiper les infrastructures et la demande future.",
        "Sentrale soner og patrimonielle nabolag gir sterk utleiesynlighet, men med høyere prisnivåer. Premiumområder utenfor sentrum kan tilby mer plass og vekstdynamikk, forutsatt at infrastruktur og fremtidig etterspørsel vurderes på forhånd.",
      ],
      [
        "Une lecture investisseur sérieuse croise donc liquidité, demande locative, qualité de l’environnement et rareté de l’adresse. C’est cette combinaison qui distingue un simple achat immobilier d’un placement cohérent sur le moyen terme.",
        "En seriøs investorvurdering kombinerer derfor likviditet, utleieetterspørsel, kvaliteten på omgivelsene og adressens sjeldenhet. Det er denne kombinasjonen som skiller et vanlig eiendomskjøp fra en sammenhengende mellomlangsiktig investering.",
      ],
    ],
    "blog-off-market-marrakech-biens-confidentiels": [
      [
        "Une part significative de l’immobilier premium à Marrakech ne passe jamais par les portails publics. Les vendeurs privés, familles, investisseurs ou propriétaires occupant encore le bien recherchent souvent la discrétion avant la visibilité. La publication large peut attirer des demandes non qualifiées et compliquer une négociation sensible.",
        "En betydelig del av premiumeiendommene i Marrakech når aldri offentlige portaler. Private selgere, familier, investorer og eiere som fortsatt bor i eiendommen, søker ofte diskresjon før synlighet. Bred publisering kan tiltrekke ukvalifiserte henvendelser og komplisere sensitive forhandlinger.",
      ],
      [
        "Par ailleurs, certains dossiers ne sont pas immédiatement présentables : prix en cours de définition, travaux à finaliser, documents en cours de consolidation ou simple volonté de tester le marché sans exposer l’adresse. Dans ces cas, la diffusion se fait de manière ciblée, auprès d’acheteurs ou d’interlocuteurs déjà identifiés.",
        "Noen saker er heller ikke klare for offentlig presentasjon: pris er under avklaring, arbeider må fullføres, dokumenter samles, eller eieren ønsker ganske enkelt å teste markedet uten å eksponere adressen. Da deles informasjonen målrettet med allerede identifiserte kjøpere eller kontaktpersoner.",
      ],
      [
        "L’off-market n’est donc pas une simple absence de publicité. C’est un mode de distribution qui filtre l’accès, préserve la confidentialité et permet de traiter des opportunités avec plus de rigueur, là où la visibilité publique serait contre-productive.",
        "Off-market er derfor mer enn fravær av annonsering. Det er en distribusjonsmåte som filtrerer tilgang, bevarer konfidensialitet og gjør det mulig å behandle muligheter med større presisjon der offentlig synlighet ville vært kontraproduktiv.",
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
    const tokens = new Map<string, string>();
    let html = segment.html;

    [...replacements]
      .sort((a, b) => b[0].length - a[0].length)
      .forEach(([from, to], index) => {
        const token = `\u0000OM_BLOG_LOC_${index}\u0000`;
        html = html.split(from).join(token);
        tokens.set(token, to);
      });

    tokens.forEach((to, token) => {
      html = html.split(token).join(to);
    });

    return { ...segment, html };
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
  locale: Extract<SiteLocale, "en" | "es" | "nl" | "it" | "no">,
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
  locale: Extract<SiteLocale, "en" | "es" | "nl" | "it" | "no">,
  pageId: PageId,
): PageContent {
  const meta = ARTICLE_META[locale][pageId];
  if (!meta) return content;
  const canonicalPath =
    locale === "no"
      ? `/no/blogg/${meta.slug}/`
      : `/${locale}/blog/${meta.slug}/`;
  return localizeArticleBody({
    ...content,
    htmlLang: locale,
    title: meta.title,
    description: meta.description,
    canonical: withSite(canonicalPath),
    ogTitle: meta.ogTitle,
    ogDescription: meta.description,
    ogLocale:
      locale === "en"
        ? "en_US"
        : locale === "es"
          ? "es_ES"
          : locale === "nl"
            ? "nl_NL"
            : locale === "no"
              ? "nb_NO"
              : "it_IT",
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
