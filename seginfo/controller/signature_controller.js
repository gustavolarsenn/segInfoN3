const DigitalSignature = require('../model/signature_model');

exports.createSignature = async (signatureData) => {
    const signature = new DigitalSignature({ signatureData });
    return await signature.save();
};

// Additional methods for retrieving, updating, and deleting signatures