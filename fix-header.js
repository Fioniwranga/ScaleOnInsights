const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const badNavbar = `  <!-- NAVBAR -->
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">
        <a href="index.html">SCALE ON INSIGHTS</a>
      </div>
      
      <!-- Hamburger menu button -->
      <button class="mobile-nav-toggle" id="mobile-toggle" aria-expanded="false" aria-label="Toggle navigation">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Navigation Links -->
      <ul class="nav-menu" id="primary-navigation">
        <li class="nav-item"><a href="index.html" class="nav-link active">Home</a></li>
        <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
        <li class="nav-item"><a href="explore-services.html" class="nav-link">Services</a></li>
        <li class="nav-item"><a href="news.html" class="nav-link">News & Press</a></li>
        <li class="nav-item"><a href="careers.html" class="nav-link">Careers</a></li>
        <li class="nav-item"><button onclick="showModal('contact-modal-overlay')" class="btn btn-primary nav-btn">Contact Us</button></li>
      </ul>
    </div>
  </nav>`;

const goodHeader = `  <!-- HEADER -->
  <header class="main-header" id="header">
    <div class="header-container">
      <!-- Logo -->
      <a href="index.html#hero" class="logo-link">
        <img src="image/Logo.png" alt="SCALE ON INSIGHTS" class="logo-image">
        <div class="logo-text">
          <span class="logo-top">SCALE ON</span>
          <span class="logo-bottom">INSIGHTS</span>
        </div>
      </a>

      <!-- Mobile Menu Toggle Button -->
      <button class="mobile-nav-toggle" aria-label="Toggle navigation" aria-controls="primary-navigation" aria-expanded="false" id="mobile-toggle">
        <span class="hamburger"></span>
      </button>

      <!-- Navigation Menu -->
      <nav class="nav-menu" id="primary-navigation">
        <ul class="nav-list">
          <li class="nav-item dropdown">
            <a href="explore-services.html" class="nav-link dropdown-toggle" id="services-dropdown-toggle" aria-haspopup="true" aria-expanded="false">
              Explore services <span class="dropdown-arrow">▼</span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="services-dropdown-toggle">
              <li><a href="explore-services.html#content-solutions-section" class="dropdown-item">Content Solutions</a></li>
              <li><a href="explore-services.html#creative-services-section" class="dropdown-item">Creative & Visual</a></li>
              <li><a href="explore-services.html#ai-transformation-section" class="dropdown-item">AI Image Enhancement</a></li>
              <li><a href="explore-services.html#operations-support-section" class="dropdown-item">Operations Support</a></li>
              <li><a href="explore-services.html#digital-advertising-section" class="dropdown-item">Digital Advertising</a></li>
              <li><a href="explore-services.html#amazon-solutions-section" class="dropdown-item">Amazon Marketplace</a></li>
              <li><a href="explore-services.html#data-intelligence-section" class="dropdown-item">Data Intelligence</a></li>
            </ul>
          </li>
          <li class="nav-item"><a href="news.html" class="nav-link">News & Resources</a></li>
          <li class="nav-item"><a href="careers.html" class="nav-link">Careers</a></li>
          <li class="nav-item"><a href="about.html" class="nav-link">About us</a></li>
        </ul>
        <button onclick="showModal('contact-modal-overlay')" class="btn btn-contact">
          Contact Us
        </button>
      </nav>
    </div>
  </header>`;

if (content.includes("<!-- NAVBAR -->")) {
    content = content.replace(badNavbar, goodHeader);
    fs.writeFileSync('index.html', content, 'utf8');
    console.log("Header successfully restored!");
} else {
    console.log("Could not find the bad navbar to replace.");
}
