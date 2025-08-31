import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, me, logout,home } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post(
  '/register',
  [
    body('username').isString().trim().isLength({ min: 3 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').optional().isString().trim()
  ],
  register
);

router.post(
  '/login',
  [
    body('identifier').isString().trim(), // email or username
    body('password').isString().isLength({ min: 6 })
  ],
  login
);

router.get('/me', protect, me);
router.post('/logout', logout);
// Home route for testing purposes
router.get('/home',protect, home);

export default router;
