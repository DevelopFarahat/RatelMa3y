import "./RegistrationForm.module.css";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const validateEmail = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateAge = RegExp(/^([5-9]|[1-5]\d|60)$/);
const validatephone = RegExp(/^\d{11}$/);
function RegistrationForm({t}) {
  return (
    <Formik
      initialValues={{
        name: "",
        emailId: "",
        age: "",
        qualified: "",
        password: "",
        whatsapp: "",
      }}
      validate={(values) => {
        const errors = {};
        if (values.name.length <= 5) {
          errors.name = "username should be more than 5 characters";
        } else if (values.age != Number) errors.age = "";
        if (!validateAge.test(values.age)) {
          errors.age = "Invalid";
        } else if (values.emailId.length <= 5) errors.emailId = "";
        if (!validateEmail.test(values.emailId)) {
          errors.emailId = "Invalid";
        }
        if (values.qualified.length <= 3) {
          errors.qualified =
            "your fully Qualified should be more than 3 characters";
        }
        if (values.password.length < 8 || values.password.length > 8) {
          errors.password = "your password should be  8 numbers";
        }
        if (!validatephone.test(values.whatsapp)) {
          errors.whatsapp = "Invalid";
        }
        if (values.whatsapp.length < 11 || values.whatsapp.length > 11) {
          errors.whatsapp = "your phone number should be  11 numbers";
        }
        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >

      {() => {
        return (
          <>
            <br />
            <Form className="container" style={{ dir: "rtl" }}>
              <h3 style={{ margin: 16 }}>{t("title")}</h3>

              <div className="container  d-flex justify-content-center row mb-3">
                <div className="mb-3">
                  <label className="formcontrol form-label">{t("name")} </label>
                  <Field
                    required
                    name="name"
                    type="text"
                    className="form-control"
                  ></Field>
                  {/* <input  
                type="text"
                value={values.name}
                onChange={handleChange}
                name="name"
                onBlur={handleBlur}
              ></input> */}
                  <ErrorMessage name="name" />
                  {/* <span>{errors.name}</span> */}
                  {/* {touched.firstName && errors.name ? (<div>{errors.name}</div> ) : null} */}
                </div>
                <br />

                <div className="mb-3">
                  <label className="formcontrol form-label">{t("age")}</label>
                  <Field
                    required
                    name="age"
                    type="text"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="age" />
                </div>
                <br />

                {/* //start */}
                <div className="mb-3">
                  {" "}
                  <label className="formcontrol form-label">
                    {t("email")}{" "}
                  </label>
                  <Field
                    required
                    name="emailId"
                    type="text"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="emailId" />
                </div>
                <br />

                <div className="mb-3">
                  {" "}
                  <label className="formcontrol form-label">
                    {t("qualified")}
                  </label>
                  <Field
                    required
                    name="qualified"
                    type="qualified"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="qualified" />
                </div>
                <br />
                <div className="mb-3">
                  {" "}
                  <label className="formcontrol form-label">
                    {" "}
                    {t("password")}
                  </label>
                  <Field
                    required
                    name="password"
                    type="password"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="password" />
                </div>
                <br />

                <div className="mb-3">
                  {" "}
                  <label className="formcontrol form-label">
                    {" "}
                    {t("mobile number")}
                  </label>
                  <Field
                    required
                    name="whatsapp"
                    type="text"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="whatsapp" />
                  {/* <span>{errors.emailId}</span> */}
                  {/* {touched.emailId && errors.emailId ? (<div>{errors.emailId}</div> ) : null} */}
                </div>
                <br />
                <div className="mb-3">
                  <div className="mb-3">
                    {" "}
                    <label className="formcontrol mb-3 form-label">
                      {t("sectionnumber")}
                    </label>
                    <select
                      required
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="0"> {t("numbers-sections")} </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="3">4</option>
                    </select>
                  </div>

                  <div className=" mb-3 divchosse">
                    {" "}
                    <label className="formcontrol mb-3 form-label">
                      {" "}
                      {t("favourite-days")}{" "}
                    </label>
                    <br></br>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox1"
                      >
                        {t("day8")}
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox2"
                      >
                        {t("day1")}
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckboxahad"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckboxahad"
                      >
                        {t("day2")}
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckboxitnen"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckboxitnen"
                      >
                        {t("day3")}
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckboxtlt"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox2tlt"
                      >
                        {t("day4")}
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckboxaraba3"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckboxarba3"
                      >
                        {t("day5")}
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckboxkhamis"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckboxkhamis"
                      >
                        {t("day7")}
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="formcontrol form-label">
                    {" "}
                    {t("weekly-time")}
                  </label>
                  <br></br>
                  <div className="form-check form-check-inline  mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      {t("From 10 to 12 at night")}
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="option2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      {t("From 1 to 3 in the afternoon")}
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      value="option2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox3"
                    >
                      {" "}
                      {t(
                        "From 4:30 in the morning until 6:30 in the afternoon"
                      )}
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox4"
                      value="option2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox4"
                    >
                      {t("From 10 to 12 at night")}
                    </label>
                  </div>
                </div>
                <div className="mb-3 mt-4">
                  <button type="submit" className="btn btn-success">
                    Submit
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

export default RegistrationForm;
