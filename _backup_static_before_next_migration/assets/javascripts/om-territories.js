/**
 * OffMarket — Adresses / Territories gallery (vanilla port)
 * Source: mavericks/src/components/lightswind/3d-hover-gallery.tsx
 *         mavericks/src/components/cinematic/sections/TerritoriesMobileGallery.jsx
 */
(function () {
  'use strict';

  var IMG_BASE = '/assets/mavericks/territories/investment/';
  var ITEMS = [
    {
      number: '01',
      image: IMG_BASE + 'gueliz-hypercentre.webp',
      label: 'Guéliz Hyper-Centre / Hivernage',
      subtitle: 'Appartements · centralité · forte demande',
      tag: 'LIQUIDITÉ LOCATIVE',
    },
    {
      number: '02',
      image: IMG_BASE + 'triangle-or-hivernage.webp',
      label: "Triangle d\u2019Or",
      labelHtml: 'Triangle <span class="om-gold-word">d\u2019Or</span>',
      subtitle: "Route de Tahnaout · Route de l'Ourika · Agdal",
      tag: 'AXE EN DÉVELOPPEMENT',
      goldNumber: true,
    },
    {
      number: '03',
      image: '/assets/mavericks/gallery/mavericks-collection-riads.webp',
      label: 'Médina',
      subtitle: 'Riads de caractère · maisons d\u2019hôtes · patrimoine',
      tag: 'RENDEMENT TOURISTIQUE',
    },
  ];

  var DESKTOP = {
    itemWidth: 14,
    itemHeight: 20,
    hoverScale: 15,
    transitionDuration: 1.25,
    activeWidth: 48,
  };

  var EASING = 'cubic-bezier(.1, .7, 0, 1)';
  var HEIGHT_TRANSITION_MS = 650;
  var SCROLL_DELAY_MS = 90;

  function ariaLabel(item) {
    return item.label + ' — ' + item.subtitle + ' — ' + item.tag;
  }

  function inactiveHeight() {
    return 'calc(' + DESKTOP.itemHeight + 'vw + ' + DESKTOP.itemHeight + 'vh)';
  }

  function activeHeight() {
    return 'calc(' + DESKTOP.itemHeight + 'vw + ' + DESKTOP.itemHeight + 'vh + 3rem)';
  }

  function applyDesktopShell(card, isActive) {
    var baseWidthPx = 10;
    var duration = DESKTOP.transitionDuration + 's';

    card.style.width = isActive
      ? DESKTOP.activeWidth + 'vw'
      : 'calc(' + DESKTOP.itemWidth + 'vw + ' + baseWidthPx + 'px)';
    card.style.height = isActive ? activeHeight() : inactiveHeight();
    card.style.margin = isActive ? '0 0.45vw' : '0';
    card.style.zIndex = isActive ? '100' : 'auto';
    card.style.transition = 'width ' + duration + ' ' + EASING + ', height ' + duration + ' ' + EASING;
  }

  function applyDesktopTransform(inner, isActive) {
    var duration = DESKTOP.transitionDuration + 's';
    var scale = DESKTOP.hoverScale;

    inner.style.transform = isActive
      ? 'translateZ(calc(' + scale + 'vw + ' + scale + 'vh))'
      : 'none';
    inner.style.transition = 'transform ' + duration + ' ' + EASING;
  }

  function initDesktop(root) {
    var stage = root.querySelector('[data-om-territories-stage]');
    if (!stage) return;

    var cards = Array.prototype.slice.call(stage.querySelectorAll('[data-om-territory-card]'));
    var activeIndex = null;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setActive(index) {
      activeIndex = index;
      cards.forEach(function (card, i) {
        var isActive = index === i;
        var isFocused = card.classList.contains('is-focused');
        card.classList.toggle('is-active', isActive);
        card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        applyDesktopShell(card, isActive);
        var inner = card.querySelector('.om-territories__card-inner');
        if (inner) {
          applyDesktopTransform(inner, isActive && !reduceMotion);
        }
        var media = card.querySelector('.om-territories__card-media');
        if (media && reduceMotion) {
          media.style.filter = isActive || isFocused ? 'none' : 'grayscale(1) brightness(0.5)';
        }
      });
    }

    cards.forEach(function (card, index) {
      applyDesktopShell(card, false);
      var inner = card.querySelector('.om-territories__card-inner');
      if (inner) applyDesktopTransform(inner, false);

      card.addEventListener('mouseenter', function () {
        setActive(index);
      });
      card.addEventListener('mouseleave', function () {
        setActive(null);
      });
      card.addEventListener('click', function () {
        setActive(activeIndex === index ? null : index);
      });
      card.addEventListener('focus', function () {
        card.classList.add('is-focused');
      });
      card.addEventListener('blur', function () {
        card.classList.remove('is-focused');
      });
      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setActive(activeIndex === index ? null : index);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          var prev = index > 0 ? index - 1 : cards.length - 1;
          cards[prev].focus();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          var next = index < cards.length - 1 ? index + 1 : 0;
          cards[next].focus();
        }
      });
    });

    window.addEventListener(
      'resize',
      function () {
        if (activeIndex !== null) {
          setActive(activeIndex);
        } else {
          cards.forEach(function (card) {
            applyDesktopShell(card, false);
          });
        }
      },
      { passive: true },
    );
  }

  function mobileScrollOffset() {
    var vh = window.innerHeight || document.documentElement.clientHeight || 600;
    return Math.round(Math.min(130, Math.max(90, vh * 0.14)));
  }

  function initMobile(root) {
    var cards = Array.prototype.slice.call(root.querySelectorAll('[data-om-territory-mobile-card]'));
    if (!cards.length) return;

    var activeIndex = null;
    var scrollTimeout = null;
    var rafId = null;

    function clearPendingScroll() {
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
        scrollTimeout = null;
      }
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function scrollToCard(index) {
      var card = cards[index];
      if (!card) return;
      var rect = card.getBoundingClientRect();
      var target = Math.max(0, window.scrollY + rect.top - mobileScrollOffset());
      window.scrollTo({ top: target, behavior: 'smooth' });
    }

    function scheduleScrollToCard(index) {
      clearPendingScroll();
      rafId = window.requestAnimationFrame(function () {
        scrollTimeout = window.setTimeout(function () {
          scrollToCard(index);
        }, SCROLL_DELAY_MS);
      });
    }

    function setActive(index) {
      activeIndex = index;
      cards.forEach(function (card, i) {
        var isActive = index === i;
        card.classList.toggle('is-active', isActive);
        card.classList.toggle('is-expanded', isActive);
        card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        card.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });
    }

    cards.forEach(function (card, index) {
      card.addEventListener('click', function () {
        if (!window.matchMedia('(max-width: 767px)').matches) return;

        if (activeIndex === index) return;

        clearPendingScroll();
        setActive(index);
        scheduleScrollToCard(index);
      });
    });

    if (window.matchMedia('(max-width: 767px)').matches) {
      setActive(0);
    }

    window.addEventListener('pagehide', clearPendingScroll, { once: true });
  }

  function buildCardCopy(classPrefix) {
    return function (item, mode) {
      var wrap = document.createElement('div');
      wrap.className = classPrefix + ' ' + classPrefix + '--' + mode;

      var label = document.createElement('p');
      label.className = 'om-territories__card-label';
      if (item.labelHtml) {
        label.innerHTML = item.labelHtml;
      } else {
        label.textContent = item.label;
      }

      var subtitle = document.createElement('p');
      subtitle.className = 'om-territories__card-subtitle';
      subtitle.textContent = item.subtitle;

      var tag = document.createElement('p');
      tag.className = 'om-territories__card-tag';
      tag.textContent = item.tag;

      wrap.appendChild(label);
      wrap.appendChild(subtitle);
      wrap.appendChild(tag);
      return wrap;
    };
  }

  function appendCardNumber(parent, number, isGold) {
    var num = document.createElement('span');
    num.className =
      'om-territories__card-number' + (isGold ? ' om-territories__card-number--gold' : '');
    num.setAttribute('data-number', number);
    num.setAttribute('aria-hidden', 'true');
    num.textContent = number;
    parent.appendChild(num);
  }

  function appendCardVeils(parent) {
    var bottomIdle = document.createElement('div');
    bottomIdle.className = 'om-territories__card-veil om-territories__card-veil--bottom-idle';
    bottomIdle.setAttribute('aria-hidden', 'true');

    var sideActive = document.createElement('div');
    sideActive.className = 'om-territories__card-veil om-territories__card-veil--side-active';
    sideActive.setAttribute('aria-hidden', 'true');

    var bottomActive = document.createElement('div');
    bottomActive.className = 'om-territories__card-veil om-territories__card-veil--bottom-active';
    bottomActive.setAttribute('aria-hidden', 'true');

    parent.appendChild(bottomIdle);
    parent.appendChild(sideActive);
    parent.appendChild(bottomActive);
  }

  function mountDesktopCards(stage) {
    var makeCopy = buildCardCopy('om-territories__card-copy');

    ITEMS.forEach(function (item, index) {
      var card = document.createElement('div');
      card.className = 'om-territories__card';
      card.setAttribute('data-om-territory-card', '');
      card.setAttribute('data-index', String(index));
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', ariaLabel(item));
      card.setAttribute('aria-pressed', 'false');

      var inner = document.createElement('div');
      inner.className = 'om-territories__card-inner';

      var media = document.createElement('div');
      media.className = 'om-territories__card-media';
      media.style.backgroundImage = 'url(' + item.image + ')';
      media.setAttribute('aria-hidden', 'true');

      inner.appendChild(media);
      appendCardVeils(inner);
      appendCardNumber(inner, item.number, !!item.goldNumber);
      inner.appendChild(makeCopy(item, 'idle'));
      inner.appendChild(makeCopy(item, 'active'));
      card.appendChild(inner);
      stage.appendChild(card);
    });
  }

  function mountMobileCards(mobileRoot) {
    var makeCopy = buildCardCopy('om-territories__card-copy');

    ITEMS.forEach(function (item, index) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'om-territories__mobile-card';
      card.setAttribute('data-om-territory-mobile-card', '');
      card.setAttribute('data-index', String(index));
      card.setAttribute('aria-label', ariaLabel(item));
      card.setAttribute('aria-pressed', 'false');

      var media = document.createElement('div');
      media.className = 'om-territories__mobile-media';
      media.style.backgroundImage = 'url(' + item.image + ')';
      media.setAttribute('aria-hidden', 'true');

      card.appendChild(media);
      appendCardVeils(card);
      appendCardNumber(card, item.number, !!item.goldNumber);
      card.appendChild(makeCopy(item, 'idle'));
      card.appendChild(makeCopy(item, 'active'));
      mobileRoot.appendChild(card);
    });
  }

  function boot() {
    var section = document.getElementById('territories');
    if (!section) return;

    var stage = section.querySelector('[data-om-territories-stage]');
    var mobileRoot = section.querySelector('[data-om-territories-mobile]');

    if (stage && !stage.childElementCount) {
      mountDesktopCards(stage);
    }
    if (mobileRoot && !mobileRoot.childElementCount) {
      mountMobileCards(mobileRoot);
    }

    initDesktop(section);
    initMobile(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
