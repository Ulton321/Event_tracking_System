const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        console.log('Plain-text password during registration:', password); // Debugging log
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password during registration:', hashedPassword); // Debugging log

        // Save new user
        const user = new User({ name, email, password});
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// POST /api/users/login - Authenticate user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Log the plain-text password and hashed password
        console.log('Plain-text password:', password);
        console.log('Hashed password from database:', user.password);

        // Compare the plain-text password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});


router.post('/events', (req, res) => {
    const { name, date, location } = req.body;

    // Validate input
    if (!name || !date || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Simulate saving the event (replace with database logic)
    const newEvent = { id: Date.now(), name, date, location };
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
});


module.exports = router;