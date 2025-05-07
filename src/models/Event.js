const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seatCapacity: {
        type: Number,
        required: true
    },
    bookedSeats: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;