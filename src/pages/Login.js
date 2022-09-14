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

export default function Login() {

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   setIsLoading(false);
  //   return () => {
  //     console.log('Unmounted')
  //     setIsLoading(true);
  //   };
  // }, []);

  //TODO: not working properly for a reason
  // //if user is already logged in redirect to home
  // useEffect(()=>{
  //   if(!user) navigate('../home')
  // },[])

  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values) => {
    axios
      .post("http://localhost:5000/api/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        if (res.status === 200) {
          //Login Successfully
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("user_name", res.data.name);
          localStorage.setItem("user_id", res.data._id);
          localStorage.setItem("user_email", res.data.email);
          localStorage.setItem("user", JSON.stringify(res.data));

          setUser(res.data);
          navigate("../home", { replace: true });
        } else return enqueueSnackbar("Incorrect email or password");
      })
      .catch((err) => enqueueSnackbar("Incorrect email or password"));
  };
  const validate = (values) => {
    let errors = {};
    /*************************************/
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }
    /*************************************/
    if (!values.password) {
      errors.password = "Required";
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  //TODO: validation is fired early whenever I write one letter in any of fields
  return (
    <>
      <div
        className="container text-center"
        style={{ height: "100%", marginTop: 64, marginBottom: 32 }}
      >
        <Form
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
          <h3 className="mb-4">Login your account</h3>
          <InputGroup className="mb-2">
            <InputGroup.Text>
              <IoMdMail />
            </InputGroup.Text>
            <Form.Control
              placeholder="Email"
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
              placeholder="Password"
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
              Log in
            </Button>
          </div>

          <div
            className="w-100"
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <Link to="/forgot-password" className="text-dark fw-700">
              Forgot your password?
            </Link>
            <Link to="/register">
              <Button variant="outline-success">Register new account</Button>
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
