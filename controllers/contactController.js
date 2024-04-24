const asyncHandler = require("express-async-handler") //Middleware
const Contact = require("../models/contactModel");

//@desc Get All Contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

//@desc Get Contacts By ID
//@route GET /api/contacts/id
//@access public
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
//@access public
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
    });
    res.status(201).json(contact);
});

//@desc Update Contacts
//@route PUT /api/contacts/id
//@access public
const UpdateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }

    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updateContact);
})

//@desc Delete Contacts
//@route DELETE /api/contacts/id
//@access public
const DeleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).send("Contact Deleted Successfully");
});

module.exports = DeleteContact;


module.exports = { getContact, getContactById, createContact, UpdateContact, DeleteContact };