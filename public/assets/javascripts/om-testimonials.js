/**
 * OFF MARKET — Testimonial carousel (vanilla JS)
 */
(function () {
  'use strict';

  var TESTIMONIALS = [
    {
      quote:
        'Nous cherchions une opportunité claire, pas une liste de biens. OFF MARKET nous a aidés à comprendre l\u2019adresse, la demande et le potentiel avant même la première visite.',
      author: 'Acheteur privé',
      role: 'Résidence secondaire · Marrakech',
    },
    {
      quote:
        'La différence s\u2019est faite dans la lecture du marché : comparables, risques, marge de négociation et cohérence patrimoniale. La décision est devenue beaucoup plus simple.',
      author: 'Investisseur',
      role: 'Appartement premium · Guéliz / Hivernage',
    },
    {
      quote:
        'Nous avons apprécié la discrétion, le tri et la qualité des échanges. Les biens présentés étaient peu nombreux, mais réellement alignés avec notre projet.',
      author: 'Client accompagné',
      role: 'Riad de caractère · Médina',
    },
  ];

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function isFinePointer() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatQuoteHtml(text) {
    var placeholder = '___OFF_MARKET___';
    var normalized = text.replace(/OFF MARKET/g, placeholder);
    var words = normalized.trim().split(/\s+/);
    var html = '';
    var wordIndex = 0;

    words.forEach(function (word) {
      if (word === placeholder) {
        html +=
          '<span class="om-brand-inline" style="--word-index:' +
          wordIndex +
          '">OFF MARKET</span> ';
      } else {
        html +=
          '<span style="--word-index:' +
          wordIndex +
          '">' +
          escapeHtml(word) +
          '</span> ';
      }
      wordIndex += 1;
    });

    return html;
  }

  function initCard(card) {
    var activeIndex = 0;
    var quoteEl = card.querySelector('[data-testimonial-quote]');
    var authorEl = card.querySelector('[data-testimonial-author]');
    var roleEl = card.querySelector('[data-testimonial-role]');
    var authorBlock = card.querySelector('.om-testimonial-card__author');
    var currentEl = card.querySelector('[data-testimonial-current]');
    var progressEl = card.querySelector('[data-testimonial-progress]');
    var dots = card.querySelectorAll('.om-testimonial-card__dots span');
    var cursor = card.querySelector('.om-testimonial-card__cursor');
    var reducedMotion = prefersReducedMotion();
    var useCursor = cursor && isFinePointer() && !reducedMotion;

    if (!quoteEl || !authorEl || !roleEl || !currentEl || !progressEl) {
      return;
    }

    function renderTestimonial(animate) {
      var item = TESTIMONIALS[activeIndex];

      if (animate && !reducedMotion) {
        quoteEl.classList.remove('is-visible');
        if (authorBlock) {
          authorBlock.classList.add('is-fading');
        }
      }

      function applyContent() {
        quoteEl.innerHTML = formatQuoteHtml(item.quote);
        authorEl.textContent = item.author;
        roleEl.textContent = item.role;
        currentEl.textContent = String(activeIndex + 1).padStart(2, '0');
        progressEl.style.width =
          ((activeIndex + 1) / TESTIMONIALS.length) * 100 + '%';

        dots.forEach(function (dot, index) {
          dot.classList.toggle('is-active', index === activeIndex);
        });

        if (authorBlock) {
          authorBlock.classList.remove('is-fading');
        }

        if (reducedMotion) {
          quoteEl.classList.add('is-visible');
          return;
        }

        requestAnimationFrame(function () {
          quoteEl.classList.add('is-visible');
        });
      }

      if (animate && !reducedMotion) {
        window.setTimeout(applyContent, 140);
      } else {
        applyContent();
      }
    }

    function goNext() {
      activeIndex = (activeIndex + 1) % TESTIMONIALS.length;
      renderTestimonial(true);
    }

    card.addEventListener('click', goNext);

    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        goNext();
      }
    });

    if (useCursor) {
      card.addEventListener('mouseenter', function () {
        card.classList.add('is-hovered');
      });

      card.addEventListener('mouseleave', function () {
        card.classList.remove('is-hovered');
      });

      card.addEventListener('mousemove', function (event) {
        var rect = card.getBoundingClientRect();
        cursor.style.left = event.clientX - rect.left + 'px';
        cursor.style.top = event.clientY - rect.top + 'px';
      });
    } else {
      card.style.cursor = 'pointer';
    }

    renderTestimonial(false);
  }

  function init() {
    document.querySelectorAll('[data-testimonial-card]').forEach(initCard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
