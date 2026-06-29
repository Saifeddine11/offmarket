/**
 * Mavericks hero — editorial count-up counter
 */
(function () {
  'use strict';

  function initHeroCounter() {
    var counter = document.querySelector('[data-hero-counter]');
    if (!counter) return;
    if (counter.dataset.counterInitialized === 'true') return;

    var numberEl = counter.querySelector('.mav-hero__counter-number');
    var target = Number(counter.dataset.counterTarget || '150');

    if (!numberEl || Number.isNaN(target)) return;

    counter.dataset.counterInitialized = 'true';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setCounterVisual(value) {
      numberEl.textContent = value;
      numberEl.dataset.counterVisual = value;
      numberEl.dataset.number = value;
    }

    function formatCounter(value) {
      return '+' + String(value).padStart(3, '0');
    }

    if (prefersReducedMotion) {
      setCounterVisual('+' + target);
      return;
    }

    var duration = 1500;
    var start = 1;
    var startTime = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function tick(now) {
      var progress = Math.min((now - startTime) / duration, 1);
      var eased = easeOutQuart(progress);
      var value = Math.round(start + (target - start) * eased);
      var formatted = progress === 1 ? '+' + target : formatCounter(value);

      setCounterVisual(formatted);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  function boot() {
    initHeroCounter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  if (typeof barba !== 'undefined' && barba.hooks && typeof barba.hooks.afterEnter === 'function') {
    barba.hooks.afterEnter(function () {
      initHeroCounter();
    });
  }
})();
