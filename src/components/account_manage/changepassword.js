import { Formik, Form, Field, ErrorMessage } from "formik";
// import './changepassword.module.css';
import './formik.css';


function Changepassword() {
    return (
        <Formik
            initialValues={
                {
                    password: " ",
                    newpassword: " ",
                    
                }}
                validate={values => {
                    const errors = {};                                               
                    if (values.password.length <8 ) {
                      errors.password = "your  Password Must Be 8 numbers";
                    }
                    else if (values.newpassword!=values.password ) {
                        errors.newpassword = "Password is not match";
                      }
                    return errors;
            
                  }}

            onSubmit={values => {
                console.log(values)
            }}>
            {() => {
                return (
                    <>
                        <Form className="formone">
                            <div class='container  d-flex justify-content-center row mb-3'  >
                                {/* //start */}
                                <div class="mb-3">
                                    <label className="formcontrol" class="form-label">Password</label>
                                    <Field required name="password" type="password" class="form-control" placeholder="password" Reqired ></Field>
                                    <div className="errormessage">
                                    <ErrorMessage name="password"  />
                                    </div>
                                </div><br />
                                <div class="mb-3">
                                    <label className="formcontrol" class="form-label">New Password</label>
                                    <Field required name="newpassword" type="password" class="form-control" placeholder="new password" Reqired></Field>
                                    <div className="errormessage">
                                    <ErrorMessage name="newpassword"  />
                                    </div>
                                </div><br />
                                <div class="mb-3">                             
                                 </div>
                                <div class="mb-3"  >
                                    <button type="submit"  class="btn btn-primary" > Changepassword </button>  
                                </div>
                            </div>
                        </Form>


                    </>
                );
            }}
        </Formik>
    )
}

export default Changepassword;