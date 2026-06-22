(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── SCROLL REVEAL ──
  var sections = document.querySelectorAll(
    '.statement, .features, .grimoire, .testimonials, .numbers, ' +
    '.cta-band, .peek, .faq, .from-grimoire, .steps, .pillar-section, ' +
    '.blog-content, .contact, .story-body'
  );

  if (!reduced && sections.length) {
    sections.forEach(function (el) { el.classList.add('reveal'); });
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('reveal--visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    sections.forEach(function (el) { revealObs.observe(el); });
  }

  // ── COUNTING NUMBERS ──
  var numberEls = document.querySelectorAll('.numbers__big');
  if (numberEls.length && !reduced) {
    var numDone = false;
    var numObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !numDone) {
          numDone = true;
          countUp();
          numObs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    numberEls.forEach(function (el) { numObs.observe(el); });
  }

  function countUp() {
    numberEls.forEach(function (el) {
      var raw = el.textContent.trim();
      var m = raw.match(/^([\d,]+)(.*)$/);
      if (!m) return;
      var target = parseInt(m[1].replace(/,/g, ''), 10);
      var suffix = m[2];
      var useComma = m[1].indexOf(',') !== -1;
      var dur = 1600;

      // Reserve the final rendered width so counting can't shift the layout
      el.style.display = 'inline-block';
      el.style.textAlign = 'center';
      el.style.minWidth = el.offsetWidth + 'px';

      var t0 = performance.now();

      function step(now) {
        var p = Math.min((now - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        var val = Math.round(target * ease);
        el.textContent = (useComma ? val.toLocaleString() : val) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // ── STAR PARTICLES ──
  if (!reduced) {
    var darkZones = document.querySelectorAll('.statement, .cta-band, .faq');
    darkZones.forEach(function (zone) {
      var cs = getComputedStyle(zone);
      if (cs.position === 'static') zone.style.position = 'relative';
      zone.style.overflow = 'hidden';
      for (var i = 0; i < 30; i++) {
        var s = document.createElement('span');
        s.className = 'star-particle';
        var size = 1 + Math.random() * 2;
        s.style.width = size + 'px';
        s.style.height = size + 'px';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.setProperty('--star-speed', (2 + Math.random() * 4) + 's');
        s.style.animationDelay = (Math.random() * 5) + 's';
        zone.appendChild(s);
      }
    });
  }

  // ── HEADING SPARKLE STARS ──
  if (!reduced) {
    var headings = document.querySelectorAll(
      '.section-title, .hero__headline, .page-hero__title, .statement__headline'
    );
    var starGlyphs = ['✦', '✧'];
    var shimObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          sprinkle(e.target);
          shimObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    headings.forEach(function (el) {
      if (getComputedStyle(el).position === 'static') el.classList.add('shimmer');
      shimObs.observe(el);
    });

    function sprinkle(el) {
      var count = 5 + Math.floor(Math.random() * 2); // 5-6 stars
      for (var i = 0; i < count; i++) {
        var star = document.createElement('span');
        star.className = 'heading-star';
        star.textContent = starGlyphs[Math.floor(Math.random() * starGlyphs.length)];
        // Frame the heading: bias stars toward the top/bottom edges, not over the text
        var x = 5 + Math.random() * 90;
        var nearTop = Math.random() < 0.5;
        var y = nearTop ? (-12 + Math.random() * 28) : (84 + Math.random() * 28);
        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.fontSize = (0.5 + Math.random() * 0.7) + 'rem';
        star.style.animationDelay = (Math.random() * 0.6) + 's';
        el.appendChild(star);
        (function (node) {
          setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 2600);
        })(star);
      }
    }
  }
})();
