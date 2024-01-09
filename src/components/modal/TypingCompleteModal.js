import React, {useCallback, useEffect, useRef} from 'react';

import "../../styles/TypingCompleteModal.css"

function TypingCompleteModal({ time, speed, onClose, moveHome, moveCodeList}) {
    const modalContentRef = useRef(null);

    // ESC 키 이벤트 핸들러
    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 27) {
            onClose();
        }
    }, [onClose]);

    const handleClickOutside = useCallback((event) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside, handleKeyDown, onClose]);

    function formatDate(timestamp) {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} / ${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className="modal">
            <div ref={modalContentRef} className="modal-content">
                <h2 className={"modal-title"}>🎉 Complete Typing 🎉</h2>
                <div className={"modal-content-infos"}>
                    <p className={"modal-date-now"}>{formatDate(Date.now())}</p>
                    <p className={"modal-content-time"}>
                        <span className={"time-title"}>Time</span>
                        <span className={"time-num"}>{time}</span>
                    </p>
                    <p className={"modal-content-speed"}>
                        <span className={"speed-title"}>Avg Speed</span>
                        <span className={"speed-num"}>{speed}</span>
                    </p>
                </div>
                <div className={"modal-content-buttons"}>
                    <button onClick={moveHome}>Home</button>
                    <button onClick={moveCodeList}>Code List</button>
                </div>
            </div>
        </div>
    );
}

export default TypingCompleteModal;