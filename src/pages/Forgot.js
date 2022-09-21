import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Form, InputGroup } from "react-bootstrap";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

//TODO: IMO Better practice is to make snackbar for actions not for just validations
export default function Forgot() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
  const { t } = useTranslation();
  // const [password, setPassword] = useState("");

  useEffect(() => {
    if (verified) setSendBtnEnabled(false);
  }, [verified]);

  function sendPIN() {
    //validate that email is in right format
    if (!/\w+@\w+.com/.test(resetData.email)) {
      // errors.email = "Email is not in the right format";
      // setErrors((errrs)=> {errrs.email = "Email is not in the right format"; return errrs});
      return enqueueSnackbar(t("keepintouch_invalid_email"));
      // throw errors.email;
    }

    axios
      .post("http://localhost:5000/api/auth/request_pin", {
        email: resetData.email,
      })
      .then((res) => {
        if (res.status != 200) return enqueueSnackbar(t("login_error_pin"));

        //OK now count down for a minute
        setSendBtnEnabled(false);
        setPinSent(true);

        setTimeout(() => {
          setSendBtnEnabled(true);
        }, 1000 * 60);

        //TODO:: NOT WORKING PROBERLY
        var interv = setInterval(function () {
          //TODO: this causing a continous rerendering
          if (timer >= 59) {
            myStopFunction();
            console.log("works");
          }
          setTimer((ptimer) => ++ptimer);
        }, 1000);

        function myStopFunction() {
          clearInterval(interv);
        }
      })
      .catch((err) => {
        // errors.email = err;
        // setErrors(errors);
        return enqueueSnackbar(err.message);
      });
  }

  function verify() {
    if (!/\w+@\w+.com/.test(resetData.email)) {
      // errors.email = "";
      // setErrors(errors);
      return enqueueSnackbar(t("keepintouch_invalid_email"));
      // throw errors.email;
    }
    if (resetData.pin.length != 6) {
      return enqueueSnackbar(t("login_error_pin_validation"));
      // errors.pin = "PIN should be 6 digits";
      // setErrors(errors);
      // throw errors.pin;
    }

    axios
      .post("https://ratel.cyclic.app/api/auth/confirm_pin", {
        email: resetData.email,
        pin: resetData.pin,
      })
      .then((res) => {
        if (res.status != 200)
          return enqueueSnackbar(res.status + t("went_wrong"));

        setResetData({ ...resetData, ...res.data });
        setVerified(true);
      })
      .catch((err) => {
        return enqueueSnackbar(err.message);
      });
  }

  function putNewPassword() {
    axios
      .put(`http://localhost:5000/api/${resetData.field}/${resetData._id}`, {
        ...resetData,
      })
      .then((res) => {
        if (res.status != 200) {
          return enqueueSnackbar(res.status + t("went_wrong"));
        }
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        return enqueueSnackbar(err.message);
      });
  }

  return (
    <>
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
          <h3 className="mb-4">{t("login_forgot_title")}</h3>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder={t("login_email")}
              onChange={(e) => {
                setResetData({ ...resetData, email: e.target.value });
              }}
              disabled={verified}
              isInvalid={"email" in errors}
              name="email"
              type="email"
              aria-label="Email"
              aria-describedby="basic-addon2"
            />
            <Button
              variant={
                !sendBtnEnabled || verified ? "secondary" : "outline-success"
              }
              id="button-addon2"
              onClick={sendPIN}
              disabled={!sendBtnEnabled || verified}
            >
              {!sendBtnEnabled && !verified
                ? `${t("login_forgot_resend")} (${timer})`
                : t("login_forgot_send")}
            </Button>
          </InputGroup>

          <div className="d-flex row" style={{ display: "flex" }}>
            <div className="d-grid gap-2 col-6">
              <InputGroup hasValidation className="mb-4">
                <Form.Control
                  required
                  disabled={!pinSent || verified}
                  placeholder={t("login_pin")}
                  name="pin"
                  isInvalid={"pin" in errors}
                  className="col-6"
                  size="md"
                  onChange={(e) => {
                    setResetData({ ...resetData, pin: e.target.value });
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
                {t("login_forgot_verify")}
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
                    placeholder={t("login_forgot_new_password")}
                    name="password"
                    isInvalid={"password" in errors}
                    className="col-6"
                    size="md"
                    onChange={(e) => {
                      setResetData({ ...resetData, password: e.target.value });
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
                  {t("login_forgot_change")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
