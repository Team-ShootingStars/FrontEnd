import React from "react";
import "../styles/Header.css";  // CSS 파일 임포트

function Header() {
    return (
        <div className="header">
            <a href="/" className="header-link">Code Sprinter</a>
        </div>
    );
}

export default Header;