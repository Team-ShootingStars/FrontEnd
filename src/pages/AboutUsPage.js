import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/AboutUsPage.css"
import BgAnimation from "../components/BgAnimation";
import runner from "../assets/runner.gif";
import logo from "../assets/logo.png";

import member1 from "../assets/member1.jpg";
import member2 from "../assets/member2.jpeg";
import member3 from "../assets/member3.png";
import member4 from "../assets/member4.png";
import member5 from "../assets/member5.jpg";
import member6 from "../assets/member6.jpg";

function AboutUsPage() {

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        e.preventDefault();
    };

    const memberDiv = (img, name, position, etc, link) => {
        return (
            <div className={"aboutUs-member"}>
                <a
                    href={"https://github.com/" + link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className={"photo"}
                        src={img} alt={img}
                        onContextMenu={handleContextMenu}
                        onMouseDown={handleMouseDown}
                        onDragStart={handleDragStart}
                    />
                </a>
                <div className={"introduce"}>
                    <p className={"name"}>{name}</p>
                    <p className={"position"}>{position}</p>
                    {etc !== null ? <p className={"etc"}>{etc}</p> : ""}
                </div>
            </div>
        );
    }

    return (
        <div className="aboutUs-page">
            <BgAnimation/>
            <Header/>
            <div className={"aboutUs-main-container"}>
                <div className={"project-introduce-section"}>
                    <img
                        alt={logo} src={logo}
                        onContextMenu={handleContextMenu}
                        onMouseDown={handleMouseDown}
                        onDragStart={handleDragStart}
                    />
                    <p>
                        개발자들을 위한 새로운 학습 경험을 제공하는 프로젝트입니다.
                        Code Sprinter는 JAVA, JS, CPP, PYTHON과 같은 다양한 프로그래밍 언어로 이루어진 코드 타자 연습 플랫폼입니다.
                    </p>
                    <p>
                        Code Sprinter의 핵심 목표는 개발자들이 효과적으로 타자 속도를 향상시키고,
                        동시에 자신이 사용하는 언어의 문법에 더욱 익숙해지는 데 도움을 주는 것입니다.
                        우리는 타자 연습을 통해 개발자들이 더 빠르고 정확하게 코드를 입력할 수 있도록 돕고,
                        프로그래밍 언어의 특성을 더 깊이 이해할 수 있도록 지원합니다.
                    </p>
                </div>
                <div className={"team-introduce-section"}>
                    <h2>Team Shooting Star</h2>
                    <div className={"aboutUs-member-container"}>
                        {memberDiv(member1, "박건우", "Frontend", "TeamLeader", "bingo4xg")}
                        {memberDiv(member2, "최상원", "Front, Back", "Project Manager", "dnjs2721")}
                        {memberDiv(member3, "박경원", "Frontend", null, "justashow")}
                        {memberDiv(member4, "홍태균", "Frontend", null, "Hong-bjj")}
                        {memberDiv(member5, "송유현", "Backend", null, "dbgus1006")}
                        {memberDiv(member6, "이재현", "Backend", null, "jhlee343")}
                    </div>
                </div>
            </div>
            <div
                className="lang-runner"
                onContextMenu={handleContextMenu}
                onMouseDown={handleMouseDown}
                onDragStart={handleDragStart}
            >
                <img src={runner} alt="러너"/>
            </div>
            <Footer/>
        </div>
    );
}

export default AboutUsPage;