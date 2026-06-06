const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = { getItem: () => null, setItem: () => {} };
global.firebase = { initializeApp: () => ({}), firestore: () => ({}), analytics: () => ({}) };

const code = fs.readFileSync('backend/backend-controller.js', 'utf8');
try {
  eval(code);
  document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  console.log('Script loaded successfully');
} catch(e) {
  console.error('Error:', e);
}
