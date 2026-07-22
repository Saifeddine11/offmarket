(function () {
  'use strict';

  var COUNTRY_CODES = [
    { code: '+212', label: 'Maroc', flag: '🇲🇦', locales: ['fr-MA', 'ar-MA'], region: 'MA' },
    { code: '+33', label: 'France', flag: '🇫🇷', locales: ['fr-FR'], region: 'FR' },
    { code: '+32', label: 'Belgique', flag: '🇧🇪', locales: ['fr-BE', 'nl-BE'], region: 'BE' },
    { code: '+41', label: 'Suisse', flag: '🇨🇭', locales: ['fr-CH', 'de-CH', 'it-CH'], region: 'CH' },
    { code: '+49', label: 'Allemagne', flag: '🇩🇪', locales: ['de-DE'], region: 'DE' },
    { code: '+34', label: 'Espagne', flag: '🇪🇸', locales: ['es-ES'], region: 'ES' },
    { code: '+39', label: 'Italie', flag: '🇮🇹', locales: ['it-IT'], region: 'IT' },
    { code: '+31', label: 'Pays-Bas', flag: '🇳🇱', locales: ['nl-NL'], region: 'NL' },
    { code: '+44', label: 'Royaume-Uni', flag: '🇬🇧', locales: ['en-GB'], region: 'GB' },
    { code: '+1', label: 'États-Unis', flag: '🇺🇸', locales: ['en-US'], region: 'US' },
    { code: '+971', label: 'Émirats arabes unis', flag: '🇦🇪', locales: ['ar-AE', 'en-AE'], region: 'AE' },
    { code: '+966', label: 'Arabie saoudite', flag: '🇸🇦', locales: ['ar-SA'], region: 'SA' },
    { code: '+974', label: 'Qatar', flag: '🇶🇦', locales: ['ar-QA'], region: 'QA' },
  ];

  var COUNTRY_LABELS = {
    fr: {
      MA: 'Maroc', FR: 'France', BE: 'Belgique', CH: 'Suisse', DE: 'Allemagne', ES: 'Espagne',
      IT: 'Italie', NL: 'Pays-Bas', GB: 'Royaume-Uni', US: 'États-Unis',
      AE: 'Émirats arabes unis', SA: 'Arabie saoudite', QA: 'Qatar',
    },
    en: {
      MA: 'Morocco', FR: 'France', BE: 'Belgium', CH: 'Switzerland', DE: 'Germany', ES: 'Spain',
      IT: 'Italy', NL: 'Netherlands', GB: 'United Kingdom', US: 'United States',
      AE: 'United Arab Emirates', SA: 'Saudi Arabia', QA: 'Qatar',
    },
    it: {
      MA: 'Marocco', FR: 'Francia', BE: 'Belgio', CH: 'Svizzera', DE: 'Germania', ES: 'Spagna',
      IT: 'Italia', NL: 'Paesi Bassi', GB: 'Regno Unito', US: 'Stati Uniti',
      AE: 'Emirati Arabi Uniti', SA: 'Arabia Saudita', QA: 'Qatar',
    },
    nl: {
      MA: 'Marokko', FR: 'Frankrijk', BE: 'België', CH: 'Zwitserland', DE: 'Duitsland', ES: 'Spanje',
      IT: 'Italië', NL: 'Nederland', GB: 'Verenigd Koninkrijk', US: 'Verenigde Staten',
      AE: 'Verenigde Arabische Emiraten', SA: 'Saudi-Arabië', QA: 'Qatar',
    },
  };

  var COPY_FR = {
    success:
      'Votre demande est prête dans votre messagerie. Envoyez l’email pour transmettre votre projet à OFF MARKET.',
    error:
      'Merci de vérifier les champs obligatoires avant d’envoyer votre demande.',
    mailSubject: 'Demande accès OFF MARKET',
  };

  var COPY_EN = {
    success:
      'Your request is ready in your email app. Send the email to share your project with OFF MARKET.',
    error: 'Please check the required fields before sending your request.',
    mailSubject: 'OFF MARKET access request',
  };

  var COPY_IT = {
    success:
      'La tua richiesta è pronta nella tua email. Invia l’email per condividere il tuo progetto con OFF MARKET.',
    error:
      'Verifica i campi obbligatori prima di inviare la richiesta.',
    mailSubject: 'Richiesta accesso OFF MARKET',
  };

  var COPY_NL = {
    success:
      'Uw aanvraag staat klaar in uw e-mailprogramma. Verstuur de e-mail om uw project met OFF MARKET te delen.',
    error:
      'Controleer de verplichte velden voordat u uw aanvraag verstuurt.',
    mailSubject: 'OFF MARKET toegangsaanvraag',
  };

  var LEGACY_FORM_COPY = {
    fr: {
      fullName: 'Nom complet', fullNamePlaceholder: 'Votre nom complet',
      phoneLegend: 'Numéro de téléphone', countryCode: 'Indicatif pays',
      phoneNumber: 'Numéro', message: 'Message (optionnel)',
      messagePlaceholder: 'Votre message, votre projet ou vos critères spécifiques',
      submit: "Demander l'accès", privacyPrefix: 'En cliquant sur le bouton, vous acceptez que OFF MARKET vous contacte au sujet de votre demande.',
      privacyLink: 'Confidentialité', privacyHref: '/privacy-policy/',
    },
    en: {
      fullName: 'Full name', fullNamePlaceholder: 'Your full name',
      phoneLegend: 'Phone number', countryCode: 'Country code',
      phoneNumber: 'Number', message: 'Message (optional)',
      messagePlaceholder: 'Your message, project details or specific criteria',
      submit: 'Request access', privacyPrefix: 'By clicking the button, you agree that OFF MARKET may contact you about your request.',
      privacyLink: 'Privacy policy', privacyHref: '/en/privacy-policy/',
    },
    it: {
      fullName: 'Nome completo', fullNamePlaceholder: 'Il tuo nome completo',
      phoneLegend: 'Numero di telefono', countryCode: 'Prefisso internazionale',
      phoneNumber: 'Numero', message: 'Messaggio (facoltativo)',
      messagePlaceholder: 'Il tuo messaggio, progetto o criteri specifici',
      submit: 'Richiedi accesso', privacyPrefix: 'Cliccando sul pulsante, accetti che OFF MARKET ti contatti in merito alla tua richiesta.',
      privacyLink: 'Informativa sulla privacy', privacyHref: '/it/privacy-policy/',
    },
    nl: {
      fullName: 'Volledige naam', fullNamePlaceholder: 'Uw volledige naam',
      phoneLegend: 'Telefoonnummer', countryCode: 'Landcode',
      phoneNumber: 'Nummer', message: 'Bericht (optioneel)',
      messagePlaceholder: 'Uw bericht, project of specifieke criteria',
      submit: 'Toegang aanvragen', privacyPrefix: 'Door op de knop te klikken, stemt u ermee in dat OFF MARKET contact met u opneemt over uw aanvraag.',
      privacyLink: 'Privacy', privacyHref: '/nl/privacybeleid/',
    },
  };

  function detectFormLocale() {
    var path = window.location.pathname || '/';
    if (path.indexOf('/en') === 0) return 'en';
    if (path.indexOf('/it') === 0) return 'it';
    if (path.indexOf('/nl') === 0) return 'nl';
    var attr = document.documentElement.getAttribute('lang');
    if (attr && attr.indexOf('en') === 0) return 'en';
    if (attr && attr.indexOf('it') === 0) return 'it';
    if (attr && attr.indexOf('nl') === 0) return 'nl';
    return 'fr';
  }

  function resolveFormLocale(form) {
    if (form && form.getAttribute('data-form-locale') === 'en') return 'en';
    if (form && form.getAttribute('data-form-locale') === 'it') return 'it';
    if (form && form.getAttribute('data-form-locale') === 'nl') return 'nl';
    return detectFormLocale();
  }

  function getCopy(form) {
    var locale = resolveFormLocale(form);
    if (locale === 'en') return COPY_EN;
    if (locale === 'it') return COPY_IT;
    if (locale === 'nl') return COPY_NL;
    return COPY_FR;
  }

  var COPY = COPY_FR;

  function detectCountryCode() {
    var languages = [];
    if (Array.isArray(navigator.languages)) {
      languages = navigator.languages.slice();
    }
    if (navigator.language) languages.push(navigator.language);

    var i;
    var lang;
    var entry;
    var j;

    for (i = 0; i < languages.length; i += 1) {
      lang = String(languages[i] || '');
      for (j = 0; j < COUNTRY_CODES.length; j += 1) {
        entry = COUNTRY_CODES[j];
        if (entry.locales.indexOf(lang) !== -1) return entry.code;
        if (lang.indexOf('-') !== -1 && entry.region === lang.split('-')[1]) {
          return entry.code;
        }
      }
    }

    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.indexOf('Casablanca') !== -1) {
        return '+212';
      }
    } catch (error) {
      /* noop */
    }

    return '+212';
  }

  function countryOptionsHtml(selectedCode, locale) {
    var labels = COUNTRY_LABELS[locale] || COUNTRY_LABELS.fr;
    return COUNTRY_CODES.map(function (entry) {
      var selected = entry.code === selectedCode ? ' selected' : '';
      return (
        '<option value="' +
        entry.code +
        '"' +
        selected +
        '>' +
        entry.flag +
        ' ' +
        (labels[entry.region] || entry.label) +
        ' ' +
        entry.code +
        '</option>'
      );
    }).join('');
  }

  function localizeLegacyForm(form) {
    if (!form || !form.hasAttribute('data-legacy-private-access-form')) return;
    var locale = resolveFormLocale(form);
    var copy = LEGACY_FORM_COPY[locale] || LEGACY_FORM_COPY.fr;
    form.querySelectorAll('[data-private-copy]').forEach(function (element) {
      var key = element.getAttribute('data-private-copy');
      if (copy[key]) element.textContent = copy[key];
    });
    form.querySelectorAll('[data-private-placeholder]').forEach(function (element) {
      var key = element.getAttribute('data-private-placeholder');
      if (copy[key]) element.setAttribute('placeholder', copy[key]);
    });
    var privacyLink = form.querySelector('[data-private-copy="privacyLink"]');
    if (privacyLink) privacyLink.setAttribute('href', copy.privacyHref);
  }

  function setStatus(statusEl, text, isError) {
    if (!statusEl) return;
    statusEl.textContent = text || '';
    statusEl.classList.toggle('is-error', Boolean(isError));
    statusEl.setAttribute('role', text ? 'alert' : 'status');
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  }

  function getContextField(form, name) {
    if (!form) return '';
    var field = form.querySelector('[data-contact-context][name="' + name + '"]');
    return field && field.value ? String(field.value).trim() : '';
  }

  function getLeadField(form, name) {
    if (!form) return '';
    var field = form.querySelector('[name="' + name + '"]');
    if (field && field.value) return String(field.value).trim();
    var attr = form.getAttribute('data-lead-' + name.replace('lead', '').toLowerCase());
    return attr ? String(attr).trim() : '';
  }

  function buildLeadPayload(data, form) {
    var locale = resolveFormLocale(form);
    var propertyType = getContextField(form, 'contextPropertyType');
    var contextBudget = getContextField(form, 'contextBudget');
    var objective = getContextField(form, 'contextObjective');
    var source =
      getLeadField(form, 'leadSource') ||
      getContextField(form, 'contextSource') ||
      (form ? form.getAttribute('data-lead-source') : '') ||
      '';
    var context =
      getLeadField(form, 'leadContext') ||
      (form ? form.getAttribute('data-lead-context') : '') ||
      '';

    return {
      fullName: data.name,
      phoneCountry: data.dialCode,
      phone: data.phone,
      email: data.email,
      message: data.message || '',
      propertyType: propertyType,
      budget: contextBudget,
      objective: objective,
      source: source,
      context: context,
      locale: locale,
      createdAt: new Date().toISOString(),
    };
  }

  function buildMailBody(data, form) {
    var payload = buildLeadPayload(data, form);
    var isEn = payload.locale === 'en';
    var isNl = payload.locale === 'nl';
    var lines = [
      isNl
        ? 'Hallo, ik wil toegang aanvragen tot de OFF MARKET projecten.'
        : isEn
          ? 'Hello, I would like to request access to OFF MARKET projects.'
          : 'Bonjour, je souhaite demander l’accès aux projets OFF MARKET.',
      '',
      (isNl ? 'Volledige naam : ' : isEn ? 'Full name : ' : 'Nom complet : ') + payload.fullName,
      'Email : ' + payload.email,
      (isNl ? 'Telefoon : ' : isEn ? 'Phone : ' : 'Téléphone : ') +
        payload.phoneCountry +
        ' ' +
        payload.phone,
      'Message : ' + (payload.message || '—'),
      'Intent : ' + data.intent,
    ];

    if (payload.propertyType || payload.budget || payload.objective || payload.source || payload.context) {
      lines.push('');
      if (payload.propertyType) {
        lines.push(
          (isNl ? 'Type vastgoed : ' : isEn ? 'Property type : ' : 'Type de bien : ') +
            payload.propertyType
        );
      }
      if (payload.budget) {
        lines.push(
          (isNl ? 'Budget : ' : isEn ? 'Budget reviewed : ' : 'Budget étudié : ') +
            payload.budget
        );
      }
      if (payload.objective) {
        lines.push(
          (isNl ? 'Doelstelling : ' : isEn ? 'Objective : ' : 'Objectif : ') +
            payload.objective
        );
      }
      if (payload.source) lines.push('Source : ' + payload.source);
      if (payload.context) {
        lines.push((isNl ? 'Context : ' : isEn ? 'Context : ' : 'Contexte : ') + payload.context);
      }
    }

    lines.push('');
    lines.push('Locale : ' + payload.locale);
    lines.push((isNl ? 'Tijdstempel : ' : isEn ? 'Timestamp : ' : 'Horodatage : ') + payload.createdAt);
    lines.push('');
    lines.push(
      isNl
        ? 'Dank u om contact met mij op te nemen met een private selectie die past bij mijn project.'
        : isEn
          ? 'Please contact me with a private selection tailored to my project.'
          : 'Merci de me recontacter avec une sélection privée adaptée à mon projet.'
    );

    return lines.join('\n');
  }

  function resolveIntent(form) {
    var attr = form.getAttribute('data-form-intent');
    if (attr && attr !== 'from-url') return attr;

    var urlIntent = new URLSearchParams(window.location.search).get('intent');
    if (urlIntent === 'biens-existants') return 'biens-existants';
    if (urlIntent === 'off-market') return 'contact-off-market';

    if (document.body.classList.contains('om-off-market-page')) {
      return urlIntent === 'biens-existants' ? 'biens-existants' : 'off-market';
    }

    return attr || 'off-market';
  }

  function populateSelects(form) {
    var countrySelect = form.querySelector('[data-private-country]');
    var intentInput = form.querySelector('[data-private-intent]');

    if (countrySelect && !countrySelect.options.length) {
      countrySelect.innerHTML = countryOptionsHtml(
        detectCountryCode(),
        resolveFormLocale(form),
      );
    }

    if (intentInput) {
      intentInput.value = resolveIntent(form);
    }
  }

  function clearFieldErrors(form) {
    form.querySelectorAll('.is-invalid').forEach(function (field) {
      field.classList.remove('is-invalid');
    });
  }

  function markInvalid(field) {
    if (!field) return;
    field.classList.add('is-invalid');
    field.focus();
  }

  function bindForm(form) {
    if (form.dataset.privateAccessBound === 'true') return;
    form.dataset.privateAccessBound = 'true';

    localizeLegacyForm(form);
    populateSelects(form);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearFieldErrors(form);
      var copy = getCopy(form);

      var statusEl = form.querySelector('[data-private-status]');
      setStatus(statusEl, '', false);

      var nameField = form.querySelector('[name="fullName"]');
      var emailField = form.querySelector('[name="email"]');
      var countrySelect = form.querySelector('[data-private-country]');
      var phoneField = form.querySelector('[name="phone"]');
      var messageField = form.querySelector('[name="message"]');
      var intentInput = form.querySelector('[data-private-intent]');

      var name = nameField ? nameField.value.trim() : '';
      var email = emailField ? emailField.value.trim() : '';
      var dialCode = countrySelect ? countrySelect.value : '';
      var phone = phoneField ? phoneField.value.trim() : '';
      var note = messageField ? messageField.value.trim() : '';
      var intent = intentInput ? intentInput.value : resolveIntent(form);

      if (!name) {
        markInvalid(nameField);
        setStatus(statusEl, copy.error, true);
        return;
      }
      if (!email || !isValidEmail(email)) {
        markInvalid(emailField);
        setStatus(statusEl, copy.error, true);
        return;
      }
      if (!dialCode) {
        markInvalid(countrySelect);
        setStatus(statusEl, copy.error, true);
        return;
      }
      if (!phone) {
        markInvalid(phoneField);
        setStatus(statusEl, copy.error, true);
        return;
      }

      var payload = {
        name: name,
        email: email,
        dialCode: dialCode,
        phone: phone,
        phoneFull: dialCode + ' ' + phone,
        message: note,
        intent: intent,
      };

      var body = encodeURIComponent(buildMailBody(payload, form));
      var subject = encodeURIComponent(copy.mailSubject);

      setStatus(statusEl, copy.success, false);
      window.setTimeout(function () {
        window.location.href =
          'mailto:contact@offmarketofficial.com?subject=' + subject + '&body=' + body;
      }, 120);
    });
  }

  function init(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-private-access-form]').forEach(bindForm);
  }

  window.OMPrivateAccessForm = {
    init: init,
    populateSelects: populateSelects,
    resolveIntent: resolveIntent,
    detectCountryCode: detectCountryCode,
  };

  window.OM_OFF_MARKET_ACCESS_HREF = (function () {
    var path = window.location.pathname || '/';
    if (path.indexOf('/en') === 0) return '/en/off-market/';
    if (path.indexOf('/it') === 0) return '/it/off-market/';
    return '/off-market/';
  })();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init(document);
    });
  } else {
    init(document);
  }
})();
