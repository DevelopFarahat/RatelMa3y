/** @format */

import React from "react";
import KeepCss from "./KeepInTouch.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
function KeepInTuch() {
  const [t, i18n] = useTranslation();
  return (
    <div className={KeepCss.keepin}>
      <h2>{t("keepintouch_title")}</h2>   
      <h4>Sign Up For Newsletter Don't Worry About Spam We Hate It Too</h4>
      <div className={KeepCss.keepinput}>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>
          <Button variant='danger'>{t("keepintouch_subscribe")}</Button>{" "}
        </Form>
      </div>
    </div>
  );
}
export default KeepInTuch;
