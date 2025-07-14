import { Offcanvas } from "react-bootstrap";
import "./Nav.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { memo } from "react";
import logoImg from "../../assets/images/logo.svg";
import { motion } from "motion/react";
function MyNavbar() {
  const { getRole, logout, isAdmin } = useAuthStore();

  const expand = "lg";
  return (
    <Navbar key={expand} expand={expand} className=" my-navbar mb-3">
      <Container>
        <motion.img
        whileHover={{scale: 1.1}}
        initial={{x: -800}}
          animate={
            { x: -10,
              rotate: 1080,
              transition: {duration: 1, type: 'spring'},
            }}
          className="logo-brand"
          src={logoImg}
          alt=""
        />
        <motion.a whileHover={{rotate: '5deg'}} initial={{x: 1500}} animate={{x: 0, transition: {duration: .6, type: "spring"}}} className="title-navbar navbar-brand" href="/">
          Quf Learn
        </motion.a>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
          className="offcanvas-navbar"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              className="offcanvas-title"
              id={`offcanvasNavbarLabel-expand-${expand}`}
            >
              Quf Learn
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvas-links">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink className="navbar-link" to={"/"}>
                Home
              </NavLink>
              <NavLink className="navbar-link" to={"/about"}>
                About
              </NavLink>
              {isAdmin() ? (
                <NavLink className="navbar-link" to="/admin">
                  Dashboard
                </NavLink>
              ) : (
                ""
              )}
              {getRole() === "user" ? (
                <NavLink className="navbar-link" to="/dashboard">
                  Profile
                </NavLink>
              ) : (
                ""
              )}
              {getRole() === "user" || isAdmin() ? (
                <Link onClick={() => logout()} className="navbar-link" to="/">
                  LogUot
                </Link>
              ) : (
                <NavLink className="navbar-link" to="/login">
                  LogIn
                </NavLink>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default memo(MyNavbar);
