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

    return (
        <div className="aboutUs-page">
            <BgAnimation />
            <Header />
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
                        <div className={"aboutUs-member"}>
                            <img
                                className={"photo"}
                                src={member1} alt={member1}
                                onContextMenu={handleContextMenu}
                                onMouseDown={handleMouseDown}
                                onDragStart={handleDragStart}
                            />
                            <div className={"introduce"}>
                                <p className={"name"}>박건우</p>
                                <p className={"position"}>Frontend</p>
                                <p className={"etc"}>Team Leader</p>
                            </div>
                        </div>
                        <div className={"aboutUs-member"}>
                            <img
                                className={"photo"}
                                src={member2}
                                alt={member2}
                                onContextMenu={handleContextMenu}
                                onMouseDown={handleMouseDown}
                                onDragStart={handleDragStart}
                            />
                            <div className={"introduce"}>
                                <p className={"name"}>최상원</p>
                                <p className={"position"}>Front, Back</p>
                                <p className={"etc"}>Project Manager</p>
                            </div>
                        </div>
                        <div className={"aboutUs-member"}>
                            <img
                                className={"photo"}
                                src={member3}
                                alt={member3}
                                onContextMenu={handleContextMenu}
                                onMouseDown={handleMouseDown}
                                onDragStart={handleDragStart}
                            />
                            <div className={"introduce"}>
                                <p className={"name"}>박경원</p>
                                <p className={"position"}>Frontend</p>
                            </div>
                        </div>
                        <div className={"aboutUs-member"}>
                            <img
                                className={"photo"}
                                src={member4}
                                alt={member4}
                                onContextMenu={handleContextMenu}
                                onMouseDown={handleMouseDown}
                                onDragStart={handleDragStart}
                            />
                            <div className={"introduce"}>
                                <p className={"name"}>홍태균</p>
                                <p className={"position"}>Frontend</p>
                            </div>
                        </div>
                        <div className={"aboutUs-member"}>
                            <img
                                className={"photo"}
                                src={member5}
                                alt={member5}
                                onContextMenu={handleContextMenu}
                                onMouseDown={handleMouseDown}
                                onDragStart={handleDragStart}
                            />
                            <div className={"introduce"}>
                                <p className={"name"}>송유현</p>
                                <p className={"position"}>Backend</p>
                            </div>
                        </div>
                        <div className={"aboutUs-member"}>
                            <img
                                className={"photo"}
                                src={member6}
                                alt={member6}
                                onContextMenu={handleContextMenu}
                                onMouseDown={handleMouseDown}
                                onDragStart={handleDragStart}
                            />
                            <div className={"introduce"}>
                                <p className={"name"}>이재현</p>
                                <p className={"position"}>Backend</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="lang-runner"
                onContextMenu={handleContextMenu}
                onMouseDown={handleMouseDown}
                onDragStart={handleDragStart}
            >
              <img src={runner} alt="러너" />
            </div>
            <Footer />
        </div>
    );
}

export default AboutUsPage;