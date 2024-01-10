import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RandomDescBtn from "../components/RandomDescBtn";
import { useNavigate } from "react-router-dom";
import "../styles/LangSelectPage.css";

function LangSelectPage() {
  const [selectedLang, setSelectedLang] = useState(""); // 선택된 언어를 저장하는 상태 변수
  const navigate = useNavigate();

  // 클릭 이벤트 핸들러
  const handleLangButtonClick = (lang) => {
    setSelectedLang(lang); // 클릭된 언어를 상태 변수에 설정
  };

  const handleSelectDescBtnClick = () => {
    if (selectedLang) {
      navigate(`/${selectedLang}/list`);
    } else {
      // selectedLang이 falsy 값일 경우 (즉, 선택되지 않았을 경우) 경고 메시지 표시
      alert("언어를 선택해주세요.");
    }
    // selectedLang이 falsy 값이면 여기까지 도달하고 함수가 종료
  };

  return (
    <div>
      <Header />
      <div className={"main-container"}>
        <div className="langs-btn">
          <div className="langs-1st">
            <button
              onClick={() => handleLangButtonClick("JAVA")}
              className={selectedLang === "JAVA" ? "selected" : ""}
            >
              JAVA
            </button>
            <button
              onClick={() => handleLangButtonClick("JS")}
              className={selectedLang === "JS" ? "selected" : ""}
            >
              JavaScript
            </button>
          </div>
          <div className="langs-2nd">
            <button
              onClick={() => handleLangButtonClick("CPP")}
              className={selectedLang === "CPP" ? "selected" : ""}
            >
              C++
            </button>
            <button
              onClick={() => handleLangButtonClick("PYTHON")}
              className={selectedLang === "PYTHON" ? "selected" : ""}
            >
              Python
            </button>
          </div>
        </div>
        <div className={"btn-container"}>
          <RandomDescBtn selectedLang={selectedLang} />
          <button id="selectdesc-button" onClick={handleSelectDescBtnClick}>
            지문 선택
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LangSelectPage;
