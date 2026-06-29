/**
 * OffMarket — Premium property detail modal
 * 6-slide horizontal carousel
 */
(function () {
  'use strict';

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
    'villa-marrakech': {
      index: '01',
      location: 'MARRAKECH',
      type: 'Villa',
      price: '320 000 €',
      selection: 'Villa sur plan',
      title: 'Villa privée sur plan à Marrakech',
      subtitle: '238 m² · R+1 · 3 suites · rooftop · piscine privée',
      image: '/assets/mavericks/hero/mavericks-hero-villa.webp',
      alt: 'Villa privée sur plan à Marrakech',
      facts: [
        { label: 'Surface', value: '238 m²' },
        { label: 'Suites', value: '3' },
        { label: 'Statut', value: 'Sur plan' },
        { label: 'Disponibilité', value: '20 villas sur 70' },
      ],
      description:
        'Une villa contemporaine pensée pour une résidence principale ou un investissement patrimonial à Marrakech, avec espaces extérieurs privatifs et prestations premium.',
      about: {
        project: 'Villa privée sur plan',
        title: 'Villa privée sur plan à Marrakech',
        primary:
          'Une villa contemporaine pensée pour une résidence principale ou un investissement patrimonial à Marrakech.',
        secondary:
          'Le projet réunit espaces extérieurs privatifs, rooftop, piscine et configuration familiale dans une sélection confidentielle.',
      },
      amenities: DEFAULT_AMENITIES,
      galleries: {
        exterior: GALLERY_POOL.exterior,
        interior: GALLERY_POOL.interior,
      },
      layout: {
        surface: '238 m²',
        rooms: '3',
        baths: '3',
        description: 'Plans détaillés transmis sur demande après qualification.',
        image: '',
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
    var mobileMq = window.matchMedia('(max-width: 900px)');

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
    var MODAL_TRANSITION_MS = 520;
    var MODAL_WHEEL_THRESHOLD = 70;

    function renderFacts(items) {
      if (!factsEl) return;
      factsEl.innerHTML = '';
      (items || []).forEach(function (item) {
        var fact = document.createElement('div');
        fact.className = 'om-property-modal__fact';
        fact.innerHTML =
          '<span>' + item.label + '</span><strong>' + item.value + '</strong>';
        factsEl.appendChild(fact);
      });
    }

    function renderGallery(container, images, countEl) {
      if (!container) return;
      container.innerHTML = '';
      (images || []).slice(0, 5).forEach(function (src, i) {
        var figure = document.createElement('figure');
        var img = document.createElement('img');
        img.src = src;
        img.alt = 'Photo ' + (i + 1);
        img.loading = 'lazy';
        figure.appendChild(img);
        container.appendChild(figure);
      });
      if (countEl) {
        countEl.textContent = (images || []).length + ' photos';
      }
    }

    function renderAmenities(items, property) {
      if (!amenitiesEl) return;
      amenitiesEl.innerHTML = '';
      var list = items || DEFAULT_AMENITIES;
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
            '<span class="om-property-modal__amenity-icon" aria-hidden="true">◻</span>' +
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
      if (descriptionEl) descriptionEl.textContent = property.description || '';

      renderFacts(property.facts);

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

      renderAmenities(property.amenities, property);

      var galleries = property.galleries || {};
      renderGallery(exteriorGalleryEl, galleries.exterior, exteriorCountEl);
      renderGallery(interiorGalleryEl, galleries.interior, interiorCountEl);

      var layout = property.layout || {};
      if (layoutSurface) layoutSurface.textContent = layout.surface || '—';
      if (layoutRooms) layoutRooms.textContent = layout.rooms || '—';
      if (layoutBaths) layoutBaths.textContent = layout.baths || '—';
      if (layoutDescription) {
        layoutDescription.textContent =
          layout.description || 'Plans transmis sur demande.';
      }
      if (layoutImage && layoutPlaceholder) {
        if (layout.image) {
          layoutImage.src = layout.image;
          layoutImage.alt = 'Plan — ' + property.title;
          layoutImage.hidden = false;
          layoutPlaceholder.hidden = true;
        } else {
          layoutImage.hidden = true;
          layoutImage.removeAttribute('src');
          layoutPlaceholder.hidden = false;
        }
      }
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

    function lockModalWheel() {
      modalWheelLocked = true;
      window.setTimeout(function () {
        modalWheelLocked = false;
        modalWheelAccumulated = 0;
      }, MODAL_TRANSITION_MS + 80);
    }

    function setActiveModalSlide(slideName) {
      if (!modal || !track || !slides.length) return;

      var index = MODAL_SLIDE_ORDER.indexOf(slideName);
      if (index === -1) return;

      var slide = Array.prototype.find.call(slides, function (s) {
        return s.dataset.modalSlide === slideName;
      });
      if (!slide || !stage) return;

      var stageWidth = stage.clientWidth;
      var slideWidth = slide.offsetWidth;
      var slideLeft = slide.offsetLeft;
      var offset;

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

      modalActiveSlideIndex = index;
      activeSlide = slideName;

      slides.forEach(function (s) {
        s.classList.toggle('is-active', s.dataset.modalSlide === slideName);
      });

      tabButtons.forEach(function (button) {
        button.classList.toggle(
          'is-active',
          button.dataset.modalTab === slideName
        );
      });

      updateModalArrowState();
    }

    function goToModalSlideByIndex(index) {
      var safeIndex = clampModalIndex(index);

      if (
        safeIndex === modalActiveSlideIndex &&
        modal.classList.contains('is-open')
      ) {
        return;
      }

      modalActiveSlideIndex = safeIndex;
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
        setActiveModalSlide('general');
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

        modalWheelAccumulated = 0;
        modalWheelLocked = true;

        goToModalSlideByIndex(index);

        window.setTimeout(function () {
          modalWheelLocked = false;
        }, MODAL_TRANSITION_MS + 60);
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
      }
    });

    window.addEventListener('resize', function () {
      if (!modal.classList.contains('is-open')) return;

      if (modalResizeRaf) {
        cancelAnimationFrame(modalResizeRaf);
      }

      modalResizeRaf = requestAnimationFrame(function () {
        setActiveModalSlide(MODAL_SLIDE_ORDER[modalActiveSlideIndex]);
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
