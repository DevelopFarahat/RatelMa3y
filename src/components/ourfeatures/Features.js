/** @format */

import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { MdWork } from "react-icons/md";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeaturesCss from "./Features.module.css";

function Features() {
  return (
    <div className={FeaturesCss.features}>
      <Container>
        <h2>Our Features</h2>
        <Row>
          <Col md={3}>
            <AiFillLike className={FeaturesCss.featureIcon} />
            <h4>professional</h4>
            <p>
              We have a selection of the best Quran teachers who have
              certificates in the field of Quran teaching, which guarantees you
              mastery of memorization.
            </p>
          </Col>
          <Col md={3}>
            <FaRegHandshake className={FeaturesCss.featureIcon} />
            <h4>cooperation</h4>
            <p>
              We provide you with a service throughout the day to answer the
              questions of students and parents, in addition to providing
              distinguished ways of learning.
            </p>
          </Col>
          <Col md={3}>
            <MdWork className={FeaturesCss.featureIcon} />
            <h4>Experience</h4>
            <p>
              We have been working in this field for years and have experience
              that makes us able to organize the educational process and achieve
              its goals.
            </p>
          </Col>
          <Col md={3}>
            <TbCertificate className={FeaturesCss.featureIcon} />
            <h4>certificate</h4>
            <p>
              With us, you can obtain a certified certificate to work as a Quran
              teacher later and we will then help you to obtain this job by
              expanding your social relationships.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Features;
