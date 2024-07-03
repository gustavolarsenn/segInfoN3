const jwt = require('jsonwebtoken');

// Define your secret key
const secretKey = 'secret';

// Define the token to be verified
const token = 'c59c9fdfbc3ba852b2aa5a1496ae70e10e161c9a50ccdfd366bf6e8c668d7be0';

try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    console.log('Token is valid');
    console.log(decoded); // Decoded token payload
} catch (error) {
    console.error('Token verification failed:', error.message);
}