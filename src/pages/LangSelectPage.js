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
    // 선택한 언어가 없다면 페이지를 다시 로드
    if (!selectedLang) {
      window.location.reload();
    } else {
      // 선택한 언어를 이용하여 새로운 경로를 생성하고 이동합니다.
      const newPath = `/${selectedLang}/list`;
      navigate(newPath);
    }
  };

  return (
    <div>
      <Header />
      <div class={"main-container"}>
        <div class="langs-btn">
          <div class="langs-1st">
            <button
              onClick={() => handleLangButtonClick("JAVA")}
              class={selectedLang === "JAVA" ? "selected" : ""}
            >
              JAVA
            </button>
            <button
              onClick={() => handleLangButtonClick("javascript")}
              class={selectedLang === "javascript" ? "selected" : ""}
            >
              JavaScript
            </button>
          </div>
          <div class="langs-2nd">
            <button
              onClick={() => handleLangButtonClick("cpp")}
              class={selectedLang === "cpp" ? "selected" : ""}
            >
              C++
            </button>
            <button
              onClick={() => handleLangButtonClick("python")}
              class={selectedLang === "python" ? "selected" : ""}
            >
              Python
            </button>
          </div>
        </div>
        <div class={"btn-container"}>
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
