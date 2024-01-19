import React from "react";

function TypingMainText({longText, currentIndex}) {
    return (
        <div className={"typingPage-long-text-container"}>
            {longText.map((text, index) => (
                <p
                    id={`line-${index}`}
                    key={index}
                    className={
                        index < currentIndex
                            ? "typingPage-current-text after"
                            : index === currentIndex
                                ? "typingPage-current-text current"
                                : "typingPage-current-text before" }
                >
                    {text}
                </p>
            ))}
        </div>
    )
}

export default TypingMainText;