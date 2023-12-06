const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");

  const createDatabase = "CREATE DATABASE IF NOT EXISTS chatserver";
  connection.query(createDatabase, (err) => {
    if (err) throw err;
    console.log("Database chatserver created successfully");

    connection.changeUser({ database: "chatserver" }, (err) => {
      if (err) throw err;

      const createChannelsTable = `
        CREATE TABLE IF NOT EXISTS chatChannels (
          id INT AUTO_INCREMENT PRIMARY KEY,
          channel VARCHAR(255) NOT NULL
        )`;

      const createMessageTable = `
        CREATE TABLE IF NOT EXISTS chatMessage (
          id INT AUTO_INCREMENT PRIMARY KEY,
          userName VARCHAR(255) NOT NULL,
          message VARCHAR(255) NOT NULL,
          channelName VARCHAR(255) NOT NULL,
          tStamp VARCHAR(255) NOT NULL,
          thumbUp INT DEFAULT 0,
          thumbDown INT DEFAULT 0
        )`;

      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          userName VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          pin VARCHAR(255) NOT NULL
        )`;

      connection.query(createChannelsTable, (err) => {
        if (err) throw err;
        console.log("chatChannels table created successfully");
      });

      connection.query(createMessageTable, (err) => {
        if (err) throw err;
        console.log("chatMessage table created successfully");
      });

      connection.query(createUsersTable, (err) => {
        if (err) throw err;
        console.log("users table created successfully");

        connection.end((err) => {
          if (err) {
            console.error("Error closing connection:", err);
            return;
          }
          console.log("Connection closed");
        });
      });
    });
  });
});
