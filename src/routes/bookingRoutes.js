const express = require('express');
const router = express.Router();
const Booking = require('../models/Ticket'); // Assuming Ticket is used for bookings
const { authenticate } = require('../middleware/authenticate'); // Middleware for authentication

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
        const { eventId, seats } = req.body;

        // Validate input
        if (!eventId || !seats) {
            return res.status(400).json({ message: 'Event ID and seats are required' });
        }

        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check seat availability
        if (event.seatCapacity - event.bookedSeats < seats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // Update booked seats
        event.bookedSeats += seats;
        await event.save();

        // Create the booking
        const booking = new Booking({
            userId: req.user.id, // Assuming `authenticate` middleware adds `req.user`
            eventId,
            seats,
        });
        await booking.save();

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Error creating booking', error });
    }
});


module.exports = router;