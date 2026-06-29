/**
 * Mavericks — Qui sommes-nous section entrance reveal
 * Uses the same scroll-watch pattern as mav-editorial-text-reveal.js
 */
(function () {
  'use strict';

  var SECTION_SELECTOR = '[data-reveal-section]';
  var VISIBILITY_THRESHOLD = 0.28;
  var MOBILE_MQ = '(max-width: 767px)';

  function isMobileViewport() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function isQuiSommesNous(section) {
    return section.id === 'qui-sommes-nous';
  }

  function revealSection(section) {
    section.classList.add('is-visible');
    section.setAttribute('data-reveal-visible', 'true');
  }

  function revealSectionAnimated(section) {
    if (
      isQuiSommesNous(section) &&
      isMobileViewport() &&
      typeof gsap !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      var items = section.querySelectorAll('.mav-reveal-item');
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 22, filter: 'blur(5px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.82,
            stagger: 0.07,
            ease: 'power3.out',
            onComplete: function () {
              revealSection(section);
            },
          }
        );
        return;
      }
    }

    revealSection(section);
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

  function isVisibleEnough(el, threshold) {
    var rect = el.getBoundingClientRect();
    if (!rect.height) return false;

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var visible = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
    var ratio = typeof threshold === 'number' ? threshold : VISIBILITY_THRESHOLD;

    return visible >= rect.height * ratio;
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function visibilityThresholdFor(section) {
    if (isQuiSommesNous(section) && isMobileViewport()) {
      return 0.18;
    }
    return VISIBILITY_THRESHOLD;
  }

  function watchElement(el, onEnter) {
    var threshold = visibilityThresholdFor(el);
    var done = false;

    function finish() {
      if (done || el.classList.contains('is-visible')) {
        cleanup();
        return true;
      }

      if (!isVisibleEnough(el, threshold)) return false;

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
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            finish();
          }
        });
      },
      {
        threshold: [0, 0.12, threshold, 0.35, 0.5],
        rootMargin: isQuiSommesNous(el) && isMobileViewport() ? '0px 0px -4% 0px' : '0px 0px -8% 0px',
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
        revealSectionAnimated(section);
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
