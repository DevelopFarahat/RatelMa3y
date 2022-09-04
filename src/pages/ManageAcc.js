import React from "react";
import Changepassword from "../components/account_manage/changepassword";
import Formikform from "../components/account_manage/form2formik";

export default function ManageAcc() {
  return(
  <>
  <br/>

  <Formikform />
  <br/>
  <br/>
  <Changepassword />
  </>)
}