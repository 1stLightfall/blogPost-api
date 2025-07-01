const express = require('express');
const router = express.Router();

// Import your controller functions
const { register, login } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login user and return token
// @access  Public
router.post('/login', login);

// Export the router so app.js can use it
module.exports = router;
