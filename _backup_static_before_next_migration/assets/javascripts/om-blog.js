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

  function padCount(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function articleUrl(slug) {
    return '/blog/' + slug + '/';
  }

  function renderCard(article) {
    var card = document.createElement('article');
    card.className = 'om-blog-card';
    if (article.featured) {
      card.classList.add('om-blog-card--wide');
    }
    card.dataset.category = article.category;

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

  function renderSection(section) {
    var root = section.querySelector('[data-om-blog-root]');
    if (!root || !global.OM_BLOG_ARTICLES) return;

    var mode = section.dataset.omBlogMode || 'home';
    var isHome = mode === 'home';
    var counts = global.OM_BLOG_getCategoryCounts();
    var activeCategory = 'sur-plan';

    root.innerHTML =
      '<div class="om-blog-section__header">' +
      '<div>' +
      '<span class="om-blog-section__eyebrow">Blog</span>' +
      '<h2 class="om-blog-section__title"' +
      (isHome ? ' id="om-blog-home-title"' : ' id="om-blog-title"') +
      '>Regards privés</h2>' +
      (isHome
        ? '<p class="om-blog-section__lead">Analyses et lectures sur l’immobilier de prestige à Marrakech.</p>'
        : '<p class="om-blog-section__lead">Analyses privées sur l’immobilier de prestige à Marrakech, les projets sur plan, l’investissement et les biens off-market.</p>') +
      '</div>' +
      (isHome
        ? '<a class="om-blog-section__button om-button om-button--secondary" href="/blog/">Voir le blog</a>'
        : '<a class="om-blog-section__button om-button om-button--secondary" href="/">Retour à l’accueil</a>') +
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

    global.OM_BLOG_CATEGORIES.forEach(function (cat, index) {
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

    global.OM_BLOG_ARTICLES.forEach(function (article) {
      carousel.appendChild(renderCard(article));
    });

    function filterCards(category) {
      activeCategory = category;
      var cards = carousel.querySelectorAll('.om-blog-card');
      var visible = 0;
      cards.forEach(function (card) {
        var show = category === 'all' || card.dataset.category === category;
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
