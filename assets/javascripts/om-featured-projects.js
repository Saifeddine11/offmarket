/**
 * OffMarket — Biens accessibles sur dossier
 * Filter toggle + reusable reveal property cards
 */
(function () {
  'use strict';

  var propertyCards = [
    {
      id: 'villa-marrakech',
      index: '01',
      location: 'MARRAKECH',
      type: 'Villa',
      price: '320 000 €',
      selection: 'Villa sur plan',
      title: 'Villa privée sur plan à Marrakech',
      meta: '238 m² · R+1 · 3 suites · rooftop · piscine privée',
      image: '/assets/images/hero/mavericks-hero-villa.webp',
      alt: 'Villa privée sur plan à Marrakech',
      href: '#contact',
      overlayLine: 'Villa sur plan',
      overlayTitle: 'Villa privée sur plan à Marrakech',
    },
    {
      id: 'appartement-gueliz',
      index: '02',
      location: 'MARRAKECH',
      type: 'Appartement',
      price: '96 000 €',
      selection: 'Appartement sur plan',
      title: 'Appartement sur plan à Guéliz',
      meta: '39–140 m² · Guéliz hyper-centre · livraison 2028',
      image: '/assets/mavericks/villa/mavericks-image00006-scaled.webp',
      alt: 'Appartement sur plan à Guéliz',
      href: '#contact',
      overlayLine: 'Appartement',
      overlayTitle: 'Appartement premium à Guéliz',
    },
  ];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderPropertyCard(card) {
    var overlayLine = card.overlayLine || card.selection;
    var overlayTitle = card.overlayTitle || card.title;

    return (
      '<article class="om-featured-projects__card om-reveal-card">' +
        '<div class="om-reveal-card__top">' +
          '<div class="om-reveal-card__top-left">' +
            '<span class="om-reveal-card__index">' + escapeHtml(card.index) + '</span>' +
            '<span class="om-reveal-card__pill om-reveal-card__pill--primary">MARRAKECH</span>' +
            '<span class="om-reveal-card__pill">' + escapeHtml(card.type) + '</span>' +
          '</div>' +
          '<span class="om-reveal-card__status">' + escapeHtml(card.price) + '</span>' +
        '</div>' +
        '<div class="om-reveal-card__info">' +
          '<div class="om-reveal-card__copy">' +
            '<p class="om-reveal-card__developer"><span>Sélection :</span> ' + escapeHtml(card.selection) + '</p>' +
            '<h3 class="om-reveal-card__title">' + escapeHtml(card.title) + '</h3>' +
            '<p class="om-reveal-card__meta">' + escapeHtml(card.meta) + '</p>' +
          '</div>' +
          '<a href="#" class="om-reveal-card__action" data-property-modal-trigger data-property-id="' + escapeHtml(card.id) + '">' +
            '<span class="om-reveal-card__action-icon" aria-hidden="true">' +
              '<svg viewBox="0 0 16 16" width="15" height="15">' +
                '<path d="M5 3.5h7.5V11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
                '<path d="M12.2 3.8 3.5 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
              '</svg>' +
            '</span>' +
            '<span class="om-reveal-card__action-title">Voir<br>la fiche</span>' +
          '</a>' +
        '</div>' +
        '<div class="om-reveal-card__media">' +
          '<img src="' + escapeHtml(card.image) + '" alt="' + escapeHtml(card.alt) + '" loading="lazy" decoding="async">' +
          '<div class="om-reveal-card__image-badge">' +
            '<span class="om-reveal-card__pin" aria-hidden="true"></span>' +
            '<span>Marrakech</span>' +
          '</div>' +
          '<span class="om-reveal-card__image-arrow" aria-hidden="true">' +
            '<svg viewBox="0 0 16 16" width="16" height="16">' +
              '<path d="M5 3.5h7.5V11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
              '<path d="M12.2 3.8 3.5 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
            '</svg>' +
          '</span>' +
          '<div class="om-reveal-card__image-overlay">' +
            '<span class="om-reveal-card__overlay-index">' + escapeHtml(card.index) + '</span>' +
            '<div class="om-reveal-card__overlay-copy">' +
              '<p>' + escapeHtml(overlayLine) + '</p>' +
              '<strong>' + escapeHtml(overlayTitle) + '</strong>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderPropertyCards(section) {
    var grid = section.querySelector('[data-om-property-cards]');
    if (!grid) return;

    grid.innerHTML = propertyCards.map(renderPropertyCard).join('');
    document.dispatchEvent(new CustomEvent('om-property-cards-rendered'));
  }

  function initMobileCardInteraction(card) {
    var mobileMq = window.matchMedia('(max-width: 767px)');
    if (!mobileMq.matches) return;

    card.addEventListener('click', function (event) {
      if (!mobileMq.matches) return;
      if (event.target.closest('[data-property-modal-trigger]')) return;

      var trigger = card.querySelector('[data-property-modal-trigger]');
      if (!trigger) return;

      card.classList.add('is-pressed');
      window.setTimeout(function () {
        card.classList.remove('is-pressed');
      }, 220);

      trigger.click();
    });
  }

  function initPropertyCards(section) {
    var cards = section.querySelectorAll('.om-reveal-card');
    if (!cards.length) return;

    var desktopMq = window.matchMedia('(min-width: 901px)');

    cards.forEach(function (card) {
      card.setAttribute('tabindex', '0');
      initMobileCardInteraction(card);

      card.addEventListener('mouseenter', function () {
        if (desktopMq.matches) {
          card.classList.add('is-active');
        }
      });

      card.addEventListener('mouseleave', function () {
        card.classList.remove('is-active');
      });

      card.addEventListener('focusin', function () {
        if (desktopMq.matches) {
          card.classList.add('is-active');
        }
      });

      card.addEventListener('focusout', function (event) {
        if (!card.contains(event.relatedTarget)) {
          card.classList.remove('is-active');
        }
      });
    });
  }

  function boot() {
    var section = document.querySelector('.om-featured-projects');
    if (!section) return;
    renderPropertyCards(section);
    initPropertyCards(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
