const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/dbConnection');
const app = express();
const dotenv = require('dotenv').config();

connectDB();
const Port = process.env.PORT || 3030

// app.get("/api/contacts/", (req, res) => {
//     res.json({ message: 'Get All Contacts' });
// })

app.use(express.json()); //Body Parser Middleware
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(Port, () => {
    console.log(`Server is Listening on Port ${Port}`)
})