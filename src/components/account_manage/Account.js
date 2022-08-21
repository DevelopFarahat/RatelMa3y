import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import UserContext from "../../utils/UserContext";
// import "./account.css";

function Account() {
    const { user } = useContext(UserContext)
  return (
    <Formik
      initialValues={{
        name: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      
    >
      {() => {
        return (
          <>
            <Form className="formone container my-3">
              <div class="container  d-flex justify-content-center row mb-3">
                <div class="mb-3">
                  <label className="formcontrol" class="form-label">
                    name{" "}
                  </label>
                  <Field
                    required
                    name="name"
                    type="text"
                    value='gg'
                    class="form-control"
                  ></Field>
                </div>
                <br />

                <div cl ass="mb-3">
                  <label className="formcontrol" class="form-label">
                    age
                  </label>
                  <Field
                    required
                    name="age"
                    type="text"
                    class="form-control"
                    value="25"
                  ></Field>
                </div>
                <br />

                {/* //start */}
                <div class="mb-3">
                  <label className="formcontrol" class="form-label">
                    certificates
                  </label>
                  <Field
                    required
                    name="start"
                    type="text"
                    class="form-control"
                    value="certificates"
                  ></Field>
                </div>
                <br />

                <div class="mb-3">
                  <label className="formcontrol" class="form-label">
                    email
                  </label>
                  <Field
                    required
                    name="qualified"
                    type="qualified"
                    class="form-control"
                    value="msayed@gmail.com"
                  ></Field>
                </div>
                <br />
                <div class="mb-3">
                  <label className="formcontrol" class="form-label">
                    mobile
                  </label>
                  <Field
                    required
                    name="qualified"
                    type="qualified"
                    class="form-control"
                    value="+201020000000"
                  ></Field>

                  <ErrorMessage name="qualified" />
                </div>
                <br />
                <div class="mb-3">
                  <label className="formcontrol" class="form-label">
                    state
                  </label>
                  <Field
                    required
                    name="qualified"
                    type="qualified"
                    class="form-control"
                    value="Egypt"
                  ></Field>
                </div>
                <br />
                <div class="mb-3">
                  <label className="formcontrol" class="form-label">
                    subscription_state
                  </label>
                  <Field
                    required
                    name="qualified"
                    type="qualified"
                    class="form-control"
                    value="Pending"
                  ></Field>
                </div>
                <br />
                <div class="mb-3">
                  <label className="formcontrol" class="form-label">
                    students
                  </label>
                  <Field
                    required
                    name="qualified"
                    type="qualified"
                    class="form-control"
                    value="62f26bf5de5d6515676b52f6"
                  ></Field>
                </div>
                <br />
                <div class="mb-3">
                  <label className="formcontrol" class="form-label">
                    _id
                  </label>
                  <Field
                    required
                    name="qualified"
                    type="qualified"
                    class="form-control"
                    value="62f26bf5de5d6515676b52f6"
                  ></Field>
                </div>
                <br />
                <div class="mb-3">
                  <label className="formcontrol" class="form-label">
                    Password
                  </label>
                  <Field
                    required
                    name="qualified"
                    type="qualified"
                    class="form-control"
                    value="password"
                  ></Field>
                </div>
                <br />
                <div class="mb-3">
                  <label className="formcontrol" class="form-label">
                    New Password
                  </label>
                  <Field
                    required
                    name="qualified"
                    type="qualified"
                    class="form-control"
                    value="new password"
                  ></Field>
                </div>
                <br />
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Male
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
                      Female
                    </label>
                  </div>
                  <div class="mb-3">
                    <div class="mb-3">
                      <label className="formcontrol" class=" mb-3 form-label">
                        {" "}
                        programs{" "}
                      </label>
                      <select
                        required
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option value="1">Memorizing</option>
                        <option value="2">Recitation</option>
                      </select>
                    </div>
                  </div>
                  <br />
                </div>
                <div class="mb-3">
                  <button type="submit" class="btn btn-success">
                    Save
                  </button>
                </div>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default Account;