# Setup Instructions

## Overview
This site has been redesigned with the following features:
- Modern, clean layout with all requested sections
- Stripe payment processing for book purchases
- Resend integration for contact form submissions
- Datafast tracking with custom events
- Magic Marketer links automatically include `?ref=Lucy` parameter

## Required Setup Steps

### 1. Stripe Integration

1. Get your Stripe API keys from https://dashboard.stripe.com/apikeys
2. Update `app.js` line 3 with your Stripe publishable key:
   ```javascript
   const stripe = Stripe('pk_live_YOUR_STRIPE_PUBLISHABLE_KEY');
   ```

3. Set up a serverless function to create checkout sessions (see `api-example.js`):
   - Create `api/create-checkout-session.js` (for Vercel)
   - Set environment variable: `STRIPE_SECRET_KEY`
   - Set environment variable: `STRIPE_BOOK_PRICE_ID` (your Stripe Price ID for the book)

### 2. Resend Integration

1. Sign up for Resend at https://resend.com
2. Get your API key from https://resend.com/api-keys
3. Set up a serverless function (see `api-example.js`):
   - Create `api/contact.js` (for Vercel)
   - Set environment variable: `RESEND_API_KEY`
   - Update the `from` email with your verified sender
   - Update the `to` email with your recipient email

4. Update `app.js` line 9 if using a different endpoint:
   ```javascript
   const RESEND_API_URL = '/api/contact'; // or '/.netlify/functions/contact' for Netlify
   ```

### 3. Datafast Tracking

1. Get your Datafast tracking script from https://datafa.st/dashboard/689e895fdd54c989568c688f
2. Update `index.html` around line 305 with the actual Datafast script tag
3. The tracking is already set up to track:
   - Page views
   - Contact form submissions
   - Book purchase attempts
   - Link clicks (Magic Marketer, external links)
   - Scroll depth
   - Tab switches in Library section

### 4. Environment Variables

Create a `.env.local` file (or set in your hosting platform):
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_BOOK_PRICE_ID=price_...
RESEND_API_KEY=re_...
```

### 5. Magic Marketer Links

All links to Magic Marketer automatically include `?ref=Lucy` parameter. No additional setup needed.

## Customization

### Images
- Add your profile images to the `src/img/` directory
- Update image paths in HTML if needed

### Colors & Styling
- Update CSS variables in `src/style.css` to match your brand
- Primary color is currently `#0066cc` (blue)

### Content
- Update brand names, testimonials, and FAQ content in `index.html`
- Update social media links in the footer

## Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` and follow prompts
3. Add environment variables in Vercel dashboard

### Netlify
1. Push to GitHub
2. Connect repository in Netlify
3. Set build command: (none needed for static site)
4. Set publish directory: `/`
5. Add environment variables in Netlify dashboard

### GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Note: Serverless functions won't work on GitHub Pages - you'll need a separate service for API endpoints

## Testing

1. Test contact form submission
2. Test Stripe checkout flow
3. Verify Datafast events in dashboard
4. Check that Magic Marketer links include `?ref=Lucy`
5. Test responsive design on mobile devices

## Notes

- The site is fully responsive
- All sections are included as specified
- The Library section (Articles/Videos/Podcast) is set up but needs content added
- Book purchase flow requires backend API endpoint for Stripe checkout session creation

