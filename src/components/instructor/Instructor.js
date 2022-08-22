import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
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
    const instructorArr = [
        {
            _id: 1,
            name: "mohamed",
            age: 22,
            gender: "male",
            mobile: "+201150849567",
            email: "mohamedfarahat366@gmail.com",
            certificates: ["bachelor degree"],
            state: "egypt",
            working_days: [1, 2, 3, 4],
            working_hours: ["from 2:30 pm to 5:30 pm", "from 2:30 pm to 5:30 pm"],
            programs: ["تحفيظ"],
            started_at: ["2022-08014"],
            is_available: true,
            in_session: true,
        },
        {
            _id: 2,
            name: "mohamed",
            age: 23,
            gender: "male",
            mobile: "+201150849567",
            email: "mohamedfarahat366@gmail.com",
            certificates: ["bachelor degree"],
            state: "egypt",
            working_days: [1, 2],
            working_hours: [
                "from 2:30 pm to 5:30 pm",
                "from 2:30 pm to 5:30 pm",
                "from 2:30 pm to 5:30 pm",
            ],
            programs: ["تحفيظ", "2تحفيظ"],
            started_at: ["2022-08014"],
            is_available: false,
            in_session: false,
        },
        {
            _id: 3,
            name: "mohamed",
            age: 24,
            gender: "male",
            mobile: "+201150849567",
            email: "mohamedfarahat366@gmail.com",
            certificates: ["bachelor degree", "ddddd"],
            state: "egypt",
            working_days: [1, 2, 3, 4, 5],
            working_hours: [
                "from 2:30 pm to 5:30 pm",
                "from 2:30 pm to 5:30 pm",
                "from 2:30 pm to 5:30 pm",
                "from 2:30 pm to 5:30 pm",
            ],
            programs: ["تحفيظ"],
            started_at: ["2022-08014"],
            is_available: true,
            in_session: false,
        },
        {
            _id: 4,
            name: "nagwa",
            age: 29,
            gender: "female",
            mobile: "+201150849567",
            email: "mohamedfarahat366@gmail.com",
            certificates: ["bachelor degree", "fddd", "dddddd"],
            state: "egypt",
            working_days: [1, 2, 3],
            working_hours: [
                "from 2:30 pm to 5:30 pm",
                "from 2:30 pm to 5:30 pm",
                "from 2:30 pm to 5:30 pm",
                "from 2:30 pm to 5:30 pm",
                "from 2:30 pm to 5:30 pm",
            ],
            programs: ["تحفيظ"],
            started_at: ["2022-08014"],
            is_available: true,
            in_session: true,
        },
        {
            _id: 5,
            name: "mona",
            age: 32,
            gender: "female",
            mobile: "+201150849567",
            email: "mohamedfarahat366@gmail.com",
            certificates: [
                "bachelor degree",
                "blaaa blaaa",
                "blaaaaa",
                "blaaaa",
                "blaaaa",
                "jjjaaa",
            ],
            state: "egypt",
            working_days: [1, 2, 3],
            working_hours: ["from 2:30 pm to 5:30 pm"],
            programs: ["تحفيظ", "2تحفيظ", "3تحفيظ"],
            started_at: ["2022-08014"],
            is_available: false,
            in_session: true,
        },
        {
            _id: 6,
            name: "ola",
            age: 46,
            gender: "female",
            mobile: "+201150849567",
            email: "mohamedfarahat366@gmail.com",
            certificates: ["bachelor degree"],
            state: "egypt",
            working_days: [1, 2, 3],
            working_hours: ["from 2:30 pm to 5:30 pm"],
            programs: ["تحفيظ"],
            started_at: ["2022-08014"],
            is_available: true,
            in_session: true,
        },
        {
            _id: 7,
            name: "mohamed",
            age: 55,
            gender: "male",
            mobile: "+201150849567",
            email: "mohamedfarahat366@gmail.com",
            certificates: ["bachelor degree", "dddd", "dddd", "ddd", "ddd"],
            state: "egypt",
            working_days: [1],
            working_hours: ["from 2:30 pm to 5:30 pm"],
            programs: ["تحفيظ", "2تحفيظ", "3تحفيظ", "4تحفيظ"],
            started_at: ["2022-08014"],
            is_available: true,
            in_session: true,
        },
    ];
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let workingHoursArr = [
        ["8:00 am", "10:00 pm"],
        ["10:00 am", "12:00 pm"],
        ["12:00 pm", "2:00 pm"],
        ["2:00 pm", "4:00 pm"],
        ["4:00 pm", "6:00 pm"],
        ["6:00 pm", "8:00 pm"],
        ["8:00 pm", "10:00 pm"],
        ["10:00 pm", "12:00 am"],
    ];
    const [instructorData, setInstructorData] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedInstructorData, setSelectedInstructorData] = useState([]);
    const initialResponse = useRef();
    const initialResponseSpecificInstructorData = useRef();
    const [fetchAgain, setFetchAgain] = useState(0); //Just dummy number to tell that another fetch call is needed

    const handleFiltaration = (event) => {
        console.log(event.target.value);
        setFilterValue(event.target.value);
    };

    const filterStudents = () => {
        let filtarationArr = [];

        for (let i = 0; i < instructorData.length; i++) {
     
            if (instructorData[i].name.toLowerCase().includes(filterValue.toLowerCase())){
                filtarationArr.push(instructorData[i]);
            }else if(instructorData[i].gender.toLowerCase() === filterValue.toLowerCase()){
                filtarationArr.push(instructorData[i]);
            }else if(instructorData[i].age.toString() === filterValue){
                filtarationArr.push(instructorData[i]);
            }else if(instructorData[i].privileges.toLowerCase().includes(filterValue.toLowerCase())){
                filtarationArr.push(instructorData[i]);
            }
            else if(instructorData[i].state.toLowerCase().includes(filterValue.toLowerCase())){
                filtarationArr.push(instructorData[i]);
            }else if(instructorData[i].programs !== null && instructorData[i].programs  !== undefined){
                for(let j = 0 ; j <instructorData[i].programs.length;j++ ){
                    if(instructorData[i].programs[j].toLowerCase().includes(filterValue.toLowerCase())){
                        filtarationArr.push(instructorData[i]);
                    }
                }
                
            }
            /*
                        else if(instructorData[i].prefs.working_days !== null && !instructorData[i].prefs.working_days !== undefined){
                console.log("hello");
                for(let j = 0 ; j < instructorData[i].prefs.working_days.length;j++ ){
                   
                    if(instructorData[i].prefs.working_days[j] !== -1){
                      
                       if(days[instructorData[i].prefs.working_days[j].toLowerCase()].includes(filterValue.toLowerCase())){
                        filtarationArr.push(instructorData[i]);
                       }
                    }
                }
            }else {
                if(instructorData[i].prefs.working_hours !== null && instructorData[i].prefs.working_hours !== undefined){
                console.log("hello");
                for(let j = 0 ; j < instructorData[i].prefs.working_hours.length;j++){
                    if(instructorData[i].prefs.working_hours[i][1] !== 0){
                        if(workingHoursArr[i][0].toLowerCase().includes(filterValue.toLowerCase()) || workingHoursArr[i][1].toLowerCase().includes(filterValue.toLowerCase())){
                            filtarationArr.push(instructorData[i]);
                        }else if(workingHoursArr[i][0].toLowerCase().includes(filterValue.toLowerCase()) && workingHoursArr[i][1].toLowerCase().includes(filterValue.toLowerCase())){
                            filtarationArr.push(instructorData[i]);
                        }
                    }
                }
            }
           
        }
            */ 
        }
        filterValue !== ""
            ? setInstructorData(filtarationArr)
            : setInstructorData(initialResponse.current);
    };

    const resetTableFiltaration = () => {
        setFilterValue("");
        setInstructorData(initialResponse.current);

        setFetchAgain(fetchAgain + 1);
    };

    const sortInstructorTable = (event) => {
        let sortedInstructorArr = [...instructorData];

        switch (event.target.value) {
            case "inACall":
                sortedInstructorArr.sort((a, b) => {
                    return Number(b.in_session) - Number(a.in_session);
                });
                break;
            case "offline":
                sortedInstructorArr.sort((a, b) => {
                    return Number(a.in_session) - Number(b.in_session);
                });
                break;
            case "avaliable":
                sortedInstructorArr.sort((a, b) => {
                    console.log("yes man");
                    return Number(b.is_available) - Number(a.is_available);
                });
                break;

            case "notAvailable":
                sortedInstructorArr.sort((a, b) => {
                    return Number(a.is_available) - Number(b.is_available);
                });
                break;
            case "ageDsc":
                sortedInstructorArr.sort((a, b) => {
                    return b.age - a.age;
                });
                break;
            case "ageAsc":
                sortedInstructorArr.sort((a, b) => {
                    return Number(a.age) - Number(b.age);
                });
                break;
            case "startedAtDSC":
                sortedInstructorArr.sort((a, b) => {
                    return (
                        new Date(b.started_at.split("T")).getTime() -
                        new Date(a.started_at.split("T")).getTime()
                    );
                });
                break;

            case "startedAtASC":
                sortedInstructorArr.sort((a, b) => {
                    return (
                        new Date(a.started_at.split("T")).getTime() -
                        new Date(a.started_at.split("T")).getTime()
                    );
                });
                break;

            default:
                console.log("hello");
        }
        console.log(sortedInstructorArr);
        setInstructorData(
                sortedInstructorArr

        );
    };
    const handlerRowClicked = useCallback((event) => {
        const id = event.currentTarget.id;
        setSelectedRow(id);
    }, []);
