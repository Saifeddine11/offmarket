/**
 * OffMarket — TextRevealByWord-style scroll reveal (vanilla JS + GSAP ScrollTrigger)
 *
 * Idempotent: never re-split already wrapped markup (refresh / Strict Mode safe).
 */
(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function buildWordMarkup(words) {
    return words
      .map(function (word) {
        var safe = escapeHtml(word);
        return (
          '<span class="om-word-reveal__word" aria-hidden="true">' +
          '<span class="om-word-reveal__ghost">' +
          safe +
          '</span>' +
          '<span class="om-word-reveal__fill">' +
          safe +
          '</span>' +
          '</span>'
        );
      })
      .join(' ');
  }

  function getScrollConfig(el) {
    if (el.dataset.wordRevealMode === 'video') {
      var section = document.querySelector('.om-cinematic-video');
      return {
        trigger: section || el,
        start: 'top 30%',
        end: 'bottom 50%',
        scrub: 0.75,
      };
    }

    var section = el.closest('#qui-sommes-nous');
    return {
      trigger: section || el,
      start: 'top 78%',
      end: 'bottom 38%',
      scrub: 0.8,
    };
  }

  function markComplete(el) {
    el.classList.add('is-word-reveal-complete');
  }

  function readOriginalText(el) {
    if (el.dataset.wordRevealText) {
      return el.dataset.wordRevealText.trim();
    }

    var accessible = el.querySelector('.om-word-reveal__accessible');
    if (accessible) {
      return accessible.textContent.trim();
    }

    return el.textContent.trim();
  }

  function bindScrollReveal(el) {
    if (prefersReducedMotion()) {
      markComplete(el);
      return;
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      markComplete(el);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var fills = el.querySelectorAll('.om-word-reveal__fill');
    if (!fills.length) {
      markComplete(el);
      return;
    }

    var config = getScrollConfig(el);
    var step = 1 / Math.max(fills.length, 1);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: config.trigger,
          start: config.start,
          end: config.end,
          scrub: config.scrub,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onLeave: function () {
            markComplete(el);
          },
          onLeaveBack: function () {
            el.classList.remove('is-word-reveal-complete');
          },
        },
      })
      .to(
        fills,
        {
          opacity: 1,
          ease: 'none',
          duration: step,
          stagger: {
            each: step,
            ease: 'none',
          },
        },
        0
      );
  }

  function initElement(el) {
    if (el.closest('.about-who') || el.closest('[data-no-word-reveal]')) return;

    // Already wrapped — do not re-read textContent (ghost+fill would duplicate words).
    if (
      el.dataset.wordRevealReady === 'true' ||
      el.classList.contains('om-word-reveal') ||
      el.querySelector('.om-word-reveal__accessible')
    ) {
      el.dataset.wordRevealReady = 'true';
      el.classList.add('om-word-reveal');
      if (!el._omWordRevealBound) {
        el._omWordRevealBound = true;
        bindScrollReveal(el);
      }
      return;
    }

    var originalText = readOriginalText(el);
    if (!originalText) return;

    el.dataset.wordRevealReady = 'true';
    el.dataset.wordRevealText = originalText;
    el.removeAttribute('aria-label');

    var words = originalText.split(/\s+/).filter(Boolean);
    el.innerHTML =
      '<span class="om-word-reveal__accessible">' +
      escapeHtml(originalText) +
      '</span>' +
      '<span class="om-word-reveal__visual" aria-hidden="true">' +
      buildWordMarkup(words) +
      '</span>';
    el.classList.add('om-word-reveal');
    el._omWordRevealBound = true;
    bindScrollReveal(el);
  }

  function init() {
    if (prefersReducedMotion()) {
      document.documentElement.classList.add('om-reduced-motion');
    }

    document.querySelectorAll('[data-word-reveal]').forEach(initElement);
  }

  window.__omTextRevealBoot = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
