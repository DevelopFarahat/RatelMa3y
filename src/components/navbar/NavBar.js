/** @format */

import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/logo.webp";
import NavCss from "./Navbar.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function NavBar({ i18n }) {

  function changeLang(e) {
    e.target.innerHTML == "en"
      ? (e.target.innerHTML = "ar")
      : (e.target.innerHTML = "en");
    i18n.changeLanguage(e.target.innerHTML);
  }

  return (
    <Navbar className={NavCss.Navbar} fixed="top" expand="lg">
      <Container>
        <Navbar.Brand className={NavCss.NavbarBrand} href='#'>
          <img className={NavCss.logo} src={logo} alt='logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
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
            <Link className={NavCss.link} to={"/room"}>
              Rooms
            </Link>
            <Link className={NavCss.link} to={"/room"}>
              Evaluations
            </Link>
            <Link className={NavCss.link} to={"/about"}>
              About us
            </Link>
            <Link className={NavCss.link} to={"/contact"}>
              Contact us
            </Link>
            <Link className={NavCss.link} to={"/adminPanel"}>
              Admin Panel
            </Link>
          </Nav>
          {localStorage.getItem("user_id") != null ? (
            <div>mohamed</div>
          ) : (
            <Link to={"/register"}>
              <Button className={NavCss.button} variant="outline-success">
                Login
              </Button>
            </Link>
          )}
          <Button
            className={NavCss.button}
            variant="outline-success"
            onClick={(e)=>changeLang(e)}
          >
            en
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
