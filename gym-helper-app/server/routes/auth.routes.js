const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const User = require('../models/User');

// GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('jwt_token_name'); 
  res.json({ message: 'Logout successful' });
});

module.exports = router;