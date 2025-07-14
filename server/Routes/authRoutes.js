import express from 'express';
import { 
  register, 
  login, 
  getProfile 
} from '../controllers/authController.js';
import { 
  validateRegister, 
  validateLogin, 
  handleValidation 
} from '../middleware/validationMiddleware.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, handleValidation, register);
router.post('/login', validateLogin, handleValidation, login);

// Protected routes
router.get('/profile', authenticate, getProfile);

export default router;