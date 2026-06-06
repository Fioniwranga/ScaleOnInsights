const fs = require('fs');

// 1. Fix HTML
let html = fs.readFileSync('explore-services.html', 'utf8');

// Add Montserrat to fonts
html = html.replace(
  'family=Inter:wght@300;400;500;600;700&family=Outfit:',
  'family=Montserrat:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Outfit:'
);

// Add animate-on-scroll and mix-blend-mode to missing images
html = html.replace(
  '<img class="service-illustration-svg" src="image/Digital Advertising & Marketplace Growth.png" alt="Digital Advertising & Marketplace Growth">',
  '<img class="service-illustration-svg animate-on-scroll" src="image/Digital Advertising & Marketplace Growth.png" alt="Digital Advertising & Marketplace Growth" style="mix-blend-mode: multiply;">'
);
html = html.replace(
  '<img class="service-illustration-svg" src="image/Data Intelligence & Analytics.png" alt="Data Intelligence & Analytics">',
  '<img class="service-illustration-svg animate-on-scroll" src="image/Data Intelligence & Analytics.png" alt="Data Intelligence & Analytics" style="mix-blend-mode: multiply;">'
);

// Remove max-width: 100%; from inline styles to let CSS handle it
html = html.replace(/max-width: 100%;/g, '');

fs.writeFileSync('explore-services.html', html, 'utf8');


// 2. Fix CSS
let css = fs.readFileSync('style.css', 'utf8');

// Fix 2in padding to 1in
css = css.replace(/padding-left: 2in !important;\s*padding-right: 2in !important;/g, 'padding-left: 1in !important;\n    padding-right: 1in !important;');

// Fix image sizing override
const oldImgCss = `.service-illustration-svg {
  max-width: 100% !important;
  width: 600px;
}`;
const newImgCss = `.service-illustration-svg {
  max-width: 480px !important;
  width: 100%;
}`;
css = css.replace(oldImgCss, newImgCss);

fs.writeFileSync('style.css', css, 'utf8');

console.log("Services layout, fonts, and sizing updated.");
