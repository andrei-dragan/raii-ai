// utils
import React from "react";
import axios from "axios";

// css
import "../assets/css/chat.css";

// images
import meditatingImage from "../assets/images/meditating.svg";

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
  const [allowMessages, setAllowMessages] = React.useState(true);

  const sendMessageToAPI = async (message) => {
    if (!allowMessages) return;

    setMessages((messages) => [...messages, { user: message, bot: "" }]);
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await axios.post("https://rrrusuraluca.pythonanywhere.com/mindful", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          input: message,
        },
      });
      setLoading(false);
      console.log(response);
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

  const getReport = async () => {
    if (!allowMessages) return;

    setAllowMessages(false);
    const message = "Let's create a summarized report please!";

    setMessages((messages) => [...messages, { user: message, bot: "" }]);
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await axios.post("https://rrrusuraluca.pythonanywhere.com/mindful", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          input: message,
        },
      });
      setLoading(false);
      console.log(response);
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
          <h3 id="get-report-btn" onClick={() => getReport()}>
            get summarized report
          </h3>
        </div>
        <div id="chat-image">
          <img src={meditatingImage} alt="meditating" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
