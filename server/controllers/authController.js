import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import asyncHandler from '../middleware/asyncHandler.js';

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
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

  const token = signToken(user._id);
  res.status(201).json({ user, token });
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { identifier, password } = req.body; // identifier can be email or username

  const user = await User.findOne({
    $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }]
  }).select('+password');

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user._id);

  // Optionally set httpOnly cookie
  // res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7*24*60*60*1000 });

  res.json({ user: user.toJSON(), token });
});

// GET /api/auth/me
export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

// POST /api/auth/logout  (if using cookie auth)
export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

export const home = asyncHandler(async (req, res) => {
    console.log(req.user); // Log the user object for debugging
    try {
        res.json({ message: 'Welcome to the home page!',user: req.user });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        
    }
  
});