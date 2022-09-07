import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import { FaUnlockAlt } from "react-icons/fa";

// import "./changepassword.module.css";

const validatepass = RegExp(/^\w{8,}$/);

function Changepassword({ user, setUser }) {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        password: "",
        newpassword: "",
        confirmpass: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!validatepass.test(values.password)) {
          errors.password = "Please enter atleast 8 chars";
        }
        if (!validatepass.test(values.newpassword)) {
          errors.newpassword = "Please enter atleast 8 chars";
        }
        if (values.confirmpass != values.newpassword) {
          errors.confirmpass = "Password is not match";
        }
        return errors;
      }}
      onSubmit={(values, {resetForm}) => {

        let field = user.role === "instructor" ? "instructors" : "students";

        axios
          .put(`http://localhost:5000/api/${field}/${user._id}`, {
            email: user.email,
            password: values.newpassword,
            old_password: values.password,
          })
          .then(() => {
            enqueueSnackbar("Changed", { variant: "success" });
            resetForm()            
          })
          .catch((err) => enqueueSnackbar("Something went wrong",err));
      }}
    >
      {() => {
        return (
          <>
            <div className="container">
              <div
                className="divspace"
                style={{
                  backgroundColor: "",
                  width: "100%",
                  height: "100%",
                  borderRadius: 16,
                }}
              >
                <h2 style={{ marginLeft: 16, marginBottom: 24 }}>
                  <FaUnlockAlt style={{ marginRight: 16 }} />
                  Change Password
                </h2>
              </div>
              <Form className="formsec">
                <div className="container  d-flex justify-content-center row mb-3">
                  {/* //start */}
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <Field
                      required
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="password"
                    ></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  <br />
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <Field
                      required
                      name="newpassword"
                      type="password"
                      className="form-control"
                      placeholder="new password"
                    ></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="newpassword" />
                    </div>
                  </div>
                  <br />
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <Field
                      required
                      name="confirmpass"
                      type="password"
                      className="form-control"
                      placeholder="confirm password"
                    ></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="confirmpass" />
                    </div>
                  </div>
                  <br />
                  <div className="mb-3"></div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-success">
                      {" "}
                      Change Password{" "}
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default Changepassword;
