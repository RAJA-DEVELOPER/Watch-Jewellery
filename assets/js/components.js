/**
 * MAISON LUMIÈRE — Components JavaScript
 * FAQ, Lightbox, Image Zoom, Forms, Modals, Countdown
 */

'use strict';

/* ══════════════════════════════════════════════════════════
   FAQ ACCORDION
   ══════════════════════════════════════════════════════════ */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others (if single-open mode)
      if (!item.closest('[data-faq-multi]')) {
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const ans = other.querySelector('.faq-answer');
            if (ans) ans.style.maxHeight = '';
            other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', !isOpen);

      const answer = item.querySelector('.faq-answer');
      if (answer) {
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = '';
        }
      }
    });

    // ARIA
    question.setAttribute('aria-expanded', 'false');
    const answer = item.querySelector('.faq-answer');
    if (answer) {
      answer.setAttribute('role', 'region');
      const id = 'faq-answer-' + Math.random().toString(36).slice(2, 7);
      answer.id = id;
      question.setAttribute('aria-controls', id);
    }
  });
}

/* ══════════════════════════════════════════════════════════
   LIGHTBOX
   ══════════════════════════════════════════════════════════ */
function initLightbox() {
  let lightbox = document.querySelector('.lightbox');

  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image viewer');
    lightbox.innerHTML = `
      <button class="lightbox__close" aria-label="Close lightbox">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <img class="lightbox__img" src="" alt="">
    `;
    document.body.appendChild(lightbox);
  }

  const img   = lightbox.querySelector('.lightbox__img');
  const close = lightbox.querySelector('.lightbox__close');

  function openLightbox(src, alt = '') {
    img.src = src;
    img.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    close.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  close.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

  // Trigger on elements with data-lightbox
  document.querySelectorAll('[data-lightbox]').forEach(trigger => {
    trigger.style.cursor = 'zoom-in';
    trigger.addEventListener('click', () => {
      const src = trigger.dataset.lightbox || trigger.src || trigger.querySelector('img')?.src;
      const alt = trigger.dataset.lightboxAlt || trigger.alt || '';
      if (src) openLightbox(src, alt);
    });
  });

  window.openLightbox = openLightbox;
}

/* ══════════════════════════════════════════════════════════
   MODALS
   ══════════════════════════════════════════════════════════ */
function initModals() {
  // Open
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const id = trigger.dataset.modalOpen;
      const overlay = document.querySelector(`[data-modal="${id}"]`);
      if (!overlay) return;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      overlay.querySelector('.modal__close')?.focus();
    });
  });

  // Close
  document.querySelectorAll('[data-modal]').forEach(overlay => {
    const closeBtn = overlay.querySelector('.modal__close');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-modal].open').forEach(overlay => {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });
}

/* ══════════════════════════════════════════════════════════
   FORM VALIDATION
   ══════════════════════════════════════════════════════════ */
function initForms() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error');
        const ctrl = group.querySelector('.form-control');
        if (ctrl) ctrl.classList.remove('error');
      });

      // Validate fields
      form.querySelectorAll('.form-control[required]').forEach(field => {
        const value = field.value.trim();
        const group = field.closest('.form-group');

        if (!value) {
          valid = false;
          field.classList.add('error');
          if (group) group.classList.add('has-error');
        }

        // Email validation
        if (field.type === 'email' && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            valid = false;
            field.classList.add('error');
            if (group) group.classList.add('has-error');
          }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
          const telRegex = /^[\d\s\+\-\(\)]{7,}$/;
          if (!telRegex.test(value)) {
            valid = false;
            field.classList.add('error');
            if (group) group.classList.add('has-error');
          }
        }
      });

      if (valid) {
        // Show success
        const msg = form.querySelector('.form-message');
        if (msg) {
          msg.classList.add('success');
          msg.textContent = '✓ Your message has been sent. We will be in touch shortly.';
          msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sent!';
          submitBtn.disabled = true;
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
            if (msg) msg.classList.remove('success');
          }, 4000);
        }

        if (window.ML?.showToast) {
          window.ML.showToast('Message sent successfully!', 'success');
        }
      } else {
        // Focus first error
        const firstError = form.querySelector('.form-control.error');
        if (firstError) firstError.focus();
      }
    });

    // Live validation on blur
    form.querySelectorAll('.form-control[required]').forEach(field => {
      field.addEventListener('blur', () => {
        const group = field.closest('.form-group');
        if (field.value.trim()) {
          field.classList.remove('error');
          if (group) group.classList.remove('has-error');
        }
      });
    });
  });
}

/* ══════════════════════════════════════════════════════════
   NEWSLETTER FORM
   ══════════════════════════════════════════════════════════ */
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value.trim()) return;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        input.classList.add('error');
        input.focus();
        return;
      }

      input.classList.remove('error');
      const btn = form.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>Subscribed!</span>';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.disabled = false;
          input.value = '';
        }, 3000);
      }

      if (window.ML?.showToast) {
        window.ML.showToast('Welcome to the Maison! Check your inbox.', 'success');
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════
   MAINTENANCE COUNTDOWN
   ══════════════════════════════════════════════════════════ */
function initCountdown() {
  const countdown = document.querySelector('[data-countdown]');
  if (!countdown) return;

  const targetDateStr = countdown.dataset.countdown;
  const targetDate    = targetDateStr ? new Date(targetDateStr) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const daysEl   = document.querySelector('[data-cd-days]');
  const hoursEl  = document.querySelector('[data-cd-hours]');
  const minsEl   = document.querySelector('[data-cd-minutes]');
  const secsEl   = document.querySelector('[data-cd-seconds]');

  function update() {
    const now  = Date.now();
    const diff = Math.max(0, targetDate - now);

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl)  daysEl.textContent  = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl)  minsEl.textContent  = String(minutes).padStart(2, '0');
    if (secsEl)  secsEl.textContent  = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ══════════════════════════════════════════════════════════
   TABS
   ══════════════════════════════════════════════════════════ */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const tabs    = [...tabGroup.querySelectorAll('[data-tab]')];
    const panels  = [...tabGroup.querySelectorAll('[data-tab-panel]')];

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => {
          t.classList.toggle('active', t === tab);
          t.setAttribute('aria-selected', t === tab);
        });

        panels.forEach(p => {
          const match = p.dataset.tabPanel === target;
          p.classList.toggle('active', match);
          p.hidden = !match;
        });
      });
    });
  });
}

/* ══════════════════════════════════════════════════════════
   FILTER / SORT (Blog, Products)
   ══════════════════════════════════════════════════════════ */
function initFilters() {
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const btns  = [...group.querySelectorAll('[data-filter]')];
    const items = [...document.querySelectorAll('[data-filter-item]')];

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        items.forEach(item => {
          const cats = item.dataset.filterItem?.split(' ') || [];
          const show = filter === 'all' || cats.includes(filter);
          item.style.display = show ? '' : 'none';

          if (show) {
            item.style.animation = 'fadeUp 0.4s var(--ease-luxury) both';
          }
        });
      });
    });
  });
}

/* ══════════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initLightbox();
  initModals();
  initForms();
  initNewsletter();
  initCountdown();
  initTabs();
  initFilters();
});
