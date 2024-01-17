import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RandomDescBtn from "../components/RandomDescBtn";
import { useNavigate } from "react-router-dom";
import "../styles/LangSelectPage.css";
import javaIco from "../assets/JAVA.svg";
import jsIco from "../assets/js.svg";
import cppIco from "../assets/cpp.png";
import pythonIco from "../assets/python.svg";
import LangNotSelectedModal from "../components/modal/LangNotSelectedModal";
import KeyboardLayout from "../components/KeyboardLayout";

function LangSelectPage() {
  const [selectedLang, setSelectedLang] = useState(""); // 선택된 언어를 저장하는 상태 변수
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  // 클릭 이벤트 핸들러
  const handleLangButtonClick = (lang) => {
    setSelectedLang(lang); // 클릭된 언어를 상태 변수에 설정
  };

  const handleSelectDescBtnClick = () => {
    if (selectedLang) {
      navigate(`/${selectedLang}/list`);
    } else {
      openModal();
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

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
    <div className="lang-select-page">
      <KeyboardLayout/>
      <Header />
      <div className={"langSelectPage-main-container"}>
        <h1 className={"select-stadium"}>Select Stadium</h1>
        <div
          className="lang-top-button-container"
          onContextMenu={handleContextMenu}
          onMouseDown={handleMouseDown}
          onDragStart={handleDragStart}
        >
          <div className="lang-button-container-1st">
            <img
              src={javaIco}
              alt={"자바"}
              onClick={() => handleLangButtonClick("JAVA")}
              className={selectedLang === "JAVA" ? "JAVA selected" : "JAVA"}
            />
            <img
              src={jsIco}
              alt={"자바스크립트"}
              onClick={() => handleLangButtonClick("JS")}
              className={selectedLang === "JS" ? "JS selected" : "JS"}
            />
          </div>
          <div className="lang-button-container-2st">
            <img
              src={cppIco}
              alt={"CPP"}
              onClick={() => handleLangButtonClick("CPP")}
              className={selectedLang === "CPP" ? "CPP selected" : "CPP"}
            />
            <img
              src={pythonIco}
              alt={"Python"}
              onClick={() => handleLangButtonClick("PYTHON")}
              className={
                selectedLang === "PYTHON" ? "PYTHON selected" : "PYTHON"
              }
            />
          </div>
        </div>
        <div className={"lang-bottom-button-container"}>
          <RandomDescBtn selectedLang={selectedLang} openModal={openModal} />
          <button
            className={"lang-select-list-button"}
            onClick={handleSelectDescBtnClick}
          >
            Select Track
          </button>
        </div>
      </div>
      {isModalVisible && <LangNotSelectedModal onClose={closeModal} />}
      <Footer />
    </div>
  );
}

export default LangSelectPage;
