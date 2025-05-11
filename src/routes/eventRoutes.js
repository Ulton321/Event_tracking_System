const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Import the Event model
const { authenticate } = require('../middleware/authenticate'); // Middleware to verify JWT

// GET /api/events - Return all events with filtering, sorting, and pagination
router.get('/', async (req, res) => {
    try {
        const { category, date, page = 1, limit = 10, sort = 'date' } = req.query;

        // Filter by category or date if provided
        const filter = {};
        if (category) filter.category = category;
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            filter.date = { $gte: startOfDay, $lte: endOfDay };
        }

        // Pagination and Sorting
        const totalEvents = await Event.countDocuments(filter);
        const events = await Event.find(filter)
            .sort(sort === 'price' ? { price: 1 } : { date: 1 }) // Sort by price or date
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            metadata: {
                totalEvents,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalEvents / limit),
            },
            events,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
});

// GET /api/events/:id - Return a single event's details
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
});

// POST /api/events - Create a new event (admin only)
router.post('/', authenticate, async (req, res) => {
    try {
        console.log('Request body:', req.body); // Debugging log

        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { title, description, category, venue, date, time, seatCapacity, price, bookedSeats } = req.body;

        // Validate input
        if (!title || !description || !category || !venue || !date || !time || !seatCapacity || !price || bookedSeats === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create and save the event
        const event = new Event(req.body);
        await event.save();

        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Error creating event', error });
    }
});

module.exports = router;