import React, { useState,useRef,useLayoutEffect } from "react";
import {useNavigate} from "react-router-dom";
import StudentRegistrationFormStyles from "./StudentRegistrationForm.module.css";
import { ImPrevious2 } from "react-icons/im";
import { TbPlayerTrackNext } from "react-icons/tb";
import ReadQuranImg from "../../assets/images/read-quran.jpg";
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { ImUserPlus } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {MdError} from "react-icons/md";
import axios from "axios";
const StudentRegistrationForm = () => {
  const [t, i18n] = useTranslation();
  const [studentRegistrationFormSteps, setStudentRegistrationFormSteps] =
    useState({
      firstStep: true,
      secondStep: false,
      thirdStep: false,
      fourStep: false,
      fiveStep: false,
    });
  const [isThereNewRegistration,setIsThereNewRegistration] = useState(false);
  const [isRegistrationErrorAlertVisible,setIsRegistrationErrorAlertVisible] = useState(false);
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
    { id: 0, appointment: " 8:00 am to 10:00 pm", att: "h0" },
    { id: 1, appointment: " 10:00 am to 12:00 pm", att: "h1" },
    { id: 2, appointment: " 12:00 pm to 2:00 pm", att: "h2" },
    { id: 3, appointment: " 2:00 pm to 4:00 pm", att: "h3" },
    { id: 4, appointment: " 4:00 pm to 6:00 pm", att: "h4" },
    { id: 5, appointment: " 6:00 pm to 8:00 pm", att: "h5" },
    { id: 6, appointment: " 8:00 pm to 10:00 pm", att: "h6" },
    { id: 7, appointment: " 10:00 pm to 12:00 am", att: "h7" },
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
    programError:""
  });
  let listOfCountries = [
    { id: 0, name: "Egypt" },
    { id: 1, name: "Kuwait" },
    { id: 2, name: "Lebanon" },
    { id: 3, name: "Libya" },
    { id: 4, name: "Oman" },
    { id: 5, name: "Qatar" },
    { id: 6, name: "Saudi Arabia" },
    { id: 7, name: "Syria" },
    { id: 8, name: "United Arab Emirates" },
  ];
  let programs = [
    { id: "p0", programName: "Recitation" },
    { id: "p1", programName: "Noor Bayan" },
    { id: "p2", programName: "Memorizing" },
  ];
  const handleFormSteps = (event) => {
    event.preventDefault();
    event.target.id === "firstStep"
      ? setStudentRegistrationFormSteps({
          firstStep: true,
          secondStep: false,
          thirdStep: false,
          fourStep: false,
          fiveStep: false,
        })
      : event.target.id === "secondStep"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: true,
          thirdStep: false,
          fourStep: false,
          fiveStep: false,
        })
      : event.target.id === "thirdStep"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: true,
          fourStep: false,
          fiveStep: false,
        })
      : event.target.id === "firstStepPrevious"
      ? setStudentRegistrationFormSteps({
          firstStep: true,
          secondStep: false,
          thirdStep: false,
          fourStep: false,
          fiveStep: false,
        })
      : event.target.id === "secondStepPrevious"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: true,
          thirdStep: false,
          fourStep: false,
          fiveStep: false,
        })
      : event.target.id === "thirdStepPrevious"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: true,
          fourStep: false,
          fiveStep: false,
        })
      : event.target.id === "fourStepPrevious"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: false,
          fourStep: true,
          fiveStep: false,
        })
      : event.target.id === "fourStep"
      ? setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: false,
          fourStep: true,
          fiveStep: false,
        })
      : setStudentRegistrationFormSteps({
          firstStep: false,
          secondStep: false,
          thirdStep: false,
          fourStep: false,
          fiveStep: true,
        });
  };
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
        [`d${event.target.value}`]:""
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
        [`h${event.target.value}`]:""
      })
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
  console.log(userData.age)
  const errorHandle = (filed, value) => {
    if (filed === "email") {
      const emailRegx = /^[A-Z a-z]+[0-9]*@[A-Z a-z]+.com$/;
      setErrors({
        ...errors,
        emailError:
          value.length === 0
            ? "Email Is Required"
            : emailRegx.test(value)
            ? null
            : "Email Must Contain @ and end with .com",
      });
    } else if (filed === "mobile") {
      const mobileRegx = /^[+][0-9]+(01)(0|1|2|5)[0-9]{8}$/;
      setErrors({
        ...errors,
        mobileError:
          value.length === 0
            ? "Mobile Is Required"
            : mobileRegx.test(value)
            ? null
            : "Mobile Must Start With Country Code with 01 and consists of 11 digit",
      });
    } else if (filed === "whatsapp_number") {
      const whatsapp_numberRegx = /^[+][0-9]+(01)(0|1|2|5)[0-9]{8}$/;
      setErrors({
        ...errors,
        whatsapp_numberError:
          value.length === 0
            ? " Whats App Number  Is Required"
            : whatsapp_numberRegx.test(value)
            ? null
            : "Whats App Number Must Start With Country Code with 01 and consists of 11 digit",
      });
    } else if (filed === "name") {
      const nameRegx = /[a-z A-Z]{3,}\s{1}[a-z A-Z]{3,}$/;
      setErrors({
        ...errors,
        nameError:
          value.length === 0
            ? "Fullname Is Required"
            : nameRegx.test(value)
            ? null
            : "Fullname  must contain a white space and min length of 3 characters",
      });
    } else if (filed === "age") {
      setErrors({
        ...errors,
        ageError: value.length === 0 ? "Age Is Required" : "",
      });
    } else if (filed === "gender") {
      setErrors({
        ...errors,
        genderError: value.length === 0 ? "Gender Is Required" : "",
      });
    } else if (filed === "programs") {
      setErrors({
        ...errors,
        programsError: value.length === 0 ? "Programs Is Required" : "",
      });
    } else if (filed === "password") {
      const passwordRegx = /([0-9]|[a-zA-Z])+([0-9]|[a-zA-Z]){7}/;
      setErrors({
        ...errors,
        passwordError:
          value.length === 0
            ? "password Is Required"
            : passwordRegx.test(value)
            ? null
            : "password must be  characters or digits and  length of 8",
      });
    } else if (filed === "state") {
      setErrors({
        ...errors,
        stateError: value.length === 0 ? "State Is Required" : "",
      });
    } else if (filed === "sessions_in_week") {
      setErrors({
        ...errors,
        sessions_in_weekError:
          value.length === 0 ? "Number Of Sessions Is Required" : "",
      });
    } else if (filed === "certificate") {
      setErrors({
        ...errors,
        certificateError: value.length === 0 ? "certificate Is Required" : "",
      });
    } else if (filed === "started_from_surah") {
      setErrors({
        ...errors,
        started_from_surahError:
          value.length === 0 ? "Surah preferred to start from Is Required" : "",
      });
    } else if (filed === "reached_surah") {
      setErrors({
        ...errors,
        reached_surahError:
          value.length === 0
            ? "Qur'an Surah Or Juiz Reached Before Is Required"
            : "",
      });
    } else if (filed === "program") {
      setErrors({
        ...errors,
        programError:
          value.length === 0
            ? "Student Program  Is Required"
            : "",
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let wD = [];
        for (let i = 0; i < Object.values(workingDays).length; i++) {
            
            if (Object.values(workingDays)[i] === "") {
                let emptyWorkingDayInitialValue = (Object.values(workingDays)[i]) = -1;
                wD.push(emptyWorkingDayInitialValue);
            }else{
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
          age:Number.parseInt(userData.age),
          state: userData.state,
          program_prefs:{
            type:userData.program,
            sessions_in_week:Number.parseInt(userData.sessions_in_week),
            pref_days:wD,
            pref_times_of_day:wHours
          },
          password:userData.password,
          mobile:userData.mobile,
          certificate:userData.certificate,
          started_from_surah:userData.started_from_surah,
          reached_surah:userData.reached_surah,
          whatsapp_number:userData.whatsapp_number,
        }
        setIsThereNewRegistration(true);
        
        axios.post(`http://localhost:5000/api/students`,finalStudentRegistrationDataObji).then((res)=>{
          res.status === 200?navigate('/login'):setIsRegistrationErrorAlertVisible(true);
          console.log(res);
          setIsThereNewRegistration(false);
        }).catch((error)=>{
          setIsRegistrationErrorAlertVisible(true);
          setTimeout(()=>{
            setIsRegistrationErrorAlertVisible(false);
          },1000)
          setIsThereNewRegistration(false);
          console.log(error);
        })
        
        
  };





  return (
    <>
      <div
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
              userData.program === ""||
              errors.programError||
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
              userData.program === ""||
              errors.programError||
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
              workingDays.d6 !== "") && (
              userData.reached_surah !== "" ||
              errors.reached_surahError)
                ? StudentRegistrationFormStyles["coloredCircle"]
                :""  
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
              workingDays.d6 !== "") && (
              userData.reached_surah !== "" ||
              errors.reached_surahError) 
                ? StudentRegistrationFormStyles["coloredLine"]
                :"" 
            }`}
          ></span>
          <span
            className={`${StudentRegistrationFormStyles["circle"]} 
                      ${
                        (WorkingHours.h0 !== "" ||
                        WorkingHours.h1 !== "" ||
                        WorkingHours.h2 !== "" ||
                        WorkingHours.h3 !== "" ||
                        WorkingHours.h4 !== "" ||
                        WorkingHours.h5 !== "" ||
                        WorkingHours.h6 !== "" ||
                        WorkingHours.h7 !== "") 
                          ? StudentRegistrationFormStyles["coloredCircle"]
                          : ""
                      }`}
          >
            5
          </span>
        </div>
        <div className={StudentRegistrationFormStyles["form-main-container"]}>
          <div
            className={
              StudentRegistrationFormStyles["registration-form-img-container"]
            }
          >
            <LazyLoadImage src={ReadQuranImg} alt="some pepole read quran" />
          </div>
          <form
            className={StudentRegistrationFormStyles["student-form"]}
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
              SignUp as{" "}
              <span>
                <mark
                  style={{
                    display: "bloxk",
                    backgroundColor: "#c2a054",
                    color: "#FFFFFF",
                  }}
                >
                  Ratel May Student
                </mark>
              </span>
            </div>
            {studentRegistrationFormSteps.firstStep ? (
              <div>
                <div>
                  <Form.Label htmlFor={"name"}>Name</Form.Label>
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
                    <Form.Label htmlFor={"email"}>Email</Form.Label>
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
                  <Form.Label htmlFor={"age"}>Age</Form.Label>
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
                  <Form.Label htmlFor={"password"}>Password</Form.Label>
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
                    Next{" "}
                    <TbPlayerTrackNext style={{ margin: "-2px 0 0 3px" }} />
                  </button>
                </div>
              </div>
            ) : studentRegistrationFormSteps.secondStep ? (
              <div>
                <div>
                  <Form.Label htmlFor="mobile">Mobile</Form.Label>
                  <Form.Control
                    type="text"
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
                  <Form.Label htmlFor="whatsapp_number">Whats app</Form.Label>
                  <Form.Control
                    type="text"
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
                    <ImPrevious2 style={{ marginTop: "-3px" }} />
                    prevoius
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
                    Next{" "}
                    <TbPlayerTrackNext style={{ margin: "-2px 0 0 3px" }} />
                  </button>
                </div>
              </div>
            ) : studentRegistrationFormSteps.thirdStep ? (
              <div>
           <div>
            <Form.Label htmlFor={"program"}>Programs</Form.Label>
            <Form.Select id="program" name="program" value={userData.program} onChange={handleChange} className={errors.programError? StudentRegistrationFormStyles['errors']:''}>
              <option value="">Select</option>
              {programs.map((pr)=>(
                <option key={pr.id} value={pr.programName}>{pr.programName}</option>
              ))}
              </Form.Select>
              <small className="text-danger">{errors.programError}</small>
           </div>
                <div>
                  <Form.Label htmlFor="sessions_in_week">
                    Number Of Sessions Per Week
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
                    <option value="">Select</option>
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
                  <Form.Label htmlFor="certificate">certificate</Form.Label>
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
                    Surah preferred to start from{" "}
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
                    <ImPrevious2 style={{ marginTop: "-3px" }} />
                    prevoius
                  </button>
                  <button
                    type="submit"
                    id="fourStep"
                    onClick={handleFormSteps}
                    disabled={
                      userData.program === ""||
                      errors.programError||
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
                        userData.program === ""||
                        errors.programError||
                        userData.certificate === "" ||
                        userData.sessions_in_week === "" ||
                        userData.started_from_surah === "" ||
                        errors.sessions_in_weekError ||
                        errors.certificateError ||
                        errors.started_from_surahError
                        ?StudentRegistrationFormStyles["disabled-btn"]
                        :StudentRegistrationFormStyles["btn"]
                    }`}
                  >
                    Next{" "}
                    <TbPlayerTrackNext style={{ margin: "-2px 0 0 3px" }} />
                  </button>
                </div>
              </div>
            ) : studentRegistrationFormSteps.fourStep ? (
              <div>
                <div>
                  <Form.Label htmlFor="reached_surah">
                    Qur'an Surah Or Juiz Reached Before
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
                >
                  <div>
                    <Form.Label htmlFor="d0">{t("Saturday")}</Form.Label>
                    <Form.Check
                      name="d0"
                      id="d0"
                      value={0}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d0"]}
                    />
                  </div>
                  <div>
                    <Form.Label htmlFor="d1">{t("Sunday")}</Form.Label>
                    <Form.Check
                      name="d1"
                      id="d1"
                      value={1}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d1"]}
                    />
                  </div>
                  <div>
                    <Form.Label htmlFor="d2">{t("Monday")}</Form.Label>
                    <Form.Check
                      name="d2"
                      id="d2"
                      value={2}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d2"]}
                    />
                  </div>
                  <div>
                    <Form.Label htmlFor="d3">{t("Tuesday")}</Form.Label>
                    <Form.Check
                      name="d3"
                      id="d3"
                      value={3}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d3"]}
                    />
                  </div>
                  <div>
                    <Form.Label htmlFor="d4">{t("Wednesday")}</Form.Label>
                    <Form.Check
                      name="d4"
                      id="d4"
                      value={4}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d4"]}
                    />
                  </div>
                  <div>
                    <Form.Label htmlFor="d5">{t("Thursday")}</Form.Label>
                    <Form.Check
                      name="d5"
                      id="d5"
                      value={5}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d5"]}
                    />
                  </div>
                  <div>
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
                <div
                  className={
                    StudentRegistrationFormStyles["step-button-container"]
                  }
                >
                  <button
                    type="submit"
                    id="thirdStepPrevious"
                    onClick={handleFormSteps}
                    className={StudentRegistrationFormStyles["btn"]}
                  >
                    {" "}
                    <ImPrevious2 style={{ marginTop: "-3px" }} />
                    prevoius
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
                      workingDays.d6 !== "") && (
                      userData.reached_surah !== "" ||
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
                        workingDays.d6 !== "") && (
                        userData.reached_surah !== "" ||
                        errors.reached_surahError)
                        ? StudentRegistrationFormStyles["btn"]
                        : StudentRegistrationFormStyles["disabled-btn"]
                    }`}
                  >
                    Next{" "}
                    <TbPlayerTrackNext style={{ margin: "-2px 0 0 3px" }} />
                  </button>
                </div>
              </div>
            ) : (
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
                    <ImPrevious2 style={{ marginTop: "-3px" }} />
                    prevoius
                  </button>
                  <button
                    type="submit"
                    disabled={
                      (WorkingHours.h0 !== "" ||
                      WorkingHours.h1 !== "" ||
                      WorkingHours.h2 !== "" ||
                      WorkingHours.h3 !== "" ||
                      WorkingHours.h4 !== "" ||
                      WorkingHours.h5 !== "" ||
                      WorkingHours.h6 !== "" ||
                      WorkingHours.h7 !== "") 
                        ? false
                        : true
                    }
                    className={`${
                      (WorkingHours.h0 !== "" ||
                      WorkingHours.h1 !== "" ||
                      WorkingHours.h2 !== "" ||
                      WorkingHours.h3 !== "" ||
                      WorkingHours.h4 !== "" ||
                      WorkingHours.h5 !== "" ||
                      WorkingHours.h6 !== "" ||
                      WorkingHours.h7 !== "") 
          
                      
                  ? StudentRegistrationFormStyles["btn"]
                        : StudentRegistrationFormStyles["disabled-btn"]
                    }`}
                   
                  >
                  
                  {isThereNewRegistration?<>
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    </>:<>{"Register"}<ImUserPlus style={{marginLeft:"3px"}}/></>
                    }
                    
                    
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        {isRegistrationErrorAlertVisible?<div className={StudentRegistrationFormStyles['registration-error-alert']}>
       <MdError size={45} color="#FFFFFF"/>
          <span>Something Went Wrong Please Try Again!</span>
        </div>:null}
     
      </div>
    </>
  );
};
export default StudentRegistrationForm;
