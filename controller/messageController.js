const Message = require('../models/Message');
const Group = require('../models/Group');

// Send a new message
exports.sendMessage = async (req, res) => {
    
    try {
    const { senderId, receiverId, content } = req.body;
    const userId = req.user.id;
    if(userId===senderId){
        const message = await Message.create({ senderId, receiverId, content });
        res.status(201).json({data:message});        
    }else{
        res.status(500).json({ message:"Sender unauthorized" });
    }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Get message history
exports.getMessageHistory = async (req, res) => {
    const { senderId, receiverId, groupId, page = 1, pageSize = 10 } = req.query;
  
    try {
      const query = groupId ? { groupId } : {
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId }
        ]
      };
  
      const messages = await Message.find(query)
        .sort({ timeStamp: 1 })
        .skip((page - 1) * pageSize)
        .limit(Number(pageSize))
        .select('-_id -__v');
  
      res.status(201).json({data:messages});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Create a new group
exports.createGroup = async (req, res) => {
    const { name, members } = req.body;
    const userId = req.user.id;
    try {
      let group = await Group.create({userId, name, members });
      res.status(201).json({data:group});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Send a message to a group
  exports.sendGroupMessage = async (req, res) => {
    const { groupId } = req.params;
    const { senderId, content } = req.body;
  
    try {
      const currentGroup = await Group.findOne({_id:groupId});
      if(currentGroup){
        const message = await Message.create({ senderId, groupId, content });
        res.status(201).json({data:message});
      }else{
        res.status(400).json({message:"Group does not exist"});
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };