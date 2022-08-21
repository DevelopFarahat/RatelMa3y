/** @format */

import React from "react";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import logo from "../../assets/images/logo.webp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../App.css";
import FooterCss from "./Footer.module.css";

function Footer() {
  const [t, i18n] = useTranslation();
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
                <p className={FooterCss.Ratelfooter}>{t("Follow_us")}</p>
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
              <h4>{t("footer_homepage")}</h4>
              <Link className={FooterCss.link} to={"/home"}>
              {t("footer_home")}
              </Link>
              <Link className={FooterCss.link} to={"/about"}>
              {t("footer_aboutus")}
              </Link>
              <Link className={FooterCss.link} to={"/contact"}>
              {t("footer_contactus")}
              </Link>
            </Col>
            <Col>
              <h4>{t("footer_enrollmentsystem")}</h4>
              <Link className={FooterCss.link} to={"/home"}>
              {t("footer_enrollmentlink")}
              </Link>
              <Link className={FooterCss.link} to={"/about"}>
              {t("footer_Studing")}
              </Link>
              <Link className={FooterCss.link} to={"/contact"}>
              {t("footer_exam")}
              </Link>
              <Link className={FooterCss.link} to={"/events"}>
              {t("footer_certificate")}
              </Link>
            </Col>
          </Row>
          <p className={FooterCss.Ratelcopyright}>{t("footer_end")}</p>
        </Container>
      </div>
    </div>
  );
}
export default Footer;
