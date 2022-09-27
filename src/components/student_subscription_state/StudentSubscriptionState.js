import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import StudentSubscriptionStyles from "./StudentSubscriptionState.module.css";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import {FaTrash} from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { AiFillSetting } from "react-icons/ai";
import CircleGif from "../../assets/images/check-circle.gif";
import NoResultFiltaration from "../../assets/images/no-result.png";
import { FaCalendarTimes } from "react-icons/fa";
import updateImageIcon from "../../assets/images/update.png";
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from "react-i18next";
import { object } from "yup";
const StudentSubscriptionState = ({
  currentPage,
  setPageNoArrLength,
  setLastPage,
  setPageNoCopy,
  setPageNo,
  setStudentSessionsDetails,
  setSpecificStudentJoiningRequestData,
  initialStudentSessionsDetails,
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
  const [isUserDeleteAnyAccount,setIsUserDeleteAnyAccount] = useState(false);
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
  const [prefsDays,setPrefsDays] = useState({
    d0: false,
    d1: false,
    d2: false,
    d3: false,
    d4: false,
    d5: false,
    d6: false,
  })
  const [prefsHoursD0,setPrefsHoursD0] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [prefsHoursD1,setPrefsHoursD1] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  })
  const [prefsHoursD2,setPrefsHoursD2] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  })
  const [prefsHoursD3,setPrefsHoursD3] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  })
  const [prefsHoursD4,setPrefsHoursD4] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  })
  const [prefsHoursD5,setPrefsHoursD5] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  })
  const [prefsHoursD6,setPrefsHoursD6] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  })
  const [disabledDays, setDisabledDays] = useState({
    d0: false,
    d1: false,
    d2: false,
    d3: false,
    d4: false,
    d5: false,
    d6: false,
  });
  const [disabledDaysRadio, setDisabledDaysRadio] = useState({
    d0: false,
    d1: false,
    d2: false,
    d3: false,
    d4: false,
    d5: false,
    d6: false,
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
  const [checkedHoursD0, setCheckedHoursD0] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [WorkingHoursD0, setWorkingHoursD0] = useState({
    h0: "",
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    h7: "",
  });
  const [disabledHoursD0, setDisabledHoursD0] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7:false
  });
  const [checkedHoursD1, setCheckedHoursD1] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [WorkingHoursD1, setWorkingHoursD1] = useState({
    h0: "",
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    h7: "",
  });
  const [disabledHoursD1, setDisabledHoursD1] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7:false
  });
  const [checkedHoursD2, setCheckedHoursD2] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [WorkingHoursD2, setWorkingHoursD2] = useState({
    h0: "",
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    h7: "",
  });
  const [disabledHoursD2, setDisabledHoursD2] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7:false
  });
  const [checkedHoursD3, setCheckedHoursD3] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [WorkingHoursD3, setWorkingHoursD3] = useState({
    h0: "",
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    h7: "",
  });
  const [disabledHoursD3, setDisabledHoursD3] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7:false
  });
  const [checkedHoursD4, setCheckedHoursD4] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [WorkingHoursD4, setWorkingHoursD4] = useState({
    h0: "",
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    h7: "",
  });
  const [disabledHoursD4, setDisabledHoursD4] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7:false
  });
  const [checkedHoursD5, setCheckedHoursD5] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [WorkingHoursD5, setWorkingHoursD5] = useState({
    h0: "",
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    h7: "",
  });
  const [disabledHoursD5, setDisabledHoursD5] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7:false
  });
  const [checkedHoursD6, setCheckedHoursD6] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [WorkingHoursD6, setWorkingHoursD6] = useState({
    h0: "",
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    h7: "",
  });
  const [disabledHoursD6, setDisabledHoursD6] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7:false
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
  const handleApoointmentInHoursD0 = (event) => {
    setCheckedHoursD0({
      ...checkedHoursD0,
      [event.target.id]: !checkedHoursD0[event.target.id],
    });
    if (event.target.checked) {
      setWorkingHoursD0({
        ...WorkingHoursD0,
        [event.target.id]: workingHoursCheckedValuesArr[event.target.value],
      });
    } else {
      /*
          let workingHoursCloneObji = WorkingHours;
          let arr = Object.values(workingHoursCloneObji);
    
          arr[event.target.value] = [0, 0];
          setWorkingHours(arr);
          */
      setWorkingHoursD0({
        ...WorkingHoursD0,
        [`h${event.target.value}`]: "",
      });
    }
  };
  const handleApoointmentInHoursD1 = (event) => {
    setCheckedHoursD1({
      ...checkedHoursD1,
      [event.target.id]: !checkedHoursD1[event.target.id],
    });
    if (event.target.checked) {
      setWorkingHoursD1({
        ...WorkingHoursD1,
        [event.target.id]: workingHoursCheckedValuesArr[event.target.value],
      });
    } else {
      /*
          let workingHoursCloneObji = WorkingHours;
          let arr = Object.values(workingHoursCloneObji);
    
          arr[event.target.value] = [1, 1];
          setWorkingHours(arr);
          */
      setWorkingHoursD1({
        ...WorkingHoursD1,
        [`h${event.target.value}`]: "",
      });
    }
  };
  const handleApoointmentInHoursD2 = (event) => {
    setCheckedHoursD2({
      ...checkedHoursD2,
      [event.target.id]: !checkedHoursD2[event.target.id],
    });
    if (event.target.checked) {
      setWorkingHoursD2({
        ...WorkingHoursD2,
        [event.target.id]: workingHoursCheckedValuesArr[event.target.value],
      });
    } else {
      /*
          let workingHoursCloneObji = WorkingHours;
          let arr = Object.values(workingHoursCloneObji);
    
          arr[event.target.value] = [2, 2];
          setWorkingHours(arr);
          */
      setWorkingHoursD2({
        ...WorkingHoursD2,
        [`h${event.target.value}`]: "",
      });
    }
  };
  const handleApoointmentInHoursD3 = (event) => {
    setCheckedHoursD3({
      ...checkedHoursD3,
      [event.target.id]: !checkedHoursD3[event.target.id],
    });
    if (event.target.checked) {
      setWorkingHoursD3({
        ...WorkingHoursD3,
        [event.target.id]: workingHoursCheckedValuesArr[event.target.value],
      });
    } else {
      /*
          let workingHoursCloneObji = WorkingHours;
          let arr = Object.values(workingHoursCloneObji);
    
          arr[event.target.value] = [3, 3];
          setWorkingHours(arr);
          */
      setWorkingHoursD3({
        ...WorkingHoursD3,
        [`h${event.target.value}`]: "",
      });
    }
  };
  const handleApoointmentInHoursD4 = (event) => {
    setCheckedHoursD4({
      ...checkedHoursD4,
      [event.target.id]: !checkedHoursD4[event.target.id],
    });
    if (event.target.checked) {
      setWorkingHoursD4({
        ...WorkingHoursD4,
        [event.target.id]: workingHoursCheckedValuesArr[event.target.value],
      });
    } else {
      /*
          let workingHoursCloneObji = WorkingHours;
          let arr = Object.values(workingHoursCloneObji);
    
          arr[event.target.value] = [4, 4];
          setWorkingHours(arr);
          */
      setWorkingHoursD4({
        ...WorkingHoursD4,
        [`h${event.target.value}`]: "",
      });
    }
  };
  const handleApoointmentInHoursD5 = (event) => {
    setCheckedHoursD5({
      ...checkedHoursD5,
      [event.target.id]: !checkedHoursD5[event.target.id],
    });
    if (event.target.checked) {
      setWorkingHoursD5({
        ...WorkingHoursD5,
        [event.target.id]: workingHoursCheckedValuesArr[event.target.value],
      });
    } else {
      /*
          let workingHoursCloneObji = WorkingHours;
          let arr = Object.values(workingHoursCloneObji);
    
          arr[event.target.value] = [5, 5];
          setWorkingHours(arr);
          */
      setWorkingHoursD5({
        ...WorkingHoursD5,
        [`h${event.target.value}`]: "",
      });
    }
  };
  const handleApoointmentInHoursD6 = (event) => {
    setCheckedHoursD6({
      ...checkedHoursD6,
      [event.target.id]: !checkedHoursD6[event.target.id],
    });
    if (event.target.checked) {
      setWorkingHoursD6({
        ...WorkingHoursD6,
        [event.target.id]: workingHoursCheckedValuesArr[event.target.value],
      });
    } else {
      /*
          let workingHoursCloneObji = WorkingHours;
          let arr = Object.values(workingHoursCloneObji);
    
          arr[event.target.value] = [6, 6];
          setWorkingHours(arr);
          */
      setWorkingHoursD6({
        ...WorkingHoursD6,
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
      setWorkingDays({
        ...workingDays,
        [`d${event.target.value}`]: "",
      });
    }
  };

  const [checkDaysRadio,setCheckDaysRadio] = useState({
    d0:false,
    d1:false,
    d2:false,
    d3:false,
    d4:false,
    d5:false,
    d6:false
  })
  const handleAppointmentInDaysRadio = (event)=>{
    event.currentTarget.id === "d0"?
    setCheckDaysRadio({
      d0:true,
      d1:false,
      d2:false,
      d3:false,
      d4:false,
      d5:false,
      d6:false
    }): event.currentTarget.id === "d1"? setCheckDaysRadio({
      d0:false,
      d1:true,
      d2:false,
      d3:false,
      d4:false,
      d5:false,
      d6:false
    }): event.currentTarget.id === "d2"? setCheckDaysRadio({
      d0:false,
      d1:false,
      d2:true,
      d3:false,
      d4:false,
      d5:false,
      d6:false
    }): event.currentTarget.id === "d3"? setCheckDaysRadio({
      d0:false,
      d1:false,
      d2:false,
      d3:true,
      d4:false,
      d5:false,
      d6:false
    }): event.currentTarget.id === "d4"? setCheckDaysRadio({
      d0:false,
      d1:false,
      d2:false,
      d3:false,
      d4:true,
      d5:false,
      d6:false
    }): event.currentTarget.id === "d5"? setCheckDaysRadio({
      d0:false,
      d1:false,
      d2:false,
      d3:false,
      d4:false,
      d5:true,
      d6:false
    }): setCheckDaysRadio({
      d0:false,
      d1:false,
      d2:false,
      d3:false,
      d4:false,
      d5:false,
      d6:true
    })
  }
  
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

  }, []);
  const getTotalPresentAndAbsence = (stdData)=>{





  }
  const toogleStudentStatus = (stdObject, event, index, process) => {
    if(stdObject.subscription_state !== "Cancelled"){

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
  }
  };
  const getStudentSessionsDaysAndTime = (stdObji) => {
    
    let sessionsHoursInitialObji = {};
    let sessionsHoursCheckedInitialObji = {};
    let prefsSessionsDaysInitialObject = {};
    let prefsSessionsHoursInitialObject = {};
    let studentBusyDaysAndHours = {};
    let sessionsDaysInitialObji = {};
    let sessionsDaysCheckedInitialObji = {};
    for (let i = 0; i < stdObji.program_prefs.pref_days.length; i++) {
      if (stdObji.program_prefs.pref_days[i] !== -1) {
        prefsSessionsDaysInitialObject[`d${i}`] = true;
       for(let x = 0 ; x < Object.entries(stdObji.busy)[i][1].length;x++){
        if( typeof Object.entries(stdObji.busy)[i][1][x] === 'object' && !Array.isArray(Object.entries(stdObji.busy)[i][1][x])){
          studentBusyDaysAndHours[`dh${i}`] = true;
        }else{
          studentBusyDaysAndHours[`dh${i}`] = false;
        }
       }
      } else {
        prefsSessionsDaysInitialObject[`d${i}`] = false;
      }
    }
    
    for (let i = 0; i < stdObji.program_prefs.pref_times_of_day.length; i++) {
      if (stdObji.program_prefs.pref_times_of_day[i][1] !== 0) {
        prefsSessionsHoursInitialObject[`h${i}`] = true;
        /*
        sessionsHoursInitialObji[`h${i}`] = [
          stdObji.program_prefs.pref_times_of_day[i][0],
          stdObji.program_prefs.pref_times_of_day[i][1],
        ];
        sessionsHoursCheckedInitialObji[`h${i}`] = true;
        */
      } else {
        prefsSessionsHoursInitialObject[`h${i}`] = false;
        /*
        sessionsHoursInitialObji[`h${i}`] = [
          stdObji.program_prefs.pref_times_of_day[i][0],
          stdObji.program_prefs.pref_times_of_day[i][1],
        ];
        sessionsHoursCheckedInitialObji[`h${i}`] = false;
        */
      }
    }
    
    /*
    setWorkingDays(sessionsDaysInitialObji);
    setCheckedDays(sessionsDaysCheckedInitialObji);
   
    setWorkingHours(sessionsHoursInitialObji);
    setCheckedHours(sessionsHoursCheckedInitialObji);
    */
    for (let i = 0; i < stdObji.program_prefs.pref_days.length; i++) {
      if (stdObji.program_prefs.pref_days[i] !== -1) {
        if(i === 0 ){
          setPrefsHoursD0(prefsSessionsHoursInitialObject);
        }else if (i === 1){
          setPrefsHoursD1(prefsSessionsHoursInitialObject);
        }else if (i === 2){
          setPrefsHoursD2(prefsSessionsHoursInitialObject);
        }else if (i === 3){
          setPrefsHoursD3(prefsSessionsHoursInitialObject);
        }else if (i === 4){
          setPrefsHoursD4(prefsSessionsHoursInitialObject);
        }else if (i === 5){
          setPrefsHoursD5(prefsSessionsHoursInitialObject);
        }else{
          setPrefsHoursD6(prefsSessionsHoursInitialObject);
        }
      }
    }
  setPrefsDays(prefsSessionsDaysInitialObject);
      
  gitInstructorOfSpecificStudentWorkingDaysAndHours(stdObji);

  };

  const gitInstructorOfSpecificStudentWorkingDaysAndHours = (stObj) => {
    let disabledDaysInitialObject = {};
    let disabledDaysRadioInitialObject = {};
    let disabledHoursInitialObject = {};
    axios
      .get(`http://localhost:5000/api/instructors/${stObj.instructor}`)
      .then((res) => {
        console.log(res.data.prefs.working_days);
        for (let i = 0; i < res.data.prefs.working_days.length; i++) {
          if (res.data.prefs.working_days[i] === -1) {
            disabledDaysInitialObject[`d${i}`] = true;
            disabledDaysRadioInitialObject[`d${i}`] = true;
          }else{
            disabledDaysInitialObject[`d${i}`] = false;
            disabledDaysRadioInitialObject[`d${i}`] = false;
          }
        
        }
         
        for(let i = 0 ; i <res.data.prefs.working_hours.length;i++ ){
          if(res.data.prefs.working_hours[i][1] === 0){
            disabledHoursInitialObject[`h${i}`] = true;
          }else{
            disabledHoursInitialObject[`h${i}`] = false;
          }  
        }

                
        
        for (let i = 0; i < res.data.prefs.working_days.length; i++) {
          if (res.data.prefs.working_days[i] !== -1) {
            if(i === 0 ){
              setDisabledHoursD0(disabledHoursInitialObject);
            }else if (i === 1){
              setDisabledHoursD1(disabledHoursInitialObject);
            }else if (i === 2){
              setDisabledHoursD2(disabledHoursInitialObject);
            }else if (i === 3){
              setDisabledHoursD3(disabledHoursInitialObject);
            }else if (i === 4){
              setDisabledHoursD4(disabledHoursInitialObject);
            }else if (i === 5){
              setDisabledHoursD5(disabledHoursInitialObject);
            }else{
              setDisabledHoursD6(disabledHoursInitialObject);
            }
          }
        }
           
           setDisabledDays(disabledDaysInitialObject);
           setDisabledDaysRadio(disabledDaysRadioInitialObject);
            
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
    changeSubscriptionState();
  };
  const getStudentRatelMa3yJoiningRequestData = (stdObji, event) => {
    axios
      .get(`http://localhost:5000/api/students/${stdObji._id}`)
      .then((res) => {
       // initialSpecificStudentJoiningRequestData.current = res.data;
        setSpecificStudentJoiningRequestData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(`http://localhost:5000/api/sessions?user_id=${stdObji._id}`).then((res)=>{
      initialStudentSessionsDetails.current = res.data.data;
      setStudentSessionsDetails(res.data.data);
    }).catch((error)=>{
      console.log(error);
    })
    handlerRowClicked(event);
    getTotalPresentAndAbsence(stdObji);
  };
  const distroyAlert = () => {
    setIsAlertVisible(true);
    
    setTimeout(() => {
      setIsAlertVisible((current) => !current);
    }, 1000);
    
  };
  //
  useEffect(() => {
    axios.get(`http://localhost:5000/api/students?limit=300&page=${currentPage}`).then(
      (res) => {
        initialResponse.current =  res.data.data;
        setStudentData(res.data.data);
        let pageN =  Math.ceil(res.data.count/300);
        let numOfPages = [];
        for(let i = 0 ; i < pageN;i++){
          numOfPages.push({id:i+1,index:i+1});
        }
        setPageNoCopy(numOfPages);
        setLastPage(numOfPages[numOfPages.length-1]);
        numOfPages.reverse().splice(numOfPages[numOfPages.length-1],1);
        setPageNoArrLength(numOfPages.length);
        setPageNo(numOfPages.reverse());
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
  }, [fetchAgain,currentPage]);
  const changeSubscriptionState = (event) => {
    
    if (studentConfiguration.studentStatus !== "Cancelled" &&changableSubscriptionState.instructor === undefined) {
      setIsUserMakingUpdateOnStudentAccount(true);
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
          setStudentStatus((current) => !current);
          setStudentConfiguration({
            studentStatus: "",
            studentInstructor: "",
            started_in:""
          });
          setIsUserMakingUpdateOnStudentAccount(false);
          setFetchAgain(fetchAgain + 1);
          distroyAlert();
          getStudentRatelMa3yJoiningRequestData(changableSubscriptionState,event);
          /*
          axios.put(`http://localhost:5000/api/instructors/${changableSubscriptionState.instructor}`,{students:changableSubscriptionState._id}).then((res)=>{

          }).catch((error)=>{
            console.log(error);
          })
          */
        })
        .catch((error) => {
            
          console.log(error);
        });


        
      
    } else if(studentConfiguration.studentStatus !== "Cancelled"  && changableSubscriptionState.instructor !== undefined) {
      setIsUserMakingUpdateOnStudentAccount(true);
      axios
        .put(
          `http://localhost:5000/api/students/${changableSubscriptionState._id}`,
          {
            subscription_state:studentConfiguration.studentStatus !== ''?studentConfiguration.studentStatus:changableSubscriptionState.subscription_state,
            instructor:studentConfiguration.studentInstructor !== ''?studentConfiguration.studentInstructor:changableSubscriptionState.instructor
          }
        )
        .then((res) => {
          setStudentStatus((current) => !current);
          setStudentConfiguration({
            studentStatus: "",
            studentInstructor: "",
            started_in:""
          });
          setIsUserMakingUpdateOnStudentAccount(false);
           distroyAlert();
          setFetchAgain(fetchAgain + 1);
          getStudentRatelMa3yJoiningRequestData(changableSubscriptionState,event);
          /*
          if(studentConfiguration.studentInstructor !== ''){
          axios.put(`http://localhost:5000/api/instructors/${changableSubscriptionState.instructor}`,{students:changableSubscriptionState._id}).then((res)=>{

          }).catch((error)=>{
            console.log(error);
          })
          
        }
        */
        })
      
        .catch((error) => {
          console.log(error);
        });
    }else{
      setIsUserMakingUpdateOnStudentAccount(true);
        axios
        .put(
          `http://localhost:5000/api/students/${changableSubscriptionState._id}`,
          {
            subscription_state: studentConfiguration.studentStatus,
            instructor:null
            
          }
        )
        .then((res) => {
          setStudentStatus((current) => !current);
          setStudentConfiguration({
            studentStatus: "",
            studentInstructor: "",
            started_in:""
          });
          setIsUserMakingUpdateOnStudentAccount(false);
          distroyAlert();
          setFetchAgain(fetchAgain + 1);
          getStudentRatelMa3yJoiningRequestData(changableSubscriptionState,event);
          /*
          axios.put(`http://localhost:5000/api/instructors/${changableSubscriptionState.instructor}`,{students:''}).then((res)=>{

          }).catch((error)=>{
            console.log(error);
          })
          */
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getRecommendedInstructorsForEachStudent = (studentObject) => {
   let matchedDays = [];
   let matchedHours = [];
   let recommendedInstructors = [];
    let avaliableDayaHours = {};
    for (let i = 0; i < instructorData.length; i++) {
      //days
    for (let j = 0; j < instructorData[i].prefs.working_days.length; j++) {
      if(instructorData[i].prefs.working_days[j] !== -1){
        if (instructorData[i].prefs.working_days[j] === Number(Object.entries(instructorData[i].busy)[j][0])) {
          avaliableDayaHours[`${instructorData[i].prefs.working_days[j]}`] = [];
         //hours
        if(Object.entries(instructorData[i].busy)[j][1].length === 0 ){
          for(let x = 0 ; x <instructorData[i].prefs.working_hours.length;x++ ){
            if(instructorData[i].prefs.working_hours[x][1] !== 0 ){
             avaliableDayaHours[`${instructorData[i].prefs.working_days[j]}`].push([0,0]);
            }else{
              avaliableDayaHours[`${instructorData[i].prefs.working_days[j]}`].push([-1,-1]);
            }
          }
        }else{
              for(let insIndex = 0 ; insIndex <instructorData[i].prefs.working_hours.length;insIndex++){
                console.log(Object.entries(instructorData[i].busy)[j][1][insIndex] )

                  if(typeof  Object.entries(instructorData[i].busy)[j][1][insIndex] === 'object' && !Array.isArray(Object.entries(instructorData[i].busy)[j][1][insIndex])){
                  if(instructorData[i].prefs.working_hours[insIndex][1] !== 0 ){
                    avaliableDayaHours[`${instructorData[i].prefs.working_days[j]}`].push([0,1]);
                  }
                }else{
                  console.log(Object.entries(instructorData[i].busy)[j][1][insIndex])
                  if(instructorData[i].prefs.working_hours[insIndex][1] !== 0  && Object.entries(instructorData[i].busy)[j][1][insIndex][1] === 0){
                    avaliableDayaHours[`${instructorData[i].prefs.working_days[j]}`].push([0,0]);
                  }else{
                    avaliableDayaHours[`${instructorData[i].prefs.working_days[j]}`].push([-1,-1]);
                  }
                }
                
              }
            }
        
        }
        
      }
    }
    console.log(avaliableDayaHours);
    for(let stdIndex = 0 ; stdIndex <studentObject.program_prefs.pref_days.length;stdIndex++ ){
      if(studentObject.program_prefs.pref_days[stdIndex] !== -1){
        for(let u = 0 ; u <Object.keys(avaliableDayaHours).length;u++ ){
          if(Number(Object.keys(avaliableDayaHours)[u]) === studentObject.program_prefs.pref_days[stdIndex]){
            matchedDays.push(true);
              for(let s = 0 ; s < Object.entries(avaliableDayaHours)[u][1].length;s++){
                for(let prefHoursIndex = 0 ;prefHoursIndex< studentObject.program_prefs.pref_times_of_day.length;prefHoursIndex++){
                  if(studentObject.program_prefs.pref_times_of_day[prefHoursIndex][1] !== 0){
                    if(studentObject.program_prefs.pref_times_of_day[prefHoursIndex][1]  === 1 && Object.entries(avaliableDayaHours)[u][1][s][1] === 0){
                      matchedHours.push(true)
                    }else{
                      matchedHours.push(false);
                    }
                  }
                }
             
              }
          }else{
            matchedDays.push(false);
          }
        }
      }
    }
    if (matchedDays.filter((mD) => mD === true).length >= Number(studentObject.program_prefs.sessions_in_week) && matchedHours.filter((mH)=>mH === true).length >= Number(studentObject.program_prefs.sessions_in_week)) {
      recommendedInstructors.push(instructorData[i]);
      matchedDays = [];
      matchedHours = [];
      avaliableDayaHours = {};
    }
    else{
      matchedDays = [];
      matchedHours = [];
      avaliableDayaHours = {};
    }

  }
  setRecommendedInstructorsData(recommendedInstructors);



   // }

    /*
    let matchedDays = [];
    let matchedHours = [];
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
      if (matchedDays.every((mD) => mD === true) === true && matchedHours.every((mH)=>mH === true) === true ) {
        recommendedInstructors.push(instructorData[i]);
        matchedDays = [];
        matchedHours = [];
      }else{
        matchedDays = [];
        matchedHours = [];
      }
    }
    setRecommendedInstructorsData(recommendedInstructors);
    */
  };
  const changeStudentSessionsDayHours = (event)=>{
    
    let wD = [];
    let stdwHoursD0 = [];
    let stdwHoursD1 = [];
    let stdwHoursD2 = [];
    let stdwHoursD3 = [];
    let stdwHoursD4 = [];
    let stdwHoursD5 = [];
    let stdwHoursD6 = [];
   
    for (let i = 0; i < Object.values(workingDays).length; i++) {
        
        if (Object.values(workingDays)[i] === "") {
            let emptyWorkingDayInitialValue = (Object.values(workingDays)[i]) = -1;
            wD.push(emptyWorkingDayInitialValue);
        }else{
            wD.push(Number(Object.values(workingDays)[i]));

        }
  
    }
    for (let i = 0; i < Object.values(WorkingHoursD0).length; i++) {
        if (Object.values(WorkingHoursD0)[i] === "") {
            let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD0)[i] = [
                0, 0,
            ]);
           stdwHoursD0.push(emptyWorkingHourInitialValue);  
        } else {
         //stdwHoursD0.push(Object.values(WorkingHoursD0)[i]);
         stdwHoursD0.push({"stdIds":[changableSubscriptionState._id],"max":1})
        }
    }
    for (let i = 0; i < Object.values(WorkingHoursD1).length; i++) {
      if (Object.values(WorkingHoursD1)[i] === "") {
          let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD1)[i] = [
              0, 0,
          ]);
          stdwHoursD1.push(emptyWorkingHourInitialValue);
      } else {
       // stdwHoursD1.push(Object.values(WorkingHoursD1)[i]);
       stdwHoursD1.push({"stdIds":[changableSubscriptionState._id],"max":1})
      }
  }
  for (let i = 0; i < Object.values(WorkingHoursD2).length; i++) {
    if (Object.values(WorkingHoursD2)[i] === "") {
        let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD2)[i] = [
            0, 0,
        ]);
        stdwHoursD2.push(emptyWorkingHourInitialValue);
    } else {
     // stdwHoursD2.push(Object.values(WorkingHoursD2)[i]);
     stdwHoursD2.push({"stdIds":[changableSubscriptionState._id],"max":1})
    }
}
for (let i = 0; i < Object.values(WorkingHoursD3).length; i++) {
  if (Object.values(WorkingHoursD3)[i] === "") {
      let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD3)[i] = [
          0, 0,
      ]);
      stdwHoursD3.push(emptyWorkingHourInitialValue);
  } else {
    //stdwHoursD3.push(Object.values(WorkingHoursD3)[i]);
    stdwHoursD3.push({"stdIds":[changableSubscriptionState._id],"max":1})
  }
}
for (let i = 0; i < Object.values(WorkingHoursD4).length; i++) {
  if (Object.values(WorkingHoursD4)[i] === "") {
      let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD4)[i] = [
          0, 0,
      ]);
      stdwHoursD4.push(emptyWorkingHourInitialValue);
  } else {
    //stdwHoursD4.push(Object.values(WorkingHoursD4)[i]);
    stdwHoursD4.push({"stdIds":[changableSubscriptionState._id],"max":1})
  }
}
for (let i = 0; i < Object.values(WorkingHoursD5).length; i++) {
  if (Object.values(WorkingHoursD5)[i] === "") {
      let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD5)[i] = [
          0, 0,
      ]);
      stdwHoursD5.push(emptyWorkingHourInitialValue);
  } else {
   // stdwHoursD5.push(Object.values(WorkingHoursD5)[i]);
   stdwHoursD5.push({"stdIds":[changableSubscriptionState._id],"max":1})
  }
}
for (let i = 0; i < Object.values(WorkingHoursD6).length; i++) {
  if (Object.values(WorkingHoursD6)[i] === "") {
      let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD6)[i] = [
          0, 0,
      ]);
      stdwHoursD6.push(emptyWorkingHourInitialValue);
  } else {
   // stdwHoursD6.push(Object.values(WorkingHoursD6)[i]);
   stdwHoursD6.push({"stdIds":[changableSubscriptionState._id],"max":1})
  }
}
let studentBusy = {};
    for(let i = 0 ; i <wD.length;i++){
      if(Number(Object.keys(changableSubscriptionState.busy)[i]) === wD[i]){
        if( i === 0 )
        studentBusy[`${i}`] = stdwHoursD0;
        if( i === 1 )
        studentBusy[`${i}`] = stdwHoursD1;
        if( i === 2 )
        studentBusy[`${i}`] = stdwHoursD2;
        if( i === 3 )
        studentBusy[`${i}`] = stdwHoursD3;
        if( i === 4 )
        studentBusy[`${i}`] = stdwHoursD4;
        if( i === 5 )
        studentBusy[`${i}`] = stdwHoursD5;
        if( i === 6 )
        studentBusy[`${i}`] = stdwHoursD6;
      }else{
        studentBusy[`${i}`] = [];
      }
    }
    /*
    let program = {
      "program_prefs":{
        "type":changableSubscriptionState.program_prefs.type,
        "sessions_in_week":changableSubscriptionState.program_prefs.sessions_in_week,
        "pref_days":wD,
        "pref_times_of_day":wHours,
        "plan":[]
      }
       
    }
    */
    setIsUserMakingUpdateOnStudentAccount(true);
    let instructorBusy = {};
   axios.get(`http://localhost:5000/api/instructors/${changableSubscriptionState.instructor}`).then((res)=>{
    for(let i = 0 ; i < wD.length;i++ ){
      if(Number(Object.keys(res.data.busy)[i]) === wD[i]){
        for(let x = 0 ; x < res.data.prefs.working_hours.length;x++){
          if(res.data.prefs.working_hours[x][1] === 0){
            stdwHoursD0[x] = [-1,-1];
            stdwHoursD1[x] = [-1,-1];
            stdwHoursD2[x] = [-1,-1];
            stdwHoursD3[x] = [-1,-1];
            stdwHoursD4[x] = [-1,-1];
            stdwHoursD5[x] = [-1,-1];
            stdwHoursD6[x] = [-1,-1];
          }
        }
        if( i === 0 ){
          if( Object.entries(res.data.busy)[i][1].find((obji)=> typeof obji === 'object'&&  !Array.isArray(obji)) !== undefined){
            for(let c = 0 ; c <Object.entries(res.data.busy)[i][1].length;c++){
               if(typeof Object.entries(res.data.busy)[i][1][c] === 'object' &&  !Array.isArray(Object.entries(res.data.busy)[i][1][c])){
                 if((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId)=> sId === changableSubscriptionState._id)) === undefined && (typeof  stdwHoursD0[c] === 'object' &&  !Array.isArray(stdwHoursD0[c]))){
                  let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                  previouslyStdIds.push(changableSubscriptionState._id);
                  let max = Object.entries(res.data.busy)[i][1][c].max;
                  max+=1;
                   stdwHoursD0[c] = {"stdIds":previouslyStdIds,"max":max}
                 }
               }else{
                if(stdwHoursD0[c][1] === 1)
                stdwHoursD0[c] = Object.entries(res.data.busy)[i][1][c];
               }
             }
             instructorBusy[`${i}`] = stdwHoursD0;
            
            }else{
              instructorBusy[`${i}`] = stdwHoursD0;
            }
          
        }
       
        if( i === 1 ){
          if( Object.entries(res.data.busy)[i][1].find((obji)=> typeof obji === 'object'&&  !Array.isArray(obji)) !== undefined){
            for(let c = 0 ; c <Object.entries(res.data.busy)[i][1].length;c++){
               if(typeof Object.entries(res.data.busy)[i][1][c] === 'object' &&  !Array.isArray(Object.entries(res.data.busy)[i][1][c])){
                 if((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId)=> sId === changableSubscriptionState._id)) === undefined && (typeof  stdwHoursD1[c] === 'object' &&  !Array.isArray(stdwHoursD1[c]))){
                  let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                  previouslyStdIds.push(changableSubscriptionState._id);
                  let max = Object.entries(res.data.busy)[i][1][c].max;
                  max+=1;
                   stdwHoursD1[c] = {"stdIds":previouslyStdIds,"max":max}
                 }
               }else{
                if(stdwHoursD1[c][1] === 1)
                stdwHoursD1[c] = Object.entries(res.data.busy)[i][1][c];
               }
             }
             instructorBusy[`${i}`] = stdwHoursD1;
            
            }else{
              instructorBusy[`${i}`] = stdwHoursD1;
            }
       
        }
       
        if( i === 2 ){
          if( Object.entries(res.data.busy)[i][1].find((obji)=> typeof obji === 'object'&&  !Array.isArray(obji)) !== undefined){
          for(let c = 0 ; c <Object.entries(res.data.busy)[i][1].length;c++){
             if(typeof Object.entries(res.data.busy)[i][1][c] === 'object' &&  !Array.isArray(Object.entries(res.data.busy)[i][1][c])){
               if((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId)=> sId === changableSubscriptionState._id)) === undefined && (typeof  stdwHoursD2[c] === 'object' &&  !Array.isArray(stdwHoursD2[c]))){
                let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                previouslyStdIds.push(changableSubscriptionState._id);
                let max = Object.entries(res.data.busy)[i][1][c].max;
                max+=1;
                 stdwHoursD2[c] = {"stdIds":previouslyStdIds,"max":max}
               }
             }else{
              if(stdwHoursD2[c][1] === 1)
              stdwHoursD2[c] = Object.entries(res.data.busy)[i][1][c];
             }
           }
           instructorBusy[`${i}`] = stdwHoursD2;
          
          }else{
            instructorBusy[`${i}`] = stdwHoursD2;
          }
        
       
        }
       
        if( i === 3 ){
          if( Object.entries(res.data.busy)[i][1].find((obji)=> typeof obji === 'object'&&  !Array.isArray(obji)) !== undefined){
            for(let c = 0 ; c <Object.entries(res.data.busy)[i][1].length;c++){
               if(typeof Object.entries(res.data.busy)[i][1][c] === 'object' &&  !Array.isArray(Object.entries(res.data.busy)[i][1][c])){
                 if((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId)=> sId === changableSubscriptionState._id)) === undefined && (typeof  stdwHoursD3[c] === 'object' &&  !Array.isArray(stdwHoursD3[c]))){
                  let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                  previouslyStdIds.push(changableSubscriptionState._id);
                  let max = Object.entries(res.data.busy)[i][1][c].max;
                  max+=1;
                   stdwHoursD3[c] = {"stdIds":previouslyStdIds,"max":max}
                 }
               }else{
                if(stdwHoursD3[c][1] === 1)
                stdwHoursD3[c] = Object.entries(res.data.busy)[i][1][c];
               }
             }
             instructorBusy[`${i}`] = stdwHoursD3;
            
            }else{
              instructorBusy[`${i}`] = stdwHoursD3;
            }
          
        }
        
        if( i === 4 ){
          if( Object.entries(res.data.busy)[i][1].find((obji)=> typeof obji === 'object'&&  !Array.isArray(obji)) !== undefined){
            for(let c = 0 ; c <Object.entries(res.data.busy)[i][1].length;c++){
               if(typeof Object.entries(res.data.busy)[i][1][c] === 'object' &&  !Array.isArray(Object.entries(res.data.busy)[i][1][c])){
                 if((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId)=> sId === changableSubscriptionState._id)) === undefined && (typeof  stdwHoursD4[c] === 'object' &&  !Array.isArray(stdwHoursD4[c]))){
                  let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                  previouslyStdIds.push(changableSubscriptionState._id);
                  let max = Object.entries(res.data.busy)[i][1][c].max;
                  max+=1;
                   stdwHoursD4[c] = {"stdIds":previouslyStdIds,"max":max}
                 }
               }else{
                if(stdwHoursD4[c][1] === 1)
                stdwHoursD4[c] = Object.entries(res.data.busy)[i][1][c];
               }
             }
             instructorBusy[`${i}`] = stdwHoursD4;
            
            }else{
              instructorBusy[`${i}`] = stdwHoursD4;
            }
           
        }
     
        if( i === 5 ){
          if( Object.entries(res.data.busy)[i][1].find((obji)=> typeof obji === 'object'&&  !Array.isArray(obji)) !== undefined){
            for(let c = 0 ; c <Object.entries(res.data.busy)[i][1].length;c++){
               if(typeof Object.entries(res.data.busy)[i][1][c] === 'object' &&  !Array.isArray(Object.entries(res.data.busy)[i][1][c])){
                 if((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId)=> sId === changableSubscriptionState._id)) === undefined && (typeof  stdwHoursD5[c] === 'object' &&  !Array.isArray(stdwHoursD5[c]))){
                  let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                  previouslyStdIds.push(changableSubscriptionState._id);
                  let max = Object.entries(res.data.busy)[i][1][c].max;
                  max+=1;
                   stdwHoursD5[c] = {"stdIds":previouslyStdIds,"max":max}
                 }
               }else{
                if(stdwHoursD5[c][1] === 1)
                stdwHoursD5[c] = Object.entries(res.data.busy)[i][1][c];
               }
             }
             instructorBusy[`${i}`] = stdwHoursD5;
            
            }else{
              instructorBusy[`${i}`] = stdwHoursD5;
            }
      
        }
        
        if( i === 6 ){
          if( Object.entries(res.data.busy)[i][1].find((obji)=> typeof obji === 'object'&&  !Array.isArray(obji)) !== undefined){
            for(let c = 0 ; c <Object.entries(res.data.busy)[i][1].length;c++){
               if(typeof Object.entries(res.data.busy)[i][1][c] === 'object' &&  !Array.isArray(Object.entries(res.data.busy)[i][1][c])){
                 if((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId)=> sId === changableSubscriptionState._id)) === undefined && (typeof  stdwHoursD6[c] === 'object' &&  !Array.isArray(stdwHoursD6[c]))){
                  let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                  previouslyStdIds.push(changableSubscriptionState._id);
                  let max = Object.entries(res.data.busy)[i][1][c].max;
                  max+=1;
                   stdwHoursD6[c] = {"stdIds":previouslyStdIds,"max":max}
                 }
               }else{
                if(stdwHoursD6[c][1] === 1)
                stdwHoursD6[c] = Object.entries(res.data.busy)[i][1][c];
               }
             }
             instructorBusy[`${i}`] = stdwHoursD6;
            
            }else{
              instructorBusy[`${i}`] = stdwHoursD6;
            }
           
        }
        

      }
    }
    let busyInstructorDaysHours = {}
    if(Object.values(WorkingHoursD0).every((wH)=> wH === "")){
      busyInstructorDaysHours["0"] = Object.entries(res.data.busy)[0][1]
    }else{
      busyInstructorDaysHours["0"] = instructorBusy['0'];
    }
    if(Object.values(WorkingHoursD1).every((wH)=> wH === "")){
      busyInstructorDaysHours["1"] = Object.entries(res.data.busy)[1][1]
    }else{
      busyInstructorDaysHours["1"] = instructorBusy['1'];
    }
    if(Object.values(WorkingHoursD2).every((wH)=> wH === "")){
      busyInstructorDaysHours["2"] = Object.entries(res.data.busy)[2][1]
    }else{
      busyInstructorDaysHours["2"] = instructorBusy['2'];
    }
    if(Object.values(WorkingHoursD3).every((wH)=> wH === "")){
      busyInstructorDaysHours["3"] = Object.entries(res.data.busy)[3][1]
    }else{
      busyInstructorDaysHours["3"] = instructorBusy['3'];
    }
    if(Object.values(WorkingHoursD4).every((wH)=> wH === "")){
      busyInstructorDaysHours["4"] = Object.entries(res.data.busy)[4][1]
    }else{
      busyInstructorDaysHours["4"] = instructorBusy['4'];
    }
    if(Object.values(WorkingHoursD5).every((wH)=> wH === "")){
      busyInstructorDaysHours["5"] = Object.entries(res.data.busy)[5][1]
    }else{
      busyInstructorDaysHours["5"] = instructorBusy['5'];
    }
    if(Object.values(WorkingHoursD6).every((wH)=> wH === "")){
      busyInstructorDaysHours["6"] = Object.entries(res.data.busy)[6][1]
    }else{
      busyInstructorDaysHours["6"] = instructorBusy['6'];
    }

 

    axios.put(`http://localhost:5000/api/instructors/${changableSubscriptionState.instructor}`,{"busy":busyInstructorDaysHours}).then(()=>{
      stdwHoursD0 = [];
      stdwHoursD1 = [];
      stdwHoursD2 = [];
      stdwHoursD3 = [];
      stdwHoursD4 = [];
      stdwHoursD5 = [];
      stdwHoursD6 = [];
    setWorkingHoursD0({
     h0: "",
     h1: "",
     h2: "",
     h3: "",
     h4: "",
     h5: "",
     h6: "",
     h7: "",
    });
    setWorkingHoursD1({
     h0: "",
     h1: "",
     h2: "",
     h3: "",
     h4: "",
     h5: "",
     h6: "",
     h7: "",
    });
    setWorkingHoursD2({
     h0: "",
     h1: "",
     h2: "",
     h3: "",
     h4: "",
     h5: "",
     h6: "",
     h7: "",
    });
    setWorkingHoursD3({
     h0: "",
     h1: "",
     h2: "",
     h3: "",
     h4: "",
     h5: "",
     h6: "",
     h7: "",
    });
    setWorkingHoursD4({
     h0: "",
     h1: "",
     h2: "",
     h3: "",
     h4: "",
     h5: "",
     h6: "",
     h7: "",
    });
    setWorkingHoursD5({
     h0: "",
     h1: "",
     h2: "",
     h3: "",
     h4: "",
     h5: "",
     h6: "",
     h7: "",
    });
    setWorkingHoursD6({
     h0: "",
     h1: "",
     h2: "",
     h3: "",
     h4: "",
     h5: "",
     h6: "",
     h7: "",
    });
    setCheckedHoursD0({
     h0: false,
     h1: false,
     h2: false,
     h3: false,
     h4: false,
     h5: false,
     h6: false,
     h7: false,
    });
    setCheckedHoursD1({
     h0: false,
     h1: false,
     h2: false,
     h3: false,
     h4: false,
     h5: false,
     h6: false,
     h7: false,
    });
    setCheckedHoursD2({
     h0: false,
     h1: false,
     h2: false,
     h3: false,
     h4: false,
     h5: false,
     h6: false,
     h7: false,
    });
    setCheckedHoursD3({
     h0: false,
     h1: false,
     h2: false,
     h3: false,
     h4: false,
     h5: false,
     h6: false,
     h7: false,
    });
    setCheckedHoursD4({
     h0: false,
     h1: false,
     h2: false,
     h3: false,
     h4: false,
     h5: false,
     h6: false,
     h7: false,
    });
    setCheckedHoursD5({
     h0: false,
     h1: false,
     h2: false,
     h3: false,
     h4: false,
     h5: false,
     h6: false,
     h7: false,
    });
    setCheckedHoursD6({
     h0: false,
     h1: false,
     h2: false,
     h3: false,
     h4: false,
     h5: false,
     h6: false,
     h7: false,
    });
    setWorkingDays({
     d0:"",
     d1:"",
     d2:"",
     d3:"",
     d4:"",
     d5:"",
     d6:"",
    })
    setCheckedDays({
     d0:false,
     d1:false,
     d2:false,
     d3:false,
     d4:false,
     d5:false,
     d6:false,
    })
    setCheckDaysRadio({
     d0:false,
     d1:false,
     d2:false,
     d3:false,
     d4:false,
     d5:false,
     d6:false,
    })
    })

   }).catch((error)=>{
    console.log(error)
   })
    axios.put(`http://localhost:5000/api/students/${changableSubscriptionState._id}`,{"busy":{
        "0":studentBusy['0'],
         "1":studentBusy['1'],
         "2":studentBusy['2'],
         "3":studentBusy['3'],
         "4":studentBusy['4'],
         "5":studentBusy['5'],
         "6":studentBusy['6']
    }}).then((res)=>{
       distroyAlert();
       setFetchAgain(fetchAgain+1);
       setIsUserMakingUpdateOnStudentAccount(false);
       setStudentStatus((current) => !current);
       getStudentRatelMa3yJoiningRequestData(res.data,event);
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

  const deleteStudent = (event,studentAccountObji)=>{
    event.stopPropagation();
    axios.delete(`http://localhost:5000/api/students/${studentAccountObji._id}`).then((res)=>{
    setFetchAgain(fetchAgain+1);
    setIsUserDeleteAnyAccount(true);
    setTimeout(()=>{
        setIsUserDeleteAnyAccount(false);
    },1000)

    }).catch((error)=>{
      console.log(error);
    })
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
          {studentData.length === 0 || studentData === undefined ? (
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
                    <AiFillSetting
                          className={
                            StudentSubscriptionStyles["setting-icon-hidden"]
                          }
                          style={{cursor:stdData.subscription_state === "Cancelled"?'not-allowed':'pointer',color:stdData.subscription_state === "Cancelled"?'#a2a9af':''}}
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

                        <FaCalendarTimes
                          className={
                            StudentSubscriptionStyles["setting-icon-hidden"]
                          }
                          style={{
                            color: !stdData.instructor ? "#a2a9af" : "",
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
                      <FaTrash onClick={(event)=>deleteStudent(event,stdData)}/>
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
                    {isUserMakingUpdateOnStudentAccount?<>
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    </>:<>{"Save"}<FaSave style={{ margin: "0px 0 1px 3px" }} size={15} /></>
                    }
              
                      
                    </button>
                  ) : changableSubscriptionState.instructor !== null &&
                    changableSubscriptionState.instructor !== undefined ? (
                    <button
                      type="submit"
                      className={`${
                         StudentSubscriptionStyles["btn"]
                      }`}
                    >
                    {isUserMakingUpdateOnStudentAccount?<>
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    </>:<>{"Save"}<FaSave style={{ margin: "0px 0 1px 3px" }} size={15} /></>
                    }
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
                    {isUserMakingUpdateOnStudentAccount?<>
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    <Spinner animation="grow" variant="light" style={{width:'10px',height:'10px',marginLeft:'3px'}} />
                    </>:<>{"Save"}<FaSave style={{ margin: "0px 0 1px 3px" }} size={15} /></>
                    }
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
                      <Form.Label htmlFor="d0" style={{color:disabledDays.d0?'#d9d9f3':prefsDays.d0?'#00c07f':'#000000'}}>{t("Saturday")}</Form.Label>
                      <Form.Check
                        name="d0"
                        id="d0"
                        value={0}
                        disabled={disabledDays.d0}
                        style={{cursor:disabledDays.d0?'not-allowed':'pointer'}}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d0"]}
                      />
                      <Form.Check
                      type="radio"
                      name="avaliable_hours_related_to_specific_day"
                      id="d0"
                      disabled={disabledDaysRadio.d0}
                      onChange={(event)=>handleAppointmentInDaysRadio(event)}
                      checked={checkDaysRadio["d0"]}
                      style={{cursor:disabledDaysRadio.d0?'not-allowed':'pointer'}}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d1" style={{color:disabledDays.d1?'#d9d9f3':prefsDays.d1?'#00c07f':'#000000'}}>Sunday</Form.Label>
                      <Form.Check
                        name="d1"
                        id="d1"
                        disabled={disabledDays.d1}
                        value={1}
                        style={{cursor:disabledDays.d1?'not-allowed':'pointer'}}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d1"]}
                      />
                               <Form.Check
                      type="radio"
                      name="avaliable_hours_related_to_specific_day"
                      id="d1"
                      disabled={disabledDaysRadio.d1}
                      onChange={(event)=>handleAppointmentInDaysRadio(event)}
                      checked={checkDaysRadio["d1"]}
                      style={{cursor:disabledDaysRadio.d1?'not-allowed':'pointer'}}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d2" style={{color:disabledDays.d2?'#d9d9f3':prefsDays.d2?'#00c07f':'#000000'}}>{t("Monday")}</Form.Label>
                      <Form.Check
                        name="d2"
                        id="d2"
                        style={{cursor:disabledDays.d2?'not-allowed':'pointer'}}
                        disabled={disabledDays.d2}
                        value={2}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d2"]}
                      />
                               <Form.Check
                      type="radio"
                      name="avaliable_hours_related_to_specific_day"
                      id="d2"   
                      disabled={disabledDaysRadio.d2}        
                      onChange={(event)=>handleAppointmentInDaysRadio(event)}
                      checked={checkDaysRadio["d2"]}
                      style={{cursor:disabledDaysRadio.d2?'not-allowed':'pointer'}}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d3" style={{color:disabledDays.d3?'#d9d9f3':prefsDays.d3?'#00c07f':'#000000'}}>{t("Tuesday")}</Form.Label>
                      <Form.Check
                        name="d3"
                        id="d3"
                        disabled={disabledDays.d3}
                        style={{cursor:disabledDays.d3?'not-allowed':'pointer'}}
                        value={3}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d3"]}
                      />
                               <Form.Check
                      type="radio"
                      name="avaliable_hours_related_to_specific_day"
                      id="d3"
                      disabled={disabledDaysRadio.d3}
                      onChange={(event)=>handleAppointmentInDaysRadio(event)}
                      checked={checkDaysRadio["d3"]}
                      style={{cursor:disabledDaysRadio.d3?'not-allowed':'pointer'}}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d4" style={{color:disabledDays.d4?'#d9d9f3':prefsDays.d4?'#00c07f':'#000000'}}>{t("Wednesday")}</Form.Label>
                      <Form.Check
                        name="d4"
                        id="d4"
                        disabled={disabledDays.d4}
                        value={4}
                        style={{cursor:disabledDays.d4?'not-allowed':'pointer'}}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d4"]}
                      />
                               <Form.Check
                      type="radio"
                      name="avaliable_hours_related_to_specific_day"
                      id="d4"
                      disabled={disabledDaysRadio.d4}
                      onChange={(event)=>handleAppointmentInDaysRadio(event)}
                      checked={checkDaysRadio["d4"]}
                      style={{cursor:disabledDaysRadio.d4?'not-allowed':'pointer'}}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d5" style={{color:disabledDays.d5?'#d9d9f3':prefsDays.d5?'#00c07f':'#000000'}}>{t("Thursday")}</Form.Label>
                      <Form.Check
                        name="d5"
                        id="d5"
                        disabled={disabledDays.d5}
                        value={5}
                        style={{cursor:disabledDays.d5?'not-allowed':'pointer'}}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d5"]}
                      />
                               <Form.Check
                      type="radio"
                      name="avaliable_hours_related_to_specific_day"
                      id="d5"
                      disabled={disabledDaysRadio.d5}
                      onChange={(event)=>handleAppointmentInDaysRadio(event)}
                      checked={checkDaysRadio["d5"]}
                      style={{cursor:disabledDaysRadio.d5?'not-allowed':'pointer'}}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d6" style={{color:disabledDays.d6?'#d9d9f3':prefsDays.d6?'#00c07f':'#000000'}}>{t("Friday")}</Form.Label>
                      <Form.Check
                        name="d6"
                        id="d6"
                        disabled={disabledDays.d6}
                        style={{cursor:disabledDays.d6?'not-allowed':'pointer'}}
                        value={6}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d6"]}
                      />
                      <Form.Check
                      type="radio"
                      name="avaliable_hours_related_to_specific_day"
                      id="d6"
                      disabled={disabledDaysRadio.d6}
                      style={{cursor:disabledDaysRadio.d6?'not-allowed':'pointer'}}
                      onChange={(event)=>handleAppointmentInDaysRadio(event)}
                      checked={checkDaysRadio["d6"]}
                      />
                    </div>
                  </div>
                  {checkDaysRadio.d0?<>
                  <span>Session Hours on Saturday</span>
                  <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                    {Working_hours.map((wh, index) => (
                      <div key={wh.id}>
                        <Form.Label htmlFor={wh.att}  style={{color:disabledHoursD0[`h${index}`]?'#dadada':prefsHoursD0[`h${index}`]?'#00c07f':'#000000'}}>
                          {wh.appointment}
                        </Form.Label>
                        <Form.Check
                          id={wh.att}
                          name={wh.att}
                          value={index}
                          disabled={disabledHoursD0[`h${index}`]}
                          style={{cursor:disabledHoursD0[`h${index}`]?'not-allowed':'pointer'}}
                          onChange={handleApoointmentInHoursD0}
                          checked={checkedHoursD0[`h${index}`]}
                        />
                      </div>
                    ))}</div></>:checkDaysRadio.d1?<>
                    <span>Session Hours on Sunday</span>
                    <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                    {Working_hours.map((wh, index) => (
                      <div key={wh.id}>
                        <Form.Label htmlFor={wh.att}  style={{color:disabledHoursD1[`h${index}`]?'#dadada':prefsHoursD1[`h${index}`]?'#00c07f':'#000000'}}>
                          {wh.appointment}
                        </Form.Label>
                        <Form.Check
                          id={wh.att}
                          name={wh.att}
                          value={index}
                          disabled={disabledHoursD1[`h${index}`]}
                          style={{cursor:disabledHoursD1[`h${index}`]?'not-allowed':'pointer'}}
                          onChange={handleApoointmentInHoursD1}
                          checked={checkedHoursD1[`h${index}`]}
                        />
                      </div>
                    ))}</div></>:checkDaysRadio.d2?<>
                    <span>Session Hours on Monday</span>
                    <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                    {Working_hours.map((wh, index) => (
                      <div key={wh.id}>
                        <Form.Label htmlFor={wh.att} style={{color:disabledHoursD2[`h${index}`]?'#dadada':prefsHoursD2[`h${index}`]?'#00c07f':'#000000'}}>
                          {wh.appointment}
                        </Form.Label>
                        <Form.Check
                          id={wh.att}
                          name={wh.att}
                          value={index}
                          disabled={disabledHoursD2[`h${index}`]}
                          style={{cursor:disabledHoursD2[`h${index}`]?'not-allowed':'pointer'}}
                          onChange={handleApoointmentInHoursD2}
                          checked={checkedHoursD2[`h${index}`]}
                        />
                      </div>
                    ))}</div></>:checkDaysRadio.d3?<>
                         <span>Session Hours on Tuesday</span>
                    <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                    {Working_hours.map((wh, index) => (
                      <div key={wh.id}>
                        <Form.Label htmlFor={wh.att}  style={{color:disabledHoursD3[`h${index}`]?'#dadada':prefsHoursD3[`h${index}`]?'#00c07f':'#000000'}}>
                          {wh.appointment}
                        </Form.Label>
                        <Form.Check
                          id={wh.att}
                          name={wh.att}
                          value={index}
                          disabled={disabledHoursD3[`h${index}`]}
                          style={{cursor:disabledHoursD3[`h${index}`]?'not-allowed':'pointer'}}
                          onChange={handleApoointmentInHoursD3}
                          checked={checkedHoursD3[`h${index}`]}
                        />
                      </div>
                    ))}</div></>:checkDaysRadio.d4?<>
                           <span>Session Hours on Wednesday</span>
                    <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                    {Working_hours.map((wh, index) => (
                      <div key={wh.id}>
                        <Form.Label htmlFor={wh.att}  style={{color:disabledHoursD4[`h${index}`]?'#dadada':prefsHoursD4[`h${index}`]?'#00c07f':'#000000'}}>
                          {wh.appointment}
                        </Form.Label>
                        <Form.Check
                          id={wh.att}
                          name={wh.att}
                          value={index}
                          disabled={disabledHoursD4[`h${index}`]}
                          style={{cursor:disabledHoursD4[`h${index}`]?'not-allowed':'pointer'}}
                          onChange={handleApoointmentInHoursD4}
                          checked={checkedHoursD4[`h${index}`]}
                        />
                      </div>
                    ))}</div></>:checkDaysRadio.d5?<>
                            <span>Session Hours on Thursday</span>
                    <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                    {Working_hours.map((wh, index) => (
                      <div key={wh.id}>
                        <Form.Label htmlFor={wh.att}  style={{color:disabledHoursD5[`h${index}`]?'#dadada':prefsHoursD5[`h${index}`]?'#00c07f':'#000000'}}>
                          {wh.appointment}
                        </Form.Label>
                        <Form.Check
                          id={wh.att}
                          name={wh.att}
                          value={index}
                          disabled={disabledHoursD5[`h${index}`]}
                          style={{cursor:disabledHoursD5[`h${index}`]?'not-allowed':'pointer'}}
                          onChange={handleApoointmentInHoursD5}
                          checked={checkedHoursD5[`h${index}`]}
                        />
                      </div>
                    ))}</div></>:checkDaysRadio.d6?<>
                    <span>Session Hours on Friday</span>
                    <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                    {Working_hours.map((wh, index) => (
                      <div key={wh.id}>
                        <Form.Label htmlFor={wh.att}  style={{color:disabledHoursD6[`h${index}`]?'#dadada':prefsHoursD6[`h${index}`]?'#00c07f':'#000000'}}>
                          {wh.appointment}
                        </Form.Label>
                        <Form.Check
                          id={wh.att}
                          name={wh.att}
                          value={index}
                          disabled={disabledHoursD6[`h${index}`]}
                          style={{cursor:disabledHoursD6[`h${index}`]?'not-allowed':'pointer'}}
                          onChange={handleApoointmentInHoursD6}
                          checked={checkedHoursD6[`h${index}`]}
                        />
                      </div>
                    ))}</div></>:null
                  }
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
        <div className={`${StudentSubscriptionStyles["alert"]} ${changableSubscriptionState.subscription_state !== "Pending"?StudentSubscriptionStyles['cancelled-action-alert']:''} `}>
          <img src={CircleGif} alt="gif-alert-circle" />
          {changableSubscriptionState.instructor !== null && changableSubscriptionState.instructor !== undefined && changableSubscriptionState.subscription_state !== 'Cancelled'? (
            <p style={{width:'80%'}}><span> {JSON.parse(localStorage.getItem('user')).privileges}</span> hase  Updated <span>{changableSubscriptionState.name} </span>Account</p>
          ) :changableSubscriptionState.instructor === null && changableSubscriptionState.instructor === undefined && changableSubscriptionState.subscription_state ===  "Pending"?(
            <p style={{width:'80%'}}><span> {JSON.parse(localStorage.getItem('user')).privileges}</span> hase  Changed <span>{changableSubscriptionState.name} </span> Subscription State and setting Started  Date and Instructor Successfully</p>
          ):changableSubscriptionState.subscription_state ===  "Cancelled"?(
            <p><span> {JSON.parse(localStorage.getItem('user')).privileges}</span> hase  Cancelled  <span>{changableSubscriptionState.name} </span> Account </p>
          ):null}
        </div>
      ) : null}
      {isUserDeleteAnyAccount? (
        <div className={StudentSubscriptionStyles["alert-container"]}>
          <img src={CircleGif} alt="successfull" />
          <span>
            <span style={{ fontWeight: "bold", color: "#038674" }}>
              {localStorage.getItem("user_name")}
            </span>{" "}
            Has Deleted  Student  Account Successfully
          </span>
        </div>
      ):null}
    </>
  );
};
export default StudentSubscriptionState;
