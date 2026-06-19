const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const placeholderHtml = `<div class="feature-visual">
          <img src="https://placehold.co/600x400/011531/FFF?text=Feature+Image" alt="Feature Image" class="feature-img animate-on-scroll">
        </div>`;

const regex = /<div class="feature-visual[^>]*>[\s\S]*?<\/svg>\s*<\/div>/g;

let count = 0;
content = content.replace(regex, (match) => {
    count++;
    return placeholderHtml;
});

fs.writeFileSync('index.html', content, 'utf8');
console.log("Replaced " + count + " SVGs.");
