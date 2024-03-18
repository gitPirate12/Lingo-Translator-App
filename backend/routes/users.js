const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete user profile
router.delete('/profile', auth, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.user.id);
    res.json({ msg: 'User profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    // Retrieve user from database
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user details
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    // Save updated user details
    await user.save();

    res.json({ msg: 'User profile updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch(error) {
        return res.status(401).json({ message: "unauthorized"});
    }
};

module.exports = verifyToken;

