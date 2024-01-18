// utils
import React from "react";

// css
import "../assets/css/chat-suggestions.css";

const ChatSuggestions = ({ sendMessageToAPI }) => {
  const suggestions = [
    "I want to discuss about my day. I just want someone to listen to me.",
    "I want to talk about my aspirations and my long-term goals!",
    "Let's just talk about anything. I will let you come up with an idea.",
  ];

  return (
    <div id="chat-suggestions">
      <div id="chat-title">
        <h1>Don't know what to say?</h1>
      </div>
      <div>
        {suggestions.map((suggestion) => {
          return (
            <div key={suggestion} className="chat-suggestion" onClick={() => sendMessageToAPI(suggestion)}>
              <p>{suggestion}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSuggestions;
