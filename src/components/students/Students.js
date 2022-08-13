import React, {  useState } from "react";
import StudentSubscriptionState from "../student_subscription_state/StudentSubscriptionState";
import StudentDetails from "../student_details/StudentDetails";
const Students = () => {
    const instructorArr = [{ id: 1, name: 'mostafa mahmoud' }, { id: 2, name: 'ali ahmed' }, { id: 3, name: 'yassin mostafa' }, { id: 4, name: 'bahar mokhtar' }, { id: 5, name: 'mohamed magdy' }, { id: 6, name: 'hatem mohamed' }]
    


    return (
        <>
        <StudentDetails/>
        <StudentSubscriptionState  instructorArr={instructorArr}/>
        </>
    )
}
export default Students