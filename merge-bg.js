const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

// 1. Change services-hero background to #f2f7fc and hide glows
html = html.replace(
  '<section class="services-hero" style="padding: 110px 0 30px;">',
  '<section class="services-hero" style="padding: 110px 0 30px; background: #f2f7fc;">'
);

html = html.replace(
  '<div class="hero-bg-glow glow-1"></div>',
  '<div class="hero-bg-glow glow-1" style="display: none;"></div>'
);

html = html.replace(
  '<div class="hero-bg-glow glow-2"></div>',
  '<div class="hero-bg-glow glow-2" style="display: none;"></div>'
);

// 2. Ensure mix-blend-mode is removed from the geometric-collage
html = html.replace(
  'mix-blend-mode: multiply;',
  ''
);

fs.writeFileSync('about.html', html, 'utf8');
console.log("Background merged successfully for about.html.");
