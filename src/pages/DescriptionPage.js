import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

import "../styles/DescriptionPage.css";
import DescriptionText from "../components/DescriptionText";
import Loading from "../components/Loading";
import runner from "../assets/runner.gif";

function DescriptionPage() {
    const [DES_DATA, setDES_DATA] = useState(['']);
    const [description, setDescription] = useState([]);


    const params = useParams()
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 데이터 불러오기 시작
            try {
                const res = await axios.get('/api/description/' + params.textId);
                if (res.status === 200) {
                    setDES_DATA(res.data);
                    setDescription(res.data.description.split(","))
                }
            } catch (error) {
                navigate("/NotFound");
            } finally {
                setIsLoading(false); // 데이터 불러오기 완료
            }
        }

        if (params.textId === null || isNaN(params.textId)) {
            navigate("/NotFound");
        } else {
            fetchData();
        }
    }, [navigate, params.codeLang, params.textId]);

    const startTyping = () => {
      // TypingPage 이동
      navigate("/" + params.codeLang + "/typing/" + params.textId);
    };

    
    const styleDescription = description.map((tag, index) => {
        return (
            <div key={index} className={"tag-back"}>
                <div className={"tag"}>
                    {tag.trim()}
                </div>
            </div>
        );
    });

    // const handleContextMenu = (e) => {
    //     e.preventDefault();
    // };
    //
    // const handleMouseDown = (e) => {
    //     e.preventDefault();
    // };
    //
    // const handleDragStart = (e) => {
    //     e.preventDefault();
    // };

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return (
        <div>
            <Header/>
            <div className={"description-main-container"}>
                <div className="description-info-container">
                    <h2 className="description-info-title">
                        {DES_DATA.title}
                    </h2>
                    <p className={"description-info-provider"}>Provider : ShootingStar</p>
                    <div className={"description-info-tags"}>
                        {styleDescription}
                    </div>
                    {/*<div className="description-runner">*/}
                    {/*    <img*/}
                    {/*        src={runner}*/}
                    {/*        alt="러너"*/}
                    {/*        onContextMenu={handleContextMenu}*/}
                    {/*        onMouseDown={handleMouseDown}*/}
                    {/*        onDragStart={handleDragStart}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
                <DescriptionText longText={JSON.parse(DES_DATA.desText)} lang={params.codeLang}/>
                <div className={"description-bottom-container"}>
                    <button
                        className={"start-btn"}
                        onClick={startTyping}>
                        Start Track
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default DescriptionPage;