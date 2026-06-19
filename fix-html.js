const fs = require('fs');
const path = require('path');

const files = ['about.html', 'careers.html', 'explore-services.html', 'index.html', 'news.html'];

// Extract modals from careers.html which has both cleanly
let careersContent = fs.readFileSync('careers.html', 'utf8');

// Match everything from the first modal overlay down to the end of the <style> block for modals
const modalsRegex = /(<div class="modal-overlay" id="contact-modal-overlay"[\s\S]*?<\/style>)/;
const modalsMatch = careersContent.match(modalsRegex);
const modalsHtml = modalsMatch ? modalsMatch[1] : '';

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove existing script tags we want to re-inject properly
    content = content.replace(/<script src="[^"]*socket\.io\.js"><\/script>/g, '');
    content = content.replace(/<script src="frontend-controller\.js"><\/script>/g, '');
    content = content.replace(/<script src="main\.js"><\/script>/g, '');
    
    // Cleanup any loose `n artifacts
    content = content.replace(/`n\s*<script/g, '<script');
    content = content.replace(/`n\s*</g, '<');

    // Remove existing modals block to prevent duplicates
    content = content.replace(/<div class="modal-overlay" id="contact-modal-overlay"[\s\S]*?<\/style>/, '');
    content = content.replace(/<div class="modal-overlay" id="career-modal-overlay"[\s\S]*?<\/style>/, '');

    // Scripts to inject
    const scriptsHtml = `
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
  <script src="frontend-controller.js"></script>
  <script src="main.js"></script>
`;

    // Insert modals and scripts right before </body>
    content = content.replace(/<\/body>/, modalsHtml + '\n' + scriptsHtml + '\n</body>');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log("Fixed " + file);
});
