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
    es: {
      MA: 'Marruecos', FR: 'Francia', BE: 'Bélgica', CH: 'Suiza', DE: 'Alemania', ES: 'España',
      IT: 'Italia', NL: 'Países Bajos', GB: 'Reino Unido', US: 'Estados Unidos',
      AE: 'Emiratos Árabes Unidos', SA: 'Arabia Saudí', QA: 'Qatar',
    },
    no: {
      MA: 'Marokko', FR: 'Frankrike', BE: 'Belgia', CH: 'Sveits', DE: 'Tyskland', ES: 'Spania',
      IT: 'Italia', NL: 'Nederland', GB: 'Storbritannia', US: 'USA',
      AE: 'De forente arabiske emirater', SA: 'Saudi-Arabia', QA: 'Qatar',
    },
  };

  var COPY_FR = {
    validationError:
      'Merci de vérifier les champs obligatoires avant d’envoyer votre demande.',
    sendError:
      'Nous n’avons pas pu envoyer votre demande. Vos informations ont été conservées. Veuillez réessayer dans quelques instants.',
    sending: 'Envoi de votre demande…',
    sent: 'Demande envoyée',
    tryAgain: 'Réessayer',
    modalEyebrow: 'DEMANDE REÇUE',
    modalTitle: 'Votre demande privée a bien été envoyée',
    modalText:
      'Notre équipe a reçu votre demande. Un conseiller OFF MARKET vous contactera prochainement avec une sélection adaptée à votre projet.',
    modalClose: 'Fermer',
    modalHome: 'Retour à l’accueil',
    homeHref: '/',
  };

  var COPY_EN = {
    validationError:
      'Please check the required fields before sending your request.',
    sendError:
      'We couldn’t send your request. Your information has been preserved. Please try again in a moment.',
    sending: 'Sending your request…',
    sent: 'Request sent',
    tryAgain: 'Try again',
    modalEyebrow: 'REQUEST RECEIVED',
    modalTitle: 'Your private request has been sent',
    modalText:
      'Our team has received your request. An OFF MARKET advisor will contact you shortly with a selection aligned with your project.',
    modalClose: 'Close',
    modalHome: 'Return to homepage',
    homeHref: '/en/',
  };

  var COPY_IT = {
    validationError:
      'Verifica i campi obbligatori prima di inviare la richiesta.',
    sendError:
      'Non siamo riusciti a inviare la richiesta. I tuoi dati sono stati conservati. Riprova tra poco.',
    sending: 'Invio della richiesta…',
    sent: 'Richiesta inviata',
    tryAgain: 'Riprova',
    modalEyebrow: 'RICHIESTA RICEVUTA',
    modalTitle: 'La tua richiesta privata è stata inviata',
    modalText:
      'Il nostro team ha ricevuto la tua richiesta. Un consulente OFF MARKET ti contatterà a breve con una selezione in linea con il tuo progetto.',
    modalClose: 'Chiudi',
    modalHome: 'Torna alla home',
    homeHref: '/it/',
  };

  var COPY_NL = {
    validationError:
      'Controleer de verplichte velden voordat u uw aanvraag verstuurt.',
    sendError:
      'We konden uw aanvraag niet verzenden. Uw gegevens zijn bewaard. Probeer het opnieuw.',
    sending: 'Uw aanvraag wordt verzonden…',
    sent: 'Aanvraag verzonden',
    tryAgain: 'Opnieuw proberen',
    modalEyebrow: 'AANVRAAG ONTVANGEN',
    modalTitle: 'Uw privéaanvraag is verzonden',
    modalText:
      'Ons team heeft uw aanvraag ontvangen. Een OFF MARKET-adviseur neemt binnenkort contact met u op met een selectie die past bij uw project.',
    modalClose: 'Sluiten',
    modalHome: 'Terug naar de startpagina',
    homeHref: '/nl/',
  };

  var COPY_ES = {
    validationError:
      'Revise los campos obligatorios antes de enviar su solicitud.',
    sendError:
      'No pudimos enviar su solicitud. Su información se ha conservado. Inténtelo de nuevo en unos momentos.',
    sending: 'Enviando su solicitud…',
    sent: 'Solicitud enviada',
    tryAgain: 'Reintentar',
    modalEyebrow: 'SOLICITUD RECIBIDA',
    modalTitle: 'Su solicitud privada ha sido enviada',
    modalText:
      'Nuestro equipo ha recibido su solicitud. Un asesor OFF MARKET le contactará en breve con una selección adaptada a su proyecto.',
    modalClose: 'Cerrar',
    modalHome: 'Volver al inicio',
    homeHref: '/es/',
  };

  var COPY_NO = {
    validationError:
      'Kontroller de obligatoriske feltene før du sender forespørselen.',
    sendError:
      'Vi kunne ikke sende forespørselen. Opplysningene dine er bevart. Prøv igjen om litt.',
    sending: 'Sender forespørselen…',
    sent: 'Forespørsel sendt',
    tryAgain: 'Prøv igjen',
    modalEyebrow: 'FORESPØRSEL MOTTATT',
    modalTitle: 'Din private forespørsel er sendt',
    modalText:
      'Teamet vårt har mottatt forespørselen din. En OFF MARKET-rådgiver kontakter deg snart med et utvalg tilpasset prosjektet ditt.',
    modalClose: 'Lukk',
    modalHome: 'Tilbake til forsiden',
    homeHref: '/no/',
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
    es: {
      fullName: 'Nombre completo', fullNamePlaceholder: 'Su nombre completo',
      phoneLegend: 'Número de teléfono', countryCode: 'Indicativo del país',
      phoneNumber: 'Número', message: 'Mensaje (opcional)',
      messagePlaceholder: 'Su mensaje, proyecto o criterios específicos',
      submit: 'Solicitar acceso', privacyPrefix: 'Al hacer clic en el botón, acepta que OFF MARKET pueda contactarle sobre su solicitud.',
      privacyLink: 'Privacidad', privacyHref: '/es/politica-de-privacidad/',
    },
    no: {
      fullName: 'Fullt navn', fullNamePlaceholder: 'Ditt fulle navn',
      phoneLegend: 'Telefonnummer', countryCode: 'Landskode',
      phoneNumber: 'Nummer', message: 'Melding (valgfritt)',
      messagePlaceholder: 'Din melding, prosjektet ditt eller spesifikke kriterier',
      submit: 'Be om tilgang', privacyPrefix: 'Ved å klikke på knappen godtar du at OFF MARKET kan kontakte deg om forespørselen din.',
      privacyLink: 'Personvern', privacyHref: '/no/personvernerklaering/',
    },
  };

  function isLocalePath(path, locale) {
    return path === '/' + locale || path.indexOf('/' + locale + '/') === 0;
  }

  function detectFormLocale() {
    var path = window.location.pathname || '/';
    if (isLocalePath(path, 'en')) return 'en';
    if (isLocalePath(path, 'es')) return 'es';
    if (isLocalePath(path, 'it')) return 'it';
    if (isLocalePath(path, 'nl')) return 'nl';
    if (isLocalePath(path, 'no')) return 'no';
    var attr = document.documentElement.getAttribute('lang');
    if (attr && attr.indexOf('en') === 0) return 'en';
    if (attr && attr.indexOf('es') === 0) return 'es';
    if (attr && attr.indexOf('it') === 0) return 'it';
    if (attr && attr.indexOf('nl') === 0) return 'nl';
    if (attr && (attr.indexOf('no') === 0 || attr.indexOf('nb') === 0)) return 'no';
    return 'fr';
  }

  function resolveFormLocale(form) {
    if (form && form.getAttribute('data-form-locale') === 'en') return 'en';
    if (form && form.getAttribute('data-form-locale') === 'es') return 'es';
    if (form && form.getAttribute('data-form-locale') === 'it') return 'it';
    if (form && form.getAttribute('data-form-locale') === 'nl') return 'nl';
    if (form && form.getAttribute('data-form-locale') === 'no') return 'no';
    return detectFormLocale();
  }

  function getCopy(form) {
    var locale = resolveFormLocale(form);
    if (locale === 'en') return COPY_EN;
    if (locale === 'es') return COPY_ES;
    if (locale === 'it') return COPY_IT;
    if (locale === 'nl') return COPY_NL;
    if (locale === 'no') return COPY_NO;
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

  function readUtmParams() {
    try {
      var params = new URLSearchParams(window.location.search || '');
      return {
        utmSource: params.get('utm_source') || '',
        utmMedium: params.get('utm_medium') || '',
        utmCampaign: params.get('utm_campaign') || '',
        utmContent: params.get('utm_content') || '',
        utmTerm: params.get('utm_term') || '',
      };
    } catch (err) {
      return {
        utmSource: '',
        utmMedium: '',
        utmCampaign: '',
        utmContent: '',
        utmTerm: '',
      };
    }
  }

  function createIdempotencyKey() {
    try {
      if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return window.crypto.randomUUID();
      }
    } catch (err) {
      /* ignore */
    }
    return 'om-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
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
    var utm = readUtmParams();

    return {
      type: 'private_access',
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
      companyWebsite: honeypotField ? String(honeypotField.value || '') : '',
      contactConsent: true,
      utmSource: utm.utmSource,
      utmMedium: utm.utmMedium,
      utmCampaign: utm.utmCampaign,
      formStartedAt: data.formStartedAt || null,
      idempotencyKey: data.idempotencyKey || createIdempotencyKey(),
    };
  }

  function getSubmitButton(form) {
    return form.querySelector('.om-private-access-form__submit');
  }

  function getSubmitLabel(button) {
    if (!button) return null;
    return button.querySelector('span') || button;
  }

  function setSubmitState(form, state, copy) {
    var button = getSubmitButton(form);
    if (!button) return;

    var label = getSubmitLabel(button);
    var defaultLabel =
      button.getAttribute('data-default-label') ||
      (label ? label.textContent : '') ||
      '';

    if (!button.getAttribute('data-default-label') && defaultLabel) {
      button.setAttribute('data-default-label', defaultLabel.trim());
    }

    button.classList.remove(
      'is-loading',
      'is-success',
      'is-error',
    );

    if (state === 'loading') {
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.classList.add('is-loading');
      if (label) label.textContent = copy.sending;
      return;
    }

    if (state === 'success') {
      button.disabled = true;
      button.setAttribute('aria-busy', 'false');
      button.classList.add('is-success');
      if (label) label.textContent = copy.sent;
      return;
    }

    if (state === 'error') {
      button.disabled = false;
      button.setAttribute('aria-busy', 'false');
      button.classList.add('is-error');
      if (label) label.textContent = copy.tryAgain;
      return;
    }

    button.disabled = false;
    button.setAttribute('aria-busy', 'false');
    if (label) {
      label.textContent =
        button.getAttribute('data-default-label') || defaultLabel;
    }
  }

  function trackPrivateAccessSuccess(payload) {
    try {
      if (typeof window.gtag !== 'function') return;
      window.gtag('event', 'private_access_request_submitted', {
        locale: payload.locale || '',
        page: payload.pagePath || '',
        form_type: 'private_access',
        acquisition_objective: payload.objective || '',
        property_category: payload.propertyType || '',
      });
    } catch (err) {
      /* analytics must never break submission UX */
    }
  }

  function getFocusable(container) {
    return Array.prototype.slice.call(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(function (el) {
      return !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true';
    });
  }

  function closeSuccessModal(modal, returnFocusEl) {
    if (!modal || modal.getAttribute('data-open') !== 'true') return;
    modal.setAttribute('data-open', 'false');
    modal.setAttribute('aria-hidden', 'true');
    modal.hidden = true;
    document.documentElement.classList.remove('om-private-access-modal-open');
    document.body.classList.remove('om-private-access-modal-open');
    if (modal._omKeyHandler) {
      document.removeEventListener('keydown', modal._omKeyHandler, true);
      modal._omKeyHandler = null;
    }
    if (returnFocusEl && typeof returnFocusEl.focus === 'function') {
      window.setTimeout(function () {
        returnFocusEl.focus();
      }, 0);
    }
  }

  function ensureSuccessModal(copy) {
    var existing = document.getElementById('om-private-access-success-modal');
    if (existing) {
      existing.querySelector('[data-om-success-eyebrow]').textContent = copy.modalEyebrow;
      existing.querySelector('[data-om-success-title]').textContent = copy.modalTitle;
      existing.querySelector('[data-om-success-text]').textContent = copy.modalText;
      existing.querySelector('[data-om-success-close]').textContent = copy.modalClose;
      var homeLink = existing.querySelector('[data-om-success-home]');
      if (homeLink) {
        homeLink.textContent = copy.modalHome;
        homeLink.setAttribute('href', copy.homeHref || '/');
      }
      return existing;
    }

    var modal = document.createElement('div');
    modal.id = 'om-private-access-success-modal';
    modal.className = 'om-private-access-success';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('data-open', 'false');
    modal.hidden = true;
    modal.innerHTML =
      '<div class="om-private-access-success__overlay" data-om-success-overlay></div>' +
      '<div class="om-private-access-success__card" role="document">' +
      '<div class="om-private-access-success__icon" aria-hidden="true">' +
      '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M14 24.5 21 31.5 34 17" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</div>' +
      '<p class="om-private-access-success__eyebrow" data-om-success-eyebrow></p>' +
      '<h2 class="om-private-access-success__title" id="om-private-access-success-title" data-om-success-title></h2>' +
      '<p class="om-private-access-success__text" data-om-success-text></p>' +
      '<div class="om-private-access-success__actions">' +
      '<button type="button" class="om-private-access-success__close" data-om-success-close></button>' +
      '<a class="om-private-access-success__home" data-om-success-home href="/"></a>' +
      '</div>' +
      '</div>';

    modal.setAttribute('aria-labelledby', 'om-private-access-success-title');
    document.body.appendChild(modal);

    modal.querySelector('[data-om-success-eyebrow]').textContent = copy.modalEyebrow;
    modal.querySelector('[data-om-success-title]').textContent = copy.modalTitle;
    modal.querySelector('[data-om-success-text]').textContent = copy.modalText;
    modal.querySelector('[data-om-success-close]').textContent = copy.modalClose;
    var home = modal.querySelector('[data-om-success-home]');
    home.textContent = copy.modalHome;
    home.setAttribute('href', copy.homeHref || '/');

    return modal;
  }

  function openSuccessModal(form, copy) {
    var modal = ensureSuccessModal(copy);
    var returnFocus = getSubmitButton(form);
    var closeBtn = modal.querySelector('[data-om-success-close]');
    var overlay = modal.querySelector('[data-om-success-overlay]');

    modal._omReturnFocus = returnFocus;
    modal._omClose = function () {
      closeSuccessModal(modal, modal._omReturnFocus || null);
    };

    modal.hidden = false;
    modal.setAttribute('data-open', 'true');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('om-private-access-modal-open');
    document.body.classList.add('om-private-access-modal-open');

    if (!modal._omBound) {
      modal._omBound = true;
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          if (typeof modal._omClose === 'function') modal._omClose();
        });
      }
      if (overlay) {
        overlay.addEventListener('click', function () {
          if (typeof modal._omClose === 'function') modal._omClose();
        });
      }
      var homeLink = modal.querySelector('[data-om-success-home]');
      if (homeLink) {
        homeLink.addEventListener('click', function () {
          closeSuccessModal(modal, null);
        });
      }
    }

    if (modal._omKeyHandler) {
      document.removeEventListener('keydown', modal._omKeyHandler, true);
    }

    modal._omKeyHandler = function (event) {
      if (modal.getAttribute('data-open') !== 'true') return;
      if (event.key === 'Escape') {
        event.preventDefault();
        if (typeof modal._omClose === 'function') modal._omClose();
        return;
      }
      if (event.key !== 'Tab') return;
      var focusable = getFocusable(modal);
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', modal._omKeyHandler, true);

    window.setTimeout(function () {
      if (closeBtn) closeBtn.focus();
    }, 0);
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
    form._omFormStartedAt = Date.now();
    form._omSubmitting = false;

    localizeLegacyForm(form);
    populateSelects(form);

    var submitBtn = getSubmitButton(form);
    if (submitBtn) {
      var labelEl = getSubmitLabel(submitBtn);
      if (labelEl && !submitBtn.getAttribute('data-default-label')) {
        submitBtn.setAttribute(
          'data-default-label',
          String(labelEl.textContent || '').trim(),
        );
      }
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (form._omSubmitting) return;

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
        setStatus(statusEl, copy.validationError, true);
        return;
      }
      if (!email || !isValidEmail(email)) {
        markInvalid(emailField);
        setStatus(statusEl, copy.validationError, true);
        return;
      }
      if (!dialCode) {
        markInvalid(countrySelect);
        setStatus(statusEl, copy.validationError, true);
        return;
      }
      if (!phone || phone.replace(/\D/g, '').length < 6) {
        markInvalid(phoneField);
        setStatus(statusEl, copy.validationError, true);
        return;
      }

      var apiPayload = buildLeadPayload(
        {
          name: name,
          email: email,
          dialCode: dialCode,
          phone: phone,
          message: note,
          intent: intent,
          formStartedAt: form._omFormStartedAt || Date.now(),
          idempotencyKey: createIdempotencyKey(),
        },
        form,
      );

      form._omSubmitting = true;
      setSubmitState(form, 'loading', copy);
      setStatus(statusEl, copy.sending, false);

      fetch('/api/leads/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(apiPayload),
      })
        .then(function (response) {
          return response
            .json()
            .catch(function () {
              return { ok: false };
            })
            .then(function (json) {
              return { response: response, json: json };
            });
        })
        .then(function (result) {
          var json = result.json || {};
          var ok =
            result.response &&
            result.response.ok &&
            json.ok === true &&
            json.success !== false;

          if (!ok) {
            var code =
              json.code ||
              json.error ||
              (result.response ? 'HTTP_' + result.response.status : 'EMPTY_RESPONSE');
            if (
              window.location.hostname === 'localhost' ||
              window.location.hostname === '127.0.0.1'
            ) {
              console.error('[OFF MARKET] lead submit failed', {
                code: code,
                status: result.response ? result.response.status : null,
              });
            }
            var err = new Error('submit_failed');
            err.code = code;
            throw err;
          }

          setSubmitState(form, 'success', copy);
          setStatus(statusEl, '', false);
          trackPrivateAccessSuccess(apiPayload);
          openSuccessModal(form, copy);

          form.reset();
          populateSelects(form);
          form._omFormStartedAt = Date.now();
          form._omSubmitting = false;

          window.setTimeout(function () {
            setSubmitState(form, 'default', copy);
          }, 1200);
        })
        .catch(function (err) {
          form._omSubmitting = false;
          setSubmitState(form, 'error', copy);
          setStatus(statusEl, copy.sendError, true);
          if (
            (window.location.hostname === 'localhost' ||
              window.location.hostname === '127.0.0.1') &&
            err &&
            err.code
          ) {
            console.error('[OFF MARKET] lead submit error code', err.code);
          }
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
    if (isLocalePath(path, 'en')) return '/en/off-market/';
    if (isLocalePath(path, 'es')) return '/es/off-market/';
    if (isLocalePath(path, 'it')) return '/it/off-market/';
    if (isLocalePath(path, 'nl')) return '/nl/off-market/';
    if (isLocalePath(path, 'no')) return '/no/off-market/';
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
