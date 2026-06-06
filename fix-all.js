const fs = require('fs');

const originalHeader = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SCALE ON INSIGHTS - Scale Smarter. Grow Faster.</title>
  <meta name="description" content="Your trusted partner for AI-powered e-commerce growth, automation, marketplace operations, and smarter workflows. SCALE ON INSIGHTS helps brands simplify operations and scale faster.">
  
  <!-- Preconnect and Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- NAVBAR -->
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
  </nav>

  <!-- HERO SECTION -->
  <section class="hero-section">
    <!-- Abstract dark blue geometric shapes in background -->
    <div class="hero-bg-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>
    
    <div class="hero-glow"></div>
    
    <div class="container hero-container">
      <div class="hero-content">
        <h1 class="hero-title">
          Scale Smarter.<br>
          <span id="typewriter-hero" class="typewriter-span"><span class="highlight">Grow</span> Faster.</span>
        </h1>
        <div class="hero-divider"></div>
        <p class="hero-subtitle">
          Your trusted partner for AI-powered e-commerce growth, automation, marketplace operations, and smarter workflows.
        </p>
        <a href="#services" class="btn btn-primary">Learn More</a>
      </div>
    </div>
  </section>

  <!-- FEATURES ROW SECTION -->
  <section class="features-section" id="services">
    <div class="container">
      
      <!-- Combined Intro & Feature Row 1 Screen -->
      <div class="combined-screen" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
        <!-- INTRO SECTION -->
        <div class="intro-section text-center" style="padding: 0 0 20px 0; background-color: transparent;">
          <h2 class="intro-title">Your Trusted AI-Powered Partner</h2>
          <p class="intro-desc">
            Growing an e-commerce business takes smart technology, creative execution, and dependable operational support. That's what SCALE ON INSIGHTS delivers to every business we partner with.
          </p>
        </div>

        <!-- Feature Row 1: AI-Powered Solutions -->
        <div class="feature-row" id="ai-powered-row" style="min-height: auto; margin-top: 30px; margin-bottom: 0;">
          <div class="feature-visual">
            <img src="https://placehold.co/600x400/011531/FFF?text=Feature+Image" alt="Feature Image" class="feature-img animate-on-scroll">
          </div>
          <div class="feature-content">
            <h3 class="feature-title" style="font-size: 3.5rem; line-height: 1.1;">AI-Powered <br><span class="highlight">E-Commerce Solutions</span></h3>
            <p class="feature-desc">
              SCALE ON INSIGHTS helps brands, marketplaces, and online businesses<br>
              simplify operations, improve product content, and scale faster<br>
              with smart AI-driven solutions.
            </p>
            <a href="explore-services.html" class="btn btn-secondary">Explore services</a>
          </div>
        </div>
      </div>

      <!-- Feature Row 2: Operational Efficiency -->
      <div class="feature-row reverse" id="operational-efficiency-row">
        <div class="feature-visual">
          <img src="https://placehold.co/600x400/011531/FFF?text=Feature+Image" alt="Feature Image" class="feature-img animate-on-scroll">
        </div>
        <div class="feature-content">
          <h3 class="feature-title">Improve <br><span class="highlight" style="font-variant-ligatures: none;">Operational Efficiency</span></h3>
          <p class="feature-desc">
            Reduce manual work, accelerate workflows, and improve<br>
            business performance with AI-powered automation<br>
            and operational support solutions.
          </p>
          <a href="explore-services.html" class="btn btn-secondary">Explore services</a>
        </div>
      </div>

      <!-- Feature Row 3: Marketplace Growth -->
      <div class="feature-row">
        <div class="feature-visual">
          <img src="https://placehold.co/600x400/011531/FFF?text=Feature+Image" alt="Feature Image" class="feature-img animate-on-scroll">
        </div>
        <div class="feature-content">
          <h3 class="feature-title">Boost <br><span class="highlight">Marketplace Growth</span></h3>
          <p class="feature-desc">
            Strengthen your online presence with optimized product content,<br>
            catalog management, pricing intelligence,<br>
            and visual commerce solutions.
          </p>
          <a href="explore-services.html" class="btn btn-secondary">Explore services</a>
        </div>
      </div>

      <!-- Feature Row 4: Brand Experiences -->
      <div class="feature-row reverse" id="brand-experiences-row">
        <div class="feature-visual">
          <img src="https://placehold.co/600x400/011531/FFF?text=Feature+Image" alt="Feature Image" class="feature-img animate-on-scroll">
        </div>
        <div class="feature-content">
          <h3 class="feature-title">Build Stronger <br><span class="highlight">Brand Experiences</span></h3>
          <p class="feature-desc">
            Create engaging customer experiences with premium visuals,<br>
            AI-assisted content, and scalable e-commerce<br>
            solutions built for growth.
          </p>
          <a href="explore-services.html" class="btn btn-secondary">Explore services</a>
        </div>
      </div>

    </div>
  </section>`;

const content = fs.readFileSync('index.html', 'utf8');

// Find the index of the start of PARTNER LOGO BANNER to stitch the end
const partnerIndex = content.indexOf('<!-- PARTNER LOGO BANNER -->');
if (partnerIndex > -1) {
    const finalContent = originalHeader + '\n\n  ' + content.substring(partnerIndex);
    fs.writeFileSync('index.html', finalContent, 'utf8');
    console.log("Index fully rebuilt and verified.");
} else {
    console.log("Could not find partner banner.");
}
