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

  var OM_BLOG_ARTICLES = [
    {
      slug: 'acheter-villa-sur-plan-marrakech',
      category: 'sur-plan',
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

  global.OM_BLOG_CATEGORIES = OM_BLOG_CATEGORIES;
  global.OM_BLOG_ARTICLES = OM_BLOG_ARTICLES;
  global.OM_BLOG_getCategoryCounts = getCategoryCounts;
})(typeof window !== 'undefined' ? window : this);
