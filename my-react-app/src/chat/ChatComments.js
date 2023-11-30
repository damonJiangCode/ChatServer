// ChatComments.js

import React, { useState, useEffect } from 'react';

const ChatComments = ({ selectedChannel }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log("SELECTED CHANNEL: ", selectedChannel);
    // Fetch comments for the selected channel (you may use your WebSocket logic here)
    // For example, you might have an API endpoint to get comments based on the selected channel
    if (selectedChannel) {
      // Fetch comments for the selected channel and update the state
      // Example: fetchcomments(selectedChannel).then(data => setcomments(data));
    }
  }, [selectedChannel]);

  return (
    <div className="chat-comments-container">
      <div className="selected-channel">
        {selectedChannel ? `comments in ${selectedChannel}` : 'Select a channel'}
      </div>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatComments;