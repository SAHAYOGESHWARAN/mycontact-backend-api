const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/useerModule");
// @desc Register a user
// @route POST /api/contacts
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400).json({ message: "Please fill in all fields" });
    }
    const userAvailabale = await user.findOne(email)
    if(userAvailable){
        res.status(400).json({ message: "Email already in use" });
    }

    //hash password 
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashed Password:", hashedPassword);
    res.json({message:"Register the user"});
    
});

// @desc login a user
// @route POST /api/contacts
// @access public
const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "Login user" });
});


// @desc  Current user info
// @route POST /api/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user information" });
});

module.exports = {registerUser,loginUser,currentUser};