// ChatChannels.js
import "./ChatChannel.css";
import React, { useState } from "react";

const ChatChannels = ({ onSelect }) => {
  const [channels, setChannels] = useState(["General", "Random", "Tech", "Movies"]);
  const [newChannel, setNewChannel] = useState("");

  const addChannel  = () => {
    if (newChannel) {
      setChannels(channels.concat(newChannel));
      setNewChannel("");
    }
  };
  return (
    <div className="chat-channels-container">
      <h1>Chat Channel</h1>
      <ul className="channels-list">
        {channels.map((channel, index) => (
          <li key={index} className="channel" onClick={() => onSelect(channel)}>
            {channel}
          </li >
        ))}
      </ul>
      <div className="add-channel">
        <input
          type="text"
          value={newChannel}
          onChange={(e) => setNewChannel(e.target.value)}
          placeholder="New Channel Name"
        />
        <button onClick={addChannel}>Add Channel</button>
      </div>
    </div>
  );
};

export default ChatChannels;
