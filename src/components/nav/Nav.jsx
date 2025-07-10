import { Offcanvas } from 'react-bootstrap';
import './Nav.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { memo } from 'react';

function MyNavbar() {
  // const { logout } = useAuthStore(state => state.logout)
  const { getRole, logout, isAdmin } = useAuthStore()
  
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
                  {isAdmin() ? <NavLink className='navbar-link' to='/admin'>Dashboard</NavLink> : ''}
                  {getRole() === 'user' ? <NavLink className='navbar-link' to='/dashboard'>Profile</NavLink>: ''}
                  {getRole() === 'user' ? <NavLink className='navbar-link' to='/my-courses'>MyCourses</NavLink>: ''}
                  {getRole() === 'user' || isAdmin() ? <Link onClick={() => logout()} className='navbar-link' to='/'>LogUot</Link> : 
                  <NavLink className='navbar-link' to='/login'>LogIn</NavLink>}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  );
}

export default memo(MyNavbar);