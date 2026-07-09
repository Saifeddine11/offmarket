/**
 * OFF MARKET — Inner-page hero entrance animation
 */
(function () {
  'use strict';

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function revealHero(hero) {
    if (!hero || hero.classList.contains('is-visible')) return;
    hero.classList.add('is-visible');
  }

  function initHero(hero) {
    if (hero.dataset.innerHeroBound === 'true') return;
    if (hero.getAttribute('data-om-framer-hero') === 'true') return;
    hero.dataset.innerHeroBound = 'true';

    if (prefersReducedMotion()) {
      revealHero(hero);
      return;
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              revealHero(hero);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
      );
      observer.observe(hero);
    }

    requestAnimationFrame(function () {
      window.setTimeout(function () {
        revealHero(hero);
      }, 80);
    });
  }

  function init() {
    document.querySelectorAll('[data-inner-hero]').forEach(initHero);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
