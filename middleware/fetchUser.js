const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({ path:path.join(__dirname ,"../config.env")});

const fetchUser = async (req, res, next) => {
    
    // getting jwt token from the authorization header
    const token = req.header('Authorization');

    if (token) {
        try {
            currentToken = token.split(" ")[1];
            const data = jwt.verify(currentToken, process.env.JWT_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).send({ message: "please authenticate using a valid token" })
        }
    } else {
        res.status(401).json({ message: "Unauthorized User" })
    }
}



module.exports = fetchUser;