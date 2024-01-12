import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RandomDescBtn({ selectedLang }) {
  const navigate = useNavigate();

  // 클릭 이벤트 핸들러
  const handleRandomDescBtnClick = async () => {
    // 에러 핸들링을 위한 try-catch 블록
    try {
      // selectedLang이 존재하는 경우에만 로직을 실행
      if (selectedLang) {
        // 서버로부터 랜덤 textId를 가져오기 위한 GET 요청
        const response = await axios.get(`/api/${selectedLang}/random`);
        // 응답 상태가 200인 경우에만 다음 단계로 진행
        if (response.status === 200) {
          const textId = response.data; // 서버에서 반환된 textId 추출
          // 새로운 경로를 생성하고 해당 경로로 이동
          navigate(`/${selectedLang}/description/${textId}`);
        }
      } else {
        alert("언어를 선택해주세요.");
      }
    } catch (error) {
      // 오류 발생시 콘솔에 에러 기록
      navigate("/NotFound");
    }
  };

  return (
    <div>
      <button className={"lang-select-random-button"} onClick={handleRandomDescBtnClick}>
        Random Track
      </button>
    </div>
  );
}

export default RandomDescBtn;
