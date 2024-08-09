//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = (req, res) => {
    console.log("GET request to get all contacts");
    res.status(200).json({ message: "Get all contacts" });
};

//@desc Create a new contact
//@route POST /api/contacts
//@access public
const createContact = (req, res) => {
    console.log("POST request to create a new contact");
    res.status(201).json({ message: "Create a new contact" });
};

//@desc Get a contact by ID
//@route GET /api/contacts/:id
//@access public
const getContactById = (req, res) => {
    const { id } = req.params;
    console.log(`GET request to get contact with ID ${id}`);
    res.status(200).json({ message: `Get contact with ID ${id}` });
};

//@desc Update a contact by ID
//@route PUT /api/contacts/:id
//@access public
const updateContact = (req, res) => {
    const { id } = req.params;
    console.log(`PUT request to update contact with ID ${id}`);
    res.status(200).json({ message: `Update contact with ID ${id}` });
};

//@desc Delete a contact by ID
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = (req, res) => {
    const { id } = req.params;
    console.log(`DELETE request to delete contact with ID ${id}`);
    res.status(200).json({ message: `Delete contact with ID ${id}` });
};

// Export all functions
module.exports = {
    getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact,
};
