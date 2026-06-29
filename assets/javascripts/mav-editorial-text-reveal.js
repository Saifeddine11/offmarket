/**
 * Mavericks — Editorial text reveal
 * Phrase-by-phrase reveal for [data-text-reveal] (with locomotive scroll fallback).
 */
(function () {
  'use strict';

  var PHRASE_SELECTOR =
    '#l-design-sticky-3 [data-text-reveal], #design-mobile-slide-4 [data-text-reveal]';

  var VISIBILITY_THRESHOLD = 0.35;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function waitForJQuery(callback, attempts) {
    var count = attempts || 0;

    if (window.jQuery) {
      callback(window.jQuery);
      return;
    }

    if (count > 60) return;

    setTimeout(function () {
      waitForJQuery(callback, count + 1);
    }, 100);
  }

  function isPhraseRevealed(el) {
    return el.classList.contains('is-visible') || el.dataset.mavTextRevealed === 'true';
  }

  function isVisibleEnough(el) {
    var rect = el.getBoundingClientRect();
    if (!rect.height) return false;

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var visible = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));

    return visible >= rect.height * VISIBILITY_THRESHOLD;
  }

  function assignLineIndexes(el) {
    var spans = el.querySelectorAll('span');

    spans.forEach(function (span, index) {
      span.style.setProperty('--line-index', index);
    });
  }

  function revealPhraseElement(el) {
    el.classList.add('is-visible');
    el.dataset.mavTextRevealed = 'true';
  }

  function watchElement(el, onEnter) {
    var done = false;

    function finish() {
      if (done || isPhraseRevealed(el)) {
        cleanup();
        return true;
      }

      if (!isVisibleEnough(el)) return false;

      done = true;
      cleanup();
      onEnter();
      return true;
    }

    var observer;
    var rafId;
    var unhookSmoothScroll;

    function cleanup() {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', finish, true);
      window.removeEventListener('resize', finish);
      if (rafId) cancelAnimationFrame(rafId);
      if (unhookSmoothScroll) unhookSmoothScroll();
    }

    if (finish()) return;

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= VISIBILITY_THRESHOLD) {
            finish();
          }
        });
      },
      {
        threshold: [0, 0.15, VISIBILITY_THRESHOLD, 0.5],
        rootMargin: '0px 0px -5% 0px'
      }
    );

    observer.observe(el);
    window.addEventListener('scroll', finish, { passive: true, capture: true });
    window.addEventListener('resize', finish);

    (function rafLoop() {
      if (finish()) return;
      rafId = requestAnimationFrame(rafLoop);
    })();

    waitForJQuery(function ($) {
      var smoothScroll = $('body').data('smoothScroll');
      var locomotive =
        smoothScroll && smoothScroll.scroller && smoothScroll.scroller.scroll;

      if (
        locomotive &&
        locomotive.listeners &&
        Array.isArray(locomotive.listeners.scroll)
      ) {
        locomotive.listeners.scroll.push(finish);
        unhookSmoothScroll = function () {
          var list = locomotive.listeners.scroll;
          var index = list.indexOf(finish);
          if (index >= 0) list.splice(index, 1);
        };
      }
    });
  }

  function initPhraseReveal(el) {
    if (el.dataset.mavTextRevealBound === 'true') return;
    el.dataset.mavTextRevealBound = 'true';

    assignLineIndexes(el);

    if (prefersReducedMotion()) {
      revealPhraseElement(el);
      return;
    }

    watchElement(el, function () {
      revealPhraseElement(el);
    });
  }

  function initEditorialReveal() {
    var elements = document.querySelectorAll(PHRASE_SELECTOR);
    if (!elements.length) return;

    elements.forEach(initPhraseReveal);
  }

  function boot() {
    if (window.__OM_MOBILE_LEGACY_DISABLED__) {
      return;
    }

    initEditorialReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  if (
    typeof barba !== 'undefined' &&
    barba.hooks &&
    typeof barba.hooks.afterEnter === 'function'
  ) {
    barba.hooks.afterEnter(boot);
  }
})();
