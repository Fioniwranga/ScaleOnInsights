/**
 * SCALE ON INSIGHTS - Firebase Integration Controller
 * Provides real-time synchronization between the frontend pages and the admin portal.
 */

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8oSwlEGAQBRnr-8Vgsi1ziMTzunjE6NY",
  authDomain: "scaleon-8066b.firebaseapp.com",
  projectId: "scaleon-8066b",
  storageBucket: "scaleon-8066b.firebasestorage.app",
  messagingSenderId: "937584027101",
  appId: "1:937584027101:web:7b216a34a903ffa6cec234",
  measurementId: "G-6MVH58DHHP"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Default Video Assets (High-quality stock tech clips from Mixkit)
const DEFAULT_VIDEOS = {
  ai: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-of-a-computer-44585-large.mp4',
  custom: 'https://assets.mixkit.co/videos/preview/mixkit-spinning-around-a-globe-of-networks-42999-large.mp4',
  support: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-keyboard-44390-large.mp4',
  expertise: 'https://assets.mixkit.co/videos/preview/mixkit-business-people-shaking-hands-in-an-office-42998-large.mp4'
};

// Default News Articles (matching original news.html structure)
const DEFAULT_NEWS = [
  {
    id: 'news-feat',
    title: 'The Future of E-Commerce: How AI is Revolutionizing Marketplaces',
    category: 'Featured Insight',
    description: 'Discover the top strategies for scaling your brand using automated quality control and intelligent content generation.',
    imageUrl: '', // default dark blue block
    date: '2026-05-15',
    isFeatured: true
  },
  {
    id: 'news-1',
    title: '5 Ways to Streamline Your Amazon Seller Account',
    category: 'Operations',
    description: 'Learn how to simplify catalog management, improve operational workflows, and optimize your seller performance metrics.',
    imageUrl: '',
    date: '2026-05-10',
    isFeatured: false
  },
  {
    id: 'news-2',
    title: 'Image Transformation AI: A Complete Guide',
    category: 'Technology',
    description: 'Discover how automated AI image enhancement and quality trim algorithms are changing modern visual commerce.',
    imageUrl: '',
    date: '2026-05-08',
    isFeatured: false
  },
  {
    id: 'news-3',
    title: 'Building a Resilient Multi-Channel E-Commerce Brand',
    category: 'Strategy',
    description: 'A comprehensive blueprint for scaling from single marketplace dependency to multi-channel omni-presence.',
    imageUrl: '',
    date: '2026-05-01',
    isFeatured: false
  }
];

// Caches for real-time reactivity
let cachedSubmissions = [];
let cachedNews = [];
let cachedVideos = DEFAULT_VIDEOS;
let cachedCareerApps = [];
let cachedJobs = [];

// Helper to update UI from caches
function triggerUIRenders() {
  if (typeof renderSubmissionsTable === 'function') renderSubmissionsTable(cachedSubmissions);
  if (typeof renderNewsPage === 'function') renderNewsPage();
  const adminNewsContainer = document.getElementById('admin-news-grid-container');
  if (adminNewsContainer && typeof renderNewsGrid === 'function') renderNewsGrid();
  if (typeof bindHomepageVideos === 'function') bindHomepageVideos();
  if (document.getElementById('video-manager-form') && typeof loadVideoFormValues === 'function') loadVideoFormValues();
  const careerTbody = document.getElementById('career-apps-table-body');
  if (careerTbody && typeof renderCareerAppsTable === 'function') renderCareerAppsTable(cachedCareerApps);
  const careerCount = document.getElementById('career-apps-count');
  if (careerCount) careerCount.textContent = cachedCareerApps.length;
  if (typeof renderCareersPageJobs === 'function') renderCareersPageJobs(cachedJobs);
  const adminJobsTbody = document.getElementById('jobs-table-body');
  if (adminJobsTbody && typeof renderAdminJobsTable === 'function') renderAdminJobsTable(cachedJobs);
}

