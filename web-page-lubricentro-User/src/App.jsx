import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AppHeader from './components/Login/header'


function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;