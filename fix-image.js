const fs = require('fs');
let content = fs.readFileSync('style.css', 'utf8');

const target1 = `  /* Make the first row image visually larger */
  #ai-powered-row .feature-img {
    max-width: 600px;
    transform: scale(1.15);
  }`;

const target2 = `  #ai-powered-row .feature-img:hover {
    transform: translateY(-8px) scale(1.165);
  }`;

content = content.replace(target1, '');
content = content.replace(target2, '');

fs.writeFileSync('style.css', content, 'utf8');
console.log("Removed #ai-powered-row specific image sizing.");
