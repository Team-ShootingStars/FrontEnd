import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SelectDescBtn() {
  const navigate = useNavigate();
  const params = useParams()
  // 클릭 이벤트 핸들러
  
  return (
    <div>
      <button className={"lang-select-random-button"}>
        지문 선택
      </button>
    </div>
  );
}

export default SelectDescBtn;
