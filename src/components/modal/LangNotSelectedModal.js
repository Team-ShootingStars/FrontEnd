import React from "react";
import "../../styles/LangNotSelectedModal.css";

function LangNotSelectedModal({ onClose }) {
  return (
    <div className="p1-complete-modal">
      <div className="p1-complete-modal-content">
        <h2>Please select a language</h2>
        <button className="p1-complete-modal-content-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default LangNotSelectedModal;
