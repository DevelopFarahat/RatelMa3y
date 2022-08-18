import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react"
import InstructorStyles from "./instructor.module.css";
import Form from "react-bootstrap/Form";
import NoResultFiltaration from "../../assets/images/no-result.png";
import { AiFillSetting } from "react-icons/ai";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import availableIcon from "../../assets/images/checkmark.png";
import absenceIcon from "../../assets/images/do-not-enter.png";
import InstructorWorkHistory from "../instructor_working_history/InstructorWorkHistory";
import { composeInitialProps } from "react-i18next";
const Instructor = () => {
    const instructorArr = [{ _id: 1, name: 'mohamed', age: 22, gender: 'male', mobile: '+201150849567', email: 'mohamedfarahat366@gmail.com', certificates: ['bachelor degree'], state: 'egypt', working_days: [1, 2, 3, 4], working_hours: ["from 2:30 pm to 5:30 pm", "from 2:30 pm to 5:30 pm"], programs: ['تحفيظ'], started_at: ['2022-08014'], is_available: true, in_session: true },
    { _id: 2, name: 'mohamed', age: 23, gender: 'male', mobile: '+201150849567', email: 'mohamedfarahat366@gmail.com', certificates: ['bachelor degree'], state: 'egypt', working_days: [1, 2], working_hours: ["from 2:30 pm to 5:30 pm", "from 2:30 pm to 5:30 pm", "from 2:30 pm to 5:30 pm"], programs: ['تحفيظ', '2تحفيظ',], started_at: ['2022-08014'], is_available: false, in_session: false },
    { _id: 3, name: 'mohamed', age: 24, gender: 'male', mobile: '+201150849567', email: 'mohamedfarahat366@gmail.com', certificates: ['bachelor degree', "ddddd"], state: 'egypt', working_days: [1, 2, 3, 4, 5], working_hours: ["from 2:30 pm to 5:30 pm", "from 2:30 pm to 5:30 pm", "from 2:30 pm to 5:30 pm", "from 2:30 pm to 5:30 pm"], programs: ['تحفيظ'], started_at: ['2022-08014'], is_available: true, in_session: false },
    { _id: 4, name: 'nagwa', age: 29, gender: 'female', mobile: '+201150849567', email: 'mohamedfarahat366@gmail.com', certificates: ['bachelor degree', "fddd", "dddddd"], state: 'egypt', working_days: [1, 2, 3], working_hours: ["from 2:30 pm to 5:30 pm", "from 2:30 pm to 5:30 pm", "from 2:30 pm to 5:30 pm", "from 2:30 pm to 5:30 pm", "from 2:30 pm to 5:30 pm"], programs: ['تحفيظ'], started_at: ['2022-08014'], is_available: true, in_session: true },
    { _id: 5, name: 'mona', age: 32, gender: 'female', mobile: '+201150849567', email: 'mohamedfarahat366@gmail.com', certificates: ['bachelor degree', 'blaaa blaaa', "blaaaaa", "blaaaa", "blaaaa", "jjjaaa"], state: 'egypt', working_days: [1, 2, 3], working_hours: ["from 2:30 pm to 5:30 pm"], programs: ['تحفيظ', '2تحفيظ', '3تحفيظ'], started_at: ['2022-08014'], is_available: false, in_session: true },
    { _id: 6, name: 'ola', age: 46, gender: 'female', mobile: '+201150849567', email: 'mohamedfarahat366@gmail.com', certificates: ['bachelor degree'], state: 'egypt', working_days: [1, 2, 3], working_hours: ["from 2:30 pm to 5:30 pm"], programs: ['تحفيظ'], started_at: ['2022-08014'], is_available: true, in_session: true },
    { _id: 7, name: 'mohamed', age: 55, gender: 'male', mobile: '+201150849567', email: 'mohamedfarahat366@gmail.com', certificates: ['bachelor degree', "dddd", "dddd", "ddd", "ddd"], state: 'egypt', working_days: [1], working_hours: ["from 2:30 pm to 5:30 pm"], programs: ['تحفيظ', '2تحفيظ', '3تحفيظ', '4تحفيظ'], started_at: ['2022-08014'], is_available: true, in_session: true }]
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const [instructorData, setInstructorData] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedInstructorData, setSelectedInstructorData] = useState([]);
    const initialResponse = useRef();
    const initialResponseSpecificInstructorData = useRef();
    const [fetchAgain,setFetchAgain] = useState(0)           //Just dummy number to tell that another fetch call is needed
    
    const handleFiltaration = (event) => {
        console.log(event.target.value);
        setFilterValue(event.target.value);
    }

    const filterStudents = () => {
        let filtarationArr = [];

        for (let i = 0; i < instructorData.length; i++) {
            if (filterValue.toLowerCase() === instructorData[i].name.toLowerCase()) {
                filtarationArr.push(instructorData[i]);
            }
        }
        filterValue !== '' ? setInstructorData(filtarationArr) : setInstructorData(initialResponse.current);
    }


    const resetTableFiltaration = () => {
        setFilterValue('');
        setInstructorData(initialResponse.current);

        setFetchAgain(fetchAgain+1)
    }


    const handlerRowClicked = useCallback((event) => {
        const id = event.currentTarget.id;
        setSelectedRow(id);
    }, []);


    const setInstructorAvailability = (event, instructorObji) => {
        let availability = event.currentTarget.id === 'available' ? false : true;
        axios.put(`http://localhost:5000/api/instructors/${instructorObji._id}`, { is_available: availability }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }


    const getSpecificInstructorData = (event) => {
        event.stopPropagation();
        console.log(event.currentTarget.id);
        axios.get(`http://localhost:5000/api/instructors/${event.currentTarget.id}`).then((res) => {
            initialResponseSpecificInstructorData.current = res.data;
            setSelectedInstructorData(res.data);
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        })

        handlerRowClicked(event);
    }


    useEffect(() => {
        axios.get(`http://localhost:5000/api/instructors`).then((res) => {
            initialResponse.current = res.data;
            setInstructorData(res.data);
        }).catch((error) => {
            console.log(error);
        })
    },[fetchAgain]);


    return (
        <>
           
            <InstructorWorkHistory selectedInstructorData={selectedInstructorData} initialResponseSpecificInstructorData={initialResponseSpecificInstructorData} setSelectedInstructorData={setSelectedInstructorData} />
            <div className={InstructorStyles['instructor-data-container']}>
                <div className={InstructorStyles['table-settings-container']}>
                    <Form.Label htmlFor="instructorFilterTxt" className={InstructorStyles['filter-label']}>Filter</Form.Label>
                    <Form.Control id="instructorFilterTxt" className={InstructorStyles['filter-txt']} value={filterValue} onChange={handleFiltaration} />
                    <button type="button" className={InstructorStyles['btn']} style={{ marginTop: 'auto' }} onClick={(event) => filterStudents(event.target.value)}>Filter <AiFillFilter /></button>
                    <button type="button" className={InstructorStyles['btn']} style={{ marginTop: 'auto' }} onClick={resetTableFiltaration}>Reset<BiReset /></button>
                </div>

                <div className={InstructorStyles['table-wrapper']}>
                    {instructorData?.length === 0 ? <img src={NoResultFiltaration} className={InstructorStyles['no-result']} alt="no-result" /> : <table className={InstructorStyles['instructor-table']}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>State</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>certificates</th>
                                <th>Working Hours</th>
                                <th>Working Days</th>
                                <th>Programs</th>
                                <th>Started At</th>
                                <th>Is_Available</th>
                                <th>In_Session</th>
                            </tr>
                        </thead>
                        <tbody>

                            {instructorData?.map((instructData) => (
                                <tr key={instructData._id} id={instructData._id} onClick={(event) => { getSpecificInstructorData(event) }} style={{ background: selectedRow === instructData._id ? '#038674' : '', color: selectedRow === instructData._id ? '#FFFFFF' : '', boxShadow: selectedRow === instructData._id ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)` : '' }}>
                                    <td>{instructData._id}</td>
                                    <td>{instructData.name}</td>
                                    <td>{instructData.age}</td>
                                    <td>{instructData.gender}</td>
                                    <td>{instructData.state}</td>
                                    <td>{instructData.email}</td>
                                    <td>{instructData.mobile}</td>
                                    {instructData.certificates?<><td><span>{instructData.certificates.map((certificate) => (<span>{certificate}</span>))}</span></td></>:<td>{""}</td>}
                                    {instructData.working_hours?<><td><span>{instructData.working_hours.map((work_h) => (<div><span >{work_h.split(" ")[0]}{" "}</span><span>{work_h.split(" ")[1]} {work_h.split(" ")[2]}{" "}</span><span>{work_h.split(" ")[3]}{" "}</span><span>{work_h.split(" ")[4]}{" "}{work_h.split(" ")[5]}</span></div>))}</span></td></> : <td>{""}</td>}
                                    {instructData.working_days?<><td><span>{instructData.working_days.map((work_d) => (<span>{days[work_d]}</span>))}</span></td></> : <td>{""}</td>}
                                    {instructData.programs?<><td><span>{instructData.programs.map((pr) => (<span>{pr}</span>))}</span></td></> : <td>{""}</td>}
                                    <td><span>{instructData.started_at}</span></td>
                                    <td>{instructData.is_available?<img src={availableIcon} className={InstructorStyles['available-img']} id="available" alt="available" onClick={(event) => setInstructorAvailability(event, instructData)} /> : <img src={absenceIcon} className={InstructorStyles['absence-img']} id="absence" onClick={(event) => setInstructorAvailability(event, instructData)} alt="not-here" />}</td>
                                    <td>{instructData.in_session?<div className={InstructorStyles['online-sessions']}></div> : <div className={InstructorStyles['offline-instructor-sessions']}></div>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}

                </div>
            </div>
        </>
    )
}
export default Instructor;