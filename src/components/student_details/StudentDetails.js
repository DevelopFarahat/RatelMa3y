import React, { useEffect, useState } from "react";
import StudentDetailsStyles from "./StudentDetails.module.css";
import EmptyDataImage from "../../assets/images/empty.png";
import NoResultFiltaration from "../../assets/images/no-result.png";
import Present from "../../assets/images/attendance.png";
import absence from "../../assets/images/absence.png";
import { BiReset } from "react-icons/bi";
import Form from 'react-bootstrap/Form';
import dateTimeSessionImage from "../../assets/images/dateTimeSessions.png";
import  DateTimeImage from "../../assets/images/date-time.png";
import { VscChromeClose } from "react-icons/vsc";
import { AiFillPayCircle } from "react-icons/ai";
import axios from "axios";
const StudentDetails = ({fetchSpecificStudentDataAgain,specificStudentJoiningRequestData, setSpecificStudentJoiningRequestData, initialSpecificStudentJoiningRequestData, isStudentRequestDataVisible, isStudentRatelDataVisible, setIsStudentRequestDataVisible, setIsStudentRatelDataVisible }) => {
  let programes = [{ id: 0, name: "programprogr1" }, { id: 1, name: "programprogr2" }, { id: 2, name: "programprogr3" },]
  let days = ['Saturday','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  let working_hours = [{ id: 0, hour: "from 2:30 pm to 5:30 pm" }, { id: 1, hour: "from 2:30 pm to 5:30 pm" }, { id: 2, hour: "from 2:30 pm to 5:30 pm" }, { id: 3, hour: "from 2:30 pm to 5:30 pm" }];
  let namesOfDaysOfTheWeek = [
    { id: 0, name: "Saturday", att: 'working_days' },
    { id: 1, name: "Sunday", att: 'working_days' },
    { id: 2, name: "Monday", att: 'working_days' },
    { id: 3, name: "Tuesday", att: 'working_days' },
    { id: 4, name: "Wednesday", att: 'working_days' },
    { id: 5, name: "Thursday", att: 'working_days' },
    { id: 6, name: "Friday", att: 'working_days' }
  ];
  let workingHoursArr = [
    ["  8:00 am", " 10:00 pm"],
    [" 10:00 am", " 12:00 pm"],
    [" 12:00 pm", " 2:00 pm"],
    [" 2:00 pm", " 4:00 pm"],
    [" 4:00 pm", " 6:00 pm"],
    [" 6:00 pm", " 8:00 pm"],
    [" 8:00 pm", " 10:00 pm"],
    [" 10:00 pm", " 12:00 am"],
];
const [isDateTimeVisable,setIsDateTimeVisable] = useState(false);
  const toogleViewOfStudentRequestData = () => {
    setIsStudentRequestDataVisible(current => !current);
    setIsStudentRatelDataVisible(current => !current);

  }
  const toogleViewOfStudentRatelData = () => {
    setIsStudentRatelDataVisible(current => !current);
    setIsStudentRequestDataVisible(current => !current);
  }

  const sortSessions = (event) => {
    let sortedSessionsArr = [];
    for (let i = 0; i < specificStudentJoiningRequestData.sessions.length; i++) {
     if(specificStudentJoiningRequestData.sessions[i].attendants.length){
      if (specificStudentJoiningRequestData.sessions[i].attendants.find((studentId)=>specificStudentJoiningRequestData._id === studentId) !== undefined){
        specificStudentJoiningRequestData.sessions[i].isStudentPersent = true;
        sortedSessionsArr.push(specificStudentJoiningRequestData.sessions[i]);
      }else{
        specificStudentJoiningRequestData.sessions[i].isStudentPersent = false;
        sortedSessionsArr.push(specificStudentJoiningRequestData.sessions[i]);
      }
      

    }else{
      specificStudentJoiningRequestData.sessions[i].isStudentPersent = false;
          sortedSessionsArr.push(specificStudentJoiningRequestData.sessions[i]);
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

            return  new Date(a.created_at.split("T")[0]).getTime() - new Date(b.created_at.split("T")[0]).getTime();
          });
          break;
          case "dateDSC":
            sortedSessionsArr.sort((a, b) => {
              return  new Date(b.created_at.split("T")[0]).getTime() -  new Date(a.created_at.split("T")[0]).getTime();

            });
            break;
        default :

    }
    setSpecificStudentJoiningRequestData({...specificStudentJoiningRequestData,sessions:sortedSessionsArr})
  }


  const resetSortSessions = () => {
    setSpecificStudentJoiningRequestData(initialSpecificStudentJoiningRequestData.current);
 
  }
  const showDateTimeContainer = ()=>{
    setIsDateTimeVisable(true);
  }
  const hideDateTimeContainer = ()=>{
    setIsDateTimeVisable(false);
  }
  /*
  useEffect(()=>{
    axios.delete(``)
  },[])
  */
  return (

    <>
      <div className={StudentDetailsStyles['student-details-main-container']}>
        {Object.keys(specificStudentJoiningRequestData).length === 0 ? <img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" /> : specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? <div className={StudentDetailsStyles['settings-header']}>
          <span className={`${isStudentRequestDataVisible ? StudentDetailsStyles['taps-shadow'] : ''} ${StudentDetailsStyles['joinnig-request-data-tap']}`} onClick={toogleViewOfStudentRatelData}>Joinnig Request Data</span>   {specificStudentJoiningRequestData.subscription_state !== 'Pending' ? <span className={`${isStudentRatelDataVisible ? StudentDetailsStyles['taps-shadow'] : ''} ${StudentDetailsStyles['ratel-student-data-tap']}`} onClick={toogleViewOfStudentRequestData}>Ratel Student Data</span> : null}
        </div> : <img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" />}
        {Object.keys(specificStudentJoiningRequestData).length !== 0 && specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? isStudentRequestDataVisible && specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? <div className={StudentDetailsStyles['student-request-joinnig-info-main-container']} style={{overflow:isDateTimeVisable?'hidden':'auto'}}>
          {/* request */}
          <div className={StudentDetailsStyles['student-table-main-header']}>
            <span>Student Data</span>
              <img  src={DateTimeImage} onClick={showDateTimeContainer}  alt="date-time"/>
            </div>
            {isDateTimeVisable?<div className={StudentDetailsStyles['date-time-container-main']}>
            <VscChromeClose size={30} onClick={hideDateTimeContainer} className={StudentDetailsStyles['close-date-time-container']}/>
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
                          {sessionDay === index ? (
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
              {!specificStudentJoiningRequestData.program_prefs.pref_times_of_day ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[0][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {!specificStudentJoiningRequestData.program_prefs.pref_times_of_day ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[1][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {!specificStudentJoiningRequestData.program_prefs.pref_times_of_day ? specificStudentJoiningRequestData.program_prefs.pref_times_of_day[2][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>} 
              </tr>
              <tr>
                <td>2:00 pm : 4:00 pm</td>
                <td>4:00 pm : 6:00 pm</td>
                <td>6:00 pm :  8:00 pm</td>
              </tr>
              <tr>
              {!specificStudentJoiningRequestData.program_prefs.pref_times_of_day ?specificStudentJoiningRequestData.program_prefs.pref_times_of_day[3][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {!specificStudentJoiningRequestData.program_prefs.pref_times_of_day ?specificStudentJoiningRequestData.program_prefs.pref_times_of_day[4][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {!specificStudentJoiningRequestData.program_prefs.pref_times_of_day ?specificStudentJoiningRequestData.program_prefs.pref_times_of_day[5][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>} 
              </tr>
              <tr>
                <td>8:00 pm : 10:00 pm</td>
                <td>10:00 pm : 12:00 am</td>
              </tr>
              <tr>
                
              {!specificStudentJoiningRequestData.program_prefs.pref_times_of_day ?specificStudentJoiningRequestData.program_prefs.pref_times_of_day[6][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              {!specificStudentJoiningRequestData.program_prefs.pref_times_of_day ?specificStudentJoiningRequestData.program_prefs.pref_times_of_day[7][1] !== 0?<td><img src={dateTimeSessionImage} className={StudentDetailsStyles['student-session-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>:<td>{""}</td>}
              </tr>
            </tbody>
          </table>
        </div>

            </div>
            </div>:null}
            

          <table className={StudentDetailsStyles['requested-joinnig-student-table']}>
            <thead>
              <tr>
                <th >Name</th>
                <td>{specificStudentJoiningRequestData.name}</td>
              
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor !== null?
                <th colSpan={"2"}>Instructor</th>:<th colSpan={"2"}>Additinal Info</th>}
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
                 {specificStudentJoiningRequestData.subscription_state === 'Pending' && (specificStudentJoiningRequestData.instructor === null ||specificStudentJoiningRequestData.instructor === undefined)?<>
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
                <td>{specificStudentJoiningRequestData.started_in}</td>
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
            <button type="button" className={StudentDetailsStyles['btn']} onClick={resetSortSessions}>Reset<BiReset /></button>
          </div>
          <div className={StudentDetailsStyles['table-wrapper']}>
            {specificStudentJoiningRequestData.sessions.length === 0 ? <img src={NoResultFiltaration} className={StudentDetailsStyles['no-result']} alt="no-result" /> : <table className={StudentDetailsStyles['student-session-info-table']}>
              <thead>
                <tr>
                  <th>Attendance</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {specificStudentJoiningRequestData.sessions !== null && specificStudentJoiningRequestData.sessions !== undefined?
                specificStudentJoiningRequestData.sessions.map((session)=>(
                 
                  
                  <tr key={session._id} id={session._id}>

                    {session.attendants.length !== 0 && session.attendants !== null && session.attendants !== undefined?<td>
                    {session.attendants.find((studentId)=> specificStudentJoiningRequestData._id === studentId) !== undefined?<img src={Present} alt="attendance" style={{display:'block',margin:'auto',width:'25%'}}/>:<img src={absence}  alt="absence" style={{display:'block',margin:'auto',width:'18%'}} />}
                    </td>:session.attendants.length === 0?<td><img src={absence}  alt="absence" style={{display:'block',margin:'auto',width:'18%'}}/></td>:<td>{"ff "}</td>}
                     <td>{session.created_at.split("T")[0]}</td>
                    </tr>
                )):null}

                
              </tbody>
            </table>}
          </div>







        </div>:<img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" /> : null}





      </div>
    </>
  )
}
export default StudentDetails;