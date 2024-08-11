import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/Login/header';
import ComentariosValoraciones from './components/Comentarios/ComentariosValoraciones';   


function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/comentarios-valoraciones" element={<ComentariosValoraciones />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;