/**
 * MAISON LUMIÈRE — Main JavaScript
 * Global: Theme, RTL, Navbar, Back-to-top, Page Loader, Custom Cursor
 */

'use strict';

/* ══════════════════════════════════════════════════════════
   PAGE LOADER
   ══════════════════════════════════════════════════════════ */
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 600);
  });

  document.body.style.overflow = 'hidden';
}

/* ══════════════════════════════════════════════════════════
   THEME (Light / Dark)
   ══════════════════════════════════════════════════════════ */
const ThemeManager = {
  KEY: 'ml-theme',
  current: 'dark',

  init() {
    const stored = localStorage.getItem(this.KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.current = stored || (prefersDark ? 'dark' : 'light');
    this.apply(this.current, false);
    this.bindToggle();
  },

  apply(theme, animate = true) {
    this.current = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.KEY, theme);

    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const icon = btn.querySelector('.theme-icon');
      if (icon) {
        icon.innerHTML = theme === 'dark'
          ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      }
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', theme === 'dark' ? 'Light Mode' : 'Dark Mode');
    });
  },

  toggle() {
    this.apply(this.current === 'dark' ? 'light' : 'dark');
  },

  bindToggle() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  }
};

/* ══════════════════════════════════════════════════════════
   RTL / LTR
   ══════════════════════════════════════════════════════════ */
const RTLManager = {
  KEY: 'ml-dir',
  current: 'ltr',

  init() {
    const stored = localStorage.getItem(this.KEY) || 'ltr';
    this.apply(stored, false);
    this.bindToggle();
  },

  apply(dir, save = true) {
    this.current = dir;
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
    if (save) localStorage.setItem(this.KEY, dir);

    document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    });
  },

  toggle() {
    this.apply(this.current === 'rtl' ? 'ltr' : 'rtl');
  },

  bindToggle() {
    document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  }
};

/* ══════════════════════════════════════════════════════════
   STICKY NAVBAR
   ══════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const threshold = 80;
  let lastY = 0;
  let ticking = false;

  function updateNavbar() {
    const y = window.scrollY;
    if (y > threshold) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      if (navbar.dataset.transparent !== undefined) {
        navbar.classList.add('transparent');
      }
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  updateNavbar();

  // Mobile hamburger
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on backdrop click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Mobile sub-menus
    mobileMenu.querySelectorAll('[data-mobile-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.closest('.navbar__mobile-item')?.querySelector('.navbar__mobile-sub');
        if (target) target.classList.toggle('open');
        const arrow = btn.querySelector('.mobile-arrow');
        if (arrow) arrow.style.transform = target?.classList.contains('open') ? 'rotate(90deg)' : '';
      });
    });
  }

  // Active link highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav-link, .navbar__mobile-link, .footer__nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === currentPath) link.classList.add('active');
  });
}

/* ══════════════════════════════════════════════════════════
   BACK TO TOP
   ══════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════════════════════════
   CUSTOM CURSOR
   ══════════════════════════════════════════════════════════ */
function initCustomCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = document.querySelectorAll(
    'a, button, [data-cursor-hover], .product-card, .editorial-card, .blog-card'
  );

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '';
    ring.style.opacity = '';
  });
}

/* ══════════════════════════════════════════════════════════
   PAGE TRANSITIONS
   ══════════════════════════════════════════════════════════ */
function initPageTransitions() {
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || href.startsWith('http') || link.target === '_blank') return;

    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });
  });

  // Reveal on load
  overlay.classList.remove('active');
}

/* ══════════════════════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════════════════════ */
function showToast(message, type = 'success', duration = 3000) {
  const container = document.querySelector('.toast-container') || (() => {
    const c = document.createElement('div');
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  })();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <svg class="toast__icon toast__icon--${type}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeUp 0.3s reverse both';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ══════════════════════════════════════════════════════════
   SMOOTH SCROLL for anchor links
   ══════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-height')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  ThemeManager.init();
  RTLManager.init();
  initNavbar();
  initBackToTop();
  initCustomCursor();
  initPageTransitions();
  initSmoothScroll();
});

// Expose for external use
window.ML = { ThemeManager, RTLManager, showToast };
