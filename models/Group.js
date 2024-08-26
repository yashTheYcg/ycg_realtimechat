const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  groupId:{
        type:String,
        required:true,
  },
  name: { //group name
    type: String,
    required: true,
  },
  members: [{ //members with their userId
    type: String,
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Group', GroupSchema);
