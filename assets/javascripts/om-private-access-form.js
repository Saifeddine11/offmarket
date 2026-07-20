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
    success: 'Votre demande a bien été transmise à OFF MARKET. Nous vous recontacterons rapidement.',
    error: 'Merci de vérifier les champs obligatoires avant d’envoyer votre demande.',
    sendError: 'Une erreur est survenue. Veuillez réessayer dans un instant.',
    rateLimit: 'Trop de tentatives. Veuillez réessayer dans quelques minutes.',
    sending: 'Envoi en cours…',
  };

  var COPY_EN = {
    success: 'Your request has been sent to OFF MARKET. We will get back to you shortly.',
    error: 'Please check the required fields before sending your request.',
    sendError: 'Something went wrong. Please try again in a moment.',
    rateLimit: 'Too many attempts. Please try again in a few minutes.',
    sending: 'Sending…',
  };

  var COPY_IT = {
    success: 'La tua richiesta è stata inviata a OFF MARKET. Ti ricontatteremo a breve.',
    error: 'Verifica i campi obbligatori prima di inviare la richiesta.',
    sendError: 'Si è verificato un errore. Riprova tra un momento.',
    rateLimit: 'Troppi tentativi. Riprova tra qualche minuto.',
    sending: 'Invio in corso…',
  };

  var COPY_NL = {
    success: 'Uw aanvraag is verzonden naar OFF MARKET. Wij nemen spoedig contact met u op.',
    error: 'Controleer de verplichte velden voordat u uw aanvraag verstuurt.',
    sendError: 'Er is iets misgegaan. Probeer het zo opnieuw.',
    rateLimit: 'Te veel pogingen. Probeer het over enkele minuten opnieuw.',
    sending: 'Bezig met verzenden…',
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

  function getUtmParams() {
    var params = new URLSearchParams(window.location.search || '');
    return {
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
    };
  }

  function classifyType(intent, source, context) {
    var blob = String(intent + ' ' + source + ' ' + context).toLowerCase();
    if (blob.indexOf('villa-jaz') !== -1 || blob.indexOf('villa_jaz') !== -1) {
      return 'villa_jaz';
    }
    if (
      blob.indexOf('off-market') !== -1 ||
      blob.indexOf('off_market') !== -1 ||
      blob.indexOf('offmarket') !== -1
    ) {
      return 'off_market';
    }
    if (blob.indexOf('simulator') !== -1 || blob.indexOf('simulateur') !== -1) {
      return 'simulator';
    }
    if (
      blob.indexOf('nos-projets') !== -1 ||
      blob.indexOf('nos_projets') !== -1 ||
      blob.indexOf('homepage') !== -1 ||
      blob.indexOf('home-page') !== -1 ||
      blob.indexOf('home_page') !== -1
    ) {
      return 'project';
    }
    if (blob.indexOf('private') !== -1 || blob.indexOf('acces') !== -1) {
      return 'private_access';
    }
    if (blob.indexOf('contact') !== -1) return 'contact';
    return 'lead';
  }

  function createIdempotencyKey() {
    try {
      if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return window.crypto.randomUUID().replace(/-/g, '');
      }
    } catch (error) {
      /* noop */
    }
    return (
      'k' +
      String(Date.now()) +
      Math.random().toString(16).slice(2) +
      Math.random().toString(16).slice(2)
    );
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
    var honeypotField = form ? form.querySelector('[name="companyWebsite"]') : null;
    var utm = getUtmParams();
    var startedAt = form && form.dataset.formStartedAt
      ? Number(form.dataset.formStartedAt)
      : Date.now();

    return {
      type: classifyType(data.intent, source, context),
      fullName: data.name,
      phoneCountry: data.dialCode,
      phone: data.phone,
      email: data.email,
      message: data.message || '',
      intent: data.intent || '',
      propertyType: propertyType,
      budget: contextBudget,
      objective: objective,
      source: source,
      context: context,
      locale: locale,
      pagePath: window.location.pathname || '',
      pageUrl: window.location.href || '',
      utmSource: utm.utmSource,
      utmMedium: utm.utmMedium,
      utmCampaign: utm.utmCampaign,
      companyWebsite: honeypotField ? String(honeypotField.value || '') : '',
      formStartedAt: startedAt,
      idempotencyKey: createIdempotencyKey(),
    };
  }

  function setSubmitEnabled(form, enabled) {
    var button = form.querySelector('.om-private-access-form__submit');
    if (!button) return;
    button.disabled = !enabled;
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
    form.dataset.formStartedAt = String(Date.now());

    populateSelects(form);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearFieldErrors(form);
      var copy = getCopy(form);

      var statusEl = form.querySelector('[data-private-status]');
      setStatus(statusEl, '', false);

      if (form.dataset.privateAccessSubmitting === 'true') return;

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

      var data = {
        name: name,
        email: email,
        dialCode: dialCode,
        phone: phone,
        phoneFull: dialCode + ' ' + phone,
        message: note,
        intent: intent,
      };

      var payload = buildLeadPayload(data, form);
      // Keep the same idempotency key across network retries for this attempt.
      var attemptKey = payload.idempotencyKey;
      form.dataset.privateAccessSubmitting = 'true';
      setSubmitEnabled(form, false);
      setStatus(statusEl, copy.sending, false);

      var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timeoutId = window.setTimeout(function () {
        if (controller) controller.abort();
      }, 20000);

      function postOnce() {
        payload.idempotencyKey = attemptKey;
        return fetch('/api/leads/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
          signal: controller ? controller.signal : undefined,
        }).then(function (response) {
          return response
            .json()
            .catch(function () {
              return { ok: false };
            })
            .then(function (json) {
              return {
                status: response.status,
                ok: response.ok && json && json.ok === true,
                json: json,
              };
            });
        });
      }

      postOnce()
        .then(function (result) {
          if (result.status === 429) {
            setStatus(
              statusEl,
              (result.json && result.json.message) || copy.rateLimit,
              true
            );
            return;
          }
          if (!result.ok) {
            setStatus(statusEl, copy.sendError, true);
            return;
          }
          setStatus(statusEl, copy.success, false);
          form.reset();
          form.dataset.formStartedAt = String(Date.now());
          populateSelects(form);
        })
        .catch(function () {
          setStatus(statusEl, copy.sendError, true);
        })
        .then(function () {
          window.clearTimeout(timeoutId);
          form.dataset.privateAccessSubmitting = 'false';
          setSubmitEnabled(form, true);
        });
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
