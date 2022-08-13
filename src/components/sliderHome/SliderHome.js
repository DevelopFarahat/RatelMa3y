/** @format */
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import SliderCss from "./slider.module.css";
function SliderHome() {
  return (
    <Carousel className={SliderCss.Carousel} fade indicators={false}>
      <Carousel.Item className={SliderCss.CarouselItem}>
        <div className='overlay'></div>
        <img className='d-block w-100' src={slider1} alt='First slide' />
        <Carousel.Caption className={SliderCss.Caption}>
          <h2>Memorizing the holly Quran</h2>
          <p>
            ﴾ Indeed, it is We who sent down the Qur'an and indeed, We will be
            its guardian.﴿
          </p>
          <span>Surah Al-Hijr: 9</span>
          <p>
            If you think that learning the Qur’an is difficult, it is okay, we
            offer you a special program to learn the Holy Qur’an with the best
            experienced teachers for years with excellent follow-up and
            permanent review of what you have learned
          </p>
          <br></br>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={SliderCss.CarouselItem}>
        <div className='overlay'></div>
        <img className='d-block w-100' src={slider2} alt='Second slide' />
        <Carousel.Caption className={SliderCss.Caption}>
          <h2>Quran recitation</h2>
          <p>﴾ and recite the Qur’ān with measured recitation.﴿</p>
          <span>Surah Al-Muzzammil: 4</span>
          <p>
            Many face a problem in reciting the Noble Qur’an and are not
            proficient in reciting the Qur’an as it was revealed to the Prophet
            Muhammad, but there is nothing wrong with us, as we have prepared a
            program for you to learn the recitation of the Qur’an as it was
            revealed with the correct rulings.
          </p>
          <br></br>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={SliderCss.CarouselItem}>
        <div className='overlay'></div>
        <img className='d-block w-100' src={slider3} alt='Third slide' />
        <Carousel.Caption className={SliderCss.Caption}>
          <h2>Nour Al-Bayan courses</h2>
          <p>
            ﴾ The Messenger of Allah (ﷺ) said, "The best amongst you is the one
            who learns the Qur'an and teaches it."﴿
          </p>
          <span>[Al-Bukhari]</span>
          <p>
            Nour Al-Bayan courses enable you to learn and benefit both
            linguistically and scientifically. We have you can learn the correct
            grammar and memorize the Noble Qur’an simultaneously at the hands of
            a selection of the best teachers of the Arabic language and the
            Noble Qur’an
          </p>
          <br></br>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default SliderHome;
