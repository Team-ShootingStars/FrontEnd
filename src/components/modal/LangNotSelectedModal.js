import React, {useCallback, useEffect, useRef} from "react";
import "../../styles/LangNotSelectedModal.css";

function LangNotSelectedModal({ onClose }) {
    const modalContentRef = useRef(null);

    const handleClickOutside = useCallback((event) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside, onClose]);

  return (
    <div className="p1-complete-modal">
      <div ref={modalContentRef} className="p1-complete-modal-content">
        <h2>Please select a Stadium</h2>
        <button className="p1-complete-modal-content-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default LangNotSelectedModal;
