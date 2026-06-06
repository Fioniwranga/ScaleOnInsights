const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const target = `<div class="feature-content">
            <h3 class="feature-title" style="font-size: 3.5rem; line-height: 1.1;">AI-Powered <br><span class="highlight">E-Commerce Solutions</span></h3>
            <p class="feature-desc">
              SCALE ON INSIGHTS helps brands, marketplaces, and online businesses<br>
              simplify operations, improve product content, and scale faster<br>
              with smart AI-driven solutions.
            </p>`;

const replacement = `<div class="feature-content" style="margin-left: -40px;">
            <h3 class="feature-title" style="font-size: 3.5rem; line-height: 1.1;">AI-Powered <br><span class="highlight">E-Commerce Solutions</span></h3>
            <p class="feature-desc">
              SCALE ON INSIGHTS helps brands, marketplaces,<br>
              and online businesses simplify operations,<br>
              improve product content, and scale faster<br>
              with smart AI-driven solutions.
            </p>`;

content = content.replace(target, replacement);

fs.writeFileSync('index.html', content, 'utf8');
console.log("Text adjusted to 4 lines and moved left.");
