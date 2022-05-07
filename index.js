const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");


const PORT = process.env.PORT || 8080;


const app = express();


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes
const usersRouters = require("./routers/users");
app.use("/users", usersRouters);
const postsRoutes = require("./routers/posts");
app.use("/posts", postsRoutes);


// Connect Database with MongoDB Atlas
mongoose.connect(process.env.DATABASE_URL, (err) => {
    if (err) throw err;
    console.log("MongoDB Database Connected Successfully !!!");
});


// Server Started On Localhost:8080
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server Started On Localhost:${PORT}`);
});