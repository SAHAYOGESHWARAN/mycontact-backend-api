const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const mongoose = require("mongoose");

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    console.log("GET request to get all contacts");
    res.status(200).json(contacts);
});

// @desc Create a new contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    console.log("Contact created:", contact);
    res.status(201).json(contact);
});

// @desc Get a contact by ID
// @route GET /api/contacts/:id
// @access private
const getContactById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid ID format");
    }

    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // Ensure the contact belongs to the current user
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized access to this contact");
    }

    console.log(`GET request to get contact with ID ${id}`);
    res.status(200).json(contact);
});

// @desc Update a contact by ID
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid ID format");
    }

    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // Ensure the contact belongs to the current user
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized access to this contact");
    }

    // Update contact details
    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;

    const updatedContact = await contact.save();

    console.log(`PUT request to update contact with ID ${id}`);
    res.status(200).json(updatedContact);
});

// @desc Delete a contact by ID
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid ID format");
    }

    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // Ensure the contact belongs to the current user
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized access to this contact");
    }

    await contact.remove();

    console.log(`DELETE request to delete contact with ID ${id}`);
    res.status(200).json({ message: `Contact with ID ${id} deleted` });
});

// Export all functions
module.exports = {
    getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact,
};
