const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: [true, 'Path `quantity` is required.'],
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Path `event` is required.'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Path `user` is required.'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Ticket', ticketSchema);