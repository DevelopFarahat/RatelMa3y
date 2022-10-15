/** @format */

import React from "react";
import { BsFacebook,BsInstagram } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import logo from "../../assets/images/logo.webp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../App.css";
import FooterCss from "./Footer.module.css";

function Footer(props) {
  const { t } = useTranslation();
  
  let date = new Date();

  return (
    <div
      className={FooterCss.footer}
      style={{
        transitionDuration: "3s",
        transform: props.isRoomPrepared
          ? "translateY(300px)"
          : "translateY(0px)",
        // direction: t("us") === "Us" ? "ltr" : "rtl",
      }}>
      <div
        style={{ direction: t("us") === "Us" ? "ltr" : "rtl" }}
        className={FooterCss.innerfooter}>
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
                <a href='https://wa.me/+201154823980'  target='_blank' rel="noreferrer">
                  <RiWhatsappFill className={FooterCss.socialicon} />
                </a>
                <a href='#'>
                  <BsInstagram className={FooterCss.socialicon} />
                </a>
              </div>
            </Col>
            <Col>
              <h4>{t("footer_homepage")}</h4>
              <Link className={FooterCss.link} to={"/home"}>
                <span className={FooterCss.hoverable}>{t("footer_home")}</span>
              </Link>
              <Link className={FooterCss.link} to={"/events"}>
                <span className={FooterCss.hoverable}>
                  {t("footer_events")}
                </span>
              </Link>
              <Link className={FooterCss.link} to={"/about"}>
                <span className={FooterCss.hoverable}>
                  {t("footer_aboutus")}
                </span>
              </Link>
              <Link className={FooterCss.link} to={"/contact"}>
                <span className={FooterCss.hoverable}>
                  {t("footer_contactus")}
                </span>
              </Link>
            </Col>
            <Col>
              <h4>{t("footer_enrollmentsystem")}</h4>
              <br />
              <Link className={FooterCss.link} to={"/login"}>
                <span className={FooterCss.hoverable}>{t("footer_login")}</span>
              </Link>
              <Link className={FooterCss.link} to={"/register"}>
                <span className={FooterCss.hoverable}>
                  {t("footer_registration")}
                </span>
              </Link>
            </Col>
          </Row>
          <p className={FooterCss.Ratelcopyright}>{t("footer_end")}{date.getFullYear()}</p>
        </Container>
      </div>
    </div>
  );
}
export default Footer;
