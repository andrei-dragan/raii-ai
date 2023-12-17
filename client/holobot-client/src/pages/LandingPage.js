// utils
import React from "react";
import { useNavigate } from "react-router-dom";

// css
import "../assets/css/landing.css";

// images
import swingingImage from "../assets/images/swinging.svg";
import strollingImage from "../assets/images/strolling.svg";

// components
import Footer from "../components/Footer";
import TransitionScreen from "../components/TransitionScreen";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TransitionScreen />
      <div id="landing-page">
        <div className="landing-page-image" id="landing-page-left-content">
          <img id="strolling-image" src={strollingImage} alt="strolling boy" />
        </div>
        <div className="landing-page-image-responsive">
          <img id="swinging-image" src={swingingImage} alt="swinging girl" />
        </div>

        <div id="landing-page-main">
          <div id="landing-page-main-content">
            <div id="logo">
              <h1 id="logo-header-with-background">mind</h1>
              <h1>ful</h1>
            </div>
            <h2>where your thoughts matter</h2>
            <div id="start-chatting-button" onClick={() => navigate("/chat")}>
              <h1>start chatting</h1>
            </div>
            <div id="additional-info">
              <p>
                By starting this conversation you acknowledge the <a href="https://dipubb.netlify.app/">Terms&Conditions</a> and fully agree with them!
              </p>
              <p>
                Want to learn more about how we keep your data safe? <a href="https://dipubb.netlify.app/">Click here.</a>
              </p>
            </div>
          </div>
        </div>

        <div className="landing-page-image">
          <img id="swinging-image" src={swingingImage} alt="swinging girl" />
        </div>
        <div className="landing-page-image-responsive">
          <img id="strolling-image" src={strollingImage} alt="strolling boy" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
