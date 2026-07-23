/**
 * OFF MARKET language routing for the static multilingual site.
 */
(function () {
  'use strict';

  var LANGS = ['fr', 'en', 'es', 'it', 'nl', 'no'];
  var FALLBACK_PAGE = 'home';
  var LANG_LABELS = {
    fr: 'FR',
    en: 'EN',
    es: 'ES',
    it: 'IT',
    nl: 'NL',
    no: 'NO',
  };
  var STRUCTURED_DESCRIPTIONS = {
    fr: 'Immobilier privé à Marrakech : une sélection confidentielle de villas, appartements, projets sur plan et opportunités off-market.',
    en: 'Private real estate in Marrakech: a confidential selection of villas, apartments, off-plan projects and off-market opportunities.',
    es: 'Inmobiliaria privada en Marrakech: una selección confidencial de villas, apartamentos, proyectos sobre plano y oportunidades off-market.',
    nl: "Privaat vastgoed in Marrakech: een vertrouwelijke selectie van villa's, appartementen, nieuwbouwprojecten en off-marketkansen.",
    it: 'Immobiliare privato a Marrakech: una selezione riservata di ville, appartamenti, progetti in costruzione e opportunità off-market.',
    no: 'Privat eiendom i Marrakech: et konfidensielt utvalg av villaer, leiligheter, nybyggprosjekter og off-market muligheter.',
  };
  var AVAILABLE_LANGS = {
    fr: true,
    en: true,
    es: true,
    it: true,
    nl: true,
    no: true,
  };

  var ROUTES = {
    home: {
      fr: '/fr/',
      en: '/en/',
      es: '/es/',
      it: '/it/',
      nl: '/nl/',
      no: '/no/',
    },
    offPlan: {
      fr: '/fr/sur-plan/',
      en: '/en/off-plan/',
      es: '/es/sobre-plano/',
      it: '/it/progetti-su-piano/',
      nl: '/nl/nieuwbouw/',
      no: '/no/nybygg/',
    },
    about: {
      fr: '/about/',
      en: '/en/about/',
      es: '/es/sobre-nosotros/',
      it: '/it/chi-siamo/',
      nl: '/nl/over-ons/',
      no: '/no/om-oss/',
    },
    neighbourhoods: {
      fr: '/quartiers/',
      en: '/en/neighbourhoods/',
      es: '/es/barrios/',
      it: '/it/quartieri/',
      nl: '/nl/wijken/',
      no: '/no/omrader/',
    },
    projects: {
      fr: '/nos-projets/',
      en: '/en/projects/',
      es: '/es/proyectos/',
      it: '/it/progetti/',
      nl: '/nl/projecten/',
      no: '/no/prosjekter/',
    },
    villaJaz: {
      fr: '/sur-plan/villa-jaz/',
      en: '/en/off-plan/villa-jaz/',
      es: '/es/sobre-plano/villa-jaz/',
      it: '/it/progetti-su-piano/villa-jaz/',
      nl: '/nl/nieuwbouw/villa-jaz/',
      no: '/no/nybygg/villa-jaz/',
    },
    offMarket: {
      fr: '/off-market/',
      en: '/en/off-market/',
      es: '/es/off-market/',
      it: '/it/off-market/',
      nl: '/nl/off-market/',
      no: '/no/off-market/',
    },
    simulator: {
      fr: '/simulateur/',
      en: '/en/simulator/',
      es: '/es/simulador/',
      it: '/it/simulatore/',
      nl: '/nl/simulator/',
      no: '/no/kalkulator/',
    },
    blog: {
      fr: '/blog/',
      en: '/en/blog/',
      es: '/es/blog/',
      it: '/it/blog/',
      nl: '/nl/blog/',
      no: '/no/blogg/',
    },
    blogVilla: {
      fr: '/blog/acheter-villa-sur-plan-marrakech/',
      en: '/en/blog/buying-off-plan-villa-marrakech/',
      es: '/es/blog/comprar-villa-sobre-plano-marrakech/',
      it: '/it/blog/acquistare-villa-su-progetto-marrakech/',
      nl: '/nl/blog/nieuwbouwvilla-kopen-marrakech/',
      no: '/no/blogg/kjope-nybyggvilla-marrakech/',
    },
    blogInvest: {
      fr: '/blog/investir-immobilier-luxe-marrakech/',
      en: '/en/blog/luxury-real-estate-investment-marrakech/',
      es: '/es/blog/invertir-inmobiliario-lujo-marrakech/',
      it: '/it/blog/investire-immobiliare-di-lusso-marrakech/',
      nl: '/nl/blog/investeren-luxe-vastgoed-marrakech/',
      no: '/no/blogg/investere-luksus-eiendom-marrakech/',
    },
    blogAddresses: {
      fr: '/blog/adresses-immobilier-marrakech/',
      en: '/en/blog/best-addresses-real-estate-marrakech/',
      es: '/es/blog/mejores-zonas-inmobiliarias-marrakech/',
      it: '/it/blog/indirizzi-immobiliari-marrakech/',
      nl: '/nl/blog/beste-adressen-vastgoed-marrakech/',
      no: '/no/blogg/beste-omrader-eiendom-marrakech/',
    },
    blogOffMarket: {
      fr: '/blog/off-market-marrakech-biens-confidentiels/',
      en: '/en/blog/off-market-properties-marrakech/',
      es: '/es/blog/inmuebles-off-market-marrakech/',
      it: '/it/blog/immobili-off-market-marrakech/',
      nl: '/nl/blog/off-market-vastgoed-marrakech/',
      no: '/no/blogg/off-market-eiendom-marrakech/',
    },
    blogApartment: {
      fr: '/blog/appartement-hypercentre-gueliz-marrakech/',
      en: '/en/blog/apartment-hypercentre-gueliz-marrakech/',
      es: '/es/blog/apartamento-centro-gueliz-marrakech/',
      it: '/it/blog/appartamento-centro-gueliz-marrakech/',
      nl: '/nl/blog/appartement-hypercentre-gueliz-marrakech/',
      no: '/no/blogg/leilighet-sentrum-gueliz-marrakech/',
    },
    privacy: {
      fr: '/privacy-policy/',
      en: '/en/privacy-policy/',
      es: '/es/politica-de-privacidad/',
      it: '/it/privacy-policy/',
      nl: '/nl/privacybeleid/',
      no: '/no/personvernerklaering/',
    },
    terms: {
      fr: '/conditions-generales/',
      en: '/en/terms-of-use/',
      es: '/es/condiciones-de-uso/',
      it: '/it/condizioni-d-uso/',
      nl: '/nl/gebruiksvoorwaarden/',
      no: '/no/bruksvilkaar/',
    },
    legal: {
      fr: '/mentions-legales/',
      en: '/en/legal-notice/',
      es: '/es/aviso-legal/',
      it: '/it/note-legali/',
      nl: '/nl/wettelijke-vermeldingen/',
      no: '/no/juridisk-merknad/',
    },
    contact: {
      fr: '/contact/',
      en: '/en/contact/',
      es: '/es/contacto/',
      it: '/it/contatto/',
      nl: '/nl/contact/',
      no: '/no/kontakt/',
    },
  };

  var LEGACY_ROUTES = {
    '/': 'home',
    '/sur-plan/': 'offPlan',
    '/about/': 'about',
    '/fr/about/': 'about',
    '/quartiers/': 'neighbourhoods',
    '/nos-projets/': 'projects',
    '/sur-plan/villa-jaz/': 'villaJaz',
    '/off-market/': 'offMarket',
    '/simulateur/': 'simulator',
    '/blog/': 'blog',
    '/blog/acheter-villa-sur-plan-marrakech/': 'blogVilla',
    '/blog/investir-immobilier-luxe-marrakech/': 'blogInvest',
    '/blog/adresses-immobilier-marrakech/': 'blogAddresses',
    '/blog/off-market-marrakech-biens-confidentiels/': 'blogOffMarket',
    '/blog/appartement-hypercentre-gueliz-marrakech/': 'blogApartment',
    '/privacy-policy/': 'privacy',
    '/conditions-generales/': 'terms',
    '/mentions-legales/': 'legal',
    '/contact/': 'contact',
    '/fr/contact/': 'contact',
  };

  var SLUG_TO_PAGE = {
    '': 'home',
    about: 'about',
    'sobre-nosotros': 'about',
    'chi-siamo': 'about',
    'over-ons': 'about',
    'om-oss': 'about',
    quartiers: 'neighbourhoods',
    barrios: 'neighbourhoods',
    neighbourhoods: 'neighbourhoods',
    wijken: 'neighbourhoods',
    quartieri: 'neighbourhoods',
    omrader: 'neighbourhoods',
    'nos-projets': 'projects',
    projects: 'projects',
    proyectos: 'projects',
    projecten: 'projects',
    progetti: 'projects',
    prosjekter: 'projects',
    'sur-plan': 'offPlan',
    'off-plan': 'offPlan',
    'sobre-plano': 'offPlan',
    'progetti-su-piano': 'offPlan',
    nieuwbouw: 'offPlan',
    nybygg: 'offPlan',
    'sur-plan/villa-jaz': 'villaJaz',
    'off-plan/villa-jaz': 'villaJaz',
    'sobre-plano/villa-jaz': 'villaJaz',
    'progetti-su-piano/villa-jaz': 'villaJaz',
    'nieuwbouw/villa-jaz': 'villaJaz',
    'nybygg/villa-jaz': 'villaJaz',
    'off-market': 'offMarket',
    simulateur: 'simulator',
    simulator: 'simulator',
    simulador: 'simulator',
    simulatore: 'simulator',
    kalkulator: 'simulator',
    blog: 'blog',
    blogg: 'blog',
    'blog/acheter-villa-sur-plan-marrakech': 'blogVilla',
    'blog/buying-off-plan-villa-marrakech': 'blogVilla',
    'blog/comprar-villa-sobre-plano-marrakech': 'blogVilla',
    'blog/nieuwbouwvilla-kopen-marrakech': 'blogVilla',
    'blog/acquistare-villa-su-progetto-marrakech': 'blogVilla',
    'blogg/kjope-nybyggvilla-marrakech': 'blogVilla',
    'blog/investir-immobilier-luxe-marrakech': 'blogInvest',
    'blog/luxury-real-estate-investment-marrakech': 'blogInvest',
    'blog/invertir-inmobiliario-lujo-marrakech': 'blogInvest',
    'blog/investeren-luxe-vastgoed-marrakech': 'blogInvest',
    'blog/investire-immobiliare-di-lusso-marrakech': 'blogInvest',
    'blogg/investere-luksus-eiendom-marrakech': 'blogInvest',
    'blog/adresses-immobilier-marrakech': 'blogAddresses',
    'blog/best-addresses-real-estate-marrakech': 'blogAddresses',
    'blog/mejores-zonas-inmobiliarias-marrakech': 'blogAddresses',
    'blog/beste-adressen-vastgoed-marrakech': 'blogAddresses',
    'blog/indirizzi-immobiliari-marrakech': 'blogAddresses',
    'blogg/beste-omrader-eiendom-marrakech': 'blogAddresses',
    'blog/off-market-marrakech-biens-confidentiels': 'blogOffMarket',
    'blog/off-market-properties-marrakech': 'blogOffMarket',
    'blog/inmuebles-off-market-marrakech': 'blogOffMarket',
    'blog/off-market-vastgoed-marrakech': 'blogOffMarket',
    'blog/immobili-off-market-marrakech': 'blogOffMarket',
    'blogg/off-market-eiendom-marrakech': 'blogOffMarket',
    'blog/appartement-hypercentre-gueliz-marrakech': 'blogApartment',
    'blog/apartment-hypercentre-gueliz-marrakech': 'blogApartment',
    'blog/apartamento-centro-gueliz-marrakech': 'blogApartment',
    'blog/appartamento-centro-gueliz-marrakech': 'blogApartment',
    'blogg/leilighet-sentrum-gueliz-marrakech': 'blogApartment',
    'privacy-policy': 'privacy',
    'politica-de-privacidad': 'privacy',
    privacybeleid: 'privacy',
    personvernerklaering: 'privacy',
    'conditions-generales': 'terms',
    'terms-of-use': 'terms',
    'condiciones-de-uso': 'terms',
    'condizioni-d-uso': 'terms',
    gebruiksvoorwaarden: 'terms',
    bruksvilkaar: 'terms',
    'mentions-legales': 'legal',
    'legal-notice': 'legal',
    'aviso-legal': 'legal',
    'note-legali': 'legal',
    'wettelijke-vermeldingen': 'legal',
    'juridisk-merknad': 'legal',
    contact: 'contact',
    contacto: 'contact',
    contatto: 'contact',
    kontakt: 'contact',
  };

  function normalizePath(pathname) {
    var path = pathname || '/';
    if (path.charAt(0) !== '/') path = '/' + path;
    path = path.replace(/\/index\.html$/, '/');
    if (path.length > 1 && path.charAt(path.length - 1) !== '/') path += '/';
    return path;
  }

  function getPathParts(pathname) {
    return normalizePath(pathname)
      .replace(/^\/|\/$/g, '')
      .split('/')
      .filter(Boolean);
  }

  function detectCurrentLang() {
    var first = getPathParts(window.location.pathname)[0];
    return LANGS.indexOf(first) !== -1 ? first : 'fr';
  }

  function detectCurrentPage() {
    var normalized = normalizePath(window.location.pathname);
    if (Object.prototype.hasOwnProperty.call(LEGACY_ROUTES, normalized)) {
      return LEGACY_ROUTES[normalized];
    }

    var parts = getPathParts(normalized);
    if (LANGS.indexOf(parts[0]) !== -1) {
      parts.shift();
    }

    var slug = parts.join('/');
    return SLUG_TO_PAGE[slug] || null;
  }

  function equivalentUrl(lang) {
    var page = detectCurrentPage();
    var routes = page && ROUTES[page] ? ROUTES[page] : ROUTES[FALLBACK_PAGE];
    var url = routes[lang] || ROUTES[FALLBACK_PAGE][lang] || '/';

    if (page && window.location.hash) {
      url += window.location.hash;
    }

    return url;
  }

  function closeDropdown(dropdown) {
    var trigger = dropdown.querySelector('.om-language-dropdown__trigger');
    dropdown.classList.remove('is-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function closeOtherDropdowns(current) {
    document.querySelectorAll('[data-language-dropdown].is-open').forEach(function (dropdown) {
      if (dropdown !== current) closeDropdown(dropdown);
    });
  }

  function bindDropdown(dropdown) {
    var trigger = dropdown.querySelector('.om-language-dropdown__trigger');
    if (!trigger) return;
    dropdown.setAttribute('data-om-language-init', 'true');
  }

  function syncDropdown(dropdown, currentLang) {
    bindDropdown(dropdown);

    var current = dropdown.querySelector('.om-language-dropdown__current');
    if (current) current.textContent = LANG_LABELS[currentLang];

    dropdown.querySelectorAll('.om-language-dropdown__option').forEach(function (option) {
      var optionLang = (option.getAttribute('data-lang') || option.textContent || '').trim().toLowerCase();
      if (!LANG_LABELS[optionLang]) return;

      var isActive = optionLang === currentLang;
      var isAvailable = AVAILABLE_LANGS[optionLang] === true;
      if (isAvailable) {
        option.href = equivalentUrl(optionLang);
        option.removeAttribute('aria-disabled');
        option.removeAttribute('tabindex');
      } else {
        option.removeAttribute('href');
        option.setAttribute('aria-disabled', 'true');
        option.setAttribute('tabindex', '-1');
      }
      option.classList.toggle('is-active', isActive);
      option.classList.toggle('is-disabled', !isAvailable);
      option.setAttribute('aria-selected', isActive ? 'true' : 'false');
      option.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function ensureMobileLink(control, lang) {
    if (control.tagName.toLowerCase() === 'a') return control;

    var link = document.createElement('a');
    link.className = control.className;
    link.textContent = control.textContent;
    link.setAttribute('data-lang', LANG_LABELS[lang]);
    control.replaceWith(link);
    return link;
  }

  function syncInlineSwitchers(currentLang) {
    document.querySelectorAll('.mv-lang-switcher').forEach(function (switcher) {
      switcher.querySelectorAll('.mv-lang-switcher__btn').forEach(function (control) {
        var lang = (control.getAttribute('data-lang') || control.textContent || '').trim().toLowerCase();
        if (!LANG_LABELS[lang]) return;

        var link = ensureMobileLink(control, lang);
        var isActive = lang === currentLang;
        var isAvailable = AVAILABLE_LANGS[lang] === true;
        if (isAvailable) {
          link.href = equivalentUrl(lang);
          link.removeAttribute('aria-disabled');
          link.removeAttribute('tabindex');
        } else {
          link.removeAttribute('href');
          link.setAttribute('aria-disabled', 'true');
          link.setAttribute('tabindex', '-1');
        }
        link.classList.toggle('is-active', isActive);
        link.classList.toggle('is-disabled', !isAvailable);

        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }

  function syncRuntimeLocale(currentLang) {
    document.documentElement.lang = currentLang;

    var structuredData = document.querySelector('script[type="application/ld+json"]');
    if (structuredData && STRUCTURED_DESCRIPTIONS[currentLang]) {
      try {
        var data = JSON.parse(structuredData.textContent || '{}');
        var graph = Array.isArray(data['@graph']) ? data['@graph'] : [];
        var organization = graph.find(function (entry) {
          return entry && entry['@type'] === 'RealEstateAgent';
        });
        if (organization) {
          organization.description = STRUCTURED_DESCRIPTIONS[currentLang];
          structuredData.textContent = JSON.stringify(data);
        }
      } catch (error) {
        /* Keep the server-rendered structured data if it is not valid JSON. */
      }
    }

  }

  function syncLanguageControls() {
    var currentLang = detectCurrentLang();
    syncRuntimeLocale(currentLang);

    document.querySelectorAll('[data-language-dropdown]').forEach(function (dropdown) {
      syncDropdown(dropdown, currentLang);
    });

    syncInlineSwitchers(currentLang);
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;

    var trigger = target.closest('.om-language-dropdown__trigger');
    if (trigger) {
      var triggerDropdown = trigger.closest('[data-language-dropdown]');
      if (!triggerDropdown) return;

      event.preventDefault();
      var isOpen = triggerDropdown.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) closeOtherDropdowns(triggerDropdown);
      return;
    }

    var option = target.closest('.om-language-dropdown__option');
    if (option) {
      if (option.getAttribute('aria-disabled') === 'true') {
        event.preventDefault();
        return;
      }
      var optionDropdown = option.closest('[data-language-dropdown]');
      if (optionDropdown) closeDropdown(optionDropdown);
      syncRuntimeLocale((option.getAttribute('data-lang') || option.textContent || '').trim().toLowerCase());
      return;
    }

    var inlineOption = target.closest('.mv-lang-switcher__btn');
    if (
      inlineOption &&
      inlineOption.getAttribute('aria-disabled') === 'true'
    ) {
      event.preventDefault();
      return;
    }

    if (!target.closest('[data-language-dropdown]')) {
      document.querySelectorAll('[data-language-dropdown].is-open').forEach(closeDropdown);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      document.querySelectorAll('[data-language-dropdown].is-open').forEach(closeDropdown);
    }
  });

  document.addEventListener('om-nav-rendered', syncLanguageControls);
  window.addEventListener('om-react-ready', syncLanguageControls);
  window.addEventListener('popstate', syncLanguageControls);
  window.addEventListener(
    'load',
    function () {
      window.setTimeout(syncLanguageControls, 0);
    },
    { once: true },
  );
})();
