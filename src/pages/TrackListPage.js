import React, {useState, useEffect, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import "../styles/TrackListPage.css"

import Header from "../components/Header";
import Footer from "../components/Footer";

function TrackListPage() {

    const params = useParams()

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [sortingType, setSortingType] = useState("ID_ASC");
    const [searchValue, setSearchValue] = useState("");
    const [inputValue, setInputValue] = useState("");

    let isFirstLoading = useRef(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isFirstLoading.current) {
                setIsLoading(true); // 데이터 불러오기 시작
            }
            try {
                // url값 정의 + 검색값 있으면 뒤에 붙임
                let url = '/api/'+ params.codeLang + '/list?page=' + currentPage + '&sortingType=' + sortingType;
                if (searchValue !== "" ) {
                    url += "&search=" + searchValue;
                }
                // url 적용
                const res = await axios.get(url);

                if (res.status === 200) {
                    setTotalRecord(res.data.page.totalRecord);
                    setTotalPage(res.data.page.totalPage);
                    setPosts(res.data.texts);
                }
            } catch (error) {
                navigate("/NotFound");
            } finally {
                if (isFirstLoading) {
                    setIsLoading(false); // 데이터 불러오기 완료
                    isFirstLoading.current = false;
                }
            }
        }

        fetchData();
    }, [navigate, params.codeLang, currentPage, searchValue, sortingType]);

    const handleRandomDescBtnClick = async () => {
        // 에러 핸들링을 위한 try-catch 블록
        try {
            // selectedLang이 존재하는 경우에만 로직을 실행
            const response = await axios.get(`/api/${params.codeLang}/random`);
            // 응답 상태가 200인 경우에만 다음 단계로 진행
            if (response.status === 200) {
                const textId = response.data; // 서버에서 반환된 textId 추출
                // 새로운 경로를 생성하고 해당 경로로 이동
                navigate(`/${params.codeLang}/description/${textId}`);
            }
        } catch (error) {
            // 오류 발생시 콘솔에 에러 기록
            navigate("/NotFound");
        }
    };

    const handleTrackClick = (id) => {
        navigate(`/${params.codeLang}/description/${id}`);
    }

    const handleAuthorButtonClick = (e, author) => {
        e.stopPropagation();
        window.open("https://github.com/" + author);
    }

    const handleSortingChange = (event) => {
        setSortingType(event.target.value);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleEnterPress = () => {
        let value = inputValue;
        if (inputValue.indexOf("\\") !== -1) {
            value = value.replaceAll("\\", '');
        }
        if (inputValue.indexOf("|") !== -1) {
            value = value.replaceAll("|", '');
        }
        setSearchValue(value);
    }

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleBigPrevious = () => {
        const newPage = Math.max(1, currentPage - 5); // 한 번에 5 페이지씩 이전으로 이동
        setCurrentPage(newPage);
    };

    const handleBigNext = () => {
        const newPage = Math.min(totalPage, currentPage + 5); // 한 번에 5 페이지씩 다음으로 이동
        setCurrentPage(newPage);
    };

    const renderPageNumbers = () => {
        const pageGroupSize = 5; // 한 번에 보여질 페이지 번호의 수
        const currentGroup = Math.ceil(currentPage / pageGroupSize);

        const startPage = (currentGroup - 1) * pageGroupSize + 1;
        const endPage = Math.min(currentGroup * pageGroupSize, totalPage);

        return [...Array(endPage - startPage + 1).keys()].map(offset => (
            <button
                key={startPage + offset}
                onClick={() => setCurrentPage(startPage + offset)}
                className={`page-number-button ${currentPage === startPage + offset ? "selected" : ""}`}
            >
                {startPage + offset}
            </button>
        ));
    };

    const styleDescription = (tags) => {
        return tags.map((tag, index) => (
            <div key={index}>
                {tag.trim().length !== 0
                    ?
                    <div className={"tag-back"}>
                        <div className={"tag"}>
                            {tag.trim()}
                        </div>
                    </div>
                    : null}
            </div>
        ));
    };

    if (isLoading) {
        return (
            <Loading/>
        );
    }
    
    return(
        <div>
            <Header />
            <div className={"trackList-container"}>
                <div className={"trackList-main-container"}>
                    <div className="trackList-top-sub-container">
                        <div className="top-sub-container-left">
                            <h1>{params.codeLang}</h1>
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

                            />

                            <select
                                id={"sortingType"}
                                value={sortingType}
                                onChange={handleSortingChange}
                            >
                                <option id={"sortingType1"} value="TITLE_ASC">Title ⬆️</option>
                                <option id={"sortingType2"} value="TITLE_DESC">Title ⬇️</option>
                                <option id={"sortingType3"} value="ID_ASC">Up to Date</option>
                                <option id={"sortingType4"} value="ID_DESC">Out of Date</option>
                            </select>
                        </div>
                        <div className="top-sub-container-right">
                            <button
                                onClick={handleRandomDescBtnClick}
                            >
                                Random Track
                            </button>
                        </div>
                    </div>

                    <div className={"trackList-sub-middle-container"}>
                        {totalRecord === 0
                            ? <h2 className={"noMatch"}>No matching tracks found.</h2>
                            : posts.map(post => (
                                <div
                                    key={post.id}
                                    className="track"
                                    onClick={() => handleTrackClick(post.id)}
                                >
                                    <div className="track-left">
                                        <h3>{post.title}</h3>
                                        <div className={"description-tags"}>
                                            {styleDescription(post.description.split("/"))}
                                        </div>
                                    </div>
                                    <div className="track-right">
                                        <button onClick={(e) => handleAuthorButtonClick(e, post.author)}>
                                            <p className={"button-text"}>{post.author}</p>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className={"trackList-sub-bottom-container"}>
                        <div className="pagination">
                            <button
                                onClick={handleBigPrevious}
                                disabled={currentPage <= 1}
                                className={"page-big-prev-button" }
                            >
                                l&lt;
                            </button>
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage <= 1}
                                className={`page-prev-button ${currentPage <= 1 ? "disabled" : ""}`}
                            >
                                &lt;
                            </button>
                            {renderPageNumbers()}
                            <button
                                onClick={handleNext}
                                disabled={currentPage >= totalPage}
                                className={`page-next-button ${currentPage >= totalPage ? "disabled" : ""}`}
                            >
                                &gt;
                            </button>
                            <button
                                onClick={handleBigNext}
                                disabled={currentPage >= totalPage}
                                className={"page-big-next-button"}
                            >
                                &gt;l
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}

export default TrackListPage;