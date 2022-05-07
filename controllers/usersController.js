const model = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");


const SignIn = async (req, res) => {

    const { firstName, lastName, emailId, mobileNo, password } = req.body;

    try {

        // Check Email Already Exist
        const emailExist = await model.findOne({ emailId: emailId });
        if (emailExist) {
            return res.status(400).json({ message: "EmailId Already Exists"});
        }

        // Check Mobile Already Exist
        const mobileExist = await model.findOne({ mobileNo: mobileNo });
        if (mobileExist) {
            return res.status(400).json({ message: "MobileNo Already Exists"});
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new model({
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            mobileNo: mobileNo,
            password: hash,
            createdBy: firstName + " " + lastName,
            createdAt: new Date()
        });
        const savedUser = await newUser.save();
        return res.status(200).json({ message: "SignIn Perform Successfully"});

    } catch (err) {
        return res.status(400).json(err);
    }

}


const SignUp = async (req, res) => {

    const { username, password } = req.body;

    // Check EmailId Or MobileNo Exist
    const userExist = await model.findOne({ $or: [ { emailId: username }, { mobileNo: username } ] });
    if (!userExist) {
        return res.status(400).json({ message: "Username Incorrect Found"});
    }

    // Check Password Correct Or Incorrect
    const checkPassword = await bcrypt.compare(password, userExist.password);
    if (!checkPassword) {
        return res.status(400).json({ message: "Password Incorrect Found"});
    }

    // Create JSON Token
    const token = await Jwt.sign(userExist.emailId, "secret");
    return res.status(200).json({ success: true, token: token });

}


module.exports = { SignIn, SignUp }