const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path');
const dotenv = require("dotenv");
const uuid4 = require('uuid4');


// path to config.env file
dotenv.config({ path: path.join(__dirname ,"../config.env")});

// for signing up the user
const signupUser = async (req,res)=> {
    try {
        const { email, password } = req.body;
 
        // creating new user
            if (!email || !password) {
                return res
                    .status(404)
                    .json({ message: "Please fill the required field" });
            }
            const user = new User({ email: email.toLowerCase(), password,userId:uuid4() });
            // generate salt to hash password
            const salt = await bcrypt.genSalt(10);
            // now we set user password to hashed password
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();
            res.status(200).json({ message: "User registered successfully", status: "success" });
    } catch (error) {
        console.error(error);
    }
}


// for logging up the user
const loginUser = async (req,res)=> {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(422).json({ message: "Please fill the required field", status: "failure" });
        }

        const user = await User.findOne({ email: email });
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const data = {
                    user: {
                        id: user.userId,
                    },
                };
                const authtoken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '48hr' });

                res.status(200).json({ message: "Login Successfully", authtoken: authtoken, status: "success" });
            } else {
                return res.status(400).json({ message: "Wrong credentials", status: "failure" });
            }
        } else {
            return res.status(400).json({ message: "User does not exit", status: "failure" });
        }
    } catch (error) {
        console.error(error);
    }
}



module.exports={signupUser,loginUser}