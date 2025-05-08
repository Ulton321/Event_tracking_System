const bcrypt = require('bcrypt');

// Define a plain-text password
const plainTextPassword = 'password123';

// Define a hashed password (replace this with the one from your database)
const hashedPasswordFromDB = '$2b$10$4X1OBPwa0WEyCZLbo82J0.kySqWJBKu3OIhR.lkRz1SLLeHj10Dlq'; // Replace with the new hashed password

// Hash the plain-text password
bcrypt.hash(plainTextPassword, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed password:', hash);
    }
});

// Compare the plain-text password with the hashed password
bcrypt.compare(plainTextPassword, hashedPasswordFromDB, (err, isMatch) => {
    if (err) {
        console.error('Error comparing passwords:', err);
    } else {
        console.log('Passwords match:', isMatch);
    }
});