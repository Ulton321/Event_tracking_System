require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event'); // Import the Event model

const dbUri = process.env.DB_URI;

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const seedEvents = async () => {
    try {
        await Event.deleteMany(); // Clear existing events

        const events = [
            {
                title: "Music Concert",
                description: "A live music concert featuring top artists.",
                category: "Music",
                venue: "City Arena",
                date: new Date("2025-05-07T18:00:00.000Z"),
                time: "18:00",
                seatCapacity: 100,
                bookedSeats: 20,
                price: 50
            },
            {
                title: "Art Exhibition",
                description: "An exhibition showcasing modern art.",
                category: "Art",
                venue: "Art Gallery",
                date: new Date("2025-06-01T10:00:00.000Z"),
                time: "10:00",
                seatCapacity: 50,
                bookedSeats: 10,
                price: 30
            }
        ];

        await Event.insertMany(events);
        console.log('Sample events added successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding events:', error);
        mongoose.connection.close();
    }
};

seedEvents();