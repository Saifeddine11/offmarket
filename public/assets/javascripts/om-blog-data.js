/**
 * OFF MARKET — Blog data
 */
(function (global) {
  'use strict';

  var OM_BLOG_CATEGORIES = [
    { slug: 'sur-plan', label: 'Sur plan' },
    { slug: 'investissement', label: 'Investissement' },
    { slug: 'marrakech', label: 'Marrakech' },
    { slug: 'off-market', label: 'Off-market' },
  ];

  /** Tabs shown on /quartiers/ — filter by article `tags`. */
  var OM_BLOG_QUARTIERS_TABS = [
    { slug: 'quartiers', label: 'Quartiers', tag: 'quartiers' },
    { slug: 'marrakech', label: 'Marrakech', tag: 'marrakech' },
    { slug: 'investissement', label: 'Investissement', tag: 'investissement' },
    { slug: 'sur-plan', label: 'Sur plan', tag: 'sur-plan' },
  ];

  var OM_BLOG_ARTICLES = [
    {
      slug: 'acheter-villa-sur-plan-marrakech',
      category: 'sur-plan',
      tags: [
        'quartiers-page',
        'marrakech',
        'sur-plan',
        'investissement',
        'ou-investir',
        'investissement-immobilier-marrakech',
      ],
      title:
        'Acheter une villa sur plan à Marrakech : ce qu’il faut vérifier avant de réserver',
      date: '2026',
      image:
        '/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp',
      imageAlt: 'Villa sur plan à Marrakech — extérieur',
      featured: false,
      excerpt:
        'Avant de réserver une villa sur plan à Marrakech, quels points vérifier sur le promoteur, le calendrier, les paiements et la cohérence du dossier.',
    },
    {
      slug: 'investir-immobilier-luxe-marrakech',
      category: 'investissement',
      tags: [
        'quartiers-page',
        'quartiers',
        'marrakech',
        'investissement',
        'ou-investir',
        'investissement-immobilier-marrakech',
        'gueliz',
        'hivernage',
        'triangle-dor',
        'medina',
      ],
      title:
        'Investir dans l’immobilier de prestige à Marrakech : les zones à surveiller',
      date: '2026',
      image: '/assets/offmarket/hero/offmarket-hero-villa.webp',
      imageAlt: 'Immobilier de prestige à Marrakech',
      featured: false,
      excerpt:
        'Comment lire une adresse à Marrakech avant d’investir : demande locative, liquidité à la revente, profil d’acheteurs et dynamique du quartier.',
    },
    {
      slug: 'adresses-immobilier-marrakech',
      category: 'marrakech',
      tags: [
        'quartiers-page',
        'quartiers',
        'marrakech',
        'investissement',
        'ou-investir',
        'investissement-immobilier-marrakech',
        'gueliz',
        'hivernage',
        'medina',
      ],
      title:
        'Guéliz, Hivernage, Amelkis : comprendre les adresses qui prennent de la valeur',
      date: '2026',
      image: '/assets/offmarket/gallery/offmarket-the-passage.webp',
      imageAlt: 'Architecture et adresses à Marrakech',
      featured: true,
      excerpt:
        'Guéliz, Hivernage, Amelkis : ce qui distingue ces secteurs de Marrakech, et comment chacun répond à un usage et un horizon différents.',
    },
    {
      slug: 'off-market-marrakech-biens-confidentiels',
      category: 'off-market',
      tags: ['marrakech', 'off-market'],
      title:
        'Pourquoi certains biens à Marrakech ne sont jamais publiés en ligne',
      date: '2026',
      image: '/assets/offmarket/gallery/offmarket-collection-estates.jpg',
      imageAlt: 'Sélection immobilière privée à Marrakech',
      featured: false,
      excerpt:
        'Pourquoi certains biens à Marrakech restent hors des annonces publiques : discrétion, dossiers sensibles et accès réservé aux acquéreurs qualifiés.',
    },
    {
      slug: 'appartement-hypercentre-gueliz-marrakech',
      category: 'sur-plan',
      tags: [
        'quartiers-page',
        'quartiers',
        'marrakech',
        'sur-plan',
        'ou-investir',
        'investissement',
        'gueliz',
        'hivernage',
      ],
      title:
        'Appartement en hypercentre : pourquoi la localisation reste le premier filtre',
      date: '2026',
      image: '/assets/offmarket/villa/offmarket-image00006-scaled.webp',
      imageAlt: 'Appartement en hypercentre à Marrakech',
      featured: false,
      excerpt:
        'En hypercentre à Marrakech, la localisation filtre le projet : usages quotidiens, rareté des adresses et lecture du potentiel résidentiel.',
    },
  ];

  function isLocalePath(path, locale) {
    return path === '/' + locale || path.indexOf('/' + locale + '/') === 0;
  }

  function detectLocale() {
    var path = (global.location && global.location.pathname) || '/';
    if (isLocalePath(path, 'en')) return 'en';
    if (isLocalePath(path, 'es')) return 'es';
    if (isLocalePath(path, 'nl')) return 'nl';
    if (isLocalePath(path, 'it')) return 'it';
    if (isLocalePath(path, 'no')) return 'no';
    return 'fr';
  }

  var LOCALIZED = {
    en: {
      categories: [
        { slug: 'sur-plan', label: 'Off-plan' },
        { slug: 'investissement', label: 'Investment' },
        { slug: 'marrakech', label: 'Marrakech' },
        { slug: 'off-market', label: 'Off-market' },
      ],
      tabs: [
        { slug: 'quartiers', label: 'Neighbourhoods', tag: 'quartiers' },
        { slug: 'marrakech', label: 'Marrakech', tag: 'marrakech' },
        { slug: 'investissement', label: 'Investment', tag: 'investissement' },
        { slug: 'sur-plan', label: 'Off-plan', tag: 'sur-plan' },
      ],
      articles: [
        {
          slug: 'buying-off-plan-villa-marrakech',
          title: 'Buying an off-plan villa in Marrakech: what to check before reserving',
          imageAlt: 'Off-plan villa in Marrakech — exterior',
          excerpt: 'Before reserving an off-plan villa in Marrakech, what to verify on the developer, schedule, payments and the consistency of the file.',
        },
        {
          slug: 'luxury-real-estate-investment-marrakech',
          title: 'Investing in luxury real estate in Marrakech: areas to monitor',
          imageAlt: 'Luxury real estate in Marrakech',
          excerpt: 'How to read an address in Marrakech before investing: rental demand, resale liquidity, buyer profile and neighbourhood dynamics.',
        },
        {
          slug: 'best-addresses-real-estate-marrakech',
          title: 'Guéliz, Hivernage, Amelkis: understanding the addresses that gain value',
          imageAlt: 'Architecture and addresses in Marrakech',
          excerpt: 'Guéliz, Hivernage, Amelkis: what sets these Marrakech areas apart, and how each fits a different use and time horizon.',
        },
        {
          slug: 'off-market-properties-marrakech',
          title: 'Why some Marrakech properties are never published online',
          imageAlt: 'Private real estate selection in Marrakech',
          excerpt: 'Why some Marrakech properties stay off public listings: discretion, sensitive files and access reserved for qualified buyers.',
        },
        {
          slug: 'apartment-hypercentre-gueliz-marrakech',
          title: 'Apartment in the hyper-centre: why location remains the first filter',
          imageAlt: 'Apartment in Marrakech hyper-centre',
          excerpt: 'In Marrakech’s hyper-centre, location filters the project: daily uses, address rarity and how to read residential potential.',
        },
      ],
    },
    es: {
      categories: [
        { slug: 'sur-plan', label: 'Sobre plano' },
        { slug: 'investissement', label: 'Inversión' },
        { slug: 'marrakech', label: 'Marrakech' },
        { slug: 'off-market', label: 'Off-market' },
      ],
      tabs: [
        { slug: 'quartiers', label: 'Barrios', tag: 'quartiers' },
        { slug: 'marrakech', label: 'Marrakech', tag: 'marrakech' },
        { slug: 'investissement', label: 'Inversión', tag: 'investissement' },
        { slug: 'sur-plan', label: 'Sobre plano', tag: 'sur-plan' },
      ],
      articles: [
        {
          slug: 'comprar-villa-sobre-plano-marrakech',
          title: 'Comprar una villa sobre plano en Marrakech: qué comprobar antes de reservar',
          imageAlt: 'Villa sobre plano en Marrakech — exterior',
          excerpt: 'Antes de reservar una villa sobre plano en Marrakech, qué verificar sobre el promotor, el calendario, los pagos y la coherencia del expediente.',
        },
        {
          slug: 'invertir-inmobiliario-lujo-marrakech',
          title: 'Invertir en inmobiliario de lujo en Marrakech: zonas que conviene seguir',
          imageAlt: 'Inmobiliario de lujo en Marrakech',
          excerpt: 'Cómo leer una dirección en Marrakech antes de invertir: demanda de alquiler, liquidez de reventa, perfil de compradores y dinámica del barrio.',
        },
        {
          slug: 'mejores-zonas-inmobiliarias-marrakech',
          title: 'Guéliz, Hivernage, Amelkis: entender las direcciones que ganan valor',
          imageAlt: 'Arquitectura y direcciones en Marrakech',
          excerpt: 'Guéliz, Hivernage, Amelkis: qué distingue estas zonas de Marrakech y cómo cada una responde a usos y horizontes distintos.',
        },
        {
          slug: 'inmuebles-off-market-marrakech',
          title: 'Por qué algunos inmuebles en Marrakech nunca se publican online',
          imageAlt: 'Selección inmobiliaria privada en Marrakech',
          excerpt: 'Por qué algunos inmuebles en Marrakech quedan fuera de los anuncios públicos: discreción, expedientes sensibles y acceso reservado a compradores cualificados.',
        },
        {
          slug: 'apartamento-centro-gueliz-marrakech',
          title: 'Apartamento en el centro de Guéliz: por qué la ubicación sigue siendo el primer filtro',
          imageAlt: 'Apartamento en el centro de Marrakech',
          excerpt: 'En el centro de Marrakech, la ubicación filtra el proyecto: usos diarios, escasez de direcciones y lectura del potencial residencial.',
        },
      ],
    },
    nl: {
      categories: [
        { slug: 'sur-plan', label: 'Nieuwbouw' },
        { slug: 'investissement', label: 'Investering' },
        { slug: 'marrakech', label: 'Marrakech' },
        { slug: 'off-market', label: 'Off-market' },
      ],
      tabs: [
        { slug: 'quartiers', label: 'Wijken', tag: 'quartiers' },
        { slug: 'marrakech', label: 'Marrakech', tag: 'marrakech' },
        { slug: 'investissement', label: 'Investering', tag: 'investissement' },
        { slug: 'sur-plan', label: 'Nieuwbouw', tag: 'sur-plan' },
      ],
      articles: [
        {
          slug: 'nieuwbouwvilla-kopen-marrakech',
          title: 'Een nieuwbouwvilla kopen in Marrakech: wat u moet controleren voordat u reserveert',
          imageAlt: 'Nieuwbouwvilla in Marrakech — exterieur',
          excerpt: 'Voor u een nieuwbouwvilla in Marrakech reserveert: wat te controleren over ontwikkelaar, planning, betalingen en de samenhang van het dossier.',
        },
        {
          slug: 'investeren-luxe-vastgoed-marrakech',
          title: 'Investeren in luxevastgoed in Marrakech: de zones om te volgen',
          imageAlt: 'Luxevastgoed in Marrakech',
          excerpt: 'Hoe u een adres in Marrakech leest vóór u investeert: huurvraag, liquiditeit bij doorverkoop, kopersprofiel en dynamiek van de wijk.',
        },
        {
          slug: 'beste-adressen-vastgoed-marrakech',
          title: 'Guéliz, Hivernage, Amelkis: adressen begrijpen die in waarde toenemen',
          imageAlt: 'Architectuur en adressen in Marrakech',
          excerpt: 'Guéliz, Hivernage, Amelkis: wat deze zones in Marrakech onderscheidt, en hoe elk past bij een ander gebruik en tijdshorizon.',
        },
        {
          slug: 'off-market-vastgoed-marrakech',
          title: 'Waarom sommige panden in Marrakech nooit online verschijnen',
          imageAlt: 'Private vastgoedselectie in Marrakech',
          excerpt: 'Waarom sommige panden in Marrakech buiten publieke advertenties blijven: discretie, gevoelige dossiers en toegang voor gekwalificeerde kopers.',
        },
        {
          slug: 'appartement-hypercentre-gueliz-marrakech',
          title: 'Appartement in het hypercentrum: waarom ligging de eerste filter blijft',
          imageAlt: 'Appartement in het hypercentrum van Marrakech',
          excerpt: 'In het hypercentrum van Marrakech filtert de ligging het project: dagelijks gebruik, schaarste van adressen en lezing van het residentieel potentieel.',
        },
      ],
    },
    it: {
      categories: [
        { slug: 'sur-plan', label: 'Acquisto su progetto' },
        { slug: 'investissement', label: 'Investimento' },
        { slug: 'marrakech', label: 'Marrakech' },
        { slug: 'off-market', label: 'Off-market' },
      ],
      tabs: [
        { slug: 'quartiers', label: 'Quartieri', tag: 'quartiers' },
        { slug: 'marrakech', label: 'Marrakech', tag: 'marrakech' },
        { slug: 'investissement', label: 'Investimento', tag: 'investissement' },
        { slug: 'sur-plan', label: 'Acquisto su progetto', tag: 'sur-plan' },
      ],
      articles: [
        {
          slug: 'acquistare-villa-su-progetto-marrakech',
          title: 'Acquistare una villa su progetto a Marrakech: cosa verificare prima di prenotare',
          imageAlt: 'Villa su progetto a Marrakech — esterno',
          excerpt: 'Prima di prenotare una villa su progetto a Marrakech, cosa verificare sul promotore, sul calendario, sui pagamenti e sulla coerenza del dossier.',
        },
        {
          slug: 'investire-immobiliare-di-lusso-marrakech',
          title: "Investire nell'immobiliare di lusso a Marrakech: le zone da seguire",
          imageAlt: 'Immobiliare di lusso a Marrakech',
          excerpt: 'Come leggere un indirizzo a Marrakech prima di investire: domanda locativa, liquidità alla rivendita, profilo degli acquirenti e dinamica del quartiere.',
        },
        {
          slug: 'indirizzi-immobiliari-marrakech',
          title: 'Guéliz, Hivernage, Amelkis: capire gli indirizzi di Marrakech che acquistano valore',
          imageAlt: 'Architettura e indirizzi a Marrakech',
          excerpt: 'Guéliz, Hivernage, Amelkis: cosa distingue queste zone di Marrakech e come ciascuna risponde a un uso e a un orizzonte diversi.',
        },
        {
          slug: 'immobili-off-market-marrakech',
          title: 'Perché alcuni immobili a Marrakech non vengono mai pubblicati online',
          imageAlt: 'Selezione immobiliare privata a Marrakech',
          excerpt: 'Perché alcuni immobili a Marrakech restano fuori dagli annunci pubblici: riservatezza, dossier sensibili e accesso riservato ad acquirenti qualificati.',
        },
        {
          slug: 'appartamento-centro-gueliz-marrakech',
          title: 'Appartamento nel centro di Guéliz: perché la posizione resta il primo filtro',
          imageAlt: 'Appartamento nel centro di Marrakech',
          excerpt: 'Nel centro di Marrakech, la posizione filtra il progetto: uso quotidiano, rarità degli indirizzi e lettura del potenziale residenziale.',
        },
      ],
    },
    no: {
      categories: [
        { slug: 'sur-plan', label: 'Nybygg' },
        { slug: 'investissement', label: 'Investering' },
        { slug: 'marrakech', label: 'Marrakech' },
        { slug: 'off-market', label: 'Off-market' },
      ],
      tabs: [
        { slug: 'quartiers', label: 'Områder', tag: 'quartiers' },
        { slug: 'marrakech', label: 'Marrakech', tag: 'marrakech' },
        { slug: 'investissement', label: 'Investering', tag: 'investissement' },
        { slug: 'sur-plan', label: 'Nybygg', tag: 'sur-plan' },
      ],
      articles: [
        {
          slug: 'kjope-nybyggvilla-marrakech',
          title: 'Kjøpe nybyggvilla i Marrakech: hva du bør sjekke før reservasjon',
          imageAlt: 'Nybyggvilla i Marrakech — eksteriør',
          excerpt: 'Før du reserverer en nybyggvilla i Marrakech: hva som bør kontrolleres om utvikler, tidsplan, betalinger og helheten i dokumentasjonen.',
        },
        {
          slug: 'investere-luksus-eiendom-marrakech',
          title: 'Investere i luksuseiendom i Marrakech: områdene du bør følge',
          imageAlt: 'Luksuseiendom i Marrakech',
          excerpt: 'Slik leser du en adresse i Marrakech før investering: utleieetterspørsel, likviditet ved videresalg, kjøperprofil og områdets dynamikk.',
        },
        {
          slug: 'beste-omrader-eiendom-marrakech',
          title: 'Guéliz, Hivernage, Amelkis: forstå adressene som øker i verdi',
          imageAlt: 'Arkitektur og adresser i Marrakech',
          excerpt: 'Guéliz, Hivernage, Amelkis: hva som skiller disse områdene i Marrakech, og hvordan hvert område svarer på ulike bruk og tidshorisonter.',
        },
        {
          slug: 'off-market-eiendom-marrakech',
          title: 'Hvorfor enkelte eiendommer i Marrakech aldri publiseres på nett',
          imageAlt: 'Privat eiendomsutvalg i Marrakech',
          excerpt: 'Hvorfor enkelte eiendommer i Marrakech holdes utenfor offentlige annonser: diskresjon, sensitive saker og tilgang for kvalifiserte kjøpere.',
        },
        {
          slug: 'leilighet-sentrum-gueliz-marrakech',
          title: 'Leilighet i sentrum av Guéliz: hvorfor beliggenhet fortsatt er første filter',
          imageAlt: 'Leilighet i sentrum av Marrakech',
          excerpt: 'I sentrum av Marrakech filtrerer beliggenheten prosjektet: daglig bruk, adresseknapphet og vurdering av boligens potensial.',
        },
      ],
    },
  };

  function applyLocalization(localeOverride) {
    var locale = localeOverride || detectLocale();
    var localized = LOCALIZED[locale];
    if (!localized) return;
    OM_BLOG_CATEGORIES = localized.categories;
    OM_BLOG_QUARTIERS_TABS = localized.tabs;
    OM_BLOG_ARTICLES = OM_BLOG_ARTICLES.map(function (article, index) {
      return Object.assign({}, article, localized.articles[index] || {});
    });
    global.OM_BLOG_CATEGORIES = OM_BLOG_CATEGORIES;
    global.OM_BLOG_QUARTIERS_TABS = OM_BLOG_QUARTIERS_TABS;
    global.OM_BLOG_ARTICLES = OM_BLOG_ARTICLES;
  }

  applyLocalization();
  global.OM_BLOG_applyLocalization = function (locale) {
    applyLocalization(locale);
  };

  function articleHasTag(article, tag) {
    return (
      Array.isArray(article.tags) && article.tags.indexOf(tag) !== -1
    );
  }

  function getCategoryCounts() {
    var counts = {};
    OM_BLOG_CATEGORIES.forEach(function (cat) {
      counts[cat.slug] = 0;
    });
    OM_BLOG_ARTICLES.forEach(function (article) {
      if (counts[article.category] !== undefined) {
        counts[article.category] += 1;
      }
    });
    return counts;
  }

  function getQuartiersArticles() {
    return OM_BLOG_ARTICLES.filter(function (article) {
      return articleHasTag(article, 'quartiers-page');
    });
  }

  function getQuartiersTabCounts(articles) {
    var counts = {};
    OM_BLOG_QUARTIERS_TABS.forEach(function (tab) {
      counts[tab.slug] = 0;
    });
    articles.forEach(function (article) {
      OM_BLOG_QUARTIERS_TABS.forEach(function (tab) {
        if (articleHasTag(article, tab.tag)) {
          counts[tab.slug] += 1;
        }
      });
    });
    return counts;
  }

  global.OM_BLOG_CATEGORIES = OM_BLOG_CATEGORIES;
  global.OM_BLOG_QUARTIERS_TABS = OM_BLOG_QUARTIERS_TABS;
  global.OM_BLOG_ARTICLES = OM_BLOG_ARTICLES;
  global.OM_BLOG_articleHasTag = articleHasTag;
  global.OM_BLOG_getCategoryCounts = getCategoryCounts;
  global.OM_BLOG_getQuartiersArticles = getQuartiersArticles;
  global.OM_BLOG_getQuartiersTabCounts = getQuartiersTabCounts;
})(typeof window !== 'undefined' ? window : this);
