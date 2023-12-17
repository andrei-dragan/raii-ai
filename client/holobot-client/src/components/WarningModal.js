// utils
import React from "react";
import { useNavigate } from "react-router-dom";

// css
import "../assets/css/modal.css";

const WarningModal = ({ setShowModal }) => {
  const navigator = useNavigate();

  const handleModalButton = (decision) => {
    if (decision) {
      setShowModal(false);
      navigator("/");
    } else {
      setShowModal(false);
    }
  };

  return (
    <div id="modal">
      <div id="modal-content">
        <h1>Our conversation is as real as it gets, and if you leave, it's like closing a book mid-story. Are you sure you want to exit?</h1>
        <div id="modal-buttons">
          <div id="exit" className="modal-action-button" onClick={() => handleModalButton(true)}>
            <h2>exit</h2>
          </div>
          <div id="stay" className="modal-action-button" onClick={() => handleModalButton(false)}>
            <h2>stay</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
