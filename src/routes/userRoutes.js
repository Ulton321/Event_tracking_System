const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// POST /api/users/login - Authenticate user and return a JWT token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Log the user object for debugging
        console.log('User found:', user);

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch); // Log the result of password comparison

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;