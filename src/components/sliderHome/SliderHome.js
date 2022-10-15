/** @format */
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import SliderCss from "./slider.module.css";
import { useTranslation } from "react-i18next";
function SliderHome() {
  const [t, i18n] = useTranslation();
  return (
    <Carousel className={SliderCss.Carousel} fade indicators={false}>
      <Carousel.Item className={SliderCss.CarouselItem}>
        <div className='overlay'></div>
        <Carousel.Caption className={SliderCss.Caption}>
          <h2>{t("slider_title")}</h2>
          <p>
          {t("slider_text")}
          </p>
          <span>{t("slider_span")}</span>
          <p>
          {t("slider_text1")}
          </p>
          <br></br>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={SliderCss.CarouselItem}>
        <div className='overlay'></div>
        <Carousel.Caption className={SliderCss.Caption}>
          <h2>{t("slider_h2")}</h2>
          <p>{t("slider_text2")}</p>
          <span>{t("slider_span2")}</span>
          <p>
          {t("slider_text3")}
          </p>
          <br></br>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={SliderCss.CarouselItem}>
        <div className='overlay'></div>
        <Carousel.Caption className={SliderCss.Caption}>
          <h2>{t("slider_nourbayan")}</h2>
          <p>
          {t("slider_text4")}
          </p>
          <span>{t("slider_bukhri")}</span>
          <p>
          {t("slider_text5")}
          </p>
          <br></br>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default SliderHome;
