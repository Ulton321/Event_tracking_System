const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

// Book a ticket
exports.bookTicket = async (req, res) => {
    try {
        const { eventId, userId, quantity } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.seatCapacity < quantity) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const ticket = new Ticket({
            user: userId,
            event: eventId,
            quantity,
            bookingDate: new Date(),
        });

        await ticket.save();

        event.bookedSeats += quantity;
        event.seatCapacity -= quantity;
        await event.save();

        res.status(201).json({ message: 'Ticket booked successfully', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error booking ticket', error });
    }
};

// Validate QR code
exports.validateQRCode = async (req, res) => {
    try {
        const { qrCode } = req.params;

        const ticket = await Ticket.findOne({ qrCode });
        if (!ticket) {
            return res.status(404).json({ message: 'Invalid QR code' });
        }

        res.status(200).json({ message: 'QR code is valid', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error validating QR code', error });
    }
};