import React from "react";
import KeepCss from "./KeepInTouch.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

function KeepInTuch() {
  const [t, i18n] = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function confirm(){
    enqueueSnackbar("We will keep you in touch",{variant: 'success'})
  }
  return (
    <div className={KeepCss.keepin}>
      <h2>{t("keepintouch_title")}</h2>   
      <h4>Sign Up For Newsletter Don't Worry About Spam We Hate It Too</h4>
      <div className={KeepCss.keepinput}>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control type='email' placeholder='Enter email'/>
          </Form.Group>
          <Button variant='danger' onClick={confirm}>{t("keepintouch_subscribe")}</Button>{" "}
        </Form>
      </div>
    </div>
  );
}
export default KeepInTuch;
