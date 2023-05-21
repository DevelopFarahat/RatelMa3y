import React, { useEffect, useState,useCallback, createRef } from "react";
import StudentDetailsStyles from "./StudentDetails.module.css";
import EmptyDataImage from "../../assets/images/empty.png";
import NoResultFiltaration from "../../assets/images/no-result.png";
import Present from "../../assets/images/attendance.png";
import absence from "../../assets/images/absence.png";
import { BiReset } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import Form from 'react-bootstrap/Form';
import {SiGooglemeet} from "react-icons/si";
import {AiFillLike} from "react-icons/ai";
import dateTimeSessionImage from "../../assets/images/dateTimeSessions.png";
import  DateTimeImage from "../../assets/images/date-time.png";
import sessionsDaysHours from "../../assets/images/hangouts-meet.png";
import StudentSessionsSchedule from "../student_sessions_schedule/StudentSessionsSchedule"
import { VscChromeClose } from "react-icons/vsc";
import {AiFillFilter} from "react-icons/ai";
import {MdKeyboardArrowDown} from "react-icons/md";
import {MdKeyboardArrowUp} from "react-icons/md";
import { ref } from "yup";
import { FaHourglassEnd } from "react-icons/fa";
const StudentDetails = ({specificStudentJoiningRequestData,studentSessionsDetails,setStudentSessionsDetails, setSpecificStudentJoiningRequestData, initialStudentSessionsDetails, isStudentRequestDataVisible, isStudentRatelDataVisible, setIsStudentRequestDataVisible, setIsStudentRatelDataVisible }) => {
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

const [isDateTimeVisable,setIsDateTimeVisable] = useState({
  visible:false,
  timeType:''
});
const fromDateRef = createRef();
const toDateRef = createRef();
const [selectedRow, setSelectedRow] = useState(-1);
const [totalPresent,setTotalPresent] = useState(0);
const [totalAbsence,setTotalAbsence] = useState(0);
const [totalSession,setTotalSession] = useState(0);
const [isSessionsMoreInfoOpend,setIsSessionsMoreInfoOpend] = useState(false);
const [sessionInfo,setSessionInfo] = useState([]);
  const toogleViewOfStudentRequestData = () => {
    setIsStudentRequestDataVisible(current => !current);
    setIsStudentRatelDataVisible(current => !current);

  }
  const toogleViewOfStudentRatelData = () => {
    setIsStudentRatelDataVisible(current => !current);
    setIsStudentRequestDataVisible(current => !current);
  }

  const sortSessions = (event) => {
    let studentSessionsDetailsCopy = [...studentSessionsDetails];
    let sortedSessionsArr = [];
    for (let i = 0; i < studentSessionsDetailsCopy.length; i++) {
     if(studentSessionsDetailsCopy[i].attendants.length){
      if (studentSessionsDetailsCopy[i].attendants.find((studentId)=>specificStudentJoiningRequestData._id === studentId) !== undefined){
        if(studentSessionsDetailsCopy[i].is_exam){
          studentSessionsDetailsCopy[i].isStudentPersent = true;
          studentSessionsDetailsCopy[i].isEx = true;
          sortedSessionsArr.push(studentSessionsDetailsCopy[i]);
        }else{
          studentSessionsDetailsCopy[i].isStudentPersent = true;
          studentSessionsDetailsCopy[i].isEx = false;
          sortedSessionsArr.push(studentSessionsDetailsCopy[i]);
        }
        
      }else{
        if(studentSessionsDetailsCopy[i].is_exam){
          studentSessionsDetailsCopy[i].isStudentPersent = false;
          studentSessionsDetailsCopy[i].isEx = true;
          sortedSessionsArr.push(studentSessionsDetailsCopy[i]);
        }else{
          studentSessionsDetailsCopy[i].isStudentPersent = false;
          studentSessionsDetailsCopy[i].isEx = false;
          sortedSessionsArr.push(studentSessionsDetailsCopy[i]);
        }
       
      }
    }else{
      if(studentSessionsDetailsCopy[i].is_exam){
        studentSessionsDetailsCopy[i].isStudentPersent = false;
        studentSessionsDetailsCopy[i].isEx = true;
        sortedSessionsArr.push(studentSessionsDetailsCopy[i]);
      }else{
        studentSessionsDetailsCopy[i].isStudentPersent = false;
        studentSessionsDetailsCopy[i].isEx = false;
        sortedSessionsArr.push(studentSessionsDetailsCopy[i]);
      }
      
    }
      
    }

    switch(event.target.value){
      case "byPresent":
        sortedSessionsArr.sort((a, b) => {
          return Number(b.isStudentPersent) - Number(a.isStudentPersent);
        });
        break;
        case "byAbsence":

          sortedSessionsArr.sort((a, b) => {
            return Number(a.isStudentPersent) - Number(b.isStudentPersent);
          });
        break;
      case "dateASC":
        sortedSessionsArr.sort((a, b) => {
          return (
            new Date(a.created_at.split("T")[0]).getTime() -
            new Date(b.created_at.split("T")[0]).getTime()
          );
        });
        break;
      case "dateDSC":
        sortedSessionsArr.sort((a, b) => {
          return (
            new Date(b.created_at.split("T")[0]).getTime() -
            new Date(a.created_at.split("T")[0]).getTime()
          );
        });
        break;
        case "exam":
          sortedSessionsArr.sort((a, b) => {
            return Number(b.isEx) - Number(a.isEx);
          });
        break;
      default:
    }
    //setSpecificStudentJoiningRequestData({...specificStudentJoiningRequestData,sessions:sortedSessionsArr})
    setStudentSessionsDetails(sortedSessionsArr);
  }


  const resetSortSessions = () => {
    setStudentSessionsDetails(initialStudentSessionsDetails.current);
 
  }
  const showDateTimeContainer = (tType)=>{
    setIsDateTimeVisable({
      visible:true,
      timeType:tType
    });
  }
  const hideDateTimeContainer = ()=>{
    setIsDateTimeVisable({
      visible:false,
      timeType:''
    });
  }
  const handlerRowClicked = useCallback((event) => {
    const id = event.currentTarget.id;
    setSelectedRow(id);
}, []);
  const getAttendaceOnSpecificPeroidOfDate =(event)=>{
    if(fromDateRef.current.value!== '' && toDateRef.current.value !== ''){
    let sessionsFiltrated = [];
    const studentSessionsDataCopy = [...initialStudentSessionsDetails.current];
    if(fromDateRef.current.value!== '' && toDateRef.current.value !== ''){
      for(let i = 0 ; i < studentSessionsDataCopy.length;i++){
        if(new Date(fromDateRef.current.value)  <= new Date(studentSessionsDataCopy[i].created_at.split("T")[0]).getTime()  && new Date(studentSessionsDataCopy[i].created_at.split("T")[0]).getTime()  <= new Date(toDateRef.current.value) ){
          sessionsFiltrated.push(studentSessionsDataCopy[i]);
        }
      }
    }
  setStudentSessionsDetails(sessionsFiltrated);
    }
  }
  const openCloseMoreSessionInfo = ()=>{
    setIsSessionsMoreInfoOpend(current=>!current);
  }
  useEffect(()=>{
    let watingDataAboutStudentSessions = true;
    let totalPresent = 0;
    let totalAbsence = 0;
    let totalNumberOfSession = 0;
    const studentSessionsDataCopy = [...studentSessionsDetails];
      for (let i = 0; i < studentSessionsDetails.length; i++) {
        totalNumberOfSession+=1;
       if(studentSessionsDetails[i].attendants.length !== 0){
        if (studentSessionsDetails[i].attendants.find((studentId)=>specificStudentJoiningRequestData._id === studentId) !== undefined){
          totalPresent+=1;
        }else{
         totalAbsence+=1;
        }
      }else{
       totalAbsence+=1;
      }
  }
  setTotalPresent(totalPresent);
  setTotalAbsence(totalAbsence);
  setTotalSession(totalNumberOfSession)
  let SessionAttendanceAndEvaluationArr = [];
  for(let i = 0 ; i <studentSessionsDetails.length;i++){
    let stdSessionDetails = {};
    stdSessionDetails["_id"] = studentSessionsDetails[i]._id;
   if(studentSessionsDetails[i].attendants.includes(specificStudentJoiningRequestData._id)){
    stdSessionDetails['isStudentAttends'] = true;
    if(studentSessionsDetails[i].evaluations[0] !== undefined){
      if(studentSessionsDetails[i].evaluations[0].student === specificStudentJoiningRequestData._id){
        if(studentSessionsDetails[i].is_exam){
          stdSessionDetails['exam'] = "examC1";
          stdSessionDetails['previously_evaluation'] ="";
          stdSessionDetails['current_evaluation'] = "";
          stdSessionDetails['total_evaluation'] = studentSessionsDetails[i].evaluations[0].total_eval;
        }else{
          stdSessionDetails['exam'] = "examC2";
          stdSessionDetails['previously_evaluation']  = studentSessionsDetails[i].evaluations[0].previously_eval;
          stdSessionDetails['current_evaluation'] = studentSessionsDetails[i].evaluations[0].current_eval;
          stdSessionDetails['total_evaluation'] = "";
        }
        stdSessionDetails['notes'] = studentSessionsDetails[i].evaluations[0].notes;
        stdSessionDetails['created_by'] = studentSessionsDetails[i].created_by !== null?studentSessionsDetails[i].created_by.name:"";
        stdSessionDetails['created_at'] = studentSessionsDetails[i].created_at.split("T")[0];
      }else{
        if(studentSessionsDetails[i].is_exam){
          stdSessionDetails['exam'] = "examC1";
          stdSessionDetails['previously_evaluation'] ="";
          stdSessionDetails['current_evaluation'] = "";
          stdSessionDetails['total_evaluation'] = "";
        }else{
          stdSessionDetails['exam'] = "examC2";
          stdSessionDetails['previously_evaluation']  = "";
          stdSessionDetails['current_evaluation'] = "";
          stdSessionDetails['total_evaluation'] = "";
        }
        stdSessionDetails['notes'] = "";
        stdSessionDetails['created_by'] = studentSessionsDetails[i].created_by !== null?studentSessionsDetails[i].created_by.name:"";
        stdSessionDetails['created_at'] = studentSessionsDetails[i].created_at.split("T")[0];
      }
   
    }else{
      if(studentSessionsDetails[i].is_exam){
        stdSessionDetails['exam'] = "examC1";
        stdSessionDetails['previously_evaluation'] ="";
        stdSessionDetails['current_evaluation'] = "";
        stdSessionDetails['total_evaluation'] = "";
      }else{
        stdSessionDetails['exam'] = "examC2";
        stdSessionDetails['previously_evaluation']  = "";
        stdSessionDetails['current_evaluation'] = "";
        stdSessionDetails['total_evaluation'] = "";
      }
      stdSessionDetails['notes'] = "";
      stdSessionDetails['created_by'] = studentSessionsDetails[i].created_by !== null?studentSessionsDetails[i].created_by.name:"";
      stdSessionDetails['created_at'] = studentSessionsDetails[i].created_at.split("T")[0];
    }
   }else{
    stdSessionDetails['isStudentAttends'] = false;
    if(studentSessionsDetails[i].evaluations[0] !== undefined){
      if(studentSessionsDetails[i].is_exam){
        stdSessionDetails['exam'] = "examC1";
        stdSessionDetails['previously_evaluation'] ="";
        stdSessionDetails['current_evaluation'] = "";
        stdSessionDetails['total_evaluation'] = studentSessionsDetails[i].evaluations[0].total_eval;
      }else{
        stdSessionDetails['exam'] = "examC2";
        stdSessionDetails['previously_evaluation']  = studentSessionsDetails[i].evaluations[0].previously_eval;
        stdSessionDetails['current_evaluation'] = studentSessionsDetails[i].evaluations[0].current_eval;
        stdSessionDetails['total_evaluation'] = "";
      }
      stdSessionDetails['notes'] = studentSessionsDetails[i].evaluations[0].notes;
      stdSessionDetails['created_by'] = studentSessionsDetails[i].created_by !== null?studentSessionsDetails[i].created_by.name:"";
      stdSessionDetails['created_at'] = studentSessionsDetails[i].created_at.split("T")[0];
    }else{
      if(studentSessionsDetails[i].is_exam){
        stdSessionDetails['exam'] = "examC1";
        stdSessionDetails['previously_evaluation'] ="";
        stdSessionDetails['current_evaluation'] = "";
        stdSessionDetails['total_evaluation'] = "";
      }else{
        stdSessionDetails['exam'] = "examC2";
        stdSessionDetails['previously_evaluation']  = "";
        stdSessionDetails['current_evaluation'] = "";
        stdSessionDetails['total_evaluation'] = "";
      }
        stdSessionDetails['notes'] = "";
        stdSessionDetails['created_by'] = studentSessionsDetails[i].created_by !== null?studentSessionsDetails[i].created_by.name:"";
        stdSessionDetails['created_at'] = studentSessionsDetails[i].created_at.split("T")[0];
    }
   }
   SessionAttendanceAndEvaluationArr.push(stdSessionDetails);
  }
  setSessionInfo(SessionAttendanceAndEvaluationArr);
  return ()=> watingDataAboutStudentSessions = false;
  },[specificStudentJoiningRequestData,studentSessionsDetails])



  return (
    <>
      <div className={StudentDetailsStyles['student-details-main-container']} style={{direction:t("us") === t("Us")?'ltr':"rtl"}}>
        {Object.keys(specificStudentJoiningRequestData).length === 0 ? <img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" /> : specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? <div className={StudentDetailsStyles['settings-header']}>
          <span className={`${isStudentRequestDataVisible ? StudentDetailsStyles['taps-shadow'] : ''} ${StudentDetailsStyles['joinnig-request-data-tap']}`} onClick={toogleViewOfStudentRatelData}>{t("student_data")}</span>   {specificStudentJoiningRequestData.subscription_state !== 'Pending' ? <span className={`${isStudentRatelDataVisible ? StudentDetailsStyles['taps-shadow'] : ''} ${StudentDetailsStyles['ratel-student-data-tap']}`} onClick={toogleViewOfStudentRequestData}>{t("session_details")}</span> : null}
        </div> : <img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" />}
        {Object.keys(specificStudentJoiningRequestData).length !== 0 && specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? isStudentRequestDataVisible && specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? <div className={StudentDetailsStyles['student-request-joinnig-info-main-container']}>
        {/* request */}
        <div className={StudentDetailsStyles['student-table-main-header']}>
            <button className={StudentDetailsStyles['btn']} onClick={()=>showDateTimeContainer('workingTime')}>{t("schedule")}</button>
            <span>{t("student_data")}</span>
            <button className={StudentDetailsStyles['btn']} onClick={()=>showDateTimeContainer('prefsTime')} >{t("prefs_times_days")}</button>
            </div>
            {isDateTimeVisable.visible?<div className={StudentDetailsStyles['date-time-container-main']}>
            <VscChromeClose size={30} onClick={hideDateTimeContainer} className={StudentDetailsStyles['close-date-time-container']}/>
            {isDateTimeVisable.timeType === 'prefsTime'?<div className={StudentDetailsStyles['days-hours-sessions-whol-container']}>
            <div className={StudentDetailsStyles['student-sessions-days']}>
  
            <div className={StudentDetailsStyles["table-wrapper"]}>
          <table
            className={
              StudentDetailsStyles[
                "student-session-date-time-table"
              ]
            }
          >
            <thead>
              <tr>
                {days.map((wDays,index) => (
                  <th key={index}>{wDays}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {specificStudentJoiningRequestData.program_prefs.pref_days !== null &&
                specificStudentJoiningRequestData.program_prefs.pref_days!== undefined
                  ? specificStudentJoiningRequestData.program_prefs.pref_days.map(
                      (sessionDay, index) => (
                        <td key={index}>
                          
                          {sessionDay !== -1 ? (
                            <img
                            className={StudentDetailsStyles['student-session-days-hours-img']}
                              src={dateTimeSessionImage}
                              alt="correctDateTimeSession"
                            />
                          ) : (
                            ""
                          )}
                        </td>
                      )
                    )
                  : null}
              </tr>
            </tbody>
          </table>
        </div>
            </div>
            <div className={StudentDetailsStyles['student-sessions-hours']}>
            <div className={StudentDetailsStyles["table-wrapper"]}>
          <table
            className={
              StudentDetailsStyles[
                "student-session-date-time-table"
              ]
            }
          >
            <thead>
              <tr>
                <th>8:00 {t("AM")}</th>
                <th>10:00 {t("AM")}</th>
                <th>12:00 {t("PM")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              {specificStudentJoiningRequestData!== undefined ?  specificStudentJoiningRequestData.program_prefs.pref_times_of_day[0][1]  !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {specificStudentJoiningRequestData!== undefined ?  specificStudentJoiningRequestData.program_prefs.pref_times_of_day[1][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {specificStudentJoiningRequestData !== undefined ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[2][1]  !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>} 
              </tr>
              <tr>
                <td>2:00 {t("PM")}</td>
                <td>4:00 {t("PM")}</td>
                <td>6:00 {t("PM")}</td>
              </tr>
              <tr>
              {specificStudentJoiningRequestData !== undefined ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[3][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {specificStudentJoiningRequestData !== undefined ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[4][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {specificStudentJoiningRequestData !== undefined ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[5][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>} 
              </tr>
              <tr>
                <td>8:00 {t("PM")}</td>
                <td>10:00 {t("PM")}</td>
              </tr>
              <tr>
                
              {specificStudentJoiningRequestData!== undefined ?  specificStudentJoiningRequestData.program_prefs.pref_times_of_day[6][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {specificStudentJoiningRequestData!== undefined ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[7][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              </tr>
            </tbody>
          </table>
        </div>
            </div>
            </div>:<div>
              {/* student session */}
              <StudentSessionsSchedule specificStudentJoiningRequestData={specificStudentJoiningRequestData}/>
              </div>}
            </div>:null}
            <div className={StudentDetailsStyles['requested-joinnig-student-table-wrapper']}>
          <table className={StudentDetailsStyles['requested-joinnig-student-table']}>
            <thead>
              <tr>
                <th>{t("name")}</th>
                <td>{specificStudentJoiningRequestData.name}</td>
              
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?
                <th colSpan={"2"}>{t("instructor")}</th>:<th colSpan={"2"}>{t("additional_info")}</th>}
              </tr>
              <tr>
              <th>{t("age")}</th>
                <td>{specificStudentJoiningRequestData.age}</td>
              
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>{t("name")}</th>
                <td>{specificStudentJoiningRequestData.instructor.name}</td></>:<><th>{t("program")}</th><td>{specificStudentJoiningRequestData.program_prefs.type}</td></>}
              </tr>
              <tr>
                <th>{t("gender")}</th>
                <td>{specificStudentJoiningRequestData.gender}</td>
                
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>{t("gender")}</th>
                <td>{specificStudentJoiningRequestData.instructor.gender}</td></>:<><th>{t("weeks_sessions")}</th><td>{specificStudentJoiningRequestData.program_prefs.sessions_in_week}</td></>}
              </tr>
              <tr>
                <th>{t("state")}</th>
                <td>{specificStudentJoiningRequestData.state}</td>
              
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>{t("state")}</th>
                <td>{specificStudentJoiningRequestData.instructor.state}</td></>:<><th>{t("Surah preferred to start from")}</th><td>{specificStudentJoiningRequestData.started_from_surah}</td></>}
              </tr>
              <tr>
                <th>{t("mobile")}</th>
                <td>{specificStudentJoiningRequestData.mobile}</td>
                 {specificStudentJoiningRequestData.subscription_state !== 'Cancelled' && (specificStudentJoiningRequestData.instructor === undefined || specificStudentJoiningRequestData.instructor === null)?<>
                 <th>{t("Quran Surah Or Juiz Reached Before")}</th>
                 <td>{specificStudentJoiningRequestData.reached_surah}</td>
                 </>:<><th colSpan={"2"}>{t("additional_info")}</th></>}
              </tr>
              <tr>
                <th>{t("whatsapp_num")}</th>
                <td>{specificStudentJoiningRequestData.whatsapp_number}</td>
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>{t("program")}</th>
                <td>{specificStudentJoiningRequestData.program_prefs.type}</td>
                </>:null}
              </tr>
              <tr>
                <th>{t("qualification")}</th>
                <td>{specificStudentJoiningRequestData.certificate}</td>
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>{t("weeks_sessions")}</th><td>{specificStudentJoiningRequestData.program_prefs.sessions_in_week}</td>
                </>:null}
              </tr>
              <tr>
                <th>{t("email")}</th>
                <td>{specificStudentJoiningRequestData.email}</td>
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>{t("Surah preferred to start from")}</th><td>{specificStudentJoiningRequestData.started_from_surah}</td>
                </>:null}
              </tr>
              {specificStudentJoiningRequestData.subscription_state !== "Pending" && specificStudentJoiningRequestData.instructor !== null && specificStudentJoiningRequestData.started_in !== null?<>
              <tr>
                <th>{t("started_at")}</th>
                <td>{specificStudentJoiningRequestData.started_in.split("T")[0]}</td>
                <th>{t("Quran Surah Or Juiz Reached Before")}</th>
                 <td>{specificStudentJoiningRequestData.reached_surah}</td>
              </tr>
              </>:null}
              <tr></tr>
            </thead>
          </table>
          </div>
        </div> :specificStudentJoiningRequestData.sessions.length !== 0?<div className={StudentDetailsStyles['student-ratel-info-main-container']}>
          {/* ratel member */}
          <div className={StudentDetailsStyles['table-settings-container']}>
          <section  style={{bottom:isSessionsMoreInfoOpend?'100%':'0',height:isSessionsMoreInfoOpend?'100%':'0',direction:t("us")===t("Us")?'ltr':'rtl'}}>
          <div className={`${isSessionsMoreInfoOpend? StudentDetailsStyles['show-more-session-info']:StudentDetailsStyles['hide-more-session-info']}`}>
            <Form.Label htmlFor="totalNumberOfSessions" style={{textAlign:t("us")===t("Us")?'end':'start'}}>{t("total_session")}</Form.Label>
            <Form.Control type="number" name="totalNumberOfSessions" id="totalNumberOfSessions" readOnly value={totalSession}/>
            </div>
            <div className={`${isSessionsMoreInfoOpend? StudentDetailsStyles['show-more-session-info']:StudentDetailsStyles['hide-more-session-info']}`}>
            <Form.Label htmlFor="totalPresent" style={{textAlign:t("us")===t("Us")?'end':'start'}}>{t("total_present")}</Form.Label>
            <Form.Control type="number" name="totalPresent" id="totalPresent" readOnly value={totalPresent}/>
            </div>
            <div className={`${isSessionsMoreInfoOpend? StudentDetailsStyles['show-more-session-info']:StudentDetailsStyles['hide-more-session-info']}`}>
            <Form.Label htmlFor="totalAbsence" style={{textAlign:t("us")===t("Us")?'end':'start'}}>{t("total_absence")}</Form.Label>
            <Form.Control type="number" name="totalAbsence" id="totalAbsence" readOnly value={totalAbsence}/>
            </div>

           {isSessionsMoreInfoOpend?<MdKeyboardArrowUp onClick={openCloseMoreSessionInfo} className={StudentDetailsStyles['open-close-arrow-icon']} style={{transform:isSessionsMoreInfoOpend?'rotate(360deg)':'rotate(0deg)',bottom:isSessionsMoreInfoOpend?'67%':'-5%',right:t("us")===t("Us")?'0':'90%'}}/>:<MdKeyboardArrowDown onClick={openCloseMoreSessionInfo} className={StudentDetailsStyles['open-close-arrow-icon']} style={{transform:isSessionsMoreInfoOpend?'rotate(360deg)':'rotate(0deg)',bottom:isSessionsMoreInfoOpend?'67%':'-5%',right:t("us")===t("Us")?'0':'90%'}}/>}
          </section>
            <section>
            <Form.Label htmlFor="sortStudentSessions">{t("sort")}</Form.Label>
            <Form.Select name="sort-student-sessions" id="sortStudentSessions" className={StudentDetailsStyles['form-sort-select']} onChange={sortSessions} style={{textAlign:t("us")===t("Us")?'start':'end'}}>
              <option value="">{t("select")}</option>
              <optgroup label={t("attendance")}>
              <option value="byPresent">{t("present")}</option>
              <option value="byAbsence">{t("absence")}</option>
              </optgroup>
              <optgroup label={t("date")}>
              <option value="dateASC">{t("asc")}</option>
              <option value="dateDSC">{t("dsc")}</option>
              </optgroup>
              <option value="exam">{t("evaluations_general_exam")}</option>
            </Form.Select>
            </section>
            <section>
            <Form.Label htmlFor="fromDate">{t("fromDate")}</Form.Label>
            <Form.Control type="date" ref={fromDateRef} name="date-from" id="fromDate"  onChange={getAttendaceOnSpecificPeroidOfDate}/>
            </section>
            <section>
            <Form.Label htmlFor="toDate">{t("toDate")}</Form.Label>
            <Form.Control ref={toDateRef} type="date" name="date-to" id="toDate"   onChange={getAttendaceOnSpecificPeroidOfDate}/>
            </section>
            <section>
            <button type="button" className={StudentDetailsStyles['btn']} onClick={resetSortSessions} style={{direction: 'ltr' }}>{t("reset")}<BiReset /></button>
            </section>
          </div>
          <div className={StudentDetailsStyles['table-wrapper']}>
            {studentSessionsDetails.length === 0 || studentSessionsDetails === undefined ? <section><img src={NoResultFiltaration} className={StudentDetailsStyles['no-result']} alt="no-result" /><span>{t("thre are no sessions during this period")}</span></section> : <table className={StudentDetailsStyles['student-session-info-table']}>
              <thead>
                <tr>
                  <th>{t("attendance")}</th>
                  <th>{t("previously_ev")}</th>
                  <th>{t("current_ev")}</th>
                  <th>{t("evaluations_general_exam")}</th>
                  <th>{t("total_ev")}</th>
                  <th>{t("notes")}</th>
                  <th>{t("instructor")}</th>
                  <th>{t("created_at")}</th>
                </tr>
              </thead>
              <tbody>
                {sessionInfo !== undefined?
                sessionInfo.map((session)=>(
                  <tr key={session._id} id={session._id}
                  onClick={(event) => {
                    handlerRowClicked(event);
                }}
                style={{
                    background:
                        selectedRow === session._id ? "#198754" : "",
                    color: selectedRow === session._id ? "#FFFFFF" : "",
                    boxShadow:
                        selectedRow === session._id
                            ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)`
                            : "",
                }}>
                  <td>{session.isStudentAttends?<img src={Present} alt="attendance" style={{display:'block',margin:'auto',width:'40px'}}/>:<img src={absence}  alt="absence" style={{display:'block',margin:'auto',width:'30px'}} />}</td>
                  <td>{session.previously_evaluation}</td>
                  <td>{session.current_evaluation}</td>
                  <td>{t(session.exam)}</td>
                  <td>{session.total_evaluation}</td>
                  <td>{session.notes}</td>
                  <td>{session.created_by}</td>
                  <td>{session.created_at}</td>
                    </tr>
                )):null}
              </tbody>
            </table>}
          </div>
        </div>:<img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" /> : null}
      </div>
    </>
  );
};
export default StudentDetails;
