const express = require('express');
const router = express.Router();
const socketAuth = require('../middleware/socketAuth');

// controller functions
const {signupUser,loginUser} = require('../controller/userController');
const { sendMessage, getMessageHistory,createGroup, sendGroupMessage } = require('../controller/messageController');



// Route-1 for creating  the user
router.post('/signup', signupUser);

// Route-2 for logging  the user
router.post('/login', loginUser);

// Route-3 for sending the message
router.post('/messages', socketAuth,sendMessage);

// Route-4 for getting the history of the messages
router.get('/messages/history', socketAuth ,getMessageHistory);

// Route-5 for the creation of group
router.post('/groups',socketAuth ,createGroup);

// Route-6 for sending message to the group
router.post('/groups/:groupId/messages', socketAuth,sendGroupMessage);


module.exports = router;