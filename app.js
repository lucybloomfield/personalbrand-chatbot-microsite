// Initialize Stripe
// NOTE: Replace with your actual Stripe publishable key
// For production, use your live key. For testing, use your test key.
const STRIPE_PUB_KEY = 'pk_live_YOUR_STRIPE_PUBLISHABLE_KEY'; // Change to your Stripe key
const stripe = STRIPE_PUB_KEY && STRIPE_PUB_KEY.includes('pk_') 
  ? Stripe(STRIPE_PUB_KEY) 
  : null;

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

  // Initialize Stripe checkout
  initStripeCheckout();

  // Initialize tab switching
  initTabs();

  // Initialize smooth scroll for anchor links
  initSmoothScroll();
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

// Initialize Stripe checkout for book purchase
function initStripeCheckout() {
  const buyBookBtn = document.getElementById('buy-book-btn');
  const paymentModal = document.getElementById('payment-modal');
  const closeModal = document.querySelector('.close-modal');

  if (!buyBookBtn) return;

  if (!stripe) {
    buyBookBtn.textContent = 'Book Coming Soon';
    buyBookBtn.disabled = true;
    console.warn('Stripe not initialized. Please add your Stripe publishable key.');
    return;
  }

  buyBookBtn.addEventListener('click', async function() {
    // Track book purchase intent
    trackEvent('book_purchase_intent');

    // Show loading state
    const originalText = buyBookBtn.textContent;
    buyBookBtn.textContent = 'Loading...';
    buyBookBtn.disabled = true;

    try {
      // Create Stripe checkout session
      // NOTE: You'll need to set up a backend endpoint to create the checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: 'book',
          successUrl: window.location.origin + '/success?session_id={CHECKOUT_SESSION_ID}',
          cancelUrl: window.location.origin + '#work-together'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      if (!sessionId) {
        throw new Error('No session ID returned');
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }

      trackEvent('book_checkout_started');

    } catch (error) {
      console.error('Error creating checkout session:', error);
      
      // Reset button
      buyBookBtn.textContent = originalText;
      buyBookBtn.disabled = false;
      
      // Show user-friendly error
      alert('Sorry, there was an error setting up the checkout. Please try again later or contact me directly.');
      
      trackEvent('book_checkout_error', {
        error: error.message
      });
    }
  });

  // Close modal
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      paymentModal.classList.add('hidden');
    });
  }

  // Close modal when clicking outside
  paymentModal.addEventListener('click', function(e) {
    if (e.target === paymentModal) {
      paymentModal.classList.add('hidden');
    }
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
