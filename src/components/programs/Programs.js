/** @format */

import React from "react";
import ProgramsCss from "./Programs.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import program1 from "../../assets/images/program1.webp";
import program2 from "../../assets/images/program2.webp";
import program3 from "../../assets/images/program3.webp";
import { useNavigate } from "react-router-dom";

function Programs() {
  const navigate = useNavigate()
  return (
    <div className={ProgramsCss.programs}>
      <Container>
        <h2>Programs</h2>
        <Row>
          <Col md={4}>
            <div className={ProgramsCss.ProgramCard}>
              <div className={ProgramsCss.programImage}>
                <img src={program1} alt='program1' />
              </div>
              <h4>Quran recitation</h4>
              <button onClick={()=> navigate('register')}>Join now</button>
            </div>
          </Col>
          <Col md={4}>
            <div className={ProgramsCss.ProgramCard}>
              <div className={ProgramsCss.programImage}>
                <img src={program2} alt='program2' />
              </div>
              <h4>Nour Al-Bayan</h4>
              <button onClick={()=> navigate('register')}>Join now</button>
            </div>
          </Col>
          <Col md={4}>
            <div className={ProgramsCss.ProgramCard}>
              <div className={ProgramsCss.programImage}>
                <img src={program3} alt='program3' />
              </div>
              <h4>Memorizing Quran</h4>
              <button onClick={()=> navigate('register')}>Join now</button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Programs;
