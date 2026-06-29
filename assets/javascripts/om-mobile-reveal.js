/**
 * OFF MARKET — scroll reveal animations on mobile (≤979px)
 */
(function () {
  'use strict';

  var MOBILE_MQ = '(max-width: 979px)';
  var REVEAL_SELECTOR = '[data-om-mobile-reveal]';

  var TARGETS = [
    '#featured-projects .om-featured-projects__intro',
    '#featured-projects .om-reveal-card',
    '#simulateur .om-simulator-home__header',
    '#simulateur .om-simulator',
    '#territories .om-territories__header',
    '#territories .om-territories__card',
    '#lectures-privees .om-testimonials__header',
    '#lectures-privees .om-testimonial-card',
    '#final-cta .om-final-cta__content > *',
    '#contact .om-footer__brand',
    '#contact .om-footer__grid > *',
  ];

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function markTargets() {
    if (!isMobile()) return;

    TARGETS.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el, index) {
        if (el.hasAttribute('data-om-mobile-reveal')) return;
        el.setAttribute('data-om-mobile-reveal', '');
        el.style.setProperty('--om-m-reveal-delay', String(Math.min(index, 6) * 70) + 'ms');
      });
    });
  }

  function revealElement(el) {
    el.classList.add('om-m-inview');
  }

  var observed = new WeakSet();
  var sharedObserver = null;

  function getObserver() {
    if (sharedObserver) return sharedObserver;

    sharedObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          revealElement(entry.target);
          sharedObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px',
      }
    );

    return sharedObserver;
  }

  function initObserver() {
    if (!isMobile()) return;

    var items = document.querySelectorAll(REVEAL_SELECTOR);
    if (!items.length) return;

    if (prefersReducedMotion()) {
      items.forEach(revealElement);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      items.forEach(revealElement);
      return;
    }

    var observer = getObserver();

    items.forEach(function (el) {
      if (el.classList.contains('om-m-inview') || observed.has(el)) return;
      observed.add(el);
      observer.observe(el);
    });
  }

  function boot() {
    markTargets();
    initObserver();
    window.setTimeout(function () {
      markTargets();
      initObserver();
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.addEventListener(
    'resize',
    function () {
      if (isMobile()) {
        markTargets();
        initObserver();
      }
    },
    { passive: true }
  );

  if (typeof barba !== 'undefined' && barba.hooks && typeof barba.hooks.afterEnter === 'function') {
    barba.hooks.afterEnter(boot);
  }
})();
