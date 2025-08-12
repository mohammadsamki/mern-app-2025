import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import asyncHandler from '../middleware/asyncHandler.js';

// GET /api/users
export const getUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ count: users.length, users });
});

// GET /api/users/:id
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
});

// POST /api/users
export const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { name, username, email, password, role } = req.body;

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) return res.status(409).json({ message: 'Email or username already in use' });

  const hashed = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    username,
    email,
    password: hashed,
    role: role && ['user', 'admin'].includes(role) ? role : 'user'
  });

  res.status(201).json({ user });
});

// PATCH /api/users/:id
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('+password');
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { name, username, email, password, role } = req.body;

  if (name !== undefined) user.name = name;
  if (username !== undefined) user.username = username.toLowerCase();
  if (email !== undefined) user.email = email.toLowerCase();
  if (role !== undefined && ['user', 'admin'].includes(role)) user.role = role;
  if (password) user.password = await bcrypt.hash(password, 12);

  await user.save();
  res.json({ user: user.toJSON() });
});

// DELETE /api/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await user.deleteOne();
  res.json({ message: 'User deleted' });
});
