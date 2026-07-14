/**
 * OFF MARKET language routing for the static multilingual site.
 */
(function () {
  'use strict';

  var LANGS = ['fr', 'en', 'it', 'nl'];
  var FALLBACK_PAGE = 'home';
  var LANG_LABELS = {
    fr: 'FR',
    en: 'EN',
    it: 'IT',
    nl: 'NL',
  };
  var AVAILABLE_LANGS = {
    fr: true,
    en: true,
    it: true,
    nl: true,
  };

  var ROUTES = {
    home: {
      fr: '/fr/',
      en: '/en/',
      it: '/it/',
      nl: '/nl/',
    },
    offPlan: {
      fr: '/fr/sur-plan/',
      en: '/en/off-plan/',
      it: '/it/progetti-su-piano/',
      nl: '/nl/nieuwbouw/',
    },
    about: {
      fr: '/about/',
      en: '/en/about/',
      it: '/it/',
      nl: '/nl/over-ons/',
    },
    neighbourhoods: {
      fr: '/quartiers/',
      en: '/en/neighbourhoods/',
      it: '/it/',
      nl: '/nl/wijken/',
    },
    projects: {
      fr: '/nos-projets/',
      en: '/en/projects/',
      it: '/it/',
      nl: '/nl/projecten/',
    },
    villaJaz: {
      fr: '/sur-plan/villa-jaz/',
      en: '/en/off-plan/villa-jaz/',
      it: '/it/progetti-su-piano/',
      nl: '/nl/nieuwbouw/villa-jaz/',
    },
    offMarket: {
      fr: '/off-market/',
      en: '/en/off-market/',
      it: '/it/off-market/',
      nl: '/nl/off-market/',
    },
    simulator: {
      fr: '/simulateur/',
      en: '/en/simulator/',
      it: '/it/',
      nl: '/nl/simulator/',
    },
    blog: {
      fr: '/blog/',
      en: '/en/blog/',
      it: '/it/',
      nl: '/nl/blog/',
    },
    blogVilla: {
      fr: '/blog/acheter-villa-sur-plan-marrakech/',
      en: '/en/blog/buying-off-plan-villa-marrakech/',
      it: '/it/',
      nl: '/nl/blog/nieuwbouwvilla-kopen-marrakech/',
    },
    blogInvest: {
      fr: '/blog/investir-immobilier-luxe-marrakech/',
      en: '/en/blog/luxury-real-estate-investment-marrakech/',
      it: '/it/',
      nl: '/nl/blog/investeren-luxe-vastgoed-marrakech/',
    },
    blogAddresses: {
      fr: '/blog/adresses-immobilier-marrakech/',
      en: '/en/blog/best-addresses-real-estate-marrakech/',
      it: '/it/',
      nl: '/nl/blog/beste-adressen-vastgoed-marrakech/',
    },
    blogOffMarket: {
      fr: '/blog/off-market-marrakech-biens-confidentiels/',
      en: '/en/blog/off-market-properties-marrakech/',
      it: '/it/',
      nl: '/nl/blog/off-market-vastgoed-marrakech/',
    },
    blogApartment: {
      fr: '/blog/appartement-hypercentre-gueliz-marrakech/',
      en: '/en/blog/apartment-hypercentre-gueliz-marrakech/',
      it: '/it/',
      nl: '/nl/blog/appartement-hypercentre-gueliz-marrakech/',
    },
    privacy: {
      fr: '/privacy-policy/',
      en: '/en/privacy-policy/',
      it: '/it/',
      nl: '/nl/privacybeleid/',
    },
    contact: {
      fr: '/fr/contact/',
      en: '/en/contact/',
      it: '/it/contatto/',
      nl: '/nl/contact/',
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
    '/contact/': 'contact',
    '/fr/contact/': 'contact',
  };

  var SLUG_TO_PAGE = {
    '': 'home',
    about: 'about',
    'over-ons': 'about',
    quartiers: 'neighbourhoods',
    neighbourhoods: 'neighbourhoods',
    wijken: 'neighbourhoods',
    'nos-projets': 'projects',
    projects: 'projects',
    projecten: 'projects',
    'sur-plan': 'offPlan',
    'off-plan': 'offPlan',
    'progetti-su-piano': 'offPlan',
    nieuwbouw: 'offPlan',
    'sur-plan/villa-jaz': 'villaJaz',
    'off-plan/villa-jaz': 'villaJaz',
    'nieuwbouw/villa-jaz': 'villaJaz',
    'off-market': 'offMarket',
    simulateur: 'simulator',
    simulator: 'simulator',
    blog: 'blog',
    'blog/acheter-villa-sur-plan-marrakech': 'blogVilla',
    'blog/buying-off-plan-villa-marrakech': 'blogVilla',
    'blog/nieuwbouwvilla-kopen-marrakech': 'blogVilla',
    'blog/investir-immobilier-luxe-marrakech': 'blogInvest',
    'blog/luxury-real-estate-investment-marrakech': 'blogInvest',
    'blog/investeren-luxe-vastgoed-marrakech': 'blogInvest',
    'blog/adresses-immobilier-marrakech': 'blogAddresses',
    'blog/best-addresses-real-estate-marrakech': 'blogAddresses',
    'blog/beste-adressen-vastgoed-marrakech': 'blogAddresses',
    'blog/off-market-marrakech-biens-confidentiels': 'blogOffMarket',
    'blog/off-market-properties-marrakech': 'blogOffMarket',
    'blog/off-market-vastgoed-marrakech': 'blogOffMarket',
    'blog/appartement-hypercentre-gueliz-marrakech': 'blogApartment',
    'blog/apartment-hypercentre-gueliz-marrakech': 'blogApartment',
    'privacy-policy': 'privacy',
    privacybeleid: 'privacy',
    contact: 'contact',
    contatto: 'contact',
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

  function syncLanguageControls() {
    var currentLang = detectCurrentLang();

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
  window.addEventListener(
    'load',
    function () {
      window.setTimeout(syncLanguageControls, 0);
    },
    { once: true },
  );
})();
