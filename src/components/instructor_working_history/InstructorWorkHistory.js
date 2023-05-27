import React, { useState,useEffect,useMemo } from "react";
import InstructorWorkHistoryStyles from "./InstructorWorkHistory.module.css";
import EmptyDataImage from "../../assets/images/empty.png";
import InstructorHistory from "../instructor_history/instructorHistory";
import NoResultFiltaration from "../../assets/images/no-result.png";
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
        //const studentSessionsDataCopy = useMemo(() => [...instructorSessionsDetails], [instructorSessionsDetails]);
        useEffect(()=>{
          let watingForSessionsData = true;
          
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
        return ()=> watingForSessionsData = false;
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
            <button type="button" className={InstructorWorkHistoryStyles['btn']} onClick={getAttendaceOnSpecificPeroidOfDate}>{t("filter")} <AiFillFilter style={{margin:'0px 0 -9px -4px'}}/></button>
            <button type="button" className={InstructorWorkHistoryStyles['btn']} onClick={resetSortSessions}>{t("reset")}<BiReset style={{margin: '0 0 -5px -1px'}}/></button>
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
          </div></>:<section className={InstructorWorkHistoryStyles['no-sessions']}><img src={NoResultFiltaration} className={InstructorWorkHistoryStyles['no-result']} alt="no-result" /><span>{t("thre are no sessions during this period")}</span></section>}
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