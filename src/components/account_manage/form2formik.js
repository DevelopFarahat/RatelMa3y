import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import "./formik.module.css";
import sty from "./formik.module.css"

const validatename = RegExp(/^[a-z A-Z]+ [a-z A-Z]+$/);
const validateEmail = RegExp(/^\w+@\w+.(com|net|org)$/i);
const validateAge = RegExp(/^([5-9]|[1-5]\d|60)$/);

const validatemobile = RegExp(/^[+](2011|2012|2015|2010)[\d]{7,}$/);
function Formikform({ user, setUser }) {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: user.name,
        age: user.age,
        email: user.email,
        gender: user.gender,
        mobile: user.mobile,
        state: user.state,
        subscription_state: user.subscription_state,
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
        delete values.subscription_state;
        console.log(values);

        let field = user.role === "instructor" ? "instructors" : "students";

        axios.put(`http://localhost:5000/api/${field}/${user._id}`, values)
          .then(() => {
            setUser({ ...user, ...values });
            // localStorage.setItem(JSON.stringify(user))
            enqueueSnackbar("Saved", { variant: "success" });
          })
          .catch(() => enqueueSnackbar("Something went wrong"));
      }}
    >
      {() => {
        return (
          <>
            <div className={`container ${sty['form_size']}`}>
              <h2>
                Manage Account
              </h2>
              <Form className="formone">
                <div className="containercol  d-flex justify-content-center row mb-3">
                  <div>
                    <label className="form-label">Name </label>
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
                    <label className="form-label ">Age</label>
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

                  <div>
                    <label className=" form-label">Email</label>
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

                  {user.role === "student" && (
                    <div>
                      <div>
                        <label className=" form-label">
                          Subscription State
                        </label>
                        <Field
                          disabled
                          name="subscription_state"
                          type="text"
                          className="form-control"
                          placeholder="State"
                        ></Field>
                      </div>
                    </div>
                  )}
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="email" />
                  </div>
                  <div>
                    <label className="form-label">Mobile</label>
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
                    <label className="form-label">State</label>
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
                      <Field
                        required
                        name="gender"
                        component="select"
                        className="form-select"
                        placeholder="select gender"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>
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