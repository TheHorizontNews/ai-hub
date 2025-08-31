// Inline Mobile Navigation Template
// This code should be placed in a <script> tag in each HTML file
(function() {
  'use strict';

  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    if (!navToggle || !nav) return;

    // Ensure burger lines are properly structured
    if (navToggle.children.length === 0) {
      navToggle.innerHTML = `
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      `;
    }

    // Ensure menu is closed by default
    body.classList.remove('nav-open');
    nav.classList.remove('nav-open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';

    // Toggle function
    function toggleMenu() {
      const isOpen = body.classList.contains('nav-open');
      
      if (isOpen) {
        // Close menu
        body.classList.remove('nav-open');
        nav.classList.remove('nav-open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      } else {
        // Open menu
        body.classList.add('nav-open');
        nav.classList.add('nav-open');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';
      }
    }

    // Click handler for burger button
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking nav links
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        body.classList.remove('nav-open');
        nav.classList.remove('nav-open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) {
        body.classList.remove('nav-open');
        nav.classList.remove('nav-open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    // Close menu when clicking outside (on the nav overlay itself)
    nav.addEventListener('click', function(e) {
      if (e.target === nav) {
        body.classList.remove('nav-open');
        nav.classList.remove('nav-open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });
  }

  // Header scroll effect
  function initHeaderScroll() {
    const header = document.querySelector('#hdr');
    if (!header) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('fixed', window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Initialize when DOM is ready
  function init() {
    initMobileNav();
    initHeaderScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();