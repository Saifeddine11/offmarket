/**
 * OffMarket — Adresses / Private estates editorial gallery (post-hero)
 * Horizontal showcase · glass arrows · stats row
 */
(function () {
  'use strict';

  var IMG_BASE = '/assets/mavericks/territories/investment/';
  var ITEMS = [
    {
      image: IMG_BASE + 'triangle-or-hivernage.webp',
      label: "Triangle d'Or / Hivernage",
      subtitle: 'Prestige central · forte demande',
      tag: 'Adresse établie',
    },
    {
      image: IMG_BASE + 'gueliz-hypercentre.webp',
      label: 'Guéliz Hyper-Centre',
      subtitle: 'Appartements · rendement urbain',
      tag: 'Liquidité locative',
    },
    {
      image: IMG_BASE + 'palmeraie.webp',
      label: 'Palmeraie',
      subtitle: 'Villas privées · grands terrains',
      tag: 'Patrimoine résidentiel',
    },
    {
      image: IMG_BASE + 'route-ourika.webp',
      label: "Route de l'Ourika",
      subtitle: 'Villas · Atlas · potentiel',
      tag: 'Horizon long terme',
    },
  ];

  var STATS = [
    { value: '04', label: 'Collections privées' },
    { value: '100%', label: 'Approche confidentielle' },
    { value: '12+', label: 'Quartiers sélectionnés' },
    { value: '01', label: 'Interlocuteur dédié' },
  ];

  function ariaLabel(item) {
    return item.label + ' — ' + item.subtitle + ' — ' + item.tag;
  }

  function mountSlides(track) {
    ITEMS.forEach(function (item, index) {
      var slide = document.createElement('article');
      slide.className = 'om-private-estates__slide' + (index === 0 ? ' is-active' : '');
      slide.setAttribute('data-om-private-estate-slide', '');
      slide.setAttribute('data-index', String(index));
      slide.setAttribute('aria-label', ariaLabel(item));

      var media = document.createElement('div');
      media.className = 'om-private-estates__slide-media';
      media.style.backgroundImage = 'url(' + item.image + ')';
      media.setAttribute('role', 'img');
      media.setAttribute('aria-label', item.label);

      var caption = document.createElement('div');
      caption.className = 'om-private-estates__slide-caption';

      var label = document.createElement('p');
      label.className = 'om-private-estates__slide-label';
      label.textContent = item.label;

      var subtitle = document.createElement('p');
      subtitle.className = 'om-private-estates__slide-subtitle';
      subtitle.textContent = item.subtitle;

      caption.appendChild(label);
      caption.appendChild(subtitle);
      slide.appendChild(media);
      slide.appendChild(caption);
      track.appendChild(slide);
    });
  }

  function mountStats(root) {
    var statsRoot = root.querySelector('[data-om-private-estates-stats]');
    if (!statsRoot) return;

    STATS.forEach(function (stat) {
      var block = document.createElement('div');
      block.className = 'om-private-estates__stat';

      var value = document.createElement('p');
      value.className = 'om-private-estates__stat-value';
      value.textContent = stat.value;

      var label = document.createElement('p');
      label.className = 'om-private-estates__stat-label';
      label.textContent = stat.label;

      block.appendChild(value);
      block.appendChild(label);
      statsRoot.appendChild(block);
    });
  }

  function initCarousel(root) {
    var track = root.querySelector('[data-om-private-estates-track]');
    var prevBtn = root.querySelector('[data-om-private-estates-prev]');
    var nextBtn = root.querySelector('[data-om-private-estates-next]');
    var indicator = root.querySelector('[data-om-private-estates-indicator]');
    if (!track) return;

    mountSlides(track);
    var slides = Array.prototype.slice.call(track.querySelectorAll('[data-om-private-estate-slide]'));
    var activeIndex = 0;
    var isMobile = window.matchMedia('(max-width: 767px)').matches;

    function updateIndicator() {
      if (!indicator || slides.length <= 1) return;
      var maxLeft = 100 - 32;
      var left = slides.length === 1 ? 0 : (activeIndex / (slides.length - 1)) * maxLeft;
      indicator.style.left = left + '%';
    }

    function getOffsetForIndex(index) {
      var slide = slides[index];
      if (!slide) return 0;
      var gap = parseFloat(getComputedStyle(track).gap) || 16;
      var offset = 0;
      for (var i = 0; i < index; i++) {
        offset += slides[i].offsetWidth + gap;
      }
      return offset;
    }

    function setActive(index) {
      activeIndex = index;
      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === index);
        slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      });

      if (!isMobile) {
        track.style.transform = 'translate3d(-' + getOffsetForIndex(index) + 'px, 0, 0)';
      } else {
        var slide = slides[index];
        if (slide) {
          slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }

      if (prevBtn) prevBtn.disabled = index <= 0;
      if (nextBtn) nextBtn.disabled = index >= slides.length - 1;
      updateIndicator();
    }

    function go(delta) {
      var next = Math.max(0, Math.min(slides.length - 1, activeIndex + delta));
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
        isMobile = window.matchMedia('(max-width: 767px)').matches;
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

  function scrollToPrivateEstatesAnchor(section) {
    if (!section) return;

    var smooth = getSmoothScrollInstance();
    if (smooth) {
      smooth.scrollTo(section, { offset: 0, duration: 0, disableLerp: true });
      return;
    }

    var top = section.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: top, left: 0, behavior: 'auto' });
  }

  function initPrivateEstatesAnchor(section) {
    function handleHash() {
      if (location.hash !== '#private-estates') return;
      scrollToPrivateEstatesAnchor(section);
    }

    if (location.hash === '#private-estates') {
      window.requestAnimationFrame(function () {
        scrollToPrivateEstatesAnchor(section);
      });
      window.setTimeout(function () {
        scrollToPrivateEstatesAnchor(section);
      }, 1200);
    }

    window.addEventListener('hashchange', handleHash);
  }

  function boot() {
    var section = document.getElementById('private-estates');
    if (!section) return;

    mountStats(section);
    initCarousel(section);
    initPrivateEstatesAnchor(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
