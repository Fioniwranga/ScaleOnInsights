const fs = require('fs');

let html = fs.readFileSync('explore-services.html', 'utf8');

// Remove <br> from all headings except Digital Advertising
html = html.replace('E-Commerce <br><span class="highlight">Content Solutions</span>', 'E-Commerce <span class="highlight">Content Solutions</span>');
html = html.replace('Creative <br><span class="highlight">& Visual Content Services</span>', 'Creative <span class="highlight">& Visual Content Services</span>');
html = html.replace('AI Image <br><span class="highlight">Transformation</span>', 'AI Image <span class="highlight">Transformation</span>');
html = html.replace('E-Commerce <br><span class="highlight">Operations Support</span>', 'E-Commerce <span class="highlight">Operations Support</span>');
html = html.replace('Amazon <br><span class="highlight">Marketplace Solutions</span>', 'Amazon <span class="highlight">Marketplace Solutions</span>');
html = html.replace('Data <br><span class="highlight">Intelligence & Analytics</span>', 'Data <span class="highlight">Intelligence & Analytics</span>');

// Ensure Digital Advertising still has <br> (it already does, but just to be sure)
// We don't touch it.

fs.writeFileSync('explore-services.html', html, 'utf8');
console.log("Removed <br> from all service titles except Digital Advertising.");
