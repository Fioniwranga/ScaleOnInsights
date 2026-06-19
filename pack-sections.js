const fs = require('fs');

// 1. Fix index.html footer
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  '<footer class="main-footer" id="contact">',
  '<footer class="main-footer" id="contact" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log("index.html updated to make footer one screen.");

// 2. Fix style.css to compress grow & schedule sections vertically
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /.grow-section \{\s*position: relative;\s*margin: 40px 0;\s*padding: 0;/g,
  '.grow-section {\n  position: relative;\n  margin: 10px 0;\n  padding: 0;'
);

css = css.replace(
  /.schedule-section \{\s*padding: 30px 0;/g,
  '.schedule-section {\n  padding: 10px 0;'
);

css = css.replace(
  /padding: 40px 40px;\s*\/\* adjust if necessary \*\//g,
  'padding: 20px 40px;'
);
// In case the comment isn't there:
css = css.replace(
  /padding: 40px 40px;\s*/g,
  'padding: 20px 40px;\n    '
);

// We should also adjust .grow-section::before top and bottom to be smaller so it takes less vertical space
css = css.replace(
  /top: 16%;\s*bottom: 16%;/g,
  'top: 10%;\n  bottom: 10%;'
);

fs.writeFileSync('style.css', css, 'utf8');
console.log("style.css updated to compress grow and schedule sections.");
