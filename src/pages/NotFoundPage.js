import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/NotFoudPage.css";
import errorLogo from "../assets/error-404.png"

function NotFoundPage() {
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        const originalText = "페이지를 찾을 수 없습니다.";
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex <= originalText.length) {
                setTypedText(originalText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Header />
            <div className={"error404Page-container"}>
                <div>
                    <img
                        src={errorLogo}
                        className={"error404-img"}
                        alt={"404"}
                    />
                    <h1 className={"error404Page-h1"}>{typedText}<span className="error404Page-cursor-animation"></span></h1>
                    <p className={"error404Page-p"}>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NotFoundPage;
