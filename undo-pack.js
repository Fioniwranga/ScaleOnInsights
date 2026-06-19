const fs = require('fs');

// 1. Undo index.html footer
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  '<footer class="main-footer" id="contact" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">',
  '<footer class="main-footer" id="contact">'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log("index.html footer undo complete.");

// 2. Undo style.css
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /.grow-section \{\s*position: relative;\s*margin: 10px 0;\s*padding: 0;/g,
  '.grow-section {\n  position: relative;\n  margin: 40px 0;\n  padding: 0;'
);

css = css.replace(
  /.schedule-section \{\s*padding: 10px 0;/g,
  '.schedule-section {\n  padding: 30px 0;'
);

css = css.replace(
  /padding: 20px 40px;\s*\/\* adjust if necessary \*\//g,
  'padding: 40px 40px;'
);
css = css.replace(
  /padding: 20px 40px;\s*/g,
  'padding: 40px 40px;\n    '
);

css = css.replace(
  /top: 10%;\s*bottom: 10%;/g,
  'top: 16%;\n  bottom: 16%;'
);

fs.writeFileSync('style.css', css, 'utf8');
console.log("style.css undo complete.");
