// utils
import React from "react";

// css
import "../assets/css/footer.css";

// images
import instagramLogo from "../assets/images/instagram-logo.svg";
import messengerLogo from "../assets/images/messenger-logo.svg";
import linkedinLogo from "../assets/images/linkedin-logo.svg";

const Footer = () => {
  return (
    <div id="footer-div">
      <h1>Get in touch</h1>
      <div id="social-media-div">
        <div className="social-media-icon">
          <a className="overlay-link" href="https://dipubb.netlify.app/">
            <img src={instagramLogo} alt="Instagram logo" />
          </a>
        </div>

        <div className="social-media-icon">
          <a className="overlay-link" href="https://dipubb.netlify.app/">
            <img src={messengerLogo} alt="Instagram logo" />
          </a>
        </div>

        <div className="social-media-icon">
          <a className="overlay-link" href="https://dipubb.netlify.app/">
            <img src={linkedinLogo} alt="Instagram logo" />
          </a>
        </div>
      </div>
      <h2>mindful@2023 - all rights reserved</h2>
    </div>
  );
};

export default Footer;
