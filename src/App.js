import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import TypingPage from "./pages/TypingPage";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={":codeLang/typing/:textId"} element={<TypingPage/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;