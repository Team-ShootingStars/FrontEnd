import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RandomDescBtn from "../components/RandomDescBtn";
import axios from "axios";
import Loading from "../components/Loading";
import "../styles/TextListPage.css"

import Header from "../components/Header";
import Footer from "../components/Footer";

function TextListPage() {

    const params = useParams()

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [sortingType, setSortingType] = useState("TITLE_ASC");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 데이터 불러오기 시작
            try {
                // url값 정의 + 검색값 있으면 뒤에 붙임
                let url = '/api/'+ params.codeLang + '/list?page=' + currentPage + '&sortingType=' + sortingType;
                if (search !== "" ) {
                    url += "&search=" + search;
                }
                // url 적용
                const res = await axios.get(url);
                console.log(res);

                if (res.status === 200) {
                    setTotalPage(res.data.page.totalPage);
                    setPosts(res.data.texts);
                }
            } catch (error) {
                navigate("/NotFound");
            } finally {
                setIsLoading(false); // 데이터 불러오기 완료
            }
        }

        fetchData();
    }, [navigate, params.codeLang, currentPage]);

    ///============

    // const handlePrevious = () => {
    //     setTotalPage(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }));
    // };
    
    // const handleNext = () => {
    //     setTotalPage(prev => ({ ...prev, currentPage: Math.min(prev.totalPage, prev.currentPage + 1) }));
    // };
    
    // const renderPageNumbers = () => {
    //     return [...Array(pageInfo.totalPage).keys()].map(number => (
    //         <button key={number + 1} onClick={() => setPageInfo(prev => ({ ...prev, currentPage: number + 1 }))}>
    //             {number + 1}
    //         </button>
    //     ));
    // };
    ///===========

    const handleSelectBtnClick = (id) => {
        navigate(`/${params.codeLang}/description/${id}`);
    }

    if (isLoading) {
        return (
            <Loading/>
        );
    }
    
    return(
        <div>
            <Header />
            <div className={"main-container"}>
                <div className="sub-container-top">
                    <div className="sub-container-topleft">
                        {/* 언어표시버튼 */}
                        <span className="langname">{params.codeLang}</span>
                    </div>
                    <div className="sub-container-topright">
                        {/* 검색창 */}
                        <input type="text" className="search-input" placeholder="검색" />

                        {/* 정렬방식 */}
                        <select>
                            <option value="TITLE_ASC">이름 오름차순</option>
                            <option value="TITLE_DESC">이름 내림차순</option>
                            <option value="DATE_ASC">날짜 오름차순</option>
                            <option value="DATE_DESC">날짜 내림차순</option>
                        </select>

                        {/* 랜덤버튼 */}
                        <RandomDescBtn selectedLang={params.codeLang} />
                    </div>
                </div>

                <div className={"sub-container-middle"}>
                    {/* 리스트들 */}
                    {Array.isArray(posts) && posts.map(post => (
                        <div key={post.id} className="boxline">
                            <div className="boxline-left">
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                            </div>
                            <div className="boxline-right">
                                <button onClick={() => handleSelectBtnClick(post.id)}>지문 선택</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    {/* 페이지네이션 컨트롤러
                    <div className="pagination">
                        <button onClick={handlePrevious} disabled={pageInfo.currentPage <= 1}>이전</button>
                        {renderPageNumbers()}
                        <button onClick={handleNext} disabled={pageInfo.currentPage >= pageInfo.totalPage}>다음</button>
                    </div> */}
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}

export default TextListPage;