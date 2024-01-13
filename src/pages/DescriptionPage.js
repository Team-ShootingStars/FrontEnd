import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

import "../styles/DescriptionPage.css";
import DescriptionText from "../components/DescriptionText";
import Loading from "../components/Loading";

function DescriptionPage() {
    const [DES_DATA, setDES_DATA] = useState(['']);

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

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return (
        <div>
            <Header/>
            <div className={"description-container"}>
              <h2 className="description-title">
                {DES_DATA.title}
              </h2>
                <DescriptionText longText={JSON.parse(DES_DATA.desText)}/>
                {/* <p>{LONG_TEXTS.desText}</p> */}
              <h3 className="description-info">
                {DES_DATA.description}
              </h3>
              <button
                className={"start-btn"}
                onClick={startTyping}>
                  Start Track
              </button>
            </div>
            <Footer/>
        </div>
    )
}

export default DescriptionPage;