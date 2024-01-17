import React from "react";
import "../styles/Footer.css"

function Footer() {
    return (
        <div className={"footer"}>
            <a href={"/AboutUs"} className={"AboutUs"}><span className={"imo"}>⭐</span> About Us</a>
            <p className={"footer-copy"}>&copy; Team Shooting Star</p>
        </div>
    );
}

export default Footer;