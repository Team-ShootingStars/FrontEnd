import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TrackListInfo({lang, inputValue, handleInputChange, handleEnterPress, sortingType, handleSortingChange}) {
    const navigate = useNavigate();

    const handleRandomDescBtnClick = async () => {
        // 에러 핸들링을 위한 try-catch 블록
        try {
            // selectedLang이 존재하는 경우에만 로직을 실행
            const response = await axios.get(`/api/${lang}/random`);
            // 응답 상태가 200인 경우에만 다음 단계로 진행
            if (response.status === 200) {
                const textId = response.data; // 서버에서 반환된 textId 추출
                // 새로운 경로를 생성하고 해당 경로로 이동
                navigate(`/${lang}/description/${textId}`);
            }
        } catch (error) {
            // 오류 발생시 콘솔에 에러 기록
            navigate("/NotFound");
        }
    };

    return (
        <div className="trackList-top-sub-container">
            <div className="top-sub-container-left">
                <h1>{lang}</h1>
            </div>
            <div className={"top-sub-container-center"}>
                <input
                    type="text"
                    id={"searchBox"}
                    placeholder="Search..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleEnterPress();
                    }}
                    autoComplete={"off"}
                    spellCheck={"false"}
                />

                <select
                    id={"sortingType"}
                    value={sortingType}
                    onChange={handleSortingChange}
                >
                    <option id={"sortingType1"} value="DATE_ASC">Up to Date</option>
                    <option id={"sortingType2"} value="DATE_DESC">Out of Date</option>
                    <option id={"sortingType3"} value="TITLE_ASC">Title ⬆️</option>
                    <option id={"sortingType4"} value="TITLE_DESC">Title ⬇️</option>
                </select>
            </div>
            <div className="top-sub-container-right">
                <button onClick={handleRandomDescBtnClick}>
                    Random Track
                </button>
            </div>
        </div>
    )
}

export default TrackListInfo;