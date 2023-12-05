// ChatMessages.js

import "./ChatMessages.css";
import React, { useState, useEffect } from "react";

const ChatMessages = ({ selectedChannel }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); // State to hold the new comment input

  useEffect(() => {
    // Fetch comments for the selected channel (you may use your WebSocket logic here)
    if (selectedChannel) {
      setMessages([
        { userName: "aaaa", text: "text" },
        { userName: "usernameb", text: "text2" },
      ]);
    }
  }, [selectedChannel]);

  const handleSubmit = () => {
    // Logic to handle the submission of a new comment
    // This could involve sending it to the backend or adding it to the comments state
    console.log(newMessage); // For now, just log it to the console
    setNewMessage(""); // Clear the input after submission
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
            <span className="user-id">{message.userName + ":"}</span>
            <span className="message-text">{message.text}</span>
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
