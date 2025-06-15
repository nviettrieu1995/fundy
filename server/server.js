import express from 'express';
import bodyParser from 'body-parser';
import Stripe from 'stripe';
import { users, transactions } from './data.js';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

app.use(bodyParser.json());


// Payment intent creation endpoint
app.post('/api/payments/create', async (req, res) => {
  const { amount, currency, userId } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { userId },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error', err);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Webhook endpoint
app.post('/api/payments/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err) {
    console.error('Webhook signature verification failed', err);
    return res.status(400).send('Webhook Error');
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;
    const user = users.find(u => u.id === userId);
    if (user) {
      user.membership = 'Professional';
      user.credits = (user.credits || 0) + (paymentIntent.amount / 100);
    }
    transactions.push({
      id: paymentIntent.id,
      userId,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      createdAt: new Date().toISOString(),
    });
  }

  res.json({ received: true });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

