import { Router } from 'express';
import { body } from 'express-validator';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updatePassword
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// all user CRUD is protected + admin-only by default
// router.use(protect, authorize('admin'));

router.get('/',authorize, getUsers);
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
router.put('/updatePassword', protect, updatePassword);
router.put("/update",protect, updateUser);

router.delete('/:id', deleteUser);

export default router;
