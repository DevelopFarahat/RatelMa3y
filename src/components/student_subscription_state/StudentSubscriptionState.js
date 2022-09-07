import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import StudentSubscriptionStyles from "./StudentSubscriptionState.module.css";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import Form from "react-bootstrap/Form";
import { AiFillSetting } from "react-icons/ai";
import CircleGif from "../../assets/images/check-circle.gif";
import NoResultFiltaration from "../../assets/images/no-result.png";
import { FaCalendarTimes } from "react-icons/fa";
import updateImageIcon from "../../assets/images/update.png";
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from "react-i18next";
const StudentSubscriptionState = ({
  fetchSpecificStudentDataAgain,
  setFetchSpecificStudentDataAgain,
  setSpecificStudentJoiningRequestData,
  setIsStudentRequestDataVisible,
  initialSpecificStudentJoiningRequestData,
  setIsStudentRatelDataVisible,
}) => {
  const pindingSubscriptionStateArr = [
    { subscription_id: 1, subscription_name: "Active" },
    { subscription_id: 2, subscription_name: "OnHold" },
    { subscription_id: 3, subscription_name: "Cancelled" },
  ];
  const activeSubscriptionStatusArr = [
    { subscription_id: 3, subscription_name: "OnHold" },
    { subscription_id: 4, subscription_name: "Cancelled" },
  ];
  const onHoldSubscriptionStatusArr = [
    { subscription_id: 5, subscription_name: "Active" },
    { subscription_id: 6, subscription_name: "Cancelled" },
  ];
  const [filterValue, setFilterValue] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [recommendedInstructorsData, setRecommendedInstructorsData] = useState(
    []
  );
  const [isUserMakingUpdateOnStudentAccount,setIsUserMakingUpdateOnStudentAccount] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const initialResponse = useRef();
  const [fetchAgain, setFetchAgain] = useState(0);
  const [studentStatus, setStudentStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [changableSubscriptionState, setChangableSubscriptionState] = useState(
    {}
  );
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [typeOfProcess, setTypeOfProcess] = useState("");
  const [t, i18n] = useTranslation();
  const [workingDays, setWorkingDays] = useState({
    d0: "",
    d1: "",
    d2: "",
    d3: "",
    d4: "",
    d5: "",
    d6: "",
  });
  const [disabledDays, setDisabledDays] = useState({
    d0: false,
    d1: false,
    d2: false,
    d3: false,
    d4: false,
    d5: false,
    d6: false,
  });
  const [disabledHours, setDisabledHours] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h6: false,
  });
  const day0 = useRef(null);
  const day1 = useRef(null);
  const day2 = useRef(null);
  const day3 = useRef(null);
  const day4 = useRef(null);
  const day5 = useRef(null);
  const day6 = useRef(null);
  const [checkedDays, setCheckedDays] = useState({
    d0: false,
    d1: false,
    d2: false,
    d3: false,
    d4: false,
    d5: false,
    d6: false,
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
      /*
          let workingDaysCloneObji = workingDays;
    
          let arr = Object.values(workingDaysCloneObji);
          arr[event.target.value] = -1;
          */
      //arr.splice(event.target.value, 1);
      setWorkingDays({
        ...workingDays,
        [`d${event.target.value}`]: "",
      });
    }
  };
  const [studentConfiguration, setStudentConfiguration] = useState({
    studentStatus: "",
    studentInstructor: "",
    started_in:''
  });
  const [errors, setErrors] = useState({
    statusError: "",
    instructorError: "",
    started_inError:""
  });

  const handleFiltaration = (event) => {
    setFilterValue(event.target.value);
  };

  const filterStudents = () => {
    let filtarationArr = [];
    for (let i = 0; i < studentData.length; i++) {
      if (
        studentData[i].name.toLowerCase().includes(filterValue.toLowerCase())
      ) {
        filtarationArr.push(studentData[i]);
      } else if (
        studentData[i].subscription_state
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      ) {
        filtarationArr.push(studentData[i]);
      }
    }
    filterValue !== ""
      ? setStudentData(filtarationArr)
      : setStudentData(initialResponse.current);
  };
  const resetTableFiltaration = () => {
    setFilterValue("");
    setStudentData(initialResponse.current);
  };
  const handlerRowClicked = useCallback((event) => {
    const id = event.currentTarget.id;
    setSelectedRow(id);
    setFetchSpecificStudentDataAgain((current) => current + 1);
  }, []);
  const toogleStudentStatus = (stdObject, event, index, process) => {
    event.stopPropagation();
    setChangableSubscriptionState(stdObject);
    setTypeOfProcess(process);
    getRecommendedInstructorsForEachStudent(stdObject);
    if (process === "date and time") {
      if (stdObject.instructor === undefined) {
        setStudentStatus(false);
      } else {
        setStudentStatus(true);
        getStudentSessionsDaysAndTime(stdObject);
      }
    } else {
      setStudentStatus((current) => !current);
    }
  };
  const getStudentSessionsDaysAndTime = (stdObji) => {
    let sessionsHoursInitialObji = {};
    let sessionsHoursCheckedInitialObji = {};
    let sessionsDaysInitialObji = {};
    let sessionsDaysCheckedInitialObji = {};
    for (let i = 0; i < stdObji.program_prefs.pref_days.length; i++) {
      if (stdObji.program_prefs.pref_days[i] !== -1) {
        sessionsDaysInitialObji[`d${i}`] = stdObji.program_prefs.pref_days[i];
        sessionsDaysCheckedInitialObji[`d${i}`] = true;
      } else {
        sessionsDaysInitialObji[`d${i}`] = stdObji.program_prefs.pref_days[i];
        sessionsDaysCheckedInitialObji[`d${i}`] = false;
      }
    }
    for (let i = 0; i < stdObji.program_prefs.pref_times_of_day.length; i++) {
      if (stdObji.program_prefs.pref_times_of_day[i][1] !== 0) {
        sessionsHoursInitialObji[`h${i}`] = [
          stdObji.program_prefs.pref_times_of_day[i][0],
          stdObji.program_prefs.pref_times_of_day[i][1],
        ];
        sessionsHoursCheckedInitialObji[`h${i}`] = true;
      } else {
        sessionsHoursInitialObji[`h${i}`] = [
          stdObji.program_prefs.pref_times_of_day[i][0],
          stdObji.program_prefs.pref_times_of_day[i][1],
        ];
        sessionsHoursCheckedInitialObji[`h${i}`] = false;
      }
    }
    setWorkingDays(sessionsDaysInitialObji);
    setCheckedDays(sessionsDaysCheckedInitialObji);
    setWorkingHours(sessionsHoursInitialObji);
    setCheckedHours(sessionsHoursCheckedInitialObji);
    gitInstructorOfSpecificStudentWorkingDaysAndHours(stdObji);
  };

  const gitInstructorOfSpecificStudentWorkingDaysAndHours = (stObj) => {
    console.log(stObj.instructor);
    let disabledDaysInitialObject = {};
    let disabledHoursInitialObject = {};
    axios
      .get(`http://localhost:5000/api/instructors/${stObj.instructor}`)
      .then((res) => {
        console.log(res.data.prefs.working_days);
        for (let i = 0; i < res.data.prefs.working_days.length; i++) {
          if (res.data.prefs.working_days[i] === -1) {
            disabledDaysInitialObject[`d${i}`] = true;
          }
        }
        setDisabledDays(disabledDaysInitialObject);
        for(let i = 0 ; i < res.data.prefs.working_hours.length;i++ ){
            if(res.data.prefs.working_hours[i][1] === 0){
                disabledHoursInitialObject[`h${i}`] = true;
                    }      
            }
            setDisabledHours(disabledHoursInitialObject);
            
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const closeDime = () => {
    setStudentStatus((current) => !current);
    setStudentConfiguration({
      studentStatus: "",
      studentInstructor: "",
      started_in:""
    });
  };
  const setConfiguration = (event) => {
    setStudentConfiguration({
      ...studentConfiguration,
      [event.target.id]: event.target.value,
    });
    handleErrors(event.target.id, event.target.value);
  };
  const handleErrors = (field, value) => {
    if (field === "studentStatus") {
      setErrors({
        ...errors,
        statusError: value === "" ? "Status Is Required" : null,
      });
    } else if (field === "studentInstructor") {
      setErrors({
        ...errors,
        instructorError: value === "" ? "Instructor Name Is Required" : null,
      });
    }
    else if (field === "started_in") {
        setErrors({
          ...errors,
          started_inError: value === "" ? "Started In Is Required" : null,
        });
      }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setStudentStatus((current) => !current);
    setStudentConfiguration({
      studentStatus: "",
      studentInstructor: "",
      started_in:""
    });
    //setStudentStatus(false);
    changeSubscriptionState();
  };
  const getStudentRatelMa3yJoiningRequestData = (stdObji, event) => {
    console.log("inshaa allah")
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
    };

    axios
      .get(`http://localhost:5000/api/students/${stdObji._id}`)
      .then((res) => {
        initialSpecificStudentJoiningRequestData.current = res.data;
        setSpecificStudentJoiningRequestData(res.data);

        //console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      }, headers);
    handlerRowClicked(event);
  };
  const distroyAlert = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible((current) => !current);
    }, 1000);
  };
  useEffect(() => {
    axios.get("http://localhost:5000/api/students").then(
      (res) => {
        initialResponse.current = res.data.data;
        setStudentData(res.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
    axios
      .get(`http://localhost:5000/api/instructors?limit=10000000000`)
      .then((instructorRes) => {
        setInstructorData(instructorRes.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchAgain]);

  const changeSubscriptionState = (event) => {
    console.log(changableSubscriptionState.instructor)
    if (studentConfiguration.studentStatus !== "Cancelled" &&changableSubscriptionState.instructor === undefined) {
  
      axios
        .put(
          `http://localhost:5000/api/students/${changableSubscriptionState._id}`,
          {
            "subscription_state": studentConfiguration.studentStatus,
            "instructor": studentConfiguration.studentInstructor,
            "started_in":studentConfiguration.started_in
          }
        )
        .then((res) => {
          setFetchAgain(fetchAgain + 1);
          distroyAlert();
          getStudentRatelMa3yJoiningRequestData(changableSubscriptionState,event);
        })
        .catch((error) => {
            
          console.log(error);
        });
      
    } else if(studentConfiguration.studentStatus !== "Cancelled"  && changableSubscriptionState.instructor !== undefined) {
      axios
        .put(
          `http://localhost:5000/api/students/${changableSubscriptionState._id}`,
          {
            subscription_state:studentConfiguration.studentStatus !== ''?studentConfiguration.studentStatus:changableSubscriptionState.subscription_state,
            instructor:studentConfiguration.studentInstructor !== ''?studentConfiguration.studentInstructor:changableSubscriptionState.instructor
          }
        )
        .then((res) => {
            distroyAlert();
          setFetchAgain(fetchAgain + 1);
          getStudentRatelMa3yJoiningRequestData(changableSubscriptionState,event);
        })
        .catch((error) => {
          console.log(error);
        });
    }else{
        axios
        .put(
          `http://localhost:5000/api/students/${changableSubscriptionState._id}`,
          {
            subscription_state: studentConfiguration.studentStatus,
            instructor:null
            
          }
        )
        .then((res) => {
            distroyAlert();
          setFetchAgain(fetchAgain + 1);
          getStudentRatelMa3yJoiningRequestData(changableSubscriptionState,event);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getRecommendedInstructorsForEachStudent = (studentObject) => {
    let matchedDays = [];
    let matchedHours = [];
    let isThereAnyMatchedPrograms = false;
    let recommendedInstructors = [];
    for (let i = 0; i < instructorData.length; i++) {
        //days
      for (let j = 0; j < instructorData[i].prefs.working_days.length; j++) {
        if(studentObject.program_prefs.pref_days[j] !== -1){
          if (instructorData[i].prefs.working_days[j] === studentObject.program_prefs.pref_days[j]) {
            matchedDays.push(true);
          } else {
            matchedDays.push(false);
          }
        }
      }
      //hours
     for(let x = 0 ; x < instructorData[i].prefs.working_hours.length;x++){
        if(studentObject.program_prefs.pref_times_of_day[x][1] !== 0){
         if(studentObject.program_prefs.pref_times_of_day[x][1] === instructorData[i].prefs.working_hours[x][1]){
            matchedHours.push(true)
         }else{
            matchedHours.push(false);
         }

        }
     }
        for(let u = 0 ; u < instructorData[i].programs.length;u++){
            if(instructorData[i].programs[u] === studentObject.program_prefs.type){
                isThereAnyMatchedPrograms = true;
            }
        }
      if (matchedDays.every((mD) => mD === true) === true && matchedHours.every((mH)=>mH === true) === true &&  isThereAnyMatchedPrograms === true ) {
        recommendedInstructors.push(instructorData[i]);
        isThereAnyMatchedPrograms = false;
        matchedDays = [];
        matchedHours = [];
      }else{
        isThereAnyMatchedPrograms = false;
        matchedDays = [];
        matchedHours = [];
      }
    }
    setRecommendedInstructorsData(recommendedInstructors);
  };
  const changeStudentSessionsDayHours = ()=>{
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
    let program = {
      "program_prefs":{
        "type":changableSubscriptionState.program_prefs.type,
        "sessions_in_week":changableSubscriptionState.program_prefs.sessions_in_week,
        "pref_days":wD,
        "pref_times_of_day":wHours,
        "plan":[]
      }
       
    }
    setIsUserMakingUpdateOnStudentAccount(true);
    axios.put(`http://localhost:5000/api/students/${changableSubscriptionState._id}`,program).then((res)=>{
    console.log(res.date)
       distroyAlert();
       setFetchAgain(fetchAgain+1);
       setIsUserMakingUpdateOnStudentAccount(false);
       closeDime();
    }).catch((error)=>{
        console.log(error);
    })
  }
  const sortStudentBySubscriptionState = (sortType)=>{
    let studentDataCopy = [...studentData];
    for(let i = 0 ; i < studentDataCopy.length;i++ ){
      if(sortType === "Pending"){
        if(studentDataCopy[i].subscription_state === "Pending")studentDataCopy[i].precedence = 3
        if(studentDataCopy[i].subscription_state === "Active")studentDataCopy[i].precedence = 2
        if(studentDataCopy[i].subscription_state === "OnHold")studentDataCopy[i].precedence = 1
        if(studentDataCopy[i].subscription_state === "Cancelled")studentDataCopy[i].precedence = 0
      }else if (sortType === "Active"){
        if(studentDataCopy[i].subscription_state === "Pending")studentDataCopy[i].precedence = 1
        if(studentDataCopy[i].subscription_state === "Active")studentDataCopy[i].precedence = 3
        if(studentDataCopy[i].subscription_state === "OnHold")studentDataCopy[i].precedence = 2
        if(studentDataCopy[i].subscription_state === "Cancelled")studentDataCopy[i].precedence = 0
      }else if (sortType ==="OnHold"){
        if(studentDataCopy[i].subscription_state === "Pending")studentDataCopy[i].precedence = 1
        if(studentDataCopy[i].subscription_state === "Active")studentDataCopy[i].precedence = 2
        if(studentDataCopy[i].subscription_state === "OnHold")studentDataCopy[i].precedence = 3
        if(studentDataCopy[i].subscription_state === "Cancelled")studentDataCopy[i].precedence = 0
      }else{
        if(studentDataCopy[i].subscription_state === "Pending")studentDataCopy[i].precedence = 2
       if( studentDataCopy[i].subscription_state === "Active")studentDataCopy[i].precedence = 1
        if(studentDataCopy[i].subscription_state === "OnHold")studentDataCopy[i].precedence = 0
        if(studentDataCopy[i].subscription_state === "Cancelled")studentDataCopy[i].precedence = 3
      }
    }
    switch(sortType){
      case "Pending":
        studentDataCopy.sort((a_sub_state,b_sub_state)=>{
          return b_sub_state.precedence - a_sub_state.precedence;
        });
        break;
        case "Active":
          studentDataCopy.sort((a_sub_state,b_sub_state)=>{
            return b_sub_state.precedence - a_sub_state.precedence;
          });
          break;
          case "OnHold":
            studentDataCopy.sort((a_sub_state,b_sub_state)=>{
              return b_sub_state.precedence - a_sub_state.precedence;
            });
            break;
            case "Cancelled":
              studentDataCopy.sort((a_sub_state,b_sub_state)=>{
                return b_sub_state.precedence - a_sub_state.precedence;
              });
              break;
              default:
    }
    setStudentData(studentDataCopy);
  }
  return (

    <>
      <div className={StudentSubscriptionStyles["student-user-data-container"]}>
        <div className={StudentSubscriptionStyles["table-settings-container"]}>
          <Form.Label
            htmlFor="userAccountFilterTxt"
            className={StudentSubscriptionStyles["filter-label"]}
          >
            Filter
          </Form.Label>
          <Form.Control
            id="userAccountFilterTxt"
            className={StudentSubscriptionStyles["filter-txt"]}
            value={filterValue}
            onChange={handleFiltaration}
          />
          <Form.Label htmlFor="sort_subscription_state">Sort</Form.Label>
          <Form.Select name="sort_subscription_state" id="sort_subscription_state" onChange={(event)=> sortStudentBySubscriptionState(event.target.value)}>
            <option value={""}>Select</option>
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="OnHold">OnHold</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
          <button
            type="button"
            className={StudentSubscriptionStyles["btn"]}
            style={{ marginTop: "auto" }}
            onClick={(event) => filterStudents(event.target.value)}
          >
            Filter <AiFillFilter />
          </button>
          <button
            type="button"
            className={StudentSubscriptionStyles["btn"]}
            style={{ marginTop: "auto" }}
            onClick={resetTableFiltaration}
          >
            Reset
            <BiReset />
          </button>
        </div>

        <div className={StudentSubscriptionStyles["table-wrapper"]}>
          {studentData.length === 0 ? (
            <img
              src={NoResultFiltaration}
              className={StudentSubscriptionStyles["no-result"]}
              alt="no-result"
            />
          ) : (
            <table
              className={StudentSubscriptionStyles["student-accounts-table"]}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subscription State</th>
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((stdData, index) => (
                  <tr
                    key={stdData._id}
                    id={stdData._id}
                    onClick={(event) =>
                      getStudentRatelMa3yJoiningRequestData(stdData, event)
                    }
                    style={{
                      background: selectedRow === stdData._id ? "#038674" : "",
                      color: selectedRow === stdData._id ? "#FFFFFF" : "",
                      boxShadow:
                        selectedRow === stdData._id
                          ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)`
                          : "",
                    }}
                  >
                    <td>{stdData.name}</td>
                    <td>{stdData.subscription_state}</td>
                    <td>
                      {stdData.subscription_state !== "Cancelled" ? (
                        <AiFillSetting
                          className={
                            StudentSubscriptionStyles["setting-icon-hidden"]
                          }
                          size={25}
                          onClick={(event) =>
                            toogleStudentStatus(
                              stdData,
                              event,
                              index,
                              "subscription state and instructor"
                            )
                          }
                        />
                      ) : null}
                      {stdData.subscription_state !== "Cancelled" ? (
                        <FaCalendarTimes
                          className={
                            StudentSubscriptionStyles["setting-icon-hidden"]
                          }
                          style={{
                            color: !stdData.instructor ? "#dadada" : "",
                            cursor: !stdData.instructor
                              ? "not-allowed"
                              : "pointer",
                          }}
                          size={21}
                          onClick={(event) =>
                            toogleStudentStatus(
                              stdData,
                              event,
                              index,
                              "date and time"
                            )
                          }
                        />
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {studentStatus ? (
          <div className={StudentSubscriptionStyles["dime-table"]}>
            <VscChromeClose
              size={30}
              onClick={closeDime}
              className={StudentSubscriptionStyles["close-dime"]}
              style={{
                margin:
                  typeOfProcess === "date and time"
                    ? "7px 0px 8px 3px"
                    : "17px 0 0 17px",
              }}
            />
            {typeOfProcess === "subscription state and instructor" ? (
              <div
                className={
                  StudentSubscriptionStyles[
                    "setting-student-status_instructor-container"
                  ]
                }
              >
                <form onSubmit={handleSubmit} method="post">
                  <div>
                    <Form.Label htmlFor="studentStatus">Status</Form.Label>
                    <Form.Select
                      id="studentStatus"
                      name="student_status"
                      className={`${
                        errors.statusError
                          ? StudentSubscriptionStyles["errors"]
                          : ""
                      }`}
                      onChange={setConfiguration}
                    >
                      <option value="">Select</option>
                      {changableSubscriptionState.subscription_state ===
                      "Pending"
                        ? pindingSubscriptionStateArr.map(
                            (subscriptionState) => (
                              <option
                                key={subscriptionState.subscription_id}
                                value={subscriptionState.subscription_name}
                              >
                                {subscriptionState.subscription_name}
                              </option>
                            )
                          )
                        : changableSubscriptionState.subscription_state ===
                          "Active"
                        ? activeSubscriptionStatusArr.map(
                            (subscriptionState) => (
                              <option
                                key={subscriptionState.subscription_id}
                                value={subscriptionState.subscription_name}
                              >
                                {subscriptionState.subscription_name}
                              </option>
                            )
                          )
                        : onHoldSubscriptionStatusArr.map(
                            (subscriptionState) => (
                              <option
                                key={subscriptionState.subscription_id}
                                value={subscriptionState.subscription_name}
                              >
                                {subscriptionState.subscription_name}
                              </option>
                            )
                          )}
                    </Form.Select>
                    <small className="text-danger">{errors.statusError}</small>
                  </div>

                  {changableSubscriptionState.instructor !== null &&
                  changableSubscriptionState.instructor !== undefined && studentConfiguration.studentStatus  !== "Cancelled" ? (
                    <>
                      <div>
                        <Form.Label htmlFor="studentInstructor">
                          Instructor
                        </Form.Label>
                        <Form.Select
                          name="student_instructor"
                          id="studentInstructor"
                          className={`${
                            errors.instructorError
                              ? StudentSubscriptionStyles["errors"]
                              : ""
                          }`}
                          onChange={setConfiguration}
                        >
                          <option value="">Select</option>
                          
                          {recommendedInstructorsData.length === 0?<option value="" style={{textAlign:'center'}} disabled>There Is No Recommendation </option>:null}
                          {recommendedInstructorsData.map((instructor) => (
                            <option key={instructor._id} value={instructor._id} style={{background:changableSubscriptionState.instructor !== undefined && changableSubscriptionState.instructor === instructor._id?'#038674':'',color:changableSubscriptionState.instructor !== undefined && changableSubscriptionState.instructor === instructor._id?'#FFFFFF':'#000000'}}>
                              {instructor.name}
                            </option>
                          ))}
                        </Form.Select>
                        <small className="text-danger">
                          {errors.instructorError}
                        </small>
                      </div>
                    </>
                  ) : studentConfiguration.studentStatus !== "" &&
                    studentConfiguration.studentStatus !== "Cancelled" ? (
                    <>
                      <div>
                        <Form.Label htmlFor="studentInstructor">
                          Instructor
                        </Form.Label>
                        <Form.Select
                          name="student_instructor"
                          id="studentInstructor"
                          className={`${
                            errors.instructorError
                              ? StudentSubscriptionStyles["errors"]
                              : ""
                          }`}
                          onChange={setConfiguration}
                        >
                          <option value="">Select</option>
                          {recommendedInstructorsData.length === 0?<option style={{textAlign:'center'}} disabled>There Is No Recommendation </option>:null}
                          {recommendedInstructorsData.map((instructor) => (
                            <option key={instructor._id} value={instructor._id}>
                              {instructor.name}
                            </option>
                          ))}
                        </Form.Select>
                        <small className="text-danger">
                          {errors.instructorError}
                        </small>
                        <div>
                          <Form.Label htmlFor="started_in">Start At</Form.Label>
                          <Form.Control
                            type="date"
                            id="started_in"
                            name="started_in"
                            value={studentConfiguration.started_in}
                            className={`${
                                errors.started_inError
                                  ? StudentSubscriptionStyles["errors"]
                                  : ""
                              }`}
                            onChange={setConfiguration}
                          />
                        </div>
                      </div>{" "}
                    </>
                  ) : null}
                  {studentConfiguration.studentStatus !== "" 
                  && studentConfiguration.studentStatus === "Cancelled" ? (
                    <button
                      type="submit"
                      className={`${
                        studentConfiguration.studentStatus === "" ||
                        errors.statusError 
                          ? StudentSubscriptionStyles["disabled-btn"]
                          : StudentSubscriptionStyles["btn"]
                      }`}
                      disabled={
                        studentConfiguration.studentStatus === "" ||
                        errors.statusError 
                          ? true
                          : false
                      }
                    >
                      Save
                      <FaSave style={{ margin: "0px 0 1px 3px" }} size={15} />
                    </button>
                  ) : changableSubscriptionState.instructor !== null &&
                    changableSubscriptionState.instructor !== undefined ? (
                    <button
                      type="submit"
                      className={`${
                         StudentSubscriptionStyles["btn"]
                      }`}
                    >
                      Save
                      <FaSave style={{ margin: "0px 0 1px 3px" }} size={15} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`${
                        studentConfiguration.studentStatus === "" ||
                        studentConfiguration.studentInstructor === "" ||
                        studentConfiguration.started_in === "" ||
                        errors.instructorError ||
                        errors.started_inError ||
                        errors.statusError 
                          ? StudentSubscriptionStyles["disabled-btn"]
                          : StudentSubscriptionStyles["btn"]
                      }`}
                      disabled={
                        studentConfiguration.studentStatus === "" ||
                        studentConfiguration.studentInstructor === "" ||
                        studentConfiguration.started_in === "" ||
                        errors.statusError ||
                        errors.instructorError ||
                        errors.started_inError 
                          ? true
                          : false
                      }
                    >
                      Save
                      <FaSave style={{ margin: "0px 0 1px 3px" }} size={15} />
                    </button>
                  )}
                </form>
              </div>
            ) : changableSubscriptionState.instructor !== undefined ? (
              <div
                className={
                  StudentSubscriptionStyles["student-sessions-days-hours"]
                }
              >
                {/* change date and time of the sessions operations */}
                <form method="post">
                  <span>Session Days</span>
                  <div
                    className={`${StudentSubscriptionStyles["days-check-box-container"]}`}
                  >
                    <div>
                      <Form.Label htmlFor="d0" style={{color:disabledDays.d0?'#dadada':'#000000'}}>{t("Saturday")}</Form.Label>
                      <Form.Check
                        name="d0"
                        id="d0"
                        value={0}
                        disabled={disabledDays.d0}
                        style={{cursor:disabledDays.d0?'not-allowed':'pointer'}}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d0"]}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d1" style={{color:disabledDays.d1?'#dadada':'#000000'}}>{t("Sunday")}</Form.Label>
                      <Form.Check
                        name="d1"
                        id="d1"
                        disabled={disabledDays.d1}
                        value={1}
                        style={{cursor:disabledDays.d1?'not-allowed':'pointer'}}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d1"]}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d2" style={{color:disabledDays.d2?'#dadada':'#000000'}}>{t("Monday")}</Form.Label>
                      <Form.Check
                        name="d2"
                        id="d2"
                        style={{cursor:disabledDays.d2?'not-allowed':'pointer'}}
                        disabled={disabledDays.d2}
                        value={2}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d2"]}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d3" style={{color:disabledDays.d3?'#dadada':'#000000'}}>{t("Tuesday")}</Form.Label>
                      <Form.Check
                        name="d3"
                        id="d3"
                        disabled={disabledDays.d3}
                        style={{cursor:disabledDays.d3?'not-allowed':'pointer'}}
                        value={3}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d3"]}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d4" style={{color:disabledDays.d4?'#dadada':'#000000'}}>{t("Wednesday")}</Form.Label>
                      <Form.Check
                        name="d4"
                        id="d4"
                        disabled={disabledDays.d4}
                        value={4}
                        style={{cursor:disabledDays.d4?'not-allowed':'pointer'}}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d4"]}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d5" style={{color:disabledDays.d5?'#dadada':'#000000'}}>{t("Thursday")}</Form.Label>
                      <Form.Check
                        name="d5"
                        id="d5"
                        disabled={disabledDays.d5}
                        value={5}
                        style={{cursor:disabledDays.d5?'not-allowed':'pointer'}}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d5"]}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d6" style={{color:disabledDays.d6?'#dadada':'#000000'}}>{t("Friday")}</Form.Label>
                      <Form.Check
                        name="d6"
                        id="d6"
                        disabled={disabledDays.d6}
                        style={{cursor:disabledDays.d6?'not-allowed':'pointer'}}
                        value={6}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d6"]}
                      />
                    </div>
                  </div>
                  <span>Session Hours</span>
                  <div
                    className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}
                  >
                    {Working_hours.map((wh, index) => (
                      <div key={wh.id}>
                        <Form.Label htmlFor={wh.att}  style={{color:disabledHours[`h${index}`]?'#dadada':'#000000'}}>
                          {wh.appointment}
                        </Form.Label>
                        <Form.Check
                          id={wh.att}
                          name={wh.att}
                          value={index}
                          disabled={disabledHours[`h${index}`]}
                          style={{cursor:disabledHours[`h${index}`]?'not-allowed':'pointer'}}
                          onChange={handleApoointmentInHours}
                          checked={checkedHours[`h${index}`]}
                        />
                      </div>
                    ))}
                  </div>
                  <button type="button" className={StudentSubscriptionStyles['btn']} onClick={changeStudentSessionsDayHours}>
                    {isUserMakingUpdateOnStudentAccount?<>
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    </>:<>{"Update"}<img src={updateImageIcon} style={{marginLeft:'10px' ,width:'16px',objectFit:'contain'}} alt="update"/></>}
                    
                    </button>
                </form>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {isAlertVisible ? (
        <div className={StudentSubscriptionStyles["alert"]}>
          <img src={CircleGif} alt="gif-alert-circle" />
          { changableSubscriptionState.instructor !== null && changableSubscriptionState.instructor !== undefined && changableSubscriptionState.subscription_state !== 'Cancelled' ? (
            <p style={{width:'80%'}}><span> {JSON.parse(localStorage.getItem('user')).privileges}</span> hase  Updated <span>{changableSubscriptionState.name} </span>Account</p>
          ) :changableSubscriptionState.instructor === null && changableSubscriptionState.instructor === undefined && changableSubscriptionState.subscription_state ===  "Pending"?(
            <p style={{width:'80%'}}><span> {JSON.parse(localStorage.getItem('user')).privileges}</span> hase  Changed <span>{changableSubscriptionState.name} </span> Subscription State and setting Started  Date and Instructor Successfully</p>
          ):changableSubscriptionState.subscription_state ===  "Pending"?(
            <p><span> {JSON.parse(localStorage.getItem('user')).privileges}</span> hase  Cancelled  <span>{changableSubscriptionState.name} </span> Account </p>
          ):null}
        </div>
      ) : null}
    </>
  );
};
export default StudentSubscriptionState;
