/** @format */

import React, { useContext } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { IoMdMail } from "react-icons/io";
import { AiFillLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../utils/UserContext";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
// import './Login.css'

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setIsLoading } = useContext(UserContext);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values) => {
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACK_HOST_URL}/api/auth/login`, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          //Login Successfully
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("user_name", res.data.name);
          localStorage.setItem("user_id", res.data._id);
          localStorage.setItem("user_email", res.data.email);
          localStorage.setItem("user", JSON.stringify(res.data));

          setUser(res.data);
          navigate("../home", { replace: true });
        } else return enqueueSnackbar(t("login_error_incorrect"));
      })
      .catch(() => {
        setIsLoading(false);
        enqueueSnackbar(t("login_error_incorrect"));
      });
  };
  const validate = (values) => {
    let errors = {};
    /*************************************/
    if (!values.email) {
      errors.email = t("keepintouch_required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = t("keepintouch_invalid_email");
    }
    /*************************************/
    if (!values.password) {
      errors.password = t("keepintouch_required");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  // const styl = {
  //   buttonsBelow: {
  //     justifyContent: "center",
  //     display: "flex",
  //     flexWrap: "wrap",
  //     gap: "16px",
  //     backgroundColor: "grey",
  //     "&:hover": {
  //       backgroundColor: "yellow",
  //     },
  //     "@media(maxWidth:770px)": {
  //       backgroundColor: "red",
  //     },
  //   },
  // };

  return (
    <>
      <div
        className="container text-center"
        style={{
          height: "100%",
          marginTop: 64,
          marginBottom: 32,
          // direction: t("us") === "Us" ? "ltr" : "rtl",
        }}
      >
        <Form
        autoComplete="off"
          onSubmit={formik.handleSubmit}
          style={{
            backgroundColor: "#f7f7f7",
            borderRadius: 16,
            width: "50%",
            minWidth: 320,
            paddingTop: 32,
            paddingBottom: 16,
            paddingLeft: 32,
            paddingRight: 32,
            boxShadow: "0 0 12px rgb(0 0 0 / 16%)",
            margin: "auto",
          }}
        >
          <h3 className="mb-4">{t("login_title")}</h3>
          <InputGroup className="mb-2">
            <InputGroup.Text>
              <IoMdMail />
            </InputGroup.Text>
            <Form.Control
              placeholder={t("login_email")}
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            ) : null}
          </InputGroup>

          <InputGroup hasValidation className="mb-4">
            <InputGroup.Text>
              <AiFillLock />
            </InputGroup.Text>
            <Form.Control
              placeholder={t("login_password")}
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            {formik.touched.password && formik.errors.password ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            ) : null}
          </InputGroup>

          <div className="d-grid gap-2">
            <Button type="submit" variant="success" className="mb-4" size="lg">
              {t("login_button")}
            </Button>
          </div>

          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexWrap: "wrap",
              gap: "auto",
            }}
          >
            <Link to="/forgot-password" className="text-dark fw-700 w-100 mb-2">
              {t("login_forgot")}
            </Link>
            <Link to="/register" className="w-100">
              <Button variant="outline-success">{t("login_register")}</Button>
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