// Initialize Real-time synchronization with Firebase
function initRealtimeSync() {
  // Listen to submissions
  db.collection('submissions').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    cachedSubmissions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (typeof renderSubmissionsTable === 'function') renderSubmissionsTable(cachedSubmissions);
  });

  // Listen to news
  db.collection('news').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    cachedNews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (cachedNews.length === 0) cachedNews = DEFAULT_NEWS;
    if (typeof renderNewsPage === 'function') renderNewsPage();
    const adminNewsContainer = document.getElementById('admin-news-grid-container');
    if (adminNewsContainer && typeof renderNewsGrid === 'function') renderNewsGrid();
  });

  // Listen to careers
  db.collection('career_applications').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    cachedCareerApps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const careerTbody = document.getElementById('career-apps-table-body');
    if (careerTbody && typeof renderCareerAppsTable === 'function') renderCareerAppsTable(cachedCareerApps);
    const careerCount = document.getElementById('career-apps-count');
    if (careerCount) careerCount.textContent = cachedCareerApps.length;
  }, err => {
    console.error("Firebase Snapshot Error:", err);
    if (err.code === 'permission-denied') {
      console.warn("Please update your Firebase Firestore Security Rules to allow read access.");
    }
  });

  // Listen to jobs
  db.collection('jobs').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    cachedJobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (typeof renderCareersPageJobs === 'function') renderCareersPageJobs(cachedJobs);
    const adminJobsTbody = document.getElementById('jobs-table-body');
    if (adminJobsTbody && typeof renderAdminJobsTable === 'function') renderAdminJobsTable(cachedJobs);
  }, err => {
    console.error("Firebase Jobs Snapshot Error:", err);
  });

  triggerUIRenders();
}

// --- DATABASE CORE API ---

// Submissions (Connect leads)
function getSubmissions() {
  return cachedSubmissions;
}

function addSubmission(lead) {
  const newLead = { ...lead, date: new Date().toLocaleString(), timestamp: firebase.firestore.FieldValue.serverTimestamp() };
  db.collection('submissions').add(newLead)
    .catch(err => {
      console.error("Firebase Add Error:", err);
      alert("Database Error: " + err.message + "\n\nPlease ensure your Firestore Database Rules are set to 'allow read, write: if true;' in your Firebase Console.");
    });
  return true;
}

function deleteSubmission(id) {
  db.collection('submissions').doc(id).delete();
  return true;
}

function clearAllSubmissions() {
  cachedSubmissions.forEach(sub => db.collection('submissions').doc(sub.id).delete());
  return true;
}

// News
function getNews() {
  return cachedNews;
}

function addNews(article) {
  if (article.isFeatured) {
    cachedNews.forEach(n => {
      if (n.isFeatured) db.collection('news').doc(n.id).update({ isFeatured: false });
    });
  }
  const newArticle = { ...article, date: new Date().toISOString().split('T')[0], timestamp: firebase.firestore.FieldValue.serverTimestamp() };
  db.collection('news').add(newArticle)
    .catch(err => {
      console.error("Firebase Add Error:", err);
      alert("Database Error: " + err.message + "\n\nPlease ensure your Firestore Database Rules are set to 'allow read, write: if true;' in your Firebase Console.");
    });
}

function updateNews(id, updatedData) {
  if (updatedData.isFeatured) {
    cachedNews.forEach(n => {
      if (n.isFeatured && n.id !== id) db.collection('news').doc(n.id).update({ isFeatured: false });
    });
  }
  db.collection('news').doc(id).update(updatedData);
}

function deleteNews(id) {
  db.collection('news').doc(id).delete();
}

// Career Applications
function getCareerApps() {
  return cachedCareerApps;
}

function addCareerApp(appData) {
  const newApp = { ...appData, date: new Date().toLocaleString(), timestamp: firebase.firestore.FieldValue.serverTimestamp() };
  db.collection('career_applications').add(newApp)
    .catch(err => {
      console.error("Firebase Add Error:", err);
      alert("Database Error: " + err.message + "\n\nPlease ensure your Firestore Database Rules are set to 'allow read, write: if true;' in your Firebase Console.");
    });
  return true;
}

function deleteCareerApp(id) {
  db.collection('career_applications').doc(id).delete();
  return true;
}

// Jobs
function getJobs() {
  return cachedJobs;
}

function addJob(jobData) {
  const newJob = { ...jobData, date: new Date().toLocaleDateString(), timestamp: firebase.firestore.FieldValue.serverTimestamp() };
  db.collection('jobs').add(newJob)
    .catch(err => {
      console.error("Firebase Add Job Error:", err);
      alert("Database Error: " + err.message);
    });
  return true;
}

function deleteJob(id) {
  db.collection('jobs').doc(id).delete()
    .catch(err => {
      console.error("Firebase Delete Job Error:", err);
    });
  return true;
}

// Video Settings
function getVideos() {
  return cachedVideos;
}

function updateVideoAssets(videoSettings) {
  cachedVideos = { ...cachedVideos, ...videoSettings };
  if (typeof bindHomepageVideos === 'function') bindHomepageVideos();
  return true;
}

