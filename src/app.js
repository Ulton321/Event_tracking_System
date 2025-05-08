
require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// Debug environment variables
console.log('DB_URI:', process.env.DB_URI);

const dbUri = process.env.DB_URI;
if (!dbUri) {
    console.error('DB_URI is not defined in the environment variables.');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON requests
app.use(express.json());

// Import and register routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes	
const eventRoutes = require('./routes/eventRoutes'); // Import event routes
const bookingRoutes = require('./routes/bookingRoutes'); // Import booking routes
const userRoutes = require('./routes/userRoutes'); // Import user routes
app.use('/api/events', eventRoutes); // Register event routes
app.use('/api/bookings', bookingRoutes); // Register booking routes
app.use('/api/users', userRoutes); // Register user routes
app.use('/api/auth', authRoutes); // Register auth routes	
// Default route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Event Ticketing System!');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});