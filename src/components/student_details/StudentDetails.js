import React, { useEffect, useState } from "react";
import StudentDetailsStyles from "./StudentDetails.module.css";
import EmptyDataImage from "../../assets/images/empty.png";
import NoResultFiltaration from "../../assets/images/no-result.png";
import Present from "../../assets/images/attendance.png";
import absence from "../../assets/images/absence.png";
import { BiReset } from "react-icons/bi";
import Form from 'react-bootstrap/Form';
const StudentDetails = ({ specificStudentJoiningRequestData, setSpecificStudentJoiningRequestData, initialSpecificStudentJoiningRequestData, isStudentRequestDataVisible, isStudentRatelDataVisible, setIsStudentRequestDataVisible, setIsStudentRatelDataVisible }) => {
  let programes = [{ id: 0, name: "programprogr1" }, { id: 1, name: "programprogr2" }, { id: 2, name: "programprogr3" },]
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    ["8:00 am", "10:00 pm"],
    ["10:00 am", "12:00 pm"],
    ["12:00 pm", "2:00 pm"],
    ["2:00 pm", "4:00 pm"],
    ["4:00 pm", "6:00 pm"],
    ["6:00 pm", "8:00 pm"],
    ["8:00 pm", "10:00 pm"],
    ["10:00 pm", "12:00 am"],
];
  console.log(specificStudentJoiningRequestData);
  let sessions = [{ _id: 0, is_live: false, created_at: "2022-08-14T12:07:43.020Z" }, { _id: 1, is_live: true, created_at: "2022-08-16T12:07:43.020Z" }
    , { _id: 2, is_live: true, created_at: "2022-07-14T12:07:43.020Z" }, { _id: 3, is_live: true, created_at: "2022-08-19T12:07:43.020Z" }, { _id: 4, is_live: false, created_at: "2022-05-1T12:07:43.020Z" }];
  const [sess, setSess] = useState(specificStudentJoiningRequestData.sessions);
  const toogleViewOfStudentRequestData = () => {
    setIsStudentRequestDataVisible(current => !current);
    setIsStudentRatelDataVisible(current => !current);
    console.log(isStudentRequestDataVisible);
    console.log(isStudentRatelDataVisible);
  }
  const toogleViewOfStudentRatelData = () => {
    setIsStudentRatelDataVisible(current => !current);
    setIsStudentRequestDataVisible(current => !current);
    console.log(isStudentRequestDataVisible);
    console.log(isStudentRatelDataVisible);
  }

  const sortSessions = (event) => {

    let sortedSessionsArr = [];

    
    for (let i = 0; i < specificStudentJoiningRequestData.sessions.length; i++) {
      console.log(specificStudentJoiningRequestData.sessions[i].attendants.length === 0)
     if(specificStudentJoiningRequestData.sessions[i].attendants.length){
      for(let j = 0 ; j < specificStudentJoiningRequestData.sessions[i].attendants.length;j++){
        if(specificStudentJoiningRequestData._id === specificStudentJoiningRequestData.sessions[i].attendants[j]){
          console.log("yes true");
          specificStudentJoiningRequestData.sessions[i].isStudentPersent = true;
          sortedSessionsArr.push(specificStudentJoiningRequestData.sessions[i]);
        }else{
          specificStudentJoiningRequestData.sessions[i].isStudentPersent = false;
          sortedSessionsArr.push(specificStudentJoiningRequestData.sessions[i]);
        }
      }

    }else{
      specificStudentJoiningRequestData.sessions[i].isStudentPersent = false;
          sortedSessionsArr.push(specificStudentJoiningRequestData.sessions[i]);
    }
      
    }

    setSpecificStudentJoiningRequestData({...specificStudentJoiningRequestData,sessions:sortedSessionsArr})
    /*
    for (let i = 0; i < sess.length; i++) {

      if (sess[i].is_live === true) {
        sortedSessionsArr.push(sess[i]);
      } else {
        sortedSessionsArr.push(sess[i]);
      }
    }
    */
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
          /*
          sortedSessionsArr.length = 0;
          for (let i = 0; i < sess.length; i++) {
          if (sess[i].is_live === false) {
        
            sortedSessionsArr.push(sess[i]);
          } else {
            sortedSessionsArr.push(sess[i]);
          }
        }
        */
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
     
        /*
   
      */
      
    
   
   

    //  setSpecificStudentJoiningRequestData({ ...specificStudentJoiningRequestData, sessions: sortedSessionsArr })

    setSess(sortedSessionsArr);




  }


  const resetSortSessions = () => {
    setSpecificStudentJoiningRequestData(initialSpecificStudentJoiningRequestData.current);
 
  }



  return (

    <>
    {console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>")}
    {console.log(specificStudentJoiningRequestData)}
    {console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>")}
      <div className={StudentDetailsStyles['student-details-main-container']}>
        {Object.keys(specificStudentJoiningRequestData).length === 0 ? <img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" /> : specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? <div className={StudentDetailsStyles['settings-header']}>
          <span className={`${isStudentRequestDataVisible ? StudentDetailsStyles['taps-shadow'] : ''} ${StudentDetailsStyles['joinnig-request-data-tap']}`} onClick={toogleViewOfStudentRatelData}>Joinnig Request Data</span>   {specificStudentJoiningRequestData.subscription_state !== 'Pending' ? <span className={`${isStudentRatelDataVisible ? StudentDetailsStyles['taps-shadow'] : ''} ${StudentDetailsStyles['ratel-student-data-tap']}`} onClick={toogleViewOfStudentRequestData}>Ratel Student Data</span> : null}
        </div> : <img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" />}
        {Object.keys(specificStudentJoiningRequestData).length !== 0 && specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? isStudentRequestDataVisible && specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? <div className={StudentDetailsStyles['student-request-joinnig-info-main-container']}>
          {/* request */}
          <table className={StudentDetailsStyles['requested-joinnig-student-table']}>
            <thead>
              <tr>
                <th >Name</th>
                <td>{specificStudentJoiningRequestData.name}</td>
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor.age !== null?
                <th colSpan={"2"}>Instructor</th>:null}
              </tr>
              <tr>
              <th>Age</th>
                <td>{specificStudentJoiningRequestData.age}</td>
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor.name !== null?<>
                <th>Name</th>
                <td>{specificStudentJoiningRequestData.instructor.name}</td></>:null}
              </tr>
              <tr>
                <th>Gender</th>
                <td>{specificStudentJoiningRequestData.gender}</td>
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor.gender !== null?<>
                <th>Gender</th>
                <td>{specificStudentJoiningRequestData.instructor.gender}</td></>:null}
              </tr>
              <tr>
                <th>State</th>
                <td>{specificStudentJoiningRequestData.state}</td>
                {specificStudentJoiningRequestData.subscription_state !== 'Pending' && specificStudentJoiningRequestData.instructor.state !== null?<>
                <th>State</th>
                <td>{specificStudentJoiningRequestData.instructor.state}</td></>:null}
              </tr>
              <tr>
                <th>Mobile</th>
                <td>{specificStudentJoiningRequestData.mobile}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{specificStudentJoiningRequestData.email}</td>
              </tr>
              <tr>
                <th rowSpan="2">Program Preferred</th>
                <th>Program Type</th>
                <th>Preferred Days</th>
                <th>Preferred Times</th>
              </tr>
              <tr>
                {!specificStudentJoiningRequestData.program_prefs.type ? <td>{""}</td> : <td><span>{specificStudentJoiningRequestData.program_prefs.type}</span></td>}
                {!specificStudentJoiningRequestData.program_prefs.pref_days ? <td>{""}</td> : <td><span>{specificStudentJoiningRequestData.program_prefs.pref_days.map((prefD, index) => (prefD !== -1? <span key={index}>{days[index]}</span>:null))}</span></td>}
                {!specificStudentJoiningRequestData.program_prefs.pref_times_of_day ? <td>{""}</td> : <td><span>{specificStudentJoiningRequestData.program_prefs.pref_times_of_day.map((prefTimeD, index) => (prefTimeD[1] !== 0? <div key={index}><span>from</span>{" "}<span>{workingHoursArr[index][prefTimeD[0]]}</span>{" "}<span>to</span>{" "}<span>{workingHoursArr[index][prefTimeD[1]]}</span></div>:null))}</span></td>}
              </tr>
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
                    {session.attendants.length !== 0 && session.attendants !== null && session.attendants !== undefined?<td>{session.attendants.map((atten)=>(
                      specificStudentJoiningRequestData._id === atten?<img src={Present} key={atten} alt="attendance" style={{display:'block',margin:'auto',width:'25%'}}/>:<img src={absence} key={session._id} alt="absence" style={{display:'block',margin:'auto',width:'18%'}} />
                    ))}</td>:session.attendants.length === 0?<td><img src={absence}  alt="absence" style={{display:'block',margin:'auto',width:'18%'}}/></td>:<td>{"ff "}</td>}
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