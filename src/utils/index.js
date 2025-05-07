// This file contains utility functions, such as generating JWT tokens and handling error responses.

const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const handleErrorResponse = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({ success: false, message });
};

module.exports = {
    generateToken,
    handleErrorResponse,
};