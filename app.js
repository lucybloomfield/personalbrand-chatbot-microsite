// Datafast tracking helper
function trackEvent(eventName, eventData = {}) {
  if (typeof window.datafast !== 'undefined') {
    window.datafast('track', eventName, eventData);
  }
  // Also log for debugging
  console.log('Event tracked:', eventName, eventData);
}

// Track page view on load
document.addEventListener('DOMContentLoaded', function() {
  trackEvent('pageview', {
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  });

  // Ensure Magic Marketer links have ref=Lucy parameter
  ensureMagicMarketerRefs();

  // Track email link clicks
  initEmailTracking();

  // Initialize tab switching
  initTabs();

  // Initialize smooth scroll for anchor links
  initSmoothScroll();

  // Initialize magic star effect
  initMagicStars();

  // Initialize case study carousel (mobile)
  initCaseStudyCarousel();
});

// Ensure all Magic Marketer links have ref=Lucy
function ensureMagicMarketerRefs() {
  const magicMarketerLinks = document.querySelectorAll('a[href*="magicmarketer.com"]');
  
  magicMarketerLinks.forEach(link => {
    const url = new URL(link.href);
    if (!url.searchParams.has('ref')) {
      url.searchParams.set('ref', 'Lucy');
      link.href = url.toString();
    }
    
    // Track clicks on Magic Marketer links
    link.addEventListener('click', function() {
      trackEvent('magic_marketer_link_click', {
        source: this.textContent.trim(),
        url: this.href
      });
    });
  });
}

// Track email link clicks
function initEmailTracking() {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('email_link_click', {
        email: this.href.replace('mailto:', '').split('?')[0],
        source: this.textContent.trim()
      });
    });
  });
}

// Initialize tab switching
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');

      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Show corresponding panel
      const targetPanel = document.getElementById(targetTab + '-tab');
      if (targetPanel) {
        targetPanel.classList.add('active');
        
        // Track tab switch
        trackEvent('library_tab_switch', {
          tab: targetTab
        });
      }
    });
  });
}

// Initialize smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Track navigation
        trackEvent('anchor_link_click', {
          target: href
        });
      }
    });
  });
}

// Track scroll depth (optional enhancement)
let maxScroll = 0;
window.addEventListener('scroll', function() {
  const scrollPercent = Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  );

  if (scrollPercent > maxScroll) {
    maxScroll = scrollPercent;
    
    // Track milestones
    if (scrollPercent >= 25 && scrollPercent < 50) {
      trackEvent('scroll_depth', { depth: 25 });
    } else if (scrollPercent >= 50 && scrollPercent < 75) {
      trackEvent('scroll_depth', { depth: 50 });
    } else if (scrollPercent >= 75 && scrollPercent < 100) {
      trackEvent('scroll_depth', { depth: 75 });
    } else if (scrollPercent >= 100) {
      trackEvent('scroll_depth', { depth: 100 });
    }
  }
});

// Track external link clicks
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (link && link.hostname !== window.location.hostname) {
    trackEvent('external_link_click', {
      url: link.href,
      text: link.textContent.trim()
    });
  }
});

// Initialize magic star effect
function initMagicStars() {
  const magicElements = document.querySelectorAll('.magic');
  
  magicElements.forEach(magic => {
    const magicText = magic.querySelector('.magic-text');
    if (!magicText) return;

    // Get existing star or create one
    let star = magic.querySelector('.magic-star');
    if (!star) {
      star = document.createElement('span');
      star.className = 'magic-star';
      star.innerHTML = `
        <svg viewBox="0 0 512 512">
          <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
        </svg>
      `;
      magic.insertBefore(star, magicText);
    }

    // Function to position star randomly around the text
    const positionStarRandomly = () => {
      const textRect = magicText.getBoundingClientRect();
      const magicRect = magic.getBoundingClientRect();
      
      // Get text dimensions relative to magic container
      const textLeft = textRect.left - magicRect.left;
      const textTop = textRect.top - magicRect.top;
      const textWidth = textRect.width;
      const textHeight = textRect.height;
      
      // Random position around the text (within a padding area)
      const padding = 30; // pixels of padding around text
      const minX = textLeft - padding;
      const maxX = textLeft + textWidth + padding;
      const minY = textTop - padding;
      const maxY = textTop + textHeight + padding;
      
      const randomX = Math.random() * (maxX - minX) + minX;
      const randomY = Math.random() * (maxY - minY) + minY;
      
      star.style.setProperty('--star-left', `${randomX}px`);
      star.style.setProperty('--star-top', `${randomY}px`);
      star.style.display = 'block';
      star.style.opacity = '0';
      
      // Trigger scale animation
      star.style.animation = 'none';
      setTimeout(() => {
        star.style.opacity = '0.8';
        star.style.animation = 'scale 400ms ease forwards, rotate 1000ms linear infinite';
      }, 10);
      
      // Hide star after a short duration (300-600ms)
      const visibleDuration = Math.random() * 300 + 300; // 300-600ms
      setTimeout(() => {
        star.style.opacity = '0';
        star.style.transition = 'opacity 200ms ease';
      }, visibleDuration);
    };

    // Initial position
    positionStarRandomly();

    // Reposition star at random intervals (between 400-800ms for faster flashing)
    const scheduleNextStar = () => {
      const delay = Math.random() * 400 + 400; // 400-800ms
      setTimeout(() => {
        positionStarRandomly();
        scheduleNextStar();
      }, delay);
    };

    // Start the random interval loop
    scheduleNextStar();
  });
}

// Initialize Case Study Carousel (Mobile)
function initCaseStudyCarousel() {
  const carousel = document.getElementById('caseStudyCarousel');
  const indicators = document.querySelectorAll('#caseStudyIndicators .carousel-indicator');
  const prevBtn = document.getElementById('caseStudyPrev');
  const nextBtn = document.getElementById('caseStudyNext');
  
  if (!carousel || indicators.length === 0) return;

  let currentSlide = 0;
  const totalSlides = carousel.children.length;
  
  // Touch/swipe variables
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let startTime = 0;

  function updateCarousel() {
    const translateX = -currentSlide * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  function goToSlide(slideIndex) {
    if (slideIndex < 0) slideIndex = totalSlides - 1;
    if (slideIndex >= totalSlides) slideIndex = 0;
    currentSlide = slideIndex;
    updateCarousel();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });

  // Touch/swipe events
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startTime = Date.now();
    isDragging = true;
    carousel.style.transition = 'none';
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    const translateX = -currentSlide * 100 + (diffX / carousel.offsetWidth) * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
  });

  carousel.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    carousel.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    
    const diffX = currentX - startX;
    const diffTime = Date.now() - startTime;
    const threshold = carousel.offsetWidth * 0.25; // 25% of width
    const velocity = Math.abs(diffX) / diffTime;
    
    if (Math.abs(diffX) > threshold || velocity > 0.5) {
      if (diffX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      updateCarousel(); // Snap back
    }
  });

  // Initialize
  updateCarousel();
}