console.log(instructorData);
    const setInstructorAvailability = (event, instructorObji) => {
        let availability = event.currentTarget.id === "available" ? false : true;
        axios
            .put(`http://localhost:5000/api/instructors/${instructorObji._id}`, {
                is_available: availability,
            })
            .then((res) => {
                console.log(res);
                setFetchAgain(fetchAgain + 1);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSpecificInstructorData = (event) => {
        event.stopPropagation();
        console.log(event.currentTarget.id);
        axios
            .get(`http://localhost:5000/api/instructors/${event.currentTarget.id}`)
            .then((res) => {
                initialResponseSpecificInstructorData.current = res.data;
                setSelectedInstructorData(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        handlerRowClicked(event);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/instructors`)
            .then((res) => {
                initialResponse.current = res.data;
                setInstructorData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [fetchAgain]);

    return (
        <>
            <InstructorWorkHistory
                selectedInstructorData={selectedInstructorData}
                initialResponseSpecificInstructorData={
                    initialResponseSpecificInstructorData
                }
                setSelectedInstructorData={setSelectedInstructorData}
            />
            <div className={InstructorStyles["instructor-data-container"]}>
                <div className={InstructorStyles["table-settings-container"]}>
                    <Form.Label
                        htmlFor="instructorFilterTxt"
                        className={InstructorStyles["filter-label"]}
                    >
                        Filter
                    </Form.Label>
                    <Form.Control
                        id="instructorFilterTxt"
                        className={InstructorStyles["filter-txt"]}
                        value={filterValue}
                        onChange={handleFiltaration}
                    />
                    <Form.Select id="instructor-sort-select" onChange={sortInstructorTable}>
                        <option value="">Select</option>
                        <optgroup label="By Instructor Status">
                            <option value="inACall">In a Call</option>
                            <option value="offline">Offline</option>
                        </optgroup>
                        <optgroup label=" By Availability">
                            <option value="avaliable">Avaliable</option>
                            <option value="notAvailable">Not Available</option>
                        </optgroup>
                        <optgroup label="By Age">
                            <option value="ageDsc">DSC</option>
                            <option value="ageAsc">ASC</option>
                        </optgroup>
                        <optgroup label="Started At">
                            <option value="startedAtDSC">DSC</option>
                            <option value="startedAtASC">ASC</option>
                        </optgroup>
                    </Form.Select>
                    <button
                        type="button"
                        className={InstructorStyles["btn"]}
                        style={{ marginTop: "auto" }}
                        onClick={(event) => filterStudents(event.target.value)}
                    >
                        Filter <AiFillFilter />
                    </button>
                    <button
                        type="button"
                        className={InstructorStyles["btn"]}
                        style={{ marginTop: "auto" }}
                        onClick={resetTableFiltaration}
                    >
                        Reset
                        <BiReset />
                    </button>
                </div>

                <div className={InstructorStyles["table-wrapper"]}>
                    {instructorData?.length === 0 ? (
                        <img
                            src={NoResultFiltaration}
                            className={InstructorStyles["no-result"]}
                            alt="no-result"
                        />
                    ) : (
                        <table className={InstructorStyles["instructor-table"]}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>State</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Working Hours</th>
                                    <th>Working Days</th>
                                    <th>Programs</th>
                                    <th>Started At</th>
                                    <th>Is Available</th>
                                    <th>In Session</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instructorData?.map((instructData) => (
                                    <tr
                                        key={instructData._id}
                                        id={instructData._id}
                                        onClick={(event) => {
                                            getSpecificInstructorData(event);
                                        }}
                                        style={{
                                            background:
                                                selectedRow === instructData._id ? "#038674" : "",
                                            color: selectedRow === instructData._id ? "#FFFFFF" : "",
                                            boxShadow:
                                                selectedRow === instructData._id
                                                    ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)`
                                                    : "",
                                        }}
                                    >
                                        <td>{instructData.name}</td>
                                        <td>{instructData.age}</td>
                                        <td>{instructData.gender}</td>
                                        <td>{instructData.state}</td>
                                        <td>{instructData.email}</td>
                                        <td>{instructData.mobile}</td>
                                        {instructData.prefs.working_hours ? (
                                            <>
                                                <td>
                                                    <span>
                                                        {instructData.prefs.working_hours.map(
                                                            (work_h, index) =>
                                                                work_h[1] !== 0 ? (
                                                                    <div>
                                                                        <span>
                                                                            <span>From</span>{" "}
                                                                            <span>{workingHoursArr[index][0]}</span>{" "}
                                                                            <span>To</span>{" "}
                                                                            <span>{workingHoursArr[index][1]}</span>
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <span> </span>
                                                                )
                                                        )}
                                                    </span>
                                                </td>
                                            </>
                                        ) : (
                                            <td>{""}</td>
                                        )}
                                        {instructData.prefs.working_days ? (
                                            <>
                                                <td>
                                                    <span>
                                                        {instructData.prefs.working_days.map(
                                                            (work_d, index) =>
                                                                work_d !== -1 ? (
                                                                    <span>{days[index]}</span>
                                                                ) : (
                                                                    <span> </span>
                                                                )
                                                        )}
                                                    </span>
                                                </td>
                                            </>
                                        ) : (
                                            <td>{""}</td>
                                        )}
                                        {instructData.programs ? (
                                            <>
                                                <td>
                                                    <span>
                                                        {instructData.programs.map((pr) => (
                                                            <span>{pr}</span>
                                                        ))}
                                                    </span>
                                                </td>
                                            </>
                                        ) : (
                                            <td>{""}</td>
                                        )}
                                        <td>
                                            <span>{instructData.started_at.split("T")[0]}</span>
                                        </td>
                                        <td>
                                            {instructData.is_available ? (
                                                <img
                                                    src={availableIcon}
                                                    className={InstructorStyles["available-img"]}
                                                    id="available"
                                                    alt="available"
                                                    onClick={(event) =>
                                                        setInstructorAvailability(event, instructData)
                                                    }
                                                />
                                            ) : (
                                                <img
                                                    src={absenceIcon}
                                                    className={InstructorStyles["absence-img"]}
                                                    id="absence"
                                                    onClick={(event) =>
                                                        setInstructorAvailability(event, instructData)
                                                    }
                                                    alt="not-here"
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {instructData.in_session ? (
                                                <div
                                                    className={InstructorStyles["online-sessions"]}
                                                ></div>
                                            ) : (
                                                <div
                                                    className={
                                                        InstructorStyles["offline-instructor-sessions"]
                                                    }
                                                ></div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};
export default Instructor;
