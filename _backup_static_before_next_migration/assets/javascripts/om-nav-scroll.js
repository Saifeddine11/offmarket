/**
 * OFF MARKET — navbar auto-hide on scroll down, show on scroll up.
 */
(function () {
  'use strict';

  var THRESHOLD = 12;
  var TOP_SAFE_ZONE = 40;

  function getChrome() {
    return document.querySelector('[data-mv-chrome]');
  }

  function getScrollY() {
    return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  }

  function isMenuOpen(chrome) {
    if (!chrome) return false;
    return chrome.classList.contains('is-menu-open') || document.body.classList.contains('menu-open');
  }

  function hookSmoothScroll(onScroll) {
    if (!window.jQuery) return;

    var smoothScroll = window.jQuery('body').data('smoothScroll');
    var locomotive =
      smoothScroll && smoothScroll.scroller && smoothScroll.scroller.scroll;

    if (
      locomotive &&
      locomotive.listeners &&
      Array.isArray(locomotive.listeners.scroll)
    ) {
      locomotive.listeners.scroll.push(onScroll);
    }
  }

  function initNavScrollHide() {
    var chrome = getChrome();
    if (!chrome || chrome.dataset.navScrollBound === 'true') return;

    chrome.dataset.navScrollBound = 'true';

    var lastY = getScrollY();
    var ticking = false;

    function update() {
      var currentY = getScrollY();
      var delta = currentY - lastY;

      if (currentY <= TOP_SAFE_ZONE || isMenuOpen(chrome)) {
        chrome.classList.remove('is-nav-hidden');
        lastY = currentY;
        ticking = false;
        return;
      }

      if (delta > THRESHOLD) {
        chrome.classList.add('is-nav-hidden');
        lastY = currentY;
      } else if (delta < -THRESHOLD) {
        chrome.classList.remove('is-nav-hidden');
        lastY = currentY;
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    hookSmoothScroll(onScroll);
    update();
  }

  function boot() {
    initNavScrollHide();
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
