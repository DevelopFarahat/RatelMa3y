import React from "react";
import {
  SliderHome,
  Statistics,
  Programs,
  Features,
  ContactUs,
  KeepInTuch
} from '../components'

export default function Home({ t, i18n }) {
  return (
    <>
      <SliderHome i18n={i18n} t={t} />
      <Statistics />
      <Features />
      <Programs />
      <ContactUs />
      <KeepInTuch />
    </>
  );
}
