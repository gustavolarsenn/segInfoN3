const mongoose = require('mongoose');

const signature = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    publicKey: {
        type: String,
        required: true
    },
    privateKey: {
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