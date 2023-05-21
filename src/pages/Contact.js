import React from "react";
import ContactCss from "./Contact.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSnackbar } from "notistack";

import { Helmet } from "react-helmet-async";
import HeadTags from "../components/head/Head";

const initialValues = {
  userName: "",
  email: "",
  phone: "",
  message: "",
};

function Contact() {
  const { t } = useTranslation();

  const validate = (values) => {
    let errors = {};
    if (!values.userName) {
      errors.userName = t("keepintouch_required");
    } else if (!/^(?:[A-Z]{2,15} ?\b){2,4}$/i.test(values.userName)) {
      errors.userName = t("student_fullname_error");
    }
    /*************************************/
    if (!values.email) {
      errors.email = t("keepintouch_required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = t("student_email_error_message");
    }
    /*************************************/
    if (!values.phone) {
      errors.phone = t("keepintouch_required");
    }
    /*************************************/
    if (!values.message) {
      errors.message = t("keepintouch_required");
    }
    return errors;
  };

  const onSubmit = (values, { resetForm }) => {
    axios
      .post(`${process.env.REACT_APP_BACK_HOST_URL}/api/contacts`, {
        name: values.userName,
        content: values.message,
        email: values.email,
        phone: values.phone,
      })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Sent Successfully", { variant: "success" });
          resetForm();
        }
      });
  };

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <>

      <Helmet>
        {HeadTags({ title: t("navbar_contactus"), summary: "تواصل معنا في مدرسة رتل معي", url: `${process.env.REACT_APP_FRONT_HOST_URL}/contact`, img: 'https://ratelmay.com/%PUBLIC_URL%/logo.webp', keywords: "Ratel May, رتل معي, قرآن كريم, Ratel May Academy, contact" })}
      </Helmet>
      <div
        className={ContactCss.contact}
        style={{ direction: t("us") === "Us" ? "ltr" : "rtl" }}>
        <Container>
          <h2>
            <span>{t("contact")}</span> {t("us")}
          </h2>
          <Form onSubmit={formik.handleSubmit}>
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
            <Form.Group className='mb-3' sigma="" controlid='formBasicMessage'>
              <Form.Control
                as='textarea'
                name='message'
                placeholder={t("contactus_hint_say_something")}
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message ? (
                <div className='error'>{formik.errors.message}</div>
              ) : null}
            </Form.Group>
            <Button variant='success' type='submit'>
              {t("submit")}
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
}
export default Contact;
