import { Router } from 'express';
import { body } from 'express-validator';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// all user CRUD is protected + admin-only by default
router.use(protect, authorize('admin'));

router.get('/', getUsers);
router.get('/:id', getUser);

router.post(
  '/',
  [
    body('username').isString().trim().isLength({ min: 3 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').optional().isString().trim(),
    body('role').optional().isIn(['user', 'admin'])
  ],
  createUser
);

router.patch(
  '/:id',
  [
    body('username').optional().isString().trim().isLength({ min: 3 }),
    body('email').optional().isEmail().normalizeEmail(),
    body('password').optional().isLength({ min: 6 }),
    body('name').optional().isString().trim(),
    body('role').optional().isIn(['user', 'admin'])
  ],
  updateUser
);

router.delete('/:id', deleteUser);

export default router;
