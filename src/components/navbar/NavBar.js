/** @format */

import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/logo.webp";
import NavCss from "./Navbar.module.css";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../utils/UserContext";

function NavBar({ i18n, isRoomPrepared }) {

  function changeLang(e) {
    if (e.target.innerHTML == "en") {
      e.target.innerHTML = "ar";
      i18n.changeLanguage("en");
    } else {
      e.target.innerHTML = "en";
      i18n.changeLanguage("ar");
    }
  }

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  async function logout() {
    setUser(null);
    localStorage.clear();
    navigate("../../home", { replace: true });
  }

  return (
    <Navbar className={NavCss.Navbar} fixed="top" expand="lg" style={{transitionDuration: "3s"  ,transform: isRoomPrepared? "translateY(-120px)":"translateY(0px)"}}>
      <Container>
        <Link to={"home"}>
          <Navbar.Brand className={NavCss.NavbarBrand}>
            <img className={NavCss.logo} src={logo} alt="logo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="m-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link className={NavCss.link} to={"/home"}>
              Home
            </Link>
            <Link className={NavCss.link} to={"/events"}>
              Events
            </Link>
            {user != null && (
              <Link className={NavCss.link} to={"/sessions"}>
                Sessions
              </Link>
            )}
            {/* {user != null && user.role == "student" && false && (
              <Link className={NavCss.link} to={"/sessions"}>
                Evaluations
              </Link>
            )} */}

            <Link className={NavCss.link} to={"/about"}>
              About us
            </Link>
            {(!user || user.role == "student") && (
              <Link className={NavCss.link} to={"/contact"}>
                Contact us
              </Link>
            )}
            {user && user.privileges == "Admin" && (
              <Link to={"/adminPanel"}>
                <Button variant="outline-success">Control Panel</Button>
              </Link>
            )}
          </Nav>
          {user ? (
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={user.name}
              menuVariant="dark"
              style={{ margin: 16, fontWeight: 500 }}
            >
              <NavDropdown.Item onClick={() => navigate("/account")}>
                Manage Account
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item className="text-danger" onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Link to={"/login"}>
              <Button className={NavCss.button} variant="outline-success">
                Login
              </Button>
            </Link>
          )}
          {/* <Button
            className={NavCss.button}
            variant="outline-success"
            onClick={(e) => changeLang(e)}
          >
            en
          </Button> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
