import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown, Dropdown, Badge } from "react-bootstrap";
import { Bell } from "react-bootstrap-icons";
import "./AppHeader.css"; // Importa el archivo CSS personalizado

export default function AppHeader() {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
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
            <NavDropdown title="Ordenes" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/crear-orden">
                Crear Orden
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/listar-ordenes">
                Listar Ordenes
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Suscripciones" id="subscription-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/ver-suscripciones">
                Ver Suscripciones
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/crear-suscripcion">
                Crear Suscripción
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/calendario">
              Disponibilidad Citas
            </Nav.Link>
            <Nav.Link as={NavLink} to="/comentarios-valoraciones">
              Opiniones
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Login">
              Iniciar Sesión
            </Nav.Link>
            <Dropdown
              align="end"
              show={showNotifications}
              onToggle={handleToggleNotifications}
            >
              <Dropdown.Toggle
                as="div"
                id="notification-bell"
                onClick={handleToggleNotifications}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff", // Cambia el color del ícono a blanco
                }}
              >
                <Bell size={20} />
                <Badge pill bg="danger" style={{ marginLeft: "5px" }}>
                  3
                </Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  🎉 Promoción: 20% de descuento en servicios de aceite
                </Dropdown.Item>
                <Dropdown.Item>
                  🕒 Horarios: Lunes a Viernes de 8 AM a 6 PM
                </Dropdown.Item>
                <Dropdown.Item>
                  🔔 Recordatorio: Cita programada para el 20 de agosto
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
