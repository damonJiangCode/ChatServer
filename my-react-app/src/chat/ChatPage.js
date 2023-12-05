// ChatPage.js
import "./ChatPage.css";
import React, { useState } from "react";
import ChatChannels from "./ChatChannels";
import ChatMessages from "./ChatMessages";

function ChatPage() {
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    // console.log("channel: ", channel, typeof channel);
  };

  return (
    <div className="chat-page-container">
      <div className="chat-channels-container">
        <ChatChannels onSelect={handleChannelSelect} />
      </div>

      <div className="chat-messages-container">
        <ChatMessages selectedChannel={selectedChannel} />
      </div>
    </div>
  );
}

export default ChatPage;
