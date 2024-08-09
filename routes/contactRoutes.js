const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("GET request to the root route");
    res.status(200).json({ message: "get all contacts" });
});

module.exports = router;
