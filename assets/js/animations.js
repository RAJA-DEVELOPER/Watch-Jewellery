/**
 * MAISON LUMIÈRE — Animations JavaScript
 * Scroll Reveal (IntersectionObserver), Parallax, Counter, Split Text
 */

'use strict';

/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL
   ══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}

/* ══════════════════════════════════════════════════════════
   SPLIT TEXT (word-by-word reveal)
   ══════════════════════════════════════════════════════════ */
function initSplitText() {
  document.querySelectorAll('[data-split-text]').forEach(el => {
    const text = el.textContent.trim();
    const words = text.split(' ');

    el.innerHTML = words.map(word =>
      `<span class="word"><span>${word}</span></span>`
    ).join(' ');

    el.classList.add('split-text');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(el);
  });
}

/* ══════════════════════════════════════════════════════════
   NUMBER COUNTER ANIMATION
   ══════════════════════════════════════════════════════════ */
function animateCounter(el, from, to, duration, suffix = '') {
  const start  = performance.now();
  const update = (ts) => {
    const elapsed  = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const value    = Math.round(from + (to - from) * eased);
    el.textContent = value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const dur    = parseInt(el.dataset.duration) || 2000;
        animateCounter(el, 0, target, dur, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════
   PARALLAX
   ══════════════════════════════════════════════════════════ */
function initParallax() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const layers = document.querySelectorAll('[data-parallax]');
  if (!layers.length) return;

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    layers.forEach(layer => {
      const speed   = parseFloat(layer.dataset.parallax) || 0.3;
      const rect    = layer.parentElement.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const offset  = (window.innerHeight / 2 - centerY) * speed;
      layer.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

/* ══════════════════════════════════════════════════════════
   TILT CARDS (subtle 3D on hover)
   ══════════════════════════════════════════════════════════ */
function initTiltCards() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotX   = ((y - cy) / cy) * -8;
      const rotY   = ((x - cx) / cx) *  8;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ══════════════════════════════════════════════════════════
   LAZY LOAD IMAGES (additional)
   ══════════════════════════════════════════════════════════ */
function initLazyImages() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('img-loaded');
        }
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}

/* ══════════════════════════════════════════════════════════
   SECTION PROGRESS INDICATOR
   ══════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const max      = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / max) * 100;
    bar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSplitText();
  initCounters();
  initParallax();
  initTiltCards();
  initLazyImages();
  initScrollProgress();
});
