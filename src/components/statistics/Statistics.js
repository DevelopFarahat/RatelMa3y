/** @format */

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StatisticsCss from "./Statistics.module.css";

function Statistics() {
  return (
    <div className={StatisticsCss.statistics}>
      <Container>
        <Row>
          <Col md={4}>
            <div className={StatisticsCss.stcard}>
              <p className={StatisticsCss.numb}>2</p>
              <p className={StatisticsCss.text}>Number of countries</p>
            </div>
          </Col>
          <Col md={4}>
            <div className={StatisticsCss.stcard}>
              <p className={StatisticsCss.numb}>75</p>
              <p className={StatisticsCss.text}>Number of Students</p>
            </div>
          </Col>
          <Col md={4}>
            <div className={StatisticsCss.stcard}>
              <p className={StatisticsCss.numb}>10</p>
              <p className={StatisticsCss.text}>Number of Instructors</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Statistics;
