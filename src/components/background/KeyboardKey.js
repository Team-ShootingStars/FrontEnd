// KeyboardKey.js
import React, { useState, useEffect } from "react";

const KeyboardKey = ({ value, span }) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsActive(Math.random() < 0.1);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={`keyboard-key ${span ? `span-${span}` : ""} ${isActive ? "active" : ""}`}>
            {value}
        </div>
    );
};

export default KeyboardKey;
