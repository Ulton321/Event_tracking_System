const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Get user profile route
router.get('/profile', getUserProfile);

module.exports = router;