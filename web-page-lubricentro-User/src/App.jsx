import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/HeaderFooter/header";
import OrdenPage from "./pages/OrdenPage";
import UserNotificationsPage from "./pages/UserNotificationsPage";
import ComentariosValoraciones from "./components/Comentarios/ComentariosValoraciones";
import Footer from "./components/HeaderFooter/Footer";
import Login from "./components/Login/login.jsx";
import Registro from "./components/Login/registro.jsx";
import RecuperarContra from "./components/Login/recuperarcontra.jsx";
import Home from "./components/Home/Home";
import Calendar from "./components/Planificacion/Calendar";

function App() {
  return (
    <div className="App">
      <Router>
        <header id="header">
          <AppHeader />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login/" element={<Login />} />
          <Route path="/RecuperarContra/" element={<RecuperarContra />} />
          <Route path="/Registro/" element={<Registro />} />
          <Route path="/orden/*" element={<OrdenPage />} />
          <Route path="notifications" element={<UserNotificationsPage />} />
          <Route
            path="/comentarios-valoraciones"
            element={<ComentariosValoraciones />}
          />
          <Route path="calendario" element={<Calendar />} />
        </Routes>
      </Router>
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
