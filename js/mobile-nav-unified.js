/**
 * Unified Mobile Navigation Solution
 * Preserves existing visual design while ensuring consistent functionality across all pages
 */
(function() {
  'use strict';

  // Initialize mobile navigation
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
    
    // Reset body overflow
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
      // Only close if clicking the nav container itself, not its children
      if (e.target === nav) {
        body.classList.remove('nav-open');
        nav.classList.remove('nav-open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });
  }

  // Header scroll effect (from existing code)
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

  // Cursor glow effect (desktop only)
  function initCursorGlow() {
    if (window.innerWidth <= 980) return;
    
    let glowTicking = false;
    const onPointerMove = (e) => {
      if (!glowTicking) {
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mx', e.clientX + 'px');
          document.documentElement.style.setProperty('--my', e.clientY + 'px');
          glowTicking = false;
        });
        glowTicking = true;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  // Parallax effect (desktop only)
  function initParallax() {
    if (window.innerWidth <= 980) return;
    
    const parallaxElements = document.querySelectorAll('.hero-art[data-parallax]');
    if (!parallaxElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const parallaxValue = Number(el.dataset.parallax || 0.2);
          
          const updateParallax = () => {
            const rect = el.getBoundingClientRect();
            const t = (rect.top - window.innerHeight * 0.5) / window.innerHeight;
            const y = t * (50 * parallaxValue);
            el.style.transform = `translate3d(0, ${y}px, 0)`;
          };
          
          const scrollHandler = () => requestAnimationFrame(updateParallax);
          window.addEventListener('scroll', scrollHandler, { passive: true });
          updateParallax();
        }
      });
    });
    
    parallaxElements.forEach(el => observer.observe(el));
  }

  // Viewport fix for mobile devices
  function fixViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    function setVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
  }

  // Initialize everything
  function init() {
    initMobileNav();
    initHeaderScroll();
    fixViewport();
    
    if (window.innerWidth > 980) {
      initCursorGlow();
      initParallax();
    }

    // Handle responsive behavior on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 980) {
        // Close mobile menu if window is resized to mobile
        const body = document.body;
        const nav = document.querySelector('.nav');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (body.classList.contains('nav-open')) {
          body.classList.remove('nav-open');
          if (nav) nav.classList.remove('nav-open');
          if (navToggle) {
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
          }
          body.style.overflow = '';
        }
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for potential external use
  window.mobileNavUnified = {
    init: init,
    initMobileNav: initMobileNav
  };
})();