const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add Contact Name"],
        },
        email: {
            type: String,
            required: [true, "Please add Contact Email Address"],
        },
        phone: {
            type: String,
            required: [true, "Please add Contact Phone Number"],
        },
    },
    {
        timestamp: true,
    }
);

module.exports = mongoose.model("Contact", contactSchema);
