// ChatChannel.js

import React, { useState, useEffect } from 'react';
import './ChatChannel.css';
import io from 'socket.io-client';

const ChatChannel = () => {
  const [channels, setChannels] = useState([]);
  const [token, setToken] = useState('');

  const socket = io('http://your-socket-server-url'); // Replace with your actual WebSocket server URL

  useEffect(() => {
    // Simulate user login with a hardcoded token for demonstration purposes
    // In a real application, you would obtain the token through a secure login process
    const fakeToken = 'fake-token'; // Replace with your actual token
    setToken(fakeToken);

    socket.emit('login', fakeToken);

    // Set up a listener for new channels or updates
    socket.on('channelUpdate', updatedChannels => {
      setChannels(updatedChannels);
    });

    // Clean up the listener on component unmount
    return () => {
      socket.off('channelUpdate');
    };
  }, [socket]);

  const createChannel = () => {
    // Emit an event to the server to handle the creation
    // For example: socket.emit('createChannel', { channelName: 'New Channel' });
  };

  return (
    <div className="chat-channel-container">
      <div className='chatChannelText'>
        Chat Channels
      </div>

      <div className="channel-list">
        {channels.map((channel, index) => (
          <div key={index} className="channel">
            {channel}
          </div>
        ))}
      </div>

      <button className="create-channel-btn" onClick={createChannel}>
        Create channel room
      </button>
    </div>
  );
};

export default ChatChannel;
