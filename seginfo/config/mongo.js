const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://williamgl02:7vV5wxWTyGKciI5a@seginfo.43i0xz8.mongodb.net/seginfo?retryWrites=true&w=majority&appName=seginfo',);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
        process.exit(1); // Exit the process with an error code
    }
};

module.exports = connectToMongoDB;