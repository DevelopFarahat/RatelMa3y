import React, { useState, useCallback, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { IoIosPersonAdd } from "react-icons/io";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import SystemUsersStyles from "./SystemUsers.module.css";
import NoResultFiltaration from "../../assets/images/no-result.png";
import WarningIcon from "../../assets/images/warning.png";
import { TbChevronDownLeft, TbPlayerTrackNext } from "react-icons/tb";
import CircleGif from "../../assets/images/check-circle.gif";
import { FaTrash } from "react-icons/fa";
import { ImPrevious2 } from "react-icons/im";
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from "react-i18next";
import axios from "axios";
import GreaterThanWhiteImage from "../../assets/images/greater-than-white.png";
import GreaterThanGrayImage from "../../assets/images/greater-than-gray.png";
import LessThanWhiteImage from "../../assets/images/less-than-white.png";
import LessThanGrayImage from "../../assets/images/less-than-gray.png";
const SystemUsers = () => {
  const [t, i18n] = useTranslation();
  const [pageNo, setPageNo] = useState([]);
  const [pageNoCopy, setPageNoCopy] = useState([]);
  const [pageNoArrLength, setPageNoArrLength] = useState(-1);
  const [lastPage, setLastPage] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  //pagination functinality
  const handleUpCommingPage = (event) => {
    const id = event.currentTarget.id;
    setCurrentPage(Number(id));
    if (Number(id) >= 2 && Number(id) > currentPage) {
      //currentPage+1
      if (
        currentPage + 1 !== pageNo[pageNo.length - 1].index &&
        Number(id) <= pageNo[pageNo.length - 1].index
      ) {
        //if(Number(id) !== pageNo[pageNo.length-1].index){
        let pageNoCopy = [...pageNo];
        pageNoCopy.splice(0, 1);
        setPageNo(pageNoCopy);
      } else {
        if (
          Number(id) !== pageNoArrLength &&
          Number(id) === 2 &&
          lastPage.index !== 2
        ) {
          let pNoCopy = [...pageNoCopy];
          pNoCopy.splice(0, 1);
          setPageNo(pNoCopy);
        }
      }
    }
  };

  const getThePreviousPages = (event) => {
    let pNo = {};
    if (currentPage < pageNoArrLength && pageNo.length === 2) {
      /*
                pageNo.reverse().splice(0,1);
                pageNo.reverse();
                */
      if (currentPage - 1 !== 1) {
        pageNo.reverse().splice(0, 1);
        pageNo.reverse();
        pNo.id = pageNo[0].index - 1;
        pNo.index = pageNo[0].index - 1;
        pageNo.unshift(pNo);
        setPageNo(pageNo);
      } else {
        setPageNo(pageNoCopy);
      }
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    } else {
      if (pageNo.length !== 2) {
        /*
                    pageNo.reverse().splice(0,1);
                    pageNo.reverse();
                    */
        if (currentPage - 1 !== 1) {
          pageNo.reverse().splice(0, 1);
          pageNo.reverse();
          pNo.id = pageNo[0].index - 1;
          pNo.index = pageNo[0].index - 1;
          pageNo.unshift(pNo);
          setPageNo(pageNo);
        } else {
          console.log(pageNoCopy);
          setPageNo(pageNoCopy);
        }
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      } else {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      }
      console.log(pageNo);
    }
  };
  const getTheNextPages = (event) => {
    let pNo = {};
    if (currentPage + 1 <= 2) {
      if (
        currentPage + 1 !== pageNo[pageNo.length - 1].index &&
        pageNo.length !== 2
      ) {
        setCurrentPage(currentPage + 1);
      } else {
        setPageNo(pageNoCopy);
        setCurrentPage(currentPage + 1);
      }
    } else {
      if (currentPage + 1 > pageNo[pageNo.length - 1].index) {
        if (pageNo.length > 2) {
          setCurrentPage(currentPage + 1);
        } else {
          if (currentPage !== pageNoArrLength) {
            /*
                    let pNoCopy = [...pageNo];
                    pNoCopy.splice(0,1);
                    console.log(pNoCopy);
                     setPageNo(pNoCopy);
                     setCurrentPage(currentPage+1);
                     */
            pageNo.splice(0, 1);

            pNo.id = currentPage + 1;
            pNo.index = currentPage + 1;
            pageNo.push(pNo);
            setPageNo(pageNo);

            setCurrentPage(currentPage + 1);
          } else {
            setCurrentPage(currentPage + 1);
          }
        }
      } else {
        //  if(currentPage === 2 && pageNo.length < 9){
        if (currentPage === 2 && pageNo.length < pageNoArrLength) {
          let pNoCopy = [...pageNoCopy];
          pNoCopy.splice(0, 1);
          console.log(pNoCopy);
          setPageNo(pNoCopy);
          setCurrentPage(currentPage + 1);
        } else {
          if (pageNo.length > 2) {
            let pNoCopy = [...pageNo];
            pNoCopy.splice(0, 1);
            console.log(pNoCopy);
            setPageNo(pNoCopy);
            setCurrentPage(currentPage + 1);
          } else {
            setCurrentPage(currentPage + 1);
          }
        }
      }
    }
  };
  // pagination functionality ended
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
    { id: 0, appointment: `8:00 ${t("AM")}`, att: "h0" },
    { id: 1, appointment: `10:00 ${t("AM")}`, att: "h1" },
    { id: 2, appointment: `12:00 ${t("PM")}`, att: "h2" },
    { id: 3, appointment: `2:00 ${t("PM")}`, att: "h3" },
    { id: 4, appointment: `4:00 ${t("PM")}`, att: "h4" },
    { id: 5, appointment: `6:00 ${t("PM")}`, att: "h5" },
    { id: 6, appointment: `8:00 ${t("PM")}`, att: "h6" },
    { id: 7, appointment: `10:00 ${t("PM")}`, att: "h7" },
  ];


  const [accountsData, setAccountsData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [filterValue, setFilterValue] = useState("");
  const [isThereAnyUpdateOrCreatingNewAccount, setIsThereAnyUpdateOrCreatingNewAccount] = useState(false);
  const [isThereAnyUpdateOnAccount, setIsThereAnyUpdateOnAccount] = useState(false);
  const [isUserCreateNewAccount, setIsUserCreateNewAccount] = useState(false);
  const [deleteAlertConfirmation, setAlertDeleteConfirmation] = useState(false);
  const [donnotAskmeAgain, setDonotAskmeAgain] = useState(false);
  const [staffAccount, setStaffAcount] = useState([]);
  const [donnotAskmeAgainChecked, setDonotAskmeAgainChecked] = useState(false);
  const [isUserDeleteAnyAccount, setIsUserDeleteAnyAccount] = useState(false);
  const [isUserMadeAnyUpdateToAnyAccount, setIsUserMadeAnyUpdateToAnyAccount] =
    useState(false);
  const initialResponse = useRef();
  const [selectAllDays, setSelectAllDays] = useState(false);
  const [selectAllHours, setSlectAllHours] = useState(false);
  const [workingDays, setWorkingDays] = useState({
    d0: "",
    d1: "",
    d2: "",
    d3: "",
    d4: "",
    d5: "",
    d6: "",
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
  const [systemUsersFormSteps, setSystemUsersFormSteps] = useState({
    firstStep: true,
    secondStep: false,
    thirdStep: false,
    fourthStep: false,
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
  const [userData, setUserData] = useState({
    _id: "",
    email: "",
    name: "",
    gender: "",
    age: "",
    state: "",
    started_at: "",
    prefs: {
      working_hours: [],
      working_days: [],
    },
    password: "",
    mobile: "",
    privileges: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    nameError: "",
    ageError: "",
    genderError: "",
    stateError: "",
    started_atError: "",
    working_hoursError: "",
    working_daysError: "",
    privilegesError: "",
    mobileError: "",
    programsError: "",
    passwordError: "",
  });

  const [fetchAgain, setFetchAgain] = useState(0); //Just dummy number to tell that another fetch call is needed
  const handleDonnotAskmeAgainChange = (event) => {
    setDonotAskmeAgainChecked(current => !current);
    if (event.target.checked) {
      setDonotAskmeAgain(true);
    } else {
      setDonotAskmeAgain(false);
    }
  }
  const handleChange = (event) => {
    if (event.target.id !== "age") {
      setUserData({
        ...userData,
        [event.target.id]: event.target.value,
      });
    } else {
      setUserData({
        ...userData,
        age: Number(event.target.value),
      });
    }
    errorHandle(event.target.id, event.target.value);
    localStorage.setItem("newAccountUserFullname", userData.name);
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
      setWorkingHours({
        ...WorkingHours,
        [`h${event.target.value}`]: "",
      });
    }
  };

  const handleSelectAllDays = (event) => {
    setSelectAllDays(current => !current);
    if (event.currentTarget.checked) {
      setCheckedDays({
        d0: true,
        d1: true,
        d2: true,
        d3: true,
        d4: true,
        d5: true,
        d6: true,
      });
      setWorkingDays({
        d0: 0,
        d1: 1,
        d2: 2,
        d3: 3,
        d4: 4,
        d5: 5,
        d6: 6,
      })
    } else {
      setWorkingDays({
        d0: false,
        d1: false,
        d2: false,
        d3: false,
        d4: false,
        d5: false,
        d6: false,
      });
      setCheckedDays({
        d0: "",
        d1: "",
        d2: "",
        d3: "",
        d4: "",
        d5: "",
        d6: "",
      })
    }

  }
  const handleSelectAllHours = (event) => {
    setSlectAllHours(current => !current);
    if (event.currentTarget.checked) {
      setCheckedHours({
        h0: true,
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        h6: true,
        h7: true,
      });
      setWorkingHours({
        h0: workingHoursCheckedValuesArr[0],
        h1: workingHoursCheckedValuesArr[1],
        h2: workingHoursCheckedValuesArr[2],
        h3: workingHoursCheckedValuesArr[3],
        h4: workingHoursCheckedValuesArr[4],
        h5: workingHoursCheckedValuesArr[5],
        h6: workingHoursCheckedValuesArr[6],
        h7: workingHoursCheckedValuesArr[7],
      });
    } else {
      setCheckedHours({
        h0: false,
        h1: false,
        h2: false,
        h3: false,
        h4: false,
        h5: false,
        h6: false,
        h7: false,
      });
      setWorkingHours({
        h0: "",
        h1: "",
        h2: "",
        h3: "",
        h4: "",
        h5: "",
        h6: "",
        h7: "",
      });
    }
  }
  const handlerRowClicked = useCallback((event) => {
    const id = event.currentTarget.id;
    setSelectedRow(id);
  }, []);
  const errorHandle = (filed, value) => {
    if (filed === "email") {
      const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i;
      setErrors({
        ...errors,
        emailError:
          value.length === 0
            ? t("keepintouch_required")
            : emailRegx.test(value)
              ? null
              : t("student_email_error_message")
      });
    } else if (filed === "mobile") {
      const mobileRegx = /^[+][0-9]+(01)(0|1|2|5)[0-9]{8}$/;
      setErrors({
        ...errors,
        mobileError:
          value.length === 0
            ? t("keepintouch_required")
            : mobileRegx.test(value)

      });
    } else if (filed === "name") {
      const nameRegx = /[a-z A-Z]{3,}\s{1}[a-z A-Z]{3,}$/;
      setErrors({
        ...errors,
        nameError:
          value.length === 0
            ? t("keepintouch_required")
            : nameRegx.test(value) ? null : t("student_fullname_error")

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
              : t("student_password_error")
      });
    } else if (filed === "privileges") {
      setErrors({
        ...errors,
        privilegesError: value.length === 0 ? t("keepintouch_required") : null,
      });
    } else if (filed === "state") {
      setErrors({
        ...errors,
        stateError: value.length === 0 ? t("keepintouch_required") : "",
      });
    } else if (filed === "started_at") {
      setErrors({
        ...errors,
        started_atError: value.length === 0 ? t("keepintouch_required") : "",
      });
    }
  };

  const handleSubmit = (event) => {
    setIsThereAnyUpdateOrCreatingNewAccount(true);
    event.preventDefault();
    if (
      workingDays.d0 === "" &&
      workingDays.d1 === "" &&
      workingDays.d2 === "" &&
      workingDays.d3 === "" &&
      workingDays.d4 === "" &&
      workingDays.d5 === "" &&
      workingDays.d6 === ""
    ) {
      setErrors({
        ...errors,
        working_daysError: "Choose At Least One Day",
        working_hoursError: "",
      });
    } else if (
      WorkingHours.h0 === "" &&
      WorkingHours.h1 === "" &&
      WorkingHours.h2 === "" &&
      WorkingHours.h3 === "" &&
      WorkingHours.h4 === "" &&
      WorkingHours.h5 === "" &&
      WorkingHours.h6 === "" &&
      WorkingHours.h7 === ""
    ) {
      setErrors({
        ...errors,
        working_daysError: "",
        working_hoursError: "Choose At Least One Hour",
      });
    } else {
      setErrors({
        ...errors,
        working_hoursError: "",
        working_daysError: "",
      });
    }
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
    setUserData({
      ...userData,
      prefs: {
        working_days: wD,
        working_hours: wHours,
      },
    });

    let finalUser = {
      email: userData.email,
      name: userData.name,
      gender: userData.gender,
      age: userData.age,
      state: userData.state,
      started_at: userData.started_at,
      prefs: {
        working_days: wD,
        working_hours: wHours,
      },
      mobile: userData.mobile,
      privileges: userData.privileges,
      password: userData.password,
    };
    if (userData._id === "") {
      axios
        .post(`${process.env.REACT_APP_BACK_HOST_URL}/api/instructors`, finalUser,{headers:{'Access-Control-Allow-Origin': '*'}})
        .then((res) => {
          setFetchAgain(fetchAgain + 1);
          setUserData({
            _id: "",
            email: "",
            name: "",
            gender: "",
            age: "",
            state: "",
            started_at: "",
            prefs: {
              working_hours: [],
              working_days: [],
            },
            password: "",
            mobile: "",
            privileges: "",
          });
          setWorkingDays({
            d0: "",
            d1: "",
            d2: "",
            d3: "",
            d4: "",
            d5: "",
            d6: "",
          });
          setWorkingHours({
            h0: "",
            h1: "",
            h2: "",
            h3: "",
            h4: "",
            h5: "",
            h6: "",
            h7: "",
          });
          setCheckedDays({
            d0: false,
            d1: false,
            d2: false,
            d3: false,
            d4: false,
            d5: false,
            d6: false,
          });
          setCheckedHours({
            h0: false,
            h1: false,
            h2: false,
            h3: false,
            h4: false,
            h5: false,
            h6: false,
            h7: false,
          });
          setSystemUsersFormSteps({
            firstStep: true,
            secondStep: false,
            thirdStep: false,
            fourthStep: false
          });
          setIsThereAnyUpdateOrCreatingNewAccount(false);
          setIsUserCreateNewAccount(true);

          setTimeout(() => {
            setIsUserCreateNewAccount(false);
          }, 2000);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      axios
        .put(
          `${process.env.REACT_APP_BACK_HOST_URL}/api/instructors/${userData._id}`,
          {
            email: userData.email,
            name: userData.name,
            gender: userData.gender,
            age: userData.age,
            state: userData.state,
            started_at: userData.started_at,
            prefs: {
              working_hours: wHours,
              working_days: wD,
            },
            mobile: userData.mobile,
            privileges: userData.privileges,
          }
          ,{headers:{'Access-Control-Allow-Origin': '*'}}
        )
        .then((res) => {
          setFetchAgain(fetchAgain + 1);
          setSelectedRow(-1);
          console.log(res.data);
          setUserData({
            _id: "",
            email: "",
            name: "",
            gender: "",
            age: "",
            state: "",
            started_at: "",
            prefs: {
              working_hours: [],
              working_days: [],
            },
            password: "",
            mobile: "",
            privileges: "",
          });
          setWorkingDays({
            d0: "",
            d1: "",
            d2: "",
            d3: "",
            d4: "",
            d5: "",
            d6: "",
          });
          setWorkingHours({
            h0: "",
            h1: "",
            h2: "",
            h3: "",
            h4: "",
            h5: "",
            h6: "",
            h7: "",
          });
          setCheckedDays({
            d0: false,
            d1: false,
            d2: false,
            d3: false,
            d4: false,
            d5: false,
            d6: false,
          });
          setCheckedHours({
            h0: false,
            h1: false,
            h2: false,
            h3: false,
            h4: false,
            h5: false,
            h6: false,
            h7: false,
          });
          setSystemUsersFormSteps({
            firstStep: true,
            secondStep: false,
            thirdStep: false,
            fourthStep: false
          });
          setIsThereAnyUpdateOrCreatingNewAccount(false);
          setIsThereAnyUpdateOnAccount(false);
          setIsUserMadeAnyUpdateToAnyAccount(true);
          setTimeout(() => {
            setIsUserMadeAnyUpdateToAnyAccount(false);
          }, 2000);
        })
        .catch((error) => {
          console.lo(error.message);
        });
    }
  };

  const filterAccounts = () => {
    let filtarationArr = [];
    for (let i = 0; i < accountsData.length; i++) {
      if (
        accountsData[i].name.toLowerCase().includes(filterValue.toLowerCase())
      ) {
        filtarationArr.push(accountsData[i]);
      } else if (
        accountsData[i].privileges
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      ) {
        filtarationArr.push(accountsData[i]);
      }
    }
    filterValue !== ""
      ? setAccountsData(filtarationArr)
      : setAccountsData(initialResponse.current);
  };
  const resetTableFiltaration = () => {
    setFilterValue("");
    setAccountsData(initialResponse.current);
  };
  const handleFiltaration = (event) => {
    setFilterValue(event.target.value);
  };
  const systemUsersNextStep = (event) => {
    event.preventDefault();
    event.currentTarget.id === "firstStep"
      ? setSystemUsersFormSteps({
        firstStep: true,
        secondStep: false,
        thirdStep: false,
        fourthStep: false,
      })
      : event.currentTarget.id === "secondStep"
        ? setSystemUsersFormSteps({
          firstStep: false,
          secondStep: true,
          thirdStep: false,
          fourthStep: false,
        })
        : event.currentTarget.id === "thirdStep"
          ? setSystemUsersFormSteps({
            firstStep: false,
            secondStep: false,
            thirdStep: true,
            fourthStep: false,
          })
          : event.currentTarget.id === "fourthStep"
            ? setSystemUsersFormSteps({
              firstStep: false,
              secondStep: false,
              thirdStep: false,
              fourthStep: true,
            })
            : event.currentTarget.id === "firstStepPrevious"
              ? setSystemUsersFormSteps({
                firstStep: true,
                secondStep: false,
                thirdStep: false,
                fourthStep: false,
              })
              : event.currentTarget.id === "secondStepPrevious"
                ? setSystemUsersFormSteps({
                  firstStep: false,
                  secondStep: true,
                  thirdStep: false,
                  fourthStep: false,
                })
                : setSystemUsersFormSteps({
                  firstStep: false,
                  secondStep: false,
                  thirdStep: true,
                  fourthStep: false,
                });
  };

  const updateSpecificAccount = (event, userAccount) => {
    setIsThereAnyUpdateOnAccount(true);
    let workingHoursInitialObji = {};
    let workingHoursCheckedInitialObji = {};
    let workinDaysInitialObji = {};
    let workingDaysCheckedInitialObji = {};
    setUserData({
      _id: userAccount._id,
      email: userAccount.email,
      name: userAccount.name,
      gender: userAccount.gender,
      age: userAccount.age,
      state: userAccount.state,
      started_at: userAccount.started_at.split("T")[0],
      prefs: {
        working_hours: userAccount.prefs.working_hours,
        working_days: userAccount.prefs.working_days,
      },
      mobile: userAccount.mobile,
      privileges: userAccount.privileges,
      password: 'whpLr4ZX'
    });
    for (let i = 0; i < userAccount.prefs.working_days.length; i++) {
      if (userAccount.prefs.working_days[i] !== -1) {
        workinDaysInitialObji[`d${i}`] = userAccount.prefs.working_days[i];
        workingDaysCheckedInitialObji[`d${i}`] = true;
      } else {
        workinDaysInitialObji[`d${i}`] = userAccount.prefs.working_days[i];
        workingDaysCheckedInitialObji[`d${i}`] = false;
      }
    }
    for (let i = 0; i < userAccount.prefs.working_hours.length; i++) {
      if (userAccount.prefs.working_hours[i][1] !== 0) {
        workingHoursInitialObji[`h${i}`] = [
          userAccount.prefs.working_hours[i][0],
          userAccount.prefs.working_hours[i][1],
        ];
        workingHoursCheckedInitialObji[`h${i}`] = true;
      } else {
        workingHoursInitialObji[`h${i}`] = [
          userAccount.prefs.working_hours[i][0],
          userAccount.prefs.working_hours[i][1],
        ];
        workingHoursCheckedInitialObji[`h${i}`] = false;
      }
    }
    setWorkingDays(workinDaysInitialObji);
    setCheckedDays(workingDaysCheckedInitialObji);
    setWorkingHours(workingHoursInitialObji);
    setCheckedHours(workingHoursCheckedInitialObji);
    handlerRowClicked(event);
  };
  const sortSystemUsersTableByRoleOfTheUser = (event) => {
    let userDataCopy = [...accountsData];
    for (let i = 0; i < userDataCopy.length; i++) {
      if (event.target.value === 'ADMIN') {
        if (userDataCopy[i].privileges === 'Admin') {
          userDataCopy[i].precedence = 2;
        } else if (userDataCopy[i].privileges === 'Supervisor') {
          userDataCopy[i].precedence = 1;
        } else {
          userDataCopy[i].precedence = 0;
        }
      } else if (event.target.value === 'SUPERVISOR') {
        console.log(true);
        if (userDataCopy[i].privileges === 'Admin') {
          userDataCopy[i].precedence = 1;
        } else if (userDataCopy[i].privileges === 'Supervisor') {
          userDataCopy[i].precedence = 2;
        } else {
          userDataCopy[i].precedence = 0;
        }
      } else {
        if (userDataCopy[i].privileges === 'Admin') {
          userDataCopy[i].precedence = 0;
        } else if (userDataCopy[i].privileges === 'Supervisor') {
          userDataCopy[i].precedence = 1;
        } else {
          userDataCopy[i].precedence = 2;
        }
      }

    }
    switch (event.target.value) {
      case "ADMIN":
        userDataCopy.sort((a, b) => {
          return b.precedence - a.precedence;
        });
        break;
      case "SUPERVISOR":
        userDataCopy.sort((a, b) => {
          return b.precedence - a.precedence;
        });
        break;
      case "INSTRUCTOR":
        userDataCopy.sort((a, b) => {
          return b.precedence - a.precedence;
        });
        break;
      default:
    }
    setAccountsData(userDataCopy);
  }
  const deleteStaffAccount = (event, sAccount) => {
    event.stopPropagation();
    if (sAccount !== undefined) {
      setStaffAcount(sAccount);
    }
    if (donnotAskmeAgain === false || event.currentTarget.value === 'confirm') {
      if (event.currentTarget.value === 'cancel') {
        setAlertDeleteConfirmation(false);
      } else {
        setAlertDeleteConfirmation(true);
      }

    } else {
      setAlertDeleteConfirmation(false);
    }
    if (event.currentTarget.value === 'confirm' || donnotAskmeAgain === true) {
      let staffAcc = sAccount === undefined ? staffAccount : sAccount;
      axios.delete(`${process.env.REACT_APP_BACK_HOST_URL}/api/instructors/${staffAcc._id}`, { headers: {}, data: { studentsIDs: staffAcc.students } }).then((res) => {
        setAlertDeleteConfirmation(false);
        setFetchAgain(fetchAgain + 1);
        setIsUserDeleteAnyAccount(true);
        setTimeout(() => {
          setIsUserDeleteAnyAccount(false);
        }, 1000)

      }).catch((error) => {
        console.error(error)
      })
    }

  }
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACK_HOST_URL}/api/instructors?limit=300&page=${currentPage}`,{headers:{'Access-Control-Allow-Origin': '*'}}
      )
      .then((res) => {
        initialResponse.current = res.data.data;
        setAccountsData(res.data.data);
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchAgain, currentPage]);

  return (
    <>
      {isUserCreateNewAccount ? (
        <div className={SystemUsersStyles["alert-container"]}>
          <img src={CircleGif} alt="successfull" />
          <span>
            <span style={{ fontWeight: "bold", color: "#198754" }}>
              {localStorage.getItem("user_name")}
            </span>{" "}
            :
            <span style={{ fontWeight: "bold", color: "#198754" }}>
              {localStorage.getItem("newAccountUserFullname")}
            </span>
            {t("Has Added New Ratel Ma3y Staff Account")}
          </span>
        </div>
      ) : isUserMadeAnyUpdateToAnyAccount ? (
        <div className={SystemUsersStyles["alert-container"]}>
          <img src={CircleGif} alt="successfull" />
          <span>
            <span style={{ fontWeight: "bold", color: "#198754" }}>
              {localStorage.getItem("user_name")}
            </span>{" "}
            {t("Has Updated Staff Account Successfully")}
          </span>
        </div>
      ) : isUserDeleteAnyAccount ? (
        <div className={SystemUsersStyles["alert-container"]}>
          <img src={CircleGif} alt="successfull" />
          <span>
            <span style={{ fontWeight: "bold", color: "#198754" }}>
              {localStorage.getItem("user_name")}
            </span>{" "}
            {t("Has Deleted  Staff Account Successfully")}
          </span>
        </div>
      ) : null}
      {deleteAlertConfirmation ? <div className={`${SystemUsersStyles["alert-container"]} ${SystemUsersStyles["warning-alert"]}`}>
        <section>
          <img src={WarningIcon} alt="warning" />
          <span>{t("are you sure you want to delete this account")}</span>
        </section>
        <section style={{width:t("us")===t("Us")?'98%':'88%'}}>
          <Form.Check checked={donnotAskmeAgainChecked} name="donotAskmeAgain" id="donotAskmeAgain" onChange={handleDonnotAskmeAgainChange} />
          <Form.Label htmlFor="donotAskmeAgain">{t("don't ask me again!")}</Form.Label>
        </section>
        <section style={{direction:t("us")===t("Us")?'ltr':'rtl'}}>
          <button type="submit" className={SystemUsersStyles['btn']} value={"confirm"} onClick={deleteStaffAccount}>{t("confirm")}</button>
          <button type="submit" value={"cancel"} className={SystemUsersStyles['btn']} onClick={deleteStaffAccount}>{t("cancel")}</button>
        </section>
      </div> : null}
      <div className={SystemUsersStyles["system-user-main"]}>
        <div
          className={SystemUsersStyles["pagination-container"]}
          style={{ direction: "rtl" }}
        >
          {pageNo !== undefined ? (
            <ul>
              <button
                type="button"
                className={SystemUsersStyles["btn"]}
                disabled={currentPage === 1 ? true : false}
                style={{
                  cursor: 1 === currentPage ? "not-allowed" : "pointer"
                }}
                onClick={getThePreviousPages}
              >
                <img
                  src={
                    currentPage === 1
                      ? GreaterThanGrayImage
                      : GreaterThanWhiteImage
                  }
                  alt="GreaterThan"
                />
              </button>
              {pageNo.map((pN, index) =>
                index < 2 ? (
                  <li
                    key={pN.index}
                    id={pN.index}
                    style={{
                      background:
                        Number(currentPage) === pN.index ? "#198754" : "",
                      color: Number(currentPage) === pN.index ? "#FFFFFF" : "",
                    }}
                    onClick={handleUpCommingPage}
                  >
                    {pN.index}
                  </li>
                ) : null
              )}
              <li className={SystemUsersStyles["pages-separator"]}><span>...</span></li>
              {lastPage !== undefined ? (
                lastPage.index !== -1 ? (
                  <li
                    id={lastPage.id}
                    style={{
                      background:
                        Number(currentPage) === lastPage.index ? "#198754" : "",
                      color:
                        Number(currentPage) === lastPage.index ? "#FFFFFF" : "",
                    }}
                    onClick={handleUpCommingPage}
                  >
                    {lastPage.index}
                  </li>
                ) : null
              ) : null}

              <button
                type="button"
                className={SystemUsersStyles["btn"]}
                disabled={currentPage === lastPage.index ? true : false}
                style={{
                  cursor:
                    currentPage === lastPage.index ? "not-allowed" : "pointer"
                }}
                onClick={getTheNextPages}
              >
                {lastPage !== undefined ? (
                  <img
                    src={
                      currentPage === lastPage.index
                        ? LessThanGrayImage
                        : LessThanWhiteImage
                    }
                    alt="lessThan"
                  />
                ) : null}
              </button>
            </ul>
          ) : null}
        </div>


        <div className={SystemUsersStyles["system-user-form-table-container"]}>
          <form
            className={SystemUsersStyles["system-user-form"]}
            style={{ direction: t("us") === t("Us") ? 'ltr' : 'rtl' }}
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div
              style={{ margin: systemUsersFormSteps.thirdStep || systemUsersFormSteps.fourthStep ? '0 0 29px 0' : '0 0 10px 0' }}
              className={
                SystemUsersStyles["system-user-steps-circle-container"]
              }
            >
              <Form.Control
                name="_id"
                id="_id"
                value={userData._id}
                hidden
                readOnly
              />
              <div
                className={`${SystemUsersStyles["circle"]} ${userData.email === "" ||
                  userData.name === "" ||
                  userData.age === "" ||
                  userData.password === "" ||
                  errors.emailError ||
                  errors.nameError ||
                  errors.ageError ||
                  errors.passwordError
                  ? ""
                  : SystemUsersStyles["coloredCircle"]
                  }`}
              >
                1
              </div>
              <span
                className={`${SystemUsersStyles["line"]} ${userData.email === "" ||
                  userData.name === "" ||
                  userData.age === "" ||
                  userData.password === "" ||
                  errors.emailError ||
                  errors.nameError ||
                  errors.ageError ||
                  errors.passwordError
                  ? ""
                  : SystemUsersStyles["coloredLine"]
                  }`}
              ></span>
              <div
                className={`${SystemUsersStyles["circle"]} ${userData.gender === "" ||
                  userData.state === "" ||
                  userData.mobile === "" ||
                  userData.privileges === "" ||
                  errors.genderError ||
                  errors.stateError ||
                  errors.mobileError ||
                  errors.privilegesError
                  ? ""
                  : SystemUsersStyles["coloredCircle"]
                  }`}
              >
                2
              </div>
              <span
                className={`${SystemUsersStyles["line"]} ${userData.gender === "" ||
                  userData.state === "" ||
                  userData.mobile === "" ||
                  userData.privileges === "" ||
                  errors.genderError ||
                  errors.stateError ||
                  errors.mobileError ||
                  errors.privilegesError
                  ? ""
                  : SystemUsersStyles["coloredLine"]
                  }`}
              ></span>
              <div
                className={`${SystemUsersStyles["circle"]} ${(workingDays.d0 !== "" ||
                  workingDays.d1 !== "" ||
                  workingDays.d2 !== "" ||
                  workingDays.d3 !== "" ||
                  workingDays.d4 !== "" ||
                  workingDays.d5 !== "" ||
                  workingDays.d6 !== "") &&
                  (userData.started_at !== "" || errors.started_atError)
                  ? SystemUsersStyles["coloredCircle"]
                  : ""
                  }`}
              >
                3
              </div>
              <span
                className={`${SystemUsersStyles["line"]} ${(workingDays.d0 !== "" ||
                  workingDays.d1 !== "" ||
                  workingDays.d2 !== "" ||
                  workingDays.d3 !== "" ||
                  workingDays.d4 !== "" ||
                  workingDays.d5 !== "" ||
                  workingDays.d6 !== "") &&
                  (userData.started_at !== "" || errors.started_atError)
                  ? SystemUsersStyles["coloredLine"]
                  : ""
                  }`}
              ></span>
              <div
                className={`${SystemUsersStyles["circle"]}
                            ${WorkingHours.h0 !== "" ||
                    WorkingHours.h1 !== "" ||
                    WorkingHours.h2 !== "" ||
                    WorkingHours.h3 !== "" ||
                    WorkingHours.h4 !== "" ||
                    WorkingHours.h5 !== "" ||
                    WorkingHours.h6 !== "" ||
                    WorkingHours.h7 !== ""
                    ? SystemUsersStyles["coloredCircle"]
                    : ""
                  }`}
              >
                4
              </div>
            </div>
            {systemUsersFormSteps.firstStep ? (
              <>
                <div>
                  <Form.Label htmlFor="email">{t("email")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="e-mail"
                    id="email"
                    value={userData.email}
                    onChange={handleChange}
                    className={`${SystemUsersStyles["system-user-form-controls"]
                      } ${errors.emailError ? SystemUsersStyles["errors"] : ""}`}
                  />
                  <small className="text-danger">{errors.emailError}</small>
                </div>
                <div>
                  <Form.Label htmlFor="name">{t("name")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    id="name"
                    value={userData.name}
                    onChange={handleChange}
                    className={`${SystemUsersStyles["system-user-form-controls"]
                      } ${errors.nameError ? SystemUsersStyles["errors"] : ""}`}
                  />
                  <small className="text-danger">{errors.nameError}</small>
                </div>

                <div>
                  <Form.Label htmlFor="age">{t("age")}</Form.Label>
                  <Form.Control
                    min={1}
                    max={100}
                    type="number"
                    name="age"
                    id="age"
                    value={userData.age}
                    onChange={handleChange}
                    className={`${SystemUsersStyles["system-user-form-controls"]
                      } ${errors.ageError ? SystemUsersStyles["errors"] : ""}`}
                  />
                  <small className="text-danger">{errors.ageError}</small>
                </div>
                <div>
                  <Form.Label htmlFor="password">
                    {t("systemusers_password")}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    id="password"
                    value={userData.password}
                    readOnly={isThereAnyUpdateOnAccount ? true : false}
                    style={{ backgroundColor: isThereAnyUpdateOnAccount ? '#e9ecef' : '' }}
                    onChange={handleChange}
                    className={`${SystemUsersStyles["system-user-form-controls"]
                      } ${errors.passwordError ? SystemUsersStyles["errors"] : ""
                      }`}
                  />
                  <small className="text-danger">{errors.passwordError}</small>
                </div>
                <div className={SystemUsersStyles["step-button-container"]} style={{ direction: t("us") === t("Us") ? 'ltr' : 'ltr' }}>
                  <button
                    type="button"
                    className={`${userData.email === "" ||
                      userData.name === "" ||
                      userData.age === "" ||
                      userData.password === "" ||
                      errors.emailError ||
                      errors.nameError ||
                      errors.ageError ||
                      errors.passwordError
                      ? SystemUsersStyles["disabled-btn"]
                      : SystemUsersStyles["btn"]
                      }`}
                    disabled={
                      userData.email === "" ||
                        userData.name === "" ||
                        userData.age === "" ||
                        userData.password === "" ||
                        errors.emailError ||
                        errors.nameError ||
                        errors.ageError ||
                        errors.passwordError
                        ? true
                        : false
                    }
                    id="secondStep"
                    onClick={(event) => systemUsersNextStep(event)}
                  >
                    {t("next")}
                    <TbPlayerTrackNext style={{ margin: t("us") === t("Us") ? '0px 0px 0px 3px' : '-7px 0px 0px 3px' }} />
                  </button>
                </div>
              </>
            ) : systemUsersFormSteps.secondStep ? (
              <>
                <div>
                  <Form.Label htmlFor="gender">{t("gender")}</Form.Label>
                  <Form.Select
                    name="gender"
                    id="gender"
                    value={userData.gender}
                    onChange={handleChange.bind(this)}
                    className={`${SystemUsersStyles["system-user-form-controls"]
                      } ${errors.genderError ? SystemUsersStyles["errors"] : ""}`}
                  >
                    <option value="">{t("select")}</option>
                    <option value="Male">{t("male")}</option>
                    <option value="Female">{t("female")}</option>
                  </Form.Select>
                  <small className="text-danger">{errors.genderError}</small>
                </div>
                <div>
                  <Form.Label htmlFor="state">{t("state")}</Form.Label>
                  <Form.Select
                    name="state"
                    id="state"
                    value={userData.state}
                    onChange={handleChange}
                    className={`${SystemUsersStyles["system-user-form-controls"]
                      } ${errors.stateError ? SystemUsersStyles["errors"] : ""}`}
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
                  <Form.Label htmlFor="mobile">{t("mobile")}</Form.Label>
                  <Form.Control
                    type="tel"
                    name="Mobile"
                    id="mobile"
                    value={userData.mobile}
                    onChange={handleChange}
                    className={`${SystemUsersStyles["system-user-form-controls"]
                      } ${errors.mobileError ? SystemUsersStyles["errors"] : ""}`}
                  />
                  <small className="text-danger">{errors.mobileError}</small>
                </div>
                <div>
                  <Form.Label htmlFor="privileges">
                    {t("systemusers_privillage")}
                  </Form.Label>
                  <Form.Select
                    id="privileges"
                    name="Privileges"
                    value={userData.privileges}
                    onChange={handleChange}
                    className={`${SystemUsersStyles["system-user-form-controls"]
                      } ${errors.privilegesError ? SystemUsersStyles["errors"] : ""
                      }`}
                  >
                    <option value="">{t("select")}</option>
                    <option value="Admin">{t("admin")}</option>
                    <option value="None">{t("instructor")}</option>
                    <option value="Supervisor">{t("supervisor")}</option>
                  </Form.Select>
                  <small className="text-danger">
                    {errors.privilegesError}
                  </small>
                </div>
                <div className={SystemUsersStyles["step-button-container"]} style={{ direction: t("us") === t("Us") ? 'ltr' : 'ltr' }}>
                  <button
                    type="button"
                    className={SystemUsersStyles["btn"]}
                    id="firstStepPrevious"
                    onClick={(event) => systemUsersNextStep(event)}
                  >
                    <ImPrevious2 style={{ margin: '-3px -3px 0px -10px' }} />
                    {t("prevoius")}
                  </button>
                  <button
                    type="button"
                    className={`${userData.gender === "" ||
                      userData.state === "" ||
                      userData.mobile === "" ||
                      userData.privileges === "" ||
                      errors.genderError ||
                      errors.stateError ||
                      errors.mobileError ||
                      errors.privilegesError
                      ? SystemUsersStyles["disabled-btn"]
                      : SystemUsersStyles["btn"]
                      }`}
                    disabled={
                      userData.gender === "" ||
                        userData.state === "" ||
                        userData.mobile === "" ||
                        userData.privileges === "" ||
                        errors.genderError ||
                        errors.stateError ||
                        errors.mobileError ||
                        errors.privilegesError
                        ? true
                        : false
                    }
                    id="thirdStep"
                    onClick={(event) => systemUsersNextStep(event)}
                  >   {t("next")}
                    <TbPlayerTrackNext style={{ margin: t("us") === t("Us") ? '0px 0px 0px 3px' : '-7px 0px 0px 3px' }} />
                  </button>
                </div>
              </>
            ) : systemUsersFormSteps.thirdStep ? (
              <>
                <div className={SystemUsersStyles['startedAt']}>
                  <Form.Label htmlFor="started_at">
                    {t("started_at")}
                  </Form.Label>
                  <Form.Control
                    type="date"
                    id="started_at"
                    name="started_at"
                    value={userData.started_at}
                    onChange={handleChange}
                    className={`${SystemUsersStyles["system-user-form-controls"]
                      } ${errors.started_atError ? SystemUsersStyles["errors"] : ""
                      }`}
                  />
                  <small className="text-danger">
                    {errors.started_atError}
                  </small>
                </div>
                <span style={{ display: 'block', marginBottom: '12px' }}>{t("working_Days")}</span>
                <div
                  className={`${t("us") === t("Us") ?
                    SystemUsersStyles["days-check-box-container"] : SystemUsersStyles["days-check-box-container-arabic-version"]
                    } ${errors.working_daysError ? SystemUsersStyles["errors"] : ""
                    }`}
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
                  <div>
                    <Form.Label htmlFor="select-all">{t("selectAll")}</Form.Label>
                    <Form.Check id="select-all" name="select-all" onChange={handleSelectAllDays} checked={selectAllDays} />
                  </div>
                </div>
                <div className={SystemUsersStyles["step-button-container"]} style={{ direction: t("us") === t("Us") ? 'ltr' : 'ltr' }}>
                  <button
                    type="button"
                    className={SystemUsersStyles["btn"]}
                    id="secondStepPrevious"
                    onClick={(event) => systemUsersNextStep(event)}
                  >
                    <ImPrevious2 style={{ margin: '-3px -3px 0px -10px' }} />
                    {t("prevoius")}
                  </button>
                  <button
                    type="button"
                    className={`${(workingDays.d0 !== "" ||
                      workingDays.d1 !== "" ||
                      workingDays.d2 !== "" ||
                      workingDays.d3 !== "" ||
                      workingDays.d4 !== "" ||
                      workingDays.d5 !== "" ||
                      workingDays.d6 !== "") &&
                      (userData.started_at !== "" || errors.started_atError)
                      ? SystemUsersStyles["btn"]
                      : SystemUsersStyles["disabled-btn"]
                      }`}
                    disabled={
                      (workingDays.d0 !== "" ||
                        workingDays.d1 !== "" ||
                        workingDays.d2 !== "" ||
                        workingDays.d3 !== "" ||
                        workingDays.d4 !== "" ||
                        workingDays.d5 !== "" ||
                        workingDays.d6 !== "") &&
                        (userData.started_at !== "" || errors.started_atError)
                        ? false : true
                    }
                    id="fourthStep"
                    onClick={(event) => systemUsersNextStep(event)}
                  >
                    {t("next")}
                    <TbPlayerTrackNext style={{ margin: t("us") === t("Us") ? '0px 0px 0px 3px' : '-7px 0px 0px 3px' }} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{t("Working_Hours")}</span>
                <br />
                <div
                  className={`${SystemUsersStyles["hours-check-box-container"]
                    } ${errors.working_hoursError ? SystemUsersStyles["errors"] : ""
                    }`}
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
                  <div>
                    <Form.Label htmlFor="select-all-hours">{t("selectAll")}</Form.Label>
                    <Form.Check name="select-all-hours" id="select-all-hours" onChange={handleSelectAllHours} checked={selectAllHours} />
                  </div>
                </div>
                <div className={SystemUsersStyles["step-button-container"]} style={{ direction: t("us") === t("Us") ? 'ltr' : 'ltr' }}>
                  <button
                    type="button"
                    className={SystemUsersStyles["btn"]}
                    id="thirdStepPrevious"
                    onClick={(event) => systemUsersNextStep(event)}
                  >
                    <ImPrevious2 style={{ margin: '-3px -3px 0px -10px' }} />
                    {t("prevoius")}
                  </button>
                  <button
                    type="submit"
                    className={`${WorkingHours.h0 !== "" ||
                      WorkingHours.h1 !== "" ||
                      WorkingHours.h2 !== "" ||
                      WorkingHours.h3 !== "" ||
                      WorkingHours.h4 !== "" ||
                      WorkingHours.h5 !== "" ||
                      WorkingHours.h6 !== "" ||
                      WorkingHours.h7 !== ""
                      ? SystemUsersStyles["btn"]
                      : SystemUsersStyles["disabled-btn"]
                      }`}
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
                  >
                    {isThereAnyUpdateOrCreatingNewAccount ? <>
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                      <Spinner animation="grow" variant="light" style={{ width: '10px', height: '10px', marginLeft: '3px' }} />
                    </> : isThereAnyUpdateOnAccount ? <>{t("updateUser")}<IoIosPersonAdd style={{ margin: '0 0 3px 3px' }} /></> : <>{t("addUser")}<IoIosPersonAdd style={{ margin: '0 0 3px 3px' }} /></>
                    }

                  </button>
                </div>
              </>
            )}
          </form>
          <div
            className={SystemUsersStyles["system-user-data-container"]}
            style={{ direction: t("us") === t("Us") ? 'ltr' : 'rtl' }}
          >
            <div
              className={SystemUsersStyles["table-settings-container"]}

            >
              <section>
                <Form.Label
                  style={{ textAlign: t("us") === t("Us") ? 'end' : 'start', paddingRight: t("us") === t("Us") ? '0' : '3px' }}
                  htmlFor="userAccountFilterTxt"
                  className={SystemUsersStyles["filter-label"]}
                >
                  {t("filter")}
                </Form.Label>
                <Form.Control
                  id="userAccountFilterTxt"
                  className={SystemUsersStyles["filter-txt"]}
                  value={filterValue}
                  onChange={handleFiltaration}
                />
              </section>
              <section>
                <Form.Label htmlFor="sortUserRole" style={{ textAlign: t("us") === t("Us") ? 'end' : 'start', paddingRight: t("us") === t("Us") ? '0' : '3px' }}>{t("sort")}</Form.Label>
                <Form.Select id="sortUserRole" name="sortUserRole" onChange={sortSystemUsersTableByRoleOfTheUser} style={{ textAlign: t("us") === t("Us") ? 'start' : 'end' }}>
                  <option value="">{t("select")}</option>
                  <option value="ADMIN">{t("admin")}</option>
                  <option value="SUPERVISOR">{t("supervisor")}</option>
                  <option value="INSTRUCTOR">{t("instructor")}</option>
                </Form.Select>
              </section>
              <section>
                <button
                  type="button"
                  className={SystemUsersStyles["btn"]}
                  style={{ marginTop: "auto", direction: 'ltr' }}
                  onClick={(event) => filterAccounts(event.target.value)}
                >
                  {t("filter")} <AiFillFilter />
                </button>
                <button
                  type="button"
                  className={SystemUsersStyles["btn"]}
                  style={{ marginTop: "auto", direction: 'ltr' }}
                  onClick={resetTableFiltaration}
                >
                  {t("reset")}
                  <BiReset style={{margin:'0px 0px 2px 0'}}/>
                </button>
              </section>


            </div>
            <div
              className={SystemUsersStyles["table-wrapper"]}
            >
              {accountsData.length === 0 || accountsData === undefined ? (
                <img
                  src={NoResultFiltaration}
                  className={SystemUsersStyles["no-result"]}
                  alt="no-result"
                />
              ) : (
                <table
                  className={SystemUsersStyles["system-accounts-table"]}
                >
                  <thead>
                    <tr>
                      <th>{t("name")}</th>
                      <th>{t("email")}</th>
                      <th>{t("systemusers_mobile")}</th>
                      <th colSpan={"2"}>{t("systemusers_privillage")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsData.map((userAccount) => (
                      <tr
                        key={userAccount._id}
                        id={userAccount._id}
                        onClick={(event) =>
                          updateSpecificAccount(event, userAccount)
                        }
                        style={{
                          background:
                            selectedRow === userAccount._id ? "#198754" : "",
                          color:
                            selectedRow === userAccount._id ? "#FFFFFF" : "",
                          boxShadow:
                            selectedRow === userAccount._id
                              ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)`
                              : "",
                        }}
                      >
                        <td>{userAccount.name}</td>
                        <td>{userAccount.email}</td>
                        <td>{userAccount.mobile}</td>
                        <td>
                          {userAccount.privilages ?? userAccount.privileges}
                        </td>
                        <td><FaTrash onClick={(event) => deleteStaffAccount(event, userAccount)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SystemUsers;
