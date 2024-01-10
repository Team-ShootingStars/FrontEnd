import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RandomDescBtn({ selectedLang }) {
  const navigate = useNavigate();

  // 클릭 이벤트 핸들러
  const handleRandomDescBtnClick = async () => {
    try {
      if (!selectedLang) {
        return; // 선택된 언어가 없으면 아무 동작도 하지 않음
      }

      // 서버에 GET 요청 보내기
      const response = await axios.get(`/api/${selectedLang}/random`);
      console.log(response);
      if (response.status === 200) {
        const textId = response.data; // 서버에서 반환한 textIds
        console.log(textId);

        // 선택된 언어와 랜덤으로 선택된 textId를 사용하여 새로운 경로 생성
        const newPath = `/${selectedLang}/description/${textId}`;
        navigate(newPath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button id="randomdesc-button" onClick={handleRandomDescBtnClick}>
        지문 랜덤 선택
      </button>
    </div>
  );
}

export default RandomDescBtn;
