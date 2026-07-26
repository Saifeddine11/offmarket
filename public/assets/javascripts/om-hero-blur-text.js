/**
 * OFF MARKET hero — BlurText-style word reveal (vanilla JS)
 * Stable on refresh: eager in-viewport reveal + timed fallback.
 */
(function () {
  'use strict';

  var HERO_READY_CLASS = 'is-hero-content-ready';
  var FALLBACK_MS = 1400;
  var observer = null;
  var fallbackTimer = null;

  function getHero() {
    return document.querySelector('.mav-hero');
  }

  function markHeroReady() {
    var hero = getHero();
    if (hero) {
      hero.classList.add(HERO_READY_CLASS);
    }
  }

  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    if (!viewportHeight) return true;
    return rect.bottom > 8 && rect.top < viewportHeight - 8;
  }

  function revealTarget(target) {
    if (!target) return;

    if (target.hasAttribute('data-blur-text')) {
      target.classList.add('is-blur-visible');
    }

    if (target.hasAttribute('data-blur-fade')) {
      target.classList.add('is-blur-fade-visible');
    }
  }

  function revealAllHeroTargets(hero) {
    if (!hero) return;

    hero.querySelectorAll('[data-blur-text], [data-blur-fade]').forEach(function (element) {
      revealTarget(element);
    });

    markHeroReady();
  }

  function teardown() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (fallbackTimer) {
      window.clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
  }

  function scheduleFallback(hero) {
    if (fallbackTimer) {
      window.clearTimeout(fallbackTimer);
    }

    fallbackTimer = window.setTimeout(function () {
      revealAllHeroTargets(hero);
      fallbackTimer = null;
    }, FALLBACK_MS);
  }

  function initHeroBlurText() {
    var hero = getHero();
    if (!hero) return;

    teardown();

    var blurTextElements = hero.querySelectorAll('[data-blur-text]');
    var fadeElements = hero.querySelectorAll('[data-blur-fade]');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      revealAllHeroTargets(hero);
      return;
    }

    blurTextElements.forEach(function (element) {
      if (element.dataset.blurInitialized === 'true') {
        if (isInViewport(element)) {
          revealTarget(element);
        }
        return;
      }

      var originalNodes = Array.from(element.childNodes);
      var fragment = document.createDocumentFragment();
      var wordIndex = 0;

      originalNodes.forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
          var parts = node.textContent.split(/(\s+)/);

          parts.forEach(function (part) {
            if (!part) return;

            if (/^\s+$/.test(part)) {
              fragment.appendChild(document.createTextNode(part));
              return;
            }

            var span = document.createElement('span');
            span.className = 'mav-blur-word';
            span.textContent = part;
            span.style.setProperty('--blur-word-index', wordIndex);
            wordIndex += 1;
            fragment.appendChild(span);
          });
        }

        if (node.nodeName === 'BR') {
          fragment.appendChild(document.createElement('br'));
        }

        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'BR') {
          var wrapper = document.createElement(node.tagName.toLowerCase());
          Array.from(node.attributes).forEach(function (attr) {
            wrapper.setAttribute(attr.name, attr.value);
          });

          var innerParts = node.textContent.split(/(\s+)/);

          innerParts.forEach(function (part) {
            if (!part) return;

            if (/^\s+$/.test(part)) {
              wrapper.appendChild(document.createTextNode(part));
              return;
            }

            var innerSpan = document.createElement('span');
            innerSpan.className = 'mav-blur-word';
            innerSpan.textContent = part;
            innerSpan.style.setProperty('--blur-word-index', wordIndex);
            wordIndex += 1;
            wrapper.appendChild(innerSpan);
          });

          fragment.appendChild(wrapper);
        }
      });

      element.replaceChildren(fragment);
      element.dataset.blurInitialized = 'true';
      element.style.setProperty('--blur-word-count', wordIndex);
      element.classList.add('is-blur-ready');

      if (isInViewport(element)) {
        revealTarget(element);
      }
    });

    fadeElements.forEach(function (element) {
      if (isInViewport(element)) {
        revealTarget(element);
      }
    });

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          revealTarget(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -4% 0px',
      },
    );

    blurTextElements.forEach(function (element) {
      if (element.classList.contains('is-blur-visible')) return;
      observer.observe(element);
    });

    fadeElements.forEach(function (element) {
      if (element.classList.contains('is-blur-fade-visible')) return;
      observer.observe(element);
    });

    scheduleFallback(hero);
  }

  function boot() {
    requestAnimationFrame(function () {
      initHeroBlurText();
    });
  }

  window.__mavHeroBlurBoot = boot;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  document.addEventListener('om-hero-boot', boot);

  window.addEventListener('pageshow', function (event) {
    if (!event.persisted) return;
    boot();
  });

  if (typeof barba !== 'undefined' && barba.hooks && typeof barba.hooks.afterEnter === 'function') {
    barba.hooks.afterEnter(function () {
      boot();
    });
  }
})();
