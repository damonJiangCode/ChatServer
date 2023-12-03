// ChatPage.js
import "./ChatPage.css";
import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import ChatChannels from "./ChatChannels";
import ChatComments from "./ChatComments";

function ChatPage() {
  // const { state } = useLocation();
  const [selectedChannel, setSelectedChannel] = useState(null);
  // const yourPropValue = state?.yourPropName;

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  return (
    <div className="chat-page-container">
      <div className="chat-channels-container">
        <ChatChannels onSelect={handleChannelSelect} />
      </div>

      <div className="chat-comments-container">
        <ChatComments selectedChannel={selectedChannel} />
      </div>
    </div>
  );
}

export default ChatPage;
