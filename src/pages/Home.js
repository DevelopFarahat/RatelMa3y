import React from "react";
import {
  SliderHome,
  Statistics,
  Programs,
  Features,
  ContactUs,
  KeepInTuch
} from '../components'
import { Helmet } from "react-helmet-async";
import HeadTags from "../components/head/Head";


export default function Home({ t, i18n }) {
  return (
    <>
      <Helmet>
        {HeadTags({ title: "رتل معي | Ratel May", summary: ".أكاديمية رتل معي لتحفيظ القرآن الكريم وتعليم تلاوته Ratel May Academy for memorizing and recitation of The Holy Quran.", url: `${process.env.REACT_APP_FRONT_HOST_URL}`, img: "%PUBLIC_URL%/logo.webp", keywords: 'Ratel May,Academy,Quran,Memorizing,Recitation, Holy Quran, VideoChat, Sessions, تحفيظ قرآن, تلاوة , نور البيان, أكاديمية, رتل معي, القرآن الكريم, الحلقات,كتاب اون لاين ,قران اون لاين , قران , تلاوة , تعليم قران , تعليم القراءة,تعليم اللغة العربية , مصحف , مصحف اون لاين , ' })}
      </Helmet>
      <SliderHome i18n={i18n} t={t} />
      <Statistics />
      <Features />
      <Programs />
      <ContactUs />
      <KeepInTuch />
    </>
  );
}
