/**
 * Location page — static fallback until animation assets are complete.
 *
 * Enables readable document flow without:
 * - preloader / reveal / appear plugin gates
 * - Locomotive sticky scroll (300vh spacer sections)
 * - 3D pano tour (tour.js + pano/tour.js — disabled in HTML)
 *
 * When animation pack is ready:
 * 1. Remove class om-location-static from <html>
 * 2. Re-enable tour.js + pano/tour.js in location/index.html
 * 3. Remove or narrow this boot script
 */
(function () {
  'use strict';

  var STATIC = true;

  function hydrateLazyMedia(root) {
    root.querySelectorAll('img[data-src], source[data-srcset]').forEach(function (el) {
      var dataSrc = el.getAttribute('data-src');
      var dataSrcset = el.getAttribute('data-srcset');
      if (dataSrc && (!el.getAttribute('src') || el.getAttribute('src').indexOf('data:image') === 0)) {
        el.setAttribute('src', dataSrc);
      }
      if (dataSrcset && !el.getAttribute('srcset')) {
        el.setAttribute('srcset', dataSrcset);
      }
      el.classList.remove('is-invisible--js');
    });
  }

  function forceReveals(root) {
    root.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.setAttribute('data-reveal-visible', 'true');
    });
  }

  function dismissPreloader() {
    var html = document.documentElement;
    html.classList.remove('not-ready', 'is-preloader-active', 'has-scroll-smooth', 'no-scroll-smooth');
    html.classList.add('is-preloader-disabled', 'js-no-reveal', 'om-location-static');

    var preloader = document.querySelector('.js-preloader');
    if (preloader) {
      preloader.classList.add('is-hidden');
      preloader.setAttribute('data-preloader-visible', 'false');
      preloader.style.display = 'none';
    }

    var chrome = document.getElementById('mv-chrome');
    if (chrome) chrome.classList.add('is-preloader-hidden');

    var consent = document.getElementById('cookie-consent');
    if (consent && document.cookie.indexOf('cookieConsentStatus=') === -1) {
      consent.classList.add('is-hidden');
      html.classList.remove('with-cookie-consent');
    }
  }

  function flattenStickySections(root) {
    if (!STATIC) return;

    root.querySelectorAll('.sticky--under-previous, .sticky--under-next').forEach(function (el) {
      el.classList.remove('sticky--under-previous', 'sticky--under-next');
    });

    root.querySelectorAll('[data-scroll-sticky], [data-scroll]').forEach(function (el) {
      el.removeAttribute('data-scroll-sticky');
      el.removeAttribute('data-scroll');
    });

    root.querySelectorAll('.lo-intro, .lo-video, .lo-map, .lo-parks, .lo-perspective, .lo-photos, .lo-slider, .lo-slider-sticky').forEach(function (el) {
      el.style.height = 'auto';
      el.style.minHeight = '0';
      el.style.marginTop = '0';
      el.style.marginBottom = '0';
      el.style.clipPath = 'none';
    });

    root.querySelectorAll('.sticky__layer--sticky').forEach(function (el) {
      el.style.position = 'relative';
      el.style.top = 'auto';
      el.style.height = 'auto';
    });

    var introContent = root.querySelector('.lo-intro__content');
    if (introContent) {
      introContent.style.minHeight = '100svh';
      introContent.style.height = 'auto';
    }

    root.querySelectorAll('.lo-intro__content .background, .lo-intro__caption').forEach(function (el) {
      el.style.clipPath = 'none';
      el.style.webkitClipPath = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  function neutralizeScrollHiding(root) {
    root.querySelectorAll('[data-scroll-section], [data-scroll]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.pointerEvents = 'auto';
    });
  }

  function enableVideos(root) {
    root.querySelectorAll('.lo-video video').forEach(function (video) {
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.muted = true;
      video.setAttribute('preload', 'metadata');
    });
  }

  function enable() {
    var root = document;
    dismissPreloader();
    hydrateLazyMedia(root);
    forceReveals(root);
    flattenStickySections(root);
    neutralizeScrollHiding(root);
    enableVideos(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enable);
  } else {
    enable();
  }

  window.addEventListener('load', enable, { once: true });
  setTimeout(enable, 300);
})();
