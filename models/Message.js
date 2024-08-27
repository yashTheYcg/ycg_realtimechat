const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: function() { return !this.groupId; }, // Required if no groupId
  },
  groupId: {
    type: String,
    required: function() { return !this.receiverId; }, // Required if no receiverId
  },
  content: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
