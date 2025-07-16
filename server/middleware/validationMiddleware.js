const { body, validationResult } = require('express-validator');

// User registration validation
const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

// User login validation
const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

// Payment validation
const validatePayment = [
  body('amount')
    .isFloat({ min: 0.5 })
    .withMessage('Amount must be at least 0.5')
];

// Middleware to handle validation errors
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  handleValidation,
  validateLogin,
  validatePayment,
  validateRegister
}