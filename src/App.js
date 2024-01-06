import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import TypingPage from "./pages/TypingPage";
import LangSelectPage from "./pages/LangSelectPage";
import DescriptionPage from "./pages/DescriptionPage";
import TextListPage from "./pages/TextListPage";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={"/"} element={<LangSelectPage/>} />
                    <Route path={":codeLang"} element={<TextListPage/>} />
                    <Route path={":codeLang/description/:textId"} element={<DescriptionPage/>} />
                    <Route path={":codeLang/typing/:textId"} element={<TypingPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;