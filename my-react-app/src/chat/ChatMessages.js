// ChatMessages.js

import "./ChatMessages.css";
import React, { useState, useEffect } from "react";

const ChatMessages = (props) => {
  let selectedChannel = props.selectedChannel;
  let user = props.userName;
  // console.log(user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    if (selectedChannel) {
      const fetchMessagesData = async () => {
        await fetch("http://localhost:3001/getMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ channelName: selectedChannel }),
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error("Failed to Add Message");
            }
          })
          .then((getMessageResponse) => {
            console.log(getMessageResponse);
            const formattedMessages = getMessageResponse.map((message) => ({
              userName: message.userName,
              timeStamp: message.tStamp, // Adjust this if the format is different
              message: message.message,
            }));
            setMessages(formattedMessages);
          })
          .catch((error) => {
            console.error("Error during get messages submission:", error);
          });
      };
      fetchMessagesData();
      // console.log(selectedChannel);
      // setMessages([{ userName: "default user", text: "default text" }]);
    }
  }, [selectedChannel]);

  const handleSubmit = async () => {
    if (!newMessage) {
      alert("Invalid inputs");
      return;
    }
    // console.log(newMessage);
    let dateStr = new Date().toLocaleString();
    await fetch("http://localhost:3001/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user,
        message: newMessage,
        timeStamp: dateStr,
        channelName: selectedChannel,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to Add Message");
        }
      })
      .then((addMessageResponse) => {
        console.log(addMessageResponse);
        setMessages([
          ...messages,
          { userName: user, timeStamp: dateStr, message: newMessage },
        ]);
      })
      .catch((error) => {
        console.error("Error during add messages submission:", error);
      });

    setNewMessage("");
  };

  return (
    <div className="chat-messages-container">
      <h3 className="selected-channel">
        {selectedChannel
          ? `messages in ${selectedChannel}`
          : "Select a channel"}
      </h3>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        // onChange={...} //
      />
      <div className="messages-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="user-id">{message.userName}</span>
            <span className="time-stamp">
              {"(" + message.timeStamp + "): "}
            </span>
            <span className="message-text">{message.message}</span>
          </div>
        ))}
      </div>
      <div className="new-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a message..."
          className="new-message-input"
        />
        <button onClick={handleSubmit} className="submit-message">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatMessages;
