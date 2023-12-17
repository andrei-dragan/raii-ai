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
      const response = await axios.post("http://loripsum.net/api/short", { message });
      await new Promise((resolve) => setTimeout(resolve, 3000));
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
