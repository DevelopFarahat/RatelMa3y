import React, { useState } from "react";
import InstructorWorkHistoryStyles from "./InstructorWorkHistory.module.css";
import EmptyDataImage from "../../assets/images/empty.png";
import InstructorHistory from "../instructor_history/instructorHistory";
const InstructorWorkHistory = ({ selectedInstructorData, initialResponseSpecificInstructorData, setSelectedInstructorData }) => {
    const [tapVisible, setTapVisible] = useState({
        studentsTap: true,
        sessionsTap: false,
        evaluationsTap: false
    });

    const toogleViewInstructorTaps = (event) => {
        event.target.id === 'studentsTap' ? setTapVisible({ studentsTap: true, sessionsTap: false, evaluations: false }) :
            event.target.id === 'sessionsTap' ? setTapVisible({ studentsTap: false, sessionsTap: true, evaluations: false }) :
                setTapVisible({ studentsTap: false, sessionsTap: false, evaluationsTap: true });
    }
    return (
        <>

            <div className={InstructorWorkHistoryStyles['instructor-work-history-main-container']}>




                {Object.keys(selectedInstructorData).length === 0 ? <img src={EmptyDataImage} className={InstructorWorkHistoryStyles['empty-data-img']} alt="Empty" /> : <div className={InstructorWorkHistoryStyles['settings-header']}>
                    <span id="studentsTap" className={`${tapVisible.studentsTap ? InstructorWorkHistoryStyles['taps-shadow'] : ''} ${InstructorWorkHistoryStyles['students-data-tap']}`} onClick={toogleViewInstructorTaps}>Students</span>
                    <span id="sessionsTap" className={`${tapVisible.sessionsTap ? InstructorWorkHistoryStyles['taps-shadow'] : ''} ${InstructorWorkHistoryStyles['sessions-data-tap']}`} onClick={toogleViewInstructorTaps}>Sessions</span>
                    <span id="evaluationsTap" className={`${tapVisible.evaluationsTap ? InstructorWorkHistoryStyles['taps-shadow'] : ''} ${InstructorWorkHistoryStyles['evaluations-data-tap']}`} onClick={toogleViewInstructorTaps}>Evaluations</span>
                </div>}






                {Object.keys(selectedInstructorData).length !== 0 ? tapVisible.studentsTap ?
                    <div className={InstructorWorkHistoryStyles['students-content-tap']}>
                        {/* students */}
                        <InstructorHistory arrName={'students'} col1Name={'Name'} col2Name={"Email"} col3Name={"Mobile"} selectedInstructorData={selectedInstructorData} initialResponseSpecificInstructorData={initialResponseSpecificInstructorData} setSelectedInstructorData={setSelectedInstructorData} />

                    </div> : tapVisible.sessionsTap ? <div className={InstructorWorkHistoryStyles['sessions-content-tap']}>
                        {/* sessions  */}
                        <h1>Sessions</h1>
                    </div>
                        : <div className={InstructorWorkHistoryStyles['evaluations-content-tap']}>
                            {/* evaluations */}
                            <h1>Evaluations</h1>
                        </div> : null}



















            </div>
        </>
    )
}
export default InstructorWorkHistory;