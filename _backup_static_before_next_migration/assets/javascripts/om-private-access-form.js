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

  var BUDGET_OPTIONS = [
    { value: '120000-150000', label: '120 000 € – 150 000 €' },
    { value: '150000-180000', label: '150 000 € – 180 000 €' },
    { value: '180000-plus', label: '+ 180 000 €' },
  ];

  var COPY = {
    success:
      'Votre demande a bien été reçue. Nous vous recontacterons avec une sélection privée adaptée à votre projet.',
    error:
      'Merci de vérifier les champs obligatoires avant d’envoyer votre demande.',
    mailSubject: 'Demande accès OFF MARKET',
  };

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

  function budgetOptionsHtml() {
    return (
      '<option value="" disabled selected>Sélectionnez votre budget</option>' +
      BUDGET_OPTIONS.map(function (option) {
        return (
          '<option value="' + option.value + '">' + option.label + '</option>'
        );
      }).join('')
    );
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

  function getBudgetLabel(value) {
    var match = BUDGET_OPTIONS.filter(function (option) {
      return option.value === value;
    })[0];
    return match ? match.label : value;
  }

  function buildMailBody(data) {
    return [
      'Bonjour, je souhaite demander l’accès aux projets OFF MARKET.',
      '',
      'Nom complet : ' + data.name,
      'Email : ' + data.email,
      'Téléphone : ' + data.phoneFull,
      'Budget : ' + data.budgetLabel,
      'Message : ' + (data.message || '—'),
      'Intent : ' + data.intent,
      '',
      'Merci de me recontacter avec une sélection privée adaptée à mon projet.',
    ].join('\n');
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
    var budgetSelect = form.querySelector('[data-private-budget]');
    var intentInput = form.querySelector('[data-private-intent]');

    if (countrySelect && !countrySelect.options.length) {
      countrySelect.innerHTML = countryOptionsHtml(detectCountryCode());
    }

    if (budgetSelect && !budgetSelect.options.length) {
      budgetSelect.innerHTML = budgetOptionsHtml();
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

      var statusEl = form.querySelector('[data-private-status]');
      setStatus(statusEl, '', false);

      var nameField = form.querySelector('[name="fullName"]');
      var emailField = form.querySelector('[name="email"]');
      var countrySelect = form.querySelector('[data-private-country]');
      var phoneField = form.querySelector('[name="phone"]');
      var budgetSelect = form.querySelector('[data-private-budget]');
      var messageField = form.querySelector('[name="message"]');
      var intentInput = form.querySelector('[data-private-intent]');

      var name = nameField ? nameField.value.trim() : '';
      var email = emailField ? emailField.value.trim() : '';
      var dialCode = countrySelect ? countrySelect.value : '';
      var phone = phoneField ? phoneField.value.trim() : '';
      var budget = budgetSelect ? budgetSelect.value : '';
      var note = messageField ? messageField.value.trim() : '';
      var intent = intentInput ? intentInput.value : resolveIntent(form);

      if (!name) {
        markInvalid(nameField);
        setStatus(statusEl, COPY.error, true);
        return;
      }
      if (!email || !isValidEmail(email)) {
        markInvalid(emailField);
        setStatus(statusEl, COPY.error, true);
        return;
      }
      if (!dialCode) {
        markInvalid(countrySelect);
        setStatus(statusEl, COPY.error, true);
        return;
      }
      if (!phone) {
        markInvalid(phoneField);
        setStatus(statusEl, COPY.error, true);
        return;
      }
      if (!budget) {
        markInvalid(budgetSelect);
        setStatus(statusEl, COPY.error, true);
        return;
      }

      var payload = {
        name: name,
        email: email,
        phoneFull: dialCode + ' ' + phone,
        budgetLabel: getBudgetLabel(budget),
        message: note,
        intent: intent,
      };

      var body = encodeURIComponent(buildMailBody(payload));
      var subject = encodeURIComponent(COPY.mailSubject);

      setStatus(statusEl, COPY.success, false);
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

  window.OM_OFF_MARKET_ACCESS_HREF = '/off-market/';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init(document);
    });
  } else {
    init(document);
  }
})();
