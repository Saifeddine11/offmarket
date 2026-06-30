/**
 * OffMarket — Premium property detail modal
 * 6-slide horizontal carousel
 */
(function () {
  'use strict';

  var VILLA_JAZ_IMAGE_BASE = '/assets/images/properties/villa-sur-plan-marrakech/';

  var VILLA_CHARACTERISTIC_ICON_MAP = {
    'Projet sur plan': 'blueprint',
    '32 villas au total': 'grid',
    'À partir de 351 000 €': 'euro',
    'Piscine privée dans chaque villa': 'pool',
    'Espaces verts paysagers': 'leaf',
    'Aire de jeux pour enfants': 'playground',
    'Équipements haut de gamme': 'diamond',
    'Jardins et espaces extérieurs aménagés': 'tree',
    'Résidence sécurisée': 'shield',
    'Sécurité et confidentialité': 'lock',
    'Adresse communiquée sur demande': 'location',
    'Disponibilités actualisées': 'refresh',
    'Plans sur formulaire': 'document',
    'Réservation sur formulaire': 'calendar',
  };

  function villaCharacteristicIcon(name) {
    var paths = {
      blueprint:
        '<path d="M4 5h16v14H4z"/><path d="M8 5v14M4 10h8M12 14h8M16 14v5"/>',
      grid:
        '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
      euro: '<path d="M17 5.5A7 7 0 1 0 17 18.5"/><path d="M4 10h10M4 14h9"/>',
      pool:
        '<path d="M4 16c1.4 0 1.4-1 2.8-1s1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1"/><path d="M4 20c1.4 0 1.4-1 2.8-1s1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1"/>',
      leaf:
        '<path d="M20 4c-7.5.4-12.5 4-14 10-1 4 1.8 6 5 5 5.8-1.8 8.6-7.4 9-15z"/><path d="M6 18c3-5 7-8 12-10"/>',
      playground:
        '<path d="M7 18V9"/><path d="M17 18V9"/><path d="M7 9h10"/><path d="M12 9v9"/><path d="M9.5 14h5"/>',
      diamond:
        '<path d="M6 4h12l4 6-10 11L2 10z"/><path d="M2 10h20M8 4l4 17 4-17"/>',
      tree:
        '<path d="M12 20v-5"/><path d="M7 15c-2 0-3.5-1.5-3.5-3.4A3.6 3.6 0 0 1 7 8a5 5 0 0 1 10 0 3.6 3.6 0 0 1 3.5 3.6c0 1.9-1.5 3.4-3.5 3.4H7z"/>',
      shield:
        '<path d="M12 3l7 3v5c0 4.6-2.9 8.6-7 10-4.1-1.4-7-5.4-7-10V6l7-3z"/><path d="M9 12l2 2 4-5"/>',
      lock:
        '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
      location:
        '<path d="M12 21s5-4.2 5-9.5a5 5 0 1 0-10 0C7 16.8 12 21 12 21z"/><circle cx="12" cy="11.5" r="1.75"/>',
      refresh:
        '<path d="M4 12a8 8 0 0 1 13.5-5.7"/><path d="M20 7v5h-5"/><path d="M20 12a8 8 0 0 1-13.5 5.7"/><path d="M4 17v-5h5"/>',
      document:
        '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/>',
      calendar:
        '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/><path d="M9 15l2 2 4-4"/>',
      alert:
        '<path d="M12 3l9 16H3z"/><path d="M12 9v4"/><circle cx="12" cy="17" r="0.75"/>',
    };

    var body = paths[name];
    if (!body) return '';

    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      body +
      '</svg>'
    );
  }

  function villaCharacteristicIconForLabel(label) {
    return villaCharacteristicIcon(VILLA_CHARACTERISTIC_ICON_MAP[label] || '');
  }

  var VILLA_JAZ_GALLERY = {
    exterior: [
      VILLA_JAZ_IMAGE_BASE + 'Oasis-exterieur-face.webp',
      VILLA_JAZ_IMAGE_BASE + 'Oasis-exterieur-arriere.webp',
      VILLA_JAZ_IMAGE_BASE + 'Atlas-exterieur-1.webp',
      VILLA_JAZ_IMAGE_BASE + 'Villa-peninsula-ensemble-1.webp',
      VILLA_JAZ_IMAGE_BASE + 'Villa-peninsula-ensemble-10.webp',
    ],
    interior: [
      '/assets/mavericks/villa/mavericks-Villa-J-Salon_Cam04.webp',
      VILLA_JAZ_IMAGE_BASE + 'Oasis-interieur-salon-europeen.webp',
      VILLA_JAZ_IMAGE_BASE + 'O_Villa-B-Ch.1_Cam04.webp',
      VILLA_JAZ_IMAGE_BASE + 'Oasis-interieur-hall.webp',
      VILLA_JAZ_IMAGE_BASE + 'Atlas-salon.webp',
    ],
  };

  var GALLERY_POOL = {
    exterior: [
      '/assets/mavericks/hero/mavericks-hero-villa.webp',
      '/assets/mavericks/gallery/mavericks-collection-estates.jpg',
      '/assets/mavericks/villa/mavericks-image00006-scaled.webp',
      '/assets/mavericks/gallery/mavericks-collection-riads.webp',
      '/assets/mavericks/gallery/mavericks-the-passage.webp',
    ],
    interior: [
      '/assets/mavericks/gallery/mavericks-lower-hall.webp',
      '/assets/mavericks/gallery/mavericks-inner-chamber.webp',
      '/assets/mavericks/gallery/mavericks-silent-room.webp',
      '/assets/mavericks/gallery/mavericks-back-space.webp',
      '/assets/mavericks/gallery/mavericks-the-vault.webp',
    ],
  };

  var DEFAULT_AMENITIES = [
    'Balcon',
    'Piscine',
    'Jardin',
    'Rooftop',
    'Parking',
    'Sécurité',
    'Climatisation',
    'Espaces verts',
    'Salle de sport',
    'Commerces à proximité',
    'Terrasse',
    'Smart home',
  ];

  var MODAL_SLIDE_ORDER = [
    'general',
    'about',
    'characteristics',
    'exterior',
    'interior',
    'layout',
  ];

  var propertyModalData = {
    'villa-jaz': {
      index: '01',
      location: 'MARRAKECH',
      type: 'Villa sur plan',
      price: 'À partir de 351 000 €',
      selection: 'Projet sur plan',
      title: 'Villa Jaz',
      subtitle:
        '32 villas sur plan à Marrakech, avec une disponibilité limitée à 7 villas restantes.',
      image: VILLA_JAZ_IMAGE_BASE + 'Oasis-exterieur-face.webp',
      alt: 'Villa Jaz — villas sur plan à Marrakech',
      formHref: '#callback-modal',
      ctaPrimary: 'Réserver ta villa',
      ctaOutline: 'Remplir le formulaire pour plus de détails',
      facts: [
        { label: 'Type', value: 'Villa sur plan' },
        { label: 'Total', value: '32 villas' },
        { label: 'Disponibilité', value: '7 villas restantes' },
        { label: 'Statut', value: 'Projet sur plan' },
        { label: 'Prix', value: 'À partir de 351 000 €' },
        { label: 'Adresse', value: 'Communiquée sur demande' },
        {
          label: 'Paiement',
          value: '30% à la réservation, puis 30% à chaque avancement du projet',
        },
      ],
      generalFacts: [
        { label: 'Total', value: '32 villas' },
        {
          label: 'Paiement',
          value: '30% à la réservation, puis 30% à chaque avancement du projet',
        },
        { label: 'Statut', value: 'Projet sur plan' },
        { label: 'Disponibilité', value: '7 villas restantes' },
      ],
      description:
        'Villa Jaz est une opportunité sur plan pensée pour les acquéreurs qui recherchent une villa privée à Marrakech, avec un cadre résidentiel, des espaces extérieurs et une disponibilité volontairement limitée.',
      about: {
        project: 'Projet sur plan',
        title: 'Villa Jaz',
        primary:
          'Villa Jaz est une opportunité sur plan pensée pour les acquéreurs qui recherchent une villa privée à Marrakech, avec un cadre résidentiel, des espaces extérieurs et une disponibilité volontairement limitée.',
        secondary:
          'Le projet réunit 32 villas, dont 7 restent disponibles. Les informations détaillées, les plans, les disponibilités actualisées et les conditions précises sont communiqués après formulaire afin de préserver la confidentialité du projet.',
      },
      amenities: [
        'Projet sur plan',
        '32 villas au total',
        '7 villas restantes',
        'Prix à partir de 351 000 €',
        '30% à la réservation',
        '30% à chaque avancement du projet',
        'Adresse communiquée sur demande',
        'Plans sur formulaire',
        'Disponibilités actualisées',
        'Détails complets sur demande',
        'Réservation sur formulaire',
      ],
      characteristicGroups: [
        {
          title: 'Informations clés',
          items: [
            'Projet sur plan',
            '32 villas au total',
            { label: 'À partir de 351 000 €', tone: 'muted' },
          ],
        },
        {
          type: 'fomo',
          eyebrow: 'Disponibilité limitée',
          value: '7 villas restantes',
          microcopy: 'sur 32 villas',
          icon: 'alert',
        },
        {
          title: 'Confort & équipements',
          items: [
            'Piscine privée dans chaque villa',
            'Espaces verts paysagers',
            'Aire de jeux pour enfants',
            'Équipements haut de gamme',
            'Jardins et espaces extérieurs aménagés',
          ],
        },
        {
          title: 'Confidentialité & réservation',
          layout: 'wide',
          items: [
            'Résidence sécurisée',
            'Sécurité et confidentialité',
            'Adresse communiquée sur demande',
            'Disponibilités actualisées',
            'Plans sur formulaire',
            'Réservation sur formulaire',
          ],
        },
      ],
      characteristicsPayment: {
        title: 'Modalités de paiement',
        text:
          '30% à la réservation, puis 30% à chaque avancement du projet. Remplir le formulaire pour recevoir les détails complets.',
      },
      characteristicsImage:
        VILLA_JAZ_IMAGE_BASE + 'Atlas-exterieur-1.webp',
      galleries: VILLA_JAZ_GALLERY,
      layout: {
        surface: 'Détails sur demande',
        rooms: 'Détails sur demande',
        baths: 'Détails sur demande',
        description:
          'Modalités de paiement — 30% à la réservation. 30% à chaque avancement du projet. Pour recevoir les détails complets, les disponibilités exactes et les conditions actualisées, merci de remplir le formulaire.\n\nDisponibilité limitée — 7 villas restantes sur un total de 32 villas.',
        image: VILLA_JAZ_IMAGE_BASE + 'villa_plan_entire_attractive.webp',
        images: {
          ground: VILLA_JAZ_IMAGE_BASE + 'villa_plan_entire_attractive.webp',
          first: VILLA_JAZ_IMAGE_BASE + 'villa_plan_etage_attractive_english.webp',
        },
      },
    },
    'appartement-gueliz': {
      index: '02',
      location: 'MARRAKECH',
      type: 'Appartement',
      price: '96 000 €',
      selection: 'Appartement sur plan',
      title: 'Appartement sur plan à Guéliz',
      subtitle: '39–140 m² · Guéliz hyper-centre · livraison 2028',
      image: '/assets/mavericks/villa/mavericks-image00006-scaled.webp',
      alt: 'Appartement sur plan à Guéliz',
      facts: [
        { label: 'Surface', value: '39–140 m²' },
        { label: 'Livraison', value: '2028' },
        { label: 'Réservation', value: '30%' },
        { label: 'Disponibilité', value: '40 appartements restants' },
      ],
      description:
        'Un programme situé au cœur de Guéliz, pensé pour un achat résidentiel ou un investissement locatif dans un secteur central de Marrakech.',
      about: {
        project: 'Appartement sur plan',
        title: 'Appartement sur plan à Guéliz',
        primary:
          'Un programme situé au cœur de Guéliz, pensé pour un achat résidentiel ou un investissement locatif.',
        secondary:
          'Surfaces variées, emplacement urbain recherché et livraison prévue en 2028 dans un cadre premium.',
      },
      amenities: [
        'Balcon',
        'Parking',
        'Sécurité',
        'Climatisation',
        'Commerces à proximité',
        'Ascenseur',
        'Espaces verts',
        'Terrasse',
        'Smart home',
        'Livraison 2028',
        'Réservation 30%',
        'Hyper-centre',
      ],
      galleries: {
        exterior: [
          '/assets/mavericks/villa/mavericks-image00006-scaled.webp',
          '/assets/mavericks/gallery/mavericks-collection-estates.jpg',
          '/assets/mavericks/hero/mavericks-hero-villa.webp',
          '/assets/mavericks/gallery/mavericks-the-passage.webp',
          '/assets/mavericks/gallery/mavericks-collection-riads.webp',
        ],
        interior: GALLERY_POOL.interior,
      },
      layout: {
        surface: '39–140 m²',
        rooms: '1–3',
        baths: '1–2',
        description: 'Plans et disponibilités transmis sur demande.',
        image: '',
      },
    },
    'riad-medina': {
      index: '03',
      location: 'MARRAKECH',
      type: 'Riad',
      price: 'Prix sur demande',
      selection: 'Riad privé',
      title: 'Riad de caractère à la Médina',
      subtitle: 'Médina · architecture · emplacement rare',
      image: '/assets/mavericks/gallery/mavericks-collection-riads.webp',
      alt: 'Riad de caractère à la Médina',
      facts: [
        { label: 'Type', value: 'Riad' },
        { label: 'Secteur', value: 'Médina' },
        { label: 'Style', value: 'Patrimoine' },
        { label: 'Accès', value: 'Sélection privée' },
      ],
      description:
        'Un riad de caractère dans la médina de Marrakech, sélectionné pour son cachet architectural, son emplacement et son potentiel de valorisation.',
      about: {
        project: 'Riad privé',
        title: 'Riad de caractère à la Médina',
        primary:
          'Un riad de caractère dans la médina de Marrakech, sélectionné pour son cachet architectural et son emplacement rare.',
        secondary:
          'Bien patrimonial avec éléments architecturaux marocains, volumes intérieurs généreux et fort potentiel de valorisation.',
      },
      amenities: [
        'Patio',
        'Terrasse',
        'Architecture patrimoniale',
        'Sécurité',
        'Salon de réception',
        'Matériaux traditionnels',
        'Emplacement Médina',
        'Cachet historique',
        'Volumes intérieurs',
        'Accès sélection privée',
        'Potentiel locatif',
        'Rénovation premium',
      ],
      galleries: {
        exterior: [
          '/assets/mavericks/gallery/mavericks-collection-riads.webp',
          '/assets/mavericks/gallery/mavericks-the-passage.webp',
          '/assets/mavericks/gallery/mavericks-collection-estates.jpg',
          '/assets/mavericks/hero/mavericks-hero-villa.webp',
          '/assets/mavericks/gallery/mavericks-the-threshold.webp',
        ],
        interior: [
          '/assets/mavericks/gallery/mavericks-inner-chamber.webp',
          '/assets/mavericks/gallery/mavericks-lower-hall.webp',
          '/assets/mavericks/gallery/mavericks-silent-room.webp',
          '/assets/mavericks/gallery/mavericks-back-space.webp',
          '/assets/mavericks/gallery/mavericks-the-vault.webp',
        ],
      },
      layout: {
        surface: 'Sur demande',
        rooms: 'Sur demande',
        baths: 'Sur demande',
        description: 'Dossier complet transmis sur demande après qualification.',
        image: '',
      },
    },
    'opportunite-sur-plan': {
      index: '04',
      location: 'MARRAKECH',
      type: 'Sur plan',
      price: 'Sur demande',
      selection: 'Pré-lancement',
      title: 'Opportunité sur plan à Marrakech',
      subtitle: 'Pré-lancement · investissement · disponibilité limitée',
      image: '/assets/mavericks/gallery/mavericks-collection-estates.jpg',
      alt: 'Opportunité sur plan à Marrakech',
      facts: [
        { label: 'Statut', value: 'Pré-lancement' },
        { label: 'Accès', value: 'Prioritaire' },
        { label: 'Projet', value: 'Sur plan' },
        { label: 'Disponibilité', value: 'Limitée' },
      ],
      description:
        "Une opportunité en pré-lancement, accessible avant diffusion publique, avec un positionnement pensé pour l'investissement à Marrakech.",
      about: {
        project: 'Pré-lancement',
        title: 'Opportunité sur plan à Marrakech',
        primary:
          "Une opportunité en pré-lancement, accessible avant diffusion publique, avec un positionnement pensé pour l'investissement.",
        secondary:
          'Accès prioritaire à une sélection confidentielle, avec disponibilité limitée et dossier transmis sur qualification.',
      },
      amenities: [
        'Pré-lancement',
        'Investissement',
        'Accès prioritaire',
        'Disponibilité limitée',
        'Sur plan',
        'Sélection privée',
        'Piscine',
        'Jardin',
        'Parking',
        'Sécurité',
        'Terrasse',
        'Livraison programmée',
      ],
      galleries: {
        exterior: GALLERY_POOL.exterior,
        interior: GALLERY_POOL.interior,
      },
      layout: {
        surface: 'Sur demande',
        rooms: 'Sur demande',
        baths: 'Sur demande',
        description: 'Plans détaillés transmis après échange.',
        image: '',
      },
    },
  };

  function boot() {
    var modal = document.querySelector('[data-property-modal]');
    if (!modal) return;

    var track = modal.querySelector('[data-property-modal-track]');
    var stage = modal.querySelector('.om-property-modal__stage');
    var slides = modal.querySelectorAll('[data-modal-slide]');
    var closeButtons = modal.querySelectorAll('[data-property-modal-close]');
    var closeBtn = modal.querySelector('.om-property-modal__close');
    var tabButtons = modal.querySelectorAll('[data-modal-tab]');
    var layoutTabButtons = modal.querySelectorAll('[data-modal-layout-tabs] button');
    var mobileMq = window.matchMedia('(max-width: 767px)');
    var bodyScrollLockY = 0;

    function lockBodyScroll() {
      if (!mobileMq.matches) return;
      bodyScrollLockY = window.scrollY || window.pageYOffset || 0;
      document.body.style.top = '-' + bodyScrollLockY + 'px';
    }

    function unlockBodyScroll() {
      if (!mobileMq.matches) return;
      document.body.style.top = '';
      window.scrollTo(0, bodyScrollLockY);
      bodyScrollLockY = 0;
    }

    var image = modal.querySelector('[data-modal-image]');
    var indexEl = modal.querySelector('[data-modal-index]');
    var locationEl = modal.querySelector('[data-modal-location]');
    var typeEl = modal.querySelector('[data-modal-type]');
    var priceBottomEl = modal.querySelector('[data-modal-price-bottom]');
    var selectionEl = modal.querySelector('[data-modal-selection]');
    var titleEl = modal.querySelector('[data-modal-title]');
    var factsEl = modal.querySelector('[data-modal-facts]');
    var descriptionEl = modal.querySelector('[data-modal-description]');
    var aboutThumb = modal.querySelector('[data-modal-about-thumb]');
    var aboutProject = modal.querySelector('[data-modal-about-project]');
    var aboutTitle = modal.querySelector('[data-modal-about-title]');
    var aboutPrimary = modal.querySelector('[data-modal-about-description-primary]');
    var aboutSecondary = modal.querySelector('[data-modal-about-description-secondary]');
    var aboutImage = modal.querySelector('[data-modal-about-image]');
    var amenitiesEl = modal.querySelector('[data-modal-amenities]');
    var exteriorGalleryEl = modal.querySelector('[data-modal-exterior-gallery]');
    var interiorGalleryEl = modal.querySelector('[data-modal-interior-gallery]');
    var exteriorCountEl = modal.querySelector('[data-modal-exterior-count]');
    var interiorCountEl = modal.querySelector('[data-modal-interior-count]');
    var layoutSurface = modal.querySelector('[data-modal-layout-surface]');
    var layoutRooms = modal.querySelector('[data-modal-layout-rooms]');
    var layoutBaths = modal.querySelector('[data-modal-layout-baths]');
    var layoutDescription = modal.querySelector('[data-modal-layout-description]');
    var layoutImage = modal.querySelector('[data-modal-layout-image]');
    var layoutPlaceholder = modal.querySelector('[data-modal-layout-placeholder]');
    var prevButton = modal.querySelector('[data-modal-prev]');
    var nextButton = modal.querySelector('[data-modal-next]');

    var activeProperty = null;
    var activeSlide = 'general';
    var modalActiveSlideIndex = 0;
    var modalWheelLocked = false;
    var modalWheelAccumulated = 0;
    var modalTouchStartX = 0;
    var modalTouchStartY = 0;
    var modalResizeRaf = null;
    var MODAL_ENTER_MS = 420;
    var MODAL_LEAVE_MS = 220;
    var MODAL_TRANSITION_MS = 420;
    var modalTransitionTimer = null;
    var modalSlideAnimTimer = null;
    var modalLeavingSlide = null;
    var MODAL_WHEEL_THRESHOLD = 70;

    function renderFacts(items, options) {
      if (!factsEl) return;
      var list = items || [];
      var compact = options && options.compact;
      factsEl.classList.toggle('om-property-modal__facts--compact', compact);
      factsEl.innerHTML = '';
      list.forEach(function (item) {
        var fact = document.createElement('div');
        fact.className = 'om-property-modal__fact';
        if (item.label && String(item.label).toLowerCase() === 'paiement') {
          fact.classList.add('om-property-modal__fact--payment');
        }
        fact.innerHTML =
          '<span>' + item.label + '</span><strong>' + item.value + '</strong>';
        factsEl.appendChild(fact);
      });
    }

    function renderGallery(container, images, countEl, imageAltBase) {
      if (!container) return;
      container.innerHTML = '';
      (images || []).slice(0, 5).forEach(function (src, i) {
        var figure = document.createElement('figure');
        var img = document.createElement('img');
        img.src = src;
        img.alt = (imageAltBase || 'Villa Jaz') + ' — photo ' + (i + 1);
        img.loading = 'lazy';
        figure.appendChild(img);
        container.appendChild(figure);
      });
      if (countEl) {
        countEl.textContent = (images || []).length + ' photos';
      }
    }

    function renderCharacteristicRow(item) {
      var label = typeof item === 'string' ? item : item.label;
      var tone = typeof item === 'object' && item.tone ? item.tone : '';
      var row = document.createElement('div');
      row.className = 'om-property-modal__characteristic-row';
      if (tone === 'muted') {
        row.classList.add('om-property-modal__characteristic-row--muted');
      }
      row.innerHTML =
        '<span class="om-property-modal__characteristic-icon" aria-hidden="true">' +
        villaCharacteristicIconForLabel(label) +
        '</span>' +
        '<span class="om-property-modal__characteristic-label">' +
        label +
        '</span>';
      return row;
    }

    function renderFomoCharacteristicBlock(group) {
      var block = document.createElement('div');
      block.className =
        'om-property-modal__characteristic-block om-property-modal__characteristic-block--fomo om-property-modal__villa-fomo-card';

      var iconName = group.icon || 'alert';
      block.innerHTML =
        '<div class="om-property-modal__villa-fomo-card__icon" aria-hidden="true">' +
        villaCharacteristicIcon(iconName) +
        '</div>' +
        '<span class="om-property-modal__villa-fomo-card__eyebrow">' +
        (group.eyebrow || 'Disponibilité limitée') +
        '</span>' +
        '<strong class="om-property-modal__villa-fomo-card__value">' +
        (group.value || '') +
        '</strong>' +
        (group.microcopy
          ? '<small class="om-property-modal__villa-fomo-card__meta">' +
            group.microcopy +
            '</small>'
          : '');

      return block;
    }

    function renderAmenities(property) {
      if (!amenitiesEl) return;
      amenitiesEl.innerHTML = '';
      amenitiesEl.className = 'om-property-modal__amenities';

      var groups = property && property.characteristicGroups;
      if (groups && groups.length) {
        amenitiesEl.classList.add('om-property-modal__amenities--grouped');

        var hasFomo = groups.some(function (group) {
          return group.type === 'fomo';
        });
        if (hasFomo) {
          amenitiesEl.classList.add('om-property-modal__amenities--villa');
        }

        var layout = document.createElement('div');
        layout.className = 'om-property-modal__characteristics-layout';

        var body = document.createElement('div');
        body.className = 'om-property-modal__characteristics-body';

        var grid = document.createElement('div');
        grid.className = 'om-property-modal__characteristics-grid';
        if (hasFomo) {
          grid.classList.add('om-property-modal__characteristics-grid--villa');
        }

        groups.forEach(function (group) {
          if (group.type === 'fomo') {
            grid.appendChild(renderFomoCharacteristicBlock(group));
            return;
          }

          var block = document.createElement('div');
          block.className = 'om-property-modal__characteristic-block';
          if (group.layout === 'wide') {
            block.classList.add('om-property-modal__characteristic-block--wide');
          }
          if (group.title === 'Informations clés') {
            block.classList.add('om-property-modal__characteristic-block--info');
          } else if (group.title === 'Confort & équipements') {
            block.classList.add('om-property-modal__characteristic-block--comfort');
          } else if (group.title === 'Confidentialité & réservation') {
            block.classList.add('om-property-modal__characteristic-block--privacy');
          }

          var heading = document.createElement('h4');
          heading.textContent = group.title;
          block.appendChild(heading);

          var list = document.createElement('div');
          list.className = 'om-property-modal__characteristic-list';

          (group.items || []).forEach(function (item) {
            list.appendChild(renderCharacteristicRow(item));
          });

          block.appendChild(list);
          grid.appendChild(block);
        });

        body.appendChild(grid);

        var payment = property.characteristicsPayment;
        if (payment) {
          var paymentBlock = document.createElement('div');
          paymentBlock.className = 'om-property-modal__characteristics-payment';
          paymentBlock.innerHTML =
            '<h4>' +
            payment.title +
            '</h4><p>' +
            payment.text +
            '</p>';
          body.appendChild(paymentBlock);
        }

        layout.appendChild(body);

        var imageSrc = property.characteristicsImage || property.image;
        if (imageSrc) {
          var imageWrap = document.createElement('figure');
          imageWrap.className = 'om-property-modal__characteristics-media';
          var img = document.createElement('img');
          img.src = imageSrc;
          img.alt =
            (property.title || 'Villa Jaz') + ' — extérieur et cadre résidentiel';
          img.loading = 'lazy';
          imageWrap.appendChild(img);
          layout.appendChild(imageWrap);
        }

        amenitiesEl.appendChild(layout);
        return;
      }

      var list = (property && property.amenities) || DEFAULT_AMENITIES;
      var perCol = Math.ceil(list.length / 3);
      var columns = [
        list.slice(0, perCol),
        list.slice(perCol, perCol * 2),
        list.slice(perCol * 2),
      ];

      columns.forEach(function (colItems, colIndex) {
        var col = document.createElement('div');
        col.className = 'om-property-modal__amenity-col';

        colItems.forEach(function (label) {
          var row = document.createElement('div');
          row.className = 'om-property-modal__amenity';
          row.innerHTML =
            '<span class="om-property-modal__amenity-icon" aria-hidden="true"></span>' +
            '<span class="om-property-modal__amenity-label">' + label + '</span>' +
            '<span class="om-property-modal__amenity-check" aria-hidden="true">✓</span>';
          col.appendChild(row);
        });

        if (colIndex === 2 && property && property.image) {
          var imageWrap = document.createElement('figure');
          imageWrap.className = 'om-property-modal__amenity-image';
          var img = document.createElement('img');
          img.src = property.image;
          img.alt = property.title || '';
          img.loading = 'lazy';
          imageWrap.appendChild(img);
          col.appendChild(imageWrap);
        }

        amenitiesEl.appendChild(col);
      });
    }

    function setLayoutPlanImage(floor) {
      if (!layoutImage || !layoutPlaceholder) return;

      var layout = (activeProperty && activeProperty.layout) || {};
      var images = layout.images || {};
      var src =
        floor === 'first'
          ? images.first || images.ground || layout.image || ''
          : images.ground || layout.image || '';

      if (src) {
        layoutImage.src = src;
        layoutImage.alt =
          'Plan ' +
          (floor === 'first' ? 'étage' : 'rez-de-chaussée') +
          ' — ' +
          ((activeProperty && activeProperty.title) || 'Villa Jaz');
        layoutImage.hidden = false;
        layoutPlaceholder.hidden = true;
        return;
      }

      layoutImage.hidden = true;
      layoutImage.removeAttribute('src');
      layoutPlaceholder.hidden = false;
    }

    function updateModalActions(property) {
      var href = property.formHref || '#callback-modal';
      var outlineLabel = property.ctaOutline || 'Rappel';
      var primaryLabel = property.ctaPrimary || 'Recevoir le dossier';

      modal.querySelectorAll('.om-property-modal__actions').forEach(function (group) {
        var links = group.querySelectorAll('a.om-cta');
        if (!links.length) return;

        links[0].href = href;
        var outlineText = links[0].querySelector('span:not(.om-button__icon)');
        if (outlineText) outlineText.textContent = outlineLabel;

        if (links[1]) {
          links[1].href = href;
          var primaryText = links[1].querySelector('span:not(.om-button__icon)');
          if (primaryText) primaryText.textContent = primaryLabel;
        }
      });
    }

    function renderProperty(property) {
      activeProperty = property;

      if (image) {
        image.src = property.image;
        image.alt = property.alt || property.title;
      }
      if (indexEl) indexEl.textContent = property.index;
      if (locationEl) locationEl.textContent = property.location;
      if (typeEl) typeEl.textContent = property.type;
      if (priceBottomEl) priceBottomEl.textContent = property.price;
      if (selectionEl) {
        selectionEl.innerHTML =
          '<span>Sélection :</span> ' + property.selection;
      }
      if (titleEl) titleEl.textContent = property.title;
      if (descriptionEl) {
        descriptionEl.textContent = property.description || '';
        descriptionEl.hidden = false;
      }

      renderFacts(property.generalFacts || property.facts, {
        compact: Boolean(property.generalFacts && property.generalFacts.length),
      });

      var about = property.about || {};
      if (aboutThumb) {
        aboutThumb.src = property.image;
        aboutThumb.alt = property.title;
      }
      if (aboutProject) aboutProject.textContent = about.project || property.selection;
      if (aboutTitle) aboutTitle.textContent = about.title || property.title;
      if (aboutPrimary) aboutPrimary.textContent = about.primary || property.description || '';
      if (aboutSecondary) aboutSecondary.textContent = about.secondary || '';
      if (aboutImage) {
        aboutImage.src = property.galleries && property.galleries.exterior
          ? property.galleries.exterior[0]
          : property.image;
        aboutImage.alt = property.title;
      }

      renderAmenities(property);

      var galleries = property.galleries || {};
      renderGallery(
        exteriorGalleryEl,
        galleries.exterior,
        exteriorCountEl,
        property.title + ' — extérieur'
      );
      renderGallery(
        interiorGalleryEl,
        galleries.interior,
        interiorCountEl,
        property.title + ' — intérieur'
      );

      updateModalActions(property);

      var layout = property.layout || {};
      if (layoutSurface) layoutSurface.textContent = layout.surface || '—';
      if (layoutRooms) layoutRooms.textContent = layout.rooms || '—';
      if (layoutBaths) layoutBaths.textContent = layout.baths || '—';
      if (layoutDescription) {
        layoutDescription.textContent =
          layout.description || 'Plans transmis sur demande.';
      }

      layoutTabButtons.forEach(function (btn, index) {
        btn.classList.toggle('is-active', index === 0);
      });
      setLayoutPlanImage('ground');
    }

    function updateModalArrowState() {
      if (!prevButton || !nextButton) return;
      prevButton.disabled = modalActiveSlideIndex === 0;
      nextButton.disabled =
        modalActiveSlideIndex === MODAL_SLIDE_ORDER.length - 1;
    }

    function clampModalIndex(index) {
      return Math.max(0, Math.min(MODAL_SLIDE_ORDER.length - 1, index));
    }

    function clearSlideAnimations() {
      if (modalSlideAnimTimer) {
        clearTimeout(modalSlideAnimTimer);
        modalSlideAnimTimer = null;
      }

      var activeName = MODAL_SLIDE_ORDER[modalActiveSlideIndex];
      slides.forEach(function (slide) {
        slide.classList.remove('is-entering', 'is-leaving');
        slide.classList.toggle(
          'is-active',
          slide.dataset.modalSlide === activeName
        );
      });
      modalLeavingSlide = null;
    }

    function clearModalTransitionLock() {
      if (modalTransitionTimer) {
        clearTimeout(modalTransitionTimer);
        modalTransitionTimer = null;
      }
      modalWheelLocked = false;
    }

    function lockModalWheel() {
      clearModalTransitionLock();
      modalWheelLocked = true;
      modalTransitionTimer = window.setTimeout(function () {
        modalWheelLocked = false;
        modalWheelAccumulated = 0;
        modalTransitionTimer = null;
      }, MODAL_TRANSITION_MS + 80);
    }

    function animateSlideTransition(previousSlide, nextSlide) {
      clearSlideAnimations();

      if (previousSlide && previousSlide !== nextSlide) {
        previousSlide.classList.remove('is-active');
        previousSlide.classList.add('is-leaving');
        modalLeavingSlide = previousSlide;
      }

      slides.forEach(function (slide) {
        if (slide !== previousSlide && slide !== nextSlide) {
          slide.classList.remove('is-active', 'is-entering', 'is-leaving');
        }
      });

      if (!nextSlide) return;

      nextSlide.classList.add('is-entering');
      nextSlide.classList.remove('is-active');
      void nextSlide.offsetWidth;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          nextSlide.classList.remove('is-entering');
          nextSlide.classList.add('is-active');
        });
      });

      modalSlideAnimTimer = window.setTimeout(function () {
        slides.forEach(function (slide) {
          slide.classList.remove('is-entering', 'is-leaving');
          slide.classList.toggle(
            'is-active',
            slide.dataset.modalSlide === nextSlide.dataset.modalSlide
          );
        });
        modalLeavingSlide = null;
        modalSlideAnimTimer = null;
      }, MODAL_ENTER_MS + 60);
    }

    function setActiveModalSlide(slideName, options) {
      if (!modal || !track || !slides.length) return;

      var skipAnimation = options && options.skipAnimation;
      var index = MODAL_SLIDE_ORDER.indexOf(slideName);
      if (index === -1) return;

      var slide = Array.prototype.find.call(slides, function (s) {
        return s.dataset.modalSlide === slideName;
      });
      if (!slide || !stage) return;

      var previousSlide = Array.prototype.find.call(slides, function (s) {
        return s.classList.contains('is-active');
      });

      var stageWidth = stage.clientWidth;
      var slideWidth = slide.offsetWidth;
      var slideLeft = slide.offsetLeft;
      var offset;

      tabButtons.forEach(function (button) {
        button.classList.toggle(
          'is-active',
          button.dataset.modalTab === slideName
        );
      });

      if (mobileMq.matches) {
        var activeTab = Array.prototype.find.call(tabButtons, function (button) {
          return button.dataset.modalTab === slideName;
        });
        if (activeTab && typeof activeTab.scrollIntoView === 'function') {
          activeTab.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
          });
        }
      }

      if (mobileMq.matches) {
        var gap = parseFloat(getComputedStyle(track).gap) || 0;
        offset = index * (slideWidth + gap);
      } else {
        offset = slideLeft - (stageWidth - slideWidth) / 2;
        var maxOffset = Math.max(0, track.scrollWidth - stageWidth);
        offset = Math.max(0, Math.min(offset, maxOffset));
      }

      track.style.transform =
        'translate3d(' + (-Math.round(offset)) + 'px, 0, 0)';

      if (
        skipAnimation ||
        !previousSlide ||
        previousSlide === slide ||
        !modal.classList.contains('is-open')
      ) {
        clearSlideAnimations();
        slides.forEach(function (s) {
          s.classList.toggle('is-active', s.dataset.modalSlide === slideName);
        });
      } else {
        animateSlideTransition(previousSlide, slide);
      }

      modalActiveSlideIndex = index;
      activeSlide = slideName;

      updateModalArrowState();
    }

    function goToModalSlideByIndex(index) {
      var safeIndex = clampModalIndex(index);

      if (
        safeIndex === modalActiveSlideIndex &&
        !modalSlideAnimTimer &&
        modal.classList.contains('is-open')
      ) {
        return;
      }

      clearSlideAnimations();
      setActiveModalSlide(MODAL_SLIDE_ORDER[safeIndex]);
    }

    function goToNextModalSlide() {
      if (modalActiveSlideIndex >= MODAL_SLIDE_ORDER.length - 1) return;
      goToModalSlideByIndex(modalActiveSlideIndex + 1);
    }

    function goToPrevModalSlide() {
      if (modalActiveSlideIndex <= 0) return;
      goToModalSlideByIndex(modalActiveSlideIndex - 1);
    }

    function handleModalWheel(event) {
      if (!modal.classList.contains('is-open')) return;
      if (mobileMq.matches) return;

      if (!stage || !stage.contains(event.target)) return;

      event.preventDefault();

      if (modalWheelLocked) return;

      var rawDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      modalWheelAccumulated += rawDelta;

      if (Math.abs(modalWheelAccumulated) < MODAL_WHEEL_THRESHOLD) {
        return;
      }

      if (modalWheelAccumulated > 0) {
        goToNextModalSlide();
      } else {
        goToPrevModalSlide();
      }

      lockModalWheel();
    }

    function resetModalCarousel() {
      modalActiveSlideIndex = 0;
      modalWheelAccumulated = 0;
      modalWheelLocked = false;

      if (track) {
        track.style.transition = 'none';
        track.style.transform = 'translate3d(0, 0, 0)';
      }

      requestAnimationFrame(function () {
        if (track) {
          track.style.transition = '';
        }
        setActiveModalSlide('general', { skipAnimation: true });
      });
    }

    function openModal(propertyId) {
      var property = propertyModalData[propertyId];
      if (!property) return;

      renderProperty(property);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('om-modal-open');
      document.body.classList.add('om-modal-open');
      lockBodyScroll();

      requestAnimationFrame(function () {
        resetModalCarousel();
      });

      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('om-modal-open');
      document.body.classList.remove('om-modal-open');
      unlockBodyScroll();
      activeProperty = null;
      activeSlide = 'general';
      modalActiveSlideIndex = 0;
      modalWheelAccumulated = 0;
      modalWheelLocked = false;
      if (track) track.style.transform = '';
      updateModalArrowState();
    }

    function bindTriggers() {
      var triggers = document.querySelectorAll('[data-property-modal-trigger]');
      triggers.forEach(function (trigger) {
        if (trigger.dataset.propertyModalBound === 'true') return;
        trigger.dataset.propertyModalBound = 'true';
        trigger.addEventListener('click', function (event) {
          event.preventDefault();
          openModal(trigger.dataset.propertyId);
        });
      });
    }

    closeButtons.forEach(function (button) {
      button.addEventListener('click', closeModal);
    });

    tabButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        if (!activeProperty) return;
        var slideName = button.dataset.modalTab;
        var index = MODAL_SLIDE_ORDER.indexOf(slideName);
        if (index === -1) return;
        if (index === modalActiveSlideIndex) return;

        tabButtons.forEach(function (btn) {
          btn.classList.toggle('is-active', btn.dataset.modalTab === slideName);
        });

        clearSlideAnimations();
        clearModalTransitionLock();
        modalWheelAccumulated = 0;
        goToModalSlideByIndex(index);
        lockModalWheel();
      });
    });

    if (prevButton) {
      prevButton.addEventListener('click', function () {
        if (modalWheelLocked) return;
        modalWheelAccumulated = 0;
        goToPrevModalSlide();
        lockModalWheel();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function () {
        if (modalWheelLocked) return;
        modalWheelAccumulated = 0;
        goToNextModalSlide();
        lockModalWheel();
      });
    }

    if (!modal.dataset.wheelBound) {
      modal.addEventListener('wheel', handleModalWheel, { passive: false });
      modal.dataset.wheelBound = 'true';
    }

    if (stage) {
      stage.addEventListener(
        'touchstart',
        function (event) {
          var touch = event.touches[0];
          modalTouchStartX = touch.clientX;
          modalTouchStartY = touch.clientY;
        },
        { passive: true }
      );

      stage.addEventListener(
        'touchend',
        function (event) {
          if (modalWheelLocked) return;

          var touch = event.changedTouches[0];
          var dx = touch.clientX - modalTouchStartX;
          var dy = touch.clientY - modalTouchStartY;
          if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy)) return;
          if (dx < 0) {
            goToNextModalSlide();
          } else {
            goToPrevModalSlide();
          }

          lockModalWheel();
        },
        { passive: true }
      );
    }

    layoutTabButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        layoutTabButtons.forEach(function (btn) {
          btn.classList.toggle('is-active', btn === button);
        });
        setLayoutPlanImage(button.dataset.layoutFloor || 'ground');
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    modal.addEventListener('click', function (event) {
      if (
        event.target === modal ||
        event.target.classList.contains('om-property-modal__backdrop')
      ) {
        closeModal();
        return;
      }

      var formCta = event.target.closest(
        '.om-property-modal__actions a[href="#callback-modal"]'
      );
      if (formCta) {
        closeModal();
      }
    });

    window.addEventListener('resize', function () {
      if (!modal.classList.contains('is-open')) return;

      if (modalResizeRaf) {
        cancelAnimationFrame(modalResizeRaf);
      }

      modalResizeRaf = requestAnimationFrame(function () {
        setActiveModalSlide(MODAL_SLIDE_ORDER[modalActiveSlideIndex], {
          skipAnimation: true,
        });
      });
    });

    bindTriggers();
    document.addEventListener('om-property-cards-rendered', bindTriggers);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
