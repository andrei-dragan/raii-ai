// utils
import React from "react";
import { useState, useEffect } from "react";

// css
import "../assets/css/chat-conversation.css";

const ChatConversation = ({ messages, loading }) => {
  const loadingMessages = ["loading...", "please wait...", "we are thinking..."];
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessage((loadingMessage) => {
        const index = loadingMessages.indexOf(loadingMessage);
        return loadingMessages[(index + 1) % loadingMessages.length];
      });
    }, 1500);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    // scroll to bottom of chat conversation
    const chatConversation = document.getElementById("chat-conversation");
    chatConversation.scrollTop = chatConversation.scrollHeight;
  }, [messages]);

  return (
    <div id="chat-conversation">
      {messages.map(({ user, bot }) => {
        return (
          <>
            <div className="chat-message-user">
              <p>{user}</p>
            </div>
            {!bot ? (
              <div id="chat-message-bot-loading">
                <div id="chat-message-bot-loading-box">
                  <div className="dot" id="dot1"></div>
                  <div className="dot" id="dot2"></div>
                  <div className="dot" id="dot3"></div>
                </div>
                <p>{loadingMessage}</p>
              </div>
            ) : (
              <div className="chat-message-bot">
                <p>{bot}</p>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default ChatConversation;
