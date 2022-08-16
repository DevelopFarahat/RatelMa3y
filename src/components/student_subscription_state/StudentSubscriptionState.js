import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import StudentSubscriptionStyles from "./StudentSubscriptionState.module.css";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import Form from "react-bootstrap/Form";
import { AiFillSetting } from "react-icons/ai";
import CircleGif from "../../assets/images/check-circle.gif";
import NoResultFiltaration from "../../assets/images/no-result.png";
const StudentSubscriptionState = ({ setSpecificStudentJoiningRequestData, setIsStudentRequestDataVisible,initialSpecificStudentJoiningRequestData, setIsStudentRatelDataVisible }) => {
    const pindingSubscriptionStateArr = [{ subscription_id: 1, subscription_name: "Active" }, { subscription_id: 2, subscription_name: "OnHold" }, { subscription_id: 3, subscription_name: "Cancelled" }];
    const activeSubscriptionStatusArr = [{ subscription_id: 3, subscription_name: "OnHold" }, { subscription_id: 4, subscription_name: "Cancelled" }];
    const onHoldSubscriptionStatusArr = [{ subscription_id: 5, subscription_name: "Active" }, { subscription_id: 6, subscription_name: "Cancelled" }];
    const [filterValue, setFilterValue] = useState('');
    const [studentData, setStudentData] = useState([]);
    const [instructorData, setInstructorData] = useState([]);
    const initialResponse = useRef();
    const [studentStatus, setStudentStatus] = useState(false);
    const [selectedRow, setSelectedRow] = useState(-1);
    const [changableSubscriptionState, setChangableSubscriptionState] = useState({});
    const [isAlertVisible, setIsAlertVisible] = useState(false);
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

    const filterStudents = () => {
        let filtarationArr = [];
        for (let i = 0; i < studentData.length; i++) {

            if (filterValue.toLowerCase() === studentData[i].name.toLowerCase()) {
                filtarationArr.push(studentData[i]);
            } else if (filterValue.toLowerCase() === studentData[i].subscription_state.toLowerCase()) {
                filtarationArr.push(studentData[i]);
            }
        }
        filterValue !== '' ? setStudentData(filtarationArr) : setStudentData(initialResponse.current);
    }
    const resetTableFiltaration = () => {
        setFilterValue('');
        setStudentData(initialResponse.current);


    }
    const handlerRowClicked = useCallback((event) => {
        const id = event.currentTarget.id;
        setSelectedRow(id);
    }, []);
    const toogleStudentStatus = (stdObject, event) => {
        event.stopPropagation();
        setStudentStatus(current => !current);
        setChangableSubscriptionState(stdObject)

    }
    const closeDime = () => {
        setStudentStatus(current => !current);
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
        changeSubscriptionState();

    }
    const getStudentRatelMa3yJoiningRequestData = (stdObji, event) => {
        console.log(stdObji._id);
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        };

        axios.get(`https://ratel-may.herokuapp.com/api/students/${stdObji._id}`).then((res) => {
            initialSpecificStudentJoiningRequestData.current = res.data;
            setSpecificStudentJoiningRequestData(res.data);
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        }, headers);

        stdObji.subscription_state === 'Pending' ? setIsStudentRequestDataVisible(true) : setIsStudentRequestDataVisible(false);
        stdObji.subscription_state !== "Pending" && "Cancelled" ? setIsStudentRatelDataVisible(true) : setIsStudentRatelDataVisible(false);
        handlerRowClicked(event);
    }
    const distroyAlert = () => {

        setIsAlertVisible(true);
        setTimeout(() => {
            setIsAlertVisible(current => !current);
        }, 1000);
    }
    useEffect(() => {
        axios.get('https://ratel-may.herokuapp.com/api/students').then((res) => {
            initialResponse.current = res.data;
            setStudentData(res.data)
        }, (error) => {
            console.log(error);
        });
        axios.get(`https://ratel-may.herokuapp.com/api/instructors`).then((instructorRes) => {
            setInstructorData(instructorRes.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    const changeSubscriptionState = () => {
        if (studentConfiguration.studentStatus !== 'Cancelled') {
            axios.put(`https://ratel-may.herokuapp.com/api/students/${changableSubscriptionState._id}`, { subscription_state: studentConfiguration.studentStatus, instructor: studentConfiguration.studentInstructor })
        } else {
            console.log(studentConfiguration.studentStatus);
            axios.put(`https://ratel-may.herokuapp.com/api/students/${changableSubscriptionState._id}`, { subscription_state: studentConfiguration.studentStatus, instructor: '' })
        }
        distroyAlert();
    }
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
                    {studentData.length === 0 ? <img src={NoResultFiltaration} className={StudentSubscriptionStyles['no-result']} alt="no-result" /> : <table className={StudentSubscriptionStyles['student-accounts-table']}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Subscription State</th>
                            </tr>
                        </thead>
                        <tbody>

                            {studentData.map((stdData) => (
                                <tr key={stdData._id} id={stdData._id} onClick={(event) => getStudentRatelMa3yJoiningRequestData(stdData, event)} style={{ background: selectedRow === stdData._id ? '#038674' : '', color: selectedRow === stdData._id ? '#FFFFFF' : '', boxShadow: selectedRow === stdData._id ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)` : '' }}>
                                    <td>{stdData._id}</td>
                                    <td>{stdData.name}</td>
                                    <td>{stdData.subscription_state} {stdData.subscription_state !== 'Cancelled' ? <AiFillSetting className={StudentSubscriptionStyles['setting-icon-hidden']} size={25} onClick={(event) => toogleStudentStatus(stdData, event)} /> : null}</td>

                                </tr>
                            ))}

                        </tbody>
                    </table>}

                </div>
                {studentStatus ? <div className={StudentSubscriptionStyles['dime-table']}>
                    <VscChromeClose size={30} onClick={closeDime} className={StudentSubscriptionStyles['close-dime']} />
                    <div className={StudentSubscriptionStyles['setting-student-status_instructor-container']}>
                        <form onSubmit={handleSubmit} method="post">

                            <div>
                                <Form.Label htmlFor="studentStatus">Status</Form.Label>
                                <Form.Select id="studentStatus" name="student_status" className={`${errors.statusError ? StudentSubscriptionStyles['errors'] : ''}`} onChange={setConfiguration}>
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
                                <Form.Select name="student_instructor" id="studentInstructor" className={`${errors.instructorError ? StudentSubscriptionStyles['errors'] : ''}`} onChange={setConfiguration}>
                                    <option value="">Select</option>
                                    {instructorData.map((instructor) => (
                                        <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
                                    ))}
                                </Form.Select>
                                <small className="text-danger">{errors.instructorError}</small>
                            </div> : null}
                            {studentConfiguration.studentStatus !== '' && studentConfiguration.studentStatus === 'Cancelled' ? <button type="submit" className={`${studentConfiguration.studentStatus === '' || errors.statusError || errors.instructorError ? StudentSubscriptionStyles['disabled-btn'] : StudentSubscriptionStyles['btn']}`}>Save<FaSave style={{ margin: '0px 0 1px 3px' }} size={15} /></button> : <button type="submit" className={`${studentConfiguration.studentStatus === '' || studentConfiguration.studentInstructor === '' || errors.statusError || errors.instructorError ? StudentSubscriptionStyles['disabled-btn'] : StudentSubscriptionStyles['btn']}`}>Save<FaSave style={{ margin: '0px 0 1px 3px' }} size={15} /></button>}
                        </form>
                    </div></div> : null}
            </div>
            {isAlertVisible ? <div className={StudentSubscriptionStyles['alert']}>
                <img src={CircleGif} alt="gif-alert-circle" />
                {studentConfiguration.studentStatus !== '' ? <><span>{changableSubscriptionState.name}</span><span> Subscription State Has Changed Successfully</span></> : null}
            </div> : null}
        </>
    )

}
export default StudentSubscriptionState;