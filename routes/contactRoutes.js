const express = require("express");
const router = express.Router();

// GET request to retrieve all contacts
router.get("/", (req, res) => {
    console.log("GET request to the root route");
    res.status(200).json({ message: "get all contacts" });
});

// POST request to create a new contact
router.post("/", (req, res) => {
    console.log("POST request to create a new contact");
    res.status(201).json({ message: "create a new contact" });
});

// PUT request to update an existing contact
router.put("/:id", (req, res) => {
    console.log(`PUT request to update contact with id ${req.params.id}`);
    res.status(200).json({ message: `update contact with id ${req.params.id}` });
});

// DELETE request to delete a contact
router.delete("/:id", (req, res) => {
    console.log(`DELETE request to delete contact with id ${req.params.id}`);
    res.status(200).json({ message: `delete contact with id ${req.params.id}` });
});

module.exports = router;
