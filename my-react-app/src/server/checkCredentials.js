const dbConnection = require('./dbConnection');

// Example query
const sqlQuery = 'SELECT * FROM USERS';

// Perform a database query
dbConnection.query(sqlQuery, (err, results) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  console.log('Query results:', results);
});

dbConnection.end();
