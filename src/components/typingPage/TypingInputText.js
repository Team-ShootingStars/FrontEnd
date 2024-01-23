import React, {useCallback, useEffect} from "react";

function TypingInputText({text, inputValue, handleInputFocus, handleInputChange, handleEnterPress, isModalOpen, inputRef, currentRef}) {

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.disabled = isModalOpen;
        }
    }, [inputRef, isModalOpen]);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 input 요소에 포커스 설정
        inputRef.current.focus();
    }, [inputRef]);

    const handlePaste = useCallback((e) => {
        e.preventDefault();
        // 붙여넣기 시도가 있으면 입력을 취소합니다.
    }, []);

    useEffect(() => {
        const handlePasteEvent = (e) => handlePaste(e);

        const instance = inputRef.current

        if (instance) {
            instance.addEventListener("paste", handlePasteEvent);
        }

        return () => {
            if (instance) {
                instance.removeEventListener("paste", handlePasteEvent);
            }
        };
    }, [handlePaste, inputRef]);

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
            <p
                ref={currentRef}
                className={"typingPage-input-current-text"}>{renderHighlightedText()}
            </p>
            <input
                className={"typingPage-text-input"}
                id={"typingPage-text-input"}
                type="text"
                placeholder={"Typing here..."}
                value={inputValue}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEnterPress();
                }}
                autoComplete={"off"}
                spellCheck={"false"}
                ref={inputRef}
            />
        </div>
    );
}

export default TypingInputText;