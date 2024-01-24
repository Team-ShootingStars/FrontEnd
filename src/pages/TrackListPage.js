import React, {useState, useEffect, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import "../styles/TrackListPage.css"

import Header from "../components/Header";
import Footer from "../components/Footer";
import TrackListInfo from "../components/trackListPage/TrackListInfo";
import TrackListPaging from "../components/trackListPage/TrackListPaging";
import TrackList from "../components/trackListPage/TrackList";

function TrackListPage() {

    const params = useParams()
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [sortingType, setSortingType] = useState("DATE_ASC");
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
                let url = '/api/'+ encodeURIComponent(params.codeLang) + '/list?page=' + encodeURIComponent(currentPage - 1) + '&sortingType=' + encodeURIComponent(sortingType);
                if (searchValue !== "" ) {
                    url += "&search=" + encodeURIComponent(searchValue);
                }
                // url 적용
                const res = await axios.get(url);

                if (res.status === 200) {
                    setTotalRecord(res.data.totalElements);
                    setTotalPage(res.data.totalPages);
                    setPosts(res.data.content);
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

    const handleSortingChange = (event) => {
        setSortingType(event.target.value);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleEnterPress = () => {
        setSearchValue(inputValue);
    }

    const handleBigPrevious = () => {
        const newPage = Math.max(1, currentPage - 5); // 한 번에 5 페이지씩 이전으로 이동
        setCurrentPage(newPage);
    };

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
    };


    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleBigNext = () => {
        const newPage = Math.min(totalPage, currentPage + 5); // 한 번에 5 페이지씩 다음으로 이동
        setCurrentPage(newPage);
    };


    const changeCurrentPage = (page) => {
        setCurrentPage(page)
    }

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return (
        <div>
            <Header/>
            <div className={"trackList-container"}>
                <div className={"trackList-main-container"}>
                    <TrackListInfo
                        lang={params.codeLang}
                        inputValue={inputValue}
                        handleInputChange={handleInputChange}
                        handleEnterPress={handleEnterPress}
                        handleSortingChange={handleSortingChange}
                    />
                    <TrackList
                        totalRecord={totalRecord}
                        lang={params.codeLang}
                        posts={posts}
                    />
                    <TrackListPaging
                        currentPage={currentPage}
                        totalPage={totalPage}
                        handleBigPrevious={handleBigPrevious}
                        handlePrevious={handlePrevious}
                        handleBigNext={handleBigNext}
                        handleNext={handleNext}
                        changeCurrentPage={changeCurrentPage}
                    />
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default TrackListPage;