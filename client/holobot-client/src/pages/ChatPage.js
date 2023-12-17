// utils
import React from "react";
import axios from "axios";

// css
import "../assets/css/chat.css";

// components
import Navbar from "../components/Navbar";
import TransitionScreen from "../components/TransitionScreen";
import Footer from "../components/Footer";
import ChatSuggestions from "../components/ChatSuggestions";
import ChatInput from "../components/ChatInput";
import ChatConversation from "../components/ChatConversation";

const ChatPage = () => {
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const sendMessageToAPI = async (message) => {
    setMessages((messages) => [...messages, { user: message, bot: "" }]);
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await axios.post(
        "https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1&format=html",
        { message },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        setMessages((messages) => [...messages.slice(0, messages.length - 1), { user: message, bot: response.data.text }]);
      } else {
        setMessages((messages) => [...messages.slice(0, messages.length - 1), { user: message, bot: "Sorry, I didn't understand that." }]);
      }
    } catch (error) {
      setLoading(false);
      setMessages((messages) => [...messages.slice(0, messages.length - 1), { user: message, bot: "Sorry, I didn't understand that." }]);
    }
  };

  return (
    <div>
      <TransitionScreen />
      <Navbar needsModal={true} />
      <div id="chat">
        <div id="chat-content">
          {messages.length === 0 ? <ChatSuggestions sendMessageToAPI={sendMessageToAPI} /> : <ChatConversation messages={messages} loading={loading} />}
          <ChatInput sendMessageToAPI={sendMessageToAPI} loading={loading} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
