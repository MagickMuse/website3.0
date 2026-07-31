(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  });

  var navToggle = document.querySelector('.nav__toggle');
  var navLinks  = document.querySelector('.nav__links');
  var navCta    = document.querySelector('.nav > .btn');
  var ctaAnchor = document.createComment('nav-cta-anchor');
  if (navCta) navCta.parentNode.insertBefore(ctaAnchor, navCta);

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var opening = !navLinks.classList.contains('nav__links--open');
      navLinks.classList.toggle('nav__links--open');
      if (!navCta) return;
      if (opening) {
        var li = document.createElement('li');
        li.className = 'nav__cta-mobile';
        li.appendChild(navCta);
        navLinks.appendChild(li);
      } else {
        ctaAnchor.parentNode.insertBefore(navCta, ctaAnchor);
        var li = navLinks.querySelector('.nav__cta-mobile');
        if (li) li.remove();
      }
    });
  }
})();
