const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { validateRegister, validateLogin, handleValidation } = require('../middleware/validationMiddleware');
const { authenticate } = require('../middleware/authMiddleware');
const Order = require('../models/Booking')

const router = express.Router();


// Public routes
router.post('/register', validateRegister, handleValidation, register);
router.post('/login', validateLogin, handleValidation, login);

// Protected routes
router.get('/profile', authenticate, getProfile);

router.get('/orders/:userId', authenticate,async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch user orders' });
  }
});

module.exports=router;