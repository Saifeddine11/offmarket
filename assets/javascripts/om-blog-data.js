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
        'Promoteur, calendrier, paiements échelonnés et qualité des espaces extérieurs : les points à clarifier avant de s’engager sur un projet sur plan.',
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
        'Demande locative, liquidité, profil d’acquéreurs et dynamique urbaine : comment lire une adresse avant d’investir.',
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
        'Hyper-centre, résidentiel patrimonial ou périphérie premium : chaque secteur répond à une logique différente.',
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
        'Discrétion vendeur, dossiers incomplets et accès qualifié : les raisons structurelles de l’off-market immobilier.',
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
        'Proximité des usages, profil locatif et rareté des adresses : ce que l’hypercentre apporte à un projet résidentiel.',
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
          excerpt: 'Developer, schedule, staged payments and outdoor-space quality: the points to clarify before committing to an off-plan project.',
        },
        {
          slug: 'luxury-real-estate-investment-marrakech',
          title: 'Investing in luxury real estate in Marrakech: areas to monitor',
          imageAlt: 'Luxury real estate in Marrakech',
          excerpt: 'Rental demand, liquidity, buyer profile and urban dynamics: how to read an address before investing.',
        },
        {
          slug: 'best-addresses-real-estate-marrakech',
          title: 'Guéliz, Hivernage, Amelkis: understanding the addresses that gain value',
          imageAlt: 'Architecture and addresses in Marrakech',
          excerpt: 'Hyper-centre, heritage residential area or premium periphery: each sector follows a different logic.',
        },
        {
          slug: 'off-market-properties-marrakech',
          title: 'Why some Marrakech properties are never published online',
          imageAlt: 'Private real estate selection in Marrakech',
          excerpt: 'Seller discretion, incomplete files and qualified access: the structural reasons behind off-market real estate.',
        },
        {
          slug: 'apartment-hypercentre-gueliz-marrakech',
          title: 'Apartment in the hyper-centre: why location remains the first filter',
          imageAlt: 'Apartment in Marrakech hyper-centre',
          excerpt: 'Proximity to daily uses, rental profile and address rarity: what the hyper-centre brings to a residential project.',
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
          excerpt: 'Ontwikkelaar, planning, gefaseerde betalingen en kwaliteit van buitenruimtes: de punten om te verduidelijken voordat u zich verbindt aan een nieuwbouwproject.',
        },
        {
          slug: 'investeren-luxe-vastgoed-marrakech',
          title: 'Investeren in luxevastgoed in Marrakech: de zones om te volgen',
          imageAlt: 'Luxevastgoed in Marrakech',
          excerpt: 'Huurvraag, liquiditeit, kopersprofiel en stedelijke dynamiek: hoe u een adres leest voordat u investeert.',
        },
        {
          slug: 'beste-adressen-vastgoed-marrakech',
          title: 'Guéliz, Hivernage, Amelkis: adressen begrijpen die in waarde toenemen',
          imageAlt: 'Architectuur en adressen in Marrakech',
          excerpt: 'Hypercentrum, patrimoniale woonwijk of premium periferie: elke sector volgt een andere logica.',
        },
        {
          slug: 'off-market-vastgoed-marrakech',
          title: 'Waarom sommige panden in Marrakech nooit online verschijnen',
          imageAlt: 'Private vastgoedselectie in Marrakech',
          excerpt: 'Discretie van verkopers, onvolledige dossiers en gekwalificeerde toegang: de structurele redenen achter off-market vastgoed.',
        },
        {
          slug: 'appartement-hypercentre-gueliz-marrakech',
          title: 'Appartement in het hypercentrum: waarom ligging de eerste filter blijft',
          imageAlt: 'Appartement in het hypercentrum van Marrakech',
          excerpt: 'Nabijheid van dagelijkse functies, huurprofiel en schaarste van adressen: wat het hypercentrum toevoegt aan een residentieel project.',
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
