import React, { useEffect, useState,useCallback } from "react";
import StudentDetailsStyles from "./StudentDetails.module.css";
import EmptyDataImage from "../../assets/images/empty.png";
import NoResultFiltaration from "../../assets/images/no-result.png";
import Present from "../../assets/images/attendance.png";
import absence from "../../assets/images/absence.png";
import { BiReset } from "react-icons/bi";
import Form from 'react-bootstrap/Form';
import dateTimeSessionImage from "../../assets/images/dateTimeSessions.png";
import  DateTimeImage from "../../assets/images/date-time.png";
import sessionsDaysHours from "../../assets/images/hangouts-meet.png";
import { VscChromeClose } from "react-icons/vsc";
import {AiFillFilter} from "react-icons/ai";
import {MdKeyboardArrowDown} from "react-icons/md";
import {MdKeyboardArrowUp} from "react-icons/md";
const StudentDetails = ({specificStudentJoiningRequestData,studentSessionsDetails,setStudentSessionsDetails, setSpecificStudentJoiningRequestData, initialStudentSessionsDetails, isStudentRequestDataVisible, isStudentRatelDataVisible, setIsStudentRequestDataVisible, setIsStudentRatelDataVisible }) => {
  const [isToolTipShown,setIsToolTipShown] = useState(false);
  const [isToolTipSchedulerShown,setIsToolTipSchedulerShown] = useState(false);
  let programes = [{ id: 0, name: "programprogr1" }, { id: 1, name: "programprogr2" }, { id: 2, name: "programprogr3" },]
  let days = ['Saturday','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  let workingHoursArr = [
    ["8:00 am", " 10:00 pm"],
    ["10:00 am", "12:00 pm"],
    ["12:00 pm", "2:00 pm"],
    ["2:00 pm", " 4:00 pm"],
    ["4:00 pm", " 6:00 pm"],
    ["6:00 pm", " 8:00 pm"],
    ["8:00 pm", " 10:00 pm"],
    ["10:00 pm", "12:00 am"],
];
const [isDateTimeVisable,setIsDateTimeVisable] = useState(false);
const [selectedRow, setSelectedRow] = useState(-1);
const [totalPresent,setTotalPresent] = useState(0);
const [totalAbsence,setTotalAbsence] = useState(0);
const [totalSession,setTotalSession] = useState(0);
const [isSessionsMoreInfoOpend,setIsSessionsMoreInfoOpend] = useState(false);
const [sessionsDate,setSessionsDate] = useState({
  fromDate:'',
  toDate:''
})
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
        studentSessionsDetailsCopy[i].isStudentPersent = true;
        sortedSessionsArr.push(studentSessionsDetailsCopy[i]);
      }else{
        studentSessionsDetailsCopy[i].isStudentPersent = false;
        sortedSessionsArr.push(studentSessionsDetailsCopy[i]);
      }
    }else{
      studentSessionsDetailsCopy[i].isStudentPersent = false;
          sortedSessionsArr.push(studentSessionsDetailsCopy[i]);
    }
      
    }

   console.log(sortedSessionsArr);
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
      default:
    }
    //setSpecificStudentJoiningRequestData({...specificStudentJoiningRequestData,sessions:sortedSessionsArr})
    setStudentSessionsDetails(sortedSessionsArr);
  }


  const resetSortSessions = () => {
    setStudentSessionsDetails(initialStudentSessionsDetails.current);
 
  }
  const showDateTimeContainer = ()=>{
    setIsDateTimeVisable(true);
  }
  const hideDateTimeContainer = ()=>{
    setIsDateTimeVisable(false);
  }
  const handlerRowClicked = useCallback((event) => {
    const id = event.currentTarget.id;
    setSelectedRow(id);
}, []);
 const displayToolTip = ()=>{
  setIsToolTipShown(true);
 }
 const distroyToolTip = ()=>{
  setIsToolTipShown(false);
 }
 const handleSessionsDate=(event)=>{
  setSessionsDate(
    {
      ...sessionsDate,
      [event.target.id]:event.target.value
    }
  )
      
 }
  const getAttendaceOnSpecificPeroidOfDate =(event)=>{
    let sessionsFiltrated = [];
    const studentSessionsDataCopy = [...initialStudentSessionsDetails.current];
    if(sessionsDate.fromDate !== '' && sessionsDate.toDate !== ''){
      for(let i = 0 ; i < studentSessionsDataCopy.length;i++){
        if(new Date(sessionsDate.fromDate)  <= new Date(studentSessionsDataCopy[i].created_at.split("T")[0]).getTime()  && new Date(studentSessionsDataCopy[i].created_at.split("T")[0]).getTime()  <= new Date(sessionsDate.toDate) ){
          sessionsFiltrated.push(studentSessionsDataCopy[i]);
        }
      }
    }
  setStudentSessionsDetails(sessionsFiltrated);
  }
  const openCloseMoreSessionInfo = ()=>{
    setIsSessionsMoreInfoOpend(current=>!current);
  }
  useEffect(()=>{
    let totalPresent = 0;
    let totalAbsence = 0;
    let totalNumberOfSession = 0;
      const studentSessionsDataCopy = [...studentSessionsDetails];
      for (let i = 0; i < studentSessionsDataCopy.length; i++) {
        totalNumberOfSession+=1;
       if(studentSessionsDataCopy[i].attendants.length !== 0){
        console.log("hi");
        if (studentSessionsDataCopy[i].attendants.find((studentId)=>specificStudentJoiningRequestData._id === studentId) !== undefined){
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
  },[specificStudentJoiningRequestData,studentSessionsDetails])

  return (
    <>
      <div className={StudentDetailsStyles['student-details-main-container']}>
        {Object.keys(specificStudentJoiningRequestData).length === 0 ? <img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" /> : specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? <div className={StudentDetailsStyles['settings-header']}>
          <span className={`${isStudentRequestDataVisible ? StudentDetailsStyles['taps-shadow'] : ''} ${StudentDetailsStyles['joinnig-request-data-tap']}`} onClick={toogleViewOfStudentRatelData}>Student Data</span>   {specificStudentJoiningRequestData.subscription_state !== 'Pending' ? <span className={`${isStudentRatelDataVisible ? StudentDetailsStyles['taps-shadow'] : ''} ${StudentDetailsStyles['ratel-student-data-tap']}`} onClick={toogleViewOfStudentRequestData}>Sessions Details</span> : null}
        </div> : <img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" />}
        {Object.keys(specificStudentJoiningRequestData).length !== 0 && specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? isStudentRequestDataVisible && specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? <div className={StudentDetailsStyles['student-request-joinnig-info-main-container']} style={{overflow:isDateTimeVisable?'hidden':'auto'}}>
          {/* request */}
         <div className={`${StudentDetailsStyles['show-daysTimes-tooltip']}`} style={{opacity:isToolTipShown?'1':'0',transition:isToolTipShown?'opacity .5s':''}}>
            <span>Click to show preferred days and hours</span>
          </div>
          <div className={StudentDetailsStyles['show-daysTimes-tooltip-sessions']} style={{opacity:isToolTipShown?'1':'0',transition:isToolTipShown?'opacity .5s':''}}>
            <span>Click to show student sessions scheduler</span>
          </div>
          <div className={StudentDetailsStyles['student-table-main-header']}>
          <img className={StudentDetailsStyles['date-time-icon']} onMouseOver={displayToolTip} onMouseOut={distroyToolTip}  src={sessionsDaysHours} onClick={showDateTimeContainer}  alt="meeting-day-time"/>
            <span>Student Data</span>
              <img className={StudentDetailsStyles['date-time-icon']} onMouseOver={displayToolTip} onMouseOut={distroyToolTip}  src={DateTimeImage} onClick={showDateTimeContainer}  alt="date-time"/>
            </div>
            {isDateTimeVisable?<div className={StudentDetailsStyles['date-time-container-main']}>
            <VscChromeClose size={30} onClick={hideDateTimeContainer} className={StudentDetailsStyles['close-date-time-container']}/>
            <div className={StudentDetailsStyles['days-hours-sessions-whol-container']}>
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
                <th> 8:00 am : 10:00 pm</th>
                <th> 10:00 am : 12:00 pm</th>
                <th> 12:00 pm : 2:00 pm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              {specificStudentJoiningRequestData!== undefined ?  specificStudentJoiningRequestData.program_prefs.pref_times_of_day[0][1]  !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {specificStudentJoiningRequestData!== undefined ?  specificStudentJoiningRequestData.program_prefs.pref_times_of_day[1][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {specificStudentJoiningRequestData !== undefined ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[2][1]  !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>} 
              </tr>
              <tr>
                <td>2:00 pm : 4:00 pm</td>
                <td>4:00 pm : 6:00 pm</td>
                <td>6:00 pm :  8:00 pm</td>
              </tr>
              <tr>
              {specificStudentJoiningRequestData !== undefined ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[3][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {specificStudentJoiningRequestData !== undefined ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[4][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {specificStudentJoiningRequestData !== undefined ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[5][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>} 
              </tr>
              <tr>
                <td>8:00 pm : 10:00 pm</td>
                <td>10:00 pm : 12:00 am</td>
              </tr>
              <tr>
                
              {specificStudentJoiningRequestData!== undefined ?  specificStudentJoiningRequestData.program_prefs.pref_times_of_day[6][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {specificStudentJoiningRequestData!== undefined ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[7][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              </tr>
            </tbody>
          </table>
        </div>
            </div>
            </div>
            </div>:null}
          <table className={StudentDetailsStyles['requested-joinnig-student-table']}>
            <thead>
              <tr>
                <th >Name</th>
                <td>{specificStudentJoiningRequestData.name}</td>
              
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?
                <th colSpan={"2"}>Instructor</th>:<th colSpan={"2"}>Additinal Info </th>}
              </tr>
              <tr>
              <th>Age</th>
                <td>{specificStudentJoiningRequestData.age}</td>
              
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>Name</th>
                <td>{specificStudentJoiningRequestData.instructor.name}</td></>:<><th>Program</th><td>{specificStudentJoiningRequestData.program_prefs.type}</td></>}
              </tr>
              <tr>
                <th>Gender</th>
                <td>{specificStudentJoiningRequestData.gender}</td>
                
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>Gender</th>
                <td>{specificStudentJoiningRequestData.instructor.gender}</td></>:<><th>Sessions Per Week</th><td>{specificStudentJoiningRequestData.program_prefs.sessions_in_week}</td></>}
              </tr>
              <tr>
                <th>State</th>
                <td>{specificStudentJoiningRequestData.state}</td>
              
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>State</th>
                <td>{specificStudentJoiningRequestData.instructor.state}</td></>:<><th>Surah preferred to start from</th><td>{specificStudentJoiningRequestData.started_from_surah}</td></>}
              </tr>
              <tr>
                <th>Mobile</th>
                <td>{specificStudentJoiningRequestData.mobile}</td>
                 {specificStudentJoiningRequestData.subscription_state === 'Pending' && (specificStudentJoiningRequestData.instructor === undefined)?<>
                 <th>Qur'an Surah Or Juiz Reached Before</th>
                 <td>{specificStudentJoiningRequestData.reached_surah}</td>
                 </>:<><th colSpan={"2"}> Additinal Info</th></>}
              </tr>
              <tr>
                <th>Whats Number</th>
                <td>{specificStudentJoiningRequestData.whatsapp_number}</td>
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>Program</th>
                <td>{specificStudentJoiningRequestData.program_prefs.type}</td>
                </>:null}
              </tr>
              <tr>
                <th>Certificate</th>
                <td>{specificStudentJoiningRequestData.certificate}</td>
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>Sessions Per Week</th><td>{specificStudentJoiningRequestData.program_prefs.sessions_in_week}</td>
                </>:null}
              </tr>
              <tr>
                <th>Email</th>
                <td>{specificStudentJoiningRequestData.email}</td>
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?<>
                <th>Surah preferred to start from</th><td>{specificStudentJoiningRequestData.started_from_surah}</td>
                </>:null}
              </tr>
              {specificStudentJoiningRequestData.subscription_state !== "Pending" && specificStudentJoiningRequestData.instructor !== null && specificStudentJoiningRequestData.started_in !== null?<>
              <tr>
                <th>Started At</th>
                <td>{specificStudentJoiningRequestData.started_in.split("T")[0]}</td>
                <th>Qur'an Surah Or Juiz Reached Before</th>
                 <td>{specificStudentJoiningRequestData.reached_surah}</td>
              </tr>
              </>:null}
              <tr></tr>
            </thead>
          </table>

        </div> :specificStudentJoiningRequestData.sessions.length !== 0?<div className={StudentDetailsStyles['student-ratel-info-main-container']}>
          {/* ratel member */}

          <div className={StudentDetailsStyles['table-settings-container']}>
            <section>
            <Form.Label htmlFor="sortStudentSessions">Sort</Form.Label>
            <Form.Select name="sort-student-sessions" id="sortStudentSessions" className={StudentDetailsStyles['form-sort-select']} onChange={sortSessions}>
              <option value="">Select</option>
              <optgroup label="By Attendance">
              <option value={"byPresent"}>By byPresent</option>
              <option value={"byAbsence"}>By Absence</option>
              </optgroup>
              <optgroup label="By Date">
              <option value="dateASC">ASC</option>
              <option value="dateDSC">DSC</option>
              </optgroup>
            </Form.Select>
            </section>
            <section>
            <Form.Label htmlFor="fromDate">From Date</Form.Label>
            <Form.Control type="date" name="date-from" id="fromDate"  value={sessionsDate.fromDate} onChange={handleSessionsDate}/>
            </section>
            <section>
            <Form.Label htmlFor="toDate">To Date</Form.Label>
            <Form.Control type="date" name="date-to" id="toDate"  value={sessionsDate.toDate} onChange={handleSessionsDate}/>
            </section>
            <section>
            <button type="button" className={StudentDetailsStyles['btn']} onClick={getAttendaceOnSpecificPeroidOfDate}>Filter <AiFillFilter /></button>
            <button type="button" className={StudentDetailsStyles['btn']} onClick={resetSortSessions}>Reset<BiReset /></button>
            </section>
          </div>
          <div className={`${StudentDetailsStyles['student-sessions-more-info'] } ${isSessionsMoreInfoOpend?StudentDetailsStyles['student-sessions-more-info-transition']:'' }`} style={{height:isSessionsMoreInfoOpend?'20%':'auto',bottom:isSessionsMoreInfoOpend?'62%':'78%'}}>
            <div className={`${isSessionsMoreInfoOpend? StudentDetailsStyles['show-more-session-info']:StudentDetailsStyles['hide-more-session-info']}`}>
            <Form.Label htmlFor="totalNumberOfSessions">Total Sessions</Form.Label>
            <Form.Control type="number" name="totalNumberOfSessions" id="totalNumberOfSessions" readOnly value={totalSession}/>
            </div>
            <div className={`${isSessionsMoreInfoOpend? StudentDetailsStyles['show-more-session-info']:StudentDetailsStyles['hide-more-session-info']}`}>
            <Form.Label htmlFor="totalPresent">Total Present</Form.Label>
            <Form.Control type="number" name="totalPresent" id="totalPresent" readOnly value={totalPresent}/>
            </div>
            <div className={`${isSessionsMoreInfoOpend? StudentDetailsStyles['show-more-session-info']:StudentDetailsStyles['hide-more-session-info']}`}>
            <Form.Label htmlFor="totalAbsence">Total Absence</Form.Label>
            <Form.Control type="number" name="totalAbsence" id="totalAbsence" readOnly value={totalAbsence}/>
            </div>
           {isSessionsMoreInfoOpend?<MdKeyboardArrowUp onClick={openCloseMoreSessionInfo} className={StudentDetailsStyles['open-close-arrow-icon']} style={{transform:isSessionsMoreInfoOpend?'rotate(360deg)':'rotate(0deg)',bottom:isSessionsMoreInfoOpend?'67%':'-54%'}}/>:<MdKeyboardArrowDown onClick={openCloseMoreSessionInfo} className={StudentDetailsStyles['open-close-arrow-icon']} style={{transform:isSessionsMoreInfoOpend?'rotate(360deg)':'rotate(0deg)',bottom:isSessionsMoreInfoOpend?'67%':'-54%'}}/>}
          </div>
          <div className={StudentDetailsStyles['table-wrapper']}>
            {studentSessionsDetails.length === 0 ? <img src={NoResultFiltaration} className={StudentDetailsStyles['no-result']} alt="no-result" /> : <table className={StudentDetailsStyles['student-session-info-table']}>
              <thead>
                <tr>
                  <th>Attendance</th>
                  <th>Current Evaluation</th>
                  <th>Notes</th>
                  <th>Instructor</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {studentSessionsDetails !== null && studentSessionsDetails !== undefined?
                studentSessionsDetails.map((session)=>(
                  <tr key={session._id} id={session._id}
                  onClick={(event) => {
                    handlerRowClicked(event);
                }}
                style={{
                    background:
                        selectedRow === session._id ? "#038674" : "",
                    color: selectedRow === session._id ? "#FFFFFF" : "",
                    boxShadow:
                        selectedRow === session._id
                            ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)`
                            : "",
                }}>
                    {session.attendants.length !== 0 && session.attendants !== null && session.attendants !== undefined?<td>
                    {session.attendants.find((studentId)=> specificStudentJoiningRequestData._id === studentId) !== undefined?<img src={Present} alt="attendance" style={{display:'block',margin:'auto',width:'40px'}}/>:<img src={absence}  alt="absence" style={{display:'block',margin:'auto',width:'30px'}} />}
                    </td>:session.attendants.length === 0?<td><img src={absence}  alt="absence" style={{display:'block',margin:'auto',width:'30px'}}/></td>:<td>{"ff "}</td>}
                     {session.attendants.find((studentId)=> specificStudentJoiningRequestData._id === studentId) !== undefined?
                     session.evaluations !== undefined?session.evaluations.map((ev)=>(
                      <>
                      <td>{ev.current_eval}</td>
                      <td>{ev.notes}</td>
                      </>
                      )):null:<><td>{""}</td>{""}<td></td></>}
                    <td>{session.created_by.name}</td>
                    <td>{session.created_at.split("T")[0]}{" "}</td>
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
