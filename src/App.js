import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import TypingPage from "./pages/TypingPage";
import LangSelectPage from "./pages/LangSelectPage";
import DescriptionPage from "./pages/DescriptionPage";
import TrackListPage from "./pages/TrackListPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUsPage from "./pages/AboutUsPage"

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={"/"} element={<LangSelectPage/>}/>
                    <Route path={":codeLang/list"} element={<TrackListPage/>}/>
                    <Route path={":codeLang/description/:textId"} element={<DescriptionPage/>}/>
                    <Route path={":codeLang/typing/:textId"} element={<TypingPage/>}/>
                    <Route path="/NotFound" element={<NotFoundPage />} />
                    <Route path="/AboutUs" element={<AboutUsPage />} />
                    <Route path={"*"} element={<NotFoundPage/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;