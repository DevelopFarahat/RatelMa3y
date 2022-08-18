import React, { useContext, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { IoMdMail } from "react-icons/io";
import { AiFillLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../utils/UserContext";

export default function Login() {
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const navigate = useNavigate();
  const {user,setUser} = useContext(UserContext)
  
  //TODO: not working properly for a reason
  // //if user is already logged in redirect to home
  // useEffect(()=>{
  //   if(!user) navigate('../home')
  // },[])

  return (
    <>
      <div
        className="container text-center"
        style={{ height: "100%", marginTop: 64, marginBottom: 32 }}
      >
        <Formik
          validationSchema={schema}

          //Login trial
          onSubmit={async (values) => {
            let first = await axios.post("http://localhost:5000/api/auth/login", {
              email: values.email,
              password: values.password,
            });
            if(first.status==200){
                //Login Successfully
                localStorage.setItem('accessToken',first.data.accessToken)
                localStorage.setItem('user_name',first.data.name)
                localStorage.setItem('user_id',first.data._id)
                localStorage.setItem('user_email',first.data.email)
                localStorage.setItem('user',JSON.stringify(first.data))

                setUser(first.data)
                navigate("../home", { replace: true })
            }else{
                //TODO: make a snackbar for this
                alert('Credentials are incorrect')
            }
          }}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({ touched, errors, handleSubmit, handleChange, values }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
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
              <h3 className="mb-4">Login your account</h3>
              <InputGroup hasValidation className="mb-2">
                <InputGroup.Text>
                  <IoMdMail />
                </InputGroup.Text>
                <Form.Control
                  required
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
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
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  isValid={touched.password && !errors.password}
                />

                {errors.password && touched.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : null}
              </InputGroup>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  variant="success"
                  className="mb-4"
                  size="lg"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>

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
          )}
        </Formik>
      </div>
    </>
  );
}
