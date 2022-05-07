const Jwt = require("jsonwebtoken");


const Verify = async (req, res, next) => {

    try {

        // Check Token
        const token = req.header("Authorization");
        if (!token) {
            return res.status(400).json({ message: "Token Not Found"});
        }

        // Verify Token
        const verifyToken = Jwt.verify(token, "secret");
        if (!verifyToken) {
            return res.status(401).json({ message: "Unauthorize"});
        } else {
            next();
        }
        
    } catch (err) {
        return res.status(400).json(err);
    }

}


module.exports = { Verify }