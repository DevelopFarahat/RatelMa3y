import React, { Fragment } from "react";
import SliderHome from "./../components/sliderHome/SliderHome";
import Statistics from "../components/statistics/Statistics";
import Programs from "./../components/programs/Programs";
import Features from "./../components/ourfeatures/Features";
import ContactUs from "./../components/contactus/ContactUs";
import KeepInTuch from "./../components/keepintouch/KeepInTuch";
export default function Home() {
  // document.title = "home";
  return (
    <Fragment>
      <SliderHome />
      <Statistics />
      <Features />
      <Programs />
      <ContactUs />
      <KeepInTuch />
    </Fragment>
  );
}
