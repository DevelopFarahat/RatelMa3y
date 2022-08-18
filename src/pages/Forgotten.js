import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { IoMdMail } from "react-icons/io";
import { AiFillLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function Forgotten() {
  //TODO: cont this logic
  const [isPINSent, setIsPINSent] = useState(false);
  const navigate = useNavigate();

  //if user is already logged in redirect to home
  useEffect(() => {
    if (!user) navigate("../home");
  }, []);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
        }}
        initialValues={{
          email: "",
          code: "",
        }}
      >
        {({ touched, errors }) => (
          <div
            className="container text-center"
            style={{ height: "100%", marginTop: 64, marginBottom: 32 }}
          >
            <Form
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
              <h3 className="mb-4">Recover your password</h3>
              <InputGroup hasValidation className="mb-2">
                <InputGroup.Text>
                  <IoMdMail />
                </InputGroup.Text>
                <Form.Control
                  required
                  placeholder="Email"
                  name="email"
                  type="email"
                />

                {errors.email && touched.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : null}
              </InputGroup>
              <InputGroup hasValidation className="mb-4">
                <InputGroup.Text>
                  <AiFillLock />
                </InputGroup.Text>
                <Form.Control
                  required
                  placeholder="Password"
                  name="password"
                  type="password"
                  disableds={isPINSent}
                />

                {errors.password && touched.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : null}
              </InputGroup>

              <Button type="submit" variant="success" className="mb-4">
                Submit
              </Button>

              <div
                className="w-100"
                style={{ justifyContent: "space-between", display: "flex" }}
              >
                <Link to="/forgotten" className="text-dark fw-700">
                  Forgot your password?
                </Link>
                <Link to="/register">
                  <Button variant="outline-success">
                    Register new account
                  </Button>
                </Link>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
