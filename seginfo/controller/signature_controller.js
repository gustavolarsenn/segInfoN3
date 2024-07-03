const crypto = require('crypto');
const User = require('../model/user_model'); // Your user model
const Signature = require('../model/signature_model'); // Your signature model

// Function to generate a key pair
function generateKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
}

// Function to create a signature
async function createSignature(userId, data) {
    let user = await User.findById(userId);
    let signature = await Signature.findOne({ user_id: userId });
    const privateKey = decryptPrivateKey(signature.privateKey, user.salt); // Decrypt the private key
    const signer = crypto.createSign('sha256');
    signer.update(data);
    signer.end();
    return signer.sign(privateKey, 'hex');
}

async function validateSignature(data, report) {
    const signature = await Signature.findOne({ user_id: report.signedById });
    const verifier = crypto.createVerify('sha256');
    verifier.update(data);
    verifier.end();
    return verifier.verify(signature.publicKey, report.signature, 'hex');
}

// Main function to ensure user has keys and to create a signature
async function ensureKeysAndCreateSignature(userId, data) {
    try {
        let user = await User.findById(userId);
    
        // Check if the user already has keys
        if (!user.publicKey || !user.privateKey) {
            // Generate keys if not present
            const { publicKey, privateKey } = generateKeyPair();
    
            // Store the keys securely with the user (this is pseudocode; implement according to your storage solution)
            user.publicKey = publicKey;
            user.privateKey = privateKey; // Ensure this is stored securely!
            
            const encryptedPrivateKey = encryptPrivateKey(privateKey, user.salt); // Encrypt the private key

            const newSignature = new Signature({
                user_id: userId,
                publicKey,
                privateKey: encryptedPrivateKey,
            }).save();
            return "User keys generated and stored securely";
        }
    } 
    catch (error) {
        console.error('Error ensuring keys:', error);
        return { message: 'Error ensuring keys', error: error };
    }
}

// Function to encrypt the private key
function encryptPrivateKey(privateKey, passphrase) {
    const cipher = crypto.createCipher('aes-256-cbc', passphrase);
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Function to decrypt the private key
function decryptPrivateKey(encryptedPrivateKey, passphrase) {
    const decipher = crypto.createDecipher('aes-256-cbc', passphrase);
    let decrypted = decipher.update(encryptedPrivateKey, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = {
    ensureKeysAndCreateSignature,
    createSignature,
    validateSignature
};