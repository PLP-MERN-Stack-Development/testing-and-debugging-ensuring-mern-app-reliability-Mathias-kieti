
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../utils/auth');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    return res.status(201).json({ _id: user._id, email: user.email, token: generateToken(user) });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await user.matchPassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ _id: user._id, email: user.email, token: generateToken(user) });
});

module.exports = router;
