// utils
import React from "react";
import { useState, useRef } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";

// css
import "../assets/css/chat-input.css";

// images
import sendIcon from "../assets/images/send-icon.svg";

const ChatInput = ({ loading, sendMessageToAPI }) => {
  const [message, setMessage] = useState("");
  const textAreaRef = useRef(null);
  useAutosizeTextArea(textAreaRef.current, message);

  const isMessageValid = () => {
    setMessage(() => message.replace(/\s/g, ""));
    return message.replace(/\s/g, "").length > 0;
  };

  const sendMessage = () => {
    if (!isMessageValid() || loading) return;
    sendMessageToAPI(message);
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={message === "" ? "reduced-opacity" : "no-opacity"} id="chat-input">
      <textarea
        rows={1}
        ref={textAreaRef}
        value={message}
        onKeyPress={(event) => handleKeyPress(event)}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="type your message..."
      />
      <img src={sendIcon} alt="send icon" onClick={() => sendMessage()} />
    </div>
  );
};

export default ChatInput;
