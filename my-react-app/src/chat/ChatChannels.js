// ChatChannels.js

import "./ChatChannel.css";
import React, { useState, useEffect } from "react";

const ChatChannels = ({ onSelect }) => {
  const [channels, setChannels] = useState([]);
  const [newChannel, setNewChannel] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/chatchannels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "loadChannels" }),
        });

        if (response.status === 200) {
          const channelsFromServer = await response.json();
          console.log("Load Channels Successfully", channelsFromServer);
          setChannels(channelsFromServer); // Assuming the response is an array of channels
        } else {
          console.error("Failed to Load Channels");
        }
      } catch (error) {
        console.error("Error during get channels submission:", error);
      }
    };

    fetchData();
  }, []);

  const addChannel = () => {
    if (newChannel) {
      setChannels((prevChannels) => [...prevChannels, { channel: newChannel }]);
      setNewChannel("");
      // TO DO: fetch new channel to DB
    }
  };
  return (
    <div className="chat-channels-container">
      <h1>Chat Channel</h1>
      <ul className="channels-list">
        {channels.map((channel, index) => (
          <li
            key={index}
            className="channel"
            onClick={() => onSelect(channel.channel)}
          >
            {channel.channel}
          </li>
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
