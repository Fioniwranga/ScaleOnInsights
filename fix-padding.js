const fs = require('fs');

let html = fs.readFileSync('explore-services.html', 'utf8');

// Remove padding: 0 1in; from inline styles
html = html.replace(/padding: 0 1in;/g, '');

fs.writeFileSync('explore-services.html', html, 'utf8');
console.log("Removed extra 1in padding from service columns.");
