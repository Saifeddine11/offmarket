/**
 * OFF MARKET — scroll layout guard (Next.js hybrid pages).
 * - Removes legacy post-footer archive block if still in DOM
 * - Clears orphaned pin-spacers / Locomotive scroll artifacts
 * - Restores body scroll when no modal/menu is open
 */
(function () {
  'use strict';

  var LEGACY_ID = 'legacy-editorial';

  function isScrollLockedIntentionally() {
    var body = document.body;
    var html = document.documentElement;
    if (!body || !html) return false;

    if (body.classList.contains('menu-open')) return true;
    if (body.classList.contains('om-modal-open') || html.classList.contains('om-modal-open')) {
      return true;
    }

    var propertyModal = document.querySelector('[data-property-modal]');
    if (propertyModal && propertyModal.getAttribute('aria-hidden') === 'false') {
      return true;
    }

    var callbackModal = document.getElementById('callback-modal');
    if (callbackModal && !callbackModal.classList.contains('is-hidden')) {
      return true;
    }

    return false;
  }

  function reenableLegacyScroller() {
    var jq = window.jQuery || window.$;
    if (!jq || !jq.fn || typeof jq.fn.scroller !== 'function') return;

    try {
      jq('body').scroller('setDisabled', false);
    } catch (err) {
      /* legacy plugin optional */
    }
  }

  function clearScrollLocks() {
    if (isScrollLockedIntentionally()) return;

    var body = document.body;
    var html = document.documentElement;
    if (!body || !html) return;

    body.style.overflow = '';
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    body.style.touchAction = '';
    html.style.overflow = '';
    html.style.position = '';
    html.style.height = '';
    html.style.top = '';

    html.classList.remove(
      'has-scroll-smooth',
      'no-scroll-smooth',
      'is-preloader-active',
      'not-ready'
    );

    [
      'overflow-hidden',
      'is-locked',
      'modal-open',
      'scroll-locked',
    ].forEach(function (cls) {
      body.classList.remove(cls);
      html.classList.remove(cls);
    });
  }

  function removeLegacyEditorial() {
    var legacy = document.getElementById(LEGACY_ID);
    if (legacy && legacy.parentNode) {
      legacy.parentNode.removeChild(legacy);
    }

    document.querySelectorAll('.js-favourite-list-single').forEach(function (el) {
      el.style.display = 'none';
      el.style.height = '0';
      el.style.minHeight = '0';
      el.style.overflow = 'hidden';
      el.style.visibility = 'hidden';
      el.style.pointerEvents = 'none';
    });
  }

  function cleanupPinSpacers() {
    document.querySelectorAll('.pin-spacer').forEach(function (spacer) {
      var pin = spacer.querySelector('.pin-spacer-pin-wrapper, [data-pin-spacer]');
      if (!pin && spacer.offsetHeight > 0) {
        spacer.style.height = '0';
        spacer.style.minHeight = '0';
        spacer.style.margin = '0';
        spacer.style.padding = '0';
        spacer.style.pointerEvents = 'none';
      }
    });
  }

  function normalizeScrollContainers() {
    document.querySelectorAll('[data-scroll-container]').forEach(function (el) {
      el.style.height = 'auto';
      el.style.transform = 'none';
    });
  }

  function refreshScrollTriggers() {
    if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh) {
      ScrollTrigger.refresh(true);
    }
  }

  function run() {
    removeLegacyEditorial();
    clearScrollLocks();
    reenableLegacyScroller();
    cleanupPinSpacers();
    normalizeScrollContainers();
    refreshScrollTriggers();
  }

  function schedulePostLegacyRuns() {
    var queue = window.__staticHtmlScriptQueue;
    var afterQueue = queue && typeof queue.then === 'function' ? queue : Promise.resolve();

    afterQueue.then(function () {
      run();
      window.setTimeout(run, 0);
      window.setTimeout(run, 300);
      window.setTimeout(run, 1500);
      window.setTimeout(run, 3500);
    });
  }

  function watchLegacyScrollClasses() {
    if (!window.MutationObserver) return;

    var observer = new MutationObserver(function () {
      var html = document.documentElement;
      if (
        html.classList.contains('has-scroll-smooth') ||
        html.classList.contains('is-preloader-active') ||
        html.classList.contains('not-ready')
      ) {
        window.setTimeout(run, 0);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  window.omScrollGuard = { run: run, clearScrollLocks: clearScrollLocks };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  window.addEventListener('load', run, { once: true });
  window.addEventListener('hashchange', function () {
    window.setTimeout(run, 0);
  });
  window.addEventListener('pageshow', run);
  schedulePostLegacyRuns();
  watchLegacyScrollClasses();
})();
