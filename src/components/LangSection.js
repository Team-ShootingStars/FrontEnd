import React from "react";

import "../styles/TextListPage.css"
import {useParams} from "react-router-dom";

function LangSection({}) {
    const params = useParams()

    return (
        <div className={"language-section"}>
            {/* 버튼 */}
            <button className="lang-button">{params.codeLang}</button>

            {/* 검색창 */}
            <input type="text" className="search-input" placeholder="검색"/>

            {/* 정렬방식 */}
            <select className="sort-select">
                <option value="name">이름</option>
                <option value="date">날짜</option>
            </select>

            {/* 랜덤버튼 */}
            <button className="random-button">랜덤</button>
        </div>
    );
}

export default LangSection;