import React from "react";
import Header from "../components/Header";
import LangSection from "../components/LangSection";
import ListSection from "../components/ListSection";
import PageSection from "../components/PageSection";
import Footer from "../components/Footer";

import "../styles/TextListPage.css"
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";

function TextListPage() {
    
    return(
        <div>
            <Header/>
            <div className={"main-container"}>
                <LangSection />
                <ListSection />
                <PageSection />
            </div>
            <Footer/>
        </div>
    )
}

export default TextListPage;