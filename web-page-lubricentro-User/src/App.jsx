import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/Login/header";
import MechanicPage from "./pages/MechanicPage";
import OrdenPage from "./pages/OrdenPage";
import UserNotificationsPage from "./pages/UserNotificationsPage";
import ComentariosValoraciones from "./components/Comentarios/ComentariosValoraciones";
import Footer from "./components/HeaderFooter/Footer"; 

function App() {
  return (
    <div className="App">
      <Router>
        <header id="header">
          <AppHeader />
        </header>
        <Routes>
          <Route path="/orden/*" element={<OrdenPage />} />
          <Route path="notifications" element={<UserNotificationsPage />} />
          <Route
            path="/comentarios-valoraciones"
            element={<ComentariosValoraciones />}
          />
        </Routes>
      </Router>
      <footer id="footer">
          <Footer />
        </footer>
    </div>
  );
}

export default App;
