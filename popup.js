(function () {
  var STORAGE_KEY = 'tmm_popup_seen';
  if (sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY)) return;

  // Inject popup HTML
  var el = document.createElement('div');
  el.innerHTML =
    '<div class="popup-overlay" id="exitPopup" role="dialog" aria-modal="true" aria-label="Special offer">' +
      '<div class="popup">' +
        '<button class="popup__close" id="popupClose" aria-label="Close">&times;</button>' +
        '<p class="popup__eyebrow">Before You Go</p>' +
        '<h2 class="popup__headline">You found us.<br />That\'s not an accident.</h2>' +
        '<p class="popup__body">Get 10% off lifetime access to The Magick Manuscript, 15 cross-linked grimoires sourced from published books and built for practitioners who take their craft seriously.</p>' +
        '<div class="popup__code">SEEKER10</div>' +
        '<br />' +
        '<a href="https://themagickmuse.gumroad.com/l/lifetimemanuscript" class="btn btn--primary" target="_blank" rel="noopener" id="popupCta">Claim My Discount</a>' +
        '<p class="popup__fine">Applied at checkout on Gumroad. Lifetime access only.</p>' +
      '</div>' +
    '</div>';
  document.body.appendChild(el.firstElementChild);

  var overlay    = document.getElementById('exitPopup');
  var closeBtn   = document.getElementById('popupClose');
  var lastFocused = null;

  function showPopup() {
    lastFocused = document.activeElement;
    overlay.classList.add('popup--visible');
    localStorage.setItem(STORAGE_KEY, '1');
    closeBtn.focus();
  }

  function closePopup() {
    overlay.classList.remove('popup--visible');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.getElementById('popupCta').addEventListener('click', closePopup);
  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closePopup(); });
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('popup--visible')) return;
    if (e.key === 'Escape') { closePopup(); return; }
    if (e.key === 'Tab') {
      var focusable = overlay.querySelectorAll('button, a[href]');
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  var triggered = false;
  document.addEventListener('mouseleave', function (e) {
    if (!triggered && e.clientY < 10) { triggered = true; showPopup(); }
  });
  setTimeout(function () { if (!triggered) { triggered = true; showPopup(); } }, 90000);
})();
