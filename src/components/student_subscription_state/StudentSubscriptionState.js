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
import {FaCalendarTimes} from "react-icons/fa";
import { useTranslation } from "react-i18next";
const StudentSubscriptionState = ({fetchSpecificStudentDataAgain,setFetchSpecificStudentDataAgain, setSpecificStudentJoiningRequestData, setIsStudentRequestDataVisible,initialSpecificStudentJoiningRequestData, setIsStudentRatelDataVisible }) => {
    const pindingSubscriptionStateArr = [{ subscription_id: 1, subscription_name: "Active" }, { subscription_id: 2, subscription_name: "OnHold" }, { subscription_id: 3, subscription_name: "Cancelled" }];
    const activeSubscriptionStatusArr = [{ subscription_id: 3, subscription_name: "OnHold" }, { subscription_id: 4, subscription_name: "Cancelled" }];
    const onHoldSubscriptionStatusArr = [{ subscription_id: 5, subscription_name: "Active" }, { subscription_id: 6, subscription_name: "Cancelled" }];
    const [filterValue, setFilterValue] = useState('');
    const [studentData, setStudentData] = useState([]);
    const [instructorData, setInstructorData] = useState([]);
    const initialResponse = useRef();
    const [fetchAgain,setFetchAgain] = useState(0);
    const [studentStatus, setStudentStatus] = useState(false);
    const [selectedRow, setSelectedRow] = useState(-1);
    const [changableSubscriptionState, setChangableSubscriptionState] = useState({});
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [typeOfProcess,setTypeOfProcess] = useState("");
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
    const [disabledDays,setDisabledDays] = useState({
        d0: false,
        d1: false,
        d2: false,
        d3: false,
        d4: false,
        d5: false,
        d6: false,
    })
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
            [`h${event.target.value}`]:""
          })
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
            [`d${event.target.value}`]:""
          });
        }
      };
    const [studentConfiguration, setStudentConfiguration] = useState({
        studentStatus: '',
        studentInstructor: ''

    });
    const [errors, setErrors] = useState({
        statusError: '',
        instructorError: ''

    });

    const handleFiltaration = (event) => {
        
        setFilterValue(event.target.value);
    }

    const filterStudents = () => {
        let filtarationArr = [];
        for (let i = 0; i < studentData.length; i++) {

            if ( studentData[i].name.toLowerCase().includes(filterValue.toLowerCase())) {
                filtarationArr.push(studentData[i]);
            }else if (  studentData[i].subscription_state.toLowerCase().includes(filterValue.toLowerCase())) {
                filtarationArr.push(studentData[i]);
            }
        }
        filterValue !== '' ? setStudentData(filtarationArr) : setStudentData(initialResponse.current);
    }
    const resetTableFiltaration = () => {
        setFilterValue('');
        setStudentData(initialResponse.current);


    }
    const handlerRowClicked = useCallback((event) => {
        const id = event.currentTarget.id;
        setSelectedRow(id);
        setFetchSpecificStudentDataAgain(current=>current+1);
    }, []);
    console.log(fetchSpecificStudentDataAgain);
    const toogleStudentStatus = (stdObject, event,index,process) => {
        event.stopPropagation();
        setStudentStatus(current => !current);
        setChangableSubscriptionState(stdObject);
        setTypeOfProcess(process);
        if(process === "date and time")
            getStudentSessionsDaysAndTime(stdObject)
        

    }
    const getStudentSessionsDaysAndTime = (stdObji)=>{
        let sessionsHoursInitialObji = {};
        let sessionsHoursCheckedInitialObji = {};
        let sessionsDaysInitialObji = {};
        let sessionsDaysCheckedInitialObji = {};
        for(let i = 0 ; i < stdObji.program_prefs.pref_days.length;i++ ){
            if(stdObji.program_prefs.pref_days[i] !== -1){
                
                sessionsDaysInitialObji[`d${i}`] = stdObji.program_prefs.pref_days[i];
                sessionsDaysCheckedInitialObji[`d${i}`] = true
            }
            else{
                sessionsDaysInitialObji[`d${i}`] = stdObji.program_prefs.pref_days[i];
                sessionsDaysCheckedInitialObji[`d${i}`] = false
            }
        }
        for(let i = 0 ; i < stdObji.program_prefs.pref_times_of_day.length;i++ ){
                if(stdObji.program_prefs.pref_times_of_day[i][1] !== 0){
                    sessionsHoursInitialObji[`h${i}`] = [stdObji.program_prefs.pref_times_of_day[i][0],stdObji.program_prefs.pref_times_of_day[i][1]];
                    sessionsHoursCheckedInitialObji[`h${i}`] = true
                }
                else{
                    sessionsHoursInitialObji[`h${i}`] = [stdObji.program_prefs.pref_times_of_day[i][0],stdObji.program_prefs.pref_times_of_day[i][1]];
                    sessionsHoursCheckedInitialObji[`h${i}`] = false
                }
                
        }
        setWorkingDays(sessionsDaysInitialObji);
        setCheckedDays(sessionsDaysCheckedInitialObji);
        setWorkingHours(sessionsHoursInitialObji);
        setCheckedHours(sessionsHoursCheckedInitialObji);
        gitInstructorOfSpecificStudentWorkingDaysAndHours(stdObji);
    }

    const gitInstructorOfSpecificStudentWorkingDaysAndHours = (stObj)=>{
        let disabledDaysInitialObject = {};
        axios.get(`http://localhost:5000/api/instructors/${stObj.instructor}`).then((res)=>{
            for(let i = 0 ; i < res.data.prefs.working_days.length;i++ ){
                if(res.data.prefs.working_days[i] === -1){
                 
                    disabledDaysInitialObject[`d${i}`] = true;
                   
                }
              
            }
            setDisabledDays(disabledDaysInitialObject);
            /*
            for(let i = 0 ; i < stObj.program_prefs.pref_times_of_day.length;i++ ){
                    if(stObj.program_prefs.pref_times_of_day[i][1] !== 0){
                        [`h${i}`] = [stObj.program_prefs.pref_times_of_day[i][0],stObj.program_prefs.pref_times_of_day[i][1]];
                    
                    }
                 
                    
            }
*/

        }).catch((error)=>{
            console.log(error);
        })
    }
    const closeDime = () => {
        setStudentStatus(current => !current);
        setStudentConfiguration({
            studentStatus: '',
            studentInstructor: ''
        });
    }
    const setConfiguration = (event) => {
       

        setStudentConfiguration({
            ...studentConfiguration,
            [event.target.id]: event.target.value
        })
        handleErrors(event.target.id, event.target.value);

    }
    const handleErrors = (field, value) => {
        if (field === 'studentStatus') {
            setErrors({
                ...errors,
                statusError: value === '' ? 'Status Is Required' : null
            });
        } else if (field === 'studentInstructor') {
            setErrors({
                ...errors,
                instructorError: value === '' ? 'Instructor Name Is Required' : null
            });
        }

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setStudentStatus(current => !current);
        setStudentConfiguration({
            studentStatus: '',
            studentInstructor: ''
        });
        //setStudentStatus(false);
        changeSubscriptionState();

    }
    const getStudentRatelMa3yJoiningRequestData = (stdObji, event) => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        };

        axios.get(`http://localhost:5000/api/students/${stdObji._id}`).then((res) => {
            initialSpecificStudentJoiningRequestData.current = res.data;
            setSpecificStudentJoiningRequestData(res.data);
           
            //console.log(res.data);
        }).catch((error) => {
            console.log(error);
        }, headers);

        stdObji.subscription_state === 'Pending' ? setIsStudentRequestDataVisible(true) : setIsStudentRequestDataVisible(false);
        stdObji.subscription_state !== "Pending" && "Cancelled" ? setIsStudentRatelDataVisible(true) : setIsStudentRatelDataVisible(false);
        handlerRowClicked(event);
    }
    const distroyAlert = () => {

        setIsAlertVisible(true);
        setTimeout(() => {
            setIsAlertVisible(current => !current);
        }, 1000);
    }
    useEffect(() => {
        axios.get('http://localhost:5000/api/students').then((res) => {
            initialResponse.current = res.data;
            setStudentData(res.data.data)
        }, (error) => {
            console.log(error);
        });
        axios.get(`http://localhost:5000/api/instructors`).then((instructorRes) => {
            setInstructorData(instructorRes.data.data);
        }).catch((error) => {
            console.log(error);
        })
},[fetchAgain]);


    const changeSubscriptionState = () => {
        if (studentConfiguration.studentStatus !== 'Cancelled') {
            axios.put(`http://localhost:5000/api/students/${changableSubscriptionState._id}`, { subscription_state: studentConfiguration.studentStatus, instructor: studentConfiguration.studentInstructor }).then((res)=>{
                setFetchAgain(fetchAgain+1);
            }).catch((error)=>{
                console.log(error);
            })
            
            axios.put(`http://localhost:5000/api/instructors/${studentConfiguration.studentInstructor}`,{students:changableSubscriptionState._id}).then((res)=>{
                console.log(res.data);
            }).catch((error)=>{
                console.log(error);
            })
            
        } else {
           // console.log(studentConfiguration.studentStatus);
            axios.put(`http://localhost:5000/api/api/students/${changableSubscriptionState._id}`, { subscription_state: studentConfiguration.studentStatus, instructor:''}).then((res)=>{
                setFetchAgain(fetchAgain+1);
            }).catch((error)=>{
                console.log(error);
            })
        }
        distroyAlert();
    }

    return (
        <>
            <div className={StudentSubscriptionStyles['student-user-data-container']}>
                <div className={StudentSubscriptionStyles['table-settings-container']}>
                    <Form.Label htmlFor="userAccountFilterTxt" className={StudentSubscriptionStyles['filter-label']}>Filter</Form.Label>
                    <Form.Control id="userAccountFilterTxt" className={StudentSubscriptionStyles['filter-txt']} value={filterValue} onChange={handleFiltaration} />
                    <button type="button" className={StudentSubscriptionStyles['btn']} style={{ marginTop: 'auto' }} onClick={(event) => filterStudents(event.target.value)}>Filter <AiFillFilter /></button>
                    <button type="button" className={StudentSubscriptionStyles['btn']} style={{ marginTop: 'auto' }} onClick={resetTableFiltaration}>Reset<BiReset /></button>
                </div>

                <div className={StudentSubscriptionStyles['table-wrapper']}>
                    {studentData.length === 0 ? <img src={NoResultFiltaration} className={StudentSubscriptionStyles['no-result']} alt="no-result" /> : <table className={StudentSubscriptionStyles['student-accounts-table']}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th colSpan={"2"}>Subscription State</th>
                            </tr>
                        </thead>
                        <tbody>

                            {studentData.map((stdData,index) => (
                                <tr key={stdData._id} id={stdData._id} onClick={(event) => getStudentRatelMa3yJoiningRequestData(stdData, event)} style={{ background: selectedRow === stdData._id ? '#038674' : '', color: selectedRow === stdData._id ? '#FFFFFF' : '', boxShadow: selectedRow === stdData._id ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)` : '' }}>
                                    <td>{stdData.name}</td>
                                    <td>{stdData.subscription_state} {stdData.subscription_state !== 'Cancelled' ? <AiFillSetting className={StudentSubscriptionStyles['setting-icon-hidden']} size={25} onClick={(event) => toogleStudentStatus(stdData, event,index,"subscription state and instructor")} /> : null}</td>
                                    <td>{stdData.subscription_state !== 'Cancelled' ?<FaCalendarTimes className={StudentSubscriptionStyles['setting-icon-hidden']} size={21} onClick={(event) => toogleStudentStatus(stdData, event,index,"date and time")}/>:null}</td>

                                </tr>
                            ))}

                        </tbody>
                    </table>}

                </div>
                {studentStatus ? <div className={StudentSubscriptionStyles['dime-table']}>
                    <VscChromeClose size={30} onClick={closeDime} className={StudentSubscriptionStyles['close-dime']} style={{margin:typeOfProcess === 'date and time'?'7px 0px 8px 3px':'17px 0 0 17px'}}/>
                    {typeOfProcess === 'subscription state and instructor'?
                    
                    <div className={StudentSubscriptionStyles['setting-student-status_instructor-container']}>
                        <form onSubmit={handleSubmit} method="post">

                            <div>
                                <Form.Label htmlFor="studentStatus">Status</Form.Label>
                                <Form.Select id="studentStatus" name="student_status" className={`${errors.statusError ? StudentSubscriptionStyles['errors'] : ''}`} onChange={setConfiguration}>
                                    <option value="">Select</option>
                                    {
                                        changableSubscriptionState.subscription_state === 'Pending' ? pindingSubscriptionStateArr.map((subscriptionState) => (

                                            <option key={subscriptionState.subscription_id} value={subscriptionState.subscription_name}>{subscriptionState.subscription_name}</option>
                                        )) : changableSubscriptionState.subscription_state === 'Active' ? activeSubscriptionStatusArr.map((subscriptionState) => (
                                            <option key={subscriptionState.subscription_id} value={subscriptionState.subscription_name}>{subscriptionState.subscription_name}</option>
                                        )) : onHoldSubscriptionStatusArr.map((subscriptionState) => (
                                            <option key={subscriptionState.subscription_id} value={subscriptionState.subscription_name}>{subscriptionState.subscription_name}</option>
                                        ))
                                    }

                                </Form.Select>
                                <small className="text-danger">{errors.statusError}</small>
                            </div>
                                

                            {changableSubscriptionState.instructor !== null &&  changableSubscriptionState.instructor !== undefined?<><div>

                                <Form.Label htmlFor="studentInstructor">Instructor</Form.Label>
                                <Form.Select name="student_instructor" id="studentInstructor" className={`${errors.instructorError ? StudentSubscriptionStyles['errors'] : ''}`} onChange={setConfiguration}>
                                    <option value="">Select</option>
                                    {instructorData.map((instructor) => (
                                        <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
                                    ))}
                                </Form.Select>
                                <small className="text-danger">{errors.instructorError}</small>
                            </div>
                     
                        
                      
                            </>:studentConfiguration.studentStatus !== '' && studentConfiguration.studentStatus !== 'Cancelled' ? <><div>
                                <Form.Label htmlFor="studentInstructor">Instructor</Form.Label>
                                <Form.Select name="student_instructor" id="studentInstructor" className={`${errors.instructorError ? StudentSubscriptionStyles['errors'] : ''}`} onChange={setConfiguration}>
                                    <option value="">Select</option>
                                    {instructorData.map((instructor) => (
                                        <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
                                    ))}
                                </Form.Select>
                                <small className="text-danger">{errors.instructorError}</small>
                                <div>
                                <Form.Label htmlFor="started_in">Start At</Form.Label>
                                <Form.Control type="date" id="started_in" name="started_in"/>
                            </div>
                            </div> </>: null}
                            {studentConfiguration.studentStatus !== '' && studentConfiguration.studentStatus === 'Cancelled' ? <button type="submit" className={`${studentConfiguration.studentStatus === '' || errors.statusError || errors.instructorError ? StudentSubscriptionStyles['disabled-btn'] : StudentSubscriptionStyles['btn']}`} disabled={studentConfiguration.studentStatus === '' || errors.statusError || errors.instructorError ?true:false}>Save<FaSave style={{ margin: '0px 0 1px 3px' }} size={15} /></button> : changableSubscriptionState.instructor !== null && changableSubscriptionState.instructor !== undefined?<button type="submit" className={`${ StudentSubscriptionStyles['btn']}`}>Save<FaSave style={{ margin: '0px 0 1px 3px' }} size={15} /></button>  :<button type="submit" className={`${studentConfiguration.studentStatus === '' || studentConfiguration.studentInstructor === '' || errors.statusError || errors.instructorError ? StudentSubscriptionStyles['disabled-btn'] : StudentSubscriptionStyles['btn']}`} disabled={studentConfiguration.studentStatus === '' || studentConfiguration.studentInstructor === '' || errors.statusError || errors.instructorError ?true:false}>Save<FaSave style={{ margin: '0px 0 1px 3px' }} size={15} /></button>}
                        </form>
                    </div>:<div className={StudentSubscriptionStyles['student-sessions-days-hours']}>
                {/* change date and time of the sessions operations */}
                <form method="post">
                <span>{t("working_Days")}</span>
                <div className={`${StudentSubscriptionStyles["days-check-box-container"]}`}>
                  <div>
                    <Form.Label htmlFor="d0">{t("Saturday")}</Form.Label>
                    <Form.Check
                      name="d0"
                      id="d0"
                      value={0}
                      disabled={disabledDays.d0}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d0"]}
                    />
                  </div>
                  <div>
                    <Form.Label htmlFor="d1">{t("Sunday")}</Form.Label>
                    <Form.Check
                      name="d1"
                      id="d1"
                      disabled={disabledDays.d1}
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
                      disabled={disabledDays.d2}
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
                      disabled={disabledDays.d3}
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
                      disabled={disabledDays.d4}
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
                      disabled={disabledDays.d5}
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
                      disabled={disabledDays.d6}
                      value={6}
                      onChange={(event) => handleAppointmentInDays(event)}
                      checked={checkedDays["d6"]}
                    />
                  </div>
                </div>
                <span>{t("Working_Hours")}</span>
                <div
                  className={`${StudentSubscriptionStyles["hours-check-box-container"]}`}
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
            </form>
                        </div>}
                    </div> : null}
            </div>
            {isAlertVisible ? <div className={StudentSubscriptionStyles['alert']}>
                <img src={CircleGif} alt="gif-alert-circle" />
                {studentConfiguration.studentStatus !== '' ? <><span>{changableSubscriptionState.name}</span><span> Subscription State Has Changed Successfully</span></> : null}
            </div> : null}
        </>
    )

}
export default StudentSubscriptionState;