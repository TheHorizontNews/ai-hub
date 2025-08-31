#!/bin/bash

# Script to update all HTML files to use the unified mobile navigation

echo "Updating mobile navigation scripts across all HTML files..."

# Find all HTML files and update them
find /app -name "*.html" -type f | while read file; do
    echo "Processing: $file"
    
    # Replace mobile-fixed.js with mobile-nav-unified.js
    sed -i 's|/js/mobile-fixed\.js|/js/mobile-nav-unified.js|g' "$file"
    
    # Replace app.js with mobile-nav-unified.js (only when it's for mobile nav)
    sed -i 's|<script defer src="/js/app\.js"></script>|<script defer src="/js/mobile-nav-unified.js"></script>|g' "$file"
    
    # Remove redundant script loads
    sed -i '/js\/app\.min\.js/d' "$file"
    sed -i '/js\/aihub\.v8\.enhance\.js/d' "$file"
    
    # Remove preload references to old mobile scripts
    sed -i 's|<link rel="preload" as="script" href="/js/mobile-fixed\.js">||g' "$file"
    sed -i 's|<link rel="preload" as="script" href="/js/app\.min\.js">||g' "$file"
done

echo "Mobile navigation update complete!"
echo "All files now use /js/mobile-nav-unified.js"