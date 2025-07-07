import { Offcanvas } from 'react-bootstrap';
import './Nav.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function MyNavbar() {
    const expand = 'lg'
  return (
    <Navbar key={expand} expand={expand} className=" my-navbar mb-3">
          <Container >
            <Navbar.Brand className='title-navbar' href="/">Quf Learn</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className='offcanvas-navbar'
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className='offcanvas-title' id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Quf Learn
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='offcanvas-links'>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink className='navbar-link' to={'/'}>Home</NavLink>
                  <NavLink className='navbar-link' to={'/login'}>LogIn</NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  );
}

export default MyNavbar;