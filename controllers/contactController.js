const asyncHandler = require("express-async-handler") //Middleware
const Contact = require("../models/contactModel");

//@desc Get All Contacts
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})

//@desc Get Contacts By ID
//@route GET /api/contacts/id
//@access private
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact);
})

//@desc Create Contacts
//@route POST /api/contacts/
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The Request Body is", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fileds are Mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc Update Contacts
//@route PUT /api/contacts/id
//@access private
const UpdateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }

    if (contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other contacts")
    }

    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updateContact);
})

//@desc Delete Contacts
//@route DELETE /api/contacts/id
//@access private
const DeleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other contacts")
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});

module.exports = DeleteContact;


module.exports = { getContact, getContactById, createContact, UpdateContact, DeleteContact };