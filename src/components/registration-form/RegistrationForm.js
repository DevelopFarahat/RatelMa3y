/** @format */

import React from "react";
import RegCss from "./RegistrationForm.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
const initialValues = {
  Name: "",
  email: "",
  phone: "",
  gender: "",
  state: "",
  password: "",
  age: "",
  day: "",
  hour: "",
};
const onSubmit = (values) => {
  console.log("Form data", values);
  //TODO: make a place for storing contacts in backend
  alert("Welcome ,,, " + " " + values.userName);
};
const validate = (values) => {
  let errors = {};
  if (!values.Name) {
    errors.Name = "Required";
  } else if (!/^(?:[A-Z]{2,15} ?\b){2,4}$/i.test(values.Name)) {
    errors.Name = "at least your first and last names in english";
  }
  /*************************************/
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }
  /*************************************/
  if (!values.password) {
    errors.password = "Required";
  } else if (!/^\d{10}$/i.test(values.password)) {
    errors.password = "password must be 10 digits";
  }
  /*************************************/
  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^\d{12}$/i.test(values.phone)) {
    errors.phone = "Invalid phone number!";
  }
  /*************************************/
  if (!values.state) {
    errors.state = "Required";
  }
  /*************************************/
  if (!values.age) {
    errors.age = "Required";
  } else if (values.age <= 4) {
    errors.age = "age must be more than 4 years !";
  } else if (values.age >= 100) {
    errors.age = "age must be less than 100 years !";
  }
  /*************************************/
  if (!values.gender) {
    errors.gender = "Required";
  }
  /*************************************/
  if (!values.day) {
    errors.day = "Required";
  }
  /*************************************/
  if (!values.hour) {
    errors.hour = "Required";
  }
  return errors;
};
function RegistrationForm() {
  const [t, i18n] = useTranslation();
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  document.title = "Registration Form";
  return (
    <div className={RegCss.registration}>
      <Container>
        <h2>
          <span>{t("Registration")}</span> {t("Form")}
        </h2>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label className={RegCss.label}>Name</Form.Label>
            <Form.Control
              className={RegCss.inputtype}
              type='text'
              name='Name'
              placeholder='Enter full name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Name}
            />
            {formik.touched.Name && formik.errors.Name ? (
              <div className='error'>{formik.errors.Name}</div>
            ) : null}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicage'>
            <Form.Label className={RegCss.label}>Age</Form.Label>
            <Form.Control
              className={RegCss.inputtype}
              type='number'
              name='age'
              placeholder='your age'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age ? (
              <div className='error'>{formik.errors.age}</div>
            ) : null}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label className={RegCss.label}>Email</Form.Label>
            <Form.Control
              className={RegCss.inputtype}
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
          <Form.Group className='mb-3' controlId='formBasicpassword'>
            <Form.Label className={RegCss.label}>Password</Form.Label>
            <Form.Control
              className={RegCss.inputtype}
              type='password'
              name='password'
              placeholder='create Password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='error'>{formik.errors.password}</div>
            ) : null}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPhone'>
            <Form.Label className={RegCss.label}>Phone</Form.Label>
            <Form.Control
              className={RegCss.inputtype}
              type='number'
              name='phone'
              placeholder='Whatsapp phone: +20 xxxxxxx'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className='error'>{formik.errors.phone}</div>
            ) : null}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicstate'>
            <Form.Label className={RegCss.label}>State</Form.Label>
            <Form.Control
              className={RegCss.inputtype}
              type='text'
              name='state'
              placeholder=' enter your state'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
            />
            {formik.touched.state && formik.errors.state ? (
              <div className='error'>{formik.errors.state}</div>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label className={RegCss.label}>Gender</Form.Label>
            <br />
            <div className={RegCss.checkContainer}>
              <Form.Check
                className={RegCss.checklabel}
                name='gender'
                label='Male'
                inline
                type='radio'
              />
              <Form.Check
                className={RegCss.checklabel}
                name='gender'
                label='Female'
                inline
                type='radio'
              />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label className={RegCss.label}>Working days</Form.Label>
            <br />
            <div className={RegCss.checkContainer}>
              <Form.Check
                className={RegCss.checklabel}
                name='day'
                label='Friday'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='day'
                label='Saturday'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='day'
                label='Sunday'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='day'
                label='Monday'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='day'
                label='Tuesday'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='day'
                label='Wednesday'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='day'
                label='Thursday'
                inline
              />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label className={RegCss.label}>Working Hours</Form.Label>
            <br />
            <div className={RegCss.checkContainer}>
              <Form.Check
                className={RegCss.checklabel}
                name='hour'
                label='08:00 am to 10:00 pm'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='hour'
                label='10:00 am to 12:00 pm'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='hour'
                label='12:00 pm to 02:00 pm'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='hour'
                label='02:00 pm to 04:00 pm'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='hour'
                label='04:00 pm to 06:00 pm'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='hour'
                label='06:00 pm to 08:00 pm'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='hour'
                label='08:00 pm to 10:00 pm'
                inline
              />
              <Form.Check
                className={RegCss.checklabel}
                name='hour'
                label='10:00 pm to 12:00 am'
                inline
              />
            </div>
          </Form.Group>
          <Button variant='primary' type='submit'>
            {t("submit")}
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default RegistrationForm;
