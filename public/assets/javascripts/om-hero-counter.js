/**
 * OFF MARKET hero — editorial count-up counter
 * Stable on refresh: single RAF loop, cleanup, final-value fallback.
 */
(function () {
  'use strict';

  var activeRaf = null;
  var activeFallbackTimer = null;

  function clearCounterAnimation() {
    if (activeRaf !== null) {
      cancelAnimationFrame(activeRaf);
      activeRaf = null;
    }

    if (activeFallbackTimer !== null) {
      window.clearTimeout(activeFallbackTimer);
      activeFallbackTimer = null;
    }
  }

  function initHeroCounter() {
    var counter = document.querySelector('[data-hero-counter]');
    if (!counter) return;

    var numberEl = counter.querySelector('.mav-hero__counter-number');
    var target = Number(counter.dataset.counterTarget || '150');

    if (!numberEl || Number.isNaN(target)) return;

    var finalText = '+' + String(target);
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setCounterVisual(value) {
      numberEl.textContent = value;
      numberEl.dataset.counterVisual = value;
      numberEl.dataset.number = value;
    }

    function finish(value) {
      clearCounterAnimation();
      setCounterVisual(value);
      counter.dataset.counterInitialized = 'true';
      counter.dataset.counterComplete = 'true';

      var hero = counter.closest('.mav-hero');
      if (hero) {
        hero.classList.add('is-hero-content-ready');
      }
    }

    if (counter.dataset.counterComplete === 'true') {
      setCounterVisual(finalText);
      return;
    }

    var currentValue = numberEl.textContent || '';
    if (
      counter.dataset.counterInitialized === 'true' &&
      currentValue !== '+001' &&
      currentValue !== finalText
    ) {
      return;
    }

    clearCounterAnimation();

    if (prefersReducedMotion) {
      finish(finalText);
      return;
    }

    var duration = 1500;
    var start = 1;
    var startTime = performance.now();

    function formatCounter(value) {
      return '+' + String(value).padStart(3, '0');
    }

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function tick(now) {
      var progress = Math.min((now - startTime) / duration, 1);
      var eased = easeOutQuart(progress);
      var value = Math.round(start + (target - start) * eased);
      var formatted = progress === 1 ? finalText : formatCounter(value);

      setCounterVisual(formatted);

      if (progress < 1) {
        activeRaf = requestAnimationFrame(tick);
        return;
      }

      finish(finalText);
    }

    counter.dataset.counterInitialized = 'true';
    activeRaf = requestAnimationFrame(tick);

    activeFallbackTimer = window.setTimeout(function () {
      if (counter.dataset.counterComplete !== 'true') {
        finish(finalText);
      }
    }, duration + 400);
  }

  function boot() {
    requestAnimationFrame(function () {
      initHeroCounter();
    });
  }

  window.__mavHeroCounterBoot = boot;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  document.addEventListener('om-hero-boot', boot);

  window.addEventListener('pageshow', function (event) {
    if (!event.persisted) return;

    var counter = document.querySelector('[data-hero-counter]');
    if (counter) {
      counter.dataset.counterComplete = 'false';
      counter.dataset.counterInitialized = 'false';
    }

    boot();
  });

  if (typeof barba !== 'undefined' && barba.hooks && typeof barba.hooks.afterEnter === 'function') {
    barba.hooks.afterEnter(function () {
      var counter = document.querySelector('[data-hero-counter]');
      if (counter) {
        counter.dataset.counterComplete = 'false';
        counter.dataset.counterInitialized = 'false';
      }
      boot();
    });
  }
})();
