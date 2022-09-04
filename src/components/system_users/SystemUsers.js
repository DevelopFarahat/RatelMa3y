import React, { useState, useCallback, useEffect,useRef } from "react";
import Form from "react-bootstrap/Form";
import { IoIosPersonAdd } from "react-icons/io";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import SystemUsersStyles from "./SystemUsers.module.css";
import NoResultFiltaration from "../../assets/images/no-result.png";
import { TbChevronDownLeft, TbPlayerTrackNext } from "react-icons/tb";
import CircleGif from "../../assets/images/check-circle.gif";
import { ImPrevious2 } from "react-icons/im";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { object } from "yup";
const SystemUsers = () => {
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
    let namesOfDaysOfTheWeek = [
        { id: 0, name: "Saturday", att: "working_days" },
        { id: 1, name: "Sunday", att: "working_days" },
        { id: 2, name: "Monday", att: "working_days" },
        { id: 3, name: "Tuesday", att: "working_days" },
        { id: 4, name: "Wednesday", att: "working_days" },
        { id: 5, name: "Thursday", att: "working_days" },
        { id: 6, name: "Friday", att: "working_days" },
    ];
    let workingHoursArr = [
        ["8:00 am", "10:00 pm"],
        ["10:00 am", "12:00 pm"],
        ["12:00 pm", "2:00 pm"],
        ["2:00 pm", "4:00 pm"],
        ["4:00 pm", "6:00 pm"],
        ["6:00 pm", "8:00 pm"],
        ["8:00 pm", "10:00 pm"],
        ["10:00 pm", "12:00 am"],
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
        { id: 0, appointment: " 8:00 am to 10:00 pm", att: "h0" },
        { id: 1, appointment: " 10:00 am to 12:00 pm", att: "h1" },
        { id: 2, appointment: " 12:00 pm to 2:00 pm", att: "h2" },
        { id: 3, appointment: " 2:00 pm to 4:00 pm", att: "h3" },
        { id: 4, appointment: " 4:00 pm to 6:00 pm", att: "h4" },
        { id: 5, appointment: " 6:00 pm to 8:00 pm", att: "h5" },
        { id: 6, appointment: " 8:00 pm to 10:00 pm", att: "h6" },
        { id: 7, appointment: " 10:00 pm to 12:00 am", att: "h7" },
    ];

    let programs = [
        { id: 0, programName: "Recitation" },
        { id: 1, programName: "Noor Bayan" },
        { id: 2, programName: "Memorizing" },
    ];
    /*
            let systemDataAccountsArr = [{ id: 1, username: "devfarahat", fullname: "mohamed farahat", privilege: "instructor", mobile: "01150849567" }
                , { id: 2, username: "codeLoop", fullname: "mohamed gamal", privilege: "admin", mobile: "0119798663" },
            { id: 3, username: "rashed123", fullname: "mohamed rashed", privilege: "supervisor", mobile: "012966788974" },
            { id: 4, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 5, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 6, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 7, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 8, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 9, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 10, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 11, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 12, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 13, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 14, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 15, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 16, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
            { id: 17, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" }];
        */
     const [t, i18n] = useTranslation();
    const [isArabic, setIsArabic] = useState(false);
    useEffect(() => {
        setIsArabic(localStorage.getItem("i18nextLng") === "ar");
    }, [localStorage.getItem("i18nextLng")]);

    const styles = {
        body: {
            direction: isArabic ? "rtl" : "ltr",
        },
    };
    const [accountsData, setAccountsData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(-1);
    const [filterValue, setFilterValue] = useState("");
    const [btnName,setBtnName] = useState("Add User");
    const [isUserCreateNewAccount,setIsUserCreateNewAccount]   = useState(false);
    const [isUserMadeAnyUpdateToAnyAccount,setIsUserMadeAnyUpdateToAnyAccount] = useState(false);
    const initialResponse = useRef();
    const programsRef = useRef(null);
    const genderRef = useRef(null);
    const stateRef = useRef(null);
    const privilagesRef = useRef(null);
    const addOrUpdateBtnRef = useRef(null);
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
        _id:"",
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
        programs: "",
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
        localStorage.setItem("newAccountUserFullname",userData.name);
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
            let workingDaysCloneObji = workingDays;

            let arr = Object.values(workingDaysCloneObji);
            arr[event.target.value] = -1;
            //arr.splice(event.target.value, 1);
            setWorkingDays(arr);
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
            let workingHoursCloneObji = WorkingHours;
            let arr = Object.values(workingHoursCloneObji);

            arr[event.target.value] = [0, 0];
            setWorkingHours(arr);
        }
    };
    const handlerRowClicked = useCallback((event) => {
        const id = event.currentTarget.id;
        setSelectedRow(id);
    }, []);
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
        } else if (filed === "privileges") {
            setErrors({
                ...errors,
                privilegesError: value.length === 0 ? "Privileges Is Required" : null,
            });
        } else if (filed === "state") {
            setErrors({
                ...errors,
                stateError: value.length === 0 ? "State Is Required" : "",
            });
        } else if (filed === "started_at") {
            setErrors({
                ...errors,
                started_atError: value.length === 0 ? "Started At  Is Required" : "",
            });
        }
    };

    const handleSubmit = (event) => {
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
        setUserData({
            ...userData,
            prefs: {
                working_days: wD,
                working_hours: wHours,
            },
        });

        let finalUser = {
            email:userData.email ,
            name: userData.name,
            gender: userData.gender,
            age:userData.age ,
            state:userData.state,
            started_at:userData.started_at,
            prefs: {
                working_days: wD,
                working_hours: wHours,
            },
            mobile:userData.mobile,
            programs:userData.programs,
            privileges:userData.privileges,
            password:userData.password
        };
        if(userData._id === ""){
            axios
            .post(`https://ratel-may.herokuapp.com/api/instructors`, finalUser)
            .then((res) => {
                setFetchAgain(fetchAgain+1);
                setUserData({
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
                    programs: "",
                    privileges: "",
                });
                setWorkingDays({
                    d0: "",
                    d1: "",
                    d2: "",
                    d3: "",
                    d4: "",
                    d5: "",
                    d6: ""
                });
                setWorkingHours({
                    h0: "",
                    h1: "",
                    h2: "",
                    h3: "",
                    h4: "",
                    h5: "",
                    h6: "",
                    h7: ""
                });
                setCheckedDays({
                    d0: false,
                    d1: false,
                    d2: false,
                    d3: false,
                    d4: false,
                    d5: false,
                    d6: false
                });
                setCheckedHours({
                    h0: false,
                    h1: false,
                    h2: false,
                    h3: false,
                    h4: false,
                    h5: false,
                    h6: false,
                    h7: false
                });
                setSystemUsersFormSteps({
                    firstStep: true,
                    secondStep: false,
                    thirdStep: false,
                })
                setIsUserCreateNewAccount(true);
                
                setTimeout(()=>{
                    setIsUserCreateNewAccount(false);  
             },2000)
            })
            .catch((error) => {
                console.log(error.message);
            });
        }else{
            axios
            .put(`https://ratel-may.herokuapp.com/api/instructors/${userData._id}`,{
                email:userData.email ,
                name: userData.name,
                gender: userData.gender,
                age:userData.age ,
                state:userData.state,
                started_at:userData.started_at,
                prefs: {
                    working_hours:wHours,
                    working_days:wD,
                },
                mobile:userData.mobile,
                programs:userData.programs,
                privileges:userData.privileges,
            } )
            .then((res) => {
                setFetchAgain(fetchAgain+1);
                setSelectedRow(-1);
                console.log(res.data);
                setUserData({
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
                    programs: "",
                    privileges: "",
                });
                setWorkingDays({
                    d0: "",
                    d1: "",
                    d2: "",
                    d3: "",
                    d4: "",
                    d5: "",
                    d6: ""
                });
                setWorkingHours({
                    h0: "",
                    h1: "",
                    h2: "",
                    h3: "",
                    h4: "",
                    h5: "",
                    h6: "",
                    h7: ""
                });
                setCheckedDays({
                    d0: false,
                    d1: false,
                    d2: false,
                    d3: false,
                    d4: false,
                    d5: false,
                    d6: false
                });
                setCheckedHours({
                    h0: false,
                    h1: false,
                    h2: false,
                    h3: false,
                    h4: false,
                    h5: false,
                    h6: false,
                    h7: false
                });
                setSystemUsersFormSteps({
                    firstStep: true,
                    secondStep: false,
                    thirdStep: false,
                });
                setBtnName("Add User");
                setIsUserMadeAnyUpdateToAnyAccount(true);
                setTimeout(()=>{
                    setIsUserMadeAnyUpdateToAnyAccount(false);
             },2000);
             
            
            })
            .catch((error) => {
                console.log(error.message);
            });
            
        }
   
        
  
                
    };

    const filterAccounts = () => {
        let filtarationArr = [];
        for (let i = 0; i < accountsData.length; i++) {
            if (accountsData[i].name.toLowerCase().includes(filterValue.toLowerCase())){
                filtarationArr.push(accountsData[i]);
            }  else if (accountsData[i].privileges.toLowerCase().includes(filterValue.toLowerCase())) {
                filtarationArr.push(accountsData[i]);
            }
        }
        filterValue !== ""
            ? setAccountsData(filtarationArr)
            : setAccountsData(initialResponse.current)
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
        event.target.id === "firstStep"
            ? setSystemUsersFormSteps({
                firstStep: true,
                secondStep: false,
                thirdStep: false,
            })
            : event.target.id === "secondStep"
                ? setSystemUsersFormSteps({
                    firstStep: false,
                    secondStep: true,
                    thirdStep: false,
                })
                : event.target.id === "thirdStep"
                    ? setSystemUsersFormSteps({
                        firstStep: false,
                        secondStep: false,
                        thirdStep: true,
                    })
                    : event.target.id === "firstStepPrevious"
                        ? setSystemUsersFormSteps({
                            firstStep: true,
                            secondStep: false,
                            thirdStep: false,
                        })
                        : setSystemUsersFormSteps({
                            firstStep: false,
                            secondStep: true,
                            thirdStep: false,
                        });

    };
   
    const updateSpecificAccount = (event,userAccount) =>{
        let workingHoursInitialObji = {};
        let workingHoursCheckedInitialObji = {};
        let workinDaysInitialObji = {};
        let workingDaysCheckedInitialObji = {};
        setUserData({
            _id:userAccount._id,
            email:userAccount.email ,
            name: userAccount.name,
            gender: userAccount.gender,
            age:userAccount.age ,
            state:userAccount.state,
            started_at:userAccount.started_at.split("T")[0],
            prefs: {
                working_hours:userAccount.prefs.working_hours,
                working_days:userAccount.prefs.working_days,
            },
            mobile:userAccount.mobile,
            programs:userAccount.programs,
            privileges:userAccount.privileges,
        });
        for(let i = 0 ; i < userAccount.prefs.working_days.length;i++ ){
            if(userAccount.prefs.working_days[i] !== -1){
                
                workinDaysInitialObji[`d${i}`] = userAccount.prefs.working_days[i];
                workingDaysCheckedInitialObji[`d${i}`] = true
            }
            else{
                workinDaysInitialObji[`d${i}`] = userAccount.prefs.working_days[i];
                workingDaysCheckedInitialObji[`d${i}`] = false
            }
        }
        for(let i = 0 ; i < userAccount.prefs.working_hours.length;i++ ){
                if(userAccount.prefs.working_hours[i][1] !== 0){
                    workingHoursInitialObji[`h${i}`] = [userAccount.prefs.working_hours[i][0],userAccount.prefs.working_hours[i][1]];
                    workingHoursCheckedInitialObji[`h${i}`] = true
                }
                else{
                    workingHoursInitialObji[`h${i}`] = [userAccount.prefs.working_hours[i][0],userAccount.prefs.working_hours[i][1]];
                    workingHoursCheckedInitialObji[`h${i}`] = false
                }
                
        }
        setWorkingDays(workinDaysInitialObji);
        setCheckedDays(workingDaysCheckedInitialObji);
        setWorkingHours(workingHoursInitialObji);
        setCheckedHours(workingHoursCheckedInitialObji);
        handlerRowClicked(event);
        setBtnName("Update User")  
    }
    useEffect(() => {
        axios
            .get(`https://ratel-may.herokuapp.com/api/instructors`)
            .then((res) => {
                initialResponse.current = res.data.data;
                setAccountsData(res.data.data);
                console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [fetchAgain]);
console.log(fetchAgain);
    return (
        <>
        {isUserCreateNewAccount? <div className={SystemUsersStyles["alert-container"]}>
          <img src={CircleGif} alt="successfull" />
          <span><span style={{fontWeight:'bold',color:'#038674'}}>{localStorage.getItem('user_name')}</span> Has Added New Ratel Ma3y Stuff Account:<span style={{fontWeight:'bold',color:'#038674'}}>{localStorage.getItem("newAccountUserFullname")}</span></span>
        </div>:isUserMadeAnyUpdateToAnyAccount?<div className={SystemUsersStyles["alert-container"]}>
          <img src={CircleGif} alt="successfull" />
          <span><span style={{fontWeight:'bold',color:'#038674'}}>{localStorage.getItem('user_name')}</span> Has Updated Stuff Account Successfully</span>
        </div>:null}
            <form
                className={SystemUsersStyles["system-user-form"]}
                style={styles.body}
                method="post"
                encType="multipart/form-data"
                onSubmit={handleSubmit}>
                <div className={SystemUsersStyles["system-user-steps-circle-container"]}>
        <Form.Control name="_id" id="_id" value={userData._id} hidden readOnly/>
        <div className={`${SystemUsersStyles['circle']} ${   
                                    userData.email === "" ||
                                    userData.name === "" ||
                                    userData.age === "" ||
                                    userData.password === "" ||
                                    userData.programs === "" ||
                                    errors.emailError ||
                                    errors.nameError ||
                                    errors.ageError ||
                                    errors.programsError ||
                                    errors.passwordError?'':SystemUsersStyles['coloredCircle']}`}>1</div>
        <span className={`${SystemUsersStyles['line']} ${  
                                    userData.email === "" ||
                                    userData.name === "" ||
                                    userData.age === "" ||
                                    userData.password === "" ||
                                    userData.programs === "" ||
                                    errors.emailError ||
                                    errors.nameError ||
                                    errors.ageError ||
                                    errors.programsError ||
                                    errors.passwordError?'':SystemUsersStyles['coloredLine']}`}></span>
        <div className={`${SystemUsersStyles['circle']} ${    
                                userData.gender === ''||
                                userData.state === ''||
                                userData.mobile === ''||
                                userData.privileges === ''||
                                userData.started_at === ''||
                                errors.genderError||
                                errors.stateError||
                                errors.mobileError||
                                errors.privilegesError||
                                errors.started_atError?'':SystemUsersStyles['coloredCircle']}`}>2</div>
        <span className={`${SystemUsersStyles['line']} ${    
                                userData.gender === ''||
                                userData.state === ''||
                                userData.mobile === ''||
                                userData.privileges === ''||
                                userData.started_at === ''||
                                errors.genderError||
                                errors.stateError||
                                errors.mobileError||
                                errors.privilegesError||
                                errors.started_atError?'':SystemUsersStyles['coloredLine']}`}></span>
        <div className={`${SystemUsersStyles['circle']}
                            ${
                               ( workingDays.d0 !== '' ||
                                workingDays.d1 !== '' ||
                                workingDays.d2 !== '' ||
                                workingDays.d3 !== '' ||
                                workingDays.d4 !== '' ||
                                workingDays.d5 !== '' ||
                                workingDays.d6 !== '') && (
                                WorkingHours.h0 !== '' ||
                                WorkingHours.h1 !== '' ||
                                WorkingHours.h2 !== '' ||
                                WorkingHours.h3 !== '' ||
                                WorkingHours.h4 !== '' ||
                                WorkingHours.h5 !== '' ||
                                WorkingHours.h6 !== '' ||
                                WorkingHours.h7 !== '')?SystemUsersStyles['coloredCircle']:''}`}>3</div>
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
                                className={`${SystemUsersStyles["system-user-form-controls"]} ${errors.emailError ? SystemUsersStyles["errors"] : ""
                                    }`}
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
                                className={`${SystemUsersStyles["system-user-form-controls"]} ${errors.nameError ? SystemUsersStyles["errors"] : ""
                                    }`}
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
                                className={`${SystemUsersStyles["system-user-form-controls"]} ${errors.ageError ? SystemUsersStyles["errors"] : ""
                                    }`}
                            />
                            <small className="text-danger">{errors.ageError}</small>
                        </div>
                        <div>
                            <Form.Label htmlFor="programs">{t("programs_title")}</Form.Label>
                            <Form.Select
                                id="programs"
                                name="programs"
                                value={userData.programs}
                                ref={programsRef}
                                onChange={handleChange}
                                className={`${SystemUsersStyles["system-user-form-controls"]} ${errors.programsError ? SystemUsersStyles["errors"] : ""
                                    }`}
                            >
                                <option value="">{t("select")}</option>
                                {programs.map((pr) => (
                                    <option key={pr.id} value={pr.programName}>
                                        {pr.programName}
                                    </option>
                                ))}
                            </Form.Select>
                            <small className="text-danger">{errors.programsError}</small>
                        </div>
                        <div>
                            <Form.Label htmlFor="password">{t("systemusers_password")}</Form.Label>
                            <Form.Control
                                type="password"
                                name="Password"
                                id="password"
                                value={userData.password}
                                onChange={handleChange}
                                className={`${SystemUsersStyles["system-user-form-controls"]} ${errors.passwordError ? SystemUsersStyles["errors"] : ""
                                    }`}
                            />
                            <small className="text-danger">{errors.passwordError}</small>
                        </div>
                        <button
                            type="button"
                            className={`${
                                    userData.email === "" ||
                                    userData.name === "" ||
                                    userData.age === "" ||
                                    userData.password === "" ||
                                    userData.programs === "" ||
                                    errors.emailError ||
                                    errors.nameError ||
                                    errors.ageError ||
                                    errors.programsError ||
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
                                    errors.passwordError?true:false
                                }
                            style={{ float: "right" }}
                            id="secondStep"
                            onClick={(event) => systemUsersNextStep(event)}
                        >
                            {t("next")}
                            <TbPlayerTrackNext style={{ margin: "-2px 0 0 3px" }} />
                        </button>
                    </>
                ) : systemUsersFormSteps.secondStep ? (
                    <>
                        <div>
                            <Form.Label htmlFor="gender">{t("gender")}</Form.Label>
                            <Form.Select
                                name="gender"
                                id="gender"
                                ref={genderRef}
                                value={userData.gender}
                                onChange={handleChange.bind(this)}
                                className={`${SystemUsersStyles["system-user-form-controls"]} ${errors.genderError ? SystemUsersStyles["errors"] : ""
                                    }`}
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
                                ref={stateRef}
                                value={userData.state}
                                onChange={handleChange}
                                className={`${SystemUsersStyles["system-user-form-controls"]} ${errors.stateError ? SystemUsersStyles["errors"] : ""
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
                            <Form.Label htmlFor="mobile">{t("mobile")}</Form.Label>
                            <Form.Control
                                type="tel"
                                name="Mobile"
                                id="mobile"
                                value={userData.mobile}
                                onChange={handleChange}
                                className={`${SystemUsersStyles["system-user-form-controls"]} ${errors.mobileError ? SystemUsersStyles["errors"] : ""
                                    }`}
                            />
                            <small className="text-danger">{errors.mobileError}</small>
                        </div>
                        <div>
                            <Form.Label htmlFor="privileges">{t("systemusers_privillage")}</Form.Label>
                            <Form.Select
                                id="privileges"
                                ref={privilagesRef}
                                name="Privileges"
                                value={userData.privileges}
                                onChange={handleChange}
                                className={`${SystemUsersStyles["system-user-form-controls"]} ${errors.privilegesError ? SystemUsersStyles["errors"] : ""
                                    }`}
                            >
                                <option value="">{t("select")}</option>
                                <option value="Admin">{t("admin")}</option>
                                <option value="None">{t("instructor")}</option>
                                <option value="Supervisor">{t("supervisor")}</option>
                            </Form.Select>
                            <small className="text-danger">{errors.privilegesError}</small>
                        </div>
                        <div>
                            <Form.Label htmlFor="started_at">{t("started_at")}</Form.Label>
                            <Form.Control
                                type="date"
                                id="started_at"
                                name="started_at"
                                value={userData.started_at}
                                onChange={handleChange}
                                className={`${SystemUsersStyles["system-user-form-controls"]} ${errors.started_atError ? SystemUsersStyles["errors"] : ""
                                    }`}
                            />
                            <small className="text-danger">{errors.started_atError}</small>
                        </div>
                        <button
                            type="button"
                            className={SystemUsersStyles["btn"]}
                            id="firstStepPrevious"
                            onClick={(event) => systemUsersNextStep(event)}
                        >
                            <ImPrevious2 style={{ marginTop: "-3px" }} />
                            {t("prevoius")}
                        </button>
                        <button
                            type="button"
                            className={`${
                                userData.gender === ''||
                                userData.state === ''||
                                userData.mobile === ''||
                                userData.privileges === ''||
                                userData.started_at === ''||
                                errors.genderError||
                                errors.stateError||
                                errors.mobileError||
                                errors.privilegesError||
                                errors.started_atError?
                                 SystemUsersStyles["disabled-btn"]:SystemUsersStyles["btn"]}`}
                                 disabled={
                                    userData.gender === ''||
                                    userData.state === ''||
                                    userData.mobile === ''||
                                    userData.privileges === ''||
                                    userData.started_at === ''||
                                    errors.genderError||
                                    errors.stateError||
                                    errors.mobileError||
                                    errors.privilegesError||
                                    errors.started_atError?true:false
                                 }
                            id="thirdStep"
                            onClick={(event) => systemUsersNextStep(event)} style={{float:'right'}} >
                            <ImPrevious2 style={{ marginTop: "-3px" }} />
                            {t("next")}
                        </button>
                    </>
                ) : (
                    <>
                        <span>{t("working_Days")}</span>
                        <div
                            className={`${SystemUsersStyles["days-check-box-container"]} ${errors.working_daysError ? SystemUsersStyles["errors"] : ""
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
                        </div>
                        <small className="text-danger">{errors.working_daysError}</small>
                        <br />
                        <span>{t("Working_Hours")}</span>
                        <div
                            className={`${SystemUsersStyles["hours-check-box-container"]} ${errors.working_hoursError ? SystemUsersStyles["errors"] : ""
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
                        </div>
                        <small className="text-danger">{errors.working_hoursError}</small>
                        <br />

                        <button type="button" className={SystemUsersStyles["btn"]} id="nextStepPrevious" onClick={(event) => systemUsersNextStep(event)}> <ImPrevious2 style={{ margin:' -3px -7px 0 3px'}} /> {t("prevoius")}
                    </button>
                        <button
                       
                            type="submit"
                            className={`${
                                ( workingDays.d0 !== '' ||
                                workingDays.d1 !== '' ||
                                workingDays.d2 !== '' ||
                                workingDays.d3 !== '' ||
                                workingDays.d4 !== '' ||
                                workingDays.d5 !== '' ||
                                workingDays.d6 !== '') && (
                                WorkingHours.h0 !== '' ||
                                WorkingHours.h1 !== '' ||
                                WorkingHours.h2 !== '' ||
                                WorkingHours.h3 !== '' ||
                                WorkingHours.h4 !== '' ||
                                WorkingHours.h5 !== '' ||
                                WorkingHours.h6 !== '' ||
                                WorkingHours.h7 !== '')?SystemUsersStyles["btn"]:SystemUsersStyles["disabled-btn"]
                               }`}
                               disabled={
                                ( workingDays.d0 !== '' ||
                                workingDays.d1 !== '' ||
                                workingDays.d2 !== '' ||
                                workingDays.d3 !== '' ||
                                workingDays.d4 !== '' ||
                                workingDays.d5 !== '' ||
                                workingDays.d6 !== '') && (
                                WorkingHours.h0 !== '' ||
                                WorkingHours.h1 !== '' ||
                                WorkingHours.h2 !== '' ||
                                WorkingHours.h3 !== '' ||
                                WorkingHours.h4 !== '' ||
                                WorkingHours.h5 !== '' ||
                                WorkingHours.h6 !== '' ||
                                WorkingHours.h7 !== '')?false:true
                               }
                            style={{ float: "right" }}
                           
                        >
                            {btnName}
                       {/*<IoIosPersonAdd style={{ margin: '0 0 3px 3px' }} />*/}
                        </button>
                    </>
                )}
            </form>
            <div
                className={SystemUsersStyles["system-user-data-container"]}
                style={styles.body}
            >
                <div
                    className={SystemUsersStyles["table-settings-container"]}
                    style={styles.body}
                >
                    <Form.Label
                        htmlFor="userAccountFilterTxt"
                        className={SystemUsersStyles["filter-label"]}
                    >
                        {t("filter_label")}
                    </Form.Label>
                    <Form.Control
                        id="userAccountFilterTxt"
                        className={SystemUsersStyles["filter-txt"]}
                        value={filterValue}
                        onChange={handleFiltaration}
                    />

                    <button
                        type="button"
                        className={SystemUsersStyles["btn"]}
                        style={{ marginTop: "auto" }}
                        onClick={(event) => filterAccounts(event.target.value)}
                    >
                        {t("filter_btn")} <AiFillFilter />
                    </button>
                    <button
                        type="button"
                        className={SystemUsersStyles["btn"]}
                        style={{ marginTop: "auto" }}
                        onClick={resetTableFiltaration}
                    >
                        {t("reset_btn")}
                        <BiReset />
                    </button>
                </div>
                <div className={SystemUsersStyles["table-wrapper"]} style={styles.body}>
                    {accountsData.length === 0 ? (
                        <img
                            src={NoResultFiltaration}
                            className={SystemUsersStyles["no-result"]}
                            alt="no-result"
                        />
                    ) : (
                        <table
                            className={SystemUsersStyles["system-accounts-table"]}
                            style={styles.body}
                        >
                            <thead>
                                <tr>
                                    <th>{t("name")}</th>
                                    <th>{t("email")}</th>
                                    <th>{t("systemusers_mobile")}</th>
                                    <th>{t("systemusers_privillage")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountsData.map((userAccount) => (
                                    <tr key={userAccount._id} id={userAccount._id} onClick={(event)=> updateSpecificAccount(event,userAccount)} style={{ background: selectedRow === userAccount._id ? '#038674' : '', color: selectedRow === userAccount._id ? '#FFFFFF' : '', boxShadow: selectedRow === userAccount._id ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)` : '' }}>
                                        <td>{userAccount.name}</td>
                                        <td>{userAccount.email}</td>
                                        <td>{userAccount.mobile}</td>
                                        <td>{userAccount.privilages ?? userAccount.privileges}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};
export default SystemUsers;
