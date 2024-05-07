const express = require('express');
const router = express.Router();

const User = require('../models/userModel');

// Import user controller functions
const {
    loginUser,
    signupUser,
    getUserProfile,
    deleteUserProfile,
    updateUserProfile
} = require('../controllers/userController');

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

// Get user profile
router.get('/profile', getUserProfile);

// Delete user profile
router.delete('/profile', deleteUserProfile);

// Update user profile
router.put('/profile',  updateUserProfile);

module.exports = router;
