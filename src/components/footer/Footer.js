/** @format */

import React from "react";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import logo from "../../assets/images/logo.webp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../../App.css";
import FooterCss from "./Footer.module.css";

function Footer() {
  return (
    <div className={FooterCss.footer}>
      <div className={FooterCss.innerfooter}>
        <Container>
          <Row>
            <Col>
              <Link className={FooterCss.link} to={"/home"}>
                <img className={FooterCss.logo} src={logo} alt='logo' />
              </Link>
              <div className={FooterCss.social}>
                <p className={FooterCss.Ratelfooter}>Follow us</p>
                <a
                  href='https://www.facebook.com/ratelma3y/'
                  target='_blank'
                  rel='noreferrer'>
                  <BsFacebook className={FooterCss.socialicon} />
                </a>
                <a href='#'>
                  <BsYoutube className={FooterCss.socialicon} />
                </a>
                <a href='#'>
                  <RiWhatsappFill className={FooterCss.socialicon} />
                </a>
              </div>
            </Col>
            <Col>
              <h4>Home page</h4>
              <Link className={FooterCss.link} to={"/home"}>
                Home
              </Link>
              <Link className={FooterCss.link} to={"/about"}>
                About us
              </Link>
              <Link className={FooterCss.link} to={"/contact"}>
                Contact us
              </Link>
            </Col>
            <Col>
              <h4>Enrollment system</h4>
              <Link className={FooterCss.link} to={"/home"}>
                Enrollment
              </Link>
              <Link className={FooterCss.link} to={"/about"}>
                Studing
              </Link>
              <Link className={FooterCss.link} to={"/contact"}>
                Exams
              </Link>
              <Link className={FooterCss.link} to={"/events"}>
                Certificate
              </Link>
            </Col>
          </Row>
          <p className={FooterCss.Ratelcopyright}>RatelMay 1442-2022@</p>
        </Container>
      </div>
    </div>
  );
}
export default Footer;
