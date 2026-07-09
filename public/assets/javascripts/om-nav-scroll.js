/**
 * OFF MARKET — navbar auto-hide on scroll down, show on scroll up.
 */
(function () {
  'use strict';

  var DESKTOP_THRESHOLD = 12;
  var MOBILE_THRESHOLD = 6;
  var TOP_SAFE_ZONE = 40;
  var MOBILE_TOP_SAFE_ZONE = 72;
  var mobileMq = window.matchMedia('(max-width: 767px)');

  function getChrome() {
    return document.querySelector('[data-mv-chrome]');
  }

  function getScrollY() {
    return (
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }

  function getThreshold() {
    return mobileMq.matches ? MOBILE_THRESHOLD : DESKTOP_THRESHOLD;
  }

  function getTopSafeZone() {
    return mobileMq.matches ? MOBILE_TOP_SAFE_ZONE : TOP_SAFE_ZONE;
  }

  function isMenuOpen(chrome) {
    if (!chrome) return false;
    return (
      chrome.classList.contains('is-menu-open') ||
      document.body.classList.contains('menu-open')
    );
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

  function bindScrollSources(onScroll) {
    var opts = { passive: true };

    window.addEventListener('scroll', onScroll, opts);
    document.addEventListener('scroll', onScroll, opts);

    if (window.visualViewport) {
      window.visualViewport.addEventListener('scroll', onScroll, opts);
      window.visualViewport.addEventListener('resize', onScroll, opts);
    }

    hookSmoothScroll(onScroll);

    // iOS Safari can delay window scroll events during touch momentum.
    var touchActive = false;
    var touchFrame = 0;

    function touchLoop() {
      if (!touchActive) return;
      onScroll();
      touchFrame = window.requestAnimationFrame(touchLoop);
    }

    function startTouch() {
      if (touchActive) return;
      touchActive = true;
      onScroll();
      touchFrame = window.requestAnimationFrame(touchLoop);
    }

    function stopTouch() {
      touchActive = false;
      if (touchFrame) {
        window.cancelAnimationFrame(touchFrame);
        touchFrame = 0;
      }
      onScroll();
    }

    window.addEventListener('touchstart', startTouch, opts);
    window.addEventListener('touchend', stopTouch, opts);
    window.addEventListener('touchcancel', stopTouch, opts);
  }

  function initNavScrollHide() {
    var chrome = getChrome();
    if (!chrome || chrome.dataset.navScrollBound === 'true') return;

    chrome.dataset.navScrollBound = 'true';

    var lastY = getScrollY();
    var ticking = false;

    function update() {
      if (!chrome.isConnected) {
        ticking = false;
        return;
      }

      var currentY = getScrollY();
      var delta = currentY - lastY;
      var threshold = getThreshold();
      var topSafeZone = getTopSafeZone();

      if (currentY <= topSafeZone || isMenuOpen(chrome)) {
        chrome.classList.remove('is-nav-hidden');
        lastY = currentY;
        ticking = false;
        return;
      }

      if (delta > threshold) {
        chrome.classList.add('is-nav-hidden');
        lastY = currentY;
      } else if (delta < -threshold) {
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

    bindScrollSources(onScroll);
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

  document.addEventListener('om-nav-boot', boot);

  if (
    typeof barba !== 'undefined' &&
    barba.hooks &&
    typeof barba.hooks.afterEnter === 'function'
  ) {
    barba.hooks.afterEnter(boot);
  }
})();
