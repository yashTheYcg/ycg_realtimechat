const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({ path: path.join(__dirname, "../config.env") });


const socketAuth = (req,res,next) => {
    const token = req.header('Authorization');

    if (token) {
        try {
            const currentToken = token.split(" ")[1];
            const data = jwt.verify(currentToken, process.env.JWT_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            console.error("Socket authentication error:", error);
            return res.status(500).json({message:"Invalid Token"});
        }
    } else {
        next(new Error("Authentication error"));
    }
};

module.exports = socketAuth;
