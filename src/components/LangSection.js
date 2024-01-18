import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RandomDescBtn from "../components/RandomDescBtn";
import axios from "axios";
import Loading from "../components/Loading";
import "../styles/TextListPage.css"

function LangSection({}) {
    // const [selectedLang, setSelectedLang] = useState("");

    const params = useParams()
    console.log(params.codeLang);
    const navigate = useNavigate();

    // params.codeLang = "JavaScript"; // 전달받은 언어 코드

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 데이터 불러오기 시작
            try {
                const res = await axios.get(`/api/${params.codeLang}/list?page=1&sortingType=TITLE_ASC`);
                if (res.status === 200) {
                    console.log(res);
                }
            } catch (error) {
                // navigate("/NotFound");
            } finally {
                setIsLoading(false); // 데이터 불러오기 완료
                // printLangName(); 
            }
        }

        fetchData();

        // if (params.selectedLang === null || isNaN(params.selectedLang)) {
        //     navigate("/NotFound");
        // } else {
        //     fetchData();
        // }
    }, [navigate, params.codeLang]);

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return (
        <div className={"language-section"}>

            {/* 언어표시버튼 */}
            {/* <button className="lang-button">{params.codeLang}</button> */}
            <span>{params.codeLang}</span>

            {/* 검색창 */}
            <input type="text" className="search-input" placeholder="검색"/>

            {/* 정렬방식 */}
            <select className="sort-select">
                <option value="name">이름</option>
                <option value="date">날짜</option>
            </select>

            {/* 랜덤버튼 */}
            <span>
            <RandomDescBtn selectedLang={params.codeLang}/>
            </span>
            
        </div>
    );
}

export default LangSection;