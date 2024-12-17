import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { getToken, removeToken } from "../Servicios/tokenService"; 
import "./AppHeader.css";

export default function AppHeader() {
  const navigate = useNavigate();
  
  // Verificar si hay un token en localStorage (usuario autenticado)
  const isAuthenticated = !!getToken();  // Ajuste para usar tokenService


  const handleLogout = () => {
    removeToken();  // Elimina el token usando tokenService
    navigate('/Login'); 
  };

  return (
    <Navbar expand="lg" className="bg-rojizo">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Lubricentro RyM
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Viñetas visibles solo si el usuario está autenticado */}
            {isAuthenticated && (
              <>
                <NavDropdown title="Ordenes" id="basic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/orden-list">
                    Listar Ordenes
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link as={NavLink} to="/select-servicio">
                  Realizar Cita
                </Nav.Link>

                {/* Comentarios y Valoraciones, accesible incluso si no está autenticado */}
                <Nav.Link as={NavLink} to="/comentarios-valoraciones">
                  Opiniones
                </Nav.Link>

                <Nav.Link as={NavLink} to="/Perfil">
                  <FontAwesomeIcon icon={faUser} className="profile-icon" />
                </Nav.Link>
              </>
            )}

            {/* Mostrar botón de "Iniciar sesión" solo si el usuario NO está autenticado */}
            {!isAuthenticated && (
              <Nav.Link as={NavLink} to="/Login">
                <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
              </Nav.Link>
            )}

            {/* Mostrar icono de "Cerrar sesión" solo si el usuario está autenticado */}
            {isAuthenticated && (
              <Nav.Link onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
