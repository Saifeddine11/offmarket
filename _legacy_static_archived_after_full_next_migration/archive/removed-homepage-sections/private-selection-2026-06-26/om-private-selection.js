/**
 * OffMarket — Private selection carousel (post-hero)
 * Vanilla carousel · no external dependencies
 */
(function () {
  'use strict';

  var ITEMS = [
    {
      image: '/assets/mavericks/hero/mavericks-hero-villa.jpg',
      label: 'Villas privées',
      subtitle: 'Intimité, adresse, patrimoine.',
    },
    {
      image: '/assets/mavericks/gallery/mavericks-collection-riads.jpg',
      label: 'Riads de caractère',
      subtitle: 'Architecture, médina, rareté.',
    },
    {
      image: '/assets/mavericks/territories/investment/triangle-or-hivernage.png',
      label: 'Appartements premium',
      subtitle: 'Guéliz, Hivernage, liquidité.',
    },
    {
      image: '/assets/mavericks/gallery/mavericks-collection-estates.jpg',
      label: 'Sur plan confidentiel',
      subtitle: 'Pré-lancements et lots réservés.',
    },
  ];

  var STATS = [
    { value: '04', label: 'types de biens' },
    { value: '06', label: 'quartiers suivis' },
    { value: '01', label: 'sélection privée' },
    { value: '48h', label: 'premier retour projet' },
  ];

  function ariaLabel(item) {
    return item.label + ' — ' + item.subtitle;
  }

  function mountCards(track) {
    ITEMS.forEach(function (item, index) {
      var card = document.createElement('article');
      card.className = 'om-private-selection__card' + (index === 0 ? ' is-active' : '');
      card.setAttribute('data-om-private-selection-card', '');
      card.setAttribute('data-index', String(index));
      card.setAttribute('aria-label', ariaLabel(item));

      var media = document.createElement('div');
      media.className = 'om-private-selection__card-media';
      media.style.backgroundImage = 'url(' + item.image + ')';
      media.setAttribute('role', 'img');
      media.setAttribute('aria-label', item.label);

      var caption = document.createElement('div');
      caption.className = 'om-private-selection__card-caption';

      var title = document.createElement('p');
      title.className = 'om-private-selection__card-title';
      title.textContent = item.label;

      var subtitle = document.createElement('p');
      subtitle.className = 'om-private-selection__card-subtitle';
      subtitle.textContent = item.subtitle;

      caption.appendChild(title);
      caption.appendChild(subtitle);
      card.appendChild(media);
      card.appendChild(caption);
      track.appendChild(card);
    });
  }

  function mountStats(root) {
    var statsRoot = root.querySelector('[data-om-private-selection-stats]');
    if (!statsRoot) return;

    STATS.forEach(function (stat) {
      var block = document.createElement('div');
      block.className = 'om-private-selection__stat';

      var value = document.createElement('p');
      value.className = 'om-private-selection__stat-value';
      value.textContent = stat.value;

      var label = document.createElement('p');
      label.className = 'om-private-selection__stat-label';
      label.textContent = stat.label;

      block.appendChild(value);
      block.appendChild(label);
      statsRoot.appendChild(block);
    });
  }

  function initCarousel(root) {
    var track = root.querySelector('[data-om-private-selection-track]');
    var prevBtn = root.querySelector('[data-om-private-selection-prev]');
    var nextBtn = root.querySelector('[data-om-private-selection-next]');
    var indicator = root.querySelector('[data-om-private-selection-indicator]');
    if (!track) return;

    mountCards(track);
    var cards = Array.prototype.slice.call(track.querySelectorAll('[data-om-private-selection-card]'));
    var activeIndex = 0;
    var isMobile = window.matchMedia('(max-width: 900px)').matches;

    function updateIndicator() {
      if (!indicator || cards.length <= 1) return;
      var maxLeft = 100 - 32;
      var left = cards.length === 1 ? 0 : (activeIndex / (cards.length - 1)) * maxLeft;
      indicator.style.left = left + '%';
    }

    function getOffsetForIndex(index) {
      var gap = parseFloat(getComputedStyle(track).gap) || 16;
      var offset = 0;
      for (var i = 0; i < index; i++) {
        offset += cards[i].offsetWidth + gap;
      }
      return offset;
    }

    function setActive(index) {
      activeIndex = index;
      cards.forEach(function (card, i) {
        card.classList.toggle('is-active', i === index);
        card.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      });

      if (!isMobile) {
        track.style.transform = 'translate3d(-' + getOffsetForIndex(index) + 'px, 0, 0)';
      } else {
        var card = cards[index];
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }

      if (prevBtn) prevBtn.disabled = index <= 0;
      if (nextBtn) nextBtn.disabled = index >= cards.length - 1;
      updateIndicator();
    }

    function go(delta) {
      var next = Math.max(0, Math.min(cards.length - 1, activeIndex + delta));
      if (next !== activeIndex) setActive(next);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });

    root.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(1);
      }
    });

    window.addEventListener(
      'resize',
      function () {
        var wasMobile = isMobile;
        isMobile = window.matchMedia('(max-width: 900px)').matches;
        if (!isMobile) {
          track.style.transform = 'translate3d(-' + getOffsetForIndex(activeIndex) + 'px, 0, 0)';
        } else if (!wasMobile) {
          track.style.transform = '';
        }
      },
      { passive: true },
    );

    setActive(0);
  }

  function getSmoothScrollInstance() {
    if (window.locomotiveScroll && typeof window.locomotiveScroll.scrollTo === 'function') {
      return window.locomotiveScroll;
    }
    if (window.scroll && typeof window.scroll.scrollTo === 'function') {
      return window.scroll;
    }
    return null;
  }

  function scrollToAnchor(section) {
    if (!section) return;
    var smooth = getSmoothScrollInstance();
    if (smooth) {
      smooth.scrollTo(section, { offset: 0, duration: 0, disableLerp: true });
      return;
    }
    var top = section.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: top, left: 0, behavior: 'auto' });
  }

  function initAnchor(section) {
    function handleHash() {
      if (location.hash !== '#private-estates') return;
      scrollToAnchor(section);
    }

    if (location.hash === '#private-estates') {
      window.requestAnimationFrame(function () { scrollToAnchor(section); });
      window.setTimeout(function () { scrollToAnchor(section); }, 1200);
    }

    window.addEventListener('hashchange', handleHash);
  }

  function boot() {
    var section = document.getElementById('private-estates');
    if (!section) return;

    mountStats(section);
    initCarousel(section);
    initAnchor(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
