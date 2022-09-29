/** @format */

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import StatisticsCss from "./Statistics.module.css";

function Statistics() {
  const [t, i18n] = useTranslation();
  return (
    <div
      style={{ direction: t("us") === "Us" ? "ltr" : "rtl" }}
      className={StatisticsCss.statistics}>
      <Container>
        <Row>
          <Col md={4}>
            <div className={StatisticsCss.stcard}>
              <p className={StatisticsCss.numb}>{t("num_2")}</p>
              <p className={StatisticsCss.text}>{t("statics_country")}</p>
            </div>
          </Col>
          <Col md={4}>
            <div className={StatisticsCss.stcard}>
              <p className={StatisticsCss.numb}>{t("num_75")}</p>
              <p className={StatisticsCss.text}>
                {t("statistics_instructors")}
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className={StatisticsCss.stcard}>
              <p className={StatisticsCss.numb}>{t("num_10")}</p>
              <p className={StatisticsCss.text}>
                {t("statistics_instructors")}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Statistics;
