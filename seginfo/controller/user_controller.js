const User = require('../model/user_model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const signatureController = require('./signature_controller');


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error: ${error}`});
    }
}

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, type } = req.body;

        // Check if the name already exists
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: 'name already exists' });
        }

        // Create a new user
        const newUser = new User({ name, email, password, type});

        // Generate a salt and hash the password
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto
            .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
            .toString('hex');

        newUser.password = hashedPassword;
        newUser.salt = salt;

        // Save the user to the database
        await newUser.save();

        await signatureController.ensureKeysAndCreateSignature(newUser._id, newUser.name);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Find the user by name
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify the password
        const hashedPassword = crypto
            .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
            .toString('hex');

        if (hashedPassword !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id ,name: user.name}, 'secret', { expiresIn: '1h' });

        res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: 3 * 60 * 60 * 500, // 3hrs in ms
                    });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, 'secret');
        const user = await User.findById(decoded._id);
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getCurrentUser
};