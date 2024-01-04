import React from "react";

function TypingInfo({totalIndex, currentIndex, elapsedTime, typingSpeed, formatTime}) {
    return (
        <div className={"info-container"}>
            <p>Speed: <span className={"red-text"}>{typingSpeed}</span></p>
            <p>Time: {formatTime(elapsedTime)}</p>
            <p>Progress: {(currentIndex / totalIndex * 100).toFixed(0)}%</p>
            <p>Provider: SangWon</p>
        </div>
    );
}

export default TypingInfo;