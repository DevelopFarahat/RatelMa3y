/** @format */

import React, { useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentRegistrationFormStyles from "./StudentRegistrationForm.module.css";
import { ImPrevious2 } from "react-icons/im";
import { TbPlayerTrackNext } from "react-icons/tb";
import ReadQuranImg from "../../assets/images/read-quran.jpg";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { ImUserPlus } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdError } from "react-icons/md";
import axios from "axios";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

const StudentRegistrationForm = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [studentRegistrationFormSteps, setStudentRegistrationFormSteps] =
    useState({
      firstStep: true,
      secondStep: false,
      thirdStep: false,
      fourStep: false,
      fiveStep: false,
      sixStep: false,
    });
  const [isThereNewRegistration, setIsThereNewRegistration] = useState(false);
  const [isRegistrationErrorAlertVisible, setIsRegistrationErrorAlertVisible] =
    useState(false);
  const navigate = useNavigate();
  const [workingDays, setWorkingDays] = useState({
    d0: "",
    d1: "",
    d2: "",
    d3: "",
    d4: "",
    d5: "",
    d6: "",
  });
  const [checkedDays, setCheckedDays] = useState({
    d0: false,
    d1: false,
    d2: false,
    d3: false,
    d4: false,
    d5: false,
    d6: false,
  });
  let workingHoursCheckedValuesArr = [
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
  ];

  let Working_hours = [
    { id: 0, appointment:  `8:00 ${t("AM")}`, att: "h0" },
    { id: 1, appointment:  `10:00 ${t("AM")}`, att: "h1" },
    { id: 2, appointment: `12:00 ${t("PM")}`, att: "h2" },
    { id: 3, appointment:  `2:00 ${t("PM")}`, att: "h3" },
    { id: 4, appointment: `4:00 ${t("PM")}`, att: "h4" },
    { id: 5, appointment:  `6:00 ${t("PM")}`, att: "h5" },
    { id: 6, appointment: `8:00 ${t("PM")}`, att: "h6" },
    { id: 7, appointment: `10:00 ${t("PM")}`, att: "h7" },
  ];
  const [WorkingHours, setWorkingHours] = useState({
    h0: "",
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    h7: "",
  });
  const [checkedHours, setCheckedHours] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [checkedPrograms, setCheckedPrograms] = useState({
    p0: false,
    p1: false,
    p2: false,
  });
  const [studentPrograms, setStudentPrograms] = useState({
    p0: "",
    p1: "",
    p2: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    gender: "",
    age: "",
    state: "",
    program: "",
    sessions_in_week: "",
    pref_days: [],
    pref_times_of_day: [[]],
    password: "",
    mobile: "",
    certificate: "",
    started_from_surah: "",
    reached_surah: "",
    whatsapp_number: "",
    email_verification: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    nameError: "",
    ageError: "",
    genderError: "",
    stateError: "",
    mobileError: "",
    passwordError: "",
    whatsapp_numberError: "",
    sessions_in_weekError: "",
    started_from_surahError: "",
    reached_surahError: "",
    certificateError: "",
    programError: "",
    email_verificationError: "",
  });
  let listOfCountries = [
    { id: 0, name: t("state1") },
    { id: 1, name: t("state2") },
    { id: 2, name: t("state3") },
    { id: 3, name: t("state4") },
    { id: 4, name: t("state5") },
    { id: 5, name: t("state6") },
    { id: 6, name: t("state7") },
    { id: 7, name: t("state8") },
    { id: 8, name: t("state9") },
    { id: 9, name: t("stateOther") },
  ];
  let programs = [
    { id: "p0", programName: t("program1") },
    { id: "p1", programName: t("program2") },
    { id: "p2", programName: t("program3") },
  ];
  const handleFormSteps = (event) => {
    event.preventDefault();
    event.currentTarget.id === "firstStep"
      ? setStudentRegistrationFormSteps({
          firstStep: true,
          secondStep: false,
          thirdStep: false,
          fourStep: false,
          fiveStep: false,
          sixStep: false,
        })
      : event.currentTarget.id === "secondStep"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: true,
          thirdStep: false,
          fourStep: false,
          fiveStep: false,
          sixStep: false,
        })
      : event.currentTarget.id === "thirdStep"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: true,
          fourStep: false,
          fiveStep: false,
          sixStep: false,
        })
      : event.currentTarget.id === "firstStepPrevious"
      ? setStudentRegistrationFormSteps({
          firstStep: true,
          secondStep: false,
          thirdStep: false,
          fourStep: false,
          fiveStep: false,
          sixStep: false,
        })
      : event.currentTarget.id === "secondStepPrevious"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: true,
          thirdStep: false,
          fourStep: false,
          fiveStep: false,
          sixStep: false,
        })
      : event.currentTarget.id === "thirdStepPrevious"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: true,
          fourStep: false,
          fiveStep: false,
          sixStep: false,
        })
      : event.currentTarget.id === "fourStepPrevious"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: false,
          fourStep: true,
          fiveStep: false,
          sixStep: false,
        })
      : event.currentTarget.id === "fourStep"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: false,
          fourStep: true,
          fiveStep: false,
          sixStep: false,
        })
      : event.currentTarget.id === "fiveStep"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: false,
          fourStep: false,
          fiveStep: true,
          sixStep: false,
        })
      : event.currentTarget.id === "fiveStepPrevious"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: false,
          fourStep: false,
          fiveStep: true,
          sixStep: false,
        })
      : setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: false,
          fourStep: false,
          fiveStep: false,
          sixStep: true,
        });
  };

  //TO SEND PIN WHEN REACHING 6th STEP
  
  //MARK: hash for testing /Unhash when deploying
  useEffect(() => {
    
    if (!!studentRegistrationFormSteps.sixStep)
      axios.post(
        `${process.env.REACT_APP_BACK_HOST_URL}/api/auth/request_pin`,
        { email: userData.email, rpin: true }
      );
    }, [studentRegistrationFormSteps.sixStep]);

  // just case if the user demande student can register in multiple programs
  /*
  const handleStudentPrograms = (event) => {
    setCheckedPrograms({
      ...checkedPrograms,
      [event.target.id]: event.target.value,
    });
    if (event.target.checked) {
      setStudentPrograms({
        ...studentPrograms,
        [event.target.id]: event.target.value,
      });
    } else {
      setStudentPrograms({
        ...studentPrograms,
        [event.target.id]: "",
      });
    }
  };
  */
  const handleAppointmentInDays = (event) => {
    setCheckedDays({
      ...checkedDays,
      [event.target.id]: !checkedDays[event.target.id],
    });
    if (event.target.checked) {
      setWorkingDays({
        ...workingDays,
        [event.target.id]: event.target.value,
      });
    } else {
      setWorkingDays({
        ...workingDays,
        [`d${event.target.value}`]: "",
      });
    }
  };
  const handleApoointmentInHours = (event) => {
    setCheckedHours({
      ...checkedHours,
      [event.target.id]: !checkedHours[event.target.id],
    });
    if (event.target.checked) {
      setWorkingHours({
        ...WorkingHours,
        [event.target.id]: workingHoursCheckedValuesArr[event.target.value],
      });
    } else {
      /*
      let workingHoursCloneObji = WorkingHours;
      let arr = Object.values(workingHoursCloneObji);

      arr[event.target.value] = [0, 0];
      setWorkingHours(arr);
      */
      setWorkingHours({
        ...WorkingHours,
        [`h${event.target.value}`]: "",
      });
    }
  };
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.id]: event.target.value,
    });

    errorHandle(event.target.id, event.target.value);
    localStorage.setItem("newAccountUserFullname", userData.name);
  };
  const errorHandle = (filed, value) => {
    if (filed === "email") {
      const emailRegx = /^[A-Z a-z]+[0-9]*@[A-Z a-z]+.com$/;
      setErrors({
        ...errors,
        emailError:
          value.length === 0
            ? t("keepintouch_required")
            : emailRegx.test(value)
            ? null
            : t("student_email_error_message"),
      });
    } else if (filed === "mobile") {
      const mobileRegx = /^[+][0-9]+(01)(0|1|2|5)[0-9]{8}$/;
      setErrors({
        ...errors,
        mobileError:
          value.length === 0
            ? t("student_mobile_error")
            : mobileRegx.test(value),
      });
    } else if (filed === "whatsapp_number") {
      const whatsapp_numberRegx = /^[+][0-9]+(01)(0|1|2|5)[0-9]{8}$/;
      setErrors({
        ...errors,
        whatsapp_numberError:
          value.length === 0
            ? t("keepintouch_required")
            : whatsapp_numberRegx.test(value),
      });
    } else if (filed === "name") {
      const nameRegx = /^[a-z A-Z]{1,}\s{1}[a-z A-Z]{1,}$/;
      setErrors({
        ...errors,
        nameError:
          value.length === 0
            ? t("keepintouch_required")
            : nameRegx.test(value)
            ? null
            : t("student_fullname_error"),
      });
    } else if (filed === "age") {
      setErrors({
        ...errors,
        ageError: value.length === 0 ? t("keepintouch_required") : "",
      });
    } else if (filed === "gender") {
      setErrors({
        ...errors,
        genderError: value.length === 0 ? t("keepintouch_required") : "",
      });
    } else if (filed === "programs") {
      setErrors({
        ...errors,
        programsError: value.length === 0 ? t("keepintouch_required") : "",
      });
    } else if (filed === "password") {
      const passwordRegx = /([0-9]|[a-zA-Z])+([0-9]|[a-zA-Z]){7}/;
      setErrors({
        ...errors,
        passwordError:
          value.length === 0
            ? t("keepintouch_required")
            : passwordRegx.test(value)
            ? null
            : t("student_password_error"),
      });
    } else if (filed === "state") {
      setErrors({
        ...errors,
        stateError: value.length === 0 ? t("keepintouch_required") : "",
      });
    } else if (filed === "sessions_in_week") {
      setErrors({
        ...errors,
        sessions_in_weekError:
          value.length === 0 ? t("keepintouch_required") : "",
      });
    } else if (filed === "certificate") {
      setErrors({
        ...errors,
        certificateError: value.length === 0 ? t("keepintouch_required") : "",
      });
    } else if (filed === "started_from_surah") {
      setErrors({
        ...errors,
        started_from_surahError:
          value.length === 0 ? t("keepintouch_required") : "",
      });
    } else if (filed === "reached_surah") {
      setErrors({
        ...errors,
        reached_surahError: value.length === 0 ? t("keepintouch_required") : "",
      });
    } else if (filed === "program") {
      setErrors({
        ...errors,
        programError: value.length === 0 ? t("keepintouch_required") : "",
      });
    } else if (filed === "email_verification") {
      setErrors({
        ...errors,
        email_verificationError:
          value.length === 0 ? "Verification Code Is Required" : "",
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    //CHECK IF VERIFICATION GOES WRONG
    //MARK: hash for testing /Unhash when deploying

    let result = await axios.post(
      `${process.env.REACT_APP_BACK_HOST_URL}/api/auth/confirm_pin`,
      { email: userData.email, rpin: true, pin: userData.email_verification }
    );

    if (result.status !== 200) return enqueueSnackbar(t('login_error_pin'));


    let wD = [];
    for (let i = 0; i < Object.values(workingDays).length; i++) {
      if (Object.values(workingDays)[i] === "") {
        let emptyWorkingDayInitialValue = (Object.values(workingDays)[i] = -1);
        wD.push(emptyWorkingDayInitialValue);
      } else {
        wD.push(Number(Object.values(workingDays)[i]));
      }
    }
    let wHours = [];

    for (let i = 0; i < Object.values(WorkingHours).length; i++) {
      if (Object.values(WorkingHours)[i] === "") {
        let emptyWorkingHourInitialValue = (Object.values(WorkingHours)[i] = [
          0, 0,
        ]);
        wHours.push(emptyWorkingHourInitialValue);
      } else {
        wHours.push(Object.values(WorkingHours)[i]);
      }
    }

    let finalStudentRegistrationDataObji = {
      email: userData.email,
      name: userData.name,
      gender: userData.gender,
      age: Number.parseInt(userData.age),
      state: userData.state,
      program_prefs: {
        type: userData.program,
        sessions_in_week: Number.parseInt(userData.sessions_in_week),
        pref_days: wD,
        pref_times_of_day: wHours,
      },
      password: userData.password,
      mobile: userData.mobile,
      certificate: userData.certificate,
      started_from_surah: userData.started_from_surah,
      reached_surah: userData.reached_surah,
      whatsapp_number: userData.whatsapp_number,
    };
    setIsThereNewRegistration(true);

    axios
      .post(
        `${process.env.REACT_APP_BACK_HOST_URL}/api/students`,
        finalStudentRegistrationDataObji
      )
      .then((res) => {
        if(res.status !== 200) setIsRegistrationErrorAlertVisible(true);
        
        enqueueSnackbar(t('success_registration'),{variant: 'success'})
        navigate("/login")
        setIsThereNewRegistration(false);
      })
      .catch((error) => {
        setIsRegistrationErrorAlertVisible(true);
        setTimeout(() => {
          setIsRegistrationErrorAlertVisible(false);
        }, 1000);
        setIsThereNewRegistration(false);
      });
  };

  return (
    <>
      <div
        style={{ direction: t("us") === "Us" ? "ltr" : "rtl" }}
        className={
          StudentRegistrationFormStyles["registration-form-main-container"]
        }
      >
        <div className={StudentRegistrationFormStyles["form-steps-container"]}>
          <span
            className={`${StudentRegistrationFormStyles["circle"]} ${
              userData.name === "" ||
              userData.email === "" ||
              userData.age === "" ||
              userData.password === "" ||
              errors.nameError ||
              errors.ageError ||
              errors.emailError ||
              errors.passwordError
                ? ""
                : StudentRegistrationFormStyles["coloredCircle"]
            }`}
          >
            1
          </span>
          <span
            className={`${StudentRegistrationFormStyles["line"]} ${
              userData.name === "" ||
              userData.email === "" ||
              userData.age === "" ||
              userData.password === "" ||
              errors.nameError ||
              errors.ageError ||
              errors.emailError ||
              errors.passwordError
                ? ""
                : StudentRegistrationFormStyles["coloredLine"]
            }`}
          ></span>
          <span
            className={`${StudentRegistrationFormStyles["circle"]} ${
              userData.mobile === "" ||
              userData.whatsapp_number === "" ||
              userData.gender === "" ||
              userData.state === "" ||
              errors.mobileError ||
              errors.whatsapp_numberError ||
              errors.stateError ||
              errors.genderError
                ? ""
                : StudentRegistrationFormStyles["coloredCircle"]
            }`}
          >
            2
          </span>
          <span
            className={`${StudentRegistrationFormStyles["line"]} ${
              userData.mobile === "" ||
              userData.whatsapp_number === "" ||
              userData.gender === "" ||
              userData.state === "" ||
              errors.mobileError ||
              errors.whatsapp_numberError ||
              errors.stateError ||
              errors.genderError
                ? ""
                : StudentRegistrationFormStyles["coloredLine"]
            }`}
          ></span>
          <span
            className={` ${StudentRegistrationFormStyles["circle"]} ${
              userData.program === "" ||
              errors.programError ||
              userData.certificate === "" ||
              userData.sessions_in_week === "" ||
              userData.started_from_surah === "" ||
              errors.sessions_in_weekError ||
              errors.certificateError ||
              errors.started_from_surahError
                ? ""
                : StudentRegistrationFormStyles["coloredCircle"]
            }`}
          >
            3
          </span>
          <span
            className={`${StudentRegistrationFormStyles["line"]} ${
              userData.program === "" ||
              errors.programError ||
              userData.certificate === "" ||
              userData.sessions_in_week === "" ||
              userData.started_from_surah === "" ||
              errors.sessions_in_weekError ||
              errors.certificateError ||
              errors.started_from_surahError
                ? ""
                : StudentRegistrationFormStyles["coloredLine"]
            }`}
          ></span>
          <span
            className={`${StudentRegistrationFormStyles["circle"]} ${
              (workingDays.d0 !== "" ||
                workingDays.d1 !== "" ||
                workingDays.d2 !== "" ||
                workingDays.d3 !== "" ||
                workingDays.d4 !== "" ||
                workingDays.d5 !== "" ||
                workingDays.d6 !== "") &&
              (userData.reached_surah !== "" || errors.reached_surahError)
                ? StudentRegistrationFormStyles["coloredCircle"]
                : ""
            }`}
          >
            4
          </span>
          <span
            className={`${StudentRegistrationFormStyles["line"]} ${
              (workingDays.d0 !== "" ||
                workingDays.d1 !== "" ||
                workingDays.d2 !== "" ||
                workingDays.d3 !== "" ||
                workingDays.d4 !== "" ||
                workingDays.d5 !== "" ||
                workingDays.d6 !== "") &&
              (userData.reached_surah !== "" || errors.reached_surahError)
                ? StudentRegistrationFormStyles["coloredLine"]
                : ""
            }`}
          ></span>
          <span
            className={`${StudentRegistrationFormStyles["circle"]} 
                      ${
                        WorkingHours.h0 !== "" ||
                        WorkingHours.h1 !== "" ||
                        WorkingHours.h2 !== "" ||
                        WorkingHours.h3 !== "" ||
                        WorkingHours.h4 !== "" ||
                        WorkingHours.h5 !== "" ||
                        WorkingHours.h6 !== "" ||
                        WorkingHours.h7 !== ""
                          ? StudentRegistrationFormStyles["coloredCircle"]
                          : ""
                      }`}
          >
            5
          </span>
          <span
            className={`${StudentRegistrationFormStyles["line"]} ${
              userData.email_verification !== "" ||
              errors.email_verificationError
                ? StudentRegistrationFormStyles["coloredLine"]
                : ""
            }`}
          ></span>
          <span
            className={`${StudentRegistrationFormStyles["circle"]} 
                      ${
                        userData.email_verification !== "" ||
                        errors.email_verificationError
                          ? StudentRegistrationFormStyles["coloredCircle"]
                          : ""
                      }`}
          >
            6
          </span>
        </div>
        <div className={StudentRegistrationFormStyles["form-main-container"]}>
          <div
            className={
              StudentRegistrationFormStyles["registration-form-img-container"]
            }
            style={{ order: t("us") === "Us" ? 1 : 2 }}
          >
            <LazyLoadImage src={ReadQuranImg} alt="some pepole read quran" />
          </div>
          <form
            className={StudentRegistrationFormStyles["student-form"]}
            style={{ order: t("us") === "Us" ? 2 : 1 }}
            onSubmit={handleSubmit}
          >
            <div
              className={`${
                StudentRegistrationFormStyles["registration-form-hint"]
              } ${
                studentRegistrationFormSteps.firstStep ||
                studentRegistrationFormSteps.secondStep ||
                studentRegistrationFormSteps.thirdStep ||
                studentRegistrationFormSteps.fourStep
                  ? StudentRegistrationFormStyles[
                      "registration-form-hint-on-step-1-2-3-4"
                    ]
                  : ""
              }`}
            >
              {t("registration")}{" "}
              <span>
                <mark
                  style={{
                    display: "bloxk",
                    backgroundColor: "#c2a054",
                    color: "#FFFFFF",
                    padding:'0 !important',
                    fontSize:'1.1rem !important',
                    fontFamliy:'math'
                  }}
                >
                  {t("as_student")}
                </mark>
              </span>
            </div>
            {studentRegistrationFormSteps.firstStep ? (
              <div>
                <div>
                  <Form.Label htmlFor={"name"}>{t("name")}</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    className={`${
                      StudentRegistrationFormStyles["system-user-form-controls"]
                    } ${
                      errors.nameError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }`}
                    onChange={handleChange}
                  />
                  <small className="text-danger">{errors.nameError}</small>
                </div>
                <div>
                  <div>
                    <Form.Label htmlFor={"email"}>{t("email")}</Form.Label>
                    <Form.Control
                      type="text"
                      id="email"
                      name="email"
                      value={userData.email}
                      className={`${
                        StudentRegistrationFormStyles[
                          "system-user-form-controls"
                        ]
                      } ${
                        errors.emailError
                          ? StudentRegistrationFormStyles["errors"]
                          : ""
                      }`}
                      onChange={handleChange}
                    />
                    <small className="text-danger">{errors.emailError}</small>
                  </div>
                  <Form.Label htmlFor={"age"}>{t("age")}</Form.Label>
                  <Form.Control
                    type="number"
                    id="age"
                    name="age"
                    value={userData.age}
                    min={0}
                    className={`${
                      StudentRegistrationFormStyles["system-user-form-controls"]
                    } ${
                      errors.ageError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }`}
                    onChange={handleChange}
                  />
                  <small className="text-danger">{errors.ageError}</small>
                </div>
                <div>
                  <Form.Label htmlFor={"password"}>{t("password")}</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    className={`${
                      StudentRegistrationFormStyles["system-user-form-controls"]
                    } ${
                      errors.passwordError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }`}
                    onChange={handleChange}
                  />
                  <small className="text-danger">{errors.passwordError}</small>
                </div>
                <div
                  className={
                    StudentRegistrationFormStyles["step-button-container"]
                  }
                  style={{
                    justifyContent: studentRegistrationFormSteps.firstStep
                      ? "flex-end"
                      : "space-between",
                  }}
                >
                  <button
                    type="submit"
                    id="secondStep"
                    onClick={handleFormSteps}
                    disabled={
                      userData.name === "" ||
                      userData.email === "" ||
                      userData.age === "" ||
                      userData.password === "" ||
                      errors.nameError ||
                      errors.ageError ||
                      errors.emailError ||
                      errors.passwordError
                        ? true
                        : false
                    }
                    className={`${
                      userData.name === "" ||
                      userData.email === "" ||
                      userData.age === "" ||
                      userData.password === "" ||
                      errors.nameError ||
                      errors.ageError ||
                      errors.emailError ||
                      errors.passwordError
                        ? StudentRegistrationFormStyles["disabled-btn"]
                        : StudentRegistrationFormStyles["btn"]
                    }`}
                  >
                    {t("next")}{" "}
                    <TbPlayerTrackNext
                      style={{
                        margin:t("us")===t("Us")?'4px -3px 0px -2px':'6px -3px 0px -2px',
                        transform:
                          t("us") === "Us"
                            ? "rotate(360deg)"
                            : "rotate(180deg)",
                      }}
                    />
                  </button>
                </div>
              </div>
            ) : studentRegistrationFormSteps.secondStep ? (
              <div>
                <div>
                  <Form.Label htmlFor="mobile">{t("mobile")}</Form.Label>
                  <Form.Control
                    type="number"
                    id="mobile"
                    name="mobile"
                    value={userData.mobile}
                    onChange={handleChange}
                    className={`${
                      StudentRegistrationFormStyles["system-user-form-controls"]
                    } ${
                      errors.mobileError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }`}
                  />
                  <small className="text-danger">{errors.mobileError}</small>
                </div>
                <div>
                  <Form.Label htmlFor="whatsapp_number">
                    {t("mobile number")}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    id="whatsapp_number"
                    name="whatsapp_number"
                    value={userData.whatsapp_number}
                    onChange={handleChange}
                    className={`${
                      StudentRegistrationFormStyles["system-user-form-controls"]
                    } ${
                      errors.whatsapp_numberError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }`}
                  />
                  <small className="text-danger">
                    {errors.whatsapp_numberError}
                  </small>
                </div>
                <div>
                  <Form.Label htmlFor="state">{t("state")}</Form.Label>
                  <Form.Select
                    name="state"
                    id="state"
                    value={userData.state}
                    onChange={handleChange}
                    className={`${
                      StudentRegistrationFormStyles["system-user-form-controls"]
                    } ${
                      errors.stateError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }`}
                  >
                    <option value="">{t("select")}</option>
                    {listOfCountries.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Select>
                  <small className="text-danger">{errors.stateError}</small>
                </div>
                <div>
                  <Form.Label htmlFor="gender">{t("gender")}</Form.Label>
                  <Form.Select
                    name="gender"
                    id="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    className={`${
                      StudentRegistrationFormStyles["system-user-form-controls"]
                    } ${
                      errors.genderError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }`}
                  >
                    <option value="">{t("select")}</option>
                    <option value="Male">{t("male")}</option>
                    <option value="Female">{t("female")}</option>
                  </Form.Select>
                  <small className="text-danger">{errors.genderError}</small>
                </div>
                <div
                  className={
                    StudentRegistrationFormStyles["step-button-container"]
                  }
                >
                  <button
                    type="submit"
                    id="firstStepPrevious"
                    onClick={handleFormSteps}
                    className={StudentRegistrationFormStyles["btn"]}
                  >
                    {" "}
                    <ImPrevious2
                      style={{
                        margin:t("us")===t("Us")?'0px 0px -4px':'1px 0px -4px 1px',
                        transform:
                          t("us") === "Us"
                            ? "rotate(360deg)"
                            : "rotate(180deg)",
                      }}
                    />
                    {t("prevoius")}
                  </button>
                  <button
                    type="submit"
                    id="thirdStep"
                    onClick={handleFormSteps}
                    disabled={
                      userData.mobile === "" ||
                      userData.whatsapp_number === "" ||
                      userData.gender === "" ||
                      userData.state === "" ||
                      errors.mobileError ||
                      errors.whatsapp_numberError ||
                      errors.stateError ||
                      errors.genderError
                        ? true
                        : false
                    }
                    className={`${
                      userData.mobile === "" ||
                      userData.whatsapp_number === "" ||
                      userData.gender === "" ||
                      userData.state === "" ||
                      errors.mobileError ||
                      errors.whatsapp_numberError ||
                      errors.stateError ||
                      errors.genderError
                        ? StudentRegistrationFormStyles["disabled-btn"]
                        : StudentRegistrationFormStyles["btn"]
                    }`}
                  >
                    {t("next")}{" "}
                    <TbPlayerTrackNext
                      style={{
                        margin:t("us")===t("Us")?'4px -3px 0px -2px':'6px -3px 0px -2px',
                        transform:
                          t("us") === "Us"
                            ? "rotate(360deg)"
                            : "rotate(180deg)",
                      }}
                    />
                  </button>
                </div>
              </div>
            ) : studentRegistrationFormSteps.thirdStep ? (
              <div>
                <div>
                  <Form.Label htmlFor={"program"}>
                    {t("programs_title")}
                  </Form.Label>
                  <Form.Select
                    id="program"
                    name="program"
                    value={userData.program}
                    onChange={handleChange}
                    className={
                      errors.programError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }
                  >
                    <option value="">{t("select")}</option>
                    {programs.map((pr) => (
                      <option key={pr.id} value={pr.programName}>
                        {pr.programName}
                      </option>
                    ))}
                  </Form.Select>
                  <small className="text-danger">{errors.programError}</small>
                </div>
                <div>
                  <Form.Label htmlFor="sessions_in_week">
                    {t("weeks_sessions")}
                  </Form.Label>
                  <Form.Select
                    id="sessions_in_week"
                    name="sessions_in_week"
                    value={userData.sessions_in_week}
                    onChange={handleChange}
                    className={`${
                      errors.sessions_in_weekError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }`}
                  >
                    <option value="">{t("select")}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                  <small className="text-danger">
                    {errors.sessions_in_weekError}
                  </small>
                </div>
                <div>
                  <Form.Label htmlFor="certificate">
                    {t("qualification")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="certificate"
                    name="certificate"
                    value={userData.certificate}
                    onChange={handleChange}
                    className={`${
                      errors.certificateError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }`}
                  />
                  <small className="text-danger">
                    {errors.certificateError}
                  </small>
                </div>
                <div>
                  <Form.Label htmlFor="started_from_surah">
                    {t("started_preffered_sura")}{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="started_from_surah"
                    name="started_from_surah"
                    value={userData.started_from_surah}
                    onChange={handleChange}
                    className={`${
                      errors.started_from_surahError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }`}
                  />
                  <small className="text-danger">
                    {errors.started_from_surahError}
                  </small>
                </div>
                <div
                  className={
                    StudentRegistrationFormStyles["step-button-container"]
                  }
                >
                  <button
                    type="submit"
                    id="secondStepPrevious"
                    onClick={handleFormSteps}
                    className={StudentRegistrationFormStyles["btn"]}
                  >
                    {" "}
                    <ImPrevious2
                      style={{
                        margin:t("us")===t("Us")?'0px 0px -4px':'1px 0px -4px 1px',
                        transform:
                          t("us") === "Us"
                            ? "rotate(360deg)"
                            : "rotate(180deg)",
                      }}
                    />
                    {t("prevoius")}
                  </button>
                  <button
                    type="submit"
                    id="fourStep"
                    onClick={handleFormSteps}
                    disabled={
                      userData.program === "" ||
                      errors.programError ||
                      userData.certificate === "" ||
                      userData.sessions_in_week === "" ||
                      userData.started_from_surah === "" ||
                      errors.sessions_in_weekError ||
                      errors.certificateError ||
                      errors.started_from_surahError
                        ? true
                        : false
                    }
                    className={` ${
                      userData.program === "" ||
                      errors.programError ||
                      userData.certificate === "" ||
                      userData.sessions_in_week === "" ||
                      userData.started_from_surah === "" ||
                      errors.sessions_in_weekError ||
                      errors.certificateError ||
                      errors.started_from_surahError
                        ? StudentRegistrationFormStyles["disabled-btn"]
                        : StudentRegistrationFormStyles["btn"]
                    }`}
                  >
                    {t("next")}{" "}
                    <TbPlayerTrackNext
                      style={{
                        margin:t("us")===t("Us")?'4px -3px 0px -2px':'6px -3px 0px -2px',
                        transform:
                          t("us") === "Us"
                            ? "rotate(360deg)"
                            : "rotate(180deg)",
                      }}
                    />
                  </button>
                </div>
              </div>
            ) : studentRegistrationFormSteps.fourStep ? (
              <div>
                <div>
                  <Form.Label htmlFor="reached_surah">
                    {t("reached_sura_or_juz")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="reached_surah"
                    name="reached_surah"
                    value={userData.reached_surah}
                    onChange={handleChange}
                    className={`${
                      errors.reached_surahError
                        ? StudentRegistrationFormStyles["errors"]
                        : ""
                    }`}
                  />
                  <small className="text-danger">
                    {errors.reached_surahError}
                  </small>
                </div>
                <span>{t("working_Days")}</span>
                <div
                  className={`${StudentRegistrationFormStyles["days-check-box-container"]}`}
                  style={{ minHeight: t("us") === t("Us") ? "auto" : "160px" }}
                >
                  <div
                    style={{ padding: t("us") === t("Us") ? "15px" : "16px" }}
                  >
                    <Form.Label htmlFor="d0">{t("Saturday")}</Form.Label>
                    <Form.Check
                      name="d0"
                      id="d0"
                      value={0}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d0"]}
                    />
                  </div>
                  <div
                    style={{ padding: t("us") === t("Us") ? "15px" : "16px" }}
                  >
                    <Form.Label htmlFor="d1">{t("Sunday")}</Form.Label>
                    <Form.Check
                      name="d1"
                      id="d1"
                      value={1}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d1"]}
                    />
                  </div>
                  <div
                    style={{ padding: t("us") === t("Us") ? "15px" : "16px" }}
                  >
                    <Form.Label htmlFor="d2">{t("Monday")}</Form.Label>
                    <Form.Check
                      name="d2"
                      id="d2"
                      value={2}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d2"]}
                    />
                  </div>
                  <div
                    style={{ padding: t("us") === t("Us") ? "15px" : "16px" }}
                  >
                    <Form.Label htmlFor="d3">{t("Tuesday")}</Form.Label>
                    <Form.Check
                      name="d3"
                      id="d3"
                      value={3}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d3"]}
                    />
                  </div>
                  <div
                    style={{ padding: t("us") === t("Us") ? "15px" : "16px" }}
                  >
                    <Form.Label htmlFor="d4">{t("Wednesday")}</Form.Label>
                    <Form.Check
                      name="d4"
                      id="d4"
                      value={4}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d4"]}
                    />
                  </div>
                  <div
                    style={{ padding: t("us") === t("Us") ? "15px" : "16px" }}
                  >
                    <Form.Label htmlFor="d5">{t("Thursday")}</Form.Label>
                    <Form.Check
                      name="d5"
                      id="d5"
                      value={5}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d5"]}
                    />
                  </div>
                  <div
                    style={{ padding: t("us") === t("Us") ? "15px" : "16px" }}
                  >
                    <Form.Label htmlFor="d6">{t("Friday")}</Form.Label>
                    <Form.Check
                      name="d6"
                      id="d6"
                      value={6}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d6"]}
                    />
                  </div>
                </div>
                <div className={StudentRegistrationFormStyles["step-button-container"]}>
                  <button
                    type="submit"
                    id="thirdStepPrevious"
                    onClick={handleFormSteps}
                    className={StudentRegistrationFormStyles["btn"]}
                  >
                    {" "}
                    <ImPrevious2
                      style={{
                        margin:t("us")===t("Us")?'0px 0px -4px':'1px 0px -4px 1px',
                        transform:
                          t("us") === "Us"
                            ? "rotate(360deg)"
                            : "rotate(180deg)",
                      }}
                    />
                    {t("prevoius")}
                  </button>
                  <button
                    type="submit"
                    id="fiveStep"
                    onClick={handleFormSteps}
                    disabled={
                      (workingDays.d0 !== "" ||
                        workingDays.d1 !== "" ||
                        workingDays.d2 !== "" ||
                        workingDays.d3 !== "" ||
                        workingDays.d4 !== "" ||
                        workingDays.d5 !== "" ||
                        workingDays.d6 !== "") &&
                      (userData.reached_surah !== "" ||
                        errors.reached_surahError)
                        ? false
                        : true
                    }
                    className={`${
                      (workingDays.d0 !== "" ||
                        workingDays.d1 !== "" ||
                        workingDays.d2 !== "" ||
                        workingDays.d3 !== "" ||
                        workingDays.d4 !== "" ||
                        workingDays.d5 !== "" ||
                        workingDays.d6 !== "") &&
                      (userData.reached_surah !== "" ||
                        errors.reached_surahError)
                        ? StudentRegistrationFormStyles["btn"]
                        : StudentRegistrationFormStyles["disabled-btn"]
                    }`}
                  >
                    {t("next")}{" "}
                    <TbPlayerTrackNext
                      style={{
                        margin:t("us")===t("Us")?'4px -3px 0px -2px':'6px -3px 0px -2px',
                        transform:
                          t("us") === "Us"
                            ? "rotate(360deg)"
                            : "rotate(180deg)",
                      }}
                    />
                  </button>
                </div>
              </div>
            ) : studentRegistrationFormSteps.fiveStep ? (
              <div
                className={StudentRegistrationFormStyles["step-5-container"]}
              >
                <span>{t("Working_Hours")}</span>
                <div
                  className={`${StudentRegistrationFormStyles["hours-check-box-container"]}`}
                >
                  {Working_hours.map((wh, index) => (
                    <div key={wh.id}>
                      <Form.Label htmlFor={wh.att}>{wh.appointment}</Form.Label>
                      <Form.Check
                        id={wh.att}
                        name={wh.att}
                        value={index}
                        onChange={handleApoointmentInHours}
                        checked={checkedHours[`h${index}`]}
                      />
                    </div>
                  ))}
                </div>
                <div
                  className={
                    StudentRegistrationFormStyles["step-button-container"]
                  }
                >
                  <button
                    type="submit"
                    id="fourStepPrevious"
                    onClick={handleFormSteps}
                    className={StudentRegistrationFormStyles["btn"]}
                  >
                    {" "}
                    <ImPrevious2
                      style={{
                        margin:t("us")===t("Us")?'0px 0px -4px':'1px 0px -4px 1px',
                        transform:
                          t("us") === "Us"
                            ? "rotate(360deg)"
                            : "rotate(180deg)",
                      }}
                    />
                    {t("prevoius")}
                  </button>
                  <button
                    id="sixStep"
                    type="submit"
                    disabled={
                      WorkingHours.h0 !== "" ||
                      WorkingHours.h1 !== "" ||
                      WorkingHours.h2 !== "" ||
                      WorkingHours.h3 !== "" ||
                      WorkingHours.h4 !== "" ||
                      WorkingHours.h5 !== "" ||
                      WorkingHours.h6 !== "" ||
                      WorkingHours.h7 !== ""
                        ? false
                        : true
                    }
                    className={`${
                      WorkingHours.h0 !== "" ||
                      WorkingHours.h1 !== "" ||
                      WorkingHours.h2 !== "" ||
                      WorkingHours.h3 !== "" ||
                      WorkingHours.h4 !== "" ||
                      WorkingHours.h5 !== "" ||
                      WorkingHours.h6 !== "" ||
                      WorkingHours.h7 !== ""
                        ? StudentRegistrationFormStyles["btn"]
                        : StudentRegistrationFormStyles["disabled-btn"]
                    }`}
                    onClick={handleFormSteps}
                  >
                    {t("next")}{" "}
                    <TbPlayerTrackNext
                      style={{
                        margin:t("us")===t("Us")?'4px -3px 0px -2px':'6px -3px 0px -2px',
                        transform:
                          t("us") === "Us"
                            ? "rotate(360deg)"
                            : "rotate(180deg)",
                      }}
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={StudentRegistrationFormStyles["step-6-container"]}
              >
                <p>{t("registration-code-message")}</p>
                <Form.Label htmlFor="email_verification">
                  {t("registration_code")}
                </Form.Label>
                <Form.Control
                  type="number"
                  name="email_verification"
                  id="email_verification"
                  value={userData.email_verification}
                  onChange={handleChange}
                />
                <div
                  className={
                    StudentRegistrationFormStyles["step-button-container"]
                  }
                >
                  <button
                    type="submit"
                    id="fiveStepPrevious"
                    onClick={handleFormSteps}
                    className={StudentRegistrationFormStyles["btn"]}
                  >
                    {" "}
                    <ImPrevious2
                      style={{
                        margin:t("us")===t("Us")?'0px 0px -4px':'1px 0px -4px 1px',
                        transform:
                          t("us") === "Us"
                            ? "rotate(360deg)"
                            : "rotate(180deg)",
                      }}
                    />
                    {t("prevoius")}
                  </button>
                  <button
                    type="submit"
                    className={` ${
                      userData.email_verification === "" ||
                      errors.email_verificationError
                        ? StudentRegistrationFormStyles["disabled-btn"]
                        : StudentRegistrationFormStyles["btn"]
                    }`}
                    disabled={
                      userData.email_verification === "" ||
                      errors.certificateError
                        ? true
                        : false
                    }
                  >
                    {isThereNewRegistration ? (
                      <>
                        <Spinner
                          animation="grow"
                          variant="light"
                          style={{
                            width: "10px",
                            height: "10px",
                            marginLeft: "3px",
                          }}
                        />
                        <Spinner
                          animation="grow"
                          variant="light"
                          style={{
                            width: "10px",
                            height: "10px",
                            marginLeft: "3px",
                          }}
                        />
                        <Spinner
                          animation="grow"
                          variant="light"
                          style={{
                            width: "10px",
                            height: "10px",
                            marginLeft: "3px",
                          }}
                        />
                        <Spinner
                          animation="grow"
                          variant="light"
                          style={{
                            width: "10px",
                            height: "10px",
                            marginLeft: "3px",
                          }}
                        />
                        <Spinner
                          animation="grow"
                          variant="light"
                          style={{
                            width: "10px",
                            height: "10px",
                            marginLeft: "3px",
                          }}
                        />
                        <Spinner
                          animation="grow"
                          variant="light"
                          style={{
                            width: "10px",
                            height: "10px",
                            marginLeft: "3px",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {t("Register")}
                        <ImUserPlus style={{ margin: "0 3px" }} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        {isRegistrationErrorAlertVisible ? (
          <div
            className={
              StudentRegistrationFormStyles["registration-error-alert"]
            }
          >
            <MdError size={45} color="#FFFFFF" />
            <span>Something Went Wrong Please Try Again!</span>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default StudentRegistrationForm;
