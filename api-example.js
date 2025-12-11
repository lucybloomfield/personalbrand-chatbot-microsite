// Example serverless function for Resend API integration
// This is an example that you can adapt for your hosting platform (Vercel, Netlify, AWS Lambda, etc.)

// For Vercel: Save this as api/contact.js
// For Netlify: Save this as netlify/functions/contact.js
// For AWS Lambda: Adapt to Lambda handler format

const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Example for Vercel serverless function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, businessName, interest, message } = req.body;

    // Validate required fields
    if (!name || !email || !interest || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Contact Form <contact@yourdomain.com>', // Replace with your verified sender
        to: ['your-email@yourdomain.com'], // Replace with your email
        replyTo: email,
        subject: `New ${interest} Inquiry from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Business Name:</strong> ${businessName || 'Not provided'}</p>
          <p><strong>Interest:</strong> ${interest}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send email');
    }

    const data = await response.json();

    // Optionally, save to database (e.g., Supabase, MongoDB, etc.)
    // await saveToDatabase({ name, email, businessName, interest, message, timestamp: new Date() });

    return res.status(200).json({ 
      success: true, 
      messageId: data.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send message',
      details: error.message 
    });
  }
}

// Example for Stripe Checkout Session creation
// Save as api/create-checkout-session.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { product } = req.body;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_BOOK_PRICE_ID, // Replace with your actual Stripe Price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        product: product || 'book',
        source: 'website'
      }
    });

    return res.status(200).json({ sessionId: session.id });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    });
  }
}

