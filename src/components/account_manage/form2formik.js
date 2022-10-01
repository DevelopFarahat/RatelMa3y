import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import "./formik.module.css";
import sty from "./formik.module.css"

const validatename = RegExp(/^[a-z A-Z]+ [a-z A-Z]+$/);
const validateEmail = RegExp(/^\w+@\w+.(com|net|org)$/i);
const validateAge = RegExp(/^([5-9]|[1-5]\d|60)$/);

const validatemobile = RegExp(/^[+](2011|2012|2015|2010)[\d]{7,}$/);
function Formikform({ user, setUser, t }) {
  const { enqueueSnackbar } = useSnackbar();
  let isArabic = t('us') !=='Us'

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

        let field = user.role === "instructor" ? "instructors" : "students";

        axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/${field}/${user._id}`, values)
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
            <div className={`container ${sty['form_size']}`} style={{direction: isArabic? 'rtl':'ltr'}}>
              <h2>
                {t('navbar_account')}
              </h2>
              <Form className="formone">
                <div className="containercol  d-flex justify-content-center row mb-3">
                  <div>
                    <label className="form-label">{t('name')}</label>
                    <Field
                      required
                      className="form-control"
                      name="name"
                      type="text"
                      placeholder={t('name')}
                    ></Field>
                  </div>
                  <br />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="name" />
                  </div>
                  <div>
                    <label className="form-label ">{t('age')}</label>
                    <Field
                      required
                      name="age"
                      type="number"
                      className="form-control"
                      placeholder={t('age')}
                    ></Field>
                  </div>
                  <br />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="age" />
                  </div>

                  <div>
                    <label className=" form-label">{t('email')}</label>
                    <Field
                      required
                      disabled
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder={t('email')}
                    ></Field>
                  </div>
                  <br />

                  {user.role === "student" && (
                    <div>
                      <div>
                        <label className=" form-label">
                        {t('studentsub_substate')}
                        </label>
                        <Field
                          disabled
                          name="subscription_state"
                          type="text"
                          className="form-control"
                          placeholder={t('studentsub_substate')}
                        ></Field>
                      </div>
                    </div>
                  )}
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="email" />
                  </div>
                  <div>
                    <label className="form-label">{t('systemusers_mobile')}</label>
                    <Field
                      required
                      name="mobile"
                      type="text"
                      className="form-control"
                      placeholder={t('systemusers_mobile')}
                    ></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="mobile" />
                    </div>
                  </div>
                  <br />
                  <div>
                    <label className="form-label">{t('state')}</label>
                    <Field
                      required
                      name="state"
                      type="text"
                      className="form-control"
                      placeholder={t('state')}
                    ></Field>
                  </div>
                  <br />
                  <div>
                    <div>
                      {" "}
                      <label className="formcontrol mb-3 form-label">
                        {t('gender')}
                      </label>
                      <Field
                        required
                        name="gender"
                        component="select"
                        className="form-select"
                        placeholder={t('gender')}
                      >
                        <option value="Male">{t('male')}</option>
                        <option value="Female">{t('female')}</option>
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
                      {t('save')}{" "}
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
