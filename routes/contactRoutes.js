const express = require("express");
const router = express.Router();
const{getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact} = require("../controllers/contactController");



// GET request to retrieve all contacts
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get( getContactById).put(updateContact).delete(deleteContact);


module.exports = router;