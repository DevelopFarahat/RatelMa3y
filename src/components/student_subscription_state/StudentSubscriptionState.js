import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import StudentSubscriptionStyles from "./StudentSubscriptionState.module.css";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { MdError, MdLteMobiledata } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { AiFillSetting } from "react-icons/ai";
import CircleGif from "../../assets/images/check-circle.gif";
import NoResultFiltaration from "../../assets/images/no-result.png";
import { ImUsers } from "react-icons/im";
import { FaCalendarTimes } from "react-icons/fa";
import updateImageIcon from "../../assets/images/update.png";
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from "react-i18next";
import { type } from "@testing-library/user-event/dist/type";
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
  const [t, i18n] = useTranslation();
  const days = [
    t("Saturday"),
    t("Sunday"),
    t("Monday"),
    t("Tuesday"),
    t("Wednesday"),
    t("Thursday"),
    t("Friday"),
  ];
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
  const [isUserMakingUpdateOnStudentAccount, setIsUserMakingUpdateOnStudentAccount] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const initialResponse = useRef();
  const [fetchAgain, setFetchAgain] = useState(0);
  const [studentStatus, setStudentStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [changableSubscriptionState, setChangableSubscriptionState] = useState(
    {}
  );
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isUserDeleteAnyAccount, setIsUserDeleteAnyAccount] = useState(false);
  const [typeOfProcess, setTypeOfProcess] = useState("");
  const [busyDaysHoursWarningAlert, setBusyDaysHoursWarningAlert] = useState(false);
  const [contentOfBusyDaysHoursWarningAlert, setContentOfBusyDaysHoursWarningAlert] = useState("");
  const [workingDays, setWorkingDays] = useState({
    d0: "",
    d1: "",
    d2: "",
    d3: "",
    d4: "",
    d5: "",
    d6: "",
  });
  const [prefsDays, setPrefsDays] = useState({
    d0: false,
    d1: false,
    d2: false,
    d3: false,
    d4: false,
    d5: false,
    d6: false,
  });
  const [stdBusyDays, setStdBusyDays] = useState({
    d0: false,
    d1: false,
    d2: false,
    d3: false,
    d4: false,
    d5: false,
    d6: false,
  });
  const [stdBusyHoursD0, setStdBusyHoursD0] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [stdBusyHoursD1, setStdBusyHoursD1] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [stdBusyHoursD2, setStdBusyHoursD2] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [stdBusyHoursD3, setStdBusyHoursD3] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [stdBusyHoursD4, setStdBusyHoursD4] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [stdBusyHoursD5, setStdBusyHoursD5] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [stdBusyHoursD6, setStdBusyHoursD6] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [prefsHoursD0, setPrefsHoursD0] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  });
  const [prefsHoursD1, setPrefsHoursD1] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  })
  const [prefsHoursD2, setPrefsHoursD2] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  })
  const [prefsHoursD3, setPrefsHoursD3] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  })
  const [prefsHoursD4, setPrefsHoursD4] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  })
  const [prefsHoursD5, setPrefsHoursD5] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
  })
  const [prefsHoursD6, setPrefsHoursD6] = useState({
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
    h7: false
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
    h7: false
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
    h7: false
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
    h7: false
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
    h7: false
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
    h7: false
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
    h7: false
  });
  const [nReservedSessionsByStdD0, setNReservedSessionsByStdD0] = useState({
    h0: 0,
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
    h7: 0
  });
  const [nReservedSessionsByStdD1, setNReservedSessionsByStdD1] = useState({
    h0: 0,
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
    h7: 0
  });
  const [nReservedSessionsByStdD2, setNReservedSessionsByStdD2] = useState({
    h0: 0,
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
    h7: 0
  });
  const [nReservedSessionsByStdD3, setNReservedSessionsByStdD3] = useState({
    h0: 0,
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
    h7: 0
  });
  const [nReservedSessionsByStdD4, setNReservedSessionsByStdD4] = useState({
    h0: 0,
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
    h7: 0
  });
  const [nReservedSessionsByStdD5, setNReservedSessionsByStdD5] = useState({
    h0: 0,
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
    h7: 0
  });
  const [nReservedSessionsByStdD6, setNReservedSessionsByStdD6] = useState({
    h0: 0,
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
    h7: 0
  });
  const [disabledCompletedHourReachedMaximumNumOfStdD0, setDisabledCompletedHourReachedMaximumNumOfStdD0] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false
  });
  const [disabledCompletedHourReachedMaximumNumOfStdD1, setDisabledCompletedHourReachedMaximumNumOfStdD1] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false
  });
  const [disabledCompletedHourReachedMaximumNumOfStdD2, setDisabledCompletedHourReachedMaximumNumOfStdD2] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false
  });
  const [disabledCompletedHourReachedMaximumNumOfStdD3, setDisabledCompletedHourReachedMaximumNumOfStdD3] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false
  });
  const [disabledCompletedHourReachedMaximumNumOfStdD4, setDisabledCompletedHourReachedMaximumNumOfStdD4] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false
  });
  const [disabledCompletedHourReachedMaximumNumOfStdD5, setDisabledCompletedHourReachedMaximumNumOfStdD5] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false
  });
  const [disabledCompletedHourReachedMaximumNumOfStdD6, setDisabledCompletedHourReachedMaximumNumOfStdD6] = useState({
    h0: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false
  });
  let Working_hours = [
    { id: 0, appointment:  `8:00 ${t("AM")}`, att: "h0" },
    { id: 1, appointment: `10:00 ${t("AM")}`, att: "h1" },
    { id: 2, appointment:  `12:00 ${t("PM")}`, att: "h2" },
    { id: 3, appointment: `2:00 ${t("PM")}`, att: "h3" },
    { id: 4, appointment: `4:00 ${t("PM")}`, att: "h4" },
    { id: 5, appointment:  `6:00 ${t("PM")}`, att: "h5" },
    { id: 6, appointment:  `8:00 ${t("PM")}`, att: "h6" },
    { id: 7, appointment: `10:00 ${t("PM")}`, att: "h7" },
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
     // ...checkedHoursD0,
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
     // ...checkedHoursD1,
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
     // ...checkedHoursD2,
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
      //...checkedHoursD3,
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
    //  ...checkedHoursD4,
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
     // ...checkedHoursD5,
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
      //...checkedHoursD6,
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
      handleAppointmentInDaysRadio(event);
    } else {
      setWorkingDays({
        ...workingDays,
        [`d${event.target.value}`]: "",
      });

      if(event.target.id === "d0"){
        setWorkingHoursD0({
          h0: "",
          h1: "",
          h2: "",
          h3: "",
          h4: "",
          h5: "",
          h6: "",
          h7: "",
        })
        setCheckedHoursD0({
          h0: false,
          h1: false,
          h2: false,
          h3: false,
          h4: false,
          h5: false,
          h6: false,
          h7: false,
        })
      }
      if(event.target.id === "d1"){
        setWorkingHoursD1({
          h0: "",
          h1: "",
          h2: "",
          h3: "",
          h4: "",
          h5: "",
          h6: "",
          h7: "",
        })
        setCheckedHoursD1({
          h0: false,
          h1: false,
          h2: false,
          h3: false,
          h4: false,
          h5: false,
          h6: false,
          h7: false,
        })
      }
      if(event.target.id === "d2"){
        setWorkingHoursD2({
          h0: "",
          h1: "",
          h2: "",
          h3: "",
          h4: "",
          h5: "",
          h6: "",
          h7: "",
        })
        setCheckedHoursD2({
          h0: false,
          h1: false,
          h2: false,
          h3: false,
          h4: false,
          h5: false,
          h6: false,
          h7: false,
        })
      }
      if(event.target.id === "d3"){
        setWorkingHoursD3({
          h0: "",
          h1: "",
          h2: "",
          h3: "",
          h4: "",
          h5: "",
          h6: "",
          h7: "",
        })
        setCheckedHoursD3({
          h0: false,
          h1: false,
          h2: false,
          h3: false,
          h4: false,
          h5: false,
          h6: false,
          h7: false,
        })
      }
      if(event.target.id === "d4"){
        setWorkingHoursD4({
          h0: "",
          h1: "",
          h2: "",
          h3: "",
          h4: "",
          h5: "",
          h6: "",
          h7: "",
        })
        setCheckedHoursD4({
          h0: false,
          h1: false,
          h2: false,
          h3: false,
          h4: false,
          h5: false,
          h6: false,
          h7: false,
        })
      }
      if(event.target.id === "d5"){
        setWorkingHoursD5({
          h0: "",
          h1: "",
          h2: "",
          h3: "",
          h4: "",
          h5: "",
          h6: "",
          h7: "",
        })
        setCheckedHoursD5({
          h0: false,
          h1: false,
          h2: false,
          h3: false,
          h4: false,
          h5: false,
          h6: false,
          h7: false,
        })
      }
      if(event.target.id === "d6"){
        setWorkingHoursD6({
          h0: "",
          h1: "",
          h2: "",
          h3: "",
          h4: "",
          h5: "",
          h6: "",
          h7: "",
        })
        setCheckedHoursD6({
          h0: false,
          h1: false,
          h2: false,
          h3: false,
          h4: false,
          h5: false,
          h6: false,
          h7: false,
        })
      }
    }
  };

  const [checkDaysRadio, setCheckDaysRadio] = useState({
    d0: false,
    d1: false,
    d2: false,
    d3: false,
    d4: false,
    d5: false,
    d6: false
  })
  const handleAppointmentInDaysRadio = (event) => {
    event.currentTarget.id === "d0" ?
      setCheckDaysRadio({
        d0: true,
        d1: false,
        d2: false,
        d3: false,
        d4: false,
        d5: false,
        d6: false
      }) : event.currentTarget.id === "d1" ? setCheckDaysRadio({
        d0: false,
        d1: true,
        d2: false,
        d3: false,
        d4: false,
        d5: false,
        d6: false
      }) : event.currentTarget.id === "d2" ? setCheckDaysRadio({
        d0: false,
        d1: false,
        d2: true,
        d3: false,
        d4: false,
        d5: false,
        d6: false
      }) : event.currentTarget.id === "d3" ? setCheckDaysRadio({
        d0: false,
        d1: false,
        d2: false,
        d3: true,
        d4: false,
        d5: false,
        d6: false
      }) : event.currentTarget.id === "d4" ? setCheckDaysRadio({
        d0: false,
        d1: false,
        d2: false,
        d3: false,
        d4: true,
        d5: false,
        d6: false
      }) : event.currentTarget.id === "d5" ? setCheckDaysRadio({
        d0: false,
        d1: false,
        d2: false,
        d3: false,
        d4: false,
        d5: true,
        d6: false
      }) : setCheckDaysRadio({
        d0: false,
        d1: false,
        d2: false,
        d3: false,
        d4: false,
        d5: false,
        d6: true
      })
  }

  const [studentConfiguration, setStudentConfiguration] = useState({
    studentStatus: "",
    studentInstructor: "",
    started_in: ''
  });
  const [errors, setErrors] = useState({
    statusError: "",
    instructorError: "",
    started_inError: ""
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
  const getTotalPresentAndAbsence = (stdData) => {





  }
  const toogleStudentStatus = (stdObject, event, index, process) => {
    if (stdObject.subscription_state !== "Cancelled") {

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
    let prefsSessionsDaysInitialObject = {};
    let prefsSessionsHoursInitialObject = {};
    for (let i = 0; i < stdObji.program_prefs.pref_days.length; i++) {
      if (stdObji.program_prefs.pref_days[i] !== -1) {
        prefsSessionsDaysInitialObject[`d${i}`] = true;
      } else {
        prefsSessionsDaysInitialObject[`d${i}`] = false;
      }
    }

    for (let i = 0; i < stdObji.program_prefs.pref_times_of_day.length; i++) {
      if (stdObji.program_prefs.pref_times_of_day[i][1] !== 0) {
        prefsSessionsHoursInitialObject[`h${i}`] = true;

      } else {
        prefsSessionsHoursInitialObject[`h${i}`] = false;

      }
    }
    for (let i = 0; i < stdObji.program_prefs.pref_days.length; i++) {
      if (stdObji.program_prefs.pref_days[i] !== -1) {
        if (i === 0) {
          setPrefsHoursD0(prefsSessionsHoursInitialObject);
        } else if (i === 1) {
          setPrefsHoursD1(prefsSessionsHoursInitialObject);
        } else if (i === 2) {
          setPrefsHoursD2(prefsSessionsHoursInitialObject);
        } else if (i === 3) {
          setPrefsHoursD3(prefsSessionsHoursInitialObject);
        } else if (i === 4) {
          setPrefsHoursD4(prefsSessionsHoursInitialObject);
        } else if (i === 5) {
          setPrefsHoursD5(prefsSessionsHoursInitialObject);
        } else {
          setPrefsHoursD6(prefsSessionsHoursInitialObject);
        }
      }
    }
    setPrefsDays(prefsSessionsDaysInitialObject);
    let stdBusyDaysInitialObji = {
      d0: false,
      d1: false,
      d2: false,
      d3: false,
      d4: false,
      d5: false,
      d6: false,
    };
    let stdBusyHoursD0InitialObji = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false,
    };
    let stdBusyHoursD1InitialObji = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false,
    };
    let stdBusyHoursD2InitialObji = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false,
    };
    let stdBusyHoursD3InitialObji = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false,
    };
    let stdBusyHoursD4InitialObji = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false,
    };
    let stdBusyHoursD5InitialObji = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false,
    };
    let stdBusyHoursD6InitialObji = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false,
    };
    for (let i = 0; i < Object.entries(stdObji.busy).length; i++) {
      if (Object.entries(stdObji.busy)[i][1].length !== 0) {
        stdBusyDaysInitialObji[`d${i}`] = true;
        for (let x = 0; x < Object.entries(stdObji.busy)[i][1].length; x++) {
          if (typeof Object.entries(stdObji.busy)[i][1][x] === 'object' && !Array.isArray(Object.entries(stdObji.busy)[i][1][x])) {
            if (i === 0)
              stdBusyHoursD0InitialObji[`h${x}`] = true;
            if (i === 1)
              stdBusyHoursD1InitialObji[`h${x}`] = true;
            if (i === 2)
              stdBusyHoursD2InitialObji[`h${x}`] = true;
            if (i === 3)
              stdBusyHoursD3InitialObji[`h${x}`] = true;
            if (i === 4)
              stdBusyHoursD4InitialObji[`h${x}`] = true;
            if (i === 5)
              stdBusyHoursD5InitialObji[`h${x}`] = true;
            if (i === 6)
              stdBusyHoursD6InitialObji[`h${x}`] = true;
          } else {
            if (i === 0)
              stdBusyHoursD0InitialObji[`h${x}`] = false;
            if (i === 1)
              stdBusyHoursD1InitialObji[`h${x}`] = false;
            if (i === 2)
              stdBusyHoursD2InitialObji[`h${x}`] = false;
            if (i === 3)
              stdBusyHoursD3InitialObji[`h${x}`] = false;
            if (i === 4)
              stdBusyHoursD4InitialObji[`h${x}`] = false;
            if (i === 5)
              stdBusyHoursD5InitialObji[`h${x}`] = false;
            if (i === 6)
              stdBusyHoursD6InitialObji[`h${x}`] = false;
          }
        }
      } else {
        stdBusyDaysInitialObji[`d${i}`] = false;
      }
    }

    setStdBusyDays(stdBusyDaysInitialObji);
    for (let i = 0; i < Object.entries(stdObji.busy).length; i++) {
      if (Object.entries(stdObji.busy)[i][1].length !== 0) {
        if (i === 0)
          setStdBusyHoursD0(stdBusyHoursD0InitialObji);
        if (i === 1)
          setStdBusyHoursD1(stdBusyHoursD1InitialObji);
        if (i === 2)
          setStdBusyHoursD2(stdBusyHoursD2InitialObji);
        if (i === 3)
          setStdBusyHoursD3(stdBusyHoursD3InitialObji);
        if (i === 4)
          setStdBusyHoursD4(stdBusyHoursD4InitialObji);
        if (i === 5)
          setStdBusyHoursD5(stdBusyHoursD5InitialObji);
        if (i === 6)
          setStdBusyHoursD6(stdBusyHoursD6InitialObji);
      }
    }
    gitInstructorOfSpecificStudentWorkingDaysAndHours(stdObji);

  };

  const gitInstructorOfSpecificStudentWorkingDaysAndHours = (stObj) => {
    let disabledDaysInitialObject = {};
    let disabledDaysRadioInitialObject = {};
    let disabledHoursInitialObject = {};
    let nSessionsReservedByStdD0InitialObject = {
      h0: 0,
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      h5: 0,
      h6: 0,
      h7: 0
    };
    let nSessionsReservedByStdD1InitialObject = {
      h0: 0,
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      h5: 0,
      h6: 0,
      h7: 0
    };
    let nSessionsReservedByStdD2InitialObject = {
      h0: 0,
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      h5: 0,
      h6: 0,
      h7: 0
    };
    let nSessionsReservedByStdD3InitialObject = {
      h0: 0,
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      h5: 0,
      h6: 0,
      h7: 0
    };
    let nSessionsReservedByStdD4InitialObject = {
      h0: 0,
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      h5: 0,
      h6: 0,
      h7: 0
    };
    let nSessionsReservedByStdD5InitialObject = {
      h0: 0,
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      h5: 0,
      h6: 0,
      h7: 0
    };
    let nSessionsReservedByStdD6InitialObject = {
      h0: 0,
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      h5: 0,
      h6: 0,
      h7: 0
    };
    let disabledCompletedHourReachedMaximumNumOfStdD0InitialObject = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false
    };
    let disabledCompletedHourReachedMaximumNumOfStdD1InitialObject = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false
    };
    let disabledCompletedHourReachedMaximumNumOfStdD2InitialObject = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false
    };
    let disabledCompletedHourReachedMaximumNumOfStdD3InitialObject = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false
    };
    let disabledCompletedHourReachedMaximumNumOfStdD4InitialObject = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false
    };
    let disabledCompletedHourReachedMaximumNumOfStdD5InitialObject = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false
    };
    let disabledCompletedHourReachedMaximumNumOfStdD6InitialObject = {
      h0: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      h7: false
    };

    axios
      .get(`${process.env.REACT_APP_BACK_HOST_URL}/api/instructors/${stObj.instructor}`)
      .then((res) => {
        for (let i = 0; i < res.data.prefs.working_days.length; i++) {
          if (res.data.prefs.working_days[i] === -1) {
            disabledDaysInitialObject[`d${i}`] = true;
            disabledDaysRadioInitialObject[`d${i}`] = true;
          } else {
            disabledDaysInitialObject[`d${i}`] = false;
            disabledDaysRadioInitialObject[`d${i}`] = false;
          }
          for (let x = 0; x < Object.entries(res.data.busy)[i][1].length; x++) {
            if (typeof Object.entries(res.data.busy)[i][1][x] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][x])) {
              let max = Object.entries(res.data.busy)[i][1][x].max;
              if (i === 0) {
                nSessionsReservedByStdD0InitialObject[`h${x}`] = max;
                if (max === 8) {
                  disabledCompletedHourReachedMaximumNumOfStdD0InitialObject[`h${x}`] = true;
                } else {
                  disabledCompletedHourReachedMaximumNumOfStdD0InitialObject[`h${x}`] = false;
                }
              }

              if (i === 1) {
                nSessionsReservedByStdD1InitialObject[`h${x}`] = max;
                if (max === 8) {
                  disabledCompletedHourReachedMaximumNumOfStdD1InitialObject[`h${x}`] = true;
                } else {
                  disabledCompletedHourReachedMaximumNumOfStdD1InitialObject[`h${x}`] = false;
                }
              }

              if (i === 2) {
                nSessionsReservedByStdD2InitialObject[`h${x}`] = max;
                if (max === 8) {
                  disabledCompletedHourReachedMaximumNumOfStdD2InitialObject[`h${x}`] = true;
                } else {
                  disabledCompletedHourReachedMaximumNumOfStdD2InitialObject[`h${x}`] = false;
                }
              }

              if (i === 3) {
                nSessionsReservedByStdD3InitialObject[`h${x}`] = max;
                if (max === 8) {
                  disabledCompletedHourReachedMaximumNumOfStdD3InitialObject[`h${x}`] = true;
                } else {
                  disabledCompletedHourReachedMaximumNumOfStdD3InitialObject[`h${x}`] = false;
                }
              }

              if (i === 4) {
                nSessionsReservedByStdD4InitialObject[`h${x}`] = max;
                if (max === 8) {
                  disabledCompletedHourReachedMaximumNumOfStdD4InitialObject[`h${x}`] = true;
                } else {
                  disabledCompletedHourReachedMaximumNumOfStdD4InitialObject[`h${x}`] = false;
                }
              }

              if (i === 5) {
                nSessionsReservedByStdD5InitialObject[`h${x}`] = max;
                if (max === 8) {
                  disabledCompletedHourReachedMaximumNumOfStdD5InitialObject[`h${x}`] = true;
                } else {
                  disabledCompletedHourReachedMaximumNumOfStdD5InitialObject[`h${x}`] = false;
                }
              }

              if (i === 6) {
                nSessionsReservedByStdD6InitialObject[`h${x}`] = max;
                if (max === 8) {
                  disabledCompletedHourReachedMaximumNumOfStdD6InitialObject[`h${x}`] = true;
                } else {
                  disabledCompletedHourReachedMaximumNumOfStdD6InitialObject[`h${x}`] = false;
                }
              }

            } else {
              if (i === 0) {
                nSessionsReservedByStdD0InitialObject[`h${x}`] = 0;
                disabledCompletedHourReachedMaximumNumOfStdD0InitialObject[`h${x}`] = false;
              }

              if (i === 1) {
                nSessionsReservedByStdD1InitialObject[`h${x}`] = 0;
                disabledCompletedHourReachedMaximumNumOfStdD1InitialObject[`h${x}`] = false;
              }

              if (i === 2) {
                nSessionsReservedByStdD2InitialObject[`h${x}`] = 0;
                disabledCompletedHourReachedMaximumNumOfStdD2InitialObject[`h${x}`] = false;
              }

              if (i === 3) {
                nSessionsReservedByStdD3InitialObject[`h${x}`] = 0;
                disabledCompletedHourReachedMaximumNumOfStdD3InitialObject[`h${x}`] = false;
              }

              if (i === 4) {
                nSessionsReservedByStdD4InitialObject[`h${x}`] = 0;
                disabledCompletedHourReachedMaximumNumOfStdD4InitialObject[`h${x}`] = false;
              }

              if (i === 5) {
                nSessionsReservedByStdD5InitialObject[`h${x}`] = 0;
                disabledCompletedHourReachedMaximumNumOfStdD5InitialObject[`h${x}`] = false;
              }

              if (i === 6) {
                nSessionsReservedByStdD6InitialObject[`h${x}`] = 0;
                disabledCompletedHourReachedMaximumNumOfStdD6InitialObject[`h${x}`] = false;
              }

            }
          }
          if (res.data.prefs.working_days[i] !== -1) {
            if (i === 0) {
              setNReservedSessionsByStdD0(nSessionsReservedByStdD0InitialObject);
              setDisabledCompletedHourReachedMaximumNumOfStdD0(disabledCompletedHourReachedMaximumNumOfStdD0InitialObject);
            }

            if (i === 1) {
              setNReservedSessionsByStdD1(nSessionsReservedByStdD1InitialObject);
              setDisabledCompletedHourReachedMaximumNumOfStdD1(disabledCompletedHourReachedMaximumNumOfStdD1InitialObject);
            }

            if (i === 2) {
              setNReservedSessionsByStdD2(nSessionsReservedByStdD2InitialObject);
              setDisabledCompletedHourReachedMaximumNumOfStdD2(disabledCompletedHourReachedMaximumNumOfStdD2InitialObject);
            }

            if (i === 3) {
              setNReservedSessionsByStdD3(nSessionsReservedByStdD3InitialObject);
              setDisabledCompletedHourReachedMaximumNumOfStdD3(disabledCompletedHourReachedMaximumNumOfStdD3InitialObject);
            }

            if (i === 4) {
              setNReservedSessionsByStdD4(nSessionsReservedByStdD4InitialObject);
              setDisabledCompletedHourReachedMaximumNumOfStdD4(disabledCompletedHourReachedMaximumNumOfStdD4InitialObject);
            }

            if (i === 5) {
              setNReservedSessionsByStdD5(nSessionsReservedByStdD5InitialObject);
              setDisabledCompletedHourReachedMaximumNumOfStdD5(disabledCompletedHourReachedMaximumNumOfStdD5InitialObject);
            }

            if (i === 6) {
              setNReservedSessionsByStdD6(nSessionsReservedByStdD6InitialObject);
              setDisabledCompletedHourReachedMaximumNumOfStdD6(disabledCompletedHourReachedMaximumNumOfStdD6InitialObject);
            }

          }
        }
        for (let i = 0; i < res.data.prefs.working_hours.length; i++) {
          if (res.data.prefs.working_hours[i][1] === 0) {
            disabledHoursInitialObject[`h${i}`] = true;
          } else {
            disabledHoursInitialObject[`h${i}`] = false;
          }
        }
        for (let i = 0; i < res.data.prefs.working_days.length; i++) {
          if (res.data.prefs.working_days[i] !== -1) {
            if (i === 0) {
              setDisabledHoursD0(disabledHoursInitialObject);
            } else if (i === 1) {
              setDisabledHoursD1(disabledHoursInitialObject);
            } else if (i === 2) {
              setDisabledHoursD2(disabledHoursInitialObject);
            } else if (i === 3) {
              setDisabledHoursD3(disabledHoursInitialObject);
            } else if (i === 4) {
              setDisabledHoursD4(disabledHoursInitialObject);
            } else if (i === 5) {
              setDisabledHoursD5(disabledHoursInitialObject);
            } else {
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
      started_in: ""
    });
    setBusyDaysHoursWarningAlert(false);
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
      d0: "",
      d1: "",
      d2: "",
      d3: "",
      d4: "",
      d5: "",
      d6: "",
    })
    setCheckedDays({
      d0: false,
      d1: false,
      d2: false,
      d3: false,
      d4: false,
      d5: false,
      d6: false,
    })
    setCheckDaysRadio({
      d0: false,
      d1: false,
      d2: false,
      d3: false,
      d4: false,
      d5: false,
      d6: false,
    })
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
        statusError: value === "" ? t("keepintouch_required") : null,
      });
    } else if (field === "studentInstructor") {
      setErrors({
        ...errors,
        instructorError: value === "" ? t("keepintouch_required")  : null,
      });
    }
    else if (field === "started_in") {
      setErrors({
        ...errors,
        started_inError: value === "" ? t("keepintouch_required")  : null,
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    changeSubscriptionState();
  };
  const getStudentRatelMa3yJoiningRequestData = (stdObji, event) => {
    axios
      .get(`${process.env.REACT_APP_BACK_HOST_URL}/api/students/${stdObji._id}`)
      .then((res) => {
        // initialSpecificStudentJoiningRequestData.current = res.data;
        setSpecificStudentJoiningRequestData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(`${process.env.REACT_APP_BACK_HOST_URL}/api/sessions?user_id=${stdObji._id}&limit=10000000000000000`).then((res) => {
      initialStudentSessionsDetails.current = res.data.data;
      setStudentSessionsDetails(res.data.data);
    }).catch((error) => {
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
    axios.get(`${process.env.REACT_APP_BACK_HOST_URL}/api/students?limit=300&page=${currentPage}`).then(
      (res) => {
        initialResponse.current = res.data.data;
        setStudentData(res.data.data);
        let pageN = Math.ceil(res.data.count / 300);
        let numOfPages = [];
        for (let i = 0; i < pageN; i++) {
          numOfPages.push({ id: i + 1, index: i + 1 });
        }
        setPageNoCopy(numOfPages);
        setLastPage(numOfPages[numOfPages.length - 1]);
        numOfPages.reverse().splice(numOfPages[numOfPages.length - 1], 1);
        setPageNoArrLength(numOfPages.length);
        setPageNo(numOfPages.reverse());
      },
      (error) => {
        console.log(error);
      }

    );
    axios
      .get(`${process.env.REACT_APP_BACK_HOST_URL}/api/instructors?limit=10000000000`)
      .then((instructorRes) => {
        setInstructorData(instructorRes.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchAgain, currentPage]);
  const changeSubscriptionState = (event) => {
    if (studentConfiguration.studentStatus !== "Cancelled" && changableSubscriptionState.instructor === undefined && changableSubscriptionState.started_in === null) {
      setIsUserMakingUpdateOnStudentAccount(true);
      axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/students/${changableSubscriptionState._id}`,
          {
            "subscription_state": studentConfiguration.studentStatus,
            "instructor": studentConfiguration.studentInstructor,
            "started_in": studentConfiguration.started_in
          }
        )
        .then((res) => {
          setStudentStatus((current) => !current);
          setStudentConfiguration({
            studentStatus: "",
            studentInstructor: "",
            started_in: ""
          });
          setIsUserMakingUpdateOnStudentAccount(false);
          setFetchAgain(fetchAgain + 1);
          distroyAlert();
          getStudentRatelMa3yJoiningRequestData(changableSubscriptionState, event);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (studentConfiguration.studentStatus !== "Cancelled" && changableSubscriptionState.instructor === null) {
      setIsUserMakingUpdateOnStudentAccount(true);
      axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/students/${changableSubscriptionState._id}`,
      {
        subscription_state: studentConfiguration.studentStatus !== ""?studentConfiguration.studentStatus:changableSubscriptionState.subscription_state,
        instructor: studentConfiguration.studentInstructor !== ""?studentConfiguration.studentInstructor:changableSubscriptionState.instructor
      }
    )
    .then((res) => {
      setStudentStatus((current) => !current);
      setStudentConfiguration({
        studentStatus: "",
        studentInstructor: "",
        started_in: ""
      });
      setIsUserMakingUpdateOnStudentAccount(false);
      setFetchAgain(fetchAgain + 1);
      distroyAlert();
      getStudentRatelMa3yJoiningRequestData(changableSubscriptionState, event);
    })
    .catch((error) => {
      console.log(error);
    });

  
    }else if (studentConfiguration.studentStatus !== "Cancelled" && (changableSubscriptionState.instructor !== undefined && changableSubscriptionState.instructor !== null)){
      setIsUserMakingUpdateOnStudentAccount(true);
      if(studentConfiguration.studentInstructor !== ''){
       handleStudentBusyOnInstructor(changableSubscriptionState);
          axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/students/${changableSubscriptionState._id}`,
          {
            subscription_state: studentConfiguration.studentStatus !== '' ? studentConfiguration.studentStatus : changableSubscriptionState.subscription_state,
            instructor:  studentConfiguration.studentInstructor
          }
        )
        .then((res) => {
          console.log("yes res");
          setStudentStatus((current) => !current);
          setStudentConfiguration({
            studentStatus: "",
            studentInstructor: "",
            started_in: ""
          });
          setIsUserMakingUpdateOnStudentAccount(false);
          distroyAlert();
          setFetchAgain(fetchAgain + 1);
          getStudentRatelMa3yJoiningRequestData(changableSubscriptionState, event);
        })
        .catch((error) => {
          console.log(error);
        });
        }else{
          axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/students/${changableSubscriptionState._id}`,
          {
            subscription_state: studentConfiguration.studentStatus !== '' ? studentConfiguration.studentStatus : changableSubscriptionState.subscription_state,
            instructor: changableSubscriptionState.instructor
          }
        )
        .then((res) => {
          setStudentStatus((current) => !current);
          setStudentConfiguration({
            studentStatus: "",
            studentInstructor: "",
            started_in: ""
          });
          setIsUserMakingUpdateOnStudentAccount(false);
          distroyAlert();
          setFetchAgain(fetchAgain + 1);
          getStudentRatelMa3yJoiningRequestData(changableSubscriptionState, event);
        })
  
        .catch((error) => {
          console.log(error);
        });
        }

    } else {
      setIsUserMakingUpdateOnStudentAccount(true);
        if(changableSubscriptionState.instructor !== null && changableSubscriptionState.instructor !== undefined){
          handleStudentBusyOnInstructor(changableSubscriptionState);
        }
        axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/students/${changableSubscriptionState._id}`,
        {
          subscription_state: studentConfiguration.studentStatus,
          instructor: null

        }
      )
      .then((res) => {
        setStudentStatus((current) => !current);
        setStudentConfiguration({
          studentStatus: "",
          studentInstructor: "",
          started_in: ""
        });
        setIsUserMakingUpdateOnStudentAccount(false);
        distroyAlert();
        setFetchAgain(fetchAgain + 1);
        getStudentRatelMa3yJoiningRequestData(changableSubscriptionState, event);
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
        // if(instructorData[i].prefs.working_days[j] !== -1){
        if (instructorData[i].prefs.working_days[j] === Number(Object.entries(instructorData[i].busy)[j][0])) {
          avaliableDayaHours[j] = [];
          //hours
          if (Object.entries(instructorData[i].busy)[j][1].length === 0) {
            for (let x = 0; x < instructorData[i].prefs.working_hours.length; x++) {
              if (instructorData[i].prefs.working_hours[x][1] !== 0) {
                avaliableDayaHours[j].push([0, 0]);
              } else {
                avaliableDayaHours[j].push([-1, -1]);
              }
            }
          } else {
            for (let insIndex = 0; insIndex < instructorData[i].prefs.working_hours.length; insIndex++) {
              if (typeof Object.entries(instructorData[i].busy)[j][1][insIndex] === 'object' && !Array.isArray(Object.entries(instructorData[i].busy)[j][1][insIndex])) {
                if (instructorData[i].prefs.working_hours[insIndex][1] !== 0 && Object.entries(instructorData[i].busy)[j][1][insIndex].max < 8) {
                  avaliableDayaHours[j].push([0, 0]);
                } else {
                  avaliableDayaHours[j].push([0, 1]);
                }
              } else {
                if (instructorData[i].prefs.working_hours[insIndex][1] !== 0 && Object.entries(instructorData[i].busy)[j][1][insIndex][1] === 0) {
                  avaliableDayaHours[j].push([0, 0]);
                } else {
                  avaliableDayaHours[j].push([-1, -1]);
                }
              }

            }
          }

        } else {
          avaliableDayaHours[j] = [];
        }
      }

      for (let x = 0; x < Object.entries(avaliableDayaHours).length; x++) {

        if (studentObject.program_prefs.pref_days[x] === Number(Object.entries(avaliableDayaHours)[x][0])) {
          matchedDays.push(true);
          if (Object.entries(avaliableDayaHours)[x][1].length !== 0) {
            for (let prefHoursIndex = 0; prefHoursIndex < studentObject.program_prefs.pref_times_of_day.length; prefHoursIndex++) {
              if (studentObject.program_prefs.pref_times_of_day[prefHoursIndex][1] !== 0) {
                if (studentObject.program_prefs.pref_times_of_day[prefHoursIndex][1] === 1 && Object.entries(avaliableDayaHours)[x][1][prefHoursIndex][1] === 0) {
                  if (matchedHours[prefHoursIndex] === undefined)
                    matchedHours[prefHoursIndex] = true;
                } else {
                  if (matchedHours[prefHoursIndex] === undefined)
                    matchedHours[prefHoursIndex] = false;
                }
              }
            }
          }
        } else {
          matchedDays.push(false);
        }
      }
      if ((matchedDays.filter((mD) => mD === true).length >= Number(studentObject.program_prefs.sessions_in_week)) && (matchedHours.filter((mH) => mH === true).length >= Number(studentObject.program_prefs.sessions_in_week)||matchedHours.filter((mH) => mH === true).length <= Number(studentObject.program_prefs.sessions_in_week))) {
        recommendedInstructors.push(instructorData[i]);
        matchedDays = [];
        matchedHours = [];
        avaliableDayaHours = {};
      }
      else {
        matchedDays = [];
        matchedHours = [];
        avaliableDayaHours = {};
      }

    }
    setRecommendedInstructorsData(recommendedInstructors);
  };
  const changeStudentSessionsDayHours = (event) => {
    let wD = [];
    let stdwHoursD0 = [];
    let stdwHoursD1 = [];
    let stdwHoursD2 = [];
    let stdwHoursD3 = [];
    let stdwHoursD4 = [];
    let stdwHoursD5 = [];
    let stdwHoursD6 = [];
    let stdwHoursD0_std_busy = [];
    let stdwHoursD1_std_busy = [];
    let stdwHoursD2_std_busy = [];
    let stdwHoursD3_std_busy = [];
    let stdwHoursD4_std_busy = [];
    let stdwHoursD5_std_busy = [];
    let stdwHoursD6_std_busy = [];
    let previousReservedHoursD0 = [];
    let previousReservedHoursD1 = [];
    let previousReservedHoursD2 = [];
    let previousReservedHoursD3 = [];
    let previousReservedHoursD4 = [];
    let previousReservedHoursD5 = [];
    let previousReservedHoursD6 = [];
    let NumberOfSelectedDays = 0;
    let selectedDaysArr = [];
    let isStudentIdExistInAnotherDay = false

    for (let i = 0; i < Object.values(workingDays).length; i++) {

      if (Object.values(workingDays)[i] === "") {
        let emptyWorkingDayInitialValue = (Object.values(workingDays)[i]) = -1;
        wD.push(emptyWorkingDayInitialValue);
      } else {
        wD.push(Number(Object.values(workingDays)[i]));
        NumberOfSelectedDays += 1;
        selectedDaysArr.push(Number(Object.values(workingDays)[i]));

      }

    }
    for (let i = 0; i < Object.values(WorkingHoursD0).length; i++) {
      if (Object.values(WorkingHoursD0)[i] === "") {
        let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD0)[i] = [
          0, 0,
        ]);
        stdwHoursD0.push(emptyWorkingHourInitialValue);
        stdwHoursD0_std_busy.push(emptyWorkingHourInitialValue);
      } else {
        //stdwHoursD0.push(Object.values(WorkingHoursD0)[i]);
        stdwHoursD0.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
        stdwHoursD0_std_busy.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
      }
    }
    for (let i = 0; i < Object.values(WorkingHoursD1).length; i++) {
      if (Object.values(WorkingHoursD1)[i] === "") {
        let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD1)[i] = [
          0, 0,
        ]);
        stdwHoursD1.push(emptyWorkingHourInitialValue);
        stdwHoursD1_std_busy.push(emptyWorkingHourInitialValue);
      } else {
        // stdwHoursD1.push(Object.values(WorkingHoursD1)[i]);
        stdwHoursD1.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
        stdwHoursD1_std_busy.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
      }
    }
    for (let i = 0; i < Object.values(WorkingHoursD2).length; i++) {
      if (Object.values(WorkingHoursD2)[i] === "") {
        let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD2)[i] = [
          0, 0,
        ]);
        stdwHoursD2.push(emptyWorkingHourInitialValue);
        stdwHoursD2_std_busy.push(emptyWorkingHourInitialValue);
      } else {
        // stdwHoursD2.push(Object.values(WorkingHoursD2)[i]);
        stdwHoursD2.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
        stdwHoursD2_std_busy.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
      }
    }
    for (let i = 0; i < Object.values(WorkingHoursD3).length; i++) {
      if (Object.values(WorkingHoursD3)[i] === "") {
        let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD3)[i] = [
          0, 0,
        ]);
        stdwHoursD3.push(emptyWorkingHourInitialValue);
        stdwHoursD3_std_busy.push(emptyWorkingHourInitialValue);
      } else {
        //stdwHoursD3.push(Object.values(WorkingHoursD3)[i]);
        stdwHoursD3.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
        stdwHoursD3_std_busy.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
      }
    }
    for (let i = 0; i < Object.values(WorkingHoursD4).length; i++) {
      if (Object.values(WorkingHoursD4)[i] === "") {
        let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD4)[i] = [
          0, 0,
        ]);
        stdwHoursD4.push(emptyWorkingHourInitialValue);
        stdwHoursD4_std_busy.push(emptyWorkingHourInitialValue);
      } else {
        //stdwHoursD4.push(Object.values(WorkingHoursD4)[i]);
        stdwHoursD4.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
        stdwHoursD4_std_busy.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
      }
    }
    for (let i = 0; i < Object.values(WorkingHoursD5).length; i++) {
      if (Object.values(WorkingHoursD5)[i] === "") {
        let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD5)[i] = [
          0, 0,
        ]);
        stdwHoursD5.push(emptyWorkingHourInitialValue);
        stdwHoursD5_std_busy.push(emptyWorkingHourInitialValue);
      } else {
        // stdwHoursD5.push(Object.values(WorkingHoursD5)[i]);
        stdwHoursD5.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
        stdwHoursD5_std_busy.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
      }
    }
    for (let i = 0; i < Object.values(WorkingHoursD6).length; i++) {
      if (Object.values(WorkingHoursD6)[i] === "") {
        let emptyWorkingHourInitialValue = (Object.values(WorkingHoursD6)[i] = [
          0, 0,
        ]);
        stdwHoursD6.push(emptyWorkingHourInitialValue);
        stdwHoursD6_std_busy.push(emptyWorkingHourInitialValue);
      } else {
        // stdwHoursD6.push(Object.values(WorkingHoursD6)[i]);
        stdwHoursD6.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
        stdwHoursD6_std_busy.push({ "stdIds": [changableSubscriptionState._id], "max": 1 })
      }
    }
    let studentBusy = {};
    for (let i = 0; i < wD.length; i++) {
      if (Number(Object.keys(changableSubscriptionState.busy)[i]) === wD[i]) {
        if (i === 0)
          studentBusy[`${i}`] = stdwHoursD0_std_busy;
        if (i === 1)
          studentBusy[`${i}`] = stdwHoursD1_std_busy;
        if (i === 2)
          studentBusy[`${i}`] = stdwHoursD2_std_busy;
        if (i === 3)
          studentBusy[`${i}`] = stdwHoursD3_std_busy;
        if (i === 4)
          studentBusy[`${i}`] = stdwHoursD4_std_busy;
        if (i === 5)
          studentBusy[`${i}`] = stdwHoursD5_std_busy;
        if (i === 6)
          studentBusy[`${i}`] = stdwHoursD6_std_busy;
      } else {
        studentBusy[`${i}`] = [];
      }
    }
    let instructorBusy = {};

    axios.get(`${process.env.REACT_APP_BACK_HOST_URL}/api/instructors/${changableSubscriptionState.instructor}`).then((res) => {
      let getThePreviuosReservedSessionsDaysHours = (arr0,arr1,arr2,arr3,arr4,arr5,arr6,SelectedDayIndex)=>{
        for(let busyIndex = 0 ; busyIndex < Object.entries(res.data.busy).length;busyIndex++){
          for(let busyDayIndex = 0 ; busyDayIndex < Object.entries(res.data.busy)[busyIndex][1].length;busyDayIndex++){
            if(busyIndex !== SelectedDayIndex){
              if(typeof Object.entries(res.data.busy)[busyIndex][1][busyDayIndex] === 'object' && !Array.isArray(Object.entries(res.data.busy)[busyIndex][1][busyDayIndex])){
                for(let hIndex = 0 ; hIndex < Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]['stdIds'].length;hIndex++){
                  if(Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]['stdIds'][hIndex] === changableSubscriptionState._id){
                  if(Object.entries(res.data.busy)[busyIndex][1][busyDayIndex].max > 1){
                    let previouslyStdIds = [...Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]['stdIds']]
                    previouslyStdIds.splice(hIndex, 1);
                    let max = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex].max;
                    max -= 1;
                    if(busyIndex === 0)
                    arr0[busyDayIndex] = {"stdIds": previouslyStdIds, "max": max }
                    if(busyIndex === 1)
                    arr1[busyDayIndex] = {"stdIds": previouslyStdIds, "max": max }
                    if(busyIndex === 2)
                    arr2[busyDayIndex] = {"stdIds": previouslyStdIds, "max": max }
                    if(busyIndex === 3)
                    arr3[busyDayIndex] = {"stdIds": previouslyStdIds, "max": max }
                    if(busyIndex === 4)
                    arr4[busyDayIndex] = {"stdIds": previouslyStdIds, "max": max }
                    if(busyIndex === 5)
                    arr5[busyDayIndex] = {"stdIds": previouslyStdIds, "max": max }
                    if(busyIndex === 6)
                    arr6[busyDayIndex] = {"stdIds": previouslyStdIds, "max": max }
                  }else{
                    if(busyIndex === 0)
                    arr0[busyDayIndex] = [0,0]
                    if(busyIndex === 1)
                    arr1[busyDayIndex] = [0,0]
                    if(busyIndex === 2)
                    arr2[busyDayIndex] = [0,0]
                    if(busyIndex === 3)
                    arr3[busyDayIndex] = [0,0]
                    if(busyIndex === 4)
                    arr4[busyDayIndex] = [0,0]
                    if(busyIndex === 5)
                    arr5[busyDayIndex] = [0,0]
                    if(busyIndex === 6)
                    arr6[busyDayIndex] = [0,0]
                  }
                  }else{
                    if(busyIndex === 0)
                    arr0[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                    if(busyIndex === 1)
                    arr1[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                    if(busyIndex === 2)
                    arr2[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                    if(busyIndex === 3)
                    arr3[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                    if(busyIndex === 4)
                    arr4[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                    if(busyIndex === 5)
                    arr5[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                    if(busyIndex === 6)
                    arr6[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                  }
                }
              }else{
                if(busyIndex === 0)
                arr0[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                if(busyIndex === 1)
                arr1[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                if(busyIndex === 2)
                arr2[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                if(busyIndex === 3)
                arr3[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                if(busyIndex === 4)
                arr4[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                if(busyIndex === 5)
                arr5[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
                if(busyIndex === 6)
                arr6[busyDayIndex] = Object.entries(res.data.busy)[busyIndex][1][busyDayIndex]
              }
          }
        }
      }
    }
      for (let i = 0; i < wD.length; i++) {
        if (Number(Object.keys(res.data.busy)[i]) === wD[i]) {
          for (let x = 0; x < res.data.prefs.working_hours.length; x++) {
            if (res.data.prefs.working_hours[x][1] === 0) {
              stdwHoursD0[x] = [-1, -1];
              stdwHoursD1[x] = [-1, -1];
              stdwHoursD2[x] = [-1, -1];
              stdwHoursD3[x] = [-1, -1];
              stdwHoursD4[x] = [-1, -1];
              stdwHoursD5[x] = [-1, -1];
              stdwHoursD6[x] = [-1, -1];
            }
          }
          if (i === 0) {
            if (Object.entries(res.data.busy)[i][1].find((obji) => typeof obji === 'object' && !Array.isArray(obji)) !== undefined ) {
              for (let c = 0; c < Object.entries(res.data.busy)[i][1].length; c++) {
                if (typeof Object.entries(res.data.busy)[i][1][c] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][c])) {
                  if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) === undefined && (typeof stdwHoursD0[c] === 'object' && !Array.isArray(stdwHoursD0[c]))) {
                    let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                    previouslyStdIds.push(changableSubscriptionState._id);
                    let max = Object.entries(res.data.busy)[i][1][c].max;
                    max += 1;
                    stdwHoursD0[c] = { "stdIds": previouslyStdIds, "max": max }
                  }else{
                    for(let stdwHoursD0Index = 0 ;stdwHoursD0Index < stdwHoursD0.length;stdwHoursD0Index++ ){
                      if(typeof stdwHoursD0[stdwHoursD0Index] === 'object' && !Array.isArray(stdwHoursD0[stdwHoursD0Index])){
                        if(stdwHoursD0Index === c){
                          if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) !== undefined) {
                            let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                            let max = Object.entries(res.data.busy)[i][1][c].max;
                            stdwHoursD0[c] = { "stdIds": previouslyStdIds, "max": max }
                          }
                        }else{
                          for(let sId = 0 ; sId < Object.entries(res.data.busy)[i][1][c]['stdIds'].length;sId++){
                            if(Object.entries(res.data.busy)[i][1][c]['stdIds'][sId] === changableSubscriptionState._id){
                              if(Object.entries(res.data.busy)[i][1][c].max > 1){
                                let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']]
                                previouslyStdIds.splice(sId, 1);
                                let max = Object.entries(res.data.busy)[i][1][c].max;
                                max -= 1;
                                stdwHoursD0[c] = { "stdIds": previouslyStdIds, "max": max }
                              }else{
                                stdwHoursD0[c] = [0,0];
                              }
                            
                            }else{
                              stdwHoursD0[c] = Object.entries(res.data.busy)[i][1][c];
                            }
                          }
                        }
                      }
                    }
                  }

                }else{
                  if (stdwHoursD0[c][1] === 0)
                  stdwHoursD0[c] = Object.entries(res.data.busy)[i][1][c];
                }
              }
              instructorBusy[`${i}`] = stdwHoursD0;

            } else {
              instructorBusy[`${i}`] = stdwHoursD0;
            }
                // delete reserved session days and hours if the admin change the days of the session
                getThePreviuosReservedSessionsDaysHours(previousReservedHoursD0,previousReservedHoursD1,previousReservedHoursD2,previousReservedHoursD3,previousReservedHoursD4,previousReservedHoursD5,previousReservedHoursD6,0);
          }

          if (i === 1) {
            if (Object.entries(res.data.busy)[i][1].find((obji) => typeof obji === 'object' && !Array.isArray(obji)) !== undefined ) {
              for (let c = 0; c < Object.entries(res.data.busy)[i][1].length; c++) {
                if (typeof Object.entries(res.data.busy)[i][1][c] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][c])) {
                  if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) === undefined && (typeof stdwHoursD1[c] === 'object' && !Array.isArray(stdwHoursD1[c]))) {
                    let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                    previouslyStdIds.push(changableSubscriptionState._id);
                    let max = Object.entries(res.data.busy)[i][1][c].max;
                    max += 1;
                    stdwHoursD1[c] = { "stdIds": previouslyStdIds, "max": max }
                  }else{
                    for(let stdwHoursD1Index = 0 ;stdwHoursD1Index < stdwHoursD1.length;stdwHoursD1Index++ ){
                      if(typeof stdwHoursD1[stdwHoursD1Index] === 'object' && !Array.isArray(stdwHoursD1[stdwHoursD1Index])){
                        if(stdwHoursD1Index === c){
                          if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) !== undefined) {
                            let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                            let max = Object.entries(res.data.busy)[i][1][c].max;
                            stdwHoursD1[c] = { "stdIds": previouslyStdIds, "max": max }
                          }
                        }else{
                          for(let sId = 0 ; sId < Object.entries(res.data.busy)[i][1][c]['stdIds'].length;sId++){
                            if(Object.entries(res.data.busy)[i][1][c]['stdIds'][sId] === changableSubscriptionState._id){
                              if(Object.entries(res.data.busy)[i][1][c].max > 1){
                                let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']]
                                previouslyStdIds.splice(sId, 1);
                                let max = Object.entries(res.data.busy)[i][1][c].max;
                                max -= 1;
                                stdwHoursD1[c] = { "stdIds": previouslyStdIds, "max": max }
                              }else{
                                stdwHoursD1[c] = [0,0]
                              }
                            }else{
                              stdwHoursD1[c] = Object.entries(res.data.busy)[i][1][c];
                            }
                          }
                        }
  
                      }
                    }
                  }

                }else{
                  if (stdwHoursD1[c][1] === 0)
                  stdwHoursD1[c] = Object.entries(res.data.busy)[i][1][c];
                }

              }
              instructorBusy[`${i}`] = stdwHoursD1;

            } else {
              instructorBusy[`${i}`] = stdwHoursD1;
            }
                            // delete reserved session days and hours if the admin change the days of the session
                            getThePreviuosReservedSessionsDaysHours(previousReservedHoursD0,previousReservedHoursD1,previousReservedHoursD2,previousReservedHoursD3,previousReservedHoursD4,previousReservedHoursD5,previousReservedHoursD6,1);
          }

          if (i === 2) {
            if (Object.entries(res.data.busy)[i][1].find((obji) => typeof obji === 'object' && !Array.isArray(obji)) !== undefined ) {
              for (let c = 0; c < Object.entries(res.data.busy)[i][1].length; c++) {
                if (typeof Object.entries(res.data.busy)[i][1][c] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][c])) {
                  if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) === undefined && (typeof stdwHoursD2[c] === 'object' && !Array.isArray(stdwHoursD2[c]))) {
                    let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                    previouslyStdIds.push(changableSubscriptionState._id);
                    let max = Object.entries(res.data.busy)[i][1][c].max;
                    max += 1;
                    stdwHoursD2[c] = { "stdIds": previouslyStdIds, "max": max }
                  }else{
                    for(let stdwHoursD2Index = 0 ;stdwHoursD2Index < stdwHoursD2.length;stdwHoursD2Index++ ){
                      if(typeof stdwHoursD2[stdwHoursD2Index] === 'object' && !Array.isArray(stdwHoursD2[stdwHoursD2Index])){
                        if(stdwHoursD2Index === c){
                          if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) !== undefined) {
                            let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                            let max = Object.entries(res.data.busy)[i][1][c].max;
                            stdwHoursD2[c] = { "stdIds": previouslyStdIds, "max": max }
                          }
                        }else{
                          for(let sId = 0 ; sId < Object.entries(res.data.busy)[i][1][c]['stdIds'].length;sId++){
                            if(Object.entries(res.data.busy)[i][1][c]['stdIds'][sId] === changableSubscriptionState._id){
                              if(Object.entries(res.data.busy)[i][1][c].max > 1){
                                let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']]
                                previouslyStdIds.splice(sId, 1);
                                let max = Object.entries(res.data.busy)[i][1][c].max;
                                max -= 1;
                                stdwHoursD2[c] = { "stdIds": previouslyStdIds, "max": max }
                              }else{
                                stdwHoursD2[c] = [0,0]
                              }
                           
                            }else{
                              stdwHoursD2[c] = Object.entries(res.data.busy)[i][1][c];
                            }
                          }
                        }
  
                      }
                    }
                  }

                }else{
                  if (stdwHoursD2[c][1] === 0)
                  stdwHoursD2[c] = Object.entries(res.data.busy)[i][1][c];
                }
       
              }
              instructorBusy[`${i}`] = stdwHoursD2;

            } else {
              instructorBusy[`${i}`] = stdwHoursD2;
            }
                            // delete reserved session days and hours if the admin change the days of the session
                            getThePreviuosReservedSessionsDaysHours(previousReservedHoursD0,previousReservedHoursD1,previousReservedHoursD2,previousReservedHoursD3,previousReservedHoursD4,previousReservedHoursD5,previousReservedHoursD6,2);
          }

          if (i === 3) {
            if (Object.entries(res.data.busy)[i][1].find((obji) => typeof obji === 'object' && !Array.isArray(obji)) !== undefined ) {
              for (let c = 0; c < Object.entries(res.data.busy)[i][1].length; c++) {
                if (typeof Object.entries(res.data.busy)[i][1][c] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][c])) {
                  if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) === undefined && (typeof stdwHoursD3[c] === 'object' && !Array.isArray(stdwHoursD3[c]))) {
                    let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                    previouslyStdIds.push(changableSubscriptionState._id);
                    let max = Object.entries(res.data.busy)[i][1][c].max;
                    max += 1;
                    stdwHoursD3[c] = { "stdIds": previouslyStdIds, "max": max }
                  }else{
                    for(let stdwHoursD3Index = 0 ;stdwHoursD3Index < stdwHoursD3.length;stdwHoursD3Index++ ){
                      if(typeof stdwHoursD3[stdwHoursD3Index] === 'object' && !Array.isArray(stdwHoursD3[stdwHoursD3Index])){
                        if(stdwHoursD3Index === c){
                          if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) !== undefined) {
                            let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                            let max = Object.entries(res.data.busy)[i][1][c].max;
                            stdwHoursD3[c] = { "stdIds": previouslyStdIds, "max": max }
                          }
                        }else{
                          for(let sId = 0 ; sId < Object.entries(res.data.busy)[i][1][c]['stdIds'].length;sId++){
                            if(Object.entries(res.data.busy)[i][1][c]['stdIds'][sId] === changableSubscriptionState._id){
                              if(Object.entries(res.data.busy)[i][1][c].max > 1){
                                let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']]
                                previouslyStdIds.splice(sId, 1);
                                let max = Object.entries(res.data.busy)[i][1][c].max;
                                max -= 1;
                                stdwHoursD3[c] = { "stdIds": previouslyStdIds, "max": max }
                              }else{
                                stdwHoursD3[c] = [0,0]
                              }
                  
                            }else{
                              stdwHoursD3[c] = Object.entries(res.data.busy)[i][1][c];
                            }
                          }
                        }
  
                      }
                    }
                  }

                }else{
                  if (stdwHoursD3[c][1] === 0)
                  stdwHoursD3[c] = Object.entries(res.data.busy)[i][1][c];
                }
             
              }
              instructorBusy[`${i}`] = stdwHoursD3;

            } else {
              instructorBusy[`${i}`] = stdwHoursD3;
            }
                            // delete reserved session days and hours if the admin change the days of the session
                            getThePreviuosReservedSessionsDaysHours(previousReservedHoursD0,previousReservedHoursD1,previousReservedHoursD2,previousReservedHoursD3,previousReservedHoursD4,previousReservedHoursD5,previousReservedHoursD6,3);
          }

          if (i === 4) {
            if (Object.entries(res.data.busy)[i][1].find((obji) => typeof obji === 'object' && !Array.isArray(obji)) !== undefined ) {
              for (let c = 0; c < Object.entries(res.data.busy)[i][1].length; c++) {
                if (typeof Object.entries(res.data.busy)[i][1][c] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][c])) {
                  if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) === undefined && (typeof stdwHoursD4[c] === 'object' && !Array.isArray(stdwHoursD4[c]))) {
                    let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                    previouslyStdIds.push(changableSubscriptionState._id);
                    let max = Object.entries(res.data.busy)[i][1][c].max;
                    max += 1;
                    stdwHoursD4[c] = { "stdIds": previouslyStdIds, "max": max }
                  }else{
                    for(let stdwHoursD4Index = 0 ;stdwHoursD4Index < stdwHoursD4.length;stdwHoursD4Index++ ){
                      if(typeof stdwHoursD4[stdwHoursD4Index] === 'object' && !Array.isArray(stdwHoursD4[stdwHoursD4Index])){
                        if(stdwHoursD4Index === c){
                          if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) !== undefined) {
                            let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                            let max = Object.entries(res.data.busy)[i][1][c].max;
                            stdwHoursD4[c] = { "stdIds": previouslyStdIds, "max": max }
                          }
                        }else{
                          for(let sId = 0 ; sId < Object.entries(res.data.busy)[i][1][c]['stdIds'].length;sId++){
                            if(Object.entries(res.data.busy)[i][1][c]['stdIds'][sId] === changableSubscriptionState._id){
                              if(Object.entries(res.data.busy)[i][1][c].max > 1){
                                let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']]
                                previouslyStdIds.splice(sId, 1);
                                let max = Object.entries(res.data.busy)[i][1][c].max;
                                max -= 1;
                                stdwHoursD4[c] = { "stdIds": previouslyStdIds, "max": max }
                              }else{
                                stdwHoursD4[c] = [0,0];
                              }
                           
                            }else{
                              stdwHoursD4[c] = Object.entries(res.data.busy)[i][1][c];
                            }
                          }
                        }
  
                      }
                    }
                  }

                }else{
                  if (stdwHoursD4[c][1] === 0)
                  stdwHoursD4[c] = Object.entries(res.data.busy)[i][1][c];
                }
              
              }
              instructorBusy[`${i}`] = stdwHoursD4;

            } else {
              instructorBusy[`${i}`] = stdwHoursD4;
            }
         
                            // delete reserved session days and hours if the admin change the days of the session
                            getThePreviuosReservedSessionsDaysHours(previousReservedHoursD0,previousReservedHoursD1,previousReservedHoursD2,previousReservedHoursD3,previousReservedHoursD4,previousReservedHoursD5,previousReservedHoursD6,4);
          }

          if (i === 5) {
            if (Object.entries(res.data.busy)[i][1].find((obji) => typeof obji === 'object' && !Array.isArray(obji)) !== undefined ) {
              for (let c = 0; c < Object.entries(res.data.busy)[i][1].length; c++) {
                if (typeof Object.entries(res.data.busy)[i][1][c] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][c])) {
                  if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) === undefined && (typeof stdwHoursD5[c] === 'object' && !Array.isArray(stdwHoursD5[c]))) {
                    let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                    previouslyStdIds.push(changableSubscriptionState._id);
                    let max = Object.entries(res.data.busy)[i][1][c].max;
                    max += 1;
                    stdwHoursD5[c] = { "stdIds": previouslyStdIds, "max": max }
                  }else{
                    for(let stdwHoursD5Index = 0 ;stdwHoursD5Index < stdwHoursD5.length;stdwHoursD5Index++ ){
                      if(typeof stdwHoursD5[stdwHoursD5Index] === 'object' && !Array.isArray(stdwHoursD5[stdwHoursD5Index])){
                        if(stdwHoursD5Index === c){
                          if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) !== undefined) {
                            let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                            let max = Object.entries(res.data.busy)[i][1][c].max;
                            stdwHoursD5[c] = { "stdIds": previouslyStdIds, "max": max }
                          }
                        }else{
                          for(let sId = 0 ; sId < Object.entries(res.data.busy)[i][1][c]['stdIds'].length;sId++){
                            if(Object.entries(res.data.busy)[i][1][c]['stdIds'][sId] === changableSubscriptionState._id){
                              if(Object.entries(res.data.busy)[i][1][c].max > 1){
                                let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']]
                                previouslyStdIds.splice(sId, 1);
                                let max = Object.entries(res.data.busy)[i][1][c].max;
                                max -= 1;
                                stdwHoursD5[c] = { "stdIds": previouslyStdIds, "max": max }
                              }else{
                                stdwHoursD5[c] = [0,0];
                              }
                           
                            }else{
                              stdwHoursD5[c] = Object.entries(res.data.busy)[i][1][c];
                            }
                          }
                        }
  
                      }
                    }
                  }

                }else{
                  if (stdwHoursD5[c][1] === 0)
                  stdwHoursD5[c] = Object.entries(res.data.busy)[i][1][c];
                }
              
              }
              instructorBusy[`${i}`] = stdwHoursD5;

            } else {
              instructorBusy[`${i}`] = stdwHoursD5;
            }
                            // delete reserved session days and hours if the admin change the days of the session
                            getThePreviuosReservedSessionsDaysHours(previousReservedHoursD0,previousReservedHoursD1,previousReservedHoursD2,previousReservedHoursD3,previousReservedHoursD4,previousReservedHoursD5,previousReservedHoursD6,5);
          }

          if (i === 6) {
            if (Object.entries(res.data.busy)[i][1].find((obji) => typeof obji === 'object' && !Array.isArray(obji)) !== undefined ) {
              for (let c = 0; c < Object.entries(res.data.busy)[i][1].length; c++) {
                if (typeof Object.entries(res.data.busy)[i][1][c] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][c])) {
                  if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) === undefined && (typeof stdwHoursD6[c] === 'object' && !Array.isArray(stdwHoursD6[c]))) {
                    let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                    previouslyStdIds.push(changableSubscriptionState._id);
                    let max = Object.entries(res.data.busy)[i][1][c].max;
                    max += 1;
                    stdwHoursD6[c] = { "stdIds": previouslyStdIds, "max": max }
                  }else{
                    for(let stdwHoursD6Index = 0 ;stdwHoursD6Index < stdwHoursD6.length;stdwHoursD6Index++ ){
                      if(typeof stdwHoursD6[stdwHoursD6Index] === 'object' && !Array.isArray(stdwHoursD6[stdwHoursD6Index])){
                        if(stdwHoursD6Index === c){
                          if ((Object.entries(res.data.busy)[i][1][c]['stdIds'].find((sId) => sId === changableSubscriptionState._id)) !== undefined) {
                            let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']];
                            let max = Object.entries(res.data.busy)[i][1][c].max;
                            stdwHoursD6[c] = { "stdIds": previouslyStdIds, "max": max }
                          }
                        }else{
                          for(let sId = 0 ; sId < Object.entries(res.data.busy)[i][1][c]['stdIds'].length;sId++){
                            if(Object.entries(res.data.busy)[i][1][c]['stdIds'][sId] === changableSubscriptionState._id){
                              if(Object.entries(res.data.busy)[i][1][c].max > 1){
                                let previouslyStdIds = [...Object.entries(res.data.busy)[i][1][c]['stdIds']]
                                previouslyStdIds.splice(sId, 1);
                                let max = Object.entries(res.data.busy)[i][1][c].max;
                                max -= 1;
                                stdwHoursD6[c] = { "stdIds": previouslyStdIds, "max": max }
                              }else{
                                stdwHoursD6[c] = [0,0];
                              }
                              //new added
                            }else{
                              stdwHoursD6[c] = Object.entries(res.data.busy)[i][1][c];
                            }
                          }
                        }
  
                      }
                    }
                  }

                }else{
                  if (stdwHoursD6[c][1] === 0)
                  stdwHoursD6[c] = Object.entries(res.data.busy)[i][1][c];
                }
               
              }
              instructorBusy[`${i}`] = stdwHoursD6;

            } else {
              instructorBusy[`${i}`] = stdwHoursD6;
            }
            // delete reserved session days and hours if the admin change the days of the session
          getThePreviuosReservedSessionsDaysHours(previousReservedHoursD0,previousReservedHoursD1,previousReservedHoursD2,previousReservedHoursD3,previousReservedHoursD4,previousReservedHoursD5,previousReservedHoursD6,6);
          }


        }
      }
      let busyInstructorDaysHours = {}
      if (Object.values(WorkingHoursD0).every((wH) => wH === "")) {
        
        busyInstructorDaysHours["0"] = previousReservedHoursD0  //Object.entries(res.data.busy)[0][1]
      } else {
        busyInstructorDaysHours["0"] = instructorBusy['0'];
      }
      if (Object.values(WorkingHoursD1).every((wH) => wH === "")) {
        busyInstructorDaysHours["1"] = previousReservedHoursD1 //Object.entries(res.data.busy)[1][1]
      } else {
        busyInstructorDaysHours["1"] = instructorBusy['1'];
      }
      if (Object.values(WorkingHoursD2).every((wH) => wH === "")) {
        busyInstructorDaysHours["2"] = previousReservedHoursD2 //Object.entries(res.data.busy)[2][1]
      } else {
        busyInstructorDaysHours["2"] = instructorBusy['2'];
      }
      if (Object.values(WorkingHoursD3).every((wH) => wH === "")) {
        busyInstructorDaysHours["3"] =  previousReservedHoursD3 //Object.entries(res.data.busy)[3][1]
      } else {
        busyInstructorDaysHours["3"] = instructorBusy['3'];
      }
      if (Object.values(WorkingHoursD4).every((wH) => wH === "")) {
        busyInstructorDaysHours["4"] = previousReservedHoursD4 //Object.entries(res.data.busy)[4][1]
      } else {
        busyInstructorDaysHours["4"] = instructorBusy['4'];
      }
      if (Object.values(WorkingHoursD5).every((wH) => wH === "")) {
        busyInstructorDaysHours["5"] = previousReservedHoursD5 //Object.entries(res.data.busy)[5][1]
      } else {
        busyInstructorDaysHours["5"] = instructorBusy['5'];
      }
      if (Object.values(WorkingHoursD6).every((wH) => wH === "")) {
        busyInstructorDaysHours["6"] = previousReservedHoursD6 //Object.entries(res.data.busy)[6][1]
      } else {
        busyInstructorDaysHours["6"] = instructorBusy['6'];
      }



      if (NumberOfSelectedDays === changableSubscriptionState.program_prefs.sessions_in_week) {
        let numberOfDaysSelectedTestCasesArr = [];
        let caseObji = {};
        setBusyDaysHoursWarningAlert(false);
        for (let i = 0; i < selectedDaysArr.length; i++) {
          if (selectedDaysArr[i] === 0) {
            if (Object.values(WorkingHoursD0).find((wR) => wR !== "") === undefined) {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": true, index: selectedDaysArr[i] };
            } else {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": false, index: selectedDaysArr[i] };
            }
          }
          if (selectedDaysArr[i] === 1) {
            if (Object.values(WorkingHoursD1).find((wR) => wR !== "") === undefined) {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": true, index: selectedDaysArr[i] };
            } else {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": false, index: selectedDaysArr[i] };
            }
          }
          if (selectedDaysArr[i] === 2) {
            if (Object.values(WorkingHoursD2).find((wR) => wR !== "") === undefined) {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": true, index: selectedDaysArr[i] };
            } else {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": false, index: selectedDaysArr[i] };
            }
          }
          if (selectedDaysArr[i] === 3) {
            if (Object.values(WorkingHoursD3).find((wR) => wR !== "") === undefined) {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": true, index: selectedDaysArr[i] };
            } else {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": false, index: selectedDaysArr[i] };
            }
          }
          if (selectedDaysArr[i] === 4) {
            if (Object.values(WorkingHoursD4).find((wR) => wR !== "") === undefined) {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": true, index: selectedDaysArr[i] };
            } else {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": false, index: selectedDaysArr[i] };
            }
          }
          if (selectedDaysArr[i] === 5) {
            if (Object.values(WorkingHoursD5).find((wR) => wR !== "") === undefined) {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": true, index: selectedDaysArr[i] };
            } else {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": false, index: selectedDaysArr[i] };
            }
          }
          if (selectedDaysArr[i] === 6) {
            if (Object.values(WorkingHoursD6).find((wR) => wR !== "") === undefined) {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": true, index: selectedDaysArr[i] };
            } else {
              numberOfDaysSelectedTestCasesArr[i] = caseObji[`${i}`] = { "key": selectedDaysArr[i], "testCaseDay": false, index: selectedDaysArr[i] };
            }
          }

        }
        if (numberOfDaysSelectedTestCasesArr.every((evDay) => evDay[`testCaseDay`] === false) === true) {
          setIsUserMakingUpdateOnStudentAccount(true);
          setBusyDaysHoursWarningAlert(false);
          axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/instructors/${changableSubscriptionState.instructor}`, { "busy": busyInstructorDaysHours }).then((res) => {
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
              d0: "",
              d1: "",
              d2: "",
              d3: "",
              d4: "",
              d5: "",
              d6: "",
            })
            setCheckedDays({
              d0: false,
              d1: false,
              d2: false,
              d3: false,
              d4: false,
              d5: false,
              d6: false,
            })
            setCheckDaysRadio({
              d0: false,
              d1: false,
              d2: false,
              d3: false,
              d4: false,
              d5: false,
              d6: false,
            })
          }).catch((error) => {
            console.log(error);
          })

          axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/students/${changableSubscriptionState._id}`, {
            "busy": {
              "0": studentBusy['0'],
              "1": studentBusy['1'],
              "2": studentBusy['2'],
              "3": studentBusy['3'],
              "4": studentBusy['4'],
              "5": studentBusy['5'],
              "6": studentBusy['6']
            }
          }).then((res) => {
            distroyAlert();
            setFetchAgain(fetchAgain + 1);
            setIsUserMakingUpdateOnStudentAccount(false);
            setStudentStatus((current) => !current);
            getStudentRatelMa3yJoiningRequestData(res.data, event);
          }).catch((error) => {
            console.log(error);
          })
        } else {
          setBusyDaysHoursWarningAlert(true);
          let DayObj = numberOfDaysSelectedTestCasesArr.find((evDay, index) => evDay[`testCaseDay`] === true);
          setContentOfBusyDaysHoursWarningAlert(`${t("You Have To  Select One Hour On")}  ${days[DayObj['key']]}`)
        }
      } else {
        setBusyDaysHoursWarningAlert(true);
        setContentOfBusyDaysHoursWarningAlert(`${t("You Have To  Select")} ${changableSubscriptionState.program_prefs.sessions_in_week} ${t("Days According To Number Of Session")}`)
      }
    
    }).catch((error) => {
      console.log(error);
    })
  }
  const sortStudentBySubscriptionState = (sortType) => {
    let studentDataCopy = [...studentData];
    for (let i = 0; i < studentDataCopy.length; i++) {
      if (sortType === "Pending") {
        if (studentDataCopy[i].subscription_state === "Pending") studentDataCopy[i].precedence = 3
        if (studentDataCopy[i].subscription_state === "Active") studentDataCopy[i].precedence = 2
        if (studentDataCopy[i].subscription_state === "OnHold") studentDataCopy[i].precedence = 1
        if (studentDataCopy[i].subscription_state === "Cancelled") studentDataCopy[i].precedence = 0
      } else if (sortType === "Active") {
        if (studentDataCopy[i].subscription_state === "Pending") studentDataCopy[i].precedence = 1
        if (studentDataCopy[i].subscription_state === "Active") studentDataCopy[i].precedence = 3
        if (studentDataCopy[i].subscription_state === "OnHold") studentDataCopy[i].precedence = 2
        if (studentDataCopy[i].subscription_state === "Cancelled") studentDataCopy[i].precedence = 0
      } else if (sortType === "OnHold") {
        if (studentDataCopy[i].subscription_state === "Pending") studentDataCopy[i].precedence = 1
        if (studentDataCopy[i].subscription_state === "Active") studentDataCopy[i].precedence = 2
        if (studentDataCopy[i].subscription_state === "OnHold") studentDataCopy[i].precedence = 3
        if (studentDataCopy[i].subscription_state === "Cancelled") studentDataCopy[i].precedence = 0
      } else {
        if (studentDataCopy[i].subscription_state === "Pending") studentDataCopy[i].precedence = 2
        if (studentDataCopy[i].subscription_state === "Active") studentDataCopy[i].precedence = 1
        if (studentDataCopy[i].subscription_state === "OnHold") studentDataCopy[i].precedence = 0
        if (studentDataCopy[i].subscription_state === "Cancelled") studentDataCopy[i].precedence = 3
      }
    }
    switch (sortType) {
      case "Pending":
        studentDataCopy.sort((a_sub_state, b_sub_state) => {
          return b_sub_state.precedence - a_sub_state.precedence;
        });
        break;
      case "Active":
        studentDataCopy.sort((a_sub_state, b_sub_state) => {
          return b_sub_state.precedence - a_sub_state.precedence;
        });
        break;
      case "OnHold":
        studentDataCopy.sort((a_sub_state, b_sub_state) => {
          return b_sub_state.precedence - a_sub_state.precedence;
        });
        break;
      case "Cancelled":
        studentDataCopy.sort((a_sub_state, b_sub_state) => {
          return b_sub_state.precedence - a_sub_state.precedence;
        });
        break;
      default:
    }
    setStudentData(studentDataCopy);
  }
  const handleStudentBusyOnInstructor = (studentAccountObji)=>{
    let stdHoursD0 = [];
    let stdHoursD1 = [];
    let stdHoursD2 = [];
    let stdHoursD3 = [];
    let stdHoursD4 = [];
    let stdHoursD5 = [];
    let stdHoursD6 = [];
    let busyInstructorInitialObject = {};
    let getStudentInstructorBusyData = () => {
      return new Promise((resolve, reject) => {
        resolve(
          axios.get(`${process.env.REACT_APP_BACK_HOST_URL}/api/instructors/${studentAccountObji.instructor}`).then((res) => {
            for (let i = 0; i < Object.entries(res.data.busy).length; i++) {
              if (i === 0) {
                for (let j = 0; j < Object.entries(res.data.busy)[i][1].length; j++) {
                  if (typeof Object.entries(res.data.busy)[i][1][j] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][j])) {
                    for (let x = 0; x < Object.entries(res.data.busy)[i][1][j]['stdIds'].length; x++) {
                      if (Object.entries(res.data.busy)[i][1][j]['stdIds'][x] === studentAccountObji._id) {
                        if (Object.entries(res.data.busy)[i][1][j].max === 1) {
                          stdHoursD0[j] = [0, 0];
                        } else {
                          Object.entries(res.data.busy)[i][1][j]['stdIds'].splice(x, 1);
                          let max = Object.entries(res.data.busy)[i][1][j].max;
                          let reservedAppointmentsObji = { "stdIds": Object.entries(res.data.busy)[i][1][j]['stdIds'], "max": max -= 1 };
                          stdHoursD0[j] = reservedAppointmentsObji;
                        }
                      }
                    }
                  } else {
                    stdHoursD0[j] = Object.entries(res.data.busy)[i][1][j];
                  }
                }
                busyInstructorInitialObject[`${i}`] = stdHoursD0;
              }
              if (i === 1) {
                for (let j = 0; j < Object.entries(res.data.busy)[i][1].length; j++) {
                  if (typeof Object.entries(res.data.busy)[i][1][j] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][j])) {
                    for (let x = 0; x < Object.entries(res.data.busy)[i][1][j]['stdIds'].length; x++) {
                      if (Object.entries(res.data.busy)[i][1][j]['stdIds'][x] === studentAccountObji._id) {
                        if (Object.entries(res.data.busy)[i][1][j].max === 1) {
                          stdHoursD1[j] = [0, 0];
                        } else {
                          Object.entries(res.data.busy)[i][1][j]['stdIds'].splice(x, 1);
                          let max = Object.entries(res.data.busy)[i][1][j].max;
                          let reservedAppointmentsObji = { "stdIds": Object.entries(res.data.busy)[i][1][j]['stdIds'], "max": max -= 1 };
                          stdHoursD1[j] = reservedAppointmentsObji;
                        }
                      }
                    }
                  } else {
                    stdHoursD1[j] = Object.entries(res.data.busy)[i][1][j];
                  }
                }
                busyInstructorInitialObject[`${i}`] = stdHoursD1;
              }
              if (i === 2) {
                for (let j = 0; j < Object.entries(res.data.busy)[i][1].length; j++) {
                  if (typeof Object.entries(res.data.busy)[i][1][j] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][j])) {
                    for (let x = 0; x < Object.entries(res.data.busy)[i][1][j]['stdIds'].length; x++) {
                      if (Object.entries(res.data.busy)[i][1][j]['stdIds'][x] === studentAccountObji._id) {
                        if (Object.entries(res.data.busy)[i][1][j].max === 1) {
                          stdHoursD2[j] = [0, 0];
                        } else {
                          Object.entries(res.data.busy)[i][1][j]['stdIds'].splice(x, 1);
                          let max = Object.entries(res.data.busy)[i][1][j].max;
                          let reservedAppointmentsObji = { "stdIds": Object.entries(res.data.busy)[i][1][j]['stdIds'], "max": max -= 1 };
                          stdHoursD2[j] = reservedAppointmentsObji;
                        }
                      }
                    }
                  } else {
                    stdHoursD2[j] = Object.entries(res.data.busy)[i][1][j];
                  }
                }
                busyInstructorInitialObject[`${i}`] = stdHoursD2;
              }
              if (i === 3) {
                for (let j = 0; j < Object.entries(res.data.busy)[i][1].length; j++) {
                  if (typeof Object.entries(res.data.busy)[i][1][j] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][j])) {
                    for (let x = 0; x < Object.entries(res.data.busy)[i][1][j]['stdIds'].length; x++) {
                      if (Object.entries(res.data.busy)[i][1][j]['stdIds'][x] === studentAccountObji._id) {
                        if (Object.entries(res.data.busy)[i][1][j].max === 1) {
                          stdHoursD3[j] = [0, 0];
                        } else {
                          Object.entries(res.data.busy)[i][1][j]['stdIds'].splice(x, 1);
                          let max = Object.entries(res.data.busy)[i][1][j].max;
                          let reservedAppointmentsObji = { "stdIds": Object.entries(res.data.busy)[i][1][j]['stdIds'], "max": max -= 1 };
                          stdHoursD3[j] = reservedAppointmentsObji;
                        }
                      }
                    }
                  } else {
                    stdHoursD3[j] = Object.entries(res.data.busy)[i][1][j];
                  }
                }
                busyInstructorInitialObject[`${i}`] = stdHoursD3;
              }
              if (i === 4) {
                for (let j = 0; j < Object.entries(res.data.busy)[i][1].length; j++) {
                  if (typeof Object.entries(res.data.busy)[i][1][j] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][j])) {
                    for (let x = 0; x < Object.entries(res.data.busy)[i][1][j]['stdIds'].length; x++) {
                      if (Object.entries(res.data.busy)[i][1][j]['stdIds'][x] === studentAccountObji._id) {
                        if (Object.entries(res.data.busy)[i][1][j].max === 1) {
                          stdHoursD4[j] = [0, 0];
                        } else {
                          Object.entries(res.data.busy)[i][1][j]['stdIds'].splice(x, 1);
                          let max = Object.entries(res.data.busy)[i][1][j].max;
                          let reservedAppointmentsObji = { "stdIds": Object.entries(res.data.busy)[i][1][j]['stdIds'], "max": max -= 1 };
                          stdHoursD4[j] = reservedAppointmentsObji;
                        }
                      }
                    }
                  } else {
                    stdHoursD4[j] = Object.entries(res.data.busy)[i][1][j];
                  }
                }
                busyInstructorInitialObject[`${i}`] = stdHoursD4;
              }
              if (i === 5) {
                for (let j = 0; j < Object.entries(res.data.busy)[i][1].length; j++) {
                  if (typeof Object.entries(res.data.busy)[i][1][j] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][j])) {
                    for (let x = 0; x < Object.entries(res.data.busy)[i][1][j]['stdIds'].length; x++) {
                      if (Object.entries(res.data.busy)[i][1][j]['stdIds'][x] === studentAccountObji._id) {
                        if (Object.entries(res.data.busy)[i][1][j].max === 1) {
                          stdHoursD5[j] = [0, 0];
                        } else {
                          Object.entries(res.data.busy)[i][1][j]['stdIds'].splice(x, 1);
                          let max = Object.entries(res.data.busy)[i][1][j].max;
                          let reservedAppointmentsObji = { "stdIds": Object.entries(res.data.busy)[i][1][j]['stdIds'], "max": max -= 1 };
                          stdHoursD5[j] = reservedAppointmentsObji;
                        }
                      }
                    }
                  } else {
                    stdHoursD5[j] = Object.entries(res.data.busy)[i][1][j];
                  }
                }
                busyInstructorInitialObject[`${i}`] = stdHoursD5;
              }
              if (i === 6) {
                for (let j = 0; j < Object.entries(res.data.busy)[i][1].length; j++) {
                  if (typeof Object.entries(res.data.busy)[i][1][j] === 'object' && !Array.isArray(Object.entries(res.data.busy)[i][1][j])) {
                    for (let x = 0; x < Object.entries(res.data.busy)[i][1][j]['stdIds'].length; x++) {
                      if (Object.entries(res.data.busy)[i][1][j]['stdIds'][x] === studentAccountObji._id) {
                        if (Object.entries(res.data.busy)[i][1][j].max === 1) {
                          stdHoursD6[j] = [0, 0];
                        } else {
                          Object.entries(res.data.busy)[i][1][j]['stdIds'].splice(x, 1);
                          let max = Object.entries(res.data.busy)[i][1][j].max;
                          let reservedAppointmentsObji = { "stdIds": Object.entries(res.data.busy)[i][1][j]['stdIds'], "max": max -= 1 };
                          stdHoursD6[j] = reservedAppointmentsObji;
                        }
                      }
                    }
                  } else {
                    stdHoursD6[j] = Object.entries(res.data.busy)[i][1][j];
                  }
                }
                busyInstructorInitialObject[`${i}`] = stdHoursD6;
              }
              if (Object.entries(res.data.busy)[0][1].length === 0)
                busyInstructorInitialObject[`0`] = [];
              if (Object.entries(res.data.busy)[1][1].length === 0)
                busyInstructorInitialObject[`1`] = [];
              if (Object.entries(res.data.busy)[2][1].length === 0)
                busyInstructorInitialObject[`2`] = [];
              if (Object.entries(res.data.busy)[3][1].length === 0)
                busyInstructorInitialObject[`3`] = [];
              if (Object.entries(res.data.busy)[4][1].length === 0)
                busyInstructorInitialObject[`4`] = [];
              if (Object.entries(res.data.busy)[5][1].length === 0)
                busyInstructorInitialObject[`5`] = [];
              if (Object.entries(res.data.busy)[6][1].length === 0)
                busyInstructorInitialObject[`6`] = [];
            }
            return res;
          })

        )
      })
    }
    let updateStudentInstructorBusyData = () => {
      return new Promise((resolve, reject) => {
        resolve(
          axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/instructors/${studentAccountObji.instructor}`, {
            "busy": {
              "0": busyInstructorInitialObject[`0`],
              "1": busyInstructorInitialObject[`1`],
              "2": busyInstructorInitialObject[`2`],
              "3": busyInstructorInitialObject[`3`],
              "4": busyInstructorInitialObject[`4`],
              "5": busyInstructorInitialObject[`5`],
              "6": busyInstructorInitialObject[`6`]
            }
          }).then((res) => {
            return res;
          }).catch((error) => {
            console.log(error);
          })
        )
      })
    }
    let updateStudentInstructorBusyDataResponseStatus;
    let response =   getStudentInstructorBusyData();
    response.then((res) => {
      if (res.statusText === "OK") {
        updateStudentInstructorBusyDataResponseStatus =    updateStudentInstructorBusyData();
        updateStudentInstructorBusyDataResponseStatus.then((res)=>{
        })
      }
    })
  }
  const deleteStudent = async (event, studentAccountObji) => {
    event.stopPropagation();


    let deleteReservedStudentDaysAndHours = () => {
      return new Promise((resolve, reject) => {
        resolve(
          axios.delete(`${process.env.REACT_APP_BACK_HOST_URL}/api/students/${studentAccountObji._id}`,{headers:{},data:{instructorID:studentAccountObji.instructor}}).then((res) => {
            setFetchAgain(fetchAgain + 1);
            setIsUserDeleteAnyAccount(true);
            setTimeout(() => {
              setIsUserDeleteAnyAccount(false);
            }, 1000)
            return res;
          }).catch((error) => {
            console.log(error);
          })

        )
      })
    }
    let result = deleteReservedStudentDaysAndHours();
    result.then((res) => {
      console.log(res)
      if (res.statusText === "OK" && studentAccountObji.subscription_state !== "Pending") {
        handleStudentBusyOnInstructor(studentAccountObji);
      }
    })
  }
  return (

    <>
      <div className={StudentSubscriptionStyles["student-user-data-container"]} style={{direction:t("us") === t("Us")?'ltr':"rtl"}}>
        <div className={StudentSubscriptionStyles["table-settings-container"]}>
          <Form.Label
          style={{textAlign:t("us")===t("Us")?'left':'right'}}
            htmlFor="userAccountFilterTxt"
            className={StudentSubscriptionStyles["filter-label"]}
          >
            {t("filter")}
          </Form.Label>
          <Form.Control
            id="userAccountFilterTxt"
            className={StudentSubscriptionStyles["filter-txt"]}
            value={filterValue}
            onChange={handleFiltaration}
          />
          <Form.Label htmlFor="sort_subscription_state" style={{textAlign:t("us")===t("Us")?'left':'right'}}>{t("sort")}</Form.Label>
          <Form.Select name="sort_subscription_state" id="sort_subscription_state" onChange={(event) => sortStudentBySubscriptionState(event.target.value)}>
            <option value={""}>{t("select")}</option>
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="OnHold">OnHold</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
          <button
            type="button"
            className={StudentSubscriptionStyles["btn"]}
            style={{ marginTop: "auto",direction: 'ltr'  }}
            onClick={(event) => filterStudents(event.target.value)}
          >
            {t("filter")} <AiFillFilter />
          </button>
          <button
            type="button"
            className={StudentSubscriptionStyles["btn"]}
            style={{ marginTop: "auto",direction: 'ltr'  }}
            onClick={resetTableFiltaration}
          >
            {t("reset")}
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
                  <th >{t("name")}</th>
                  <th >{t("subscription_state")}</th>
                  <th >{t("settings")}</th>
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
                      background: selectedRow === stdData._id ? "#198754" : "",
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
                        style={{ cursor: stdData.subscription_state === "Cancelled" ? 'not-allowed' : 'pointer', color: stdData.subscription_state === "Cancelled" ? '#a2a9af' : '' }}
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
                      <FaTrash onClick={(event) => deleteStudent(event, stdData)} />
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
                    <Form.Label htmlFor="studentStatus">{t("subscription_state")}</Form.Label>
                    <Form.Select
                      id="studentStatus"
                      name="student_status"
                      className={`${errors.statusError
                        ? StudentSubscriptionStyles["errors"]
                        : ""
                        }`}
                      onChange={setConfiguration}
                    >
                      <option value="">{t("select")}</option>
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
                    changableSubscriptionState.instructor !== undefined && studentConfiguration.studentStatus !== "Cancelled" ? (
                    <>
                      <div>
                        <Form.Label htmlFor="studentInstructor">
                          {t("instructor")}
                        </Form.Label>
                        <Form.Select
                          name="student_instructor"
                          id="studentInstructor"
                          className={`${errors.instructorError
                            ? StudentSubscriptionStyles["errors"]
                            : ""
                            }`}
                          onChange={setConfiguration}
                        >
                          <option value="">{t("select")}</option>

                          {recommendedInstructorsData.length === 0 ? <option value="" style={{ textAlign: 'center' }} disabled>{t("There Is No Recommendation")}</option> : null}
                          {recommendedInstructorsData.map((instructor) => (
                            <option key={instructor._id} value={instructor._id} style={{ background: changableSubscriptionState.instructor !== undefined && changableSubscriptionState.instructor === instructor._id ? '#198754' : '', color: changableSubscriptionState.instructor !== undefined && changableSubscriptionState.instructor === instructor._id ? '#FFFFFF' : '#000000' }}>
                              {instructor.name}
                            </option>
                          ))}
                        </Form.Select>
                        <small className="text-danger">
                          {errors.instructorError}
                        </small>
                      </div>
                    </>
                  ) :studentConfiguration.studentStatus !== "" &&
                    studentConfiguration.studentStatus !== "Cancelled"  ? (
                    <>
                      <div>
                        <Form.Label htmlFor="studentInstructor">
                          {t("instructor")}
                        </Form.Label>
                        <Form.Select
                          name="student_instructor"
                          id="studentInstructor"
                          className={`${errors.instructorError
                            ? StudentSubscriptionStyles["errors"]
                            : ""
                            }`}
                          onChange={setConfiguration}
                        >
                          <option value="">Select</option>
                          {recommendedInstructorsData.length === 0 ? <option style={{ textAlign: 'center' }} disabled>{t("There Is No Recommendation")}</option> : null}
                          {recommendedInstructorsData.map((instructor) => (
                            <option key={instructor._id} value={instructor._id}>
                              {instructor.name}
                            </option>
                          ))}
                        </Form.Select>
                        <small className="text-danger">
                          {errors.instructorError}
                        </small>
                        {changableSubscriptionState.started_in === null?
                        <div>
                          <Form.Label htmlFor="started_in">{t("std_started_at")}</Form.Label>
                          <Form.Control
                            type="date"
                            id="started_in"
                            name="started_in"
                            value={studentConfiguration.started_in}
                            className={`${errors.started_inError
                              ? StudentSubscriptionStyles["errors"]
                              : ""
                              }`}
                            onChange={setConfiguration}
                          />
                        </div>:null}
                      </div>{" "}
                    </>
                  ) : null}
                  {studentConfiguration.studentStatus !== ""
                    && studentConfiguration.studentStatus === "Cancelled" ? (
                    <button
                      type="submit"
                      className={`${studentConfiguration.studentStatus === "" ||
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
                      {isUserMakingUpdateOnStudentAccount ? <>
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      </> : <>{t("save")}<FaSave style={{ margin:t("us")===t("Us")?"3px 6px 1px 3px":"5px 6px 1px 3px"}} size={15} /></>
                      }


                    </button>
                  ) :changableSubscriptionState.instructor !== null &&
                    changableSubscriptionState.instructor !== undefined ? (
                    <button
                      type="submit"
                      className={`${StudentSubscriptionStyles["btn"]
                        }`}
                    >
                      {isUserMakingUpdateOnStudentAccount ? <>
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      </> : <>{t("save")}<FaSave style={{ margin:t("us")===t("Us")?"3px 6px 1px 3px":"5px 6px 1px 3px"}} size={15} /></>
                      }
                    </button>
                  ) :changableSubscriptionState.instructor === null ? (
                  <button
                    type="submit"
                    className={`${studentConfiguration.studentStatus === "" ||
                    studentConfiguration.studentInstructor === "" ||
                    errors.instructorError ||
                    errors.statusError
                    ? StudentSubscriptionStyles["disabled-btn"]
                    : StudentSubscriptionStyles["btn"]
                    }`}
                  disabled={
                    studentConfiguration.studentStatus === "" ||
                      studentConfiguration.studentInstructor === "" ||
                      errors.statusError ||
                      errors.instructorError
                      ? true
                      : false
                  }
                  >
                    {isUserMakingUpdateOnStudentAccount ? <>
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                    </> : <>{t("save")}<FaSave style={{ margin:t("us")===t("Us")?"3px 6px 1px 3px":"5px 6px 1px 3px"}} size={15} /></>
                    }
                  </button>
                ): (
                    <button
                      type="submit"
                      className={`${studentConfiguration.studentStatus === "" ||
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
                      {isUserMakingUpdateOnStudentAccount ? <>
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                        <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      </> : <>{t("save")}<FaSave style={{ margin:t("us")===t("Us")?"3px 6px 1px 3px":"5px 6px 1px 3px"}} size={15} /></>
                      }
                    </button>
                  )}
                </form>
              </div>
            ) : changableSubscriptionState.instructor !== undefined ? (
              <div className={StudentSubscriptionStyles["student-sessions-days-hours"]}>
                {busyDaysHoursWarningAlert ? <div className={StudentSubscriptionStyles['days-hour-session-alert-validate']}>
                  <MdError size={40} color="#FFFFFF" />
                  <span>{contentOfBusyDaysHoursWarningAlert}</span>
                </div> : null}
                <section className={StudentSubscriptionStyles['colors-section-keys-whole-container']}>
                  <div>
                    <span style={{ background: '#000000' }}>{""}</span>
                    <span>{t("Instructor Available")}</span>
                  </div>
                  <div>
                    <span style={{ background: '#d9d9f3' }}>{""}</span>
                    <span>{t("Instructor Not Available")}</span>
                  </div>
                  <div>
                    <span style={{ background: '#00c07f' }}>{""}</span>
                    <span>{t("Student Prefers")}</span>
                  </div>
                  <div>
                    <span style={{ background: '#f9c324' }}>{""}</span>
                    <span>{t("Student's Sessions Days And Hours")}</span>
                  </div>
                </section>
                {/* change date and time of the sessions operations */}
                <form method="post">
                  <span>{t("Session Days")}</span>
                  <div
                    className={`${StudentSubscriptionStyles["days-check-box-container"]}`}
                  >
                    <div>
                      <Form.Label htmlFor="d0" style={{ color: disabledDays.d0 ? '#d9d9f3' : prefsDays.d0 ? '#00c07f' : '#000000', background: stdBusyDays.d0 ? '#f9c324' : '', borderRadius: '2px' }}>{t("Saturday")}</Form.Label>
                      <Form.Check
                        name="d0"
                        id="d0"
                        value={0}
                        disabled={disabledDays.d0}
                        style={{ cursor: disabledDays.d0 ? 'not-allowed' : 'pointer' }}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d0"]}
                      />
                      <Form.Check
                        type="radio"
                        name="avaliable_hours_related_to_specific_day"
                        id="d0"
                        disabled={disabledDaysRadio.d0}
                        onChange={(event) => handleAppointmentInDaysRadio(event)}
                        checked={checkDaysRadio["d0"]}
                        style={{ cursor: disabledDaysRadio.d0 ? 'not-allowed' : 'pointer' }}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d1" style={{ color: disabledDays.d1 ? '#d9d9f3' : prefsDays.d1 ? '#00c07f' : '#000000', backgroundColor: stdBusyDays.d1 ? '#f9c324' : '', borderRadius: '2px' }}>{t("Sunday")}</Form.Label>
                      <Form.Check
                        name="d1"
                        id="d1"
                        disabled={disabledDays.d1}
                        value={1}
                        style={{ cursor: disabledDays.d1 ? 'not-allowed' : 'pointer' }}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d1"]}
                      />
                      <Form.Check
                        type="radio"
                        name="avaliable_hours_related_to_specific_day"
                        id="d1"
                        disabled={disabledDaysRadio.d1}
                        onChange={(event) => handleAppointmentInDaysRadio(event)}
                        checked={checkDaysRadio["d1"]}
                        style={{ cursor: disabledDaysRadio.d1 ? 'not-allowed' : 'pointer' }}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d2" style={{ color: disabledDays.d2 ? '#d9d9f3' : prefsDays.d2 ? '#00c07f' : '#000000', backgroundColor: stdBusyDays.d2 ? '#f9c324' : '', borderRadius: '2px' }}>{t("Monday")}</Form.Label>
                      <Form.Check
                        name="d2"
                        id="d2"
                        style={{ cursor: disabledDays.d2 ? 'not-allowed' : 'pointer' }}
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
                        onChange={(event) => handleAppointmentInDaysRadio(event)}
                        checked={checkDaysRadio["d2"]}
                        style={{ cursor: disabledDaysRadio.d2 ? 'not-allowed' : 'pointer' }}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d3" style={{ color: disabledDays.d3 ? '#d9d9f3' : prefsDays.d3 ? '#00c07f' : '#000000', backgroundColor: stdBusyDays.d3 ? '#f9c324' : '', borderRadius: '2px' }}>{t("Tuesday")}</Form.Label>
                      <Form.Check
                        name="d3"
                        id="d3"
                        disabled={disabledDays.d3}
                        style={{ cursor: disabledDays.d3 ? 'not-allowed' : 'pointer' }}
                        value={3}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d3"]}
                      />
                      <Form.Check
                        type="radio"
                        name="avaliable_hours_related_to_specific_day"
                        id="d3"
                        disabled={disabledDaysRadio.d3}
                        onChange={(event) => handleAppointmentInDaysRadio(event)}
                        checked={checkDaysRadio["d3"]}
                        style={{ cursor: disabledDaysRadio.d3 ? 'not-allowed' : 'pointer' }}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d4" style={{ color: disabledDays.d4 ? '#d9d9f3' : prefsDays.d4 ? '#00c07f' : '#000000', backgroundColor: stdBusyDays.d4 ? '#f9c324' : '', borderRadius: '2px' }}>{t("Wednesday")}</Form.Label>
                      <Form.Check
                        name="d4"
                        id="d4"
                        disabled={disabledDays.d4}
                        value={4}
                        style={{ cursor: disabledDays.d4 ? 'not-allowed' : 'pointer' }}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d4"]}
                      />
                      <Form.Check
                        type="radio"
                        name="avaliable_hours_related_to_specific_day"
                        id="d4"
                        disabled={disabledDaysRadio.d4}
                        onChange={(event) => handleAppointmentInDaysRadio(event)}
                        checked={checkDaysRadio["d4"]}
                        style={{ cursor: disabledDaysRadio.d4 ? 'not-allowed' : 'pointer' }}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d5" style={{ color: disabledDays.d5 ? '#d9d9f3' : prefsDays.d5 ? '#00c07f' : '#000000', backgroundColor: stdBusyDays.d5 ? '#f9c324' : '', borderRadius: '2px' }}>{t("Thursday")}</Form.Label>
                      <Form.Check
                        name="d5"
                        id="d5"
                        disabled={disabledDays.d5}
                        value={5}
                        style={{ cursor: disabledDays.d5 ? 'not-allowed' : 'pointer' }}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d5"]}
                      />
                      <Form.Check
                        type="radio"
                        name="avaliable_hours_related_to_specific_day"
                        id="d5"
                        disabled={disabledDaysRadio.d5}
                        onChange={(event) => handleAppointmentInDaysRadio(event)}
                        checked={checkDaysRadio["d5"]}
                        style={{ cursor: disabledDaysRadio.d5 ? 'not-allowed' : 'pointer' }}
                      />
                    </div>
                    <div>
                      <Form.Label htmlFor="d6" style={{ color: disabledDays.d6 ? '#d9d9f3' : prefsDays.d6 ? '#00c07f' : '#000000', backgroundColor: stdBusyDays.d6 ? '#f9c324' : '', borderRadius: '2px' }}>{t("Friday")}</Form.Label>
                      <Form.Check
                        name="d6"
                        id="d6"
                        disabled={disabledDays.d6}
                        style={{ cursor: disabledDays.d6 ? 'not-allowed' : 'pointer' }}
                        value={6}
                        onChange={(event) => handleAppointmentInDays(event)}
                        checked={checkedDays["d6"]}
                      />
                      <Form.Check
                        type="radio"
                        name="avaliable_hours_related_to_specific_day"
                        id="d6"
                        disabled={disabledDaysRadio.d6}
                        style={{ cursor: disabledDaysRadio.d6 ? 'not-allowed' : 'pointer' }}
                        onChange={(event) => handleAppointmentInDaysRadio(event)}
                        checked={checkDaysRadio["d6"]}
                      />
                    </div>
                  </div>
                  {checkDaysRadio.d0 ? <>
                    <span>{t("Session Times on")}<span style={{ color: '#198754', fontWeight: 'bold', verticalAlign: 'text-bottom' }}>{days[0]}</span></span>
                    <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                      {Working_hours.map((wh, index) => (
                        <div key={wh.id}>
                          <Form.Label htmlFor={wh.att} style={{ color: disabledHoursD0[`h${index}`] || disabledCompletedHourReachedMaximumNumOfStdD0[`h${index}`] ? '#dadada' : prefsHoursD0[`h${index}`] ? '#00c07f' : '#000000', backgroundColor: stdBusyHoursD0[`h${index}`] ? 'rgba(15,255,149,.3)' : '', borderRadius: '2px' }}>
                            {wh.appointment}
                          </Form.Label>
                          <Form.Check
                            type="radio"
                            id={wh.att}
                            //name={wh.att}
                            name="sessionsHoursOnD0"
                            value={index}
                            disabled={disabledHoursD0[`h${index}`]}
                            style={{ cursor: disabledHoursD0[`h${index}`] ? 'not-allowed' : 'pointer' }}
                            onChange={handleApoointmentInHoursD0}
                            checked={checkedHoursD0[`h${index}`]}

                          />
                          <ImUsers style={{ color: disabledCompletedHourReachedMaximumNumOfStdD0[`h${index}`] ? '#dadada' : '#000000' }} />{" "}<span style={{ verticalAlign: 'text-top', color: disabledCompletedHourReachedMaximumNumOfStdD0[`h${index}`] ? '#dadada' : '#000000' }}>{nReservedSessionsByStdD0[`h${index}`]}</span>
                        </div>
                      ))}</div></> : checkDaysRadio.d1 ? <>
                        <span>{t("Session Times on")} <span style={{ color: '#198754', fontWeight: 'bold', verticalAlign: 'text-bottom' }}>{days[1]}</span></span>
                        <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                          {Working_hours.map((wh, index) => (
                            <div key={wh.id}>
                              <Form.Label htmlFor={wh.att} style={{ color: disabledHoursD1[`h${index}`] || disabledCompletedHourReachedMaximumNumOfStdD1[`h${index}`] ? '#dadada' : prefsHoursD1[`h${index}`] ? '#00c07f' : '#000000', backgroundColor: stdBusyHoursD1[`h${index}`] ? 'rgba(15,255,149,.3)' : '', borderRadius: '2px' }}>
                                {wh.appointment}
                              </Form.Label>
                              <Form.Check
                                type="radio"
                                id={wh.att}
                                //name={wh.att}
                                name="sessionsHoursOnD1"
                                value={index}
                                disabled={disabledHoursD1[`h${index}`]}
                                style={{ cursor: disabledHoursD1[`h${index}`] ? 'not-allowed' : 'pointer' }}
                                onChange={handleApoointmentInHoursD1}
                                checked={checkedHoursD1[`h${index}`]}
                              />
                              <ImUsers style={{ color: disabledCompletedHourReachedMaximumNumOfStdD1[`h${index}`] ? '#dadada' : '#000000' }} />{" "}<span style={{ verticalAlign: "text-top", color: disabledCompletedHourReachedMaximumNumOfStdD1[`h${index}`] ? '#dadada' : '#000000' }}>{nReservedSessionsByStdD1[`h${index}`]}</span>
                            </div>
                          ))}</div></> : checkDaysRadio.d2 ? <>
                            <span>{t("Session Times on")}<span style={{ color: '#198754', fontWeight: 'bold', verticalAlign: 'text-bottom' }}>{days[2]}</span></span>
                            <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                              {Working_hours.map((wh, index) => (
                                <div key={wh.id}>
                                  <Form.Label htmlFor={wh.att} style={{ color: disabledHoursD2[`h${index}`] || disabledCompletedHourReachedMaximumNumOfStdD2[`h${index}`] ? '#dadada' : prefsHoursD2[`h${index}`] ? '#00c07f' : '#000000', backgroundColor: stdBusyHoursD2[`h${index}`] ? 'rgba(15,255,149,.3)' : '', borderRadius: '2px' }}>
                                    {wh.appointment}
                                  </Form.Label>
                                  <Form.Check
                                  type="radio"
                                    id={wh.att}
                                    //name={wh.att}
                                    name="sessionsHoursOnD2"
                                    value={index}
                                    disabled={disabledHoursD2[`h${index}`]}
                                    style={{ cursor: disabledHoursD2[`h${index}`] ? 'not-allowed' : 'pointer' }}
                                    onChange={handleApoointmentInHoursD2}
                                    checked={checkedHoursD2[`h${index}`]}
                                  />
                                  <ImUsers style={{ color: disabledCompletedHourReachedMaximumNumOfStdD2[`h${index}`] ? '#dadada' : '#000000' }} />{" "}<span style={{ verticalAlign: "text-top", color: disabledCompletedHourReachedMaximumNumOfStdD2[`h${index}`] ? '#dadada' : '#000000' }}>{nReservedSessionsByStdD2[`h${index}`]}</span>
                                </div>

                              ))}</div></> : checkDaysRadio.d3 ? <>
                                <span>{t("Session Times on")} <span style={{ color: '#198754', fontWeight: 'bold', verticalAlign: 'text-bottom' }}>{days[3]}</span></span>
                                <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                                  {Working_hours.map((wh, index) => (
                                    <div key={wh.id}>
                                      <Form.Label htmlFor={wh.att} style={{ color: disabledHoursD3[`h${index}`] || disabledCompletedHourReachedMaximumNumOfStdD3[`h${index}`] ? '#dadada' : prefsHoursD3[`h${index}`] ? '#00c07f' : '#000000', backgroundColor: stdBusyHoursD3[`h${index}`] ? 'rgba(15,255,149,.3)' : '', borderRadius: '2px' }}>
                                        {wh.appointment}
                                      </Form.Label>
                                      <Form.Check
                                        type="radio"
                                        id={wh.att}
                                        //name={wh.att}
                                        name="sessionsHoursOnD3"
                                        value={index}
                                        disabled={disabledHoursD3[`h${index}`]}
                                        style={{ cursor: disabledHoursD3[`h${index}`] ? 'not-allowed' : 'pointer' }}
                                        onChange={handleApoointmentInHoursD3}
                                        checked={checkedHoursD3[`h${index}`]}
                                      />
                                      <ImUsers style={{ color: disabledCompletedHourReachedMaximumNumOfStdD3[`h${index}`] ? '#dadada' : '#000000' }} />{" "}<span style={{ verticalAlign: "text-top", color: disabledCompletedHourReachedMaximumNumOfStdD3[`h${index}`] ? '#dadada' : '#000000' }}>{nReservedSessionsByStdD3[`h${index}`]}</span>
                                    </div>
                                  ))}</div></> : checkDaysRadio.d4 ? <>
                                    <span>{t("Session Times on")}<span style={{ color: '#198754', fontWeight: 'bold', verticalAlign: 'text-bottom' }}>{days[4]}</span></span>
                                    <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                                      {Working_hours.map((wh, index) => (
                                        <div key={wh.id}>
                                          <Form.Label htmlFor={wh.att} style={{ color: disabledHoursD4[`h${index}`] || disabledCompletedHourReachedMaximumNumOfStdD4[`h${index}`] ? '#dadada' : prefsHoursD4[`h${index}`] ? '#00c07f' : '#000000', backgroundColor: stdBusyHoursD4[`h${index}`] ? 'rgba(15,255,149,.3)' : '', borderRadius: '2px' }}>
                                            {wh.appointment}
                                          </Form.Label>
                                          <Form.Check
                                            type="radio"
                                            id={wh.att}
                                            //name={wh.att}
                                            name="sessionsHoursOnD4"
                                            value={index}
                                            disabled={disabledHoursD4[`h${index}`]}
                                            style={{ cursor: disabledHoursD4[`h${index}`] ? 'not-allowed' : 'pointer' }}
                                            onChange={handleApoointmentInHoursD4}
                                            checked={checkedHoursD4[`h${index}`]}
                                          />
                                          <ImUsers style={{ color: disabledCompletedHourReachedMaximumNumOfStdD4[`h${index}`] ? '#dadada' : '#000000' }} />{" "}<span style={{ verticalAlign: "text-top", color: disabledCompletedHourReachedMaximumNumOfStdD4[`h${index}`] ? '#dadada' : '#000000' }}>{nReservedSessionsByStdD4[`h${index}`]}</span>
                                        </div>
                                      ))}</div></> : checkDaysRadio.d5 ? <>
                                        <span>{t("Session Times on")} <span style={{ color: '#198754', fontWeight: 'bold', verticalAlign: 'text-bottom' }}>{days[5]}</span></span>
                                        <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                                          {Working_hours.map((wh, index) => (
                                            <div key={wh.id}>
                                              <Form.Label htmlFor={wh.att} style={{ color: disabledHoursD5[`h${index}`] || disabledCompletedHourReachedMaximumNumOfStdD5[`h${index}`] ? '#dadada' : prefsHoursD5[`h${index}`] ? '#00c07f' : '#000000', backgroundColor: stdBusyHoursD5[`h${index}`] ? 'rgba(15,255,149,.3)' : '', borderRadius: '2px' }}>
                                                {wh.appointment}
                                              </Form.Label>
                                              <Form.Check
                                                type="radio"
                                                id={wh.att}
                                                //name={wh.att}
                                                name="sessionsHoursOnD5"
                                                value={index}
                                                disabled={disabledHoursD5[`h${index}`]}
                                                style={{ cursor: disabledHoursD5[`h${index}`] ? 'not-allowed' : 'pointer' }}
                                                onChange={handleApoointmentInHoursD5}
                                                checked={checkedHoursD5[`h${index}`]}
                                              />
                                              <ImUsers style={{ color: disabledCompletedHourReachedMaximumNumOfStdD5[`h${index}`] ? '#dadada' : '#000000' }} />{" "}<span style={{ verticalAlign: "text-top", color: disabledCompletedHourReachedMaximumNumOfStdD5[`h${index}`] ? '#dadada' : '#000000' }}>{nReservedSessionsByStdD5[`h${index}`]}</span>
                                            </div>
                                          ))}</div></> : checkDaysRadio.d6 ? <>
                                            <span>{t("Session Times on")} <span style={{ color: '#198754', fontWeight: 'bold', verticalAlign: 'text-bottom' }}>{days[6]}</span></span>
                                            <div className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}>
                                              {Working_hours.map((wh, index) => (
                                                <div key={wh.id}>
                                                  <Form.Label htmlFor={wh.att} style={{ color: disabledHoursD6[`h${index}`] || disabledCompletedHourReachedMaximumNumOfStdD6[`h${index}`] ? '#dadada' : prefsHoursD6[`h${index}`] ? '#00c07f' : '#000000', backgroundColor: stdBusyHoursD6[`h${index}`] ? 'rgba(15,255,149,.3)' : '', borderRadius: '2px' }}>
                                                    {wh.appointment}
                                                  </Form.Label>
                                                  <Form.Check
                                                    type="radio"
                                                    id={wh.att}
                                                   // name={wh.att}
                                                   name="sessionsHoursOnD6"
                                                    value={index}
                                                    disabled={disabledHoursD6[`h${index}`]}
                                                    style={{ cursor: disabledHoursD6[`h${index}`] ? 'not-allowed' : 'pointer' }}
                                                    onChange={handleApoointmentInHoursD6}
                                                    checked={checkedHoursD6[`h${index}`]}
                                                  />
                                                  <ImUsers style={{ color: disabledCompletedHourReachedMaximumNumOfStdD6[`h${index}`] ? '#dadada' : '#000000' }} />{" "}<span style={{ verticalAlign: "text-top", color: disabledCompletedHourReachedMaximumNumOfStdD6[`h${index}`] ? '#dadada' : '#000000' }}>{nReservedSessionsByStdD6[`h${index}`]}</span>
                                                </div>
                                              ))}</div></> : null
                  }
                  <button type="button" className={StudentSubscriptionStyles['btn']} style={{ marginTop: '7px' }} onClick={changeStudentSessionsDayHours}>
                    {isUserMakingUpdateOnStudentAccount ? <>
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                    </> : <>{t("update")}<img src={updateImageIcon} style={{ margin:t("us")===t("Us")?'6px 7px 0px 6px':'6px 6px 0 1px',width:'16px', objectFit: 'contain' }} alt="update" /></>}

                  </button>
                </form>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {isAlertVisible? (
        <div className={`${StudentSubscriptionStyles["alert"]} `}>
          <img src={CircleGif} alt="gif-alert-circle" />
          {(changableSubscriptionState.instructor !== null && changableSubscriptionState.instructor !== undefined) && changableSubscriptionState.subscription_state !== 'Cancelled' ? (
            <p style={{ width: '80%' }}><span> {JSON.parse(localStorage.getItem('user')).privileges}</span>  {t("has_Updated")} <span>{changableSubscriptionState.name} </span> {t("Account")}</p>
          ) : (changableSubscriptionState.instructor === null || changableSubscriptionState.instructor === undefined) && changableSubscriptionState.subscription_state === "Pending" ? (
            <p style={{ width: '80%' }}><span> {JSON.parse(localStorage.getItem('user')).privileges}</span> {t("has_Changed")} <span>{changableSubscriptionState.name} </span> {t("Subscription State and setting Started Date and Instructor Successfully")}</p>
          ) : changableSubscriptionState.subscription_state === "Cancelled" ? (
            <p><span> {JSON.parse(localStorage.getItem('user')).privileges}</span> {t("has_Cancelled")}  <span>{changableSubscriptionState.name} </span>{t("Account")}</p>
          ) : null}
        </div>
      ) : null}
      {isUserDeleteAnyAccount ? (
        <div className={StudentSubscriptionStyles["alert"]}>
          <img src={CircleGif} alt="successfull" />
          <span>
            <span style={{ fontWeight: "bold", color: "#198754" }}>
              {localStorage.getItem("user_name")}
            </span>{" "}
            {t("Has Deleted  Stuff Account Successfully")}
          </span>
        </div>
      ) : null}
    </>
  );
};
export default StudentSubscriptionState;
