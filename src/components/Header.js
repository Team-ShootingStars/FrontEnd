import React from "react";
import "../styles/Header.css";
import {useLocation} from "react-router-dom";  // CSS 파일 임포트

function Header() {
    const location = useLocation();

    return (
        <div
            className={location.pathname.includes("/typing") ? "header" : "headerHome"}
        >
            <a href="/" className="header-link">Code Sprinter</a>
        </div>
    );
}

export default Header;