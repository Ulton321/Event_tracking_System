const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Route to book tickets
router.post('/book', ticketController.bookTicket);

// Route to validate QR code
router.get('/validate/:qrCode', ticketController.validateQRCode);

module.exports = router;