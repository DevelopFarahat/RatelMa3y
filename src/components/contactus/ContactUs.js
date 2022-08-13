/** @format */

import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaHeadphones } from "react-icons/fa";
import ContctUsCss from "./Contact.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormik } from "formik";
const initialValues = {
  userName: "",
  email: "",
  phone: "",
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
  return errors;
};

function ContactUs() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <div className={ContctUsCss.contact}>
      <div className={ContctUsCss.innercontact}>
        <Container>
          <FaHeadphones className={ContctUsCss.contacticon} />
          <h2>Tell Us What You Feal</h2>
          <p className='lead'>Feal To Contact Us Any Time</p>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className='mb-3' controlId='formBasicUserName'>
                  <Form.Control
                    type='text'
                    name='userName'
                    placeholder='Enter user name'
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
              </Col>
              <Col md={6}>  
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlTextarea1'>
                  <Form.Control
                    as='textarea'
                    placeholder='Your Message'
                    rows={4}
                  />
                </Form.Group>
                <Button variant='danger'>Contact Us</Button>{" "}
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}
export default ContactUs;
