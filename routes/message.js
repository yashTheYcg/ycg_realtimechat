const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const {commentRateLimitation,replyCommentRateLimitation} = require('../rate-limitation/rateLimitation');

// controller functions
const {signupUser,loginUser} = require('../controller/userController');



// Route-1 for creating  the user
router.post('/signup',signupUser);

// Route-2 for logging  the user
router.post('/login',loginUser);




module.exports = router;