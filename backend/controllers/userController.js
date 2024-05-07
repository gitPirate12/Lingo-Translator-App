const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }


// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.login(email, password)
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  
  }

// Signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.signup(email, password)

      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.user.id);
        res.json({ msg: 'User profile deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;

        // Retrieve user from database
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user details
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;

        // Save updated user details
        await user.save();

        res.json({ msg: 'User profile updated successfully', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    loginUser,
    signupUser,
    getUserProfile,
    deleteUserProfile,
    updateUserProfile
}
