const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

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