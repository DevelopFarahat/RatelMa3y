import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { Changepassword, Formikform } from "../components";
import UserContext from "../utils/UserContext";
import malePic from "../assets/images/male.webp";
import femalePic from "../assets/images/female.webp";
import {Helmet} from "react-helmet-async";
import HeadTags from "../components/head/Head";


export default function ManageAcc() {
  const { user, setUser } = useContext(UserContext)
  const { t } = useTranslation()

  return (
    <>

      <Helmet>
        <meta name="robots" content="noindex"></meta>
        {HeadTags({ title: t('page_title_management'), summary: ".أكاديمية رتل معي لتحفيظ القرآن الكريم وتعليم تلاوته Ratel May Academy for memorizing and recitation of The Holy Quran.", url: `${process.env.REACT_APP_FRONT_HOST_URL}`, img: "%PUBLIC_URL%/logo.webp", keywords: 'Ratel May,Academy,Quran,Memorizing,Recitation, Holy Quran, VideoChat, Sessions, تحفيظ قرآن, تلاوة , نور البيان, أكاديمية, رتل معي, القرآن الكريم, الحلقات,كتاب اون لاين ,قران اون لاين , قران , تلاوة , تعليم قران , تعليم القراءة,تعليم اللغة العربية , مصحف , مصحف اون لاين , ' })}
      </Helmet>
      <br />

      <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <img src={user?.gender === "Male" ? malePic : femalePic} alt="Logo" style={{ minWidth: 200, maxHeight: 530 }} />
        <Formikform user={user} setUser={setUser} t={t} />
      </div>
      <br />
      <br />
      <Changepassword user={user} setUser={setUser} t={t} />
    </>
  );
}
