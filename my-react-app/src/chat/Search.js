import React, { useState } from "react";
import "./Search.css";

const Search = ({ selectedChannel }) => {
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
    <div className="search_input">
      <input
        type="text"
        dddd
        placeholder="Search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={() => {
          filterContent("message");
        }}
      >
        Search Message
      </button>
      <button
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
