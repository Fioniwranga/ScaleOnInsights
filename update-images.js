const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Replace image 1
content = content.replace(
  '<img src="https://placehold.co/600x400/011531/FFF?text=Feature+Image" alt="Feature Image" class="feature-img animate-on-scroll">',
  '<img src="image/AI-Powered.png" alt="AI-Powered E-Commerce Solutions" class="feature-img animate-on-scroll" style="mix-blend-mode: multiply;">'
);

// Replace image 2
content = content.replace(
  '<img src="https://placehold.co/600x400/011531/FFF?text=Feature+Image" alt="Feature Image" class="feature-img animate-on-scroll">',
  '<img src="image/Improve.png" alt="Improve Operational Efficiency" class="feature-img animate-on-scroll" style="mix-blend-mode: multiply;">'
);

// Replace image 3
content = content.replace(
  '<img src="https://placehold.co/600x400/011531/FFF?text=Feature+Image" alt="Feature Image" class="feature-img animate-on-scroll">',
  '<img src="image/Boost.png" alt="Boost Marketplace Growth" class="feature-img animate-on-scroll" style="mix-blend-mode: multiply;">'
);

// Replace image 4
content = content.replace(
  '<img src="https://placehold.co/600x400/011531/FFF?text=Feature+Image" alt="Feature Image" class="feature-img animate-on-scroll">',
  '<img src="image/Build Stronger.png" alt="Build Stronger Brand Experiences" class="feature-img animate-on-scroll" style="mix-blend-mode: multiply;">'
);

fs.writeFileSync('index.html', content, 'utf8');
console.log("Images updated successfully.");
