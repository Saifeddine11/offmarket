/**
 * OFF MARKET — Blog hub & homepage section
 */
(function () {
  'use strict';

  var global = typeof window !== 'undefined' ? window : {};

  var ARROW_SVG =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
    '<path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var CONTROL_PREV_SVG =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
    '<path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var CONTROL_NEXT_SVG =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
    '<path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var BUTTON_ARROW_SVG =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
    '<path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  function renderHeaderButton(href, label) {
    return (
      '<a class="om-blog-section__button om-button" href="' +
      href +
      '">' +
      '<span class="om-button__icon" aria-hidden="true">' +
      BUTTON_ARROW_SVG +
      '</span>' +
      '<span>' +
      label +
      '</span>' +
      '</a>'
    );
  }

  function padCount(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function formatArticleCount(count, locale) {
    if (locale === 'no') {
      return count + ' ' + (count === 1 ? 'artikkel' : 'artikler');
    }
    if (locale === 'es') {
      return count + ' ' + (count === 1 ? 'artículo' : 'artículos');
    }
    if (locale === 'nl') {
      return count + ' ' + (count === 1 ? 'artikel' : 'artikelen');
    }
    if (locale === 'it') {
      return count + ' ' + (count === 1 ? 'articolo' : 'articoli');
    }
    if (locale === 'en') {
      return count + ' ' + (count === 1 ? 'article' : 'articles');
    }
    return padCount(count) + ' ' + (count === 1 ? 'article' : 'articles');
  }

  function isLocalePath(path, locale) {
    return path === '/' + locale || path.indexOf('/' + locale + '/') === 0;
  }

  function detectLocale() {
    var path = window.location.pathname || '/';
    if (isLocalePath(path, 'en')) return 'en';
    if (isLocalePath(path, 'es')) return 'es';
    if (isLocalePath(path, 'nl')) return 'nl';
    if (isLocalePath(path, 'it')) return 'it';
    if (isLocalePath(path, 'no')) return 'no';
    return 'fr';
  }

  function articleUrl(slug) {
    var locale = detectLocale();
    if (locale === 'en') return '/en/blog/' + slug + '/';
    if (locale === 'es') return '/es/blog/' + slug + '/';
    if (locale === 'nl') return '/nl/blog/' + slug + '/';
    if (locale === 'it') return '/it/blog/' + slug + '/';
    if (locale === 'no') return '/no/blogg/' + slug + '/';
    return '/blog/' + slug + '/';
  }

  function categoryLabel(slug, locale) {
    var categories = global.OM_BLOG_CATEGORIES || [];
    for (var i = 0; i < categories.length; i += 1) {
      if (categories[i].slug === slug) return categories[i].label;
    }
    return slug;
  }

  function getBlogUiLabels(locale) {
    var labels = {
      fr: {
        categories: 'Catégories du blog',
        articles: 'Articles du blog',
        controls: 'Navigation articles',
        prev: 'Articles précédents',
        next: 'Articles suivants',
      },
      en: {
        categories: 'Blog categories',
        articles: 'Blog articles',
        controls: 'Article navigation',
        prev: 'Previous articles',
        next: 'Next articles',
      },
      es: {
        categories: 'Categorías del blog',
        articles: 'Artículos del blog',
        controls: 'Navegación de artículos',
        prev: 'Artículos anteriores',
        next: 'Artículos siguientes',
      },
      nl: {
        categories: 'Blogcategorieën',
        articles: 'Blogartikelen',
        controls: 'Artikelnavigatie',
        prev: 'Vorige artikelen',
        next: 'Volgende artikelen',
      },
      it: {
        categories: 'Categorie del blog',
        articles: 'Articoli del blog',
        controls: 'Navigazione articoli',
        prev: 'Articoli precedenti',
        next: 'Articoli successivi',
      },
      no: {
        categories: 'Bloggkategorier',
        articles: 'Bloggartikler',
        controls: 'Artikkelnavigasjon',
        prev: 'Forrige artikler',
        next: 'Neste artikler',
      },
    };

    return labels[locale] || labels.fr;
  }

  function renderCard(article, options) {
    options = options || {};
    var locale = detectLocale();
    var card = document.createElement('article');
    card.className = 'om-blog-card';
    if (article.featured) {
      card.classList.add('om-blog-card--wide');
    }
    if (options.quartiersTabs) {
      card.dataset.quartiersTags = (article.tags || []).join(',');
    } else {
      card.dataset.category = article.category;
    }

    var titleAttr = article.title.replace(/"/g, '&quot;');
    var excerpt = article.excerpt
      ? '<p class="om-blog-card__excerpt">' + article.excerpt + '</p>'
      : '';

    card.innerHTML =
      '<a class="om-blog-card__link" href="' +
      articleUrl(article.slug) +
      '" aria-label="' +
      titleAttr +
      '">' +
      '<img src="' +
      article.image +
      '" alt="' +
      article.imageAlt +
      '" loading="lazy" decoding="async">' +
      '<span class="om-blog-card__arrow" aria-hidden="true">' +
      ARROW_SVG +
      '</span>' +
      '<div class="om-blog-card__content">' +
      '<span class="om-blog-card__meta">' +
      '<span class="om-blog-card__category">' +
      categoryLabel(article.category, locale) +
      '</span>' +
      '<span class="om-blog-card__date">' +
      article.date +
      '</span>' +
      '</span>' +
      '<h3 class="om-blog-card__title" data-text="' +
      titleAttr +
      '">' +
      article.title +
      '</h3>' +
      excerpt +
      '</div>' +
      '</a>';

    return card;
  }

  function parseCategoryFilter(section) {
    var raw = section.dataset.omBlogCategories;
    if (!raw) return null;
    return raw
      .split(',')
      .map(function (item) {
        return item.trim();
      })
      .filter(Boolean);
  }

  function getSectionCopy(section, mode) {
    var locale = detectLocale();
    var customTitle = section.dataset.omBlogTitle;
    var customLead = section.dataset.omBlogLead;
    var isHome = mode === 'home';
    var isQuartiers = mode === 'quartiers';

    var localizedCopy = {
      fr: {
        quartiersTitle: 'Articles pour mieux lire les quartiers de Marrakech',
        defaultTitle: 'Regards privés',
        quartiersLead: 'Analyses, conseils et lectures du marché pour comprendre les zones, les prix et les opportunités avant d’acheter.',
        homeLead: 'Analyses et lectures sur l’immobilier de prestige à Marrakech.',
        hubLead: 'Lectures privées sur l’immobilier à Marrakech : sur plan, investissement, quartiers, biens off-market, et la sécurisation des projets.',
        blogCta: 'Voir le blog',
        homeCta: 'Retour à l’accueil',
      },
      en: {
        quartiersTitle: 'Articles for reading Marrakech neighbourhoods more clearly',
        defaultTitle: 'Private readings',
        quartiersLead: 'Analyses, advice and market readings to understand areas, prices and opportunities before buying.',
        homeLead: 'Analyses and readings on luxury real estate in Marrakech.',
        hubLead: 'Private notes on Marrakech real estate: off-plan, investment, neighbourhoods, off-market properties, and how to secure a project reading.',
        blogCta: 'View the blog',
        homeCta: 'Back to home',
      },
      es: {
        quartiersTitle: 'Artículos para leer mejor los barrios de Marrakech',
        defaultTitle: 'Lecturas privadas',
        quartiersLead: 'Análisis, consejos y lecturas del mercado para entender zonas, precios y oportunidades antes de comprar.',
        homeLead: 'Análisis y lecturas sobre el inmobiliario de prestigio en Marrakech.',
        hubLead: 'Lecturas privadas sobre el inmobiliario en Marrakech: sobre plano, inversión, barrios, inmuebles off-market y la seguridad de los proyectos.',
        blogCta: 'Ver el blog',
        homeCta: 'Volver al inicio',
      },
      nl: {
        quartiersTitle: 'Artikelen om de wijken van Marrakech beter te lezen',
        defaultTitle: 'Private analyses',
        quartiersLead: 'Analyses, advies en marktinzichten om zones, prijzen en kansen te begrijpen voordat u koopt.',
        homeLead: 'Analyses en inzichten over luxevastgoed in Marrakech.',
        hubLead: 'Private lectuur over vastgoed in Marrakech: nieuwbouw, investeren, wijken, off-market panden, en hoe u een projectanalyse beveiligt.',
        blogCta: 'De blog bekijken',
        homeCta: 'Terug naar home',
      },
      it: {
        quartiersTitle: 'Articoli per leggere meglio i quartieri di Marrakech',
        defaultTitle: 'Letture private',
        quartiersLead: 'Analisi, consigli e letture del mercato per capire zone, prezzi e opportunità prima di acquistare.',
        homeLead: 'Analisi e letture sull’immobiliare di pregio a Marrakech.',
        hubLead: 'Analisi riservate sul mercato immobiliare di Marrakech: acquisto su progetto, investimenti, quartieri e opportunità off-market.',
        blogCta: 'Vedi il blog',
        homeCta: 'Tornare alla home',
      },
      no: {
        quartiersTitle: 'Artikler som gjør Marrakechs områder lettere å lese',
        defaultTitle: 'Private markedsblikk',
        quartiersLead: 'Analyser, råd og markedslesning for å forstå områder, priser og muligheter før kjøp.',
        homeLead: 'Analyser og markedsblikk på luksuseiendom i Marrakech.',
        hubLead: 'Private notater om eiendom i Marrakech: nybygg, investering, områder, off-market eiendommer og sikring av prosjekter.',
        blogCta: 'Se bloggen',
        homeCta: 'Tilbake til hjem',
      },
    }[locale] || {};

    var title =
      customTitle ||
      (isQuartiers
        ? localizedCopy.quartiersTitle
        : localizedCopy.defaultTitle);
    var lead =
      customLead ||
      (isQuartiers
        ? localizedCopy.quartiersLead
        : isHome
          ? localizedCopy.homeLead
          : localizedCopy.hubLead);

    var titleId = isHome
      ? 'om-blog-home-title'
      : isQuartiers
        ? 'om-blog-quartiers-title'
        : 'om-blog-title';

    var ctaHref =
      isHome || isQuartiers
          ? locale === 'en'
          ? '/en/blog/'
          : locale === 'es'
            ? '/es/blog/'
          : locale === 'nl'
            ? '/nl/blog/'
            : locale === 'it'
              ? '/it/blog/'
              : locale === 'no'
                ? '/no/blogg/'
            : '/blog/'
        : locale === 'en'
          ? '/en/'
          : locale === 'es'
            ? '/es/'
          : locale === 'nl'
            ? '/nl/'
            : locale === 'it'
              ? '/it/'
              : locale === 'no'
                ? '/no/'
            : '/';
    var ctaLabel =
      isHome || isQuartiers ? localizedCopy.blogCta : localizedCopy.homeCta;

    return {
      title: title,
      lead: lead,
      titleId: titleId,
      ctaHref: ctaHref,
      ctaLabel: ctaLabel,
    };
  }

  function renderSection(section) {
    var root = section.querySelector('[data-om-blog-root]');
    if (!root || !global.OM_BLOG_ARTICLES) return;
    if (section.dataset.omBlogBooted === 'true') return;

    var locale = detectLocale();
    var mode = section.dataset.omBlogMode || 'home';
    var copy = getSectionCopy(section, mode);
    var isQuartiers = mode === 'quartiers';
    var categoryFilter = parseCategoryFilter(section);
    var counts;
    var categories;
    var articles;
    var activeCategory;
    var useQuartiersTabs = false;
    var uiLabels = getBlogUiLabels(locale);

    if (isQuartiers && typeof global.OM_BLOG_getQuartiersArticles === 'function') {
      useQuartiersTabs = true;
      articles = global.OM_BLOG_getQuartiersArticles();
      counts = global.OM_BLOG_getQuartiersTabCounts(articles);
      categories = (global.OM_BLOG_QUARTIERS_TABS || []).filter(function (tab) {
        return (counts[tab.slug] || 0) > 0;
      });
      activeCategory =
        categories.length > 0 ? categories[0].slug : 'quartiers';
    } else {
      counts = global.OM_BLOG_getCategoryCounts();
      categories = global.OM_BLOG_CATEGORIES.filter(function (cat) {
        if (!categoryFilter || !categoryFilter.length) return true;
        return categoryFilter.indexOf(cat.slug) !== -1;
      });
      articles = global.OM_BLOG_ARTICLES.filter(function (article) {
        if (!categoryFilter || !categoryFilter.length) return true;
        return categoryFilter.indexOf(article.category) !== -1;
      });
      activeCategory =
        categories.length > 0 ? categories[0].slug : 'sur-plan';
    }

    var hasServerRenderedCards = Boolean(root.querySelector('.om-blog-card'));
    if (!hasServerRenderedCards) root.innerHTML =
      '<div class="om-blog-section__header">' +
      '<div>' +
      '<span class="om-blog-section__eyebrow">Blog</span>' +
      '<h2 class="om-blog-section__title" id="' +
      copy.titleId +
      '">' +
      copy.title +
      '</h2>' +
      '<p class="om-blog-section__lead">' +
      copy.lead +
      '</p>' +
      '</div>' +
      renderHeaderButton(copy.ctaHref, copy.ctaLabel) +
      '</div>' +
      '<div class="om-blog-categories" role="tablist" aria-label="' + uiLabels.categories + '"></div>' +
      '<div class="om-blog-carousel" data-om-blog-carousel tabindex="0" aria-label="' + uiLabels.articles + '"></div>' +
      '<div class="om-blog-controls" aria-label="' + uiLabels.controls + '">' +
      '<button class="om-blog-control" type="button" data-blog-prev aria-label="' + uiLabels.prev + '">' +
      CONTROL_PREV_SVG +
      '</button>' +
      '<button class="om-blog-control" type="button" data-blog-next aria-label="' + uiLabels.next + '">' +
      CONTROL_NEXT_SVG +
      '</button>' +
      '</div>';

    var categoriesEl = root.querySelector('.om-blog-categories');
    var carousel = root.querySelector('[data-om-blog-carousel]');

    if (categories.length > 0 && categories.length !== 4) {
      categoriesEl.dataset.cols = String(categories.length);
      categoriesEl.style.gridTemplateColumns =
        'repeat(' + categories.length + ', minmax(180px, 1fr))';
    }

    if (!hasServerRenderedCards) categories.forEach(function (cat, index) {
      var count = counts[cat.slug] || 0;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'om-blog-category';
      btn.dataset.category = cat.slug;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      if (index === 0) btn.classList.add('is-active');
      btn.innerHTML =
        cat.label + ' <span>' + formatArticleCount(count, locale) + '</span>';
      categoriesEl.appendChild(btn);
    });

    if (!hasServerRenderedCards) articles.forEach(function (article) {
      carousel.appendChild(
        renderCard(article, { quartiersTabs: useQuartiersTabs }),
      );
    });

    function cardMatchesFilter(card, category) {
      if (useQuartiersTabs) {
        var tags = (card.dataset.quartiersTags || '')
          .split(',')
          .filter(Boolean);
        return tags.indexOf(category) !== -1;
      }
      return card.dataset.category === category;
    }

    function filterCards(category) {
      activeCategory = category;
      var cards = carousel.querySelectorAll('.om-blog-card');
      var visible = 0;
      cards.forEach(function (card) {
        var show = category === 'all' || cardMatchesFilter(card, category);
        card.hidden = !show;
        if (show) visible += 1;
      });
      carousel.dataset.empty = visible === 0 ? 'true' : 'false';
      if (visible > 0) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }

    function scrollAmount() {
      var card = carousel.querySelector('.om-blog-card:not([hidden])');
      if (!card) return 420;
      var gap = parseFloat(getComputedStyle(carousel).gap) || 18;
      return card.offsetWidth + gap;
    }

    var prev = root.querySelector('[data-blog-prev]');
    var next = root.querySelector('[data-blog-next]');

    if (prev) {
      prev.addEventListener('click', function () {
        carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });
    }

    if (next) {
      next.addEventListener('click', function () {
        carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });
    }

    categoriesEl.querySelectorAll('.om-blog-category').forEach(function (btn) {
      btn.addEventListener('click', function () {
        categoriesEl.querySelectorAll('.om-blog-category').forEach(function (item) {
          item.classList.remove('is-active');
          item.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        filterCards(btn.dataset.category);
      });
    });

    filterCards(activeCategory);
    section.dataset.omBlogBooted = 'true';
  }

  function boot() {
    if (typeof global.OM_BLOG_applyLocalization === 'function') {
      global.OM_BLOG_applyLocalization(detectLocale());
    }
    document.querySelectorAll('[data-om-blog]').forEach(renderSection);
  }

  global.OM_BLOG_boot = boot;
})();
