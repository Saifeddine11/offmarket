(function () {
  'use strict';

  var COUNTRY_CODES = [
    { code: '+212', label: 'Maroc', flag: '🇲🇦', locales: ['fr-MA', 'ar-MA'], region: 'MA' },
    { code: '+33', label: 'France', flag: '🇫🇷', locales: ['fr-FR'], region: 'FR' },
    { code: '+32', label: 'Belgique', flag: '🇧🇪', locales: ['fr-BE', 'nl-BE'], region: 'BE' },
    { code: '+41', label: 'Suisse', flag: '🇨🇭', locales: ['fr-CH', 'de-CH', 'it-CH'], region: 'CH' },
    { code: '+34', label: 'Espagne', flag: '🇪🇸', locales: ['es-ES'], region: 'ES' },
    { code: '+39', label: 'Italie', flag: '🇮🇹', locales: ['it-IT'], region: 'IT' },
    { code: '+31', label: 'Pays-Bas', flag: '🇳🇱', locales: ['nl-NL'], region: 'NL' },
    { code: '+44', label: 'Royaume-Uni', flag: '🇬🇧', locales: ['en-GB'], region: 'GB' },
    { code: '+1', label: 'États-Unis', flag: '🇺🇸', locales: ['en-US'], region: 'US' },
    { code: '+971', label: 'Émirats arabes unis', flag: '🇦🇪', locales: ['ar-AE', 'en-AE'], region: 'AE' },
    { code: '+966', label: 'Arabie saoudite', flag: '🇸🇦', locales: ['ar-SA'], region: 'SA' },
    { code: '+974', label: 'Qatar', flag: '🇶🇦', locales: ['ar-QA'], region: 'QA' },
  ];

  var COPY_FR = {
    success:
      'Votre demande a bien été préparée. Nous vous répondrons avec une première lecture privée adaptée à votre projet.',
    error:
      'Merci de vérifier les champs obligatoires avant d’envoyer votre demande.',
    mailSubject: 'Demande accès OFF MARKET',
  };

  var COPY_EN = {
    success:
      'Your request has been prepared. We will respond with an initial private review tailored to your project.',
    error: 'Please check the required fields before sending your request.',
    mailSubject: 'OFF MARKET access request',
  };

  var COPY_IT = {
    success:
      'La tua richiesta è stata preparata. Ti risponderemo con una prima lettura privata in linea con il tuo progetto.',
    error:
      'Verifica i campi obbligatori prima di inviare la richiesta.',
    mailSubject: 'Richiesta accesso OFF MARKET',
  };

  function detectFormLocale() {
    var path = window.location.pathname || '/';
    if (path.indexOf('/en') === 0) return 'en';
    if (path.indexOf('/it') === 0) return 'it';
    var attr = document.documentElement.getAttribute('lang');
    if (attr && attr.indexOf('en') === 0) return 'en';
    if (attr && attr.indexOf('it') === 0) return 'it';
    return 'fr';
  }

  function resolveFormLocale(form) {
    if (form && form.getAttribute('data-form-locale') === 'en') return 'en';
    if (form && form.getAttribute('data-form-locale') === 'it') return 'it';
    return detectFormLocale();
  }

  function getCopy(form) {
    var locale = resolveFormLocale(form);
    if (locale === 'en') return COPY_EN;
    if (locale === 'it') return COPY_IT;
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

  function countryOptionsHtml(selectedCode) {
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
        entry.label +
        ' ' +
        entry.code +
        '</option>'
      );
    }).join('');
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
    var lines = [
      'Bonjour, je souhaite demander l’accès aux projets OFF MARKET.',
      '',
      'Nom complet : ' + payload.fullName,
      'Email : ' + payload.email,
      'Téléphone : ' + payload.phoneCountry + ' ' + payload.phone,
      'Message : ' + (payload.message || '—'),
      'Intent : ' + data.intent,
    ];

    if (payload.propertyType || payload.budget || payload.objective || payload.source || payload.context) {
      lines.push('');
      if (payload.propertyType) lines.push('Type de bien : ' + payload.propertyType);
      if (payload.budget) lines.push('Budget étudié : ' + payload.budget);
      if (payload.objective) lines.push('Objectif : ' + payload.objective);
      if (payload.source) lines.push('Source : ' + payload.source);
      if (payload.context) lines.push('Contexte : ' + payload.context);
    }

    lines.push('');
    lines.push('Locale : ' + payload.locale);
    lines.push('Horodatage : ' + payload.createdAt);
    lines.push('');
    lines.push(
      'Merci de me recontacter avec une sélection privée adaptée à mon projet.'
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
      countrySelect.innerHTML = countryOptionsHtml(detectCountryCode());
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
      form.reset();
      populateSelects(form);

      window.setTimeout(function () {
        window.location.href =
          'mailto:contact@offmarket.ma?subject=' + subject + '&body=' + body;
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
