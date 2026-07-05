/**
 * OffMarket — Arc Reveal hero intro
 * Vanilla JS adaptation of ArcRevealHero for the static homepage.
 * Greeting words → curved SVG curtain reveal → existing gallery hero underneath.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'offmarket-arc-reveal';
  var GREETINGS = [
    { text: 'Privé.', accent: false },
    { text: 'Rare.', accent: false },
    { text: 'OffMarket.', accent: true },
  ];

  var EASE = [0.85, 0, 0.15, 1];
  var WORD_ENTER_MS = 180;
  var WORD_HOLD_MS = 260;
  var WORD_EXIT_MS = 180;
  var ARC_REVEAL_MS = 780;
  var FADE_OUT_MS = 140;
  var ARC_HANDOFF_MS = 20;
  var FAILSAFE_MS = 16000;

  var root = document.getElementById('offmarket-arc-reveal');
  if (!root) return;

  function shouldSkip() {
    if (window.OFFMARKET_ARC_REVEAL_DISABLED === true) return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return true;
    } catch (e) {
      /* ignore */
    }
    return false;
  }

  function cubicBezierEase(t) {
    /* Approximation of cubic-bezier(0.85, 0, 0.15, 1) */
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function buildCurtainPath(width, height, progress) {
    var p = Math.max(0, Math.min(1, progress));
    var revealY = height * (1 - p);
    var curveDepth = Math.min(height * 0.22, 200) * (1 - p * 0.25);
    var controlY = revealY - curveDepth;
    return (
      'M 0 0 H ' +
      width +
      ' V ' +
      revealY +
      ' Q ' +
      width / 2 +
      ' ' +
      controlY +
      ' 0 ' +
      revealY +
      ' Z'
    );
  }

  function animateValue(duration, onUpdate, onComplete) {
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      onUpdate(cubicBezierEase(t));
      if (t < 1) {
        requestAnimationFrame(frame);
      } else if (onComplete) {
        onComplete();
      }
    }
    requestAnimationFrame(frame);
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, ms);
    });
  }

  function setWord(el, item) {
    el.textContent = item.text;
    el.classList.toggle('is-accent', !!item.accent);
  }

  function animateWord(el, fromY, toY, fromOpacity, toOpacity, duration) {
    if (typeof gsap !== 'undefined') {
      return new Promise(function (resolve) {
        gsap.fromTo(
          el,
          { y: fromY, opacity: fromOpacity },
          { y: toY, opacity: toOpacity, duration: duration / 1000, ease: 'power2.out', onComplete: resolve },
        );
      });
    }

    return new Promise(function (resolve) {
      var start = null;
      function frame(ts) {
        if (!start) start = ts;
        var t = Math.min(1, (ts - start) / duration);
        var e = cubicBezierEase(t);
        el.style.transform = 'translateY(' + (fromY + (toY - fromY) * e) + 'px)';
        el.style.opacity = String(fromOpacity + (toOpacity - fromOpacity) * e);
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  function releasePage() {
    var html = document.documentElement;
    var preloader = document.querySelector('[data-plugin*="preloaderLanding"]');

    html.classList.remove('is-arc-reveal-pending', 'is-arc-reveal-active', 'is-preloader-active', 'not-ready');
    html.classList.add('is-intro-seen', 'is-preloader-disabled', 'is-header-visible');

    if (preloader) {
      preloader.classList.add('is-hidden');
      preloader.setAttribute('aria-hidden', 'true');
    }

    document.body.style.overflow = '';

    if (window.jQuery) {
      try {
        window.jQuery('html').removeClass('is-preloader-active').addClass('is-intro-seen is-preloader-disabled');
        if (window.jQuery('body').scroller) {
          window.jQuery('body').scroller('setDisabled', false);
        }
      } catch (e) {
        /* ignore */
      }
    }

    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {
      /* ignore */
    }
  }

  function teardown() {
    releasePage();
    if (root && root.parentNode) {
      root.parentNode.removeChild(root);
    }
  }

  function finishSkip() {
    root.parentNode && root.parentNode.removeChild(root);
    document.documentElement.classList.remove('is-arc-reveal-pending', 'is-arc-reveal-active');
  }

  async function runSequence() {
    var wordEl = root.querySelector('[data-arc-greeting]');
    var pathEl = root.querySelector('.om-arc-reveal__path');
    var svgEl = root.querySelector('.om-arc-reveal__curtain');
    if (!wordEl || !pathEl || !svgEl) {
      teardown();
      return;
    }

    document.documentElement.classList.add('is-arc-reveal-active');
    document.body.style.overflow = 'hidden';

    var failsafe = window.setTimeout(teardown, FAILSAFE_MS);

    function resizeSvg() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      svgEl.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      pathEl.setAttribute('d', buildCurtainPath(w, h, 0));
    }

    resizeSvg();
    window.addEventListener('resize', resizeSvg);

    try {
      for (var i = 0; i < GREETINGS.length; i++) {
        setWord(wordEl, GREETINGS[i]);
        await animateWord(wordEl, 28, 0, 0, 1, WORD_ENTER_MS);
        await wait(WORD_HOLD_MS);
        if (i < GREETINGS.length - 1) {
          await animateWord(wordEl, 0, -28, 1, 0, WORD_EXIT_MS);
        }
      }

      root.classList.add('is-revealing');

      var w = window.innerWidth;
      var h = window.innerHeight;
      resizeSvg();
      pathEl.setAttribute('d', buildCurtainPath(w, h, 0));

      await wait(ARC_HANDOFF_MS);

      await new Promise(function (resolve) {
        animateValue(
          ARC_REVEAL_MS,
          function (p) {
            pathEl.setAttribute('d', buildCurtainPath(w, h, p));
          },
          resolve,
        );
      });

      root.classList.add('is-fading');
      await wait(FADE_OUT_MS);

      window.clearTimeout(failsafe);
      window.removeEventListener('resize', resizeSvg);
      teardown();
    } catch (e) {
      window.clearTimeout(failsafe);
      teardown();
    }
  }

  if (shouldSkip()) {
    finishSkip();
    return;
  }

  root.removeAttribute('hidden');
  runSequence();
})();
