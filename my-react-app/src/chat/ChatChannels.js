// ChatChannels.js

import React from 'react';

const channels = ['General', 'Random', 'Tech', 'Movies'];

const ChatChannels = ({ onSelect }) => {
  return (
    <div className="chat-channels-container">

      <div className="channels-list">
        {channels.map((channel, index) => (
          <div key={index} className="channel" onClick={() => onSelect(channel)}>
            {channel}
          </div>
        ))}
      </div>

    </div>
  );
};

export default ChatChannels;
