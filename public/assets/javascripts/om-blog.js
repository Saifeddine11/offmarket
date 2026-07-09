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

  function articleUrl(slug) {
    return '/blog/' + slug + '/';
  }

  function renderCard(article, options) {
    options = options || {};
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

    card.innerHTML =
      '<a class="om-blog-card__link" href="' +
      articleUrl(article.slug) +
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
      '<span class="om-blog-card__date">' +
      article.date +
      '</span>' +
      '<h3 class="om-blog-card__title" data-text="' +
      article.title.replace(/"/g, '&quot;') +
      '">' +
      article.title +
      '</h3>' +
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
    var customTitle = section.dataset.omBlogTitle;
    var customLead = section.dataset.omBlogLead;
    var isHome = mode === 'home';
    var isQuartiers = mode === 'quartiers';

    var title =
      customTitle ||
      (isQuartiers
        ? 'Articles pour mieux lire les quartiers de Marrakech'
        : 'Regards privés');
    var lead =
      customLead ||
      (isQuartiers
        ? 'Analyses, conseils et lectures du marché pour comprendre les zones, les prix et les opportunités avant d’acheter.'
        : isHome
          ? 'Analyses et lectures sur l’immobilier de prestige à Marrakech.'
          : 'Analyses privées sur l’immobilier de prestige à Marrakech, les projets sur plan, l’investissement et les biens off-market.');

    var titleId = isHome
      ? 'om-blog-home-title'
      : isQuartiers
        ? 'om-blog-quartiers-title'
        : 'om-blog-title';

    var ctaHref = isHome || isQuartiers ? '/blog/' : '/';
    var ctaLabel =
      isHome || isQuartiers ? 'Voir le blog' : 'Retour à l’accueil';

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

    var mode = section.dataset.omBlogMode || 'home';
    var copy = getSectionCopy(section, mode);
    var isQuartiers = mode === 'quartiers';
    var categoryFilter = parseCategoryFilter(section);
    var counts;
    var categories;
    var articles;
    var activeCategory;
    var useQuartiersTabs = false;

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

    root.innerHTML =
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
      '<div class="om-blog-categories" role="tablist" aria-label="Catégories du blog"></div>' +
      '<div class="om-blog-carousel" data-om-blog-carousel tabindex="0" aria-label="Articles du blog"></div>' +
      '<div class="om-blog-controls" aria-label="Navigation articles">' +
      '<button class="om-blog-control" type="button" data-blog-prev aria-label="Articles précédents">' +
      CONTROL_PREV_SVG +
      '</button>' +
      '<button class="om-blog-control" type="button" data-blog-next aria-label="Articles suivants">' +
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

    categories.forEach(function (cat, index) {
      var count = counts[cat.slug] || 0;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'om-blog-category';
      btn.dataset.category = cat.slug;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      if (index === 0) btn.classList.add('is-active');
      btn.innerHTML =
        cat.label + ' <span>' + padCount(count) + ' articles</span>';
      categoriesEl.appendChild(btn);
    });

    articles.forEach(function (article) {
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
  }

  function boot() {
    document.querySelectorAll('[data-om-blog]').forEach(renderSection);
  }

  global.OM_BLOG_boot = boot;
})();
