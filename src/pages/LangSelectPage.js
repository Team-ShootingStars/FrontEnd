import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RandomDescBtn from "../components/RandomDescBtn";
import { useNavigate } from "react-router-dom";
import "../styles/LangSelectPage.css";
import javaIco from "../assets/JAVA.svg"
import jsIco from "../assets/js.svg"
import cppIco from "../assets/cpp.png"
import pythonIco from "../assets/python.svg"


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
        <Header/>
        <div className={"langSelectPage-main-container"}>
          <h1 className={"select-stadium"}>Select Your Stadium</h1>
          <div className="lang-top-button-container">
            <div className="lang-button-container-1st">
              <img src={javaIco}
                   alt={"자바"}
                   onClick={() => handleLangButtonClick("JAVA")}
                   className={selectedLang === "JAVA" ? "JAVA selected" : "JAVA"}
              />
              <img src={jsIco}
                   alt={"자바스크립트"}
                   onClick={() => handleLangButtonClick("JS")}
                   className={selectedLang === "JS" ? "JS selected" : "JS"}
              />
            </div>
            <div className="lang-button-container-2st">
              <img src={cppIco}
                   alt={"CPP"}
                   onClick={() => handleLangButtonClick("CPP")}
                   className={selectedLang === "CPP" ? "CPP selected" : "CPP"}
              />
              <img src={pythonIco}
                   alt={"Python"}
                   onClick={() => handleLangButtonClick("PYTHON")}
                   className={selectedLang === "PYTHON" ? "PYTHON selected" : "PYTHON"}
              />
            </div>
          </div>
          <div className={"lang-bottom-button-container"}>
            <RandomDescBtn selectedLang={selectedLang}/>
            <button className={"lang-select-list-button"} onClick={handleSelectDescBtnClick}>
              Select Track
            </button>
          </div>
        </div>
        <Footer/>
      </div>
  );
}

export default LangSelectPage;
