import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import RandomDescBtn from "../components/RandomDescBtn";
import axios from "axios";
import Loading from "../components/Loading";
import "../styles/TextListPage.css"

function LangSection({}) {
    const params = useParams()
    const navigate = useNavigate();
    params.codeLang = "JavaScript"; // 전달받은 언어 코드

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 데이터 불러오기 시작
            try {
                const res = await axios.get(`/api/${selectedLang}/list?page=1&order=name`);
                if (res.status === 200) {
                    setLONG_TEXTS(res.data);
                    setTotalIndex(res.data.length);
                }
            } catch (error) {
                navigate("/NotFound");
            } finally {
                setIsLoading(false); // 데이터 불러오기 완료
                printLangName();
            }
        }

        if (params.codeLang === null || isNaN(params.codeLang)) {
            navigate("/NotFound");
        } else {
            fetchData();
        }
    }, [navigate, params.codeLang]);

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return (
        <div className={"language-section"}>
            {/* 언어표시버튼 */}
            <button className="lang-button">{params.codeLang}</button>

            {/* 검색창 */}
            <input type="text" className="search-input" placeholder="검색"/>

            {/* 정렬방식 */}
            <select className="sort-select">
                <option value="name">이름</option>
                <option value="date">날짜</option>
            </select>

            {/* 랜덤버튼 */}
            <RandomDescBtn selectedLang={selectedLang}/>
        </div>
    );
}

export default LangSection;

