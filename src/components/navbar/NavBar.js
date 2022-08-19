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

function NavBar({ i18n }) {
  function changeLang(e) {
    e.target.innerHTML === "en"
      ? (e.target.innerHTML = "ar")
      : (e.target.innerHTML = "en");
    i18n.changeLanguage(e.target.innerHTML);
  }

  const navigate = useNavigate();
  const { user, setUser} = useContext(UserContext)

  async function logout() {
    //Todo: not handled yet in the backend
    // let first = await axios.delete("http://localhost:5000/api/auth/logout");
    // if (first.status == 200) {
    setUser(null)
    localStorage.clear();
    navigate("../../home", { replace: true });

    // }
  }

  // useEffect(() => {
  //   console.log("check");
  //   const accToken = localStorage.getItem("accessToken");
  //   if (accToken == null) return setUser(null);

  //   let decoded = accToken.split(".")[1];
  //   setUser(JSON.parse(atob(decoded)));
  // }, [localStorage.getItem("user_id")]);

  return (
    <Navbar className={NavCss.Navbar} fixed="top" expand="lg">
      <Container>
        <Navbar.Brand className={NavCss.NavbarBrand} href="#">
          <img className={NavCss.logo} src={logo} alt="logo" />
        </Navbar.Brand>
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
            {user != null && user.role == "student" && (
              <Link className={NavCss.link} to={"/sessions"}>
                Evaluations
              </Link>
            )}

            <Link className={NavCss.link} to={"/about"}>
              About us
            </Link>
            {(user == null || user.role === "student") && (
              <Link className={NavCss.link} to={"/contact"}>
                Contact us
              </Link>
            )}
            {user != null && user.privilages === "Admin" && (
              <Link to={"/adminPanel"}>
                <Button variant="outline-success">Control Panel</Button>
              </Link>
            )}
          </Nav>
          {user != null ? (
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={user.name}
              menuVariant="dark"
              style={{ margin: 16, fontWeight: 500 }}
            >
              <NavDropdown.Item href="#action/3.1">
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
          <Button
            className={NavCss.button}
            variant="outline-success"
            onClick={(e) => changeLang(e)}
          >
            en
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
