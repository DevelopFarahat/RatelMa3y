import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import UserContext from "../../utils/UserContext";
import { useSnackbar } from "notistack";
import "./formik.module.css";

const validatename = RegExp(/^[a-z A-Z]+ [a-z A-Z]+$/);
const validateEmail = RegExp(/^\w+@\w+.(com|net|org)$/i);
const validateAge = RegExp(/^([5-9]|[1-5]\d|60)$/);

const validatemobile = RegExp(/^[+](2011|2012|2015|2010)[\d]{7,}$/);
function Formikform() {
  const { user, setUser } = useContext(UserContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: user.name,
        age: user.age,
        email: user.email,
        mobile: user.mobile,
        state: user.state,
      }}
      validate={(values) => {
        const errors = {};
        if (values.name.length <= 2) {
          errors.name = "username should be more than 2 characters";
        }
        if (!validatename.test(values.name)) {
          errors.name = "Please enter  at least first and last name";
        }

        if (!validateAge.test(values.age)) {
          errors.age = "age should be in range  5-60";
        }
        // if (values.email.length <= 5)
        //   errors.email = "Please enter  valid email";
        if (!validateEmail.test(values.email)) {
          errors.email = "Please enter  valid email";
        }
        if (!validatemobile.test(values.mobile)) {
          errors.mobile = "Please enter  valid mobile number";
        }

        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);

        delete values.state;
        console.log(values);

        let field = user.role == "instructor" ? "instructors" : "students";

        axios
          .put(`http://localhost:5000/api/${field}/${user._id}`, values)
          .then(() => enqueueSnackbar("Saved", { variant: "success" }))
          .catch(() => enqueueSnackbar("Something went wrong"));
      }}
    >
      {() => {
        return (
          <>
            <div className="container">
              <h2>
                <span> Manage </span> Account
              </h2>
              <Form className="formone">
                <div className="containercol  d-flex justify-content-center row mb-3">
                  <div>
                    <label className="form-label">name </label>
                    <Field
                      required
                      className="form-control"
                      name="name"
                      type="text"
                      placeholder="name"
                    ></Field>
                  </div>
                  <br />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="name" />
                  </div>
                  <div>
                    <label className="form-label ">age</label>
                    <Field
                      required
                      name="age"
                      type="number"
                      className="form-control"
                      placeholder="age"
                    ></Field>
                  </div>
                  <br />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="age" />
                  </div>

                  {/* //start */}
                  <div>
                    <label className=" form-label">email</label>
                    <Field
                      required
                      disabled
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="email"
                    ></Field>
                  </div>
                  <br />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="email" />
                  </div>
                  <div>
                    <label className="form-label">mobile</label>
                    <Field
                      required
                      name="mobile"
                      type="text"
                      className="form-control"
                      placeholder="mobile"
                    ></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="mobile" />
                    </div>
                  </div>
                  <br />
                  <div>
                    <label className="form-label">state</label>
                    <Field
                      required
                      name="state"
                      type="text"
                      className="form-control"
                      placeholder="state"
                    ></Field>
                  </div>
                  <br />
                  <div>
                    <div>
                      {" "}
                      <label className="formcontrol mb-3 form-label">
                        Gender
                      </label>
                      <select
                        required
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>
                    </div>
                    <div></div>
                    <br />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-success"
                      style={{ minWidth: 100 }}
                    >
                      {" "}
                      Save{" "}
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

export default Formikform;
