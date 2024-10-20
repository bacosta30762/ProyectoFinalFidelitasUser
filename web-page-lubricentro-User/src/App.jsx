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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import RestablecerPassword from './components/Login/RestablecerPassword.jsx'; 

function App() {
  const token = localStorage.getItem('token'); // Verifica si el usuario está autenticado

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
          <Route path="/restablecer-password" element={<RestablecerPassword />} />
          <Route path="/Registro" element={<Registro />}/>
          <Route
            path="/comentarios-valoraciones"
            element={<ComentariosValoraciones />}
          />
          {/* Rutas protegidas */}      
          <Route path="/Perfil/" element={<ProtectedRoute><Perfil /></ProtectedRoute>}/>
          <Route path="/crear-orden/*" element={<ProtectedRoute><CreateOrdenPage /></ProtectedRoute>} />
          <Route path="/listar-ordenes/*" element={<ProtectedRoute><FakeOrdenListPage /></ProtectedRoute>} />
          <Route path="notifications" element={<ProtectedRoute><UserNotificationsPage /></ProtectedRoute>} />
          <Route path="/perfileditar/:id" element={<ProtectedRoute><Perfileditar /></ProtectedRoute>} />
          
          <Route path="calendario" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route
            path="/ver-suscripciones"
            element={<ProtectedRoute><VerSuscripcionesPage /></ProtectedRoute>}
          />{" "}
          {/* Nueva ruta para Ver Suscripciones */}
          <Route
            path="/crear-suscripcion"
            element={<ProtectedRoute><CrearSuscripcionPage /></ProtectedRoute>}
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
