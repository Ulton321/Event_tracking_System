const express = require('express');
const router = express.Router();
const Booking = require('../models/Ticket'); // Assuming Ticket is used for bookings
const { authenticate } = require('../middleware/authenticate'); // Middleware for authentication
const Event = require('../models/Event'); // Import the Event model
const Ticket = require('../models/Ticket');

// GET /api/bookings - Return all bookings for the logged-in user
router.get('/', authenticate, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('event', 'title date');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
});

// GET /api/bookings/:id - Return a specific booking's detail (only for the logged-in user)
router.get('/:id', authenticate, async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id }).populate('event', 'title date');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error });
    }
});

router.post('/', authenticate, async (req, res) => {
    try {
        const { quantity, eventId } = req.body;

        // Validate input
        if (!quantity || !eventId) {
            return res.status(400).json({ message: 'Quantity and event ID are required' });
        }

        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Create the ticket
        const ticket = new Ticket({
            quantity,
            event: eventId,
            user: req.user.id, // Assuming `authenticate` middleware adds `req.user`
        });

        await ticket.save();

        res.status(201).json({ message: 'Ticket created successfully', ticket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Error creating ticket', error });
    }
});


module.exports = router;

