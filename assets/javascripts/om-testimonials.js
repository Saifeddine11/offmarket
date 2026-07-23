/**
 * OFF MARKET — Testimonial carousel (vanilla JS)
 */
(function () {
  'use strict';

  var TESTIMONIALS_BY_LOCALE = {
    fr: [
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
    ],
    en: [
      {
        quote:
          'We were looking for a clear opportunity, not a property list. OFF MARKET helped us understand the address, demand and potential before the first visit.',
        author: 'Private buyer',
        role: 'Second home · Marrakech',
      },
      {
        quote:
          'The difference came from the market reading: comparables, risks, negotiation margin and long-term coherence. The decision became much simpler.',
        author: 'Investor',
        role: 'Premium apartment · Guéliz / Hivernage',
      },
      {
        quote:
          'We appreciated the discretion, filtering and quality of the conversations. The properties shown were few, but genuinely aligned with our project.',
        author: 'Supported client',
        role: 'Character riad · Medina',
      },
    ],
    es: [
      {
        quote:
          'Buscábamos una oportunidad clara, no una lista de inmuebles. OFF MARKET nos ayudó a entender la dirección, la demanda y el potencial incluso antes de la primera visita.',
        author: 'Comprador privado',
        role: 'Residencia secundaria · Marrakech',
      },
      {
        quote:
          'La diferencia estuvo en la lectura del mercado: comparables, riesgos, margen de negociación y coherencia patrimonial. La decisión se volvió mucho más sencilla.',
        author: 'Inversor',
        role: 'Apartamento premium · Guéliz / Hivernage',
      },
      {
        quote:
          'Apreciamos la discreción, el filtro y la calidad de los intercambios. Los inmuebles presentados eran pocos, pero realmente alineados con nuestro proyecto.',
        author: 'Cliente acompañado',
        role: 'Riad con carácter · Medina',
      },
    ],
    nl: [
      {
        quote:
          'Wij zochten een duidelijke kans, geen lijst met panden. OFF MARKET hielp ons het adres, de vraag en het potentieel te begrijpen nog vóór het eerste bezoek.',
        author: 'Private koper',
        role: 'Tweede verblijf · Marrakech',
      },
      {
        quote:
          'Het verschil zat in de marktlezing: vergelijkbare panden, risico\u2019s, onderhandelingsruimte en patrimoniale samenhang. De beslissing werd veel eenvoudiger.',
        author: 'Investeerder',
        role: 'Premium appartement · Guéliz / Hivernage',
      },
      {
        quote:
          'Wij waardeerden de discretie, de filtering en de kwaliteit van de gesprekken. Er werden weinig panden voorgesteld, maar ze sloten echt aan bij ons project.',
        author: 'Begeleide klant',
        role: 'Karaktervolle riad · Medina',
      },
    ],
    it: [
      {
        quote:
          'Cercavamo un’opportunità chiara, non un elenco di immobili. OFF MARKET ci ha aiutati a comprendere l’indirizzo, la domanda e il potenziale prima ancora della prima visita.',
        author: 'Acquirente privato',
        role: 'Seconda casa · Marrakech',
      },
      {
        quote:
          'La differenza è stata nella lettura del mercato: comparabili, rischi, margine di negoziazione e coerenza patrimoniale. La decisione è diventata molto più semplice.',
        author: 'Investitore',
        role: 'Appartamento premium · Guéliz / Hivernage',
      },
      {
        quote:
          'Abbiamo apprezzato la discrezione, la selezione e la qualità degli scambi. Gli immobili presentati erano pochi, ma realmente in linea con il nostro progetto.',
        author: 'Cliente accompagnato',
        role: 'Riad di carattere · Medina',
      },
    ],
    no: [
      {
        quote:
          'Vi lette etter en tydelig mulighet, ikke en liste med eiendommer. OFF MARKET hjalp oss med å forstå adressen, etterspørselen og potensialet før første visning.',
        author: 'Privat kjøper',
        role: 'Sekundærbolig · Marrakech',
      },
      {
        quote:
          'Forskjellen lå i markedsforståelsen: sammenlignbare eiendommer, risiko, forhandlingsrom og langsiktig verdi. Beslutningen ble langt enklere.',
        author: 'Investor',
        role: 'Premiumleilighet · Guéliz / Hivernage',
      },
      {
        quote:
          'Vi satte pris på diskresjonen, filtreringen og kvaliteten i dialogen. Eiendommene som ble presentert var få, men reelt tilpasset prosjektet vårt.',
        author: 'Kunde med rådgivning',
        role: 'Riad med særpreg · Medina',
      },
    ],
  };

  function isLocalePath(path, locale) {
    return path === '/' + locale || path.indexOf('/' + locale + '/') === 0;
  }

  function detectLocale() {
    var path = window.location.pathname || '/';
    if (isLocalePath(path, 'en')) return 'en';
    if (isLocalePath(path, 'es')) return 'es';
    if (isLocalePath(path, 'it')) return 'it';
    if (isLocalePath(path, 'nl')) return 'nl';
    if (isLocalePath(path, 'no')) return 'no';
    return 'fr';
  }

  function getTestimonials() {
    return TESTIMONIALS_BY_LOCALE[detectLocale()] || TESTIMONIALS_BY_LOCALE.fr;
  }

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
    var testimonials = getTestimonials();

    if (!quoteEl || !authorEl || !roleEl || !currentEl || !progressEl) {
      return;
    }

    function renderTestimonial(animate) {
      var item = testimonials[activeIndex];

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
          ((activeIndex + 1) / testimonials.length) * 100 + '%';

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
      activeIndex = (activeIndex + 1) % testimonials.length;
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