// --- UI RENDER HELPERS ---
function bindHomepageVideos() {
  const aiVideo = document.getElementById('ai-workflow-video');
  const customVideo = document.getElementById('custom-model-video');
  const videos = getVideos();
  if (aiVideo && videos.ai) aiVideo.src = videos.ai;
  if (customVideo && videos.custom) customVideo.src = videos.custom;
}

function renderNewsPage() {
  const newsContainer = document.getElementById('news-grid-container');
  if (!newsContainer) return;
  
  const newsList = getNews();
  if (!newsList || newsList.length === 0) {
    newsContainer.innerHTML = '<p style="color:var(--text-muted);">No news available.</p>';
    return;
  }
  
  newsContainer.innerHTML = newsList.map(item => `
    <div class="news-card" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px;">
      ${item.isFeatured ? '<span style="background:var(--accent);color:#fff;padding:2px 8px;border-radius:4px;font-size:0.75rem;margin-bottom:10px;display:inline-block;">FEATURED</span>' : ''}
      <h3 style="color:#fff;font-family:var(--font-heading);margin-top:0;margin-bottom:10px;">${item.title}</h3>
      <p style="color:#0ea5e9;font-size:0.8rem;margin-top:0;">${item.category} • ${item.date}</p>
      <p style="color:#94a3b8;font-size:0.95rem;">${item.description}</p>
    </div>
  `).join('');
}

function showSuccessToast(name, isCareer = false) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.background = '#10b981';
  toast.style.color = '#fff';
  toast.style.padding = '15px 25px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  toast.style.zIndex = '9999';
  toast.style.fontFamily = 'var(--font-body), sans-serif';
  toast.style.transition = 'opacity 0.3s';
  toast.innerHTML = `<strong>Success!</strong><br>Thank you ${name || ''}. Your ${isCareer ? 'application' : 'inquiry'} has been received!`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- MODAL UTILITIES ---
function showModal(overlayId) {
  const overlay = document.getElementById(overlayId);
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}
function hideModal(overlayId) {
  const overlay = document.getElementById(overlayId);
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// --- CONTACT FORM SETUP ---
function setupContactForm() {
  const contactForm = document.getElementById('soi-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const phone = document.getElementById('form-phone')?.value.trim();
    const company = document.getElementById('form-company')?.value.trim();
    const website = document.getElementById('form-website')?.value.trim();
    const country = document.getElementById('form-country')?.value;
    const service = document.getElementById('form-service')?.value;
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !company || !country) {
      alert('Please fill out all required fields.');
      return;
    }

    const success = addSubmission({ name, email, phone, company, website, country, service, message });
    if (success) {
      contactForm.reset();
      hideModal('contact-modal-overlay');
      showSuccessToast(name, false);
    }
  });
}

// --- CAREER APPLICATION FORM SETUP ---
function setupCareerApplicationForm() {
  const careerForm = document.getElementById('soi-career-form');
  if (!careerForm) return;

  careerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('career-name')?.value.trim();
    const email = document.getElementById('career-email')?.value.trim();
    const phone = document.getElementById('career-phone')?.value.trim();
    const dob = document.getElementById('career-dob')?.value;
    const resumeFile = document.getElementById('career-resume')?.files[0];

    if (!name || !email || !phone || !dob) {
      alert('Please fill out all required fields.');
      return;
    }

    const jobTitle = window.selectedJobTitle || "General Application";

    // Store resume as base64 if provided (for localStorage) or just filename
    if (resumeFile) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const resumeDataUrl = event.target.result;
        const success = addCareerApp({ 
          name, email, phone, dob, jobTitle,
          resumeFileName: resumeFile.name, 
          resumeSize: (resumeFile.size / 1024).toFixed(1) + ' KB',
          resumeDataUrl: resumeDataUrl
        });
        if (success) {
          careerForm.reset();
          hideModal('career-modal-overlay');
          showSuccessToast(name, true);
        }
      };
      reader.readAsDataURL(resumeFile);
    } else {
      const success = addCareerApp({ name, email, phone, dob, jobTitle, resumeFileName: null });
      if (success) {
        careerForm.reset();
        hideModal('career-modal-overlay');
        showSuccessToast(name, true);
      }
    }
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize real-time synchronization with Firestore
  initRealtimeSync();

  // Check which page is currently active and run appropriate dynamic binding
  if (typeof bindHomepageVideos === 'function') bindHomepageVideos();
  if (typeof renderNewsPage === 'function') renderNewsPage();
  setupContactForm();
  setupCareerApplicationForm();

});
