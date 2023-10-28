const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for messages and broadcast them to the room
  socket.on('message', (message) => {
    const { channel, text } = message;
    io.to(channel).emit('message', { text, sender: socket.id });
  });

  // Listen for joining a room
  socket.on('join', (channel) => {
    socket.join(channel);
    console.log(`${socket.id} joined channel ${channel}`);
  });

  // Listen for leaving a room
  socket.on('leave', (channel) => {
    socket.leave(channel);
    console.log(`${socket.id} left channel ${channel}`);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});