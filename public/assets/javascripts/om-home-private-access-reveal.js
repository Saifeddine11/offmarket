/**
 * OFF MARKET — Homepage private access section entrance reveal
 * Framer Motion–style stagger: text split + fade/blur/slide (GSAP, no React).
 *
 * Idempotent + fail-safe: never leave the section stuck at opacity: 0 after refresh.
 */
(function () {
  'use strict';

  var SECTION_SELECTOR = '.om-home-private-access';
  var VISIBILITY_THRESHOLD = 0.18;
  var FAILSAFE_MS = 2200;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function clearInlineMotion(section) {
    if (typeof gsap !== 'undefined') {
      var nodes = section.querySelectorAll(
        '.om-home-private-access__eyebrow, .om-home-private-access__subtitle, .om-private-access-form--embedded, .om-pa-word__inner'
      );
      gsap.set(nodes, { clearProps: 'opacity,transform,filter,y,yPercent,scale' });
    } else {
      section
        .querySelectorAll(
          '.om-home-private-access__eyebrow, .om-home-private-access__subtitle, .om-private-access-form--embedded, .om-pa-word__inner'
        )
        .forEach(function (node) {
          node.style.removeProperty('opacity');
          node.style.removeProperty('transform');
          node.style.removeProperty('filter');
        });
    }
  }

  function splitTitle(titleEl) {
    if (!titleEl) return [];

    if (titleEl.dataset.paSplit === 'true') {
      return titleEl.querySelectorAll('.om-pa-word__inner');
    }

    var text = titleEl.textContent.trim();
    if (!text) return [];

    titleEl.dataset.paSplit = 'true';
    titleEl.dataset.paOriginalText = text;
    titleEl.setAttribute('aria-label', text);

    titleEl.innerHTML = text
      .split(/\s+/)
      .filter(Boolean)
      .map(function (word) {
        var safe = escapeHtml(word);
        return (
          '<span class="om-pa-word" aria-hidden="true">' +
          '<span class="om-pa-word__inner">' +
          safe +
          '</span>' +
          '</span>'
        );
      })
      .join(' ');

    return titleEl.querySelectorAll('.om-pa-word__inner');
  }

  function markAnimated(section, className) {
    section.classList.add(className || 'is-animated');
    section.classList.remove('is-animating');
    clearInlineMotion(section);
  }

  function prepareSection(section) {
    var eyebrow = section.querySelector('.om-home-private-access__eyebrow');
    var title = section.querySelector('.om-home-private-access__title');
    var subtitle = section.querySelector('.om-home-private-access__subtitle');
    var form = section.querySelector('.om-private-access-form--embedded');
    var words = splitTitle(title);

    if (
      section.classList.contains('is-animated') ||
      section.classList.contains('is-animated-reduced') ||
      section.classList.contains('is-animated-fallback')
    ) {
      clearInlineMotion(section);
      return null;
    }

    if (prefersReducedMotion()) {
      markAnimated(section, 'is-animated-reduced');
      return null;
    }

    if (typeof gsap === 'undefined') {
      markAnimated(section, 'is-animated-fallback');
      return null;
    }

    gsap.set([eyebrow, subtitle, form].filter(Boolean), {
      opacity: 0,
      y: 24,
    });

    gsap.set(form, {
      scale: 0.985,
      filter: 'blur(10px)',
      transformOrigin: '50% 50%',
    });

    gsap.set(subtitle, {
      filter: 'blur(8px)',
    });

    if (words.length) {
      gsap.set(words, {
        yPercent: 112,
        opacity: 0,
      });
    }

    return { eyebrow: eyebrow, words: words, subtitle: subtitle, form: form };
  }

  function animateSection(section, targets) {
    if (
      !targets ||
      section.classList.contains('is-animated') ||
      section.classList.contains('is-animating') ||
      section.classList.contains('is-animated-fallback') ||
      section.classList.contains('is-animated-reduced')
    ) {
      return;
    }

    section.classList.add('is-animating');

    var tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: function () {
        markAnimated(section);
      },
    });

    if (targets.eyebrow) {
      tl.to(targets.eyebrow, {
        opacity: 1,
        y: 0,
        duration: 0.58,
      });
    }

    if (targets.words && targets.words.length) {
      tl.to(
        targets.words,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.68,
          stagger: 0.045,
          ease: 'power4.out',
        },
        '-=0.3'
      );
    }

    if (targets.subtitle) {
      tl.to(
        targets.subtitle,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.74,
        },
        '-=0.34'
      );
    }

    if (targets.form) {
      tl.to(
        targets.form,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.92,
          ease: 'power2.out',
        },
        '-=0.5'
      );
    }
  }

  function tryReveal(section, targets) {
    if (
      section.classList.contains('is-animated') ||
      section.classList.contains('is-animated-fallback') ||
      section.classList.contains('is-animated-reduced')
    ) {
      return true;
    }
    if (!targets || !isVisibleEnough(section)) return false;
    animateSection(section, targets);
    return (
      section.classList.contains('is-animating') ||
      section.classList.contains('is-animated')
    );
  }

  function isVisibleEnough(el) {
    var rect = el.getBoundingClientRect();
    if (!rect.height) return false;

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var visible = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));

    return visible >= rect.height * VISIBILITY_THRESHOLD;
  }

  function armFailsafe(section) {
    if (section.dataset.paFailsafe === 'true') return;
    section.dataset.paFailsafe = 'true';

    window.setTimeout(function () {
      if (
        section.classList.contains('is-animated') ||
        section.classList.contains('is-animating') ||
        section.classList.contains('is-animated-reduced') ||
        section.classList.contains('is-animated-fallback')
      ) {
        return;
      }
      markAnimated(section, 'is-animated-fallback');
    }, FAILSAFE_MS);
  }

  function watchSection(section, targets) {
    if (section.dataset.paRevealBound === 'true') {
      armFailsafe(section);
      return;
    }
    section.dataset.paRevealBound = 'true';
    armFailsafe(section);

    if (!targets) return;

    var observer;
    var pollId;
    var rafId;

    function cleanup() {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('scroll', onScroll, true);
      if (pollId) clearInterval(pollId);
      if (rafId) cancelAnimationFrame(rafId);
    }

    function onScroll() {
      if (tryReveal(section, targets)) cleanup();
    }

    if (tryReveal(section, targets)) return;

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) onScroll();
        });
      },
      {
        threshold: [0, 0.05, 0.12, VISIBILITY_THRESHOLD, 0.35, 0.6],
        rootMargin: '0px 0px -2% 0px',
      }
    );

    observer.observe(section);
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);

    pollId = window.setInterval(onScroll, 300);
    window.setTimeout(function () {
      if (pollId) clearInterval(pollId);
    }, 15000);

    if (window.location.hash === '#acces-off-market') {
      window.setTimeout(onScroll, 150);
      window.setTimeout(onScroll, 600);
      window.setTimeout(onScroll, 1200);
    }

    (function rafLoop() {
      onScroll();
      if (
        !section.classList.contains('is-animated') &&
        !section.classList.contains('is-animating') &&
        !section.classList.contains('is-animated-fallback')
      ) {
        rafId = requestAnimationFrame(rafLoop);
      }
    })();
  }

  function init() {
    document.querySelectorAll(SECTION_SELECTOR).forEach(function (section) {
      var targets = prepareSection(section);
      section._paRevealTargets = targets;
      watchSection(section, targets);
    });
  }

  window.__omPrivateAccessRevealBoot = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
