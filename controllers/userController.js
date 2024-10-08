const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModle");
require('dotenv').config();

// @desc Register a user
// @route POST /api/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if the user already exists
    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed Password: ${hashedPassword}`);

    // Create a new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    console.log(`User created: ${user}`);

    // Check if the user was created successfully
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

// @desc Login a user
// @route POST /api/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email: email });
    
    // Check if user exists
    if (user && await bcrypt.compare(password, user.password)) {
        // Generate JWT token
        const accessToken = jwt.sign(
            {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            process.env.ACCESS_TOKEN_SECRET, // Corrected variable name
            { expiresIn: "21h" }
        );

        res.json({
            accessToken
        });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// @desc Current user info
// @route POST /api/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
