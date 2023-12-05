// ChatComments.js
import "./ChatComments.css";

import React, { useState, useEffect } from "react";

const ChatComments = ({ selectedChannel }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // State to hold the new comment input

  useEffect(() => {
    // Fetch comments for the selected channel (you may use your WebSocket logic here)
    if (selectedChannel) {
      setComments([
        { userName: "aaaa", text: "text" },
        { userName: "usernameb", text: "text2" },
      ]);
    }
  }, [selectedChannel]);

  const handleSubmit = () => {
    // Logic to handle the submission of a new comment
    // This could involve sending it to the backend or adding it to the comments state
    console.log(newComment); // For now, just log it to the console
    setNewComment(""); // Clear the input after submission
  };

  return (
    <div className="chat-comments-container">
      <h3 className="selected-channel">
        {selectedChannel
          ? `Comments In ${selectedChannel}`
          : "Select a channel"}
      </h3>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        // onChange={...} //
      />
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <span className="user-id">{comment.userName + ":"}</span>
            <span className="comment-text">{comment.text}</span>
          </div>
        ))}
      </div>
      <div className="new-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a message..."
          className="new-comment-input"
        />
        <button onClick={handleSubmit} className="submit-comment">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComments;
