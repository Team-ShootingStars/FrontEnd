import React, {useCallback, useEffect, useRef, useState} from "react";
import Footer from "../components/Footer";
import TypingMainText from "../components/typingPage/TypingMainText";
import TypingInfo from "../components/typingPage/TypingInfo";
import Header from "../components/Header";
import TypingInputText from "../components/typingPage/TypingInputText";

import "../styles/TypingPage.css"
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import TypingCompleteModal from "../components/modal/TypingCompleteModal";
import Loading from "../components/Loading";

function TypingPage() {
    const [LONG_TEXTS, setLONG_TEXTS] = useState(['']);
    const [totalIndex, setTotalIndex] = useState(0);
    const [author, setAuthor] = useState('');

    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const [startTime, setStartTime] = useState(null);
    const [typedChars, setTypedChars] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(0);  // 실시간 타이핑 속도 상태

    const [elapsedTime, setElapsedTime] = useState(null);  // 경과된 시간 상태

    const [totalTypingSpeed, setTotalTypingSpeed] = useState(0);
    const [totalElapsedTime, setTotalElapsedTime] = useState(null);
    const [emptyLineCount, setEmptyLineCount] = useState(0);


    const [showCompleteModal, setShowCompleteModal] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const currentRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 데이터 불러오기 시작
            try {
                const res = await axios.get('/api/' + encodeURIComponent(params.codeLang) + '/typingText/' + encodeURIComponent(params.textId));
                if (res.status === 200) {
                    const text = JSON.parse(res.data.typingText);
                    setLONG_TEXTS(text);
                    setTotalIndex(text.length);
                    setAuthor(res.data.author)
                }
            } catch (error) {
                navigate("/NotFound");
            } finally {
                setIsLoading(false); // 데이터 불러오기 완료
            }
        }

        if (params.textId === null || isNaN(params.textId)) {
            navigate("/NotFound");
        } else {
            fetchData();
        }
    }, [navigate, params.codeLang, params.textId]);

    // elapsedTime 을 업데이트하는 useEffect
    useEffect(() => {
        const elapsedTimer = setInterval(() => {
            if (elapsedTime !== null) {
                setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
            }
        }, 1000);

        return () => clearInterval(elapsedTimer);
    }, [elapsedTime]);

    // typingSpeed 를 업데이트하는 useEffect
    useEffect(() => {
        const calculateTypingSpeed = () => {
            if (!startTime || typedChars === 0) {
                return 0;
            }

            const endTime = Date.now();
            const durationInMinutes = (endTime - startTime) / 1000;
            const speed = (typedChars / durationInMinutes) * 60;

            return Math.round(speed)}

        const timer = setInterval(() => {
            const speed = calculateTypingSpeed();
            setTypingSpeed(speed);
        }, 50);

        return () => clearInterval(timer);
    }, [typedChars, startTime]);

    const scrollMove = useCallback((type) => {
        const currentLineElement = document.getElementById(`line-${currentIndex}`);
        if (currentLineElement) {
            if (type === 0) {
                currentLineElement.scrollIntoView({behavior: "smooth", block: "center"});
            } else {
                currentLineElement.scrollIntoView({behavior: "auto", block: "center"});
            }
        }
    }, [currentIndex]);

    useEffect(() => {
        scrollMove(0);
    }, [currentIndex, scrollMove])

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
        scrollMove(1);
    }, [elapsedTime, startTime, scrollMove]);

    const handleInputFocus = useCallback(() => {
        scrollMove(0);
    }, [scrollMove]);

    const typingEnd = useCallback(() => {
        setTotalElapsedTime(elapsedTime);
        setShowCompleteModal(true);

        setCurrentIndex(0);
        setElapsedTime(null);
    },[elapsedTime]);

    const handleEnterPress = useCallback(() => {
        if (inputValue === LONG_TEXTS[currentIndex].trim()) {
            setTotalTypingSpeed(totalTypingSpeed + typingSpeed);
            if (currentIndex === totalIndex - 1) { // 마지막 줄인지 확인
                typingEnd();
            } else {
                let nextIndex = currentIndex + 1;
                let emptyLine = emptyLineCount;
                // 다음 텍스트가 비어 있는 경우를 처리
                while (LONG_TEXTS[nextIndex].trim().length === 0) {
                    nextIndex++;
                    emptyLine++;
                    if (nextIndex === totalIndex) {
                        typingEnd();
                        nextIndex = 0;
                        break
                    }
                }
                setEmptyLineCount(emptyLine);
                setCurrentIndex(nextIndex);
            }
            setInputValue('');
            setStartTime(null);
            setTypedChars(0);

        } else if (inputValue !== '' && inputValue !== LONG_TEXTS[currentIndex].trim()) {
            if (currentRef.current) {
                const currentTextElement = currentRef.current;
                currentTextElement.classList.add('shake');
                setTimeout(() => {
                    currentTextElement.classList.remove('shake');
                }, 500);
            }
        }
    }, [LONG_TEXTS, currentIndex, emptyLineCount, inputValue, totalIndex, totalTypingSpeed, typingEnd, typingSpeed]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const hoursStr = hours > 0 ? `${hours}:` : '';
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secondsStr = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

        return `${hoursStr}${minutesStr}:${secondsStr}`;
    }

    const handleCloseTypingCompleteModal = () => {
        setShowCompleteModal(false);
        setTotalElapsedTime(null);
        setTotalTypingSpeed(0);
        setEmptyLineCount(0);
    }
    const handleMoveHome = () => {
        handleCloseTypingCompleteModal()
        navigate("/")
    };
    const handleMoveCodeList = () => {
        handleCloseTypingCompleteModal()
        navigate("/" + encodeURIComponent(params.codeLang) + "/list");
    };

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return (
        <div>
            <Header/>
            <div className={"typingPage-main-container"}>
                {/*<div className={"ad"}>*/}
                {/*    <p>광고</p>*/}
                {/*</div>*/}
                <TypingMainText longText={LONG_TEXTS} currentIndex={currentIndex}/>
                <TypingInfo
                    currentIndex={currentIndex}
                    totalIndex={totalIndex}
                    author={author}
                    typingSpeed={typingSpeed}
                    elapsedTime={formatTime(elapsedTime)}
                    isModalOpen={showCompleteModal}
                />
                <TypingInputText
                    text={LONG_TEXTS[currentIndex].trim()}
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    handleEnterPress={handleEnterPress}
                    handleInputFocus={handleInputFocus}
                    isModalOpen={showCompleteModal}
                    currentRef={currentRef}
                    inputRef={inputRef}
                />
            </div>
            <Footer/>
            {showCompleteModal && (
                <TypingCompleteModal
                    time={formatTime(totalElapsedTime)}
                    speed={Math.round(totalTypingSpeed / (totalIndex - emptyLineCount))}
                    onClose={handleCloseTypingCompleteModal}
                    moveHome={handleMoveHome}
                    moveCodeList={handleMoveCodeList}
                />
            )}
        </div>
    );
}

export default TypingPage;