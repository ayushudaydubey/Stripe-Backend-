import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const routes = express.Router();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// Payment route
routes.post('/pay-now', async (req, res) => {
  const { product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: product.name,
              images: [product.image],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',

      // Redirect back to backend first, then backend forwards to frontend
      success_url: 'https://stripe-backend-k7a0.onrender.com/stripe-success',
      cancel_url: 'https://stripe-backend-k7a0.onrender.com/stripe-cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Redirect handler for success
routes.get('/stripe-success', (req, res) => {
  res.redirect('https://stripe-frontend-sooty.vercel.app/?status=success');
});

// Redirect handler for cancel
routes.get('/stripe-cancel', (req, res) => {
  res.redirect('https://stripe-frontend-sooty.vercel.app/?status=cancel');
});

export default routes;
