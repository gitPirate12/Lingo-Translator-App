const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      email,
      password,
      firstName,
      lastName
    });    
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Account not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
   
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // Get user profile                                   // have some errors
// router.get('/profile', async (req, res) => {
//   try {
//     // Get user ID from JWT token
//     const userId = req.user.id;
//     // Fetch user profile from database
//     const user = await User.findById(userId).select('-password');
//     // Return user profile
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // Update user profile
// router.put('/profile', async (req, res) => {
//   try {
//     // Get user ID from JWT token
//     const userId = req.user.id;
//     // Extract updated profile data from request body
//     const { firstName, lastName, city } = req.body;
//     // Update user profile in the database
//     await User.findByIdAndUpdate(userId, { firstName, lastName, city });
//     // Fetch updated user profile from database
//     const updatedUser = await User.findById(userId).select('-password');
//     // Return updated user profile
//     res.json(updatedUser);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
