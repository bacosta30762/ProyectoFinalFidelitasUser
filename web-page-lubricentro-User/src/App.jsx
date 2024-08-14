import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/HeaderFooter/header";
import UserNotificationsPage from "./pages/UserNotificationsPage";
import ComentariosValoraciones from "./components/Comentarios/ComentariosValoraciones";
import Footer from "./components/HeaderFooter/Footer";
import Login from "./components/Login/login.jsx";
import Registro from "./components/Login/registro.jsx";
import RecuperarContra from "./components/Login/recuperarcontra.jsx";
import Perfil from "./components/Perfil/perfil.jsx";
import Perfileditar from "./components/Perfil/perfileditar.jsx";
import Home from "./components/Home/Home";
import Calendar from "./components/Planificacion/Calendar";
import CreateOrdenPage from "./pages/CreateOrdenPage.jsx";
import FakeOrdenListPage from "./pages/FakeOrdenListPage.jsx";
import CrearSuscripcionPage from "./pages/CrearSuscripcionPage.jsx"; 
import VerSuscripcionesPage from "./pages/VerSuscripcionesPage.jsx"; 

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
          <Route path="/Perfil/" element={<Perfil/>} />
          <Route path="/Registro/" element={<Registro />} />
          <Route path="/crear-orden/*" element={<CreateOrdenPage />} />
          <Route path="/listar-ordenes/*" element={<FakeOrdenListPage />} />
          <Route path="notifications" element={<UserNotificationsPage />} />
          <Route path="/perfileditar/:id" element={<Perfileditar />} />
          <Route
            path="/comentarios-valoraciones"
            element={<ComentariosValoraciones />}
          />
          <Route path="calendario" element={<Calendar />} />
          <Route
            path="/ver-suscripciones"
            element={<VerSuscripcionesPage />}
          />{" "}
          {/* Nueva ruta para Ver Suscripciones */}
          <Route
            path="/crear-suscripcion"
            element={<CrearSuscripcionPage />}
          />{" "}
          {/* Nueva ruta para Crear Suscripción */}
        </Routes>
      </Router>
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
