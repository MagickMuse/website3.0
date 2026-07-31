(function () {
  var slides = document.querySelectorAll('.testimonial');
  var sliderEl = document.getElementById('testimonialsSlider');
  if (!slides.length) return;

  var currentSlide = 0;
  function showSlide(n) {
    slides[currentSlide].classList.add('testimonial--hidden');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.remove('testimonial--hidden');
  }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var autoplayTimer = null;
  function startAutoplay() {
    if (reducedMotion || slides.length < 2) return;
    autoplayTimer = setInterval(function () { showSlide(currentSlide + 1); }, 7000);
  }
  function stopAutoplay() {
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  }
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  var prevBtn = document.getElementById('prevTest');
  var nextBtn = document.getElementById('nextTest');
  if (prevBtn) prevBtn.addEventListener('click', function () { showSlide(currentSlide - 1); restartAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { showSlide(currentSlide + 1); restartAutoplay(); });
  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', stopAutoplay);
    sliderEl.addEventListener('mouseleave', startAutoplay);
  }
  startAutoplay();
})();
