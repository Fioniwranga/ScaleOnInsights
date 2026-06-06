const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Replace margin-left: 40px with margin-left: -20px
content = content.replace('style="margin-left: 40px;"', 'style="margin-left: -20px;"');

fs.writeFileSync('index.html', content, 'utf8');
console.log("Moved text a little to the left.");
