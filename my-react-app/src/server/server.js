const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const secretKey = 'your-secret-key'; // Replace with your actual secret key
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  // Add more users as needed
];

const channels = [];

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username: user.username }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

io.on('connection', socket => {
  console.log('Client connected');

  // Middleware to verify the user token
  const authenticate = (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded.username;
    } catch (error) {
      return null;
    }
  };

  socket.on('login', (token) => {
    const username = authenticate(token);

    if (username) {
      // Handle successful authentication, e.g., join specific rooms
      socket.join(username);

      // Send initial channel list
      socket.emit('channelUpdate', channels);

      // Handle channel creation and update
      socket.on('createChannel', newChannel => {
        // Add logic to create a new channel in the database
        channels.push(newChannel);

        // After creating the channel, emit an event to notify other clients
        io.to(username).emit('channelUpdate', channels);
      });

      socket.on('disconnect', () => {
        console.log(`User ${username} disconnected`);
      });
    } else {
      // Handle failed authentication
      socket.disconnect(true);
    }
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// // Web application framework for Node.js.
// const express = require('express');
// // Middleware to parse the request body.
// const bodyParser = require('body-parser');
// // Middleware for handling Cross-Origin Resource Sharing.
// const cors = require('cors');
// // A Node.js driver for MySQL
// const mysql = require('mysql');

// const app = express();

// // Middleware setup
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // database credentials
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//   });

// // connect db
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//     } else {
//         console.log('Connected to MySQL');
//     }
// });

// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// module.exports = db;