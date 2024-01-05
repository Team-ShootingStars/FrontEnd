import React from "react";

function TypingInfo({totalIndex, currentIndex, elapsedTime, typingSpeed}) {
    return (
        <div className={"info-container"}>
            <p>Speed: <span className={"red-text"}>{typingSpeed}</span></p>
            <p>Time: {elapsedTime}</p>
            <p>Progress: {Math.round(currentIndex / totalIndex * 100)}%</p>
        </div>
    );
}

export default TypingInfo;