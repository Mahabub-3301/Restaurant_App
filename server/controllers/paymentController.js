const Stripe = require('stripe');
const Order = require('../models/Order');
const User = require('../models/User');


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
const createPaymentIntent = async (req, res) => {
  const { amount, currency = 'usd', metadata = {} } = req.body;
  
  try {
    // Validate amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents
      currency,
      metadata: {
        userId: req.user.userId.toString(),
        ...metadata
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Create order record
    const newOrder = new Order({
      user: req.user.userId,
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
      status: 'pending'
    });

    await newOrder.save();

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      orderId: newOrder._id
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

// Handle payment confirmation webhook
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle payment events
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await handlePaymentSuccess(paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      await handlePaymentFailure(failedPayment);
      break;
    // Add other event types as needed
  }

  res.status(200).json({ received: true });
};

// Helper: Handle successful payment
const handlePaymentSuccess = async (paymentIntent) => {
  try {
    const order = await Order.findOneAndUpdate(
      { paymentIntentId: paymentIntent.id },
      { 
        status: 'completed',
        paymentDetails: paymentIntent
      },
      { new: true }
    );

    if (order) {
      console.log(`Order ${order._id} completed successfully`);
      // Additional business logic (send confirmation email, etc.)
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
};

// Helper: Handle failed payment
const handlePaymentFailure = async (paymentIntent) => {
  try {
    await Order.findOneAndUpdate(
      { paymentIntentId: paymentIntent.id },
      { 
        status: 'failed',
        paymentDetails: paymentIntent,
        failureMessage: paymentIntent.last_payment_error?.message || 'Payment failed'
      }
    );
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
};

module.exports ={
  handlePaymentFailure,
  handlePaymentSuccess,
  createPaymentIntent,
  handleWebhook
}