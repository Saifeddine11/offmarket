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
      image: '/assets/mavericks/hero/mavericks-hero-villa.webp',
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
      image: '/assets/mavericks/gallery/mavericks-the-passage.webp',
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
      image: '/assets/mavericks/gallery/mavericks-collection-estates.jpg',
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
      image: '/assets/mavericks/villa/mavericks-image00006-scaled.webp',
      imageAlt: 'Appartement en hypercentre à Marrakech',
      featured: false,
      excerpt:
        'En hypercentre à Marrakech, la localisation filtre le projet : usages quotidiens, rareté des adresses et lecture du potentiel résidentiel.',
    },
  ];

  function detectLocale() {
    var path = (global.location && global.location.pathname) || '/';
    if (path.indexOf('/en') === 0) return 'en';
    if (path.indexOf('/nl') === 0) return 'nl';
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
  };

  function applyLocalization() {
    var locale = detectLocale();
    var localized = LOCALIZED[locale];
    if (!localized) return;
    OM_BLOG_CATEGORIES = localized.categories;
    OM_BLOG_QUARTIERS_TABS = localized.tabs;
    OM_BLOG_ARTICLES = OM_BLOG_ARTICLES.map(function (article, index) {
      return Object.assign({}, article, localized.articles[index] || {});
    });
  }

  applyLocalization();

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
