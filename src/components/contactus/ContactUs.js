/** @format */

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaHeadphones } from "react-icons/fa";
import ContctUsCss from "./Contact.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSnackbar } from "notistack";

const initialValues = {
  userName: "",
  email: "",
  phone: "",
  content: "",
};

function ContactUs() {
  const validate = (values) => {
    let errors = {};
    if (!values.userName) {
      errors.userName = t("keepintouch_required");
    } else if (!/^(?:[A-Z]{2,15} ?\b){2,4}$/i.test(values.userName)) {
      errors.userName = t("keepintouch_invalid_username");
    }
    /*************************************/
    if (!values.email) {
      errors.email = t("keepintouch_required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = t("keepintouch_invalid_email");
    }
    /*************************************/
    if (!values.phone) {
      errors.phone = t("keepintouch_required");
    } else if (!/^[0-9]*$/i.test(values.phone)) {
      errors.phone = t("keepintouch_invalid_phone");
    }
    return errors;
  };

  const onSubmit = (values, { resetForm }) => {
    axios
      .post(`${process.env.REACT_APP_BACK_HOST_URL}/api/contacts`, {
        name: values.userName,
        content: values.content,
        email: values.email,
        phone: values.phone,
      })
      .then((res) => {
        if (res.status === 200) {
        }
      });

    enqueueSnackbar("Sent Successfully", { variant: "success" });
    resetForm();
    
  };

  const [isArabic, setIsArabic] = useState(false);
  const [t] = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setIsArabic(localStorage.getItem("i18nextLng") === "ar");
  }, [localStorage.getItem("i18nextLng")]);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  
  return (
    <div
      style={{ direction: t("us") === "Us" ? "ltr" : "rtl" }}
      className={ContctUsCss.contact}>
      <div className={ContctUsCss.innercontact}>
        <Container style={{ direction: isArabic ? "rtl" : "ltr" }}>
          <FaHeadphones className={ContctUsCss.contacticon} />
          <h2>{t("contactus_title")}</h2>
          <p className='lead'>{t("contactus_text")}</p>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className='mb-3' sigma="" controlid='formBasicUserName'>
                  <Form.Control
                    type='text'
                    name='userName'
                    placeholder={t("keepintouch_hint_username")}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                  />
                  {formik.touched.userName && formik.errors.userName ? (
                    <div className='error'>{formik.errors.userName}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className='mb-3' sigma="" controlid='formBasicEmail'>
                  <Form.Control
                    type='email'
                    name='email'
                    placeholder={t("keepintouch_hint_email")}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className='error'>{formik.errors.email}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className='mb-3' sigma="" controlid='formBasicPhone'>
                  <Form.Control
                    type='number'
                    name='phone'
                    placeholder={t("keepintouch_hint_number")}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className='error'>{formik.errors.phone}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className='mb-3'
                  sigma="" controlid='exampleForm.ControlTextarea1'>
                  <Form.Control
                    as='textarea'
                    name='content'
                    placeholder={t("keepintouch_hint_msg")}
                    rows={4}
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Form.Group>
                <Button type="submit"  variant='danger'>{t("contactus_btn")}</Button>{" "}
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}
export default ContactUs;
