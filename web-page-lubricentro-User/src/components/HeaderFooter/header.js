import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./AppHeader.css"; // Importa el archivo CSS personalizado

export default function AppHeader() {
  return (
    <Navbar expand="lg" className="bg-rojizo">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Lubricentro RyM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/orden">
              Ordenes
            </Nav.Link>
            <Nav.Link as={NavLink} to="/calendario">
              Disponibilidad Citas
            </Nav.Link>
            <Nav.Link as={NavLink} to="/notifications">
              Notificaciones
            </Nav.Link>
            <Nav.Link as={NavLink} to="/comentarios-valoraciones">
              Opiniones
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Login">
              Iniciar Sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
