/**
 * OffMarket — Biens accessibles sur dossier
 * Filter toggle + reusable reveal property cards
 */
(function () {
  'use strict';

  function detectLocale() {
    var path = window.location.pathname || '/';
    if (path.indexOf('/en') === 0) return 'en';
    if (path.indexOf('/it') === 0) return 'it';
    return 'fr';
  }

  function getUiCopy() {
    if (detectLocale() === 'en') {
      return { selectionPrefix: 'Selection:', defaultAction: 'View property' };
    }
    if (detectLocale() === 'it') {
      return { selectionPrefix: 'Selezione:', defaultAction: 'Vedi scheda' };
    }
    return { selectionPrefix: 'Sélection :', defaultAction: 'Voir la fiche' };
  }

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
      href: '/contact/?intent=villa-jaz',
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
      price: 'À partir de 1,05 M MAD',
      priceCase: 'normal',
      selection: 'Programme neuf sur plan',
      title: 'Appartement premium à Guéliz',
      meta: '39–140 m² · Guéliz hyper-centre · Livraison 2028',
      image:
        '/assets/images/properties/appartement-sur-plan-gueliz/b666e486-f6f8-4f32-b709-b89099173502.JPG',
      alt: 'Appartement premium à Guéliz — Guéliz hyper-centre, Marrakech',
      href: '/contact/?intent=appartement-gueliz',
      overlayLine: 'Appartement',
      overlayTitle: 'Appartement premium à Guéliz',
      actionLabel: 'Voir la fiche',
      imageBadge: 'Sur plan',
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
      directHref: '/off-market/?intent=restaurant-jemaa-el-fna',
      actionLabel: 'Voir les détails',
      priceCase: 'normal',
      extraArticleClass: 'om-project-card om-project-card--restaurant',
      lockedPreview: true,
      imageBadge: 'à vendre',
      imageBadgeClass: 'om-reveal-card__image-badge--sale',
    },
  ];

  var propertyCardsEn = [
    {
      id: 'villa-jaz',
      index: '01',
      location: 'MARRAKECH',
      type: 'Off-plan villa',
      price: 'From €351,000',
      priceCase: 'normal',
      selection: 'Off-plan',
      title: 'Villa Jaz',
      meta: '7 villas remaining · Marrakech · Off-plan project',
      image: '/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp',
      alt: 'Villa Jaz — off-plan villas in Marrakech',
      href: '/en/contact/?intent=villa-jaz',
      overlayLine: 'Off-plan',
      overlayTitle: 'Villa Jaz',
      actionLabel: 'View property',
      imageBadge: 'Off-plan',
    },
    {
      id: 'appartement-gueliz',
      index: '02',
      location: 'MARRAKECH',
      type: 'Apartment',
      price: 'From 1.05M MAD',
      priceCase: 'normal',
      selection: 'New off-plan programme',
      title: 'Premium apartment in Guéliz',
      meta: '39–140 m² · Guéliz city centre · Delivery 2028',
      image:
        '/assets/images/properties/appartement-sur-plan-gueliz/b666e486-f6f8-4f32-b709-b89099173502.JPG',
      alt: 'Premium apartment in Guéliz — Guéliz city centre, Marrakech',
      href: '/en/contact/?intent=appartement-gueliz',
      overlayLine: 'Apartment',
      overlayTitle: 'Premium apartment in Guéliz',
      actionLabel: 'View property',
      imageBadge: 'Off-plan',
    },
    {
      id: 'restaurant-jemaa-el-fna',
      index: '03',
      location: 'MARRAKECH',
      type: 'Restaurant',
      price: 'Price on request',
      selection: 'Confidential opportunity',
      title: 'Restaurant in the heart of Jemaa el-Fna',
      meta: 'Jemaa el-Fna square, Marrakech',
      image: '/assets/mavericks/projects/jemaa-el-fna-restaurant.webp',
      alt: 'Off-market restaurant in the heart of Jemaa el-Fna, Marrakech',
      overlayLine: 'Restaurant',
      overlayTitle: 'Restaurant in the heart of Jemaa el-Fna',
      directHref: '/en/off-market/?intent=restaurant-jemaa-el-fna',
      actionLabel: 'View details',
      priceCase: 'normal',
      extraArticleClass: 'om-project-card om-project-card--restaurant',
      lockedPreview: true,
      imageBadge: 'For sale',
      imageBadgeClass: 'om-reveal-card__image-badge--sale',
    },
  ];

  var propertyCardsIt = [
    {
      id: 'villa-jaz',
      index: '01',
      location: 'MARRAKECH',
      type: 'Villa su piano',
      price: 'Da 351.000 €',
      priceCase: 'normal',
      selection: 'Su piano',
      title: 'Villa Jaz',
      meta: '7 ville rimanenti · Marrakech · Progetto su piano',
      image: '/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp',
      alt: 'Villa Jaz — ville su piano a Marrakech',
      href: '/it/contatto/?intent=villa-jaz',
      overlayLine: 'Su piano',
      overlayTitle: 'Villa Jaz',
      actionLabel: 'Vedi scheda',
      imageBadge: 'Su piano',
    },
    {
      id: 'appartement-gueliz',
      index: '02',
      location: 'MARRAKECH',
      type: 'Appartamento',
      price: 'Da 1,05 M MAD',
      priceCase: 'normal',
      selection: 'Programma su piano',
      title: 'Appartamento premium a Guéliz',
      meta: '39–140 m² · Guéliz iper-centro · Consegna 2028',
      image:
        '/assets/images/properties/appartement-sur-plan-gueliz/b666e486-f6f8-4f32-b709-b89099173502.JPG',
      alt: 'Appartamento premium a Guéliz — iper-centro Guéliz, Marrakech',
      href: '/it/contatto/?intent=appartement-gueliz',
      overlayLine: 'Appartamento',
      overlayTitle: 'Appartamento premium a Guéliz',
      actionLabel: 'Vedi scheda',
      imageBadge: 'Su piano',
    },
    {
      id: 'restaurant-jemaa-el-fna',
      index: '03',
      location: 'MARRAKECH',
      type: 'Ristorante',
      price: 'Prezzo su richiesta',
      selection: 'Opportunità riservata',
      title: 'Ristorante nel cuore di Jemaa el-Fna',
      meta: 'Piazza Jemaa el-Fna, Marrakech',
      image: '/assets/mavericks/projects/jemaa-el-fna-restaurant.webp',
      alt: 'Ristorante off-market nel cuore di Jemaa el-Fna, Marrakech',
      overlayLine: 'Ristorante',
      overlayTitle: 'Ristorante nel cuore di Jemaa el-Fna',
      directHref: '/it/off-market/?intent=restaurant-jemaa-el-fna',
      actionLabel: 'Vedi dettagli',
      priceCase: 'normal',
      extraArticleClass: 'om-project-card om-project-card--restaurant',
      lockedPreview: true,
      imageBadge: 'In vendita',
      imageBadgeClass: 'om-reveal-card__image-badge--sale',
    },
  ];

  function getPropertyCards() {
    var locale = detectLocale();
    if (locale === 'en') return propertyCardsEn;
    if (locale === 'it') return propertyCardsIt;
    return propertyCards;
  }

  var topPropertyCards = propertyCards.slice(0, 2);
  var restaurantPropertyCard = propertyCards[2];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderPrivateRow() {
    return (
      '<div class="om-featured-projects__private-row">' +
        renderPropertyCard(restaurantPropertyCard) +
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
    var ui = getUiCopy();
    var actionLabel = card.actionLabel || ui.defaultAction;
    var actionIcon =
      '<span class="om-reveal-card__action-icon" aria-hidden="true">' +
        '<svg viewBox="0 0 16 16" width="15" height="15">' +
          '<path d="M5 3.5h7.5V11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<path d="M12.2 3.8 3.5 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
        '</svg>' +
      '</span>';

    if (card.disabled) return '';

    if (card.directHref) {
      return (
        '<a class="om-reveal-card__action" href="' + escapeHtml(card.directHref) + '">' +
          actionIcon +
          '<span class="om-reveal-card__action-title">' + escapeHtml(actionLabel) + '</span>' +
        '</a>'
      );
    }

    return (
      '<button type="button" class="om-reveal-card__action" data-property-modal-trigger data-property-id="' + escapeHtml(card.id) + '">' +
        actionIcon +
        '<span class="om-reveal-card__action-title">' + escapeHtml(actionLabel) + '</span>' +
      '</button>'
    );
  }

  function renderPropertyCard(card) {
    var ui = getUiCopy();
    var overlayLine = card.overlayLine || card.selection;
    var overlayTitle = card.overlayTitle || card.title;
    var layoutClass = card.layoutClass ? ' ' + card.layoutClass : '';
    var extraArticleClass = card.extraArticleClass ? ' ' + card.extraArticleClass : '';
    var opensModal = !card.disabled && !card.directHref;
    var modalCardAttrs = opensModal
      ? ' data-property-modal-card data-property-id="' + escapeHtml(card.id) + '"'
      : '';
    var arrowTriggerAttrs = opensModal
      ? ' data-property-modal-trigger data-property-id="' + escapeHtml(card.id) + '"'
      : '';

    return (
      '<article class="om-featured-projects__card om-reveal-card' + layoutClass + extraArticleClass + '"' + modalCardAttrs + '>' +
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
            '<p class="om-reveal-card__developer"><span>' + escapeHtml(ui.selectionPrefix) + '</span> ' + escapeHtml(card.selection) + '</p>' +
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
          '<span class="om-reveal-card__image-arrow" aria-hidden="true"' + arrowTriggerAttrs + '>' +
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

    var cards = getPropertyCards();
    var topCards = cards.slice(0, 2);
    var restaurantCard = cards[2];

    grid.innerHTML =
      topCards.map(renderPropertyCard).join('') +
      '<div class="om-featured-projects__private-row">' +
        renderPropertyCard(restaurantCard) +
      '</div>';
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
      if (card.hasAttribute('data-property-modal-card')) {
        card.setAttribute('tabindex', '0');
      } else {
        card.removeAttribute('tabindex');
      }

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

      card.addEventListener('keydown', function (event) {
        if (!card.hasAttribute('data-property-modal-card')) return;
        if (event.key !== 'Enter' && event.key !== ' ') return;
        if (event.target.closest('a, button')) return;
        event.preventDefault();
        var propertyId = card.getAttribute('data-property-id');
        if (propertyId && window.omPropertyModal) {
          window.omPropertyModal.open(propertyId);
        } else if (propertyId) {
          var trigger = card.querySelector('[data-property-modal-trigger]');
          if (trigger) trigger.click();
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
