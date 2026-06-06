const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace('style="margin-left: -20px;"', 'style="margin-left: 10px;"');

fs.writeFileSync('index.html', content, 'utf8');
console.log("Moved text a little right.");
