(function () {
  var CONSENT_KEY = 'tmm_cookie_consent';
  var stored = localStorage.getItem(CONSENT_KEY);

  if (stored === 'granted') {
    grantConsent();
    return;
  }

  if (stored === 'denied') {
    return;
  }

  // No choice yet — show banner
  var style = document.createElement('style');
  style.textContent = [
    '#tmm-consent{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#1a1020;color:#e8dff0;',
    'padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between;',
    'gap:1rem;flex-wrap:wrap;font-family:inherit;font-size:0.875rem;border-top:1px solid #4a3060;',
    'box-shadow:0 -2px 12px rgba(0,0,0,0.4);}',
    '#tmm-consent p{margin:0;flex:1;min-width:200px;}',
    '#tmm-consent a{color:#c9a7e8;text-decoration:underline;}',
    '#tmm-consent .cc-btns{display:flex;gap:0.5rem;flex-shrink:0;}',
    '#tmm-consent button{padding:0.45rem 1rem;border:none;border-radius:4px;cursor:pointer;font-size:0.85rem;font-family:inherit;}',
    '#tmm-accept{background:#7c3aed;color:#fff;}',
    '#tmm-decline{background:transparent;color:#c9a7e8;border:1px solid #4a3060 !important;}'
  ].join('');
  document.head.appendChild(style);

  var banner = document.createElement('div');
  banner.id = 'tmm-consent';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = '<p>We use cookies to understand how visitors use this site (Google Analytics). ' +
    'No personal data is sold. <a href="/privacy-policy.html">Privacy Policy</a></p>' +
    '<div class="cc-btns">' +
    '<button id="tmm-decline">Decline</button>' +
    '<button id="tmm-accept">Accept</button>' +
    '</div>';
  document.body.appendChild(banner);

  document.getElementById('tmm-accept').addEventListener('click', function () {
    localStorage.setItem(CONSENT_KEY, 'granted');
    grantConsent();
    banner.remove();
  });

  document.getElementById('tmm-decline').addEventListener('click', function () {
    localStorage.setItem(CONSENT_KEY, 'denied');
    banner.remove();
  });

  function grantConsent() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied' });
    }
  }
})();
