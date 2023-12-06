import "./ChatMessages.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatMessages = (props) => {
  let selectedChannel = props.selectedChannel;
  let user = props.userName;

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [run, setRun] = useState(true);

  useEffect(() => {
    if (selectedChannel) {
      const fetchMessagesData = async () => {
        await fetch("http://localhost:3001/getMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ channelName: selectedChannel }),
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error("Failed to Add Message");
            }
          })
          .then((getMessageResponse) => {
            console.log(getMessageResponse);
            // const formattedMessages = getMessageResponse.map((message) => ({
            //   userName: message.userName,
            //   timeStamp: message.tStamp, // Adjust this if the format is different
            //   message: message.message,
            // }));
            setMessages(getMessageResponse);
          })
          .catch((error) => {
            console.error("Error during get messages submission:", error);
          });
      };
      fetchMessagesData();
      // console.log(selectedChannel);
      // setMessages([{ userName: "default user", text: "default text" }]);
    }
  }, [selectedChannel, run]);

  const handleSubmit = async () => {
    setRun(!run);
    if (!newMessage) {
      alert("Invalid inputs");
      return;
    }
    // console.log(newMessage);
    let dateStr = new Date().toLocaleString();
    await fetch("http://localhost:3001/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user,
        message: newMessage,
        timeStamp: dateStr,
        channelName: selectedChannel,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to Add Message");
        }
      })
      .then((addMessageResponse) => {
        console.log(addMessageResponse);
        setMessages([
          ...messages,
          { userName: user, timeStamp: dateStr, message: newMessage },
        ]);
      })
      .catch((error) => {
        console.error("Error during add messages submission:", error);
      });

    setNewMessage("");
  };

  const toSearch = () => {
    navigate("/search", {
      state: { selectedChannel },
    });
  };

  const up = async (messageID) => {
    await fetch("http://localhost:3001/up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageID: messageID,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to Message Up");
        }
      })
      .then((messageUpResponse) => {
        console.log(messageUpResponse);
        setMessages((prev) => {
          return prev.map((message) => {
            if (message.id === messageID) {
              return { ...message, thumbUp: message.thumbUp + 1 };
            }
            return message;
          });
        });
      })
      .catch((error) => {
        console.error("Error during messages up:", error);
      });
  };

  const down = async (messageID) => {
    await fetch("http://localhost:3001/down", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageID: messageID,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to Message Down");
        }
      })
      .then((messageDownResponse) => {
        console.log(messageDownResponse);
        setMessages((prev) => {
          return prev.map((message) => {
            if (message.id === messageID) {
              return { ...message, thumbDown: message.thumbDown + 1 };
            }
            return message;
          });
        });
      })
      .catch((error) => {
        console.error("Error during messages down:", error);
      });
  };

  return (
    <div className="chat-messages-container">
      <h3 className="selected-channel">
        {selectedChannel
          ? `messages in ${selectedChannel}`
          : "Select a channel"}
      </h3>
      <button className="search-button" onClick={toSearch}>
        Search
      </button>
      <div className="messages-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="user-id">{message.userName}</span>
            <span className="time-stamp">{"(" + message.tStamp + "): "}</span>
            <span className="message-text">{message.message}</span>
            <button className="reply">↪️</button>
            <button className="thumbs-up" onClick={() => up(message.id)}>
              👍{message.thumbUp}
            </button>
            <button className="thumbs-down" onClick={() => down(message.id)}>
              👎{message.thumbDown}
            </button>
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
