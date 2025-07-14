import { body, validationResult } from 'express-validator';

// User registration validation
export const validateRegister = [
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
export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

// Payment validation
export const validatePayment = [
  body('amount')
    .isFloat({ min: 0.5 })
    .withMessage('Amount must be at least 0.5')
];

// Middleware to handle validation errors
export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};