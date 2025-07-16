const express = require('express');
const { createPaymentIntent, handleWebhook } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');
const { validatePayment, handleValidation } = require('../middleware/validationMiddleware');

const router = express.Router();

// Protected route for creating payment intents
router.post('/create-intent', authenticate, validatePayment, handleValidation, createPaymentIntent);

// Webhook endpoint (no authentication)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports=router;