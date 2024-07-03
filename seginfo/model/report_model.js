const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // Reference to Digital Signature
    signature: {
        type: String,
    },
    validated: {
        type: Boolean,
        default: false
    },
    signedById: {
        type: String,
    },
    createdById: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'report' });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;