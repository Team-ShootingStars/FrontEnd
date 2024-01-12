import React, { useState, useEffect } from "react";
import runner from "../assets/runner.gif";

function TypingInfo({ totalIndex, currentIndex, elapsedTime, typingSpeed, isModalOpen }) {
    const [progressWidth, setProgressWidth] = useState(0);

    useEffect(() => {
        if (isModalOpen) {
            setProgressWidth( 100);
        } else {
            setProgressWidth((currentIndex / totalIndex) * 100);
        }
    }, [currentIndex, isModalOpen, totalIndex]);

    const imagePosition = {
        left: `calc(${progressWidth}% - 18px)`,
        transition: "left 0.3s ease",
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        e.preventDefault();
    };

    return (
        <div className={"typingPage-info-container"}>
            <p className={"pace"}>
                Pace: <span className={"red-text"}>{typingSpeed}</span>
            </p>
            <p className={"time"}>Time: {elapsedTime}</p>
            <p className={"offer"}>Provider : ShootingStar</p>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progressWidth}%` }}></div>
                <div className="image-overlay" style={imagePosition}>
                    <img src={runner}
                         alt="러너"
                         onContextMenu={handleContextMenu}
                         onMouseDown={handleMouseDown}
                         onDragStart={handleDragStart}
                    />
                </div>
            </div>
        </div>
    );
}

export default TypingInfo;