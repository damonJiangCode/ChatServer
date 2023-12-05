// server.js

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3001;

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

app.post("/chatchannels", (req, res) => {
  const data = req.body;

  console.log(data.action, "\n");
  const getChannelsSql = "SELECT channel FROM chatchannels";
  db.query(getChannelsSql, (dbErr, channels) => {
    if (dbErr) {
      console.log("Error: searching chat channels:", dbErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // console.log("Data from database: ", channels);
    res.status(200).json(channels);
  });
});

app.post("/addchannel", (req, res) => {
  const { newChannel } = req.body;

  console.log(newChannel, "\n");
  const addChannelSql = "INSERT INTO chatchannels (channel) VALUES (?)";
  db.query(addChannelSql, [newChannel], (addCahnnelErr, addChannelResult) => {
    if (addCahnnelErr) {
      console.log("Error: searching chat channels:", addCahnnelErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log("Data from database: ", addChannelResult);
    res.status(200).json({ success: "Add Channel Successfully" });
  });
});

app.post("/sendMessage", (req, res) => {
  const { userName, message, timeStamp, channelName } = req.body;

  console.log(
    "USERNAME: ",
    userName,
    "\nMESSAGE: ",
    message,
    "\nTIMESTAMP: ",
    timeStamp,
    "\nCHANNELNAME: ",
    channelName
  );
  const addMessageSql =
    "INSERT INTO chatmessages (userName, message, timeStamp, channelName) VALUES (?. ?, ?, ?)";
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
