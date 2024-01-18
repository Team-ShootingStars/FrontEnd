import React from "react";
import "../styles/Header.css";
import logo from "../assets/logo.png";

function Header() {
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
        <div className={"header"}>
            <a href="/" className="header-link">
                <img
                    alt={logo}
                    src={logo}
                    onContextMenu={handleContextMenu}
                    onMouseDown={handleMouseDown}
                    onDragStart={handleDragStart}
                />
            </a>
        </div>
    );
}

export default Header;