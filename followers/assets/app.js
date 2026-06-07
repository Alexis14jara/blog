/* ============================================
   app.js — Interactive enhancements
   AlnexStudio & NovinhoDev Terms Page
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll progress bar ───────────────────── */
  const progressBar = document.getElementById('progressBar');

  function updateProgress() {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
  }

  /* ── Back-to-top button ────────────────────── */
  const backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Intersection Observer for fade-in ──────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach((el, i) => {
    // staggered delay based on index
    el.style.transitionDelay = (i * 0.05) + 's';
    observer.observe(el);
  });

  /* ── Smooth scroll for TOC links ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 24;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Unified scroll handler ──────────────────── */
  window.addEventListener('scroll', () => {
    updateProgress();
    updateBackToTop();
  }, { passive: true });

  // Initial call
  updateProgress();
  updateBackToTop();

});
