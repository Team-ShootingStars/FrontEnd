import React, {useEffect} from "react";

function TypingInputText({text, inputValue, handleInputFocus, handleInputChange, handleEnterPress, isModalOpen}) {

    useEffect(() => {
        const inputElement = document.querySelector('input');
        if (inputElement) {
            inputElement.disabled = isModalOpen;
        }
    }, [isModalOpen]);

    const renderHighlightedText = () => {
        let inputChars = Array.from(inputValue);

        return Array.from(text).map((char, index) => {
            if (index < inputChars.length) {
                if (inputChars[index] === char) {
                    return (
                        <span key={index} className="green-text">{char}</span>
                    );
                } else {
                    if (char === ' ') {
                        return (
                            <span key={index} className="red-text" style={{ fontSize: '12.5px'}}>*</span>
                        );
                    } else {
                        return (
                            <span key={index} className="red-text">{char}</span>
                        );
                    }
                }
            } else {
                return <span key={index}>{char}</span>;
            }
        });
    }

    return (
        <div className={"typingPage-text-input-container"}>
            <p className={"typingPage-current-text"}>{renderHighlightedText()}</p>
            <input
                className={"typingPage-text-input"}
                type="text"
                placeholder={"Typing here..."}
                value={inputValue}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEnterPress();
                }}
            />
        </div>
    );
}

export default TypingInputText;