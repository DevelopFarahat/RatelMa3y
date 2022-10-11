import React, { useState,useEffect } from "react";
import InstructorWorkHistoryStyles from "./InstructorWorkHistory.module.css";
import EmptyDataImage from "../../assets/images/empty.png";
import InstructorHistory from "../instructor_history/instructorHistory";
import { useTranslation } from "react-i18next";    
import {BiReset} from "react-icons/bi";
import {AiFillFilter} from "react-icons/ai";
import Form from "react-bootstrap/Form";
import InstructorSessionsSchedule from "../Instructor_sessions_schedule/InstructorSessionsSchedule";
import InstructorWorkingDatesHours from "../instructor_working_dates_times/instructorWorkingDateTimes";
const InstructorWorkHistory = ({instructorSessionsDetails, setInstructorSessionsDetails,initialInstructorSessionsDetails,selectedInstructorData, initialResponseSpecificInstructorData, setSelectedInstructorData }) => {
  const [t, i18n] = useTranslation();
    const [tapVisible, setTapVisible] = useState({
        studentsTap: true,
        sessionsTap: false,
        evaluationsTap: false,
        workingDateAndOursTap:false,
        sessionsScheduleTap:false
    });
    const [totalSession,setTotalSession] = useState(0);
    const [numberOfStudent,setNumberOfStudent] = useState(0);
    const [sessionsDate,setSessionsDate] = useState({
        fromDate:'',
        toDate:''
      })
    const toogleViewInstructorTaps = (event) => {
        event.target.id === 'studentsTap' ? setTapVisible({ studentsTap: true, sessionsTap: false, evaluations: false,workingDateAndOursTap:false,sessionsScheduleTap:false }) :
            event.target.id === 'sessionsTap' ? setTapVisible({ studentsTap: false, sessionsTap: true, evaluations: false,workingDateAndOursTap:false,sessionsScheduleTap:false }) :
           event.target.id === 'evaluationsTap'?setTapVisible({ studentsTap: false, sessionsTap: false, evaluationsTap: true,workingDateAndOursTap:false,sessionsScheduleTap:false }):
        event.target.id === 'workingDateAndOursTap'?setTapVisible({studentsTap: false, sessionsTap: false, evaluationsTap: false,workingDateAndOursTap:true,sessionsScheduleTap:false}):
        setTapVisible({studentsTap: false, sessionsTap: false, evaluationsTap: false,workingDateAndOursTap:false,sessionsScheduleTap:true})
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
          const studentSessionsDataCopy = [...initialInstructorSessionsDetails.current];
          if(sessionsDate.fromDate !== '' && sessionsDate.toDate !== ''){
            for(let i = 0 ; i < studentSessionsDataCopy.length;i++){
              if(new Date(sessionsDate.fromDate)  <= new Date(studentSessionsDataCopy[i].created_at.split("T")[0]).getTime()  && new Date(studentSessionsDataCopy[i].created_at.split("T")[0]).getTime()  <= new Date(sessionsDate.toDate) ){
                sessionsFiltrated.push(studentSessionsDataCopy[i]);
              }
            }
          }
          setInstructorSessionsDetails(sessionsFiltrated);
        }
        const resetSortSessions = () => {
          setInstructorSessionsDetails(initialInstructorSessionsDetails.current);
         
          }
        useEffect(()=>{
          let totalNumberOfSession = 0;
          let numberOfStudentRelatedToSpecificInstructor = 0;
            const studentSessionsDataCopy = [...instructorSessionsDetails];
            for (let i = 0; i < studentSessionsDataCopy.length; i++) {
              totalNumberOfSession+=1;
        }
        setTotalSession(totalNumberOfSession)
        if(selectedInstructorData !== undefined){
          if(selectedInstructorData.students !== undefined){
            for(let i = 0 ; i < selectedInstructorData.students.length;i++){
              numberOfStudentRelatedToSpecificInstructor+=1;
          }
          setNumberOfStudent(numberOfStudentRelatedToSpecificInstructor);
        }
        }
        },[selectedInstructorData,instructorSessionsDetails])
    return (
        <>

            <div className={InstructorWorkHistoryStyles['instructor-work-history-main-container']}>




                {Object.keys(selectedInstructorData).length === 0 ? <img src={EmptyDataImage} className={InstructorWorkHistoryStyles['empty-data-img']} alt="Empty" /> : <div className={InstructorWorkHistoryStyles['settings-header']} style={{direction:t("us")===t("Us")?'ltr':'rtl'}}>
                    <span id="studentsTap" className={`${tapVisible.studentsTap ? InstructorWorkHistoryStyles['taps-shadow'] : ''} ${InstructorWorkHistoryStyles['students-data-tap']}`} onClick={toogleViewInstructorTaps}>{t("adminpanel_students")}</span>
                    <span  id="sessionsTap" className={`${tapVisible.sessionsTap ? InstructorWorkHistoryStyles['taps-shadow'] : ''} ${InstructorWorkHistoryStyles['sessions-data-tap']}`} onClick={toogleViewInstructorTaps}>{t("session")}</span>
                    <span  id="evaluationsTap" style={{display:"none"}} className={`${tapVisible.evaluationsTap ? InstructorWorkHistoryStyles['taps-shadow'] : ''} ${InstructorWorkHistoryStyles['evaluations-data-tap']}`} onClick={toogleViewInstructorTaps}>Evaluations</span>
                    <span id="workingDateAndOursTap" className={`${tapVisible.workingDateAndOursTap ? InstructorWorkHistoryStyles['taps-shadow'] : ''} ${InstructorWorkHistoryStyles['workingDateAndOursTap']}`} onClick={toogleViewInstructorTaps}>{t("workingDaysHours")}</span>
                    <span id="sessionsScheduleTap" className={`${tapVisible.sessionsScheduleTap ? InstructorWorkHistoryStyles['taps-shadow'] : ''} ${InstructorWorkHistoryStyles['sessions-schedule-data-tap']}`} onClick={toogleViewInstructorTaps}>{t("schedule")}</span>
                </div>}






                {Object.keys(selectedInstructorData).length !== 0 ? tapVisible.studentsTap ?
                    <div className={InstructorWorkHistoryStyles['students-content-tap']}>
                        {/* student */}
                        <InstructorHistory key={"unique1"} arrName={'students'}  selectedInstructorData={selectedInstructorData} initialResponseSpecificInstructorData={initialResponseSpecificInstructorData} setSelectedInstructorData={setSelectedInstructorData} />

                    </div> : tapVisible.sessionsTap ? <div  className={InstructorWorkHistoryStyles['sessions-content-tap']} style={{direction:t("us")=== t("Us")?'ltr':'rtl'}}>
                        {/* sessions  */}
            {instructorSessionsDetails.length !== 0?<>
            <div className={InstructorWorkHistoryStyles['sessions-more-info-settings']}>
            <section>
            <Form.Label htmlFor="fromDate">{t("fromDate")}</Form.Label>
            <Form.Control type="date" name="date-from" id="fromDate"  value={sessionsDate.fromDate} onChange={handleSessionsDate}/>
            </section>
            <section>
            <Form.Label htmlFor="toDate">{t("toDate")}</Form.Label>
            <Form.Control type="date" name="date-to" id="toDate"  value={sessionsDate.toDate} onChange={handleSessionsDate}/>
            </section>
            <section>
            <button type="button" className={InstructorWorkHistoryStyles['btn']} onClick={getAttendaceOnSpecificPeroidOfDate}>{t("filter")} <AiFillFilter /></button>
            <button type="button" className={InstructorWorkHistoryStyles['btn']} onClick={resetSortSessions}>{t("reset")}<BiReset /></button>
            </section>
          </div>
          <div className={InstructorWorkHistoryStyles['sessions-main-info-container']}>
            <div>
                <span>{t("totalNumberOfSession")}</span>
                <span>{totalSession}</span>
            </div>
            <div>
                <span>{t("totalNumberOfStudents")}</span>
                <span>{numberOfStudent}</span>
            </div>
          </div></>:<img src={EmptyDataImage} className={InstructorWorkHistoryStyles['empty-data-img']} alt="Empty" />}
                    </div>
                        :tapVisible.evaluationsTap? <div style={{display:"none"}}  className={InstructorWorkHistoryStyles['evaluations-content-tap']}>
                            {/* evaluations */}
                            <h1>Evaluations</h1>
                        </div>:tapVisible.workingDateAndOursTap?<div className={InstructorWorkHistoryStyles['instructor-working-date-time-tap']}>
                            {/* Working dateTime */}
                            <InstructorWorkingDatesHours selectedInstructorData={selectedInstructorData}/>
                        </div>:<div>
                     {/*sessions schedule */}
                  <InstructorSessionsSchedule selectedInstructorData={selectedInstructorData}/>
                        </div>:null}
                  


















            </div>
        </>
    )
}
export default InstructorWorkHistory;