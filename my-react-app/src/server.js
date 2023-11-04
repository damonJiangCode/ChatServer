// Web application framework for Node.js.
const express = require('express');
// Middleware to parse the request body.
const bodyParser = require('body-parser');
// Middleware for handling Cross-Origin Resource Sharing.
const cors = require('cors');
// A Node.js driver for MySQL
const mysql = require('mysql');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// database credentials
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
  });

// connect db
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = db;