const mongoose = require('mongoose');

const signature = new mongoose.Schema({
    signatureData: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    // Other fields related to the digital signature
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'signature' });

const DigitalSignature = mongoose.model('Signature', signature);

module.exports = DigitalSignature;