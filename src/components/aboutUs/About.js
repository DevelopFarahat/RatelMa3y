/** @format */

import React from "react";
import { GiBookCover } from "react-icons/gi";
import { FaCrown } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import AboutCss from "./About.module.css";
import aboutus from "../../assets/images/aboutus.webp";
import about11 from "../../assets/images/about1.webp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function About() {
  const [t, i18n] = useTranslation();
  return (
    <div className={AboutCss.about}>
      <div className={AboutCss.about1}>
        <h1> {t("aboutus_title")}</h1>
        <hr></hr>
        <p className={AboutCss.aboutabstract}>
        {t("aboutus_text")}
        </p>
        <img className={AboutCss.aboutimg1} src={aboutus} alt='aboutus' />
        <Container style={{ marginTop: "55px" }}>
          <Row>
            <Col md={4}>
              <GiBookCover className={AboutCss.featureIcon} />
              <h4> {t("aboutus_text1")} </h4>
              <p className={AboutCss.goals}>
              {t("aboutus_text2")}
              </p>
            </Col>
            <Col md={4}>
              <FaCrown className={AboutCss.featureIcon} />
              <h4>{t("aboutus_text3")}</h4>
              <p className={AboutCss.goals}>
              {t("aboutus_text4")}
              </p>
            </Col>
            <Col md={4}>
              <FaHandsHelping className={AboutCss.featureIcon} />
              <h4> {t("aboutus_text5")} </h4>
              <p className={AboutCss.goals}>
              {t("aboutus_text6")}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={AboutCss.about2}>
        <Container>
          <Row>
            <Col md={5}>
              <img src={about11} alt='about1' />
            </Col>
            <Col md={7}>
              <h2>{t("celibration_txt")}</h2>
              <p className='lead'>
          {t("proposal_txt")}
              </p>
              <Link to={"/contact"}>
                <Button variant='danger'>{t("contactus_btn")}</Button>{" "}
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default About;
