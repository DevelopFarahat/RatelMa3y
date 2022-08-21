import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Form, InputGroup } from "react-bootstrap";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from 'notistack';


//TODO: IMO Better practice is to make snackbar for actions not for just validations
export default function Forgot() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const navigate = useNavigate();

  //TODO: validation here is not working properly
  const [timer, setTimer] = useState(0);
  const [resetData, setResetData] = useState({});
  const [sendBtnEnabled, setSendBtnEnabled] = useState(true);
  const [pinSent, setPinSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState({});
  // const [password, setPassword] = useState("");

  useEffect(()=>{if(verified) setSendBtnEnabled(false)},[verified])


  function sendPIN() {
    //validate that email is in right format
    if (!/\w+@\w+.com/.test(resetData.email)) {
      // errors.email = "Email is not in the right format";
      // setErrors((errrs)=> {errrs.email = "Email is not in the right format"; return errrs});
      return enqueueSnackbar('Email is not in the right format')
      // throw errors.email;
    }

    axios
      .post("http://localhost:5000/api/auth/request_pin", {
        email: resetData.email,
      })
      .then((res) => {
        if (res.status != 200) {
          // errors.response = res.status;
          // setErrors(errors);
        return enqueueSnackbar('Error: PIN code is incorrect');

          // enqueueSnackbar('Failed fetching data.')
          // throw "Something went wrong. Please, confirm that pin is correct";
        }
        //OK now count down for a minute
        setSendBtnEnabled(false);
        setPinSent(true);

        setTimeout(() => {
          setSendBtnEnabled(true);
        }, 1000 * 60);

        var interv = setInterval(function() {
          //TODO: this causing a continous rerendering
          if (timer >= 59) {myStopFunction();console.log('works')}
          setTimer((ptimer) => ++ptimer);
        }, 1000);

        function myStopFunction() {
          clearInterval(interv);
        }
      })
      .catch((err) => {
        // errors.email = err;
        // setErrors(errors);
        return enqueueSnackbar('Error: '+err.message);
      });
  }

  function verify() {
    if (!/\w+@\w+.com/.test(resetData.email)) {
      // errors.email = "";
      // setErrors(errors);
      return enqueueSnackbar('Email is not in the right format');
      // throw errors.email;
    }
    if (resetData.pin.length != 6) {
      return enqueueSnackbar("PIN should be 6 digits");
      // errors.pin = "PIN should be 6 digits";
      // setErrors(errors);
      // throw errors.pin;
    }

    axios
      .post("http://localhost:5000/api/auth/confirm_pin", {
        email: resetData.email,
        pin: resetData.pin,
      })
      .then((res) => {
      if(res.status != 200)
        return enqueueSnackbar(res.status+': Something went wrong');
      
        setResetData({ ...resetData, ...res.data });
        setVerified(true)
      })
      .catch((err) => {
        return enqueueSnackbar(err.message);
      });
  }

  function putNewPassword(){
    console.log('resetData',resetData)
    axios.put(`http://localhost:5000/api/${resetData.field}/${resetData._id}`,{
      ...resetData
    }).then((res)=>{
      if(res.status != 200){
        // alert(res.status+': Something went wrong')
        // errors.password = "Something went wrong"
        // setErrors(errors)
        return enqueueSnackbar(res.status+': Something went wrong');
        // throw res.status+': Something went wrong'
      }
       navigate('/login',{replace: true})
    }).catch((err)=> {
      // alert(err)
      // errors.password = err
      // setErrors(errors)
      return enqueueSnackbar(err.message);
      // throw err
    })
  }

  //TODO: do it as Accordion
  return (
    <>
      {/* <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <button eventKey="1">Click me!</button>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion> */}

      <div
        className="container text-center"
        style={{ height: "100%", marginTop: 64, marginBottom: 32 }}
      >
        <div
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
          <h3 className="mb-4">Reset your password</h3>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Email"
              onChange={(e) => {
                setResetData({ ...resetData,email: e.target.value });
                // let objEr = errors;
                // delete objEr.email;
                // setErrors(objEr);
              }}
              disabled={verified}
              isInvalid={"email" in errors}
              name="email"
              type="email"
              aria-label="Email"
              aria-describedby="basic-addon2"
            />
            <Button
              variant={!sendBtnEnabled || verified? "secondary":"outline-success"}
              id="button-addon2"
              onClick={sendPIN}
              disabled={!sendBtnEnabled||verified}
            >
              {!sendBtnEnabled && !verified ?`Resend (${timer})`: "SEND"}
            </Button>
          </InputGroup>

          <div className="d-flex row" style={{ display: "flex" }}>
            <div className="d-grid gap-2 col-6">
              <InputGroup hasValidation className="mb-4">
                <Form.Control
                  required
                  disabled={!pinSent || verified}
                  placeholder="Code"
                  name="pin"
                  isInvalid={"pin" in errors}
                  className="col-6"
                  size="md"
                  onChange={(e) => {
                    // let objEr = errors;
                    // delete objEr.pin;
                    // setErrors(objEr);
                    setResetData({ ...resetData,pin: e.target.value });
                  }}
                />
              </InputGroup>
            </div>

            <div className="d-grid gap-2 col-6">
              <Button
                disabled={!pinSent || verified}
                variant="success"
                className="mb-4"
                size="md"
                onClick={verify}
              >
                Verify
              </Button>
            </div>
          </div>

          {verified && (
            <div className="d-flex row" style={{ display: "flex" }}>
              <div className="d-grid gap-2 col-6">
                <InputGroup hasValidation className="mb-4">
                  <Form.Control
                    required
                    disabled={!verified}
                    placeholder="New Password"
                    name="password"
                    isInvalid={"password" in errors}
                    className="col-6"
                    size="md"
                    onChange={(e) => {
                      // let objEr = errors;
                      // delete objEr.password;
                      // setErrors(objEr);
                      setResetData({ ...resetData,password: e.target.value });
                    }}
                  />
                </InputGroup>
              </div>

              <div className="d-grid gap-2 col-6">
                <Button
                  disabled={!verified}
                  variant="success"
                  className="mb-4"
                  size="md"
                  onClick={putNewPassword}
                >
                  Change
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
