/**
 * Mavericks — Qui sommes-nous section entrance reveal
 * Uses the same scroll-watch pattern as mav-editorial-text-reveal.js
 */
(function () {
  'use strict';

  var SECTION_SELECTOR = '[data-reveal-section]';
  var VISIBILITY_THRESHOLD = 0.28;

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

  function isVisibleEnough(el) {
    var rect = el.getBoundingClientRect();
    if (!rect.height) return false;

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var visible = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));

    return visible >= rect.height * VISIBILITY_THRESHOLD;
  }

  function revealSection(section) {
    section.classList.add('is-visible');
    section.setAttribute('data-reveal-visible', 'true');
  }

  function watchElement(el, onEnter) {
    var done = false;

    function finish() {
      if (done || el.classList.contains('is-visible')) {
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
        threshold: [0, 0.15, VISIBILITY_THRESHOLD, 0.35, 0.5],
        rootMargin: '0px 0px -8% 0px'
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

  function initMavWhoReveal() {
    var sections = document.querySelectorAll(SECTION_SELECTOR);
    if (!sections.length) return;

    sections.forEach(function (section) {
      if (section.dataset.revealObserverBound === 'true') return;
      section.dataset.revealObserverBound = 'true';

      if (prefersReducedMotion()) {
        revealSection(section);
        return;
      }

      watchElement(section, function () {
        revealSection(section);
      });
    });
  }

  function boot() {
    initMavWhoReveal();
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
