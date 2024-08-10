const asyncHandler = require("express-async-handler")
// @desc Register a user
// @route POST /api/contacts
// @access public
const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: "Register the user" });
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