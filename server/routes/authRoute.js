import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Auth from '../middleware/auth.js';

const router = express.Router();

// Admin registration
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (role !== 'Admin') {
    return res.status(403).json({ message: 'Only admins can register' });
  }

  const hashedPassword = Auth.hashPassword(password);
  const user = new User({ username, password: hashedPassword, role });

  try {
    await user.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin', error });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, role: 'Admin' });
  if (!user || !Auth.comparePassword(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router;
