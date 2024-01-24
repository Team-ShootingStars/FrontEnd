import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/LangSelectPage.css";
import javaIco from "../assets/JAVA.svg";
import jsIco from "../assets/js.svg";
import cppIco from "../assets/cpp.png";
import pythonIco from "../assets/python.svg";
import LangNotSelectedModal from "../components/modal/LangNotSelectedModal";
import KeyboardLayout from "../components/background/KeyboardLayout";
import axios from "axios";

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
      const encodeLang = encodeURIComponent(selectedLang);
      navigate(`/${encodeLang}/list`);
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

  const handleRandomDescBtnClick = async () => {
    // 에러 핸들링을 위한 try-catch 블록
    try {
      // selectedLang이 존재하는 경우에만 로직을 실행
      if (selectedLang) {
        // 서버로부터 랜덤 textId를 가져오기 위한 GET 요청
        const encodeLang = encodeURIComponent(selectedLang);
        const response = await axios.get(`/api/${encodeLang}/random`);
        // 응답 상태가 200인 경우에만 다음 단계로 진행
        if (response.status === 200) {
          const textId = response.data; // 서버에서 반환된 textId 추출
          const encodeId = encodeURIComponent(textId);

          // 새로운 경로를 생성하고 해당 경로로 이동
          navigate(`/${encodeLang}/description/${encodeId}`);
        }
      } else {
        openModal();
      }
    } catch (error) {
      // 오류 발생시 콘솔에 에러 기록
      navigate("/NotFound");
    }
  };

  const langButton = (type, img) => {
    return (
        <img
            src={img}
            alt={type}
            onClick={() => handleLangButtonClick(type)}
            className={`${type} ${selectedLang === type ? "selected" : ""}`}
        />
    )
  }

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
            {langButton("JAVA", javaIco)}
            {langButton("JS", jsIco)}
          </div>
          <div className="lang-button-container-2st">
            {langButton("CPP", cppIco)}
            {langButton("PYTHON", pythonIco)}
          </div>
        </div>
        <div className={"lang-bottom-button-container"}>
          <button
              className={"lang-select-random-button"}
              onClick={handleRandomDescBtnClick}
          >
            Random Track
          </button>
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