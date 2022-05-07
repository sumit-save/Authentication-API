const mongoose = require("mongoose");


const usersSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, required: [true, "{PATH} is Required"] },
    lastName: { type: String, trim: true, required: [true, "{PATH} is Required"] },
    emailId: { type: String, trim: true, required: [true, "{PATH} is Required"] },
    mobileNo: { type: String, trim: true, required: [true, "{PATH} is Required"] },
    password: { type: String, trim: true, required: [true, "{PATH} is Required"] },
    createdBy: { type: String, trim: true, required: [true, "{PATH} is Required"] },
    createdAt: { type: Date, trim: true, required: [true, "{PATH} is Required"] },
});


module.exports = mongoose.model("users", usersSchema);