/**
 * OffMarket — Premium property detail modal
 * 6-slide horizontal carousel
 */
(function () {
  'use strict';

  var modalController = {
    ready: false,
    pendingId: null,
    open: null,
    close: null,
  };

  var bootObserver = null;

  function destroyBoot() {
    if (typeof boot.cleanup === 'function') {
      boot.cleanup();
    }
    boot.didInit = false;
    boot.modal = null;
    boot.cleanup = null;
    modalController.ready = false;
    modalController.pendingId = null;
    window.omPropertyModal = {
      open: requestOpenPropertyModal,
      close: function () {
        var closeButton = document.querySelector('[data-property-modal-close]');
        if (closeButton) closeButton.click();
      },
      data: propertyModalData,
    };
  }

  function requestOpenPropertyModal(propertyId) {
    if (!propertyId) return;
    if (modalController.ready && typeof modalController.open === 'function') {
      modalController.open(propertyId);
      return;
    }
    modalController.pendingId = propertyId;
    scheduleBoot();
  }

  function scheduleBoot() {
    initPropertyDetailPage();
    boot();
    if (
      boot.didInit &&
      (initPropertyDetailPage.done ||
        !document.querySelector('[data-property-detail-page]'))
    ) {
      return;
    }
    if (bootObserver || typeof MutationObserver === 'undefined') {
      return;
    }
    bootObserver = new MutationObserver(function () {
      if (
        !document.querySelector('[data-property-modal]') &&
        !document.querySelector('[data-property-detail-page]')
      ) {
        return;
      }
      bootObserver.disconnect();
      bootObserver = null;
      initPropertyDetailPage();
      boot();
    });
    bootObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  document.addEventListener(
    'click',
    function (event) {
      var trigger = event.target.closest('[data-property-modal-trigger]');
      if (!trigger) return;
      if (trigger.disabled || trigger.getAttribute('aria-disabled') === 'true') return;
      event.preventDefault();
      event.stopPropagation();
      var propertyId = trigger.getAttribute('data-property-id');
      if (propertyId) requestOpenPropertyModal(propertyId);
    },
    true
  );

  document.addEventListener(
    'pointerup',
    function (event) {
      var target = event.target;
      var closeTarget = target && target.closest ? target.closest('[data-property-modal-close]') : null;
      if (!closeTarget) return;
      var modal = closeTarget.closest('[data-property-modal]');
      if (!modal || !modal.classList.contains('is-open')) return;
      event.preventDefault();
      event.stopPropagation();
      if (typeof modalController.close === 'function') {
        modalController.close();
      }
    },
    true
  );

  document.addEventListener(
    'pointerup',
    function (event) {
      if (event.pointerType === 'mouse') return;
      var target = event.target;
      var trigger = target && target.closest ? target.closest('[data-property-modal-trigger]') : null;
      if (!trigger) return;
      if (trigger.disabled || trigger.getAttribute('aria-disabled') === 'true') return;
      event.preventDefault();
      event.stopPropagation();
      requestOpenPropertyModal(trigger.getAttribute('data-property-id'));
    },
    true
  );

  document.addEventListener(
    'keydown',
    function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      var target = event.target;
      var trigger = target && target.closest ? target.closest('[data-property-modal-trigger]') : null;
      if (!trigger) return;
      if (trigger.disabled || trigger.getAttribute('aria-disabled') === 'true') return;
      event.preventDefault();
      event.stopPropagation();
      requestOpenPropertyModal(trigger.getAttribute('data-property-id'));
    },
    true
  );

  document.addEventListener(
    'click',
    function (event) {
      var target = event.target;
      var closeTarget = target && target.closest ? target.closest('[data-property-modal-close]') : null;
      if (!closeTarget) return;
      var modal = closeTarget.closest('[data-property-modal]');
      if (!modal || !modal.classList.contains('is-open')) return;
      event.preventDefault();
      event.stopPropagation();
      if (typeof modalController.close === 'function') {
        modalController.close();
      }
    },
    true
  );

  document.addEventListener('om-react-ready', scheduleBoot);
  document.addEventListener('om-property-cards-rendered', scheduleBoot);

  document.addEventListener(
    'click',
    function (event) {
      var card = event.target.closest('[data-property-modal-card]');
      if (!card) return;
      if (event.target.closest('[data-property-modal-trigger]')) return;
      var mediaHit = event.target.closest('.om-reveal-card__media');
      var arrowHit = event.target.closest('.om-reveal-card__image-arrow');
      var infoHit = event.target.closest('.om-reveal-card__info');
      if (!mediaHit && !arrowHit && !infoHit) return;
      event.preventDefault();
      var propertyId = card.getAttribute('data-property-id');
      if (propertyId) requestOpenPropertyModal(propertyId);
    },
    true
  );

  var VILLA_JAZ_IMAGE_BASE = '/assets/images/properties/villa-sur-plan-marrakech/';
  // Internal project name: Hyper — public title remains Appartement premium à Guéliz
  var HYPER_IMAGE_BASE =
    '/assets/images/properties/appartement-sur-plan-gueliz/';

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
    'Appartement sur plan': 'blueprint',
    'Guéliz hyper-centre': 'location',
    'Surfaces de 39 m² à 140 m²': 'grid',
    'Adresse hyper-centre': 'location',
    'Secteur recherché': 'location',
    'Fort potentiel locatif': 'euro',
    'Accès rapide aux services': 'location',
    "Projet adapté à l'habitation ou à l'investissement": 'blueprint',
    'Disponibilités sur demande': 'refresh',
    'Conditions actualisées sur demande': 'refresh',
    '30% à chaque avancement': 'calendar',
    '10% à la livraison': 'calendar',
    '30% à la réservation': 'calendar',
    'Programme neuf sur plan': 'blueprint',
    '39–140 m²': 'grid',
    'À partir de 1,05 M MAD': 'euro',
    '2028 — 1ère livraison': 'calendar',
    'Disponibilités sur demande': 'refresh',
    'Conditions actualisées sur demande': 'refresh',
    'Recevoir la fiche privée': 'document',
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
      spa:
        '<path d="M8 14c1.2-2.4 2.8-3.6 4-3.6s2.8 1.2 4 3.6"/><path d="M6 18c2-3 4.5-4.5 6-4.5s4 1.5 6 4.5"/><path d="M12 4v3"/><path d="M9 6l1.5 2M15 6l-1.5 2"/>',
      jacuzzi:
        '<circle cx="8" cy="14" r="1.1"/><circle cx="12" cy="11" r="1.1"/><circle cx="16" cy="14" r="1.1"/><circle cx="10" cy="17" r="0.9"/><circle cx="14" cy="17" r="0.9"/><path d="M5 19c2.2-1.2 4.4-1.8 7-1.8s4.8.6 7 1.8"/>',
      dumbbell:
        '<path d="M6 9v6"/><path d="M18 9v6"/><path d="M8 10h8"/><path d="M4 10.5v3"/><path d="M4 10.5h2v3H4z"/><path d="M18 10.5v3"/><path d="M18 10.5h2v3h-2z"/>',
      vestiaires:
        '<circle cx="9" cy="8" r="2.2"/><circle cx="15" cy="8" r="2.2"/><path d="M6.5 20v-4.5c0-1.4 1.1-2.5 2.5-2.5H11"/><path d="M17.5 20v-4.5c0-1.4-1.1-2.5-2.5-2.5H13"/><path d="M12 11v9"/>',
      parking:
        '<path d="M6 6h7l5 5v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><path d="M9 11h3.2a2 2 0 1 1 0 4H9v-4Z"/>',
      tag:
        '<path d="M20 12l-8 8-8-8V4h8l8 8Z"/><circle cx="8.5" cy="8.5" r="1.2"/>',
    };

    var body = paths[name];
    if (!body) return '';

    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      body +
      '</svg>'
    );
  }

  function hyperFeatureIcon(name) {
    var body = {
      pool:
        '<path d="M4 16c1.4 0 1.4-1 2.8-1s1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1"/><path d="M4 20c1.4 0 1.4-1 2.8-1s1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1"/>',
      spa:
        '<path d="M8 14c1.2-2.4 2.8-3.6 4-3.6s2.8 1.2 4 3.6"/><path d="M6 18c2-3 4.5-4.5 6-4.5s4 1.5 6 4.5"/><path d="M12 4v3"/><path d="M9 6l1.5 2M15 6l-1.5 2"/>',
      jacuzzi:
        '<circle cx="8" cy="14" r="1.1"/><circle cx="12" cy="11" r="1.1"/><circle cx="16" cy="14" r="1.1"/><circle cx="10" cy="17" r="0.9"/><circle cx="14" cy="17" r="0.9"/><path d="M5 19c2.2-1.2 4.4-1.8 7-1.8s4.8.6 7 1.8"/>',
      dumbbell:
        '<path d="M6 9v6"/><path d="M18 9v6"/><path d="M8 10h8"/><path d="M4 10.5v3"/><path d="M4 10.5h2v3H4z"/><path d="M18 10.5v3"/><path d="M18 10.5h2v3h-2z"/>',
      vestiaires:
        '<circle cx="9" cy="8" r="2.2"/><circle cx="15" cy="8" r="2.2"/><path d="M6.5 20v-4.5c0-1.4 1.1-2.5 2.5-2.5H11"/><path d="M17.5 20v-4.5c0-1.4-1.1-2.5-2.5-2.5H13"/><path d="M12 11v9"/>',
      parking:
        '<path d="M6 6h7l5 5v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><path d="M9 11h3.2a2 2 0 1 1 0 4H9v-4Z"/>',
      location:
        '<path d="M12 21s5-4.2 5-9.5a5 5 0 1 0-10 0C7 16.8 12 21 12 21z"/><circle cx="12" cy="11.5" r="1.75"/>',
      calendar:
        '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
      euro:
        '<path d="M17 5.5A7 7 0 1 0 17 18.5"/><path d="M4 10h10M4 14h9"/>',
      document:
        '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/>',
      grid:
        '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
      blueprint:
        '<path d="M4 5h16v14H4z"/><path d="M8 5v14M4 10h8M12 14h8M16 14v5"/>',
    }[name];

    if (!body) return '';

    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
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

  var HYPER_GALLERY = {
    exterior: [
      HYPER_IMAGE_BASE + 'b666e486-f6f8-4f32-b709-b89099173502.JPG',
      HYPER_IMAGE_BASE + 'f5fc7b32-9646-431c-a7be-087caed5a47c.JPG',
      HYPER_IMAGE_BASE + 'daffa3df-bb0e-4084-9076-dae373f40911.JPG',
      HYPER_IMAGE_BASE + 'c194d969-39fb-4722-b5bc-b3cc0cf3ee47.JPG',
      HYPER_IMAGE_BASE + '27848bce-5065-4653-8b17-cdadaf3633f4.JPG',
    ],
    interior: [
      HYPER_IMAGE_BASE + '035d9afc-41c4-4b90-afae-7126864ef247.JPG',
      HYPER_IMAGE_BASE + '6cf39a95-9f7b-46a5-9d27-e4890db0cf8a.JPG',
      HYPER_IMAGE_BASE + '1025f6be-dfdb-4ff2-8a74-178a9e52520d.JPG',
      HYPER_IMAGE_BASE + '5422bad2-aeda-4c93-b9c0-5dce469e54dc.JPG',
      HYPER_IMAGE_BASE + '5fbc84d1-d8eb-40cc-ab87-337e326c70ff.JPG',
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
      formHref: '/contact/?intent=villa-jaz',
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
      theme: 'hyper',
      index: '02',
      location: 'MARRAKECH',
      type: 'Appartement',
      price: 'À partir de 1,05 M MAD',
      selection: 'Programme neuf sur plan',
      title: 'Appartement premium à Guéliz',
      subtitle:
        'Studios, appartements, duplex et commerces en hyper-centre de Marrakech.',
      image: HYPER_IMAGE_BASE + 'b666e486-f6f8-4f32-b709-b89099173502.JPG',
      alt: 'Appartement premium à Guéliz — Guéliz hyper-centre, Marrakech',
      formHref: '/contact/?intent=appartement-gueliz',
      ctaPrimary: 'Réserver ton appartement',
      ctaOutline: 'Recevoir la fiche privée',
      typologies: [
        'Studio',
        'Appartement',
        'Duplex',
        'Magasin commercial',
      ],
      facts: [
        { label: 'Type', value: 'Programme neuf haut standing' },
        { label: 'Localisation', value: 'Guéliz hyper-centre, Marrakech' },
        { label: 'Surfaces', value: '39–140 m²' },
        { label: 'Statut', value: 'Programme neuf sur plan' },
        { label: 'Prix', value: 'À partir de 1,05 M MAD' },
        { label: 'Livraison', value: '2028 — 1ère livraison' },
        { label: 'Paiement', value: '30% à la réservation' },
      ],
      generalFacts: [
        { label: 'Surfaces', value: '39–140 m²' },
        { label: 'Prix', value: 'À partir de 1,05 M MAD' },
        { label: 'Paiement', value: '30% à la réservation' },
        { label: 'Livraison', value: '2028 — 1ère livraison' },
      ],
      description:
        'Programme immobilier neuf haut standing à Guéliz, avec studios, appartements, duplex et commerces. Une adresse sélectionnée pour acheter un bien neuf en hyper-centre de Marrakech.',
      about: {
        blocks: [
          {
            title: 'Positionnement',
            text:
              'Hyper-centre, à proximité immédiate des commerces, restaurants et services.',
          },
          {
            title: 'Conception',
            text:
              'Une esthétique sobre, raffinée et intemporelle, inspirée des codes hôteliers haut de gamme.',
          },
          {
            title: 'Projet patrimonial',
            text:
              'Un actif pensé pour habiter, préparer un pied-à-terre ou étudier une stratégie patrimoniale à Guéliz.',
          },
        ],
        highlight: {
          value: '39–140 m²',
          text:
            'Studios, appartements, duplex et commerces à Guéliz hyper-centre',
        },
        image: HYPER_IMAGE_BASE + 'ef83c70c-c6c2-43cc-b94b-7ec6ad42e4cc.JPG',
      },
      characteristicsLayout: 'hyper',
      characteristicsTitle: 'Un confort pensé comme une expérience',
      characteristicsIntro:
        'Chaque détail vise à créer une expérience résidentielle plus sereine, plus élégante et plus cohérente dans le temps.',
      characteristicFeatures: [
        {
          icon: 'pool',
          title: 'Piscines au rez-de-chaussée',
          text:
            'Deux bassins pensés pour des usages complémentaires, avec une piscine chauffée et une piscine classique intégrées dès le rez-de-chaussée.',
        },
        {
          icon: 'spa',
          title: 'Spa résidentiel',
          text:
            'Un espace spa dédié au relâchement et au bien-être, conçu pour prolonger l’atmosphère calme et confidentielle de la résidence.',
        },
        {
          icon: 'jacuzzi',
          title: 'Jacuzzi',
          text:
            'Un jacuzzi intégré aux espaces détente pour offrir un supplément de confort recherché dans une adresse de haut standing.',
        },
        {
          icon: 'dumbbell',
          title: 'Salle de sport',
          text:
            'Une salle de sport réservée aux résidents, pensée pour un usage quotidien confortable au sein même du projet.',
        },
        {
          icon: 'vestiaires',
          title: 'Vestiaires séparés hommes / femmes',
          text:
            'Des vestiaires distincts pour hommes et femmes, conçus pour offrir plus d’intimité, de confort et de praticité au quotidien.',
        },
        {
          icon: 'parking',
          title: 'Parking titré & box privatifs',
          text:
            'Des stationnements titrés et des box privatifs qui renforcent la valeur patrimoniale et la qualité d’usage de l’ensemble.',
        },
      ],
      characteristicFacts: [
        { label: 'Programme neuf sur plan', icon: 'blueprint' },
        { label: 'Guéliz hyper-centre', icon: 'location' },
        { label: '39–140 m²', icon: 'grid' },
        { label: 'À partir de 1,05 M MAD', icon: 'euro' },
        { label: '30% à la réservation', icon: 'calendar' },
        { label: '2028 — 1ère livraison', icon: 'calendar' },
      ],
      characteristicsPayment: {
        title: 'Modalités de paiement',
        text:
          '30% à la réservation — ≈ 39 000 € d’apport. Disponibilités et conditions actualisées communiquées sur demande.',
      },
      characteristicsImage:
        HYPER_IMAGE_BASE + 'f5fc7b32-9646-431c-a7be-087caed5a47c.JPG',
      galleries: HYPER_GALLERY,
      layout: {
        surface: '39–140 m²',
        rooms: 'Studio · Appartement · Duplex',
        baths: 'Détails sur demande',
        description:
          'Plans, surfaces disponibles et disponibilités actualisées communiqués après demande via le formulaire.',
        image: '',
        hideFloorTabs: true,
        placeholderTitle: 'Plans sur demande',
        placeholderText:
          'Remplissez le formulaire pour recevoir les plans, les surfaces disponibles et les disponibilités actualisées.',
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
      formHref: '/off-market/?intent=riad-medina',
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
      formHref: '/contact/?intent=opportunite-sur-plan',
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

  var PROPERTY_MODAL_TEXT_TRANSLATIONS = {
    en: {
      'Fermer la fiche': 'Close property sheet',
      'Navigation fiche bien': 'Property sheet navigation',
      'Plans transmis sur demande': 'Plans available on request',
      'Rappel': 'Callback',
      'Recevoir le dossier': 'Receive the dossier',
      'Villa sur plan': 'Off-plan villa',
      'Sélection :': 'Selection:',
      'Projet sur plan': 'Off-plan project',
      'À partir de 351 000 €': 'From €351,000',
      '32 villas sur plan à Marrakech, avec une disponibilité limitée à 7 villas restantes.':
        '32 off-plan villas in Marrakech, with limited availability of 7 villas remaining.',
      'Villa Jaz — villas sur plan à Marrakech':
        'Villa Jaz — off-plan villas in Marrakech',
      'Réserver ta villa': 'Reserve your villa',
      'Remplir le formulaire pour plus de détails': 'Complete the form for more details',
      'Type': 'Type',
      'Total': 'Total',
      'Disponibilité': 'Availability',
      'Statut': 'Status',
      'Prix': 'Price',
      'Adresse': 'Address',
      'Paiement': 'Payment',
      '32 villas': '32 villas',
      '7 villas restantes': '7 villas remaining',
      'Communiquée sur demande': 'Shared on request',
      '30% à la réservation, puis 30% à chaque avancement du projet':
        '30% on reservation, then 30% at each project milestone',
      'Villa Jaz est une opportunité sur plan pensée pour les acquéreurs qui recherchent une villa privée à Marrakech, avec un cadre résidentiel, des espaces extérieurs et une disponibilité volontairement limitée.':
        'Villa Jaz is an off-plan opportunity for buyers seeking a private villa in Marrakech, with a residential setting, outdoor spaces and intentionally limited availability.',
      'Le projet réunit 32 villas, dont 7 restent disponibles. Les informations détaillées, les plans, les disponibilités actualisées et les conditions précises sont communiqués après formulaire afin de préserver la confidentialité du projet.':
        'The project includes 32 villas, of which 7 remain available. Detailed information, plans, updated availability and exact terms are shared after the form to preserve project confidentiality.',
      '32 villas au total': '32 villas in total',
      'Prix à partir de 351 000 €': 'Price from €351,000',
      '30% à la réservation': '30% on reservation',
      '30% à chaque avancement du projet': '30% at each project milestone',
      'Adresse communiquée sur demande': 'Address shared on request',
      'Plans sur formulaire': 'Plans via form',
      'Disponibilités actualisées': 'Updated availability',
      'Détails complets sur demande': 'Full details on request',
      'Réservation sur formulaire': 'Reservation via form',
      'Informations clés': 'Key information',
      'Disponibilité limitée': 'Limited availability',
      'sur 32 villas': 'of 32 villas',
      'Confort & équipements': 'Comfort & amenities',
      'Piscine privée dans chaque villa': 'Private pool in every villa',
      'Espaces verts paysagers': 'Landscaped green spaces',
      'Aire de jeux pour enfants': "Children's play area",
      'Équipements haut de gamme': 'High-end amenities',
      'Jardins et espaces extérieurs aménagés': 'Landscaped gardens and outdoor spaces',
      'Confidentialité & réservation': 'Confidentiality & reservation',
      'Résidence sécurisée': 'Secure residence',
      'Sécurité et confidentialité': 'Security and confidentiality',
      'Modalités de paiement': 'Payment terms',
      '30% à la réservation, puis 30% à chaque avancement du projet. Remplir le formulaire pour recevoir les détails complets.':
        '30% on reservation, then 30% at each project milestone. Complete the form to receive the full details.',
      'Détails sur demande': 'Details on request',
      'Modalités de paiement — 30% à la réservation. 30% à chaque avancement du projet. Pour recevoir les détails complets, les disponibilités exactes et les conditions actualisées, merci de remplir le formulaire.\n\nDisponibilité limitée — 7 villas restantes sur un total de 32 villas.':
        'Payment terms — 30% on reservation. 30% at each project milestone. To receive full details, exact availability and updated terms, please complete the form.\n\nLimited availability — 7 villas remaining out of 32 villas.',
      'Appartement': 'Apartment',
      'À partir de 1,05 M MAD': 'From MAD 1.05M',
      'Programme neuf sur plan': 'New off-plan development',
      'Appartement premium à Guéliz': 'Premium apartment in Guéliz',
      'Studios, appartements, duplex et commerces en hyper-centre de Marrakech.':
        'Studios, apartments, duplexes and retail units in Marrakech hyper-centre.',
      'Appartement premium à Guéliz — Guéliz hyper-centre, Marrakech':
        'Premium apartment in Guéliz — Guéliz hyper-centre, Marrakech',
      'Réserver ton appartement': 'Reserve your apartment',
      'Recevoir la fiche privée': 'Receive the private sheet',
      'Studio': 'Studio',
      'Duplex': 'Duplex',
      'Magasin commercial': 'Retail unit',
      'Programme neuf haut standing': 'High-end new development',
      'Localisation': 'Location',
      'Guéliz hyper-centre, Marrakech': 'Guéliz hyper-centre, Marrakech',
      'Surfaces': 'Areas',
      'Livraison': 'Delivery',
      '2028 — 1ère livraison': '2028 — first delivery',
      '39–140 m²': '39–140 m²',
      'Programme immobilier neuf haut standing à Guéliz, avec studios, appartements, duplex et commerces. Une adresse sélectionnée pour acheter un bien neuf en hyper-centre de Marrakech.':
        'High-end new real estate development in Guéliz, with studios, apartments, duplexes and retail units. A selected address for buying a new property in Marrakech hyper-centre.',
      'Positionnement': 'Positioning',
      'Hyper-centre, à proximité immédiate des commerces, restaurants et services.':
        'Hyper-centre, immediately close to shops, restaurants and services.',
      'Conception': 'Design',
      'Une esthétique sobre, raffinée et intemporelle, inspirée des codes hôteliers haut de gamme.':
        'A sober, refined and timeless aesthetic inspired by high-end hospitality codes.',
      'Projet patrimonial': 'Legacy asset',
      'Un actif pensé pour habiter, préparer un pied-à-terre ou étudier une stratégie patrimoniale à Guéliz.':
        'An asset designed for living, preparing a pied-a-terre or studying a legacy strategy in Guéliz.',
      'Studios, appartements, duplex et commerces à Guéliz hyper-centre':
        'Studios, apartments, duplexes and retail units in Guéliz hyper-centre',
      'Un confort pensé comme une expérience': 'Comfort designed as an experience',
      'Chaque détail vise à créer une expérience résidentielle plus sereine, plus élégante et plus cohérente dans le temps.':
        'Every detail is designed to create a calmer, more elegant and more coherent residential experience over time.',
      'Piscines au rez-de-chaussée': 'Ground-floor pools',
      'Deux bassins pensés pour des usages complémentaires, avec une piscine chauffée et une piscine classique intégrées dès le rez-de-chaussée.':
        'Two pools designed for complementary uses, with a heated pool and a classic pool integrated from the ground floor.',
      'Spa résidentiel': 'Residential spa',
      'Un espace spa dédié au relâchement et au bien-être, conçu pour prolonger l’atmosphère calme et confidentielle de la résidence.':
        'A spa area dedicated to relaxation and well-being, designed to extend the calm and confidential atmosphere of the residence.',
      'Jacuzzi': 'Jacuzzi',
      'Un jacuzzi intégré aux espaces détente pour offrir un supplément de confort recherché dans une adresse de haut standing.':
        'A jacuzzi integrated into the relaxation areas to add the sought-after comfort of a high-end address.',
      'Salle de sport': 'Gym',
      'Une salle de sport réservée aux résidents, pensée pour un usage quotidien confortable au sein même du projet.':
        'A gym reserved for residents, designed for comfortable daily use within the project itself.',
      'Vestiaires séparés hommes / femmes': 'Separate men / women changing rooms',
      'Des vestiaires distincts pour hommes et femmes, conçus pour offrir plus d’intimité, de confort et de praticité au quotidien.':
        'Separate changing rooms for men and women, designed to offer more privacy, comfort and practicality day to day.',
      'Parking titré & box privatifs': 'Titled parking & private storage boxes',
      'Des stationnements titrés et des box privatifs qui renforcent la valeur patrimoniale et la qualité d’usage de l’ensemble.':
        'Titled parking spaces and private storage boxes that strengthen the asset value and everyday quality of use.',
      '30% à la réservation — ≈ 39 000 € d’apport. Disponibilités et conditions actualisées communiquées sur demande.':
        '30% on reservation — approx. €39,000 contribution. Updated availability and terms shared on request.',
      'Plans, surfaces disponibles et disponibilités actualisées communiqués après demande via le formulaire.':
        'Plans, available areas and updated availability shared after request through the form.',
      'Plans sur demande': 'Plans on request',
      'Remplissez le formulaire pour recevoir les plans, les surfaces disponibles et les disponibilités actualisées.':
        'Complete the form to receive plans, available areas and updated availability.',
      'Riad': 'Riad',
      'Prix sur demande': 'Price on request',
      'Riad privé': 'Private riad',
      'Riad de caractère à la Médina': 'Character riad in the Medina',
      'Médina · architecture · emplacement rare': 'Medina · architecture · rare location',
      'Un riad de caractère dans la médina de Marrakech, sélectionné pour son cachet architectural, son emplacement et son potentiel de valorisation.':
        'A character riad in the Marrakech medina, selected for its architectural cachet, location and value potential.',
      'Secteur': 'Area',
      'Médina': 'Medina',
      'Style': 'Style',
      'Patrimoine': 'Heritage',
      'Accès': 'Access',
      'Sélection privée': 'Private selection',
      'Un riad de caractère dans la médina de Marrakech, sélectionné pour son cachet architectural et son emplacement rare.':
        'A character riad in the Marrakech medina, selected for its architectural cachet and rare location.',
      'Bien patrimonial avec éléments architecturaux marocains, volumes intérieurs généreux et fort potentiel de valorisation.':
        'A heritage asset with Moroccan architectural details, generous interior volumes and strong value potential.',
      'Patio': 'Patio',
      'Terrasse': 'Terrace',
      'Architecture patrimoniale': 'Heritage architecture',
      'Sécurité': 'Security',
      'Salon de réception': 'Reception lounge',
      'Matériaux traditionnels': 'Traditional materials',
      'Emplacement Médina': 'Medina location',
      'Cachet historique': 'Historic character',
      'Volumes intérieurs': 'Interior volumes',
      'Accès sélection privée': 'Private selection access',
      'Potentiel locatif': 'Rental potential',
      'Rénovation premium': 'Premium renovation',
      'Sur demande': 'On request',
      'Dossier complet transmis sur demande après qualification.':
        'Full dossier shared on request after qualification.',
      'Sur plan': 'Off-plan',
      'Pré-lancement': 'Pre-launch',
      'Opportunité sur plan à Marrakech': 'Off-plan opportunity in Marrakech',
      'Pré-lancement · investissement · disponibilité limitée':
        'Pre-launch · investment · limited availability',
      "Une opportunité en pré-lancement, accessible avant diffusion publique, avec un positionnement pensé pour l'investissement à Marrakech.":
        'A pre-launch opportunity, accessible before public release, with positioning designed for investment in Marrakech.',
      'Prioritaire': 'Priority',
      'Projet': 'Project',
      'Limitée': 'Limited',
      "Une opportunité en pré-lancement, accessible avant diffusion publique, avec un positionnement pensé pour l'investissement.":
        'A pre-launch opportunity, accessible before public release, with positioning designed for investment.',
      'Accès prioritaire à une sélection confidentielle, avec disponibilité limitée et dossier transmis sur qualification.':
        'Priority access to a confidential selection, with limited availability and dossier shared after qualification.',
      'Investissement': 'Investment',
      'Accès prioritaire': 'Priority access',
      'Disponibilité limitée': 'Limited availability',
      'Piscine': 'Pool',
      'Jardin': 'Garden',
      'Parking': 'Parking',
      'Livraison programmée': 'Scheduled delivery',
      'Plans détaillés transmis après échange.':
        'Detailed plans shared after an exchange.',
      'photo': 'photo',
      'photos': 'photos',
      'extérieur': 'exterior',
      'intérieur': 'interior',
      'Plan': 'Plan',
      'étage': 'first floor',
      'rez-de-chaussée': 'ground floor',
    },
    nl: {
      'Fermer la fiche': 'Vastgoedfiche sluiten',
      'Navigation fiche bien': 'Navigatie vastgoedfiche',
      'Plans transmis sur demande': 'Plattegronden beschikbaar op aanvraag',
      'Rappel': 'Terugbelverzoek',
      'Recevoir le dossier': 'Het dossier ontvangen',
      'Villa sur plan': 'Nieuwbouwvilla',
      'Sélection :': 'Selectie:',
      'Projet sur plan': 'Nieuwbouwproject',
      'À partir de 351 000 €': 'Vanaf €351.000',
      '32 villas sur plan à Marrakech, avec une disponibilité limitée à 7 villas restantes.':
        '32 nieuwbouwvilla’s in Marrakech, met beperkte beschikbaarheid van 7 resterende villa’s.',
      'Villa Jaz — villas sur plan à Marrakech':
        'Villa Jaz — nieuwbouwvilla’s in Marrakech',
      'Réserver ta villa': 'Uw villa reserveren',
      'Remplir le formulaire pour plus de détails': 'Vul het formulier in voor meer details',
      'Type': 'Type',
      'Total': 'Totaal',
      'Disponibilité': 'Beschikbaarheid',
      'Statut': 'Status',
      'Prix': 'Prijs',
      'Adresse': 'Adres',
      'Paiement': 'Betaling',
      '32 villas': '32 villa’s',
      '7 villas restantes': '7 villa’s beschikbaar',
      'Communiquée sur demande': 'Op aanvraag gedeeld',
      '30% à la réservation, puis 30% à chaque avancement du projet':
        '30% bij reservering, daarna 30% bij elke projectfase',
      'Villa Jaz est une opportunité sur plan pensée pour les acquéreurs qui recherchent une villa privée à Marrakech, avec un cadre résidentiel, des espaces extérieurs et une disponibilité volontairement limitée.':
        'Villa Jaz is een nieuwbouwkans voor kopers die een privévilla in Marrakech zoeken, met een residentiële omgeving, buitenruimtes en bewust beperkte beschikbaarheid.',
      'Le projet réunit 32 villas, dont 7 restent disponibles. Les informations détaillées, les plans, les disponibilités actualisées et les conditions précises sont communiqués après formulaire afin de préserver la confidentialité du projet.':
        'Het project telt 32 villa’s, waarvan er 7 beschikbaar blijven. Gedetailleerde informatie, plannen, actuele beschikbaarheid en exacte voorwaarden worden na het formulier gedeeld om de vertrouwelijkheid van het project te bewaren.',
      '32 villas au total': '32 villa’s in totaal',
      'Prix à partir de 351 000 €': 'Prijs vanaf €351.000',
      '30% à la réservation': '30% bij reservering',
      '30% à chaque avancement du projet': '30% bij elke projectfase',
      'Adresse communiquée sur demande': 'Adres op aanvraag gedeeld',
      'Plans sur formulaire': 'Plannen via formulier',
      'Disponibilités actualisées': 'Actuele beschikbaarheid',
      'Détails complets sur demande': 'Volledige details op aanvraag',
      'Réservation sur formulaire': 'Reservering via formulier',
      'Informations clés': 'Kerninformatie',
      'Disponibilité limitée': 'Beperkte beschikbaarheid',
      'sur 32 villas': 'van 32 villa’s',
      'Confort & équipements': 'Comfort en voorzieningen',
      'Piscine privée dans chaque villa': 'Privézwembad bij elke villa',
      'Espaces verts paysagers': 'Aangelegde groene ruimtes',
      'Aire de jeux pour enfants': 'Speelzone voor kinderen',
      'Équipements haut de gamme': 'Hoogwaardige voorzieningen',
      'Jardins et espaces extérieurs aménagés': 'Aangelegde tuinen en buitenruimtes',
      'Confidentialité & réservation': 'Vertrouwelijkheid en reservering',
      'Résidence sécurisée': 'Beveiligde residentie',
      'Sécurité et confidentialité': 'Veiligheid en vertrouwelijkheid',
      'Modalités de paiement': 'Betalingsvoorwaarden',
      '30% à la réservation, puis 30% à chaque avancement du projet. Remplir le formulaire pour recevoir les détails complets.':
        '30% bij reservering, daarna 30% bij elke projectfase. Vul het formulier in om de volledige details te ontvangen.',
      'Détails sur demande': 'Details op aanvraag',
      'Modalités de paiement — 30% à la réservation. 30% à chaque avancement du projet. Pour recevoir les détails complets, les disponibilités exactes et les conditions actualisées, merci de remplir le formulaire.\n\nDisponibilité limitée — 7 villas restantes sur un total de 32 villas.':
        'Betalingsvoorwaarden — 30% bij reservering. 30% bij elke projectfase. Vul het formulier in om de volledige details, exacte beschikbaarheid en actuele voorwaarden te ontvangen.\n\nBeperkte beschikbaarheid — 7 villa’s beschikbaar op een totaal van 32 villa’s.',
      'Appartement': 'appartement',
      'À partir de 1,05 M MAD': 'Vanaf 1,05 M MAD',
      'Programme neuf sur plan': 'Nieuwbouwprogramma op plan',
      'Appartement premium à Guéliz': 'Premium appartement in Guéliz',
      'Studios, appartements, duplex et commerces en hyper-centre de Marrakech.':
        'Studio’s, appartementen, duplexen en handelsruimtes in het hypercentrum van Marrakech.',
      'Appartement premium à Guéliz — Guéliz hyper-centre, Marrakech':
        'Premium appartement in Guéliz — hypercentrum Guéliz, Marrakech',
      'Réserver ton appartement': 'Uw appartement reserveren',
      'Recevoir la fiche privée': 'De privéfiche ontvangen',
      'Studio': 'Studio',
      'Duplex': 'Duplex',
      'Magasin commercial': 'Handelsruimte',
      'Programme neuf haut standing': 'Hoogwaardig nieuwbouwprogramma',
      'Localisation': 'Locatie',
      'Guéliz hyper-centre, Marrakech': 'Hypercentrum Guéliz, Marrakech',
      'Surfaces': 'Oppervlaktes',
      'Livraison': 'Oplevering',
      '2028 — 1ère livraison': '2028 — eerste oplevering',
      '39–140 m²': '39–140 m²',
      'Programme immobilier neuf haut standing à Guéliz, avec studios, appartements, duplex et commerces. Une adresse sélectionnée pour acheter un bien neuf en hyper-centre de Marrakech.':
        'Hoogwaardig nieuwbouwprogramma in Guéliz, met studio’s, appartementen, duplexen en handelsruimtes. Een geselecteerd adres om nieuw vastgoed te kopen in het hypercentrum van Marrakech.',
      'Positionnement': 'Positionering',
      'Hyper-centre, à proximité immédiate des commerces, restaurants et services.':
        'Hypercentrum, direct nabij winkels, restaurants en diensten.',
      'Conception': 'Ontwerp',
      'Une esthétique sobre, raffinée et intemporelle, inspirée des codes hôteliers haut de gamme.':
        'Een sobere, verfijnde en tijdloze esthetiek, geïnspireerd op hoogwaardige hotelcodes.',
      'Projet patrimonial': 'Patrimoniaal project',
      'Un actif pensé pour habiter, préparer un pied-à-terre ou étudier une stratégie patrimoniale à Guéliz.':
        'Een asset ontworpen om te bewonen, een pied-a-terre voor te bereiden of een patrimoniale strategie in Guéliz te bestuderen.',
      'Studios, appartements, duplex et commerces à Guéliz hyper-centre':
        'Studio’s, appartementen, duplexen en handelsruimtes in het hypercentrum van Guéliz',
      'Un confort pensé comme une expérience': 'Comfort ontworpen als ervaring',
      'Chaque détail vise à créer une expérience résidentielle plus sereine, plus élégante et plus cohérente dans le temps.':
        'Elk detail is bedoeld om een rustigere, elegantere en duurzamere woonervaring te creëren.',
      'Piscines au rez-de-chaussée': 'Zwembaden op de begane grond',
      'Deux bassins pensés pour des usages complémentaires, avec une piscine chauffée et une piscine classique intégrées dès le rez-de-chaussée.':
        'Twee baden voor complementair gebruik, met een verwarmd zwembad en een klassiek zwembad vanaf de begane grond geïntegreerd.',
      'Spa résidentiel': 'Residentiële spa',
      'Un espace spa dédié au relâchement et au bien-être, conçu pour prolonger l’atmosphère calme et confidentielle de la résidence.':
        'Een spa-ruimte voor ontspanning en welzijn, ontworpen om de rustige en vertrouwelijke sfeer van de residentie door te trekken.',
      'Jacuzzi': 'Jacuzzi',
      'Un jacuzzi intégré aux espaces détente pour offrir un supplément de confort recherché dans une adresse de haut standing.':
        'Een jacuzzi geïntegreerd in de ontspanningsruimtes voor extra comfort in een hoogwaardig adres.',
      'Salle de sport': 'Fitnessruimte',
      'Une salle de sport réservée aux résidents, pensée pour un usage quotidien confortable au sein même du projet.':
        'Een fitnessruimte voor bewoners, ontworpen voor comfortabel dagelijks gebruik binnen het project zelf.',
      'Vestiaires séparés hommes / femmes': 'Gescheiden kleedkamers heren / dames',
      'Des vestiaires distincts pour hommes et femmes, conçus pour offrir plus d’intimité, de confort et de praticité au quotidien.':
        'Aparte kleedkamers voor heren en dames, ontworpen voor meer privacy, comfort en praktisch dagelijks gebruik.',
      'Parking titré & box privatifs': 'Getitelde parking en privéboxen',
      'Des stationnements titrés et des box privatifs qui renforcent la valeur patrimoniale et la qualité d’usage de l’ensemble.':
        'Getitelde parkeerplaatsen en privéboxen die de patrimoniale waarde en het gebruikscomfort versterken.',
      '30% à la réservation — ≈ 39 000 € d’apport. Disponibilités et conditions actualisées communiquées sur demande.':
        '30% bij reservering — circa €39.000 eigen inbreng. Actuele beschikbaarheid en voorwaarden op aanvraag.',
      'Plans, surfaces disponibles et disponibilités actualisées communiqués après demande via le formulaire.':
        'Plannen, beschikbare oppervlaktes en actuele beschikbaarheid worden na aanvraag via het formulier gedeeld.',
      'Plans sur demande': 'Plannen op aanvraag',
      'Remplissez le formulaire pour recevoir les plans, les surfaces disponibles et les disponibilités actualisées.':
        'Vul het formulier in om de plannen, beschikbare oppervlaktes en actuele beschikbaarheid te ontvangen.',
      'Riad': 'Riad',
      'Prix sur demande': 'Prijs op aanvraag',
      'Riad privé': 'Privé-riad',
      'Riad de caractère à la Médina': 'Karaktervolle riad in de Medina',
      'Médina · architecture · emplacement rare': 'Medina · architectuur · zeldzame ligging',
      'Un riad de caractère dans la médina de Marrakech, sélectionné pour son cachet architectural, son emplacement et son potentiel de valorisation.':
        'Een karaktervolle riad in de medina van Marrakech, geselecteerd om zijn architecturale uitstraling, ligging en waardepotentieel.',
      'Secteur': 'Sector',
      'Médina': 'Medina',
      'Style': 'Stijl',
      'Patrimoine': 'Erfgoed',
      'Accès': 'Toegang',
      'Sélection privée': 'Privéselectie',
      'Un riad de caractère dans la médina de Marrakech, sélectionné pour son cachet architectural et son emplacement rare.':
        'Een karaktervolle riad in de medina van Marrakech, geselecteerd om zijn architecturale uitstraling en zeldzame ligging.',
      'Bien patrimonial avec éléments architecturaux marocains, volumes intérieurs généreux et fort potentiel de valorisation.':
        'Patrimoniaal vastgoed met Marokkaanse architecturale elementen, royale binnenvolumes en sterk waardepotentieel.',
      'Patio': 'Patio',
      'Terrasse': 'Terras',
      'Architecture patrimoniale': 'Erfgoedarchitectuur',
      'Sécurité': 'Veiligheid',
      'Salon de réception': 'Ontvangstsalon',
      'Matériaux traditionnels': 'Traditionele materialen',
      'Emplacement Médina': 'Ligging in de Medina',
      'Cachet historique': 'Historisch karakter',
      'Volumes intérieurs': 'Binnenvolumes',
      'Accès sélection privée': 'Toegang tot privéselectie',
      'Potentiel locatif': 'Verhuurpotentieel',
      'Rénovation premium': 'Premium renovatie',
      'Sur demande': 'Op aanvraag',
      'Dossier complet transmis sur demande après qualification.':
        'Volledig dossier op aanvraag gedeeld na kwalificatie.',
      'Sur plan': 'Nieuwbouw',
      'Pré-lancement': 'Pre-lancering',
      'Opportunité sur plan à Marrakech': 'Nieuwbouwkans in Marrakech',
      'Pré-lancement · investissement · disponibilité limitée':
        'Pre-lancering · investering · beperkte beschikbaarheid',
      "Une opportunité en pré-lancement, accessible avant diffusion publique, avec un positionnement pensé pour l'investissement à Marrakech.":
        'Een kans in pre-lancering, toegankelijk voor publieke verspreiding, met een positionering gericht op investering in Marrakech.',
      'Prioritaire': 'Prioritair',
      'Projet': 'Project',
      'Limitée': 'Beperkt',
      "Une opportunité en pré-lancement, accessible avant diffusion publique, avec un positionnement pensé pour l'investissement.":
        'Een kans in pre-lancering, toegankelijk voor publieke verspreiding, met een positionering gericht op investering.',
      'Accès prioritaire à une sélection confidentielle, avec disponibilité limitée et dossier transmis sur qualification.':
        'Prioritaire toegang tot een vertrouwelijke selectie, met beperkte beschikbaarheid en dossier na kwalificatie.',
      'Investissement': 'Investering',
      'Accès prioritaire': 'Prioritaire toegang',
      'Disponibilité limitée': 'Beperkte beschikbaarheid',
      'Piscine': 'Zwembad',
      'Jardin': 'Tuin',
      'Parking': 'Parking',
      'Livraison programmée': 'Geplande oplevering',
      'Plans détaillés transmis après échange.':
        'Gedetailleerde plannen gedeeld na gesprek.',
      'photo': 'foto',
      'photos': "foto's",
      'extérieur': 'exterieur',
      'intérieur': 'interieur',
      'Plan': 'Plattegrond',
      'étage': 'verdieping',
      'rez-de-chaussée': 'begane grond',
    },
    it: {
      'Fermer la fiche': 'Chiudi la scheda immobiliare',
      'Navigation fiche bien': 'Navigazione scheda immobile',
      'Plans transmis sur demande': 'Planimetrie disponibili su richiesta',
      'Rappel': 'Richiamami',
      'Recevoir le dossier': 'Ricevi il dossier',
      'Villa sur plan': 'Villa su progetto',
      'Sélection :': 'Selezione:',
      'Projet sur plan': 'Progetto in costruzione',
      'À partir de 351 000 €': 'Da 351.000 €',
      '32 villas sur plan à Marrakech, avec une disponibilité limitée à 7 villas restantes.':
        '32 ville su progetto a Marrakech, con disponibilità limitata a 7 ville rimanenti.',
      'Villa Jaz — villas sur plan à Marrakech':
        'Villa Jaz — ville su progetto a Marrakech',
      'Réserver ta villa': 'Prenota la tua villa',
      'Remplir le formulaire pour plus de détails':
        'Compila il modulo per maggiori dettagli',
      'Type': 'Tipologia',
      'Total': 'Totale',
      'Disponibilité': 'Disponibilità',
      'Statut': 'Stato',
      'Prix': 'Prezzo',
      'Adresse': 'Indirizzo',
      'Paiement': 'Pagamento',
      '32 villas': '32 ville',
      '7 villas restantes': '7 ville rimanenti',
      'Communiquée sur demande': 'Comunicata su richiesta',
      '30% à la réservation, puis 30% à chaque avancement du projet':
        '30% alla prenotazione, poi 30% a ogni fase del progetto',
      'Villa Jaz est une opportunité sur plan pensée pour les acquéreurs qui recherchent une villa privée à Marrakech, avec un cadre résidentiel, des espaces extérieurs et une disponibilité volontairement limitée.':
        'Villa Jaz è un’opportunità su progetto per chi cerca una villa privata a Marrakech, in un contesto residenziale, con spazi esterni e una disponibilità volutamente limitata.',
      'Le projet réunit 32 villas, dont 7 restent disponibles. Les informations détaillées, les plans, les disponibilités actualisées et les conditions précises sont communiqués après formulaire afin de préserver la confidentialité du projet.':
        'Il progetto comprende 32 ville, di cui 7 ancora disponibili. Informazioni dettagliate, planimetrie, disponibilità aggiornate e condizioni precise vengono comunicate dopo la compilazione del modulo per tutelare la riservatezza del progetto.',
      '32 villas au total': '32 ville in totale',
      'Prix à partir de 351 000 €': 'Prezzo a partire da 351.000 €',
      '30% à la réservation': '30% alla prenotazione',
      '30% à chaque avancement du projet': '30% a ogni fase del progetto',
      'Adresse communiquée sur demande': 'Indirizzo comunicato su richiesta',
      'Plans sur formulaire': 'Planimetrie tramite modulo',
      'Disponibilités actualisées': 'Disponibilità aggiornate',
      'Détails complets sur demande': 'Dettagli completi su richiesta',
      'Réservation sur formulaire': 'Prenotazione tramite modulo',
      'Informations clés': 'Informazioni chiave',
      'Disponibilité limitée': 'Disponibilità limitata',
      'sur 32 villas': 'su 32 ville',
      'Confort & équipements': 'Comfort e dotazioni',
      'Piscine privée dans chaque villa': 'Piscina privata in ogni villa',
      'Espaces verts paysagers': 'Spazi verdi paesaggistici',
      'Aire de jeux pour enfants': 'Area giochi per bambini',
      'Équipements haut de gamme': 'Dotazioni di alta gamma',
      'Jardins et espaces extérieurs aménagés': 'Giardini e spazi esterni curati',
      'Confidentialité & réservation': 'Riservatezza e prenotazione',
      'Résidence sécurisée': 'Residenza sicura',
      'Sécurité et confidentialité': 'Sicurezza e riservatezza',
      'Modalités de paiement': 'Modalità di pagamento',
      '30% à la réservation, puis 30% à chaque avancement du projet. Remplir le formulaire pour recevoir les détails complets.':
        '30% alla prenotazione, poi 30% a ogni fase del progetto. Compila il modulo per ricevere tutti i dettagli.',
      'Détails sur demande': 'Dettagli su richiesta',
      'Modalités de paiement — 30% à la réservation. 30% à chaque avancement du projet. Pour recevoir les détails complets, les disponibilités exactes et les conditions actualisées, merci de remplir le formulaire.\n\nDisponibilité limitée — 7 villas restantes sur un total de 32 villas.':
      'Modalità di pagamento — 30% alla prenotazione. 30% a ogni fase del progetto. Compila il modulo per ricevere tutti i dettagli, la disponibilità esatta e le condizioni aggiornate.\n\nDisponibilità limitata — 7 ville rimanenti su un totale di 32 ville.',
      'Appartement': 'Appartamento',
      'À partir de 1,05 M MAD': 'Da 1,05 M MAD',
      'Programme neuf sur plan': 'Nuovo progetto in costruzione',
      'Appartement premium à Guéliz': 'Appartamento premium a Guéliz',
      'Studios, appartements, duplex et commerces en hyper-centre de Marrakech.':
        'Monolocali, appartamenti, duplex e locali commerciali nel cuore di Marrakech.',
      'Appartement premium à Guéliz — Guéliz hyper-centre, Marrakech':
        'Appartamento premium a Guéliz — ipercentro di Guéliz, Marrakech',
      'Réserver ton appartement': 'Prenota il tuo appartamento',
      'Recevoir la fiche privée': 'Ricevi la scheda privata',
      'Studio': 'Monolocale',
      'Duplex': 'Duplex',
      'Magasin commercial': 'Locale commerciale',
      'Programme neuf haut standing': 'Nuovo progetto di alta gamma',
      'Localisation': 'Posizione',
      'Guéliz hyper-centre, Marrakech': 'Ipercentro di Guéliz, Marrakech',
      'Surfaces': 'Superfici',
      'Livraison': 'Consegna',
      '2028 — 1ère livraison': '2028 — prima consegna',
      '39–140 m²': '39–140 m²',
      'Programme immobilier neuf haut standing à Guéliz, avec studios, appartements, duplex et commerces. Une adresse sélectionnée pour acheter un bien neuf en hyper-centre de Marrakech.':
        'Nuovo progetto immobiliare di alta gamma a Guéliz, con monolocali, appartamenti, duplex e locali commerciali. Un indirizzo selezionato per acquistare un immobile nuovo nell’ipercentro di Marrakech.',
      'Positionnement': 'Posizionamento',
      'Hyper-centre, à proximité immédiate des commerces, restaurants et services.':
        'Ipercentro, a pochi passi da negozi, ristoranti e servizi.',
      'Conception': 'Progettazione',
      'Une esthétique sobre, raffinée et intemporelle, inspirée des codes hôteliers haut de gamme.':
        'Un’estetica sobria, raffinata e senza tempo, ispirata ai codici dell’ospitalità di alta gamma.',
      'Projet patrimonial': 'Investimento patrimoniale',
      'Un actif pensé pour habiter, préparer un pied-à-terre ou étudier une stratégie patrimoniale à Guéliz.':
        'Un bene pensato per viverci, creare un punto d’appoggio o valutare una strategia patrimoniale a Guéliz.',
      'Studios, appartements, duplex et commerces à Guéliz hyper-centre':
        'Monolocali, appartamenti, duplex e locali commerciali nell’ipercentro di Guéliz',
      'Un confort pensé comme une expérience': 'Un comfort pensato come esperienza',
      'Chaque détail vise à créer une expérience résidentielle plus sereine, plus élégante et plus cohérente dans le temps.':
        'Ogni dettaglio contribuisce a creare un’esperienza residenziale più serena, elegante e coerente nel tempo.',
      'Piscines au rez-de-chaussée': 'Piscine al piano terra',
      'Deux bassins pensés pour des usages complémentaires, avec une piscine chauffée et une piscine classique intégrées dès le rez-de-chaussée.':
        'Due vasche pensate per usi complementari, con una piscina riscaldata e una piscina tradizionale integrate al piano terra.',
      'Spa résidentiel': 'Spa residenziale',
      'Un espace spa dédié au relâchement et au bien-être, conçu pour prolonger l’atmosphère calme et confidentielle de la résidence.':
        'Uno spazio spa dedicato al relax e al benessere, pensato per prolungare l’atmosfera calma e riservata della residenza.',
      'Jacuzzi': 'Jacuzzi',
      'Un jacuzzi intégré aux espaces détente pour offrir un supplément de confort recherché dans une adresse de haut standing.':
        'Una jacuzzi integrata nelle aree relax per offrire un comfort aggiuntivo, ricercato in un indirizzo di alta gamma.',
      'Salle de sport': 'Palestra',
      'Une salle de sport réservée aux résidents, pensée pour un usage quotidien confortable au sein même du projet.':
        'Una palestra riservata ai residenti, progettata per un uso quotidiano confortevole all’interno del progetto.',
      'Vestiaires séparés hommes / femmes': 'Spogliatoi separati uomo / donna',
      'Des vestiaires distincts pour hommes et femmes, conçus pour offrir plus d’intimité, de confort et de praticité au quotidien.':
        'Spogliatoi distinti per uomini e donne, pensati per offrire più privacy, comfort e praticità ogni giorno.',
      'Parking titré & box privatifs': 'Parcheggio titolato e box privati',
      'Des stationnements titrés et des box privatifs qui renforcent la valeur patrimoniale et la qualité d’usage de l’ensemble.':
        'Posti auto titolati e box privati che rafforzano il valore patrimoniale e la qualità d’uso dell’insieme.',
      '30% à la réservation — ≈ 39 000 € d’apport. Disponibilités et conditions actualisées communiquées sur demande.':
        '30% alla prenotazione — circa 39.000 € di capitale iniziale. Disponibilità e condizioni aggiornate comunicate su richiesta.',
      'Studio · Appartement · Duplex': 'Monolocale · Appartamento · Duplex',
      'Plans, surfaces disponibles et disponibilités actualisées communiqués après demande via le formulaire.':
        'Planimetrie, superfici disponibili e disponibilità aggiornate comunicate dopo la richiesta tramite il modulo.',
      'Plans sur demande': 'Planimetrie su richiesta',
      'Remplissez le formulaire pour recevoir les plans, les surfaces disponibles et les disponibilités actualisées.':
        'Compila il modulo per ricevere le planimetrie, le superfici disponibili e la disponibilità aggiornata.',
      'Riad': 'Riad',
      'Prix sur demande': 'Prezzo su richiesta',
      'Riad privé': 'Riad privato',
      'Riad de caractère à la Médina': 'Riad di carattere nella Medina',
      'Médina · architecture · emplacement rare': 'Medina · architettura · posizione rara',
      'Un riad de caractère dans la médina de Marrakech, sélectionné pour son cachet architectural, son emplacement et son potentiel de valorisation.':
        'Un riad di carattere nella medina di Marrakech, selezionato per il fascino architettonico, la posizione e il potenziale di valorizzazione.',
      'Secteur': 'Zona',
      'Médina': 'Medina',
      'Style': 'Stile',
      'Patrimoine': 'Patrimonio',
      'Accès': 'Accesso',
      'Sélection privée': 'Selezione privata',
      'Un riad de caractère dans la médina de Marrakech, sélectionné pour son cachet architectural et son emplacement rare.':
        'Un riad di carattere nella medina di Marrakech, selezionato per il fascino architettonico e la posizione rara.',
      'Bien patrimonial avec éléments architecturaux marocains, volumes intérieurs généreux et fort potentiel de valorisation.':
        'Un bene patrimoniale con elementi architettonici marocchini, ampi volumi interni e un forte potenziale di valorizzazione.',
      'Patio': 'Patio',
      'Terrasse': 'Terrazza',
      'Architecture patrimoniale': 'Architettura patrimoniale',
      'Sécurité': 'Sicurezza',
      'Salon de réception': 'Salone di ricevimento',
      'Matériaux traditionnels': 'Materiali tradizionali',
      'Emplacement Médina': 'Posizione nella Medina',
      'Cachet historique': 'Fascino storico',
      'Volumes intérieurs': 'Volumi interni',
      'Accès sélection privée': 'Accesso a una selezione privata',
      'Potentiel locatif': 'Potenziale locativo',
      'Rénovation premium': 'Ristrutturazione premium',
      'Sur demande': 'Su richiesta',
      'Dossier complet transmis sur demande après qualification.':
        'Dossier completo trasmesso su richiesta dopo la qualificazione.',
      'Sur plan': 'In costruzione',
      'Pré-lancement': 'Pre-lancio',
      'Opportunité sur plan à Marrakech': 'Opportunità in costruzione a Marrakech',
      'Pré-lancement · investissement · disponibilité limitée':
        'Pre-lancio · investimento · disponibilità limitata',
      "Une opportunité en pré-lancement, accessible avant diffusion publique, avec un positionnement pensé pour l'investissement à Marrakech.":
        'Un’opportunità in pre-lancio, accessibile prima della diffusione pubblica, con un posizionamento pensato per l’investimento a Marrakech.',
      'Prioritaire': 'Prioritario',
      'Projet': 'Progetto',
      'Limitée': 'Limitata',
      "Une opportunité en pré-lancement, accessible avant diffusion publique, avec un positionnement pensé pour l'investissement.":
        'Un’opportunità in pre-lancio, accessibile prima della diffusione pubblica, con un posizionamento pensato per l’investimento.',
      'Accès prioritaire à une sélection confidentielle, avec disponibilité limitée et dossier transmis sur qualification.':
        'Accesso prioritario a una selezione riservata, con disponibilità limitata e dossier trasmesso dopo la qualificazione.',
      'Investissement': 'Investimento',
      'Accès prioritaire': 'Accesso prioritario',
      'Piscine': 'Piscina',
      'Jardin': 'Giardino',
      'Parking': 'Parcheggio',
      'Livraison programmée': 'Consegna programmata',
      'Plans détaillés transmis après échange.':
        'Planimetrie dettagliate trasmesse dopo il contatto.',
      'photo': 'foto',
      'photos': 'foto',
      'extérieur': 'esterno',
      'intérieur': 'interno',
      'Plan': 'Planimetria',
      'étage': 'primo piano',
      'rez-de-chaussée': 'piano terra',
      'Plans transmis sur demande': 'Planimetrie disponibili su richiesta',
    },
  };

  var PROPERTY_MODAL_FORM_PREFIXES = {
    en: {
      '/contact/': '/en/contact/',
      '/off-market/': '/en/off-market/',
    },
    nl: {
      '/contact/': '/nl/contact/',
      '/off-market/': '/nl/off-market/',
    },
    it: {
      '/contact/': '/it/contatto/',
      '/off-market/': '/it/off-market/',
    },
  };

  function getCurrentLocale() {
    var htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    var pathLang = (window.location.pathname.split('/')[1] || '').toLowerCase();
    if (htmlLang.indexOf('nl') === 0 || pathLang === 'nl') return 'nl';
    if (htmlLang.indexOf('it') === 0 || pathLang === 'it') return 'it';
    if (htmlLang.indexOf('en') === 0 || pathLang === 'en') return 'en';
    return 'fr';
  }

  function translateModalString(value, locale) {
    if (locale === 'fr' || !value) return value;
    var translations = PROPERTY_MODAL_TEXT_TRANSLATIONS[locale] || {};
    return translations[value] || value;
  }

  function localizeModalChrome(root, locale) {
    if (!root) return;

    root.querySelectorAll('[data-property-modal-close]').forEach(function (button) {
      button.setAttribute(
        'aria-label',
        translateModalString('Fermer la fiche', locale)
      );
    });

    root.querySelectorAll('.om-property-modal__tabs').forEach(function (tabs) {
      tabs.setAttribute(
        'aria-label',
        translateModalString('Navigation fiche bien', locale)
      );
    });

    root.querySelectorAll('[data-modal-layout-placeholder]').forEach(function (placeholder) {
      if (placeholder.textContent && placeholder.textContent.indexOf('Plans transmis sur demande') >= 0) {
        placeholder.textContent = translateModalString(
          'Plans transmis sur demande',
          locale
        );
      }
    });
  }

  function formatModalPhotoCount(count, locale) {
    return count + ' ' + translateModalString(count === 1 ? 'photo' : 'photos', locale);
  }

  function localizeModalHref(value, locale) {
    if (locale === 'fr' || typeof value !== 'string') return value;
    var prefixes = PROPERTY_MODAL_FORM_PREFIXES[locale] || {};
    var href = value;
    Object.keys(prefixes).some(function (prefix) {
      if (href.indexOf(prefix) !== 0) return false;
      href = prefixes[prefix] + href.slice(prefix.length);
      return true;
    });
    return href;
  }

  function localizeModalValue(value, locale) {
    if (Array.isArray(value)) {
      return value.map(function (item) {
        return localizeModalValue(item, locale);
      });
    }
    if (value && typeof value === 'object') {
      var next = {};
      Object.keys(value).forEach(function (key) {
        var raw = value[key];
        next[key] =
          key === 'formHref'
            ? localizeModalHref(raw, locale)
            : localizeModalValue(raw, locale);
      });
      return next;
    }
    if (typeof value === 'string') {
      return translateModalString(value, locale);
    }
    return value;
  }

  function getLocalizedPropertyModalData(propertyId) {
    var property = propertyModalData[propertyId];
    if (!property) return null;
    return localizeModalValue(property, getCurrentLocale());
  }

  // Keep a public handle available while the page-specific bindings finish.
  window.omPropertyModal = {
    open: requestOpenPropertyModal,
    close: function () {
      var closeButton = document.querySelector('[data-property-modal-close]');
      if (closeButton) closeButton.click();
    },
    data: propertyModalData,
  };

  function boot() {
    initPropertyDetailPage();

    var modal = document.querySelector('[data-property-modal]');
    if (!modal) {
      if (boot.didInit) destroyBoot();
      return;
    }

    if (boot.didInit && boot.modal !== modal) {
      destroyBoot();
    }

    if (boot.didInit && boot.modal === modal) {
      localizeModalChrome(modal, getCurrentLocale());
      bindTriggers();
      return;
    }
    boot.didInit = true;
    boot.modal = modal;
    localizeModalChrome(modal, getCurrentLocale());

    var track = modal.querySelector('[data-property-modal-track]');
    var stage = modal.querySelector('.om-property-modal__stage');
    var slides = modal.querySelectorAll('[data-modal-slide]');
    var closeButtons = modal.querySelectorAll('[data-property-modal-close]');
    var closeBtn = modal.querySelector('.om-property-modal__close');
    var tabButtons = modal.querySelectorAll('[data-modal-tab]');
    var layoutTabButtons = modal.querySelectorAll('[data-modal-layout-tabs] button');
    var layoutTabs = modal.querySelector('[data-modal-layout-tabs]');
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
    var aboutCopy = modal.querySelector('.om-property-modal__about-copy');
    var aboutTitle = modal.querySelector('[data-modal-about-title]');
    var aboutPrimary = modal.querySelector('[data-modal-about-description-primary]');
    var aboutSecondary = modal.querySelector('[data-modal-about-description-secondary]');
    var aboutEditorial = modal.querySelector('[data-modal-about-editorial]');
    var aboutKicker = modal.querySelector('.om-property-modal__about-kicker');
    var subtitleEl = modal.querySelector('[data-modal-subtitle]');
    var typologiesEl = modal.querySelector('[data-modal-typologies]');
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
    var galleryFocusButtons = modal.querySelectorAll('[data-modal-gallery-focus]');

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
    var lastFocusedElement = null;

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
        var locale = getCurrentLocale();
        img.alt =
          (imageAltBase || 'Villa Jaz') +
          ' — ' +
          translateModalString('photo', locale) +
          ' ' +
          (i + 1);
        img.loading = 'lazy';
        figure.appendChild(img);
        container.appendChild(figure);
      });
      if (countEl) {
        countEl.textContent = formatModalPhotoCount((images || []).length, getCurrentLocale());
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

    function renderTypologies(property) {
      if (!typologiesEl) return;
      typologiesEl.innerHTML = '';

      var items = property && property.typologies;
      if (!items || !items.length) {
        typologiesEl.hidden = true;
        return;
      }

      items.forEach(function (label) {
        var chip = document.createElement('span');
        chip.className = 'om-property-modal__typology';
        chip.textContent = label;
        typologiesEl.appendChild(chip);
      });
      typologiesEl.hidden = false;
    }

    function renderSubtitle(property) {
      if (!subtitleEl) return;
      var text = property && property.subtitle;
      if (!text) {
        subtitleEl.hidden = true;
        subtitleEl.textContent = '';
        return;
      }
      subtitleEl.textContent = text;
      subtitleEl.hidden = false;
    }

    function renderHyperAbout(property) {
      var about = (property && property.about) || {};
      var blocks = about.blocks || [];
      var useEditorial = blocks.length > 0 && aboutEditorial;

      if (aboutKicker) aboutKicker.hidden = useEditorial;
      if (aboutTitle) aboutTitle.hidden = useEditorial;
      if (aboutPrimary) {
        aboutPrimary.hidden = useEditorial;
        if (!useEditorial) {
          aboutPrimary.textContent = about.primary || property.description || '';
        }
      }
      if (aboutCopy) {
        aboutCopy.classList.toggle('is-editorial', useEditorial);
      }
      if (aboutSecondary) {
        aboutSecondary.hidden = useEditorial;
        if (!useEditorial) {
          aboutSecondary.textContent = about.secondary || '';
        }
      }

      if (!useEditorial) {
        if (aboutEditorial) {
          aboutEditorial.hidden = true;
          aboutEditorial.innerHTML = '';
        }
        if (aboutThumb) {
          aboutThumb.src = property.image;
          aboutThumb.alt = property.title;
        }
        if (aboutProject) aboutProject.textContent = about.project || property.selection;
        if (aboutTitle) aboutTitle.textContent = about.title || property.title;
        if (aboutImage) {
          aboutImage.src =
            about.image ||
            (property.galleries && property.galleries.exterior
              ? property.galleries.exterior[0]
              : property.image);
          aboutImage.alt = property.title;
        }
        return;
      }

      aboutEditorial.innerHTML = '';
      aboutEditorial.hidden = false;

      blocks.forEach(function (block) {
        var article = document.createElement('article');
        article.className = 'om-property-modal__about-block';
        article.innerHTML =
          '<h4>' + block.title + '</h4><p>' + block.text + '</p>';
        aboutEditorial.appendChild(article);
      });

      if (about.highlight) {
        var highlight = document.createElement('div');
        highlight.className = 'om-property-modal__about-highlight';
        highlight.innerHTML =
          '<strong>' +
          about.highlight.value +
          '</strong><span>' +
          about.highlight.text +
          '</span>';
        aboutEditorial.appendChild(highlight);
      }

      if (aboutImage) {
        aboutImage.src =
          about.image ||
          (property.galleries && property.galleries.exterior
            ? property.galleries.exterior[0]
            : property.image);
        aboutImage.alt = property.title;
      }
    }

    function renderHyperCharacteristics(property) {
      if (!amenitiesEl) return;
      amenitiesEl.innerHTML = '';
      amenitiesEl.className =
        'om-property-modal__amenities om-property-modal__amenities--hyper';

      var layout = document.createElement('div');
      layout.className = 'om-property-modal__hyper-layout';

      var body = document.createElement('div');
      body.className = 'om-property-modal__hyper-body';

      if (property.characteristicsTitle) {
        var heading = document.createElement('h3');
        heading.className = 'om-property-modal__hyper-title';
        heading.textContent = property.characteristicsTitle;
        body.appendChild(heading);
      }

      if (property.characteristicsIntro) {
        var intro = document.createElement('p');
        intro.className = 'om-property-modal__hyper-intro';
        intro.textContent = property.characteristicsIntro;
        body.appendChild(intro);
      }

      var imageSrc = property.characteristicsImage || property.image;
      if (imageSrc) {
        var imageWrap = document.createElement('figure');
        imageWrap.className = 'om-property-modal__hyper-media';
        var img = document.createElement('img');
        img.src = imageSrc;
        img.alt = property.title + ' — espaces et équipements';
        img.loading = 'lazy';
        imageWrap.appendChild(img);
        body.appendChild(imageWrap);
      }

      var features = document.createElement('div');
      features.className = 'om-property-modal__hyper-features';

      (property.characteristicFeatures || []).forEach(function (feature) {
        var card = document.createElement('article');
        card.className = 'om-property-modal__hyper-feature';
        card.innerHTML =
          '<span class="om-property-modal__hyper-feature-icon" aria-hidden="true">' +
          hyperFeatureIcon(feature.icon) +
          '</span>' +
          '<div><h4>' +
          feature.title +
          '</h4><p>' +
          feature.text +
          '</p></div>';
        features.appendChild(card);
      });

      body.appendChild(features);

      var factsBlock = document.createElement('div');
      factsBlock.className = 'om-property-modal__hyper-facts';
      var factsHeading = document.createElement('h4');
      factsHeading.textContent = 'Informations clés';
      factsBlock.appendChild(factsHeading);

      var factsList = document.createElement('div');
      factsList.className = 'om-property-modal__hyper-facts-list';

      (property.characteristicFacts || []).forEach(function (fact) {
        var row = document.createElement('div');
        row.className = 'om-property-modal__hyper-fact';
        row.innerHTML =
          '<span class="om-property-modal__hyper-fact-icon" aria-hidden="true">' +
          hyperFeatureIcon(fact.icon) +
          '</span><span>' +
          fact.label +
          '</span>';
        factsList.appendChild(row);
      });

      factsBlock.appendChild(factsList);
      body.appendChild(factsBlock);

      var payment = property.characteristicsPayment;
      if (payment) {
        var paymentBlock = document.createElement('div');
        paymentBlock.className = 'om-property-modal__hyper-payment';
        paymentBlock.innerHTML =
          '<h4>' + payment.title + '</h4><p>' + payment.text + '</p>';
        body.appendChild(paymentBlock);
      }

      layout.appendChild(body);

      amenitiesEl.appendChild(layout);
    }

    function renderAmenities(property) {
      if (!amenitiesEl) return;

      if (property && property.characteristicsLayout === 'hyper') {
        renderHyperCharacteristics(property);
        return;
      }
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
          } else if (group.title === 'Réservation & confidentialité') {
            block.classList.add('om-property-modal__characteristic-block--privacy');
          } else if (group.title === 'Investissement & localisation') {
            block.classList.add('om-property-modal__characteristic-block--comfort');
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

      if (layoutTabs) {
        layoutTabs.hidden = Boolean(layout.hideFloorTabs);
      }

      if (src) {
        layoutImage.src = src;
        layoutImage.alt =
          translateModalString('Plan', getCurrentLocale()) +
          ' ' +
          translateModalString(
            floor === 'first' ? 'étage' : 'rez-de-chaussée',
            getCurrentLocale()
          ) +
          ' — ' +
          ((activeProperty && activeProperty.title) || 'Villa Jaz');
        layoutImage.hidden = false;
        layoutPlaceholder.hidden = true;
        layoutPlaceholder.classList.remove(
          'om-property-modal__plan-placeholder--premium'
        );
        return;
      }

      layoutImage.hidden = true;
      layoutImage.removeAttribute('src');
      layoutPlaceholder.hidden = false;

      if (layout.placeholderTitle || layout.placeholderText) {
        layoutPlaceholder.classList.add(
          'om-property-modal__plan-placeholder--premium'
        );
        layoutPlaceholder.innerHTML =
          '<strong class="om-property-modal__plan-placeholder-title">' +
          (layout.placeholderTitle || 'Plans sur demande') +
          '</strong>' +
          (layout.placeholderText
            ? '<span class="om-property-modal__plan-placeholder-copy">' +
              layout.placeholderText +
              '</span>'
            : '');
      } else {
        layoutPlaceholder.classList.remove(
          'om-property-modal__plan-placeholder--premium'
        );
        layoutPlaceholder.textContent =
          translateModalString('Plans transmis sur demande', getCurrentLocale()) + '.';
      }
    }

    function updateModalActions(property) {
      var href = property.formHref || '/contact/';
      var outlineLabel =
        property.ctaOutline ||
        translateModalString('Rappel', getCurrentLocale());
      var primaryLabel =
        property.ctaPrimary ||
        translateModalString('Recevoir le dossier', getCurrentLocale());

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

      modal.classList.toggle('is-hyper-theme', property.theme === 'hyper');

      if (subtitleEl) {
        if (!property.subtitle) {
          subtitleEl.hidden = true;
          subtitleEl.textContent = '';
        }
      }
      if (typologiesEl && (!property.typologies || !property.typologies.length)) {
        typologiesEl.hidden = true;
        typologiesEl.innerHTML = '';
      }
      if (aboutEditorial && property.theme !== 'hyper') {
        aboutEditorial.hidden = true;
        aboutEditorial.innerHTML = '';
      }
      if (aboutCopy) {
        aboutCopy.classList.toggle('is-editorial', property.theme === 'hyper');
      }
      if (aboutKicker && property.theme !== 'hyper') {
        aboutKicker.hidden = false;
      }
      if (aboutTitle && property.theme !== 'hyper') {
        aboutTitle.hidden = false;
      }
      if (aboutPrimary && property.theme !== 'hyper') {
        aboutPrimary.hidden = false;
      }
      if (aboutSecondary && property.theme !== 'hyper') {
        aboutSecondary.hidden = false;
      }

      if (image) {
        image.src = property.image;
        image.alt = property.alt || property.title;
      }
      if (indexEl) indexEl.textContent = property.index;
      if (locationEl) locationEl.textContent = property.location;
      if (typeEl) typeEl.textContent = property.type;
      if (priceBottomEl) priceBottomEl.textContent = property.price;
      if (selectionEl) {
        var selectionLabel = translateModalString('Sélection :', getCurrentLocale());
        selectionEl.innerHTML =
          '<span>' + selectionLabel + '</span> ' + property.selection;
      }
      if (titleEl) titleEl.textContent = property.title;
      renderSubtitle(property);
      renderTypologies(property);
      if (descriptionEl) {
        descriptionEl.textContent = property.description || '';
        descriptionEl.hidden = false;
      }

      renderFacts(property.generalFacts || property.facts, {
        compact: Boolean(property.generalFacts && property.generalFacts.length),
      });

      renderHyperAbout(property);

      renderAmenities(property);

      var galleries = property.galleries || {};
      renderGallery(
        exteriorGalleryEl,
        galleries.exterior,
        exteriorCountEl,
        property.title + ' — ' + translateModalString('extérieur', getCurrentLocale())
      );
      renderGallery(
        interiorGalleryEl,
        galleries.interior,
        interiorCountEl,
        property.title + ' — ' + translateModalString('intérieur', getCurrentLocale())
      );

      updateModalActions(property);

      var layout = property.layout || {};
      if (layoutSurface) layoutSurface.textContent = layout.surface || '—';
      if (layoutRooms) layoutRooms.textContent = layout.rooms || '—';
      if (layoutBaths) layoutBaths.textContent = layout.baths || '—';
      if (layoutDescription) {
        layoutDescription.textContent =
          layout.description ||
          translateModalString('Plans transmis sur demande', getCurrentLocale()) + '.';
      }

      layoutTabButtons.forEach(function (btn, index) {
        btn.classList.toggle('is-active', index === 0);
      });
      setLayoutPlanImage('ground');
    }

    function updateModalArrowState() {
      if (!prevButton || !nextButton) return;
      var prevDisabled = modalActiveSlideIndex === 0;
      var nextDisabled = modalActiveSlideIndex === MODAL_SLIDE_ORDER.length - 1;
      prevButton.setAttribute('aria-disabled', prevDisabled ? 'true' : 'false');
      nextButton.setAttribute('aria-disabled', nextDisabled ? 'true' : 'false');
      prevButton.classList.toggle('is-disabled', prevDisabled);
      nextButton.classList.toggle('is-disabled', nextDisabled);
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
      var property = getLocalizedPropertyModalData(propertyId);
      if (!property) return;

      lastFocusedElement =
        document.activeElement && document.activeElement !== document.body
          ? document.activeElement
          : null;
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
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
      lastFocusedElement = null;
    }

    // Expose the controller before optional interaction bindings run so cards
    // can open the modal even if a late enhancement is unavailable.
    modalController.open = openModal;
    modalController.close = closeModal;
    modalController.ready = true;
    window.omPropertyModal = {
      open: openModal,
      close: closeModal,
      data: propertyModalData,
    };

    function bindTriggers() {
      var triggers = document.querySelectorAll('[data-property-modal-trigger]');
      triggers.forEach(function (trigger) {
        if (trigger.dataset.propertyModalListenerBound === 'true') return;
        trigger.dataset.propertyModalBound = 'true';
        trigger.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          openModal(trigger.dataset.propertyId);
        });
        trigger.addEventListener('keydown', function (event) {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          openModal(trigger.dataset.propertyId);
        });
        trigger.dataset.propertyModalListenerBound = 'true';
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

    galleryFocusButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var target =
          button.getAttribute('data-modal-gallery-focus') === 'interior'
            ? interiorGalleryEl
            : exteriorGalleryEl;
        var firstImage = target && target.querySelector('img');
        if (!firstImage) return;
        firstImage.setAttribute('tabindex', '-1');
        firstImage.focus({ preventScroll: true });
        if (typeof firstImage.scrollIntoView === 'function') {
          firstImage.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    });

    function handleDocumentKeydown(event) {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    }

    function handleModalClick(event) {
      if (
        event.target === modal ||
        event.target.classList.contains('om-property-modal__backdrop')
      ) {
        closeModal();
        return;
      }

      var formCta = event.target.closest('.om-property-modal__actions a[href^="/contact/"], .om-property-modal__actions a[href^="/off-market/"]');
      if (formCta) closeModal();
    }

    function handleWindowResize() {
      if (!modal.classList.contains('is-open')) return;

      if (modalResizeRaf) {
        cancelAnimationFrame(modalResizeRaf);
      }

      modalResizeRaf = requestAnimationFrame(function () {
        setActiveModalSlide(MODAL_SLIDE_ORDER[modalActiveSlideIndex], {
          skipAnimation: true,
        });
      });
    }

    document.addEventListener('keydown', handleDocumentKeydown);
    modal.addEventListener('click', handleModalClick);
    window.addEventListener('resize', handleWindowResize);

    bindTriggers();
    document.addEventListener('om-property-cards-rendered', bindTriggers);

    boot.cleanup = function () {
      if (modal.classList.contains('is-open')) closeModal();
      document.removeEventListener('keydown', handleDocumentKeydown);
      document.removeEventListener('om-property-cards-rendered', bindTriggers);
      modal.removeEventListener('click', handleModalClick);
      window.removeEventListener('resize', handleWindowResize);
      if (modal.dataset.wheelBound === 'true') {
        modal.removeEventListener('wheel', handleModalWheel);
        delete modal.dataset.wheelBound;
      }
      if (modalController.open === openModal) {
        modalController.open = requestOpenPropertyModal;
      }
    };

    if (modalController.pendingId) {
      var pendingId = modalController.pendingId;
      modalController.pendingId = null;
      openModal(pendingId);
    }

  }

  function initPropertyDetailPage() {
    var page = document.querySelector('[data-property-detail-page]');
    if (!page || page.dataset.propertyDetailInit === 'true') return;

    var propertyId = page.getAttribute('data-property-id') || 'villa-jaz';
    var property = getLocalizedPropertyModalData(propertyId);
    if (!property) return;

    page.dataset.propertyDetailInit = 'true';
    initPropertyDetailPage.done = true;
    localizeModalChrome(page, getCurrentLocale());

    var image = page.querySelector('[data-modal-image]');
    var indexEl = page.querySelector('[data-modal-index]');
    var locationEl = page.querySelector('[data-modal-location]');
    var typeEl = page.querySelector('[data-modal-type]');
    var priceBottomEl = page.querySelector('[data-modal-price-bottom]');
    var selectionEl = page.querySelector('[data-modal-selection]');
    var titleEl = page.querySelector('[data-modal-title]');
    var factsEl = page.querySelector('[data-modal-facts]');
    var descriptionEl = page.querySelector('[data-modal-description]');
    var aboutThumb = page.querySelector('[data-modal-about-thumb]');
    var aboutProject = page.querySelector('[data-modal-about-project]');
    var aboutTitle = page.querySelector('[data-modal-about-title]');
    var aboutPrimary = page.querySelector('[data-modal-about-description-primary]');
    var aboutSecondary = page.querySelector('[data-modal-about-description-secondary]');
    var aboutImage = page.querySelector('[data-modal-about-image]');
    var amenitiesEl = page.querySelector('[data-modal-amenities]');
    var exteriorGalleryEl = page.querySelector('[data-modal-exterior-gallery]');
    var interiorGalleryEl = page.querySelector('[data-modal-interior-gallery]');
    var exteriorCountEl = page.querySelector('[data-modal-exterior-count]');
    var interiorCountEl = page.querySelector('[data-modal-interior-count]');
    var layoutSurface = page.querySelector('[data-modal-layout-surface]');
    var layoutRooms = page.querySelector('[data-modal-layout-rooms]');
    var layoutBaths = page.querySelector('[data-modal-layout-baths]');
    var layoutDescription = page.querySelector('[data-modal-layout-description]');
    var layoutImage = page.querySelector('[data-modal-layout-image]');
    var layoutPlaceholder = page.querySelector('[data-modal-layout-placeholder]');
    var layoutTabs = page.querySelector('[data-modal-layout-tabs]');
    var layoutTabButtons = page.querySelectorAll('[data-modal-layout-tabs] button');
    var activeProperty = property;

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
        img.alt = (imageAltBase || property.title || 'Villa Jaz') + ' — photo ' + (i + 1);
        img.loading = 'lazy';
        figure.appendChild(img);
        container.appendChild(figure);
      });
      if (countEl) {
        countEl.textContent = formatModalPhotoCount(
          (images || []).length,
          getCurrentLocale(),
        );
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

    function renderAbout() {
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
        aboutImage.src =
          about.image ||
          (property.galleries && property.galleries.exterior
            ? property.galleries.exterior[0]
            : property.image);
        aboutImage.alt = property.title;
      }
    }

    function renderAmenities() {
      if (!amenitiesEl) return;
      amenitiesEl.innerHTML = '';
      amenitiesEl.className = 'om-property-modal__amenities';

      var groups = property.characteristicGroups;
      if (groups && groups.length) {
        amenitiesEl.classList.add('om-property-modal__amenities--grouped');
        amenitiesEl.classList.add('om-property-modal__amenities--villa');

        var layout = document.createElement('div');
        layout.className = 'om-property-modal__characteristics-layout';

        var body = document.createElement('div');
        body.className = 'om-property-modal__characteristics-body';

        var grid = document.createElement('div');
        grid.className =
          'om-property-modal__characteristics-grid om-property-modal__characteristics-grid--villa';

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
      }
    }

    function updateActions() {
      var href = property.formHref || '/contact/?intent=villa-jaz';
      var outlineLabel =
        property.ctaOutline ||
        translateModalString('Rappel', getCurrentLocale());
      var primaryLabel =
        property.ctaPrimary ||
        translateModalString('Recevoir le dossier', getCurrentLocale());

      page.querySelectorAll('.om-property-modal__actions').forEach(function (group) {
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

    function setLayoutPlanImage(floor) {
      if (!layoutImage || !layoutPlaceholder) return;

      var layout = property.layout || {};
      var images = layout.images || {};
      var src =
        floor === 'first'
          ? images.first || images.ground || layout.image || ''
          : images.ground || layout.image || '';

      if (layoutTabs) {
        layoutTabs.hidden = Boolean(layout.hideFloorTabs);
      }

      if (src) {
        layoutImage.src = src;
        layoutImage.alt =
          translateModalString('Plan', getCurrentLocale()) +
          ' ' +
          translateModalString(
            floor === 'first' ? 'étage' : 'rez-de-chaussée',
            getCurrentLocale()
          ) +
          ' — ' +
          (property.title || 'Villa Jaz');
        layoutImage.hidden = false;
        layoutPlaceholder.hidden = true;
        layoutPlaceholder.classList.remove(
          'om-property-modal__plan-placeholder--premium'
        );
        return;
      }

      layoutImage.hidden = true;
      layoutImage.removeAttribute('src');
      layoutPlaceholder.hidden = false;
      layoutPlaceholder.classList.remove(
        'om-property-modal__plan-placeholder--premium'
      );
      layoutPlaceholder.textContent = translateModalString(
        'Plans transmis sur demande',
        getCurrentLocale()
      );
    }

    page.classList.toggle('is-hyper-theme', property.theme === 'hyper');

    if (image) {
      image.src = property.image;
      image.alt = property.alt || property.title;
    }
    if (indexEl) indexEl.textContent = property.index;
    if (locationEl) locationEl.textContent = property.location;
    if (typeEl) typeEl.textContent = property.type;
    if (priceBottomEl) priceBottomEl.textContent = property.price;
    if (selectionEl) {
      var pageSelectionLabel = translateModalString('Sélection :', getCurrentLocale());
      selectionEl.innerHTML = '<span>' + pageSelectionLabel + '</span> ' + property.selection;
    }
    if (titleEl) titleEl.textContent = property.title;
    if (descriptionEl) {
      descriptionEl.textContent = property.description || '';
      descriptionEl.hidden = false;
    }

    renderFacts(property.generalFacts || property.facts, {
      compact: Boolean(property.generalFacts && property.generalFacts.length),
    });
    renderAbout();
    renderAmenities();

    var galleries = property.galleries || {};
    renderGallery(
      exteriorGalleryEl,
      galleries.exterior,
      exteriorCountEl,
      property.title + ' — ' + translateModalString('extérieur', getCurrentLocale())
    );
    renderGallery(
      interiorGalleryEl,
      galleries.interior,
      interiorCountEl,
      property.title + ' — ' + translateModalString('intérieur', getCurrentLocale())
    );

    updateActions();

    var layout = property.layout || {};
    if (layoutSurface) layoutSurface.textContent = layout.surface || '—';
    if (layoutRooms) layoutRooms.textContent = layout.rooms || '—';
    if (layoutBaths) layoutBaths.textContent = layout.baths || '—';
    if (layoutDescription) {
      layoutDescription.textContent =
        layout.description ||
        translateModalString('Plans transmis sur demande', getCurrentLocale()) + '.';
    }

    layoutTabButtons.forEach(function (btn, index) {
      btn.classList.toggle('is-active', index === 0);
    });
    setLayoutPlanImage('ground');

    layoutTabButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        layoutTabButtons.forEach(function (btn) {
          btn.classList.toggle('is-active', btn === button);
        });
        setLayoutPlanImage(button.dataset.layoutFloor || 'ground');
      });
    });

    var navLinks = page.querySelectorAll('[data-property-detail-nav-link]');
    var sections = page.querySelectorAll('[data-property-detail-track] .om-property-modal__slide[id]');

    if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.id;
            navLinks.forEach(function (link) {
              var href = link.getAttribute('href') || '';
              link.classList.toggle('is-active', href === '#' + id);
            });
          });
        },
        { rootMargin: '-40% 0px -45% 0px', threshold: 0.01 }
      );

      sections.forEach(function (section) {
        observer.observe(section);
      });
    }

    var detailNav = page.querySelector('[data-property-detail-nav]');
    if (detailNav) {
      var maskTargets = [];
      var main = page.closest('main');
      var finalCta =
        (main && main.querySelector('.om-final-cta')) ||
        document.querySelector('#final-cta');
      var footer = document.querySelector('.om-footer');

      if (finalCta) maskTargets.push(finalCta);
      if (footer) maskTargets.push(footer);

      if (maskTargets.length) {
        var maskMargin = 64;
        var maskTicking = false;

        function isMaskZoneVisible(target) {
          var rect = target.getBoundingClientRect();
          return rect.top < window.innerHeight - maskMargin && rect.bottom > 0;
        }

        function refreshDetailNavMask() {
          var hide = maskTargets.some(isMaskZoneVisible);
          detailNav.classList.toggle('is-masked', hide);
        }

        function scheduleDetailNavMask() {
          if (maskTicking) return;
          maskTicking = true;
          window.requestAnimationFrame(function () {
            maskTicking = false;
            refreshDetailNavMask();
          });
        }

        refreshDetailNavMask();
        window.addEventListener('scroll', scheduleDetailNavMask, { passive: true });
        window.addEventListener('resize', scheduleDetailNavMask, { passive: true });
      }
    }
  }

  function startBoot() {
    scheduleBoot();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startBoot);
  } else {
    startBoot();
  }

  window.addEventListener('load', startBoot);
  window.addEventListener('om-react-ready', scheduleBoot);
  window.addEventListener('popstate', scheduleBoot);
})();
