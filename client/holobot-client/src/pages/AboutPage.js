// utils
import React from "react";

// css
import "../assets/css/about.css";

// images
import lovingImage from "../assets/images/loving.svg";
import readingImage from "../assets/images/reading.svg";

// components
import Navbar from "../components/Navbar";
import TransitionScreen from "../components/TransitionScreen";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div>
      <TransitionScreen />
      <Navbar needsModal={false} />
      <div id="about">
        <div id="about-content">
          <div className="paragraph">
            <div className="supporting-text">
              <div className="header">
                <h1 className="header-with-background">about</h1>
                <h1>us</h1>
              </div>
              <p>
                Welcome to our space, where human connection meets cutting-edge technology. Our app is more than just lines of code; it's a haven for genuine
                conversations. We believe in the power of authentic dialogue, where users can share, connect, and explore in a digital realm that prioritizes
                the human touch. Join us in shaping a community where meaningful interactions thrive, transcending the boundaries of technology to create a
                truly human experience.
              </p>
            </div>
            <div className="paragraph-image">
              <img src={lovingImage} alt="boy showing kind thoughts" />
            </div>

            <div className="paragraph-image-responsive">
              <img src={lovingImage} alt="boy showing kind thoughts" />
            </div>
          </div>

          <div className="paragraph">
            <div className="paragraph-image">
              <img src={readingImage} alt="girl reading peacefully" />
            </div>
            <div className="supporting-text">
              <div className="header header-no-flex">
                <h1>keeping you</h1>
                <h1 className="header-with-background">safe</h1>
              </div>
              <p>
                Your privacy is our priority. Rest assured, every conversation you have within our app is treated with the utmost care and confidentiality. We
                employ state-of-the-art security measures to ensure that your discussions remain private and secure. Your trust means everything to us, and we
                are committed to providing you with a safe and secure space to express yourself. If you have any concerns or questions about our privacy
                practices, feel free to reach out. Your peace of mind is our goal. You can read more here.
              </p>
            </div>
            <div className="paragraph-image-responsive">
              <img src={readingImage} alt="girl reading peacefully" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
