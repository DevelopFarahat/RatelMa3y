import React, {  useState,useRef } from "react";
import StudentSubscriptionState from "../student_subscription_state/StudentSubscriptionState";
import StudentDetails from "../student_details/StudentDetails";
const Students = () => {
    const [specificStudentJoiningRequestData,setSpecificStudentJoiningRequestData] = useState({});
    const [isStudentRequestDataVisible,setIsStudentRequestDataVisible] = useState(true);
    const [isStudentRatelDataVisible,setIsStudentRatelDataVisible] = useState(false);
    const initialSpecificStudentJoiningRequestData = useRef();


    return (
        <>
        <StudentDetails initialSpecificStudentJoiningRequestData={initialSpecificStudentJoiningRequestData} specificStudentJoiningRequestData={specificStudentJoiningRequestData} setSpecificStudentJoiningRequestData={setSpecificStudentJoiningRequestData} setIsStudentRequestDataVisible={setIsStudentRequestDataVisible} setIsStudentRatelDataVisible={setIsStudentRatelDataVisible} isStudentRequestDataVisible={isStudentRequestDataVisible} isStudentRatelDataVisible={isStudentRatelDataVisible}/>
        <StudentSubscriptionState  initialSpecificStudentJoiningRequestData={initialSpecificStudentJoiningRequestData} setSpecificStudentJoiningRequestData={setSpecificStudentJoiningRequestData} setIsStudentRequestDataVisible={setIsStudentRequestDataVisible} setIsStudentRatelDataVisible={setIsStudentRatelDataVisible}/>
        </>
    )
}
export default Students