import express from 'express';
import {
  showRegisterPage,
  showLoginPage,
  registerUser,
  loginUser,
  logoutUser
} from '../controllers/authController.js';

const router = express.Router();

// Render auth pages
router.get('/register', showRegisterPage);
router.get('/login', showLoginPage);

// Handle auth form submissions
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;