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
    // Reference to Digital Signature
    signature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signature',
    },
    validated: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'report' });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;