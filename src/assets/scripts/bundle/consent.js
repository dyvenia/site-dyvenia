let focusTrapListener = null;
let lastFocusedElement = null;
let pending = Object.create(null);

function focusBanner() {
  const banner = document.getElementById('consent-banner');
  if (!banner) return;

  lastFocusedElement = document.activeElement;
  setTimeout(() => {
    const firstButton = banner.querySelector('button');
    if (firstButton) {
      firstButton.focus();
      banner.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }
  }, 10);
}

function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  focusTrapListener = function (event) {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
    if (event.key === 'Escape') {
      handleDeclineAll();
    }
  };

  document.addEventListener('keydown', focusTrapListener);
}

function removeFocusTrap() {
  if (focusTrapListener) {
    document.removeEventListener('keydown', focusTrapListener);
    focusTrapListener = null;
  }
  if (lastFocusedElement && lastFocusedElement.focus) {
    lastFocusedElement.focus();
  }
}

function setServiceCookie(service, accepted) {
  const expires = new Date();
  expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie = 'service-' + service + '=' + accepted + ';expires=' + expires.toGMTString() + ';path=/';
}

function getServiceCookie(service) {
  const prefix = 'service-' + service + '=';
  const cookies = decodeURIComponent(document.cookie).split(';');

  for (const rawCookie of cookies) {
    const cookie = rawCookie.trim();
    if (cookie.startsWith(prefix)) {
      return cookie.slice(prefix.length);
    }
  }
  return '';
}

function getAllServices() {
  const acceptButtons = document.querySelectorAll('[data-service-accept]');
  return Array.from(acceptButtons).map(button => button.dataset.serviceAccept);
}

function getEffectiveChoice(service) {
  if (Object.hasOwn(pending, service)) return pending[service];
  return getServiceCookie(service);
}

function clearPending() {
  pending = Object.create(null);
}

function marketingIsAccepted(value) {
  return value === 'true';
}

function marketingConsentChanged(previous, next) {
  return marketingIsAccepted(previous) !== marketingIsAccepted(next);
}

function pushConsentUpdate() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'consent_update',
    marketing: marketingIsAccepted(getServiceCookie('marketing')),
    functional: marketingIsAccepted(getServiceCookie('functional'))
  });
}

function loadGtmIfEligible() {
  const gtmId = '{{ meta.gtm_id }}';
  if (!gtmId) return;
  if (getServiceCookie('marketing') !== 'true') return;
  if (document.querySelector('script[data-gtm]')) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'consent_update',
    marketing: true,
    functional: marketingIsAccepted(getServiceCookie('functional'))
  });
  window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});

  const script = document.createElement('script');
  script.async = true;
  script.dataset.gtm = '';
  script.src = 'https://www.googletagmanager.com/gtm.js?id=' + gtmId;
  document.head.appendChild(script);
}

function getPreferencesPanel() {
  return document.getElementById('consent-preferences');
}

function getManageButton() {
  return document.querySelector('[data-consent-manage]');
}

function setPreferencesOpen(open) {
  const panel = getPreferencesPanel();
  const manage = getManageButton();
  if (panel) panel.hidden = !open;
  if (manage) manage.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function paintServiceButtons() {
  const services = getAllServices();

  for (const service of services) {
    const acceptButton = document.querySelector(`[data-service-accept="${service}"]`);
    const declineButton = document.querySelector(`[data-service-decline="${service}"]`);
    const value = getEffectiveChoice(service);

    if (acceptButton) {
      acceptButton.removeAttribute('data-consent-state');
      acceptButton.setAttribute('aria-pressed', value === 'true' ? 'true' : 'false');
    }
    if (declineButton) {
      declineButton.removeAttribute('data-consent-state');
      declineButton.setAttribute('aria-pressed', value === 'false' ? 'true' : 'false');
    }

    if (value === 'true' && acceptButton) {
      acceptButton.setAttribute('data-consent-state', 'accepted');
    } else if (value === 'false' && declineButton) {
      declineButton.setAttribute('data-consent-state', 'declined');
    }
  }
}

function finishDecision(previousMarketing) {
  const nextMarketing = getServiceCookie('marketing');
  hideBanner();
  pushConsentUpdate();

  // ponytail: reload only for marketing (GTM load/unload); functional is dataLayer-only today
  if (!marketingConsentChanged(previousMarketing, nextMarketing)) return;
  location.reload();
}

function showBanner({openPreferences = false} = {}) {
  const banner = document.getElementById('consent-banner');
  if (!banner) return;
  clearPending();
  banner.hidden = false;
  setPreferencesOpen(openPreferences);
  paintServiceButtons();
  focusBanner();
  trapFocus(banner);
}

function hideBanner() {
  const banner = document.getElementById('consent-banner');
  if (!banner) return;
  banner.hidden = true;
  setPreferencesOpen(false);
  clearPending();
  removeFocusTrap();
  document.body.focus();
}

function handleAcceptAll() {
  const previousMarketing = getServiceCookie('marketing');
  const services = getAllServices();
  services.forEach(service => setServiceCookie(service, 'true'));
  clearPending();
  paintServiceButtons();
  finishDecision(previousMarketing);
}

function handleDeclineAll() {
  const previousMarketing = getServiceCookie('marketing');
  const services = getAllServices();
  services.forEach(service => setServiceCookie(service, 'false'));
  clearPending();
  paintServiceButtons();
  finishDecision(previousMarketing);
}

function handleManagePreferences() {
  const panel = getPreferencesPanel();
  if (!panel) return;
  setPreferencesOpen(panel.hidden);
}

function handleServiceAccept(service) {
  pending[service] = 'true';
  paintServiceButtons();
}

function handleServiceDecline(service) {
  pending[service] = 'false';
  paintServiceButtons();
}

function handleSavePreferences() {
  const services = getAllServices();
  const allDecided = services.every(name => getEffectiveChoice(name) !== '');
  // Stay open until every optional category has Accept or Decline
  if (!allDecided) return;

  const previousMarketing = getServiceCookie('marketing');
  services.forEach(name => setServiceCookie(name, getEffectiveChoice(name)));
  clearPending();
  finishDecision(previousMarketing);
}

function checkConsent() {
  const services = getAllServices();
  if (services.length === 0) return;

  const allDecided = services.every(service => getServiceCookie(service) !== '');
  if (!allDecided) {
    showBanner({openPreferences: false});
  }
}

document.addEventListener('click', event => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const acceptAll = target.closest('[data-consent-accept]');
  const declineAll = target.closest('[data-consent-decline]');
  const manage = target.closest('[data-consent-manage]');
  const save = target.closest('[data-consent-save]');
  const serviceAccept = target.closest('[data-service-accept]');
  const serviceDecline = target.closest('[data-service-decline]');
  const reopen = target.closest('[data-consent-banner]');

  if (acceptAll) {
    handleAcceptAll();
  } else if (declineAll) {
    handleDeclineAll();
  } else if (manage) {
    handleManagePreferences();
  } else if (save) {
    handleSavePreferences();
  } else if (serviceAccept) {
    handleServiceAccept(serviceAccept.dataset.serviceAccept);
  } else if (serviceDecline) {
    handleServiceDecline(serviceDecline.dataset.serviceDecline);
  } else if (reopen) {
    showBanner({openPreferences: true});
  }
});

function initConsent() {
  loadGtmIfEligible();
  checkConsent();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initConsent);
} else {
  initConsent();
}
