import React from "react";

function TypingMainText({longText, currentIndex}) {
    return (
        <div className={"typingPage-long-text-container"}>
            {longText.map((text, index) => (
                <p
                    id={`line-${index}`}
                    key={index}
                    style={{
                        color: index < currentIndex ? 'white' : 'gray',
                        border: index === currentIndex ? '2px solid #6A0DAD' : 'none',
                        padding: '5px',
                    }}
                >
                    {text}
                </p>
            ))}
        </div>
    )
}

export default TypingMainText;