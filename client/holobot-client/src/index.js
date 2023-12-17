// utils
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// css
import "./assets/css/index.css";

// pages & components
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
