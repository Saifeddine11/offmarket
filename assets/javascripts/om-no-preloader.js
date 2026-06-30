/**
 * OFF MARKET — disable legacy template preloader, Barba page transitions, and reveal gates.
 * Load synchronously before shared.js on legacy template pages.
 */
(function () {
  'use strict';

  var html = document.documentElement;
  html.classList.add('is-preloader-disabled', 'js-no-reveal');
  html.classList.remove('not-ready', 'is-preloader-active', 'has-scroll-smooth', 'no-scroll-smooth');

  function stripBarba(root) {
    if (!root) return;
    root.removeAttribute('data-barba');
    root.removeAttribute('data-barba-namespace');
    root.querySelectorAll('[data-barba]').forEach(function (el) {
      el.removeAttribute('data-barba');
      el.removeAttribute('data-barba-namespace');
    });
  }

  function dismissPreloader(root) {
    root.querySelectorAll('.js-preloader').forEach(function (el) {
      el.removeAttribute('data-plugin');
      el.setAttribute('data-preloader-visible', 'false');
      el.style.display = 'none';
      el.classList.add('is-hidden');
    });

    root.querySelectorAll('[data-reveal="preloader"]').forEach(function (el) {
      el.setAttribute('data-reveal-visible', 'true');
    });

    var chrome = root.getElementById ? root.getElementById('mv-chrome') : document.getElementById('mv-chrome');
    if (chrome) {
      chrome.classList.remove('is-preloader-hidden');
    }
  }

  function boot() {
    stripBarba(document.body);
    dismissPreloader(document);
    html.classList.remove('not-ready', 'is-preloader-active');
  }

  if (document.body) {
    boot();
  } else {
    document.addEventListener('DOMContentLoaded', boot);
  }
})();
