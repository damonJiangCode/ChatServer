// ChatPage.js
import "./ChatPage.css";

import React, { useState } from "react";
import ChatChannels from "./ChatChannels";
import ChatComments from "./ChatComments";

function ChatPage() {
  const [selectedChannel, setSelectedChannel] = useState(null);

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

// // ChatChannels.js

// import React from "react";

// const ChatChannels = ({ onSelect }) => {
//   const channels = ["Channel 1", "Channel 2", "Channel 3"]; // Replace with your actual channels

//   const [selectedChannel, setSelectedChannel] = React.useState(null);

//   const handleChannelClick = (channel) => {
//     setSelectedChannel(channel);
//     onSelect(channel);
//   };

//   return (
//     <div className="chat-channels-container">
//       {channels.map((channel) => (
//         <div
//           key={channel}
//           className={`channel-item ${channel === selectedChannel ? 'active' : ''}`}
//           onClick={() => handleChannelClick(channel)}
//         >
//           {channel}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatChannels;
