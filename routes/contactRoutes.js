const express = require('express');
const app = express();
const router = express.Router();

const { getContact, getContactById,  createContact, UpdateContact, DeleteContact } = require("../controllers/contactController");


router.route("/").get(getContact)

router.route("/:id").get(getContactById)

router.route("/").post(createContact)

router.route("/:id").put(UpdateContact)

router.route("/:id").delete(DeleteContact)

module.exports = router;