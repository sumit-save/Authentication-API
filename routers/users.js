const express = require("express");
const controller = require("../controllers/usersController");


const router = new express.Router();


// SignUp a new user
router.post("/signin", (req, res) => {
    controller.SignIn(req, res);
});


// Signin user
router.post("/signup", (req, res) => {
    controller.SignUp(req, res);
});


module.exports = router;