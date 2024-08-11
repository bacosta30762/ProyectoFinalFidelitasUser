import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AppHeader from './components/Login/header'
import IngresosPage from './components/Contability/Ingresos'
//import EgresosPage from './components/Contability/Egresos'
//import ReportesPage from './components/Contability/Reportes'

function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader />
                <Routes>
                    <Route path="/ingresos" element={<IngresosPage />} />
                    <Route path="/" element={<h1>Home</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;