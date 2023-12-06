import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const location = useLocation();
  const selectedChannel = location.state && location.state.selectedChannel;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContent, setFilteredContent] = useState([]);

  const filterContent = async (searchTartget) => {
    await fetch("http://localhost:3001/filterContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchTarget: searchTartget,
        term: searchTerm,
        channelName: selectedChannel,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to Serach Content");
        }
      })
      .then((searchContentResponse) => {
        console.log("SERACH CONTENT RESPONSE: ", searchContentResponse);
        setFilteredContent(searchContentResponse);
      })
      .catch((error) => {
        console.error("Error During Filter Contents Submission:", error);
      });
  };

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        className="search-message"
        onClick={() => {
          filterContent("message");
        }}
      >
        Search Message
      </button>

      <button
        className="search-user"
        onClick={() => {
          filterContent("user");
        }}
      >
        Search User
      </button>

      <ul>
        {filteredContent.map((message, index) => (
          <div key={index} className="message">
            <span className="user-id">{message.userName}</span>
            <span className="time-stamp">{"(" + message.tStamp + "): "}</span>
            <span className="message-text">{message.message}</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Search;
