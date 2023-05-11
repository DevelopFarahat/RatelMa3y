import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import {Changepassword, Formikform } from "../components";
import UserContext from "../utils/UserContext";
import malePic from "../assets/images/male.webp";
import femalePic from "../assets/images/female.webp";

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
