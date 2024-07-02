const mongoose = require('mongoose');

// Construct the connection string
const connectionString = `mongodb+srv://williamgl02:7vV5wxWTyGKciI5a@seginfo.43i0xz8.mongodb.net/?retryWrites=true&w=majority&appName=seginfo`;

// Connect to MongoDB
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        // Your code here
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

module.exports = mongoose;