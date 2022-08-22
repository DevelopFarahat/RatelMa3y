import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import './formik.module.css';


function Formikform() {

  const {user} = useContext(UserContext)
  console.log('user',user)
  const navigate = useNavigate()
  if(!user) {
    user = JSON.parse(localStorage.getItem('user'))
    if(!user) navigate('/login')
  }

  return (
    <Formik
      initialValues={
        {
          name: user.name,
          age: user.age,
          certificates: user.certificates,
          email: user.email,
          mobile: user.mobile,
          state: user.state,
          subscription_state: user.subscription_state?? "OnHold",
          students: user._id,
          _id: user._id
        }}
      validate={values => {
        const errors = {};
        if (values.password.length < 8) {
          errors.password = "Password Must Be 8 numbers";
        }
        else if (values.newpassword.length < 8) {
          errors.newpassword = "Password Must Be 8 numbers";
        }
        return errors;

      }}
      onSubmit={values => {
        console.log(values)
      }}>
      {() => {
        return (
          <>
            <div className="container" style={{marginTop: 32}}>
              <Form className="formone">
                <div class='container  d-flex justify-content-center row mb-3'  >
                  <div class="mb-3">
                    <label className="formcontrol" class="form-label"   >name </label>
                    <Field required name="name" type="text" class="form-control" placeholder="name"></Field>
                  </div><br />


                  <div class="mb-3">
                    <label className="formcontrol" class="form-label"  >age</label>
                    <Field required name="age" type="text" class="form-control" placeholder="age" ></Field>


                  </div><br />


                  {/* //start */}                 
                  <div class="mb-3">
                    <label className="formcontrol" class="form-label">email</label>
                    <Field required name="email" type="qualified" class="form-control" placeholder="email"></Field>

                  </div><br />
                  <div class="mb-3">
                    <label className="formcontrol" class="form-label">mobile</label>
                    <Field required name="mobile" type="number" class="form-control" placeholder="mobile"></Field>

                    <ErrorMessage name="qualified" />

                  </div><br />
                  <div class="mb-3">
                    <label className="formcontrol" class="form-label">state</label>
                    <Field required name="state" type="qualified" class="form-control" placeholder="state"></Field>
                  </div><br />         
                  <div class="mb-3">
                    
                    <div className="mb-3">
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
                    <div class="mb-3">
                      
                    </div><br />
                  </div>
                  <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Save</button>
                  </div>
                </div>
              </Form>
              <div style={{backgroundColor: 'grey',width: '100%', height: 4, borderRadius: 16, opacity: 0.2, marginBottom: 32}}></div>
              <Form className="formone">
                <div class='container  d-flex justify-content-center row mb-3'  >
                  {/* //start */}
                  <div class="mb-3">
                    <label className="formcontrol" class="form-label">Password</label>
                    <Field required name="password" type="password" class="form-control" placeholder="password" Reqired ></Field>
                    <div className="errormessage">
                      <ErrorMessage name="password" />
                    </div>
                  </div><br />
                  <div class="mb-3">
                    <label className="formcontrol" class="form-label">New Password</label>
                    <Field required name="newpassword" type="password" class="form-control" placeholder="new password" Reqired></Field>
                    <div className="errormessage">
                      <ErrorMessage name="newpassword" />
                    </div>
                  </div><br />
                  <div class="mb-3">
                  </div>
                  <div class="mb-3"  >
                    <button type="submit" class="btn btn-primary" > Change Password </button>
                  </div>
                </div>
              </Form>
            </div>

          </>
        );
      }}
    </Formik>


  )
}

export default Formikform