/** @format */

import React from "react";
import ContactCss from "./Contact.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";

const initialValues = {
  userName: "",
  email: "",
  phone: "",
  message: "",
};
const onSubmit = (values) => {
  console.log("Form data", values);
  alert("Welcome ,,, " + " " + values.userName);
};
const validate = (values) => {
  let errors = {};
  if (!values.userName) {
    errors.userName = "Required";
  } else if (!/^(?:[A-Z]{2,15} ?\b){2,4}$/i.test(values.userName)) {
    errors.userName = "Invalid user name";
  }
  /*************************************/
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }
  /*************************************/
  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^[0-9]*$/i.test(values.phone)) {
    errors.phone = "Invalid phone number!";
  }
  /*************************************/
  if (!values.message) {
    errors.message = "Required";
  } else if (
    !/^(?:[a-zA-Z\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$/i.test(
      values.message
    )
  ) {
    errors.message = "Just letters please!";
  }
  return errors;
};
function Contact() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  document.title = "Contact us";

  return (
    <div className={ContactCss.contact}>
      <Container>
        <h2>
          <span>Contact</span> Us
        </h2>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicUserName'>
            <Form.Control
              type='text'
              name='userName'
              placeholder='Enter full name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className='error'>{formik.errors.userName}</div>
            ) : null}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter your email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='error'>{formik.errors.email}</div>
            ) : null}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPhone'>
            <Form.Control
              type='number'
              name='phone'
              placeholder='Enter phone: +20 xxxxxxx'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className='error'>{formik.errors.phone}</div>
            ) : null}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicMessage'>
            <Form.Control
              as='textarea'
              name='message'
              placeholder='Say some thing'
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className='error'>{formik.errors.message}</div>
            ) : null}
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
export default Contact;
