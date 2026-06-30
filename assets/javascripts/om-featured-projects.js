/**
 * OffMarket — Biens accessibles sur dossier
 * Filter toggle + reusable reveal property cards
 */
(function () {
  'use strict';

  var propertyCards = [
    {
      id: 'villa-jaz',
      index: '01',
      location: 'MARRAKECH',
      type: 'Villa sur plan',
      price: 'À partir de 351 000 €',
      priceCase: 'normal',
      selection: 'Sur plan',
      title: 'Villa Jaz',
      meta: '7 villas restantes · Marrakech · Projet sur plan',
      image: '/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp',
      alt: 'Villa Jaz — villas sur plan à Marrakech',
      href: '#callback-modal',
      overlayLine: 'Sur plan',
      overlayTitle: 'Villa Jaz',
      actionLabel: 'Voir la fiche',
      imageBadge: 'Sur plan',
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
    {
      id: 'restaurant-jemaa-el-fna',
      index: '03',
      location: 'MARRAKECH',
      type: 'Restaurant',
      price: 'Prix en privé',
      selection: 'Opportunité confidentielle',
      title: 'Restaurant au cœur de Jemaa el-Fna',
      meta: 'Place Jemaa el-Fna, Marrakech',
      image: '/assets/mavericks/projects/jemaa-el-fna-restaurant.webp',
      alt: 'Restaurant off-market au cœur de Jemaa el-Fna à Marrakech',
      overlayLine: 'Restaurant',
      overlayTitle: 'Restaurant au cœur de Jemaa el-Fna',
      disabled: true,
      actionLabel: 'Voir les détails',
      priceCase: 'normal',
      extraArticleClass: 'om-project-card om-project-card--restaurant',
      lockedPreview: true,
      imageBadge: 'à vendre',
      imageBadgeClass: 'om-reveal-card__image-badge--sale',
    },
  ];

  var topPropertyCards = propertyCards.slice(0, 2);
  var restaurantPropertyCard = propertyCards[2];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderLockedCard() {
    return (
      '<div class="om-private-opportunities-shell">' +
        '<article class="om-private-opportunities" aria-label="Opportunités privées OFF MARKET">' +
          '<div class="om-project-card__locked-content">' +
            '<span class="om-project-card__locked-badge">ACCÈS PRIVÉ</span>' +
            '<h3 class="om-project-card__locked-title">Terrains, maisons, hôtels et restaurants vous attendent en off-market.</h3>' +
            '<p class="om-project-card__locked-text">Inscrivez-vous pour avoir accès à la sélection privée.</p>' +
            '<a href="#callback-modal" class="om-button om-button--dark om-project-card__locked-cta">' +
              '<span class="om-button__icon" aria-hidden="true">' +
                '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
                  '<circle cx="8" cy="8" r="4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>' +
                  '<path d="M11 11 19.5 19.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>' +
                  '<path d="M17.5 17.5H20.5V20.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>' +
                '</svg>' +
              '</span>' +
              '<span>Débloquer l\u2019accès</span>' +
            '</a>' +
          '</div>' +
        '</article>' +
      '</div>'
    );
  }

  function renderPrivateRow() {
    return (
      '<div class="om-featured-projects__private-row">' +
        renderPropertyCard(restaurantPropertyCard) +
        renderLockedCard() +
      '</div>'
    );
  }

  function renderUnlockOverlay() {
    return (
      '<div class="om-reveal-card__unlock-veil" aria-hidden="true">' +
        '<span class="om-reveal-card__unlock-icon">' +
          '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
            '<path d="M7 10V8a5 5 0 0 1 9.9-1" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/>' +
            '<rect x="5" y="10" width="14" height="11" rx="2.5" stroke="currentColor" stroke-width="1.85"/>' +
            '<circle cx="12" cy="15" r="1.15" fill="currentColor"/>' +
            '<path d="M12 16.2v1.5" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/>' +
          '</svg>' +
        '</span>' +
      '</div>'
    );
  }

  function renderPropertyAction(card) {
    var actionLabel = card.actionLabel || 'Voir la fiche';
    var actionIcon =
      '<span class="om-reveal-card__action-icon" aria-hidden="true">' +
        '<svg viewBox="0 0 16 16" width="15" height="15">' +
          '<path d="M5 3.5h7.5V11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<path d="M12.2 3.8 3.5 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
        '</svg>' +
      '</span>';

    if (card.disabled) {
      return (
        '<button type="button" class="om-reveal-card__action om-reveal-card__action--disabled" aria-disabled="true" disabled>' +
          actionIcon +
          '<span class="om-reveal-card__action-title">' + escapeHtml(actionLabel) + '</span>' +
        '</button>'
      );
    }

    return (
      '<a href="#" class="om-reveal-card__action" data-property-modal-trigger data-property-id="' + escapeHtml(card.id) + '">' +
        actionIcon +
        '<span class="om-reveal-card__action-title">' + escapeHtml(actionLabel) + '</span>' +
      '</a>'
    );
  }

  function renderPropertyCard(card) {
    var overlayLine = card.overlayLine || card.selection;
    var overlayTitle = card.overlayTitle || card.title;
    var layoutClass = card.layoutClass ? ' ' + card.layoutClass : '';
    var extraArticleClass = card.extraArticleClass ? ' ' + card.extraArticleClass : '';

    return (
      '<article class="om-featured-projects__card om-reveal-card' + layoutClass + extraArticleClass + '">' +
        '<div class="om-reveal-card__top">' +
          '<div class="om-reveal-card__top-left">' +
            '<span class="om-reveal-card__index">' + escapeHtml(card.index) + '</span>' +
            '<span class="om-reveal-card__pill om-reveal-card__pill--primary">' + escapeHtml(card.location) + '</span>' +
            '<span class="om-reveal-card__pill">' + escapeHtml(card.type) + '</span>' +
          '</div>' +
          '<span class="om-reveal-card__status' + (card.priceCase === 'normal' ? ' om-reveal-card__status--sentence' : '') + '">' + escapeHtml(card.price) + '</span>' +
        '</div>' +
        '<div class="om-reveal-card__info">' +
          '<div class="om-reveal-card__copy">' +
            '<p class="om-reveal-card__developer"><span>Sélection :</span> ' + escapeHtml(card.selection) + '</p>' +
            '<h3 class="om-reveal-card__title">' + escapeHtml(card.title) + '</h3>' +
            '<p class="om-reveal-card__meta">' + escapeHtml(card.meta) + '</p>' +
          '</div>' +
          renderPropertyAction(card) +
        '</div>' +
        '<div class="om-reveal-card__media">' +
          '<img src="' + escapeHtml(card.image) + '" alt="' + escapeHtml(card.alt) + '" loading="lazy" decoding="async">' +
          '<div class="om-reveal-card__image-badge' + (card.imageBadgeClass ? ' ' + card.imageBadgeClass : '') + '" aria-hidden="true">' +
            '<span class="om-reveal-card__pin"></span>' +
            '<span>' + escapeHtml(card.imageBadge || 'Marrakech') + '</span>' +
          '</div>' +
          '<span class="om-reveal-card__image-arrow" aria-hidden="true">' +
            '<svg viewBox="0 0 16 16" width="16" height="16">' +
              '<path d="M5 3.5h7.5V11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
              '<path d="M12.2 3.8 3.5 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
            '</svg>' +
          '</span>' +
          '<div class="om-reveal-card__image-overlay" aria-hidden="true">' +
            '<span class="om-reveal-card__overlay-index">' + escapeHtml(card.index) + '</span>' +
            '<div class="om-reveal-card__overlay-copy">' +
              '<p>' + escapeHtml(overlayLine) + '</p>' +
              '<strong>' + escapeHtml(overlayTitle) + '</strong>' +
            '</div>' +
          '</div>' +
          (card.lockedPreview ? renderUnlockOverlay() : '') +
        '</div>' +
      '</article>'
    );
  }

  function renderPropertyCards(section) {
    var grid = section.querySelector('[data-om-property-cards]');
    if (!grid) return;

    grid.innerHTML = topPropertyCards.map(renderPropertyCard).join('') + renderPrivateRow();
    document.dispatchEvent(new CustomEvent('om-property-cards-rendered'));
  }

  function initPhotoFallback(section) {
    section.querySelectorAll('.om-reveal-card img').forEach(function (img) {
      function markPending() {
        var card = img.closest('.om-reveal-card');
        if (card) {
          card.classList.add('om-reveal-card--photo-pending');
        }
      }

      img.addEventListener('error', markPending);

      if (img.complete && !img.naturalWidth) {
        markPending();
      }
    });
  }

  function initPropertyCards(section) {
    var cards = section.querySelectorAll('.om-reveal-card');
    if (!cards.length) return;

    var desktopMq = window.matchMedia('(min-width: 901px)');

    cards.forEach(function (card) {
      card.setAttribute('tabindex', '0');

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
    initPhotoFallback(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
