import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import StudentSubscriptionStyles from "./StudentSubscriptionState.module.css";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import Form from "react-bootstrap/Form";
import { AiFillSetting } from "react-icons/ai";
const StudentSubscriptionState = ({ instructorArr }) => {
    const pindingSubscriptionStateArr = [{ subscription_id: 1, subscription_name: "Active" }, { subscription_id: 2, subscription_name: "OnHold" }, { subscription_id: 3, subscription_name: "Cancelled" }];
    const activeSubscriptionStatusArr = [{ subscription_id: 3, subscription_name: "OnHold" }, { subscription_id: 4, subscription_name: "Cancelled" }];
    const onHoldSubscriptionStatusArr = [{ subscription_id: 5, subscription_name: "Active" }, { subscription_id: 6, subscription_name: "Cancelled" }];
    const [filterValue, setFilterValue] = useState('');
    const [studentData, setStudentData] = useState([]);
    const initialResponse = useRef();
    const [studentStatus, setStudentStatus] = useState(false);
    const [changableSubscriptionState, setChangableSubscriptionState] = useState({});
    const [studentConfiguration, setStudentConfiguration] = useState({
        studentStatus: '',
        studentInstructor: ''

    });
    const [errors, setErrors] = useState({
        statusError: '',
        instructorError: ''

    });

    const handleFiltaration = (event) => {
        console.log(event.target.value);
        setFilterValue(event.target.value);
    }
    // let studentDataCopy = [];
    const filterStudents = () => {
        let filtarationArr = [];
        for (let i = 0; i < studentData.length; i++) {

            if (filterValue === studentData[i].name) {
                filtarationArr.push(studentData[i]);
            } else if (filterValue === studentData[i].subscription_state) {
                filtarationArr.push(studentData[i]);
            }
        }
        filterValue !== '' ? setStudentData(filtarationArr) : setStudentData(initialResponse.current);
    }
    const resetTableFiltaration = () => {
        setFilterValue('');
        setStudentData(initialResponse.current);


    }
    const toogleStudentStatus = (stdObject) => {
        setStudentStatus(current => !current);
        setChangableSubscriptionState(stdObject)
        setStudentConfiguration({
            studentStatus: '',
            studentInstructor: ''
        })

    }
    const setConfiguration = (event) => {
        console.log(event.target.id);

        setStudentConfiguration({
            ...studentConfiguration,
            [event.target.id]: event.target.value
        })
        handleErrors(event.target.id, event.target.value);

    }
    const handleErrors = (field, value) => {
        if (field === 'studentStatus') {
            setErrors({
                ...errors,
                statusError: value === '' ? 'Status Is Required' : null
            });
        } else if (field === 'studentInstructor') {
            setErrors({
                ...errors,
                instructorError: value === '' ? 'Instructor Name Is Required' : null
            });
        }

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setStudentStatus(false);
        console.log(studentConfiguration);
    }
   const  getStudentRatelMa3yJoiningRequestData = (stdObji) =>{

        axios.get("")
   }
    useEffect(() => {
        console.log("ya sawadaq ya qarmat");
        axios.get('https://ratel-may.herokuapp.com/api/students').then((res) => {
            initialResponse.current = res.data;
            setStudentData(res.data)
        }, (error) => {
            console.log(error);
        },console.log(initialResponse.current));

    }, []);
    return (
        <>
            <div className={StudentSubscriptionStyles['student-user-data-container']}>
                <div className={StudentSubscriptionStyles['table-settings-container']}>
                    <Form.Label htmlFor="userAccountFilterTxt" className={StudentSubscriptionStyles['filter-label']}>Filter</Form.Label>
                    <Form.Control id="userAccountFilterTxt" className={StudentSubscriptionStyles['filter-txt']} value={filterValue} onChange={handleFiltaration} />
                    <button type="button" className={StudentSubscriptionStyles['btn']} style={{ marginTop: 'auto' }} onClick={(event) => filterStudents(event.target.value)}>Filter <AiFillFilter /></button>
                    <button type="button" className={StudentSubscriptionStyles['btn']} style={{ marginTop: 'auto' }} onClick={resetTableFiltaration}>Reset<BiReset /></button>
                </div>

                <div className={StudentSubscriptionStyles['table-wrapper']}>
                    <table className={StudentSubscriptionStyles['student-accounts-table']}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Subscription State</th>
                            </tr>
                        </thead>
                        <tbody>

                            {studentData.map((stdData) => (
                                <tr key={stdData._id} onClick={()=>getStudentRatelMa3yJoiningRequestData(stdData)}>
                                    <td>{stdData._id}</td>
                                    <td>{stdData.name}</td>
                                    <td>{stdData.subscription_state} {stdData.subscription_state !== 'Cancelled' ? <AiFillSetting className={StudentSubscriptionStyles['setting-icon-hidden']} size={25} onClick={() => toogleStudentStatus(stdData)} /> : null}</td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                {studentStatus ? <div className={StudentSubscriptionStyles['dime-table']}>
                    <VscChromeClose size={30} onClick={toogleStudentStatus} className={StudentSubscriptionStyles['close-dime']} />
                    <div className={StudentSubscriptionStyles['setting-student-status_instructor-container']}>
                        <form onSubmit={handleSubmit} method="post">

                            <div>
                                <Form.Label htmlFor="studentStatus">Status</Form.Label>
                                <Form.Select id="studentStatus" name="student_status" className={`${errors.statusError ? 'border-danger' : ''}`} onChange={setConfiguration}>
                                    <option value="">Select</option>
                                    {
                                        changableSubscriptionState.subscription_state === 'Pending' ? pindingSubscriptionStateArr.map((subscriptionState) => (

                                            <option key={subscriptionState.subscription_id} value={subscriptionState.subscription_name}>{subscriptionState.subscription_name}</option>
                                        )) : changableSubscriptionState.subscription_state === 'Active' ? activeSubscriptionStatusArr.map((subscriptionState) => (
                                            <option key={subscriptionState.subscription_id} value={subscriptionState.subscription_name}>{subscriptionState.subscription_name}</option>
                                        )) : onHoldSubscriptionStatusArr.map((subscriptionState) => (
                                            <option key={subscriptionState.subscription_id} value={subscriptionState.subscription_name}>{subscriptionState.subscription_name}</option>
                                        ))
                                    }

                                </Form.Select>
                                <small className="text-danger">{errors.statusError}</small>
                            </div>

                            {studentConfiguration.studentStatus !== '' && studentConfiguration.studentStatus !== 'Cancelled' ? <div>
                                <Form.Label htmlFor="studentInstructor">Instructor</Form.Label>
                                <Form.Select name="student_instructor" id="studentInstructor" className={`${errors.instructorError ? 'border-danger' : ''}`} onChange={setConfiguration}>
                                    <option value="">Select</option>
                                    {instructorArr.map((instructor) => (
                                        <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
                                    ))}
                                </Form.Select>
                                <small className="text-danger">{errors.instructorError}</small>
                            </div> : null}
                            {studentConfiguration.studentStatus !== '' && studentConfiguration.studentStatus === 'Cancelled' ? <button type="submit" className={`${studentConfiguration.studentStatus === '' || errors.statusError || errors.instructorError ? StudentSubscriptionStyles['disabled-btn'] : StudentSubscriptionStyles['btn']}`}>Save<FaSave style={{ margin: '0px 0 1px 3px' }} size={15} /></button> : <button type="submit" className={`${studentConfiguration.studentStatus === '' || studentConfiguration.studentInstructor === '' || errors.statusError || errors.instructorError ? StudentSubscriptionStyles['disabled-btn'] : StudentSubscriptionStyles['btn']}`}>Save<FaSave style={{ margin: '0px 0 1px 3px' }} size={15} /></button>}
                        </form>
                    </div></div> : null}
            </div>
        </>
    )

}
export default StudentSubscriptionState;