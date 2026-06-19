/**
 * SCALE ON INSIGHTS - Main Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE NAVIGATION DRAWER ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const primaryNavigation = document.getElementById('primary-navigation');

  if (mobileToggle && primaryNavigation) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle attributes
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNavigation.classList.toggle('active');
      
      // Stop body scrolling when menu is active
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Dropdown toggle logic on mobile/tablet screens
    const dropdownToggle = document.getElementById('services-dropdown-toggle');
    const dropdownItem = document.querySelector('.nav-item.dropdown');
    
    if (dropdownToggle && dropdownItem) {
      dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          // Only toggle dropdown if the user clicked on the arrow icon itself
          if (e.target.classList.contains('dropdown-arrow')) {
            e.preventDefault();
            const isDropdownActive = dropdownItem.classList.contains('dropdown-active');
            dropdownItem.classList.toggle('dropdown-active');
            dropdownToggle.setAttribute('aria-expanded', !isDropdownActive);
            
            const arrow = dropdownToggle.querySelector('.dropdown-arrow');
            if (arrow) {
              arrow.textContent = !isDropdownActive ? '▲' : '▼';
            }
          }
          // Otherwise, proceed with normal navigation to explore-services.html
        }
      });
    }

    // Close mobile menu when clicking a standard link or dropdown item
    const navLinks = primaryNavigation.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item, .btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        primaryNavigation.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset dropdown state
        if (dropdownItem) {
          dropdownItem.classList.remove('dropdown-active');
        }
        if (dropdownToggle) {
          dropdownToggle.setAttribute('aria-expanded', 'false');
          const arrow = dropdownToggle.querySelector('.dropdown-arrow');
          if (arrow) arrow.textContent = '▼';
        }
      });
    });
  }

  // --- HEADER SCROLL ACTION (HIDE ON SCROLL DOWN, SHOW ON SCROLL UP) ---
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;

  if (header) {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Sticky header padding / shadow transition
      if (currentScrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 10px 30px rgba(0, 12, 22, 0.15)';
      } else {
        header.style.padding = '16px 0';
        header.style.boxShadow = '';
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down - hide
          header.classList.add('header-hidden');
        } else {
          // Scrolling up - show
          header.classList.remove('header-hidden');
        }
      } else {
        // Near the top - always show
        header.classList.remove('header-hidden');
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
  }


  // --- HERO TYPEWRITER ONCE ANIMATION ---
  const typewriterElement = document.getElementById('typewriter-hero');
  if (typewriterElement) {
    const originalHTML = '<span class="highlight">Grow</span> Faster.';
    const textToType = "Grow Faster.";
    let charIndex = 0;
    
    // Clear initial text so it starts empty and shows the cursor
    typewriterElement.innerHTML = '<span class="typewriter-cursor">|</span>';
    
    function typeOnce() {
      if (charIndex <= textToType.length) {
        // Construct the styled HTML up to current charIndex
        let typedHTML = "";
        if (charIndex <= 4) {
          // Inside "Grow" (0 to 4 characters)
          typedHTML = `<span class="highlight">${textToType.substring(0, charIndex)}</span>`;
        } else {
          // Beyond "Grow"
          typedHTML = `<span class="highlight">Grow</span>${textToType.substring(4, charIndex)}`;
        }
        
        typewriterElement.innerHTML = typedHTML + '<span class="typewriter-cursor">|</span>';
        charIndex++;
        setTimeout(typeOnce, 120);
      } else {
        // Animation finished, set final original HTML and remove caret cursor
        typewriterElement.innerHTML = originalHTML;
      }
    }
    
    // Start typing after a brief delay for a premium loading feel
    setTimeout(typeOnce, 500);
  }

  // --- SERVICES HERO TYPEWRITER ONCE ANIMATION ---
  const servicesTypewriter = document.getElementById('typewriter-services');
  if (servicesTypewriter) {
    const originalServicesHTML = 'E-Commerce Growth';
    const textToTypeServices = "E-Commerce Growth";
    let charIndexServices = 0;
    
    // Clear initial text so it starts empty and shows the cursor
    servicesTypewriter.innerHTML = '<span class="typewriter-cursor">|</span>';
    
    function typeServicesOnce() {
      if (charIndexServices <= textToTypeServices.length) {
        servicesTypewriter.innerHTML = textToTypeServices.substring(0, charIndexServices) + '<span class="typewriter-cursor">|</span>';
        charIndexServices++;
        // Speed of typing (120ms)
        setTimeout(typeServicesOnce, 120);
      } else {
        // Animation finished, set final original HTML and remove caret cursor
        servicesTypewriter.innerHTML = originalServicesHTML;
      }
    }
    
    // Start typing after a brief delay for a premium loading feel
    setTimeout(typeServicesOnce, 500);
  }

  // --- SMOOTH INTERNAL LINKS SCROLLING ---
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.classList.contains('service-link-label')) return;
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Custom offset calculation for fixed header
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- SERVICES TOGGLE ACCORDION ---
  const serviceLinks = document.querySelectorAll('.service-link-label');
  serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Find the associated bullets grid in the same column
      const parentCol = link.closest('.service-content-col');
      if (parentCol) {
        const bulletsGrid = parentCol.querySelector('.service-bullets-grid');
        if (bulletsGrid) {
          e.preventDefault();
          link.classList.toggle('active');
          bulletsGrid.classList.toggle('active');
        }
      }
    });
  });

  // --- TESTIMONIAL ANIMATION ON ARROW CLICK ---
  const testimonialPrev = document.getElementById('testimonial-prev');
  const testimonialNext = document.getElementById('testimonial-next');
  const testimonialContent = document.querySelector('.testimonial-content');

  if (testimonialPrev && testimonialNext && testimonialContent) {
    const triggerAnimation = () => {
      // Remove class to reset animation
      testimonialContent.classList.remove('testimonial-animate');
      // Trigger reflow to restart animation
      void testimonialContent.offsetWidth;
      // Add class to start animation
      testimonialContent.classList.add('testimonial-animate');
    };
    testimonialPrev.addEventListener('click', triggerAnimation);
    testimonialNext.addEventListener('click', triggerAnimation);
  }

  // --- APPROACH SECTION DYNAMIC VIDEO ---
  // Loaded and managed dynamically via backend-controller.js
  if (typeof bindHomepageVideos === 'function') {
    bindHomepageVideos();
  }

  // --- COOKIE CONSENT BANNER ---
  function initCookieConsent() {
    if (localStorage.getItem('cookie-consent') === 'accepted' || localStorage.getItem('cookie-consent') === 'declined') {
      return;
    }
    
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cookie-svg">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z"></path>
            <circle cx="7.5" cy="13.5" r="1" fill="currentColor"></circle>
            <circle cx="11.5" cy="16.5" r="1" fill="currentColor"></circle>
            <circle cx="11.5" cy="11.5" r="1" fill="currentColor"></circle>
            <circle cx="15.5" cy="14.5" r="1" fill="currentColor"></circle>
            <circle cx="16.5" cy="10.5" r="1" fill="currentColor"></circle>
          </svg>
        </div>
        <div class="cookie-text-content">
          <h4 class="cookie-title">We Value Your Privacy</h4>
          <p class="cookie-desc">We use cookies to analyze website traffic, customize content, and improve your overall experience. By clicking "Accept All", you agree to our cookie policy.</p>
        </div>
        <div class="cookie-buttons">
          <button id="cookie-accept" class="cookie-btn cookie-accept-btn">Accept All</button>
          <button id="cookie-decline" class="cookie-btn cookie-decline-btn">Decline</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
    
    // Trigger slide-up
    setTimeout(() => {
      banner.classList.add('show');
    }, 800);
    
    document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'accepted');
      document.cookie = "cookie_consent=accepted; max-age=" + (365*24*60*60) + "; path=/";
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500);
    });
    
    document.getElementById('cookie-decline').addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'declined');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500);
    });
  }

  initCookieConsent();
});

// Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});
