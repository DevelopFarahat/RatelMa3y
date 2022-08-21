/** @format */

import React from "react";
import RegCss from "./RegistrationForm.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import axios from "axios";
// import { useSnackbar } from "notistack";

const initialValues = {
  Name: "",
  email: "",
  phone: "",
  Education: "",
};
const onSubmit = (values) => {
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // // {
  //     name: ,
  //     age: ,
  //     gender: "Male",
  //     state: ,
  //     mobile: ,
  //     email: ,
  //     password: ,
  //     certificate: String,
  //     reached_surah: String,
  //     whatsapp_number: String,
  //     program_prefs: {
  //         sessions_in_week: 2,
  //         pref_days: [1,6],
  //         pref_times_of_day: [[0,1],[0,1][0,0]]
  //       },
  // }

  //TODO: just temp data for testing form
  //TODO: verify his email with pin code message first

  // axios
  //   .post("http://localhost:5000/api/students", {
  //     name: values.Name,
  //     age: 23,
  //     gender: "Male",
  //     state: "Egypt",
  //     mobile: values.phone,
  //     email: values.email,
  //     password: "test123",
  //     certificate: values.Education,
  //     whatsapp_number: values.Education,
  //     program_prefs: {
  //       sessions_in_week: 2,
  //       pref_days: [1, 3, 6],
  //       pref_times_of_day: [
  //         [0, 1],
  //         [0, 1],
  //       ],
  //     },
  //   })
  //   .then((res) => {
  //     if (res.status != 200)
  //       return 
  //       // enqueueSnackbar("Incorrect email or password");
  //   });

  console.log("Form data", values);
  //TODO: make a place for storing contacts in backend
  alert("Welcome ,,, " + " " + values.Name);
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
  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^[0-9]*$/i.test(values.phone)) {
    errors.phone = "Invalid phone number!";
  }
  /*************************************/
  if (!values.Education) {
    errors.Education = "Required";
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
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className={RegCss.label}>Name</Form.Label>
            <Form.Control
              className={RegCss.inputtype}
              type="text"
              name="Name"
              placeholder="Enter full name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Name}
            />
            {formik.touched.Name && formik.errors.Name ? (
              <div className="error">{formik.errors.Name}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={RegCss.label}>Email</Form.Label>
            <Form.Control
              className={RegCss.inputtype}
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label className={RegCss.label}>Phone</Form.Label>
            <Form.Control
              className={RegCss.inputtype}
              type="number"
              name="phone"
              placeholder="Whatsapp phone: +20 xxxxxxx"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error">{formik.errors.phone}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEducation">
            <Form.Label className={RegCss.label}>Education</Form.Label>
            <Form.Control
              className={RegCss.inputtype}
              type="text"
              name="Education"
              placeholder=" enter qualifications degree"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Education}
            />
            {formik.touched.Education && formik.errors.Education ? (
              <div className="error">{formik.errors.Education}</div>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label className={RegCss.label}>
              Where would you like to start?
            </Form.Label>
            <br />
            <Form.Check
              className={RegCss.checklabel}
              name="start"
              label="From Surah An-Nas"
              inline
              type="radio"
            />
            <Form.Check
              className={RegCss.checklabel}
              name="start"
              label="From Surah Al-Baqarah"
              inline
              type="radio"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={RegCss.label}>
              Number of weekly classes
            </Form.Label>
            <br />
            <Form.Check
              className={RegCss.checklabel}
              name="classnum"
              label="1"
              inline
              type="radio"
            />
            <Form.Check
              className={RegCss.checklabel}
              name="classnum"
              label="2"
              inline
              type="radio"
            />
            <Form.Check
              className={RegCss.checklabel}
              name="classnum"
              label="3"
              inline
              type="radio"
            />
            <Form.Check
              className={RegCss.checklabel}
              name="classnum"
              label="4"
              inline
              type="radio"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={RegCss.label}>
              Favorite days to study
            </Form.Label>
            <br />
            <Form.Check
              className={RegCss.checklabel}
              name="day"
              label="Friday"
              inline
            />
            <Form.Check
              className={RegCss.checklabel}
              name="day"
              label="Saturday"
              inline
            />
            <Form.Check
              className={RegCss.checklabel}
              name="day"
              label="Sunday"
              inline
            />
            <Form.Check
              className={RegCss.checklabel}
              name="day"
              label="Monday"
              inline
            />
            <Form.Check
              className={RegCss.checklabel}
              name="day"
              label="Tuesday"
              inline
            />
            <Form.Check
              className={RegCss.checklabel}
              name="day"
              label="Wednesday"
              inline
            />
            <Form.Check
              className={RegCss.checklabel}
              name="day"
              label="Thursday"
              inline
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {t("submit")}
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default RegistrationForm;
