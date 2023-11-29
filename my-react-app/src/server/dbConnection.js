const mysql = require('mysql2');

// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'chatserver'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database');

});

// Export the connection for external use
module.exports = connection;
