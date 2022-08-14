import React, { useState } from "react";
import StudentDetailsStyles from "./StudentDetails.module.css";
import EmptyDataImage from "../../assets/images/empty.png";
const StudentDetails = ({ specificStudentJoiningRequestData, isStudentRequestDataVisible, isStudentRatelDataVisible, setIsStudentRequestDataVisible, setIsStudentRatelDataVisible }) => {

    console.log("re render");
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

    return (
      
        <>
        {console.log(specificStudentJoiningRequestData)}
            <div className={StudentDetailsStyles['student-details-main-container']}>
                {Object.keys(specificStudentJoiningRequestData).length === 0? <img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" />:specificStudentJoiningRequestData.subscription_state !== 'Cancelled' ? <div className={StudentDetailsStyles['settings-header']}>
                    <span className={`${isStudentRequestDataVisible ? StudentDetailsStyles['taps-shadow'] : ''} ${StudentDetailsStyles['joinnig-request-data-tap']}`} onClick={toogleViewOfStudentRatelData}>Joinnig Request Data</span>   {specificStudentJoiningRequestData.subscription_state !== 'Pending' ? <span className={`${isStudentRatelDataVisible ? StudentDetailsStyles['taps-shadow'] : ''} ${StudentDetailsStyles['ratel-student-data-tap']}`} onClick={toogleViewOfStudentRequestData}>Ratel Student Data</span> : null}
                </div> :<img src={EmptyDataImage} className={StudentDetailsStyles['empty-data-img']} alt="Empty" />}
                {Object.keys(specificStudentJoiningRequestData).length !== 0 ?isStudentRequestDataVisible? <div className={StudentDetailsStyles['student-request-joinnig-info-main-container']}>
                {/* request */}
                <table className={StudentDetailsStyles['requested-joinnig-student-table']}>
                    <thead>
                    <tr>
                    <th>Name</th>
                  <td>{specificStudentJoiningRequestData.name}</td>
                  </tr>
                    <tr>
                    <th>Age</th>
                  <td>{specificStudentJoiningRequestData.age}</td>
                  </tr>
                  <tr>
                    <th>Gender</th>
                    <td>{specificStudentJoiningRequestData.gender}</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>{specificStudentJoiningRequestData.state}</td>
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
                    <td>{specificStudentJoiningRequestData.type}</td>
                    <td>{specificStudentJoiningRequestData.pref_days}</td>
                    <td>{specificStudentJoiningRequestData.pref_times_of_day}</td>
                  </tr>
                    </thead>
                </table>

            </div>:<div className={StudentDetailsStyles['student-ratel-info-main-container']}>
                {/* ratel member */}
            </div>:null}
                




            </div>
        </>
    )
}
export default StudentDetails;