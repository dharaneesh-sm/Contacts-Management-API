const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//@desc Register a User
//@route POST /api/register
//@access public
const userRegister = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory")
    }

    try {
        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(400);
            throw new Error("User Already Registered");
        }

        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
        });

        console.log(`User Created ${user}`);
        if (user) {
            return res.status(201).json({ _id: user.id, email: user.email });
        }
        else {
            res.status(400);
            throw new error("User data is not Valid");
        }
    }
    catch (error) {
        console.log("error", error);
        res.status(500).send({ error })
    }
    // res.json({ message: "Register the user" });
});

//@desc Login User
//@route POST /api/login
//@access public
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    userName: user.userName,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401).json({ error: "Email or Password is not Valid" });
    }
})

//@desc Current User Info
//@route GET /api/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})


module.exports = { userRegister, userLogin, currentUser }