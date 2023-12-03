// server.js

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001; // Choose a port for your server

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "chatserver",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.use(bodyParser.json());
app.use(cors());

app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  const checkUserSql = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserSql, [username], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking user existence:", checkErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (checkResult.length > 0) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }
    const sql = "INSERT INTO users (username, email, pin) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password], (err, res) => {
      if (err) {
        console.error("Error inserting data into users table:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      console.log("Data inserted into users table:", res);
      res.status(200).json({ success: true });
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const checkUserSql = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserSql, [username], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking user existence:", checkErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (checkResult.length !== 1) {
      res.status(400).json({ error: "Username does not exist" });
      return;
    }

    console.log(
      "Data from database: ",
      checkResult,
      "and password: ",
      password
    );
    res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
