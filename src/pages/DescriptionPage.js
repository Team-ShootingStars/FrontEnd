import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

import "../styles/DescriptionPage.css";
import DescriptionText from "../components/descriptionPage/DescriptionText";
import Loading from "../components/Loading";

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
                const res = await axios.get('/api/' + encodeURIComponent(params.codeLang) + '/description/' + encodeURIComponent(params.textId));
                if (res.status === 200) {
                    setDES_DATA(res.data);
                    setDescription(res.data.description.split("/"))
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
        const encodeLang = encodeURIComponent(params.codeLang);
        const encodeId = encodeURIComponent(params.textId);
        navigate("/" + encodeLang + "/typing/" + encodeId);
    };

    
    const styleDescription = description.map((tag, index) => {
        return (
            <div key={index}>
                {tag.trim().length !== 0
                    ?
                    <div className={"tag-back"}>
                        <div className={"tag"}>
                            {tag.trim()}
                        </div>
                    </div>
                    : ""}
            </div>
        );
    });

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
                    <p className={"description-info-provider"}>
                        Provider : <a href={"https://github.com/" + DES_DATA.author}
                                      target="_blank"
                                      rel="noopener noreferrer">{DES_DATA.author}</a>
                    </p>
                    <div className={"description-info-tags"}>
                        {styleDescription}
                    </div>
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