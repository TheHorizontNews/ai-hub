#!/bin/bash

# Script to apply inline mobile navigation JavaScript to all HTML files

echo "Applying inline mobile navigation script to all HTML files..."

# The inline JavaScript code
INLINE_SCRIPT='<script>
\/\/ Unified Mobile Navigation - Inline Version
(function() {
  '\''use strict'\'';

  function initMobileNav() {
    const navToggle = document.querySelector('\''.nav-toggle'\'');
    const nav = document.querySelector('\''.nav'\'');
    const body = document.body;
    
    if (!navToggle || !nav) return;

    \/\/ Ensure burger lines are properly structured
    if (navToggle.children.length === 0) {
      navToggle.innerHTML = `
        <span class="burger-line"><\/span>
        <span class="burger-line"><\/span>
        <span class="burger-line"><\/span>
      `;
    }

    \/\/ Ensure menu is closed by default
    body.classList.remove('\''nav-open'\'');
    nav.classList.remove('\''nav-open'\'');
    navToggle.classList.remove('\''active'\'');
    navToggle.setAttribute('\''aria-expanded'\'', '\''false'\'');
    body.style.overflow = '\'\'\'\'';

    \/\/ Toggle function
    function toggleMenu() {
      const isOpen = body.classList.contains('\''nav-open'\'');
      
      if (isOpen) {
        \/\/ Close menu
        body.classList.remove('\''nav-open'\'');
        nav.classList.remove('\''nav-open'\'');
        navToggle.classList.remove('\''active'\'');
        navToggle.setAttribute('\''aria-expanded'\'', '\''false'\'');
        body.style.overflow = '\'\'\'\'';
      } else {
        \/\/ Open menu
        body.classList.add('\''nav-open'\'');
        nav.classList.add('\''nav-open'\'');
        navToggle.classList.add('\''active'\'');
        navToggle.setAttribute('\''aria-expanded'\'', '\''true'\'');
        body.style.overflow = '\''hidden'\'';
      }
    }

    \/\/ Click handler for burger button
    navToggle.addEventListener('\''click'\'', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    \/\/ Close menu when clicking nav links
    const navLinks = nav.querySelectorAll('\''a'\'');
    navLinks.forEach(link => {
      link.addEventListener('\''click'\'', function() {
        body.classList.remove('\''nav-open'\'');
        nav.classList.remove('\''nav-open'\'');
        navToggle.classList.remove('\''active'\'');
        navToggle.setAttribute('\''aria-expanded'\'', '\''false'\'');
        body.style.overflow = '\'\'\'\'';
      });
    });

    \/\/ Close menu on escape key
    document.addEventListener('\''keydown'\'', function(e) {
      if (e.key === '\''Escape'\'' && body.classList.contains('\''nav-open'\'')) {
        body.classList.remove('\''nav-open'\'');
        nav.classList.remove('\''nav-open'\'');
        navToggle.classList.remove('\''active'\'');
        navToggle.setAttribute('\''aria-expanded'\'', '\''false'\'');
        body.style.overflow = '\'\'\'\'';
      }
    });

    \/\/ Close menu when clicking outside (on the nav overlay itself)
    nav.addEventListener('\''click'\'', function(e) {
      if (e.target === nav) {
        body.classList.remove('\''nav-open'\'');
        nav.classList.remove('\''nav-open'\'');
        navToggle.classList.remove('\''active'\'');
        navToggle.setAttribute('\''aria-expanded'\'', '\''false'\'');
        body.style.overflow = '\'\'\'\'';
      }
    });
  }

  \/\/ Header scroll effect
  function initHeaderScroll() {
    const header = document.querySelector('\''#hdr'\'');
    if (!header) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('\''fixed'\'', window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('\''scroll'\'', onScroll, { passive: true });
  }

  \/\/ Initialize when DOM is ready
  function init() {
    initMobileNav();
    initHeaderScroll();
  }

  if (document.readyState === '\''loading'\'') {
    document.addEventListener('\''DOMContentLoaded'\'', init);
  } else {
    init();
  }
})();
<\/script>'

# Find all HTML files and update them
find /app -name "*.html" -type f | while read file; do
    # Skip if already updated (check for our specific script)
    if grep -q "Unified Mobile Navigation - Inline Version" "$file"; then
        echo "Already updated: $file"
        continue
    fi
    
    echo "Processing: $file"
    
    # Replace the mobile-nav-unified.js script reference with inline script
    if grep -q "mobile-nav-unified.js" "$file"; then
        # Replace the script tag with inline version
        sed -i "s|<script defer src=\"/js/mobile-nav-unified.js\"></script>|$INLINE_SCRIPT|g" "$file"
        echo "  - Replaced external script with inline script"
    else
        # Check if there's another mobile nav script to replace
        if grep -q "/js/mobile-fixed.js" "$file"; then
            sed -i "s|<script defer src=\"/js/mobile-fixed.js\"></script>|$INLINE_SCRIPT|g" "$file"
            echo "  - Replaced mobile-fixed.js with inline script"
        elif grep -q "/js/app.js" "$file"; then
            sed -i "s|<script defer src=\"/js/app.js\"></script>|$INLINE_SCRIPT|g" "$file"
            echo "  - Replaced app.js with inline script"
        else
            # Add inline script before closing head tag if no existing mobile nav script
            sed -i "s|</head>|$INLINE_SCRIPT\n</head>|g" "$file"
            echo "  - Added inline script before closing head tag"
        fi
    fi
done

echo "Inline mobile navigation update complete!"
echo "All files now have inline mobile navigation JavaScript"