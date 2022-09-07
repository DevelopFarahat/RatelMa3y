import React, { useState } from "react";
import KeepCss from "./KeepInTouch.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import axios from "axios";

function KeepInTuch() {
  const [t, i18n] = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [ email , setEmail] = useState('')

  function confirm(){
    axios.post('http://localhost:5000/api/events/subscripe ',{email: email}).then(()=>
    enqueueSnackbar("We will keep you in touch",{variant: 'success'})
     ).catch((err)=> console.error(err))
  }
  return (
    <div className={KeepCss.keepin}>
      <h2>{t("keepintouch_title")}</h2>   
      <h4>Sign Up For Newsletter Don't Worry About Spam We Hate It Too</h4>
      <div className={KeepCss.keepinput}>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control type='email' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
          </Form.Group>
          <Button variant='danger' onClick={confirm}>{t("keepintouch_subscribe")}</Button>{" "}
        </Form>
      </div>
    </div>
  );
}
export default KeepInTuch;
