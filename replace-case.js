const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');

  // Replace all occurrences of 'SCALE ON INSIGHTS'
  // But protect 'alt="SCALE ON INSIGHTS"', '&reg; 2026 SCALE ON INSIGHTS', '<title>', '<meta>'
  
  // First, temporarily obfuscate the ones we want to protect
  content = content.replace(/alt="SCALE ON INSIGHTS"/g, 'alt="[PROTECTED_1]"');
  content = content.replace(/&reg; 2026 SCALE ON INSIGHTS/g, '&reg; 2026 [PROTECTED_2]');
  content = content.replace(/<title>(.*?)SCALE ON INSIGHTS(.*?)<\/title>/g, '<title>$1[PROTECTED_3]$2</title>');
  content = content.replace(/<meta(.*?)SCALE ON INSIGHTS(.*?)>/g, '<meta$1[PROTECTED_4]$2>');

  // Also protect the modal header if we consider it part of the footer/header or if we want to be safe
  // Let's protect the modal header just in case, but changing it is harmless. We'll leave it to be replaced.
  
  // Now replace the remaining occurrences
  content = content.replace(/SCALE ON INSIGHTS/g, 'Scale on Insights');

  // De-obfuscate
  content = content.replace(/alt="\[PROTECTED_1\]"/g, 'alt="SCALE ON INSIGHTS"');
  content = content.replace(/&reg; 2026 \[PROTECTED_2\]/g, '&reg; 2026 SCALE ON INSIGHTS');
  content = content.replace(/\[PROTECTED_3\]/g, 'SCALE ON INSIGHTS');
  content = content.replace(/\[PROTECTED_4\]/g, 'SCALE ON INSIGHTS');

  fs.writeFileSync(path.join(dir, file), content, 'utf8');
});

console.log("Successfully updated text case across all HTML files.");
