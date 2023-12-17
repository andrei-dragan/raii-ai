// utils
import React from "react";
import { useNavigate } from "react-router-dom";

// css
import "../assets/css/navbar.css";

// images
import backArrow from "../assets/images/back-arrow.svg";

// components
import WarningModal from "./WarningModal";

const Navbar = ({ needsModal }) => {
  const [showModal, setShowModal] = React.useState(false);
  const navigator = useNavigate();

  const handleBackButton = () => {
    if (needsModal) {
      setShowModal(true);
    } else {
      navigator("/");
    }
  };

  return (
    <>
      {showModal && <WarningModal setShowModal={setShowModal} />}
      <div id="navbar">
        <div id="back-button" onClick={() => handleBackButton()}>
          <img src={backArrow} alt="back arrow" />
          <h1>back</h1>
        </div>
        <div id="logo" onClick={() => handleBackButton()}>
          <h1 id="logo-header-with-background">mind</h1>
          <h1>ful</h1>
        </div>
      </div>
    </>
  );
};

export default Navbar;
