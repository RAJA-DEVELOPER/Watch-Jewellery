/**
 * MAISON LUMIÈRE — Slider JavaScript
 * Hero Slider with autoplay, touch/swipe, keyboard support
 */

'use strict';

class HeroSlider {
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.track     = this.container.querySelector('.hero-slider__track');
    this.slides    = [...this.container.querySelectorAll('.hero-slide')];
    this.dots      = [...this.container.querySelectorAll('.hero-slider__dot')];
    this.prevBtn   = this.container.querySelector('.hero-slider__arrow--prev');
    this.nextBtn   = this.container.querySelector('.hero-slider__arrow--next');

    this.current   = 0;
    this.total     = this.slides.length;
    this.isAnimating = false;

    this.options = {
      autoplay:  options.autoplay !== false,
      interval:  options.interval  || 5500,
      pauseOnHover: options.pauseOnHover !== false,
    };

    this.autoplayTimer = null;
    this.touchStartX   = 0;
    this.touchEndX     = 0;

    this.init();
  }

  init() {
    if (this.total < 2) {
      if (this.slides[0]) this.slides[0].classList.add('active');
      return;
    }

    this.goTo(0, false);
    this.bindEvents();
    if (this.options.autoplay) this.startAutoplay();
  }

  goTo(index, animate = true) {
    if (this.isAnimating && animate) return;
    this.isAnimating = animate;

    // Clamp
    index = ((index % this.total) + this.total) % this.total;

    // Remove active from current
    if (this.slides[this.current]) {
      this.slides[this.current].classList.remove('active');
    }
    if (this.dots[this.current]) {
      this.dots[this.current].classList.remove('active');
    }

    this.current = index;

    // Translate track
    if (this.track) {
      this.track.style.transform = `translateX(${-index * 100}%)`;
    }

    // Add active to new slide
    if (this.slides[this.current]) {
      this.slides[this.current].classList.add('active');
    }
    if (this.dots[this.current]) {
      this.dots[this.current].classList.add('active');
    }

    if (animate) {
      setTimeout(() => { this.isAnimating = false; }, 1100);
    } else {
      this.isAnimating = false;
    }
  }

  next() { this.goTo(this.current + 1); }
  prev() { this.goTo(this.current - 1); }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => this.next(), this.options.interval);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  bindEvents() {
    // Arrows
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => {
      this.prev();
      if (this.options.autoplay) this.startAutoplay();
    });

    if (this.nextBtn) this.nextBtn.addEventListener('click', () => {
      this.next();
      if (this.options.autoplay) this.startAutoplay();
    });

    // Dots
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        this.goTo(i);
        if (this.options.autoplay) this.startAutoplay();
      });
    });

    // Touch / Swipe
    this.container.addEventListener('touchstart', e => {
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });

    this.container.addEventListener('touchend', e => {
      this.touchEndX = e.changedTouches[0].clientX;
      const diff = this.touchStartX - this.touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.next();
        else this.prev();
        if (this.options.autoplay) this.startAutoplay();
      }
    }, { passive: true });

    // Keyboard
    this.container.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { this.prev(); if (this.options.autoplay) this.startAutoplay(); }
      if (e.key === 'ArrowRight') { this.next(); if (this.options.autoplay) this.startAutoplay(); }
    });

    // Pause on hover
    if (this.options.pauseOnHover) {
      this.container.addEventListener('mouseenter', () => this.stopAutoplay());
      this.container.addEventListener('mouseleave', () => {
        if (this.options.autoplay) this.startAutoplay();
      });
    }

    // Visibility API
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stopAutoplay();
      else if (this.options.autoplay) this.startAutoplay();
    });
  }
}

/* ══════════════════════════════════════════════════════════
   TESTIMONIAL SLIDER
   ══════════════════════════════════════════════════════════ */
class TestimonialSlider {
  constructor(selector) {
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.track   = this.container.querySelector('.testimonial-slider__track');
    this.slides  = [...this.container.querySelectorAll('.testimonial-slider__slide')];
    this.prevBtn = this.container.querySelector('[data-tslider-prev]');
    this.nextBtn = this.container.querySelector('[data-tslider-next]');
    this.dotsContainer = this.container.querySelector('[data-tslider-dots]');

    this.current = 0;
    this.total   = this.slides.length;
    this.touchStartX = 0;

    this.init();
  }

  init() {
    if (this.total < 2) return;
    this.buildDots();
    this.updateDots();
    this.bindEvents();
  }

  buildDots() {
    if (!this.dotsContainer) return;
    this.slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'tslider-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer.appendChild(dot);
    });
    this.dotEls = [...this.dotsContainer.querySelectorAll('.tslider-dot')];
  }

  updateDots() {
    if (!this.dotEls) return;
    this.dotEls.forEach((d, i) => d.classList.toggle('active', i === this.current));
  }

  goTo(index) {
    index = ((index % this.total) + this.total) % this.total;
    this.current = index;
    if (this.track) {
      this.track.style.transform = `translateX(${-index * 100}%)`;
    }
    this.updateDots();
  }

  next() { this.goTo(this.current + 1); }
  prev() { this.goTo(this.current - 1); }

  bindEvents() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    // Swipe
    this.container.addEventListener('touchstart', e => {
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });
    this.container.addEventListener('touchend', e => {
      const diff = this.touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    }, { passive: true });
  }
}

/* ══════════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  window.heroSlider = new HeroSlider('.hero-slider', { interval: 5500 });
  window.testimonialSlider = new TestimonialSlider('.testimonial-slider');
});
