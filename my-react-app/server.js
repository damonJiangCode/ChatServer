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
  const { username, password, email, passwordCheck } = req.body;

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
    const insertSql =
      "INSERT INTO users (username, email, pin) VALUES (?, ?, ?)";
    db.query(
      insertSql,
      [username, email, password],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error inserting data into users table:", insertErr);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        console.log("Data inserted into users table:", insertResult);
        res.status(200).json({ success: true });
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { username } = req.body;

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

    // console.log(
    //   "Data from database: ",
    //   checkResult,
    //   "and password: ",
    //   password
    // );
    res.status(200).json({ success: true });
  });
});

app.post("/chatchannels", (req, res) => {
  // const data = req.body;

  // console.log(data.action, "\n");
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
  db.query(addChannelSql, [newChannel], (addCahnnelErr, addChannelRes) => {
    if (addCahnnelErr) {
      console.log("Error: searching chat channels:", addCahnnelErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    } else {
      console.log("Data from database: ", addChannelRes);
      res.status(200).json({ success: "Add Channel Successfully" });
    }
  });
});

app.post("/sendMessage", (req, res) => {
  const { userName, message, timeStamp, channelName } = req.body;

  console.log("MESSAGE GET FROM REACT: ", req.body);
  const addMessageSql =
    "INSERT INTO chatmessage (userName, message, tStamp, channelName) VALUES (?, ?, ?, ?)";
  db.query(
    addMessageSql,
    [userName, message, timeStamp, channelName],
    (addMEssageErr, addMessageRes) => {
      if (addMEssageErr) {
        console.log("Error: adding message:", addMEssageErr);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      // console.log("Data from database: ", addMessageRes);
      res.status(200).json({ success: "Add Message Successfully" });
    }
  );
});

app.post("/getMessage", (req, res) => {
  const { channelName } = req.body;
  // console.log("CHANNELNAME FROM REACT: ", channelName);
  const getMessageSql =
    "SELECT id, userName, tStamp, message, thumbUp, thumbDown FROM chatMessage WHERE channelName = ? ORDER BY tStamp ASC";

  db.query(getMessageSql, [channelName], (getMessageErr, getMessageRes) => {
    if (getMessageErr) {
      console.log("Error: geting message:", getMessageErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    } else {
      // console.log("Data from database (get message): ", getMessageRes);
      res.status(200).json(getMessageRes);
    }
  });
});

app.post("/filterContent", (req, res) => {
  const { searchTarget, term, channelName } = req.body;
  let searchSql;
  // console.log("FROM REACT: ", req.body);
  if (searchTarget === "message") {
    searchSql =
      "SELECT userName, tStamp, message FROM chatMessage WHERE channelName = ? AND LOWER(message) LIKE LOWER(?) ORDER BY tStamp ASC";
  } else if (searchTarget === "user") {
    searchSql =
      "SELECT userName, tStamp, message FROM chatMessage WHERE channelName = ? AND LOWER(userName) LIKE LOWER(?) ORDER BY tStamp ASC";
  }
  db.query(
    searchSql,
    [channelName, "%" + term + "%"],
    (searchMessageErr, searchMessageRes) => {
      if (searchMessageErr) {
        console.log("Error: Searching Message:", searchMessageErr);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      } else {
        // console.log("Data from database (search message): ", searchMessageRes);
        res.status(200).json(searchMessageRes);
      }
    }
  );
});

app.post("/up", (req, res) => {
  const { messageID } = req.body;
  // console.log("FROM REACT: ", req.body);
  let messageUpSql =
    "UPDATE chatMessage SET thumbUp = thumbUp + 1 WHERE id = ?";
  db.query(messageUpSql, [messageID], (messageUpErr, messageUpRes) => {
    if (messageUpErr) {
      console.log("Error: Message Up:", messageUpErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    } else {
      // console.log("Data from database (message up): ", messageUpRes);
      res.status(200).json(messageUpRes);
    }
  });
});

app.post("/down", (req, res) => {
  const { messageID } = req.body;
  // console.log("FROM REACT: ", req.body);
  let messageUpSql =
    "UPDATE chatMessage SET thumbDown = thumbDown + 1 WHERE id = ?";
  db.query(messageUpSql, [messageID], (messageDownErr, messageDownRes) => {
    if (messageDownErr) {
      console.log("Error: Message Down:", messageDownErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    } else {
      console.log("Data from database (message down): ", messageDownRes);
      res.status(200).json(messageDownRes);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
