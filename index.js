const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const {connect_to_mongo} = require('./db/database');
const http = require('http');
const {Server} = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

// path to the config.env file
dotenv.config({path:path.join(__dirname,'./config.env')});

// middlewares
app.use(cors());
app.use(express.json());

// Route-0 for default endpoint
app.get('/',(req,res)=> {
    res.send("HII FROM THE SERVER");
})


// available routes for endpoints
app.use("/api/", require('./routes/message'));

// Custom 404 Error Handler
app.all('*', (req, res) => {
    res.status(404).json({ message: "Endpoint, not found !" });
})

// Mongodb atlas connection function
connect_to_mongo();

const port = process.env.PORT;
server.listen(port, ()=> console.log(`Server Listening at ${port}`));



// Socket.IO handling
io.on('connection', (socket) => {
    console.log(`New user connected: ${socket.id}`);
  
    // Handle private messages
    socket.on('newMessage', (data) => {
      socket.broadcast.emit('loadNewChat',data); //this used when message send excluding sender
      // io.emit('loadNewChat', message); //this is used when message send including the sender
    });
  
    // Handle group messages
    socket.on('sendGroupMessage', (data) => {
      socket.broadcast.emit('receiveGroupMessage', data);
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
