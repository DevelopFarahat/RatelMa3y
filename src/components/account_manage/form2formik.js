import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import "./formik.module.css";
import axios from 'axios'

function Formikform() {
  const { user } = useContext(UserContext);
  console.log("user", user);
  const navigate = useNavigate();
  if (!user) {
    user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/login");
  }

  return (
    <>
      <Formik
        initialValues={{
          name: user.name,
          age: user.age,
          certificates: user.certificates,
          email: user.email,
          mobile: user.mobile,
          state: user.state,
          subscription_state: user.subscription_state ?? "OnHold",
          students: user._id,
          _id: user._id,
        }}
        validate={(values) => {
          const errors = {};
          if (values.password?.length < 8) {
            errors.password = "Password Must Be 8 numbers";
          } else if (values.newpassword?.length < 8) {
            errors.newpassword = "Password Must Be 8 numbers";
          }
          return errors;
        }}
        onSubmit={(values) => {
          let us = values;
          delete us._id;
          delete us.subscription_state;
          delete us.students;
          delete us.certificates;

          let field = "students"
          if(user && user.role == "instructor") field = "instructors"



          // axios.put(`http://localhost:5000/api/${field}/${user._id}`,)
        }}
      >
        {() => {
          return (
            <>
              <div className="container" style={{ marginTop: 32 }}>
                <Form className="formone">
                  <div class="container  d-flex justify-content-center row mb-3">
                    <div class="mb-3">
                      <label className="formcontrol" class="form-label">
                        name{" "}
                      </label>
                      <Field
                      disabled
                        required
                        name="name"
                        type="text"
                        class="form-control"
                        placeholder="name"
                      ></Field>
                    </div>
                    <br />

                    <div class="mb-3">
                      <label className="formcontrol" class="form-label">
                        age
                      </label>
                      <Field
                      
                      disabled
                        required
                        name="age"
                        type="text"
                        class="form-control"
                        placeholder="age"
                      ></Field>
                    </div>
                    <br />

                    {/* //start */}
                    <div class="mb-3">
                      <label className="formcontrol" class="form-label">
                        email
                      </label>
                      <Field
                      
                      disabled
                        required
                        name="email"
                        type="qualified"
                        class="form-control"
                        placeholder="email"
                        disabled
                      ></Field>
                    </div>
                    <br />

                    <div class="mb-3">
                      <label className="formcontrol" class="form-label">
                        mobile
                      </label>
                      <Field
                      disabled
                        required
                        name="mobile"
                        type="text"
                        class="form-control"
                        placeholder="mobile"
                      ></Field>

                      <ErrorMessage name="qualified" />
                    </div>

                    <br />
                    <div class="mb-3">
                      <label className="formcontrol" class="form-label">
                        state
                      </label>
                      <Field
                      disabled
                        required
                        name="state"
                        type="qualified"
                        class="form-control"
                        placeholder="state"
                      ></Field>
                    </div>

                    <br />
                    <div class="mb-3">
                      <label className="formcontrol" class="form-label">
                        subscription state
                      </label>
                      <Field
                      disabled
                        required
                        name="subscription_state"
                        type="text"
                        class="form-control"
                        placeholder="subscription_state"
                      ></Field>
                    </div>
                    <br />
                    <div class="mb-3">
                      <div className="mb-3">
                        {" "}
                        {/* <label className="formcontrol mb-3 form-label">
                          Gender
                        </label>
                        <select
                      disabled
                          required
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select> */}
                      </div>
                      <div class="mb-3"></div>
                      <br />
                    </div>
                    {/* <div class="mb-3">
                      <button type="submit" class="btn btn-success">
                        Save
                      </button>
                    </div> */}
                  </div>
                </Form>
                <div
                  style={{
                    backgroundColor: "grey",
                    width: "100%",
                    height: 4,
                    borderRadius: 16,
                    opacity: 0.2,
                    marginBottom: 32,
                  }}
                ></div>
              </div>
            </>
          );
        }}
      </Formik>
    </>
  );
}

export default Formikform;
