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
    en: false,
    it: false,
    nl: false,
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
    '/contact/': 'contact',
  };

  var SLUG_TO_PAGE = {
    '': 'home',
    'sur-plan': 'offPlan',
    'off-plan': 'offPlan',
    'progetti-su-piano': 'offPlan',
    nieuwbouw: 'offPlan',
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncLanguageControls);
  } else {
    syncLanguageControls();
  }
})();
