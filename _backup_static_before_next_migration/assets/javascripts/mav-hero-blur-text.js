/**
 * Mavericks hero — BlurText-style word reveal (vanilla JS)
 */
(function () {
  'use strict';

  function initHeroBlurText() {
    var hero = document.querySelector('.mav-hero');
    if (!hero) return;

    var blurTextElements = hero.querySelectorAll('[data-blur-text]');
    var fadeElements = hero.querySelectorAll('[data-blur-fade]');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      blurTextElements.forEach(function (element) {
        element.classList.add('is-blur-ready', 'is-blur-visible');
      });

      fadeElements.forEach(function (element) {
        element.classList.add('is-blur-fade-visible');
      });

      return;
    }

    blurTextElements.forEach(function (element) {
      if (element.dataset.blurInitialized === 'true') return;

      var originalNodes = Array.from(element.childNodes);
      var fragment = document.createDocumentFragment();
      var wordIndex = 0;

      originalNodes.forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
          var parts = node.textContent.split(/(\s+)/);

          parts.forEach(function (part) {
            if (!part) return;

            if (/^\s+$/.test(part)) {
              fragment.appendChild(document.createTextNode(part));
              return;
            }

            var span = document.createElement('span');
            span.className = 'mav-blur-word';
            span.textContent = part;
            span.style.setProperty('--blur-word-index', wordIndex);
            wordIndex += 1;
            fragment.appendChild(span);
          });
        }

        if (node.nodeName === 'BR') {
          fragment.appendChild(document.createElement('br'));
        }

        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'BR') {
          var wrapper = document.createElement(node.tagName.toLowerCase());
          Array.from(node.attributes).forEach(function (attr) {
            wrapper.setAttribute(attr.name, attr.value);
          });

          var innerParts = node.textContent.split(/(\s+)/);

          innerParts.forEach(function (part) {
            if (!part) return;

            if (/^\s+$/.test(part)) {
              wrapper.appendChild(document.createTextNode(part));
              return;
            }

            var innerSpan = document.createElement('span');
            innerSpan.className = 'mav-blur-word';
            innerSpan.textContent = part;
            innerSpan.style.setProperty('--blur-word-index', wordIndex);
            wordIndex += 1;
            wrapper.appendChild(innerSpan);
          });

          fragment.appendChild(wrapper);
        }
      });

      element.replaceChildren(fragment);
      element.dataset.blurInitialized = 'true';
      element.style.setProperty('--blur-word-count', wordIndex);
      element.classList.add('is-blur-ready');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          var target = entry.target;

          if (target.hasAttribute('data-blur-text')) {
            target.classList.add('is-blur-visible');
          }

          if (target.hasAttribute('data-blur-fade')) {
            target.classList.add('is-blur-fade-visible');
          }

          observer.unobserve(target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    blurTextElements.forEach(function (element) {
      if (element.dataset.blurObserved === 'true') return;
      observer.observe(element);
      element.dataset.blurObserved = 'true';
    });

    fadeElements.forEach(function (element) {
      if (element.dataset.blurObserved === 'true') return;
      observer.observe(element);
      element.dataset.blurObserved = 'true';
    });
  }

  function boot() {
    initHeroBlurText();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  if (typeof barba !== 'undefined' && barba.hooks && typeof barba.hooks.afterEnter === 'function') {
    barba.hooks.afterEnter(function () {
      initHeroBlurText();
    });
  }
})();
