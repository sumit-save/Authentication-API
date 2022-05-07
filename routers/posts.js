const express = require("express");
const { Verify } = require("../verify");


const router = new express.Router();


// Get a new post
router.get("/", Verify, (req, res) => {
    return res.status(200).json({
        title: "GYM",
        description: "BodyBuilding"
    });
});


module.exports = router;