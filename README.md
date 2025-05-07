# Event Ticketing System

This is a REST API for an Event Ticketing System built with Node.js, Express, and MongoDB. The API allows users to manage events, book tickets, and handle user authentication.

## Features

- Create, update, delete, and retrieve events
- Book tickets for events
- User registration and login
- QR code validation for ticket bookings

## Project Structure

```
event-ticketing-system
├── src
│   ├── app.js                # Entry point of the application
│   ├── config
│   │   └── db.js            # Database configuration and connection
│   ├── controllers
│   │   ├── eventController.js # Handles event-related requests
│   │   ├── ticketController.js # Handles ticket booking requests
│   │   └── userController.js  # Handles user authentication and management
│   ├── models
│   │   ├── Event.js          # Mongoose schema for Events
│   │   ├── Ticket.js         # Mongoose schema for Bookings
│   │   └── User.js           # Mongoose schema for Users
│   ├── routes
│   │   ├── eventRoutes.js    # Routes for event-related API endpoints
│   │   ├── ticketRoutes.js    # Routes for ticket-related API endpoints
│   │   └── userRoutes.js      # Routes for user-related API endpoints
│   └── utils
│       └── index.js          # Utility functions
├── package.json               # npm configuration file
├── .env                       # Environment variables
└── README.md                  # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd event-ticketing-system
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string and any other necessary environment variables.

## Usage

To start the server, run:
```
npm start
```

The API will be available at `http://localhost:3000`.

## API Reference

### Events

- **GET /api/events**: Retrieve all events
- **POST /api/events**: Create a new event
- **PUT /api/events/:id**: Update an event
- **DELETE /api/events/:id**: Delete an event

### Tickets

- **POST /api/tickets/book**: Book tickets for an event
- **POST /api/tickets/validate**: Validate a QR code for a ticket

### Users

- **POST /api/users/register**: Register a new user
- **POST /api/users/login**: Log in a user

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.