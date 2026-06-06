const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Fix Part 1
const brokenPart1 = `    </div>
  </section>

          <a href="explore-services.html" class="btn btn-secondary">Explore services</a>
        </div>
      </div>

      </div>`;

const fixedPart1 = `    </div>
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
      </div>`;

content = content.replace(brokenPart1, fixedPart1);

// Fix Part 2
const brokenPart2 = `          <a href="explore-services.html" class="btn btn-secondary">Explore services</a>
        </div>
      </div>
          <a href="explore-services.html" class="btn btn-secondary">Explore services</a>
        </div>
      </div>

      <!-- Feature Row 4: Brand Experiences -->`;

const fixedPart2 = `          <a href="explore-services.html" class="btn btn-secondary">Explore services</a>
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

      <!-- Feature Row 4: Brand Experiences -->`;

content = content.replace(brokenPart2, fixedPart2);

fs.writeFileSync('index.html', content, 'utf8');
console.log("Index repaired successfully.");
