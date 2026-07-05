/**
 * Mavericks chrome — keep navbar visible at all times (unified chrome).
 */
(function () {
  'use strict';

  var hiddenClass = 'navbar--hidden-after-hero';

  function initNavbarHeroVisibility() {
    var navbar = document.querySelector('[data-mv-chrome]');
    if (!navbar) return;
    navbar.classList.remove(hiddenClass);
  }

  function boot() {
    initNavbarHeroVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  if (typeof barba !== 'undefined' && barba.hooks && typeof barba.hooks.afterEnter === 'function') {
    barba.hooks.afterEnter(function () {
      initNavbarHeroVisibility();
    });
  }
})();
