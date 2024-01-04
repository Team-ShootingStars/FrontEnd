import React, {useCallback, useEffect, useState} from "react";
import Footer from "../components/Footer";
import MainText from "../components/MainText";
import TypingInfo from "../components/TypingInfo";
import Header from "../components/Header";
import InputText from "../components/InputText";

import "../styles/TypingPage.css"
import axios from "axios";
import {useParams} from "react-router-dom";

function TypingPage() {
    const [LONG_TEXTS, setLONG_TEXTS] = useState(['']);
    const [totalIndex, setTotalIndex] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const [startTime, setStartTime] = useState(null);
    const [typedChars, setTypedChars] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState('0');  // 실시간 타이핑 속도 상태

    const [elapsedTime, setElapsedTime] = useState(null);  // 경과된 시간 상태

    const params = useParams();

    useEffect(() => {
        axios('/get/' + params.textId)
            .then(res => {
                setLONG_TEXTS(res.data);
                setTotalIndex(res.data.length)
            });
    }, [params.textId]);

    useEffect(() => {
        const preventPaste = (e) => {
            e.preventDefault();
        };

        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('paste', preventPaste);
        });

        return () => {
            inputs.forEach(input => {
                input.removeEventListener('paste', preventPaste);
            });
        };
    }, []);

    // elapsedTime을 업데이트하는 useEffect
    useEffect(() => {
        const elapsedTimer = setInterval(() => {
            if (elapsedTime !== null) {
                setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
            }
        }, 1000);

        return () => clearInterval(elapsedTimer);
    }, [elapsedTime]);

    // typingSpeed를 업데이트하는 useEffect
    useEffect(() => {
        const calculateTypingSpeed = () => {
            if (!startTime || typedChars === 0) {
                return '0';
            }

            const endTime = Date.now();
            const durationInMinutes = (endTime - startTime) / 1000;
            const speed = (typedChars / durationInMinutes) * 60;

            return `${speed.toFixed(0)}`;
        }

        const timer = setInterval(() => {
            const speed = calculateTypingSpeed();
            setTypingSpeed(speed);
        }, 50);

        return () => clearInterval(timer);
    }, [typedChars, startTime]);

    const scrollMove = useCallback(() => {
        const currentLineElement = document.getElementById(`line-${currentIndex}`);
        if (currentLineElement) {
            currentLineElement.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }, [currentIndex]);

    const handleInputChange = useCallback((e) => {
        if (elapsedTime === null) {
            setElapsedTime(0);
        }
        if (!startTime) {
            setStartTime(Date.now());
        }
        if (e.target.value.length === 0) {
            setStartTime(null);
            setTypedChars(0);
        }
        setTypedChars(e.target.value.length);

        setInputValue(e.target.value);
        scrollMove();
    }, [elapsedTime, startTime, scrollMove]);

    const handleInputFocus = useCallback(() => {
        scrollMove();
    }, [scrollMove]);

    const typingEnd = useCallback(() => {
        alert('경과시간 = ' + formatTime(elapsedTime));
        setCurrentIndex(0);
        setElapsedTime(null);
    }, [elapsedTime]);

    const handleEnterPress = useCallback(() => {
        if (inputValue === LONG_TEXTS[currentIndex].trim()) {
            if (currentIndex === totalIndex - 1) { // 마지막 줄인지 확인
                typingEnd();
            } else {
                let nextIndex = currentIndex + 1;
                // 다음 텍스트가 비어 있는 경우를 처리
                while (LONG_TEXTS[nextIndex].trim().length === 0) {
                    nextIndex++;
                    if (nextIndex === totalIndex - 1) {
                        typingEnd();
                        nextIndex = 0;
                        break
                    }
                }
                setCurrentIndex(nextIndex);
            }
            setInputValue('');
            setStartTime(null);
            setTypedChars(0);

            scrollMove();
        }
    }, [LONG_TEXTS, currentIndex, inputValue, scrollMove, totalIndex, typingEnd]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const hoursStr = hours > 0 ? `${hours}:` : '';
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secondsStr = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

        return `${hoursStr}${minutesStr}:${secondsStr}`;
    }

    return (
        <div>
            <Header/>
            <div className={"main-container"}>
                <MainText longText={LONG_TEXTS} currentIndex={currentIndex}/>
                <TypingInfo
                    currentIndex={currentIndex}
                    totalIndex={totalIndex}
                    typingSpeed={typingSpeed}
                    elapsedTime={elapsedTime}
                    formatTime={formatTime}
                />
                <InputText
                    text={LONG_TEXTS[currentIndex].trim()}
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    handleEnterPress={handleEnterPress}
                    handleInputFocus={handleInputFocus}
                />
            </div>
            <Footer/>
        </div>
    );
}

export default TypingPage;