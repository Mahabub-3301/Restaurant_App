import express from 'express';
import { 
  createPaymentIntent, 
  handleWebhook 
} from '../controllers/paymentController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validatePayment, handleValidation } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Protected route for creating payment intents
router.post('/create-intent', authenticate, validatePayment, handleValidation, createPaymentIntent);

// Webhook endpoint (no authentication)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;