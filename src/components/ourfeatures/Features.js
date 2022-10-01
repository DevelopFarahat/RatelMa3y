/** @format */

import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { MdWork } from "react-icons/md";
import Container from "react-bootstrap/Container";
import { useTranslation } from "react-i18next";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeaturesCss from "./Features.module.css";

function Features() {
  const [t, i18n] = useTranslation();
  return (
    <div
      style={{ direction: t("us") === "Us" ? "ltr" : "rtl" }}
      className={FeaturesCss.features}>
      <Container>
        <h2>{t("features_title")}</h2>
        <Row>
          <Col md={3}>
            <AiFillLike className={FeaturesCss.featureIcon} />
            <h4>{t("features_professional")}</h4>
            <p>{t("features_text1")}</p>
          </Col>
          <Col md={3}>
            <FaRegHandshake className={FeaturesCss.featureIcon} />
            <h4>{t("features_cooperation")}</h4>
            <p>{t("features_text2")}</p>
          </Col>
          <Col md={3}>
            <MdWork className={FeaturesCss.featureIcon} />
            <h4>{t("features_experience")}</h4>
            <p>{t("features_text3")}</p>
          </Col>
          <Col md={3}>
            <TbCertificate className={FeaturesCss.featureIcon} />
            <h4>{t("features_certificate")}</h4>
            <p>{t("features_text4")}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Features;
