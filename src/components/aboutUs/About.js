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

function About() {
  return (
    <div className={AboutCss.about}>
      <div className={AboutCss.about1}>
        <h1>About Us</h1>
        <hr></hr>
        <p className={AboutCss.aboutabstract}>
          Ratel May is an educational platform for teaching the Holy Qur’an and
          the correct way of reading it. It also aims to teach Arabic grammar to
          foreigners through Nour Al-Bayan courses. Our goal is always
          excellence and reward from God.
        </p>
        <img className={AboutCss.aboutimg1} src={aboutus} alt='aboutus' />
        <Container style={{ marginTop: "55px" }}>
          <Row>
            <Col md={4}>
              <GiBookCover className={AboutCss.featureIcon} />
              <h4>We serve the Quran</h4>
              <p className={AboutCss.goals}>
                We serve the Holy Qur’an and its memorizers and provide the
                latest tested methods for learning and memorizing the Qur’an
                easily and conveniently. Our goal is one and our way is to
                spread the Holy Qur’an around the world .
              </p>
            </Col>
            <Col md={4}>
              <FaCrown className={AboutCss.featureIcon} />
              <h4>Excellence is our motto</h4>
              <p className={AboutCss.goals}>
                We carry one slogan, which is excellence. If you consider
                memorizing the Qur’an difficult and you have tried previously
                and did not succeed, we offer you proven plans that will make
                you able to accomplish in the shortest time .
              </p>
            </Col>
            <Col md={4}>
              <FaHandsHelping className={AboutCss.featureIcon} />
              <h4>Our goal is to help</h4>
              <p className={AboutCss.goals}>
                We carry on our shoulders one goal, which is to help people all
                over the world to learn the Noble Qur’an and spread knowledge
                around the world. We want to reach the farthest Muslim to
                benefit from the value we offer .
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
              <h2>We are happy to cooperate with you</h2>
              <p className='lead'>
                If you are a parent and want your son to memorize the Qur’an, or
                an adult who does not have enough time to go to Qur’an schools,
                or a housewife who does not find enough time to get out of the
                house and want to memorize the Qur’an, then you are in the right
                place here to achieve your dream, we offer you a selection of
                the best accredited Qur’an teachers in addition to plans and
                programs Tried and effective help you achieve your goil
                successfully, also you can choose the appropriate lessons times
                for you, do not hesitate to start with us.
              </p>
              <Link to={"/contact"}>
                <Button variant='danger'>Contact Us</Button>{" "}
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default About;
