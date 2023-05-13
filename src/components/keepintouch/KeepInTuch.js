/** @format */

import React, { useState } from "react";
import KeepCss from "./KeepInTouch.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import axios from "axios";

function KeepInTuch() {
  const [t, i18n] = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");

  function confirm() {
    axios
      .post(
        `${process.env.REACT_APP_BACK_HOST_URL}/api/events/subscripe_request`,
        { email: email }
      )
      .then(() =>
        enqueueSnackbar("Check your email inbox to confirm.", {
          variant: "info",
        })
      )
      .catch((err) => console.error(err));
  }
  return (
    <div
      // style={{ direction: t("us") === "Us" ? "ltr" : "rtl" }}
      className={KeepCss.keepin}>
      <h2>{t("keepintouch_title")}</h2>
      <h4>{t("keepintouch_texttitle")}</h4>
      <div className={KeepCss.keepinput}>
        <Form className="input-group" style={{minWidth: 310,width: '90%', maxWidth: 420, marginInline: "auto"}}>
          <Button variant='danger' onClick={confirm} className="btn btn-danger mx-0">
            {t("keepintouch_subscribe")}
          </Button>{" "}

          <Form.Control controlId='formBasicEmail'
            className="form-control"
            dir={ t("us") === "Us" ? "ltr" : "rtl"}
            type='email'
            placeholder={t("keepintouch_hint_email")}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form>
      </div>
    </div>
  );
}
export default KeepInTuch;
