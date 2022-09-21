import React, { useContext, useEffect, useState } from "react";
import Changepassword from "../components/account_manage/changepassword";
import Formikform from "../components/account_manage/form2formik";
import UserContext from "../utils/UserContext";
import malePic from "../assets/images/male.png";
import femalePic from "../assets/images/female.png";
import { useTranslation } from "react-i18next";

export default function ManageAcc() {
  const { user, setUser } = useContext(UserContext)
  const { t } = useTranslation()

  return (
    <>
      <br />

      <div style={{ display: "flex", flexDirection: "row",flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
        <img src={user?.gender === "Male"? malePic: femalePic} alt="Logo" style={{minWidth: 200,maxHeight: 530}}/>
        <Formikform user={user} setUser={setUser} t={t}/>
      </div>
      <br />
      <br />
      <Changepassword user={user} setUser={setUser} t={t}/>
    </>
  );
}
