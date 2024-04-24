const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "Please Enter User Name"],
        },
        email: {
            type: String,
            required: [true, "Please Enter the Email Address"],
            unique: [true, "Email Address already taken"]
        },
        password: {
            type: String,
            required: [true, "Please Enter the Password"],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);
