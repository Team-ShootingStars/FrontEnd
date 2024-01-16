// KeyboardLayout.js
import React from "react";
import "../styles/KeyboardLayout.css";
import KeyboardKey from "./KeyboardKey";

const keyboardKeys = [
    { label: "Esc", span: 2 }, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "😀",
    "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", { label: "⌫", span: 2 },
    { label: "Tap", span: 2 }, "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\",
    { label: "CapsLock", span: 2 }, "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", { label: "Enter", span: 2 },
    { label: "Shift", span: 2 }, "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", { label: "Shift", span: 3 },
    "Ctrl", "Opt", "Cmd", {label:"Space", span: 8}, "Cmd", "Opt", "Fn", "Ctrl"
];

const KeyboardLayout = () => {
    return (
        <div className={"keyboard-layout-container"}>
            <div className="keyboard-layout">
                {keyboardKeys.map((key, index) => (
                    <KeyboardKey key={index} value={key.label || key} span={key.span} />
                ))}
            </div>
        </div>
    );
};

export default KeyboardLayout;
