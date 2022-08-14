import React, {  useState } from "react";
import StudentSubscriptionState from "../student_subscription_state/StudentSubscriptionState";
import StudentDetails from "../student_details/StudentDetails";
const Students = () => {
    const [specificStudentJoiningRequestData,setSpecificStudentJoiningRequestData] = useState({});
    const [isStudentRequestDataVisible,setIsStudentRequestDataVisible] = useState(true);
    const [isStudentRatelDataVisible,setIsStudentRatelDataVisible] = useState(false);
    


    return (
        <>
        <StudentDetails specificStudentJoiningRequestData={specificStudentJoiningRequestData} setIsStudentRequestDataVisible={setIsStudentRequestDataVisible} setIsStudentRatelDataVisible={setIsStudentRatelDataVisible} isStudentRequestDataVisible={isStudentRequestDataVisible} isStudentRatelDataVisible={isStudentRatelDataVisible}/>
        <StudentSubscriptionState  setSpecificStudentJoiningRequestData={setSpecificStudentJoiningRequestData} setIsStudentRequestDataVisible={setIsStudentRequestDataVisible} setIsStudentRatelDataVisible={setIsStudentRatelDataVisible}/>
        </>
    )
}
export default Students