import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/NotFoudPage.css";
import errorLogo from "../assets/error-404.png"

function NotFoundPage() {
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        const originalText = "PAGE NOT FOUND";
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
        <div>
            <Header />
            <div className={"error404Page-container"}>
                <div>
                    <img
                        src={errorLogo}
                        className={"error404-img"}
                        alt={"404"}
                        onContextMenu={handleContextMenu}
                        onMouseDown={handleMouseDown}
                        onDragStart={handleDragStart}
                    />
                    <h1 className={"error404Page-h1"}>{typedText}<span className="error404Page-cursor-animation"></span></h1>
                    <p className={"error404Page-p"}>Sorry, the page you requested could not be found.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NotFoundPage;
