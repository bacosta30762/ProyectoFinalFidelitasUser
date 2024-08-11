import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function AppHeader() {
    return (
        <Navbar bg="light" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Lubricentro RyM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/link">Link</Nav.Link>
                        <NavDropdown title="Contabilidad" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/ingresos">Ingresos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/egresos">Egresos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/reportes">Reportes Financieros</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}